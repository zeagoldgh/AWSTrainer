import {useEffect, useState} from "react";
import {AnswersGiven, AnswersValidatedDTO, QuestionEntity} from "../../service/models";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/AuthProvider";
import QuestionBox from "./QuestionBox";
import ChoiceArea from "./ChoiceArea";
import QuestionListButtons from "./QuestionListButtons";
import TrainNavigationButtons from "./TrainNavigationButtons";
import ProgressBar from "./ProgressBar";


interface TrainContentProps {
    fetch: (token: string ,info ?: string) => Promise<QuestionEntity[]>
    validate : (answers:AnswersGiven[],token :string) => Promise<AnswersValidatedDTO>
    info ?: string
}

export default function TrainContent({fetch,validate,info}: TrainContentProps) {

    const [questions, setQuestions] = useState<QuestionEntity[]>()
    const [index, setIndex] = useState(0)
    const [givenAnswers, setGivenAnswers] = useState<AnswersGiven[]>([])

    const nav = useNavigate()
    const {token} = useAuth()

    useEffect(() => {
        const givenAnswersInitArr = [] as AnswersGiven[]
        fetch(token,info)
            .then(data => {
                setQuestions(data)
                data.map(((question) => {
                    const givenAnswerInit = {} as AnswersGiven
                    givenAnswerInit.givenAnswers = []
                    givenAnswerInit.questionId = question.id
                    givenAnswerInit.givenAnswers = question.answers.length === 4 ? [false, false, false, false] : [false, false, false, false, false]
                    givenAnswersInitArr.push(givenAnswerInit)
                    return givenAnswerInit
                }))
            })
            .then(() => setGivenAnswers(givenAnswersInitArr))
            .catch((err: AxiosError) => {
                if (err.response?.status === 401) {
                    nav("/login")
                } else {
                    console.log(err.message)
                }
            })
    }, [nav, token, fetch,info])

    const handleAnswer = (whichAnswer: number) => {
        const currentAnswers = [...givenAnswers]
        if (currentAnswers[index].givenAnswers.length === 4) {
            currentAnswers[index].givenAnswers = [false, false, false, false]
        }
        currentAnswers[index].givenAnswers[whichAnswer] = !currentAnswers[index].givenAnswers[whichAnswer]
        setGivenAnswers(currentAnswers)
    }

    const getPercentage = () => {
        if (questions) {
            const total = questions?.length
            let questionsAnswerd = 0
            for (let i = 0; i < givenAnswers.length; i++) {
                if (givenAnswers[i].givenAnswers.length === 4 && givenAnswers[i].givenAnswers.includes(true)) {
                    questionsAnswerd++
                } else {
                    const answered = givenAnswers[i].givenAnswers.filter(answer => answer)
                    const needToAnswer = questions[i].rightAnswers.filter(answer => answer)
                    if (needToAnswer.length === answered.length) {
                        questionsAnswerd++
                    }
                }
            }
            return questionsAnswerd / total * 100
        }
        return 0
    }

    const handOverAnswers = () => {
        validate(givenAnswers,token)
            .then(data => nav(`/result/${data.answerId}`))
            .catch((err : AxiosError) => console.log(err.message))
    }

    return (
        <div>
            {
                questions && givenAnswers.length > 3 ?
                    <div>
                        <QuestionBox text={questions[index].question}
                                     toChoose={questions[index].answers.length === 5 ? questions[index].rightAnswers.filter(answer => answer).length : 1}/>
                        <ChoiceArea answers={questions[index].answers} givenAnswers={givenAnswers[index].givenAnswers}
                                    handleAnswer={handleAnswer}/>
                        <TrainNavigationButtons index={index} setIndex={setIndex} questions={questions}
                                                percent={getPercentage()} submit={handOverAnswers}/>
                        <ProgressBar currentPercent={getPercentage()}/>
                        <QuestionListButtons questions={questions} currentQuestion={index} givenAnswers={givenAnswers}
                                             setIndex={setIndex}/>
                    </div>
                    :
                    <i className="nes-kirby"></i>
            }

        </div>
    )
}
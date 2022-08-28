import {useEffect, useState} from "react";
import {AnswersGiven, QuestionEntity} from "../service/models";
import {getRandomQuestions} from "../service/apiService";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Heading from "../components/Common/Heading";
import QuestionBox from "../components/Train/QuestionBox";
import ChoiceArea from "../components/Train/ChoiceArea";

export default function QuickTrainPage(){

    const [questions, setQuestions] = useState<QuestionEntity[]>()
    const [index, setIndex] = useState(0)
    const [givenAnswers , setGivenAnswers] = useState<AnswersGiven[]>([])

    const nav = useNavigate()
    const {token} = useAuth()

    useEffect(()=>{
        const givenAnswersInitArr = [] as AnswersGiven[]
        getRandomQuestions(token)
            .then(data => {
                setQuestions(data)
                data.map(((question) => {
                    const givenAnswerInit = {} as AnswersGiven
                    givenAnswerInit.givenAnswers = []
                    givenAnswerInit.questionId = question.id
                    givenAnswerInit.givenAnswers = question.answers.length===4 ? [false,false,false,false]:[false,false,false,false,false]
                    givenAnswersInitArr.push(givenAnswerInit)
                    return givenAnswerInit
                }))
            })
            .then(()=>setGivenAnswers(givenAnswersInitArr))
            .catch((err : AxiosError) => {
                if (err.response?.status===401){
                    nav("/login")
                } else {
                    console.log(err.message)
                }
            })
    },[nav,token])

    const handleAnswer = (whichAnswer : number)=>{
        const currentAnswers = [...givenAnswers]
        if (currentAnswers[index].givenAnswers.length===4){
            currentAnswers[index].givenAnswers = [false,false,false,false]
        }
        currentAnswers[index].givenAnswers[whichAnswer] = !currentAnswers[index].givenAnswers[whichAnswer]
        setGivenAnswers(currentAnswers)
    }

    return(
        <div>
            <Heading location={"/quickTrain"}/>
            {
                questions && givenAnswers.length>3?
                    <div>
                        <QuestionBox text={questions[index].question} toChoose={questions[index].answers.length===5 ? questions[index].indexRightAnswer.length : 1}/>
                        <ChoiceArea answers={questions[index].answers} givenAnswers={givenAnswers[index].givenAnswers} handleAnswer={handleAnswer}/>
                        {index!==0 && <button onClick={(()=>setIndex(index-1))}>prev</button>}
                        <button>Absenden</button>
                        {index!==questions.length-1 && <button onClick={(()=>setIndex(index+1))}>next</button>}
                        <div>
                            {
                                questions.map((q,i)=>{
                                    return  <button className={`nes-btn ${index===i ? 'is-primary' : givenAnswers[i].givenAnswers.includes(true) ? 'is-success' : ''}`} key={i}>{i+1}</button>
                                })
                            }
                        </div>
                    </div>
                    :
                    <i className="nes-kirby"></i>
            }

        </div>
    )
}
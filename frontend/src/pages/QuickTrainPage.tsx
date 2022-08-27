import {useEffect, useState} from "react";
import {QuestionEntity} from "../service/models";
import {getRandomQuestions} from "../service/apiService";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Heading from "../components/Common/Heading";

export default function QuickTrainPage(){

    const [questions, setQuestions] = useState<QuestionEntity[]>()
    const [index, setIndex] = useState(0)

    const nav = useNavigate()
    const {token} = useAuth()

    useEffect(()=>{
        getRandomQuestions(token)
            .then(data => {
                setQuestions(data)
                console.log(data)
            })
            .catch((err : AxiosError) => {
                if (err.response?.status===401){
                    nav("/login")
                } else {
                    console.log(err.message)
                }
            })
    },[nav,token])

    return(
        <div>
            <Heading location={"/quickTrain"}/>
            {
                questions?
                    <div>
                        <h1>{questions[index].question}</h1>
                        <ul>
                            <li>{questions[index].answers[0]}</li>
                            <li>{questions[index].answers[1]}</li>
                            <li>{questions[index].answers[2]}</li>
                            <li>{questions[index].answers[3]}</li>
                        </ul>
                        <button>next</button>
                        <button>prev</button>
                        <button>Absenden</button>
                        <div>
                            {
                                questions.map((q,i)=>{
                                    return  <button key={i}>{i+1}</button>
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
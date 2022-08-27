import {useEffect, useState} from "react";
import {QuestionEntity} from "../service/models";
import {getRandomQuestions} from "../service/apiService";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import Heading from "../components/Common/Heading";

export default function QuickTrainPage(){

    const [questions, setQuestions] = useState<QuestionEntity[]>()

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
                    <i className="nes-ash"></i>
                    :
                    <i className="nes-kirby"></i>
            }

        </div>
    )
}
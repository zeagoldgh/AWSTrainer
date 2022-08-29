import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ValidatedAnswers} from "../service/models";
import {getResultsById} from "../service/apiService";
import {useAuth} from "../auth/AuthProvider";
import {AxiosError} from "axios";
import ResultCard from "../components/Results/ResultCard";


export default function ResultsPage(){

    const [results,setResults]=useState<ValidatedAnswers>()

    const {id} = useParams()
    const {token} = useAuth()

    useEffect(()=>{
        if(id&&token){
            getResultsById(id,token)
                .then(data => {
                    setResults(data)
                    console.log(data)
                })
                .catch((err : AxiosError)=> console.log(err.message))
        }
    },[id, token])

    return(
        <div>
            {
                results ?
                    <div>
                        {
                            results.takenQuestions.map((e,i) => {
                                return <ResultCard key={i} result={e} index={i}/>
                            })
                        }
                    </div>
                    :
                    <i className="nes-kirby"></i>
            }
        </div>
    )
}
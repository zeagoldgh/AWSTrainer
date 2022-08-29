import {useEffect, useState} from "react";
import {getResultsById} from "../../service/apiService";
import {AxiosError} from "axios";
import {useAuth} from "../../auth/AuthProvider";
import {ValidatedAnswers} from "../../service/models";
import ResultCard from "./ResultCard";

interface ResultGalleryProps{
    id : string
}

export default function ResultGallery({id}:ResultGalleryProps){

    const [results,setResults]=useState<ValidatedAnswers>()

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
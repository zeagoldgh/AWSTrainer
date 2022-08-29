import {useEffect, useState} from "react";
import {getResultsById} from "../../service/apiService";
import {AxiosError} from "axios";
import {useAuth} from "../../auth/AuthProvider";
import {ValidatedAnswers} from "../../service/models";
import ResultCard from "./ResultCard";
import ResultFilter from "./ResultFilter";
import ResultSummary from "./ResultSummary";
import NavBar from "../Common/NavBar";

interface ResultGalleryProps{
    id : string
}

export default function ResultGallery({id}:ResultGalleryProps){

    const [results,setResults]=useState<ValidatedAnswers>()
    const [filterCorrect, setFilterCorrect] = useState('alle')
    const [filterCategory, setFilterCategory] = useState('alle')

    const {token} = useAuth()

    const filterCorrectValue = ['alle','richtig','falsch']
    const filterCorrectTexts = ['Alle', 'Nur Richtige','Nur Falsche']

    const filterCategoryValue = ['alle','SECURITY','CLOUD','BILLING','TECHNOLOGY']
    const filterCategoryTexts = ['Alle','Security and Compliance', 'Cloud Concepts','Billing and Pricing','Technology']

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

    const percent = () =>{
        if (results){
            const right = results.takenQuestions.filter(e => !e.correctlyAnswers.includes(false)).length
            return right/results.takenQuestions.length * 100
        }
        return 0
    }

    const percentCategory = (category : string) =>{
        if (results){
            const right = results.takenQuestions
                .filter(e => e.question.category===category)
                .filter(e => !e.correctlyAnswers.includes(false))
                .length
            const all = results.takenQuestions.filter(e => e.question.category===category).length
            return right/all * 100
        }
        return 0
    }


    return(
        <div>
            <NavBar location={"/result"}/>
            {
                results ?
                    <div>
                        <ResultFilter selected={filterCorrect} handleChange={setFilterCorrect} options={filterCorrectValue} texts={filterCorrectTexts}/>
                        <ResultFilter selected={filterCategory} handleChange={setFilterCategory} options={filterCategoryValue} texts={filterCategoryTexts}/>
                        {
                            results.takenQuestions
                                .filter(e => {
                                    if (filterCorrect!=='alle'){
                                        if (filterCorrect==='richtig'){
                                            return !e.correctlyAnswers.includes(false)
                                        } else {
                                            return e.correctlyAnswers.includes(false)
                                        }
                                    }
                                    return e
                                })
                                .filter(e =>{
                                    if (filterCategory!=='alle'){
                                        return e.question.category===filterCategory
                                    }
                                    return e
                                })
                                .map((e,i) => {
                                return <ResultCard key={e.question.question} result={e} index={i}/>
                            })
                        }
                        {
                            results.exam &&
                            <div>
                                <ResultSummary percentRight={percentCategory('CLOUD')} text={'Cloud Concepts'} conclusion={false}/>
                                <ResultSummary percentRight={percentCategory('SECURITY')} text={'Security and Compliance'} conclusion={false}/>
                                <ResultSummary percentRight={percentCategory('BILLING')} text={'Billing & Pricing'} conclusion={false}/>
                                <ResultSummary percentRight={percentCategory('TECHNOLOGY')} text={'Technology'} conclusion={false}/>
                            </div>
                        }
                        <ResultSummary percentRight={percent()} text={'Gesamt'} conclusion={true}/>
                    </div>
                    :
                    <i className="nes-kirby"></i>
            }
        </div>
    )
}
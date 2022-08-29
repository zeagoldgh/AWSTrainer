import {useEffect, useState} from "react";
import '../../font.css'
import './ResultListItem.css'


interface ResultListItemProps{
    text : string
    wasGuessed : boolean
    isCorrect : boolean
}

export default function ResultListItem({text,wasGuessed,isCorrect}:ResultListItemProps){

    const [css ,setCss] = useState('')
    const [answer , setAnswer] = useState(text)

    useEffect( () => {
        let css = ''
        let info = ''
        if (isCorrect && !wasGuessed){
            css = 'unused'
        } else if (isCorrect && wasGuessed) {
            css = 'correct'
            info = '-> Richtig!'
        } else if (!isCorrect && wasGuessed){
            css = 'false'
            info = "-> Falsch"
        } else {
            css = 'missed'
            info = "-> Richtige Antwort"
        }
        setCss(css)
        setAnswer(info)
    },[isCorrect,wasGuessed])

    return(
        <li className={`betterRead ${css}`}>{text+'   '+answer}</li>
    )
}
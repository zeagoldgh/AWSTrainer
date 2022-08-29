import {CheckedAnswer} from "../../service/models";
import '../../font.css'
import './ResultCard.css'
import {useState} from "react";
import ResultListItem from "./ResultListItem";

interface ResultCardProps {
    result: CheckedAnswer
    index: number
}

export default function ResultCard({result, index}: ResultCardProps) {

    const [moreInfo, setMoreInfo] = useState(false)

    return (
        <div className={'resultCard nes-pointer'} onClick={() => setMoreInfo(!moreInfo)}>
            <div className="nes-container with-title">
                <p className="title">Frage {index + 1}</p>
                <p className={'betterRead'}>{result.question.question}</p>
                {
                    moreInfo && <ul className="nes-list is-disc">
                        {
                            result.question.answers.map((answer,i) => {
                                return <ResultListItem text={answer} wasGuessed={result.givenAnswers[i]} isCorrect={result.correctlyAnswers[i]}/>
                            })
                        }
                    </ul>
                }
            </div>
            <div className={'icon'}>
                {result.correctlyAnswers.includes(false)
                    ?
                    <i className="nes-icon close is-medium"></i>
                    :
                    <i className="nes-icon coin is-medium"></i>
                }
            </div>
        </div>
    )
}
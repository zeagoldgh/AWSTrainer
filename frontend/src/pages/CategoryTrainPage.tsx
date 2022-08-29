import TrainContent from "../components/Train/TrainContent";
import {getCategoryQuestions, postAnswersToValidateQuickTrain} from "../service/apiService";
import {useParams} from "react-router-dom";

export default function CategoryTrainPage(){

    const {category} = useParams()

    return(
        <div>
            {category && <TrainContent fetch={getCategoryQuestions} validate={postAnswersToValidateQuickTrain} info={category}/>}
        </div>
    )
}
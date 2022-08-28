import TrainContent from "../components/Train/TrainContent";
import {getRandomQuestions, postAnswersToValidateQuickTrain} from "../service/apiService";

export default function QuickTrainPage() {



    return (
        <div>
            <TrainContent fetch={getRandomQuestions} validate={postAnswersToValidateQuickTrain}/>
        </div>
    )
}
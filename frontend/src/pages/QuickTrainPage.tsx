import TrainContent from "../components/Train/TrainContent";
import {getRandomQuestions} from "../service/apiService";

export default function QuickTrainPage() {



    return (
        <div>
            <TrainContent fetch={getRandomQuestions}/>
        </div>
    )
}
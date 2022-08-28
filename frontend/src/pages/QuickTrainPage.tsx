import Heading from "../components/Common/Heading";
import TrainContent from "../components/Train/TrainContent";
import {getRandomQuestions} from "../service/apiService";

export default function QuickTrainPage() {



    return (
        <div>
            <Heading location={"/quickTrain"}/>
            <TrainContent fetch={getRandomQuestions}/>
        </div>
    )
}
import TrainContent from "../components/Train/TrainContent";
import {getPracticeExam, postAnswersToValidateQuickTrain} from "../service/apiService";

export default function ExamPage(){
    return(
        <div>
            <TrainContent fetch={getPracticeExam} validate={postAnswersToValidateQuickTrain} info={'CLF_C01'}/>
        </div>
    )

}
import TrainContent from "../components/Train/TrainContent";
import {getPracticeExam, postAnswersToValidateExam} from "../service/apiService";

export default function ExamPage(){
    return(
        <div>
            <TrainContent fetch={getPracticeExam} validate={postAnswersToValidateExam} info={'CLF_C01'}/>
        </div>
    )

}
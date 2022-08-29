import {useParams} from "react-router-dom";
import ResultGallery from "../components/Results/ResultGallery";


export default function ResultsPage(){

    const {id} = useParams()

    return(
        <div>
            { id && <ResultGallery id={id}/>}
        </div>
    )
}
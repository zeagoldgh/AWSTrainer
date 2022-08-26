import {buttons} from "../../service/data";
import ChooseButton from "./ChooseButton";
import './ButtonArea.css'


export default function ButtonArea(){

    return(
        <div className={'buttonArea'}>
            {buttons.map((btn) =>
            <ChooseButton key={btn.text} color={btn.color} text={btn.text} destination={btn.destination}/>
            )}
        </div>
    )

}
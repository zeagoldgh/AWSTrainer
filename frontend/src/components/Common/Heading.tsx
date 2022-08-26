import './Heading.css'
import {useNavigate} from "react-router-dom";
import logo from '../../img/aws-icon.png';

export default function Heading(){

    const nav = useNavigate()

    return(
        <div className={"heading"}>
            <div className="nes-container is-rounded container" onClick={()=> nav("/")}>
                <img className={" nes-avatar is-medium"} src={logo} alt="AWS cube icon"/>
                <h1 className={"nes-text is-primary"}>AWS Trainer</h1>
                <img className={" nes-avatar is-medium"} src={logo} alt="AWS cube icon"/>
            </div>
        </div>

    )
}
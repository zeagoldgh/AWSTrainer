import './Heading.css'
import {Link, useNavigate} from "react-router-dom";
import awsLogo from '../../img/aws-icon.png';
import userLogo from '../../img/user.svg';
import logo from "../../img/aws-icon.png";

interface HeadingProps{
    location : string
}

export default function Heading({location}:HeadingProps){

    const nav = useNavigate()

    return(
        <div className={"heading"}>
            <div className="nes-container is-rounded container">
                <a target="_blank" rel="noopener noreferrer" href="https://aws.amazon.com/de/?nc2=h_lg">
                <img className={" nes-avatar is-medium"} src={awsLogo} alt="AWS cube icon"/>
                </a>
                <h1 className={"nes-text is-primary"} onClick={()=> nav("/")}>AWS Trainer</h1>
                {
                    location ==="home"
                        ?
                        <Link to={'user'} >
                            <img className={"nes-avatar is-medium"} src={userLogo} alt="AWS user icon"/>
                        </Link>
                        :
                        <img className={"nes-avatar is-medium"} src={logo} alt="AWS cube icon"/>
                }

            </div>
        </div>

    )
}
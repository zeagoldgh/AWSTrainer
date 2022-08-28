import NavBar from "../components/Common/NavBar";
import React from "react";
import ButtonArea from "../components/HomePage/ButtonArea";

export default function HomePage(){
    return(
        <div>
            <NavBar location={"home"}/>
            <ButtonArea/>
        </div>
    )
}
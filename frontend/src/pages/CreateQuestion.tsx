import NavBar from "../components/Common/NavBar";
import React from "react";
import AddQuestion from "../components/CreateQuestion/AddQuestion";


export default function CreateQuestion(){
    return(
        <div>
            <NavBar location={"add"}/>
            <AddQuestion/>
        </div>
    )
}
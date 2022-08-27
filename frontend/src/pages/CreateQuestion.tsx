import Heading from "../components/Common/Heading";
import React from "react";
import AddQuestion from "../components/CreateQuestion/AddQuestion";


export default function CreateQuestion(){
    return(
        <div>
            <Heading location={"add"}/>
            <AddQuestion/>
        </div>
    )
}
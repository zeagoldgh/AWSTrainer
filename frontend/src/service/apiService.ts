import axios, {AxiosResponse} from "axios";
import {LoginResponseBody, NewQuestion, QuestionEntity} from "./models";

//Security

export const loginUser = (username:string, password:string) => {
    return axios.post(`/auth`, {'username':username, 'password':password})
        .then((response:AxiosResponse<LoginResponseBody>) => response.data)
}

export const registerUser = (username:string,password:string,passwordTwo:string)=>{
    return axios.post(`/api/user`,
        {'username':username, 'password':password,'passwordAgain':passwordTwo})
        .then((response :AxiosResponse<void>) => response.data)
}

//Questions

export const postNewQuestion = (question:NewQuestion,token:string)=>{
    return axios.post("/api/question",question,headers(token))
        .then((response: AxiosResponse<QuestionEntity>) => response.data)
}

//Hilfsmethoden
const headers = (token :string) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
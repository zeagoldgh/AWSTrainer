import axios, {AxiosResponse} from "axios";
import {AnswersGiven, LoginResponseBody, NewQuestion, QuestionEntity, ValidatedAnswer} from "./models";

//GLOBALS

const NUMBER_OF_RANDOM = 5

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

export const getRandomQuestions = (token : string) =>{
    return axios.get(`/api/question/random/${NUMBER_OF_RANDOM}`,headers(token))
        .then((response : AxiosResponse<QuestionEntity[]>)=> response.data)
}

export const postAnswersToValidateQuickTrain = (answers:AnswersGiven[],token :string) => {
    return axios.post(`/api/answer`,answers,headers(token))
        .then((response : AxiosResponse<ValidatedAnswer>) => response.data)
}

export const getResultsById = (id:string,token:string)=>{
    return axios.get(`/api/answer/${id}`,headers(token))
        .then((response : AxiosResponse<ValidatedAnswer>) => response.data)
}

//Hilfsmethoden
const headers = (token :string) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
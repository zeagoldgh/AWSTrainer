import axios, {AxiosResponse} from "axios";
import {LoginResponseBody} from "./models";


export const loginUser = (username:string, password:string) => {
    return axios.post(`/auth`, {'username':username, 'password':password})
        .then((response:AxiosResponse<LoginResponseBody>) => response.data)
}

export const registerUser = (username:string,password:string,passwordTwo:string)=>{
    return axios.post(`/api/user`,
        {'username':username, 'password':password,'passwordAgain':passwordTwo})
        .then((response :AxiosResponse<void>) => response.data)
}
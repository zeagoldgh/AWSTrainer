import axios, {AxiosResponse} from "axios";
import {LoginResponseBody} from "./models";


export const loginUser = (username:string, password:string) => {
    return axios.post(`/auth`, {'username':username, 'password':password})
        .then((response:AxiosResponse<LoginResponseBody>) => response.data)
}
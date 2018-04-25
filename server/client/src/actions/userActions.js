import axios from "axios/index";
import { FETCH_LOGIN } from './types';

export function verifyLogin(userdata){
    return dispatch => {
        return axios.get('/userRoutes/verifyLogin',{
            params: {
              email: userdata.email,
              password: userdata.password
            }
        })
        .then((response)=>{
            dispatch(userInfo(response.data));
        });
    }
}


export function userInfo(values){
    return{
        type:"USER_INFO",
        payload:values
    }
}

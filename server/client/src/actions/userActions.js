import axios from 'axios';
import { FETCH_LOGIN } from './types';
import {searchMvHall} from "./adminActions";



 // export function verifyLogin(userdata){
 //     return dispatch => {
 //         console.log(userdata.email);
 //         return axios.post('/userRoutes/verifyLogin',
 //             {
 //               email: userdata.email,
 //               password: userdata.password
 //             }
 //         )
         // .then((response)=>{
         //     dispatch(userInfo(response.data));
         // });
//     }
// }
//
//  export const verifyLogin= (userdata) => async dispatch => {
//          console.log(userdata.email);
//          const res = axios.get('/userRoutes/verifyLogin',{
//              params:{
//                  email: userdata.email,
//                  password: userdata.password
//              }
//          })
         // .then((response)=>{
         //     dispatch(userInfo(response.data));
         // });
     //};



export function verifyLogin(userdata) {
    return dispatch => {
        return axios.get('/userRoutes/verifyLogin', {
            params: {
                email: userdata.email,
                password: userdata.password
            }
        })
    }
}

export function signup(userdata){
    return dispatch => {
        return axios.get('/userRoutes/signup',{
            params: {email: userdata.email,
                password: userdata.password,
                firstName:userdata.firstName
            }
        })
    }
}


export function fetchUserDetails(userId) {
    return dispatch => {
        return axios.get('/userRoutes/fetchUserDetails', {
            params: {
                userId: userId
            }
        })
    }
}

export function logout(userId) {
    console.log('In logout action');
    return dispatch => {
        return axios.get('/userRoutes/logout', {
            params: {
                userId: userId
            }
        })
    }
}

export function updateProfile(userdata) {
    console.log("In update");
    return dispatch => {
        return axios.get('/userRoutes/UpdateProfile', {
            params: {
                userdata: userdata
            }
        })
    }
}


export function searchUser(searchData){
    return dispatch => {
        console.log("inside search movie Hall data",searchData);
        return axios.post('/userRoutes/searchUser',{searchStr : searchData}).then((response)=>{
            dispatch(searchUserData(response.data));
        });
    }
}

export function userInfo(values){
    return{
        type:"FETCH_LOGIN",
        payload:values
    }
}

export function searchUserData(values){
    return{
        type:"SEARCH_USER",
        payload:values
    }
}
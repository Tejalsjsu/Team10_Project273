import { FETCH_LOGIN } from '../actions/types';
import {combineReducers} from "redux";

const initialState = {
    userDetails: {},
    userData: {},
    message : ""
}

export const data = (state =  {
    userDetails:{}
}, action) => {

    switch (action.type) {
        case FETCH_LOGIN:
            state={
                ...state,
                userDetails: action.payload
            };
            break;

        case "SEARCH_USER":
            console.log("inside search hall reducer",action.payload);
            state= {
                ...state,
                userData:action.payload, //use this in proprs to display
                message : "searched"
            };
            console.log("Hall Data",state.userData);
            break;
        default:
            return state;
    }
}

export default combineReducers({
    data
});

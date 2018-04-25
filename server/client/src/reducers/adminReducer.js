import {combineReducers} from 'redux'

export const data = (state =  {
    hallData: {},
    message : ""
}, action) =>{

    switch (action.type) {
        case "ADD_HALL":
            console.log("In reducer add hall",action.payload);
            state= {
                ...state,
                message:action.payload
            };
            break;
            console.log("inside ADD_HALL after setting",state);

        case "SEARCH_HALL":
            console.log("inside search hall reducer",action.payload);
            state= {
                ...state,
                hallData:action.payload,
                message : "searched"
            };
            console.log("Hall Data",state.hallData);
            break;
        case "UPDATE_HALL":
            console.log("inside update hall reducer",action.payload);
            state= {
                ...state,
                hallData : action.payload.hallData,
                message:action.payload.message
            };
            break;
        default:
            return state;
    }
    return state;
}
export default combineReducers({
    data
});
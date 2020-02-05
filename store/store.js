import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import { composeWithDevTools } from 'redux-devtools-extension';
const userInitialState={
}
const UPDATE_USERNAME='UPDATE_USERNAME';
const LOGOUT="LOGOUT";
function userReducer(state=userInitialState,action){
    switch(action.type){
        case LOGOUT:{
            return {}
        }
        default:
            return state
    }
}

const allReducers=combineReducers({
    user:userReducer
})
export function logout(){
    return dispatch=>{
        axios.post('/logout')
        .then(resp=>{
            if(resp.status===200){
                dispatch({
                    type:LOGOUT
                })
            }else{
                console.log('logout failed',resp)
            }
        })
    }
}
export default function initializeStore(state){
    const store=createStore(allReducers,Object.assign({},{
        user:userInitialState
    },state),composeWithDevTools(applyMiddleware(thunkMiddleware)));
    return store;
};
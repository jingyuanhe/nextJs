import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
const counterInitialState={
    count:0
}
const userInitialState={
    name:'Jock'
}
const ADD='ADD';
const UPDATE_USERNAME='UPDATE_USERNAME';
function counterReducer(state=counterInitialState,action){
    switch(action.type){
        case ADD:
            return {count:state.count+(action.num||1)}
        default:
            return state
    }
}
function userReducer(state=userInitialState,action){
    switch(action.type){
        case UPDATE_USERNAME:
            return{
                ...state,
                name:action.name
            }
        default:
            return state
    }
}
export function add(num){
    return{
        type:ADD,
        num
    }
}
function addAsync(num){
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(add(num))
        },1000)
    }
}
const allReducers=combineReducers({
    counter:counterReducer,
    user:userReducer
})

export default function initializeStore(state){
    const store=createStore(allReducers,Object.assign({},{
        counter:counterInitialState,
        user:userInitialState
    },state),composeWithDevTools(applyMiddleware(thunkMiddleware)));
    return store;
};
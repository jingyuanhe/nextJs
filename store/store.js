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
function add(num){
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
const store=createStore(allReducers,{
    counter:counterInitialState,
    user:userInitialState
},composeWithDevTools(applyMiddleware(thunkMiddleware)));
console.log(store)
export default store;
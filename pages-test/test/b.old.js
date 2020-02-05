import React,{ useState,useEffect,useReducer,useContext ,useRef} from 'react'
import myContext from '../../lib/my-context';
function countReducer(state,action){
    switch(action.type){
        case 'add':
            return state+1;
        case 'minus':
            return state-1;
        default:
            return state
    }
}
function MyCountFunc(){
    const [count,dispatch]=useReducer(countReducer,0);
    const [name,setNmae]=useState('jocky');
    const context=useContext(myContext);
    const inputRef=useRef();
    useEffect(()=>{
        console.log(inputRef);
        return ()=>console.log('effect deteched')
    },[count])
return (
    <div>
        <input value={name} onChange={(e)=>setNmae(e.target.value)} ref={inputRef}></input>
        <button onClick={()=>{dispatch({type:'add'})}}>{count}</button>
        <p>{context}</p>
    </div>
)
}
export default MyCountFunc
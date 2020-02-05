import React,{ useState,
    useEffect,
    useReducer,
    useContext ,
    useRef,
    memo,
    useCallback,
    useMemo

} from 'react'
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
    const alertRef=useRef();
    alertRef.current=count;
    const config=useMemo(()=>({
        text:`count is ${count}`,
        color:count>3?'red':'blue'
    }),[count])
    const handleButtonClick=useCallback(()=>dispatch({type:'add'}),[]);
    const handelAlertClick=function(){
        setTimeout(()=>{
            alert(alertRef.current)
        },2000)
    }
    return (
        <div>
            <input value={name} onChange={(e)=>setNmae(e.target.value)}></input>
            <Child
                config={config}
                onButtonClick={handleButtonClick}
            >
            </Child>
            <button onClick={handelAlertClick}>alert button</button>
        </div>
    )
}
const Child=memo(function Child({onButtonClick,config}){
    console.log('child render');
    return  <button onClick={onButtonClick} style={{color:config.color}}>{config.text}</button>
})
export default MyCountFunc
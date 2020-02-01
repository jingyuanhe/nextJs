import {Button} from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import {connect} from 'react-redux'
const Index= ({count,userName,updataName,add}) => {
    return (
        <>
        <span>{count}</span>
        <span>{userName}</span>
        <input value={userName} onChange={(e)=>updataName(e.target.value)}></input>
        <button onClick={()=>{add(count)}}>updata count</button>
        </>
    )
}
const mapStateToProps=(state)=>{
    return{
        count:state.counter.count,
        userName:state.user.name
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        add:num=>{
            dispatch({type:'ADD',num})
        },
        updataName:name=>{
            dispatch({type:'UPDATE_USERNAME',name})
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Index)
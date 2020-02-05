import {Button} from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import {connect} from 'react-redux'
import {add} from '../store/store'
import axios from 'axios'
import {useEffect} from 'react'
import getconfig from 'next/config'
const {publicRuntimeConfig}=getconfig();
const Index= ({count,userName,updataName,add}) => {
    useEffect(()=>{
        axios.get('/api/user/info').then(resp=>console.log(resp))
    },[])
    return (
        <>
        <span>{count}</span>
        <span>{userName}</span>
        <input value={userName} onChange={(e)=>updataName(e.target.value)}></input>
        <button onClick={()=>{add(count)}}>updata count</button>
        <a href={publicRuntimeConfig.OAUTH_URL}>登录</a>
        </>
    )
}
Index.getInitialProps=async ({reduxStore})=>{
    reduxStore.dispatch(add(3))
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
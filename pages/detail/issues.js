import withRepoBasic from '../../components/with-repo-basic.jsx'
const api = require('../../lib/api')
import { Avatar,Button,Select,Spin } from 'antd'
import {useState,EffectCallback, useCallback} from 'react'
import dynamic from 'next/dynamic'
import SearchUser from '../../components/SearchUser'
import {getLastUpdataed} from '../../lib/utils'
const MdRenderer=dynamic(()=>import('../../components/MarkDownRender'))
function IssueDetail({issue}){
    return <div className="root">
        <MdRenderer content={issue.body}></MdRenderer>
        <div className="actions">
            <Button href={issue.html_url} target="_blank">打开Issue讨论页面</Button>
        </div>
        <style jsx>{
            `
             .root{
                 background:#fefefe;
                 padding:20px;
             }
             .actions{
                 text-align:right;
             }
            `    
        }</style>
    </div>
}
function IssueItem({ issue }) {
    const [showDetail,setShowDetail]=useState(false);
    const toggleShowDetail=useCallback(()=>{setShowDetail(detail=>!detail)},[])
    return (
        <div>
            
            <div className="issue">
                <Button type="primary" size="small" style={{position:'absolute',right:20,top:20}} onClick={toggleShowDetail}>
                    {showDetail?'隐藏':'显示'}
                </Button>
                <div className="avatar">
                    <Avatar src={issue.user.avatar_url} shape="square" size={50}></Avatar>
                </div>
                <div className="main-info">
                    <h6><span>{issue.title}</span>
                    {
                        issue.labels.map(label=><Label label={label} key={label.id}></Label>)
                    }
                    
                    </h6>

                    <p className="sub-info">
                        <span>Updated at {getLastUpdataed(issue.updated_at)}</span>
                    </p>
                </div>
                <style jsx>
                    {
                        `
                        .issue{
                            display:flex;
                            position:relative;
                            padding:10px;
                        }
                        .issue:hover{
                            background:#fafafa;
                        }
                        .issue + .issue{
                            border-top:1px solid #eee;
                        }
                        .main-info > h6{
                            max-width:600px;
                            padding-right:40px;
                            font-size:16px;
                        }
                        .avatar{
                            margin-right:20px;
                        }
                        .sub-info{
                            margin-bottom:0
                        }
                        .sub-info > span + span{
                            display:inline-block;
                            margin-left:20px;
                            font-size:12px;
                        }
                        `
                    }
                </style>
            </div>
            <div>
                {showDetail?<IssueDetail issue={issue}></IssueDetail>:null}
            </div>
        </div>
    )
}
function makeQuery(creator,state,labels){
    let creatorStr=creator?`creator=${creator}`:'';
    let stateStr=state?`state=${state}`:'';
    let labelStr="";
    if(labels&&labels.length){
        labelStr=`labels=${labels.join(',')}`
    }
    const arr=[];
    if(creatorStr) arr.push(creatorStr);
    if(stateStr) arr.push(stateStr);
    if(labelStr) arr.push(labelStr)
    return `?${arr.join('&')}`
}
function Label({label}){
    return (
        <>
            <span className="label" style={{backgroundColor:`#${label.color}`}}>{label.name}</span>
            <style jsx>
                {
                    `
                    .label{
                        display:inline-block;
                        margin-left:15px;
                        line-height:20px;
                        font-size:14px;
                        padding:3px 5px;
                    }
                    `
                }
            </style>
        </>
    )
}
const Option=Select.Option;
function Issues({initialIssues,owner,name,labels }) {
    const [issues,setIssues]=useState(initialIssues);
    const [label,setLabel]=useState([]);
    const [creator,setCreator]=useState();
    const [state,setState]=useState();
    const [fetching,setFetching]=useState(false);
    const handleCreatorChange=useCallback(value=>{
        setCreator(value)
    },[]);
    const handleStateChange=useCallback(value=>{
        setState(value)
    },[])
    const handleLabelChange=useCallback(value=>{
        setLabel(value)
    },[]);
    const hangdleSearch=useCallback(()=>{
        setFetching(true);
        api.request({ url: `/repos/${owner}/${name}/issues${makeQuery(creator,state,label)}`}).then(res=>{
            setIssues(res.data);
            setFetching(false);
        }).catch(err=>{
            console.error(err);
            setFetching(false);
        })
    })
    return <div className="root">
       
        <div className="search">
            <SearchUser onSearch={handleCreatorChange} value={creator}></SearchUser>
            <Select placeholder="状态" value={state} onChange={handleStateChange} style={{width:200,marginLeft:20}}>
                <Option value="all">all</Option>
                <Option value="open">open</Option>
                <Option value="closed">closed</Option>
            </Select>
            <Select placeholder="Label" value={label} onChange={handleLabelChange} style={{width:200,marginLeft:20,flexGrow:1,marginRight:20}} mode="multiple">
                {
                    labels.map(la=><Option value={la.name} key={la.name}>{la.name}</Option>)
                }
            </Select>
            <Button type="primary" onClick={hangdleSearch} disabled={fetching}>搜索</Button>
        </div>
        {fetching?<div className="loading"><Spin></Spin></div>:<div className="issues">
            {issues.map(issue=><IssueItem issue={issue} key={issue.id}></IssueItem>)}
        </div>}
        
        <style jsx>
            {`
                .issues{
                    border:1px solid #eee;
                    border-radius:5px;
                    margin-bottom:20px;
                    margin-top:20px;
                }
                .search{
                    display:flex;
                }
                .loading{
                    display:flex;
                    align-items:center;
                    height:400px;
                    justify-content:center;
                }
            `}
        </style>
    </div>
}
Issues.getInitialProps = async ({ ctx }) => {
    const { owner, name } = ctx.query;
   
    const fetchs=await Promise.all([
        await api.request({ url: `/repos/${owner}/${name}/issues` }, ctx.req, ctx.res),
        await api.request({url:`/repos/${owner}/${name}/labels`},ctx.req,ctx.res)
    ]);
    return {
        owner,
        name,
        initialIssues:fetchs[0].data,
        labels:fetchs[1].data
    }
}
export default withRepoBasic(Issues, 'issues');
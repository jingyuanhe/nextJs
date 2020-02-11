import axios from 'axios'
import {useEffect} from 'react'
import { Button, Icon,Tabs } from 'antd'
const api = require('../lib/api');
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();
import { connect } from 'react-redux'
import Repo from '../components/Repo'
const { TabPane } = Tabs;
import { withRouter } from 'next/router'
import Router from 'next/router'
import LRU from 'lru-cache'
import {setArrayCache} from '../lib/repo-basic-cache'
const cache =new LRU({
    // 缓存有效期
    maxAge:1000*60*10
  })
const isServer=typeof window==='undefined'
function Index({ repos, starred, user,router }) {
    const tabKey=router.query.key||'1';
    const hangdleTabChange=(activeKey)=>{
        Router.push(`/?key=${activeKey}`)
    }
    useEffect(()=>{
        if(!isServer){
            if(repos){
                cache.set('repos',repos)
            }
            if(starred){
                cache.set('starred',starred)
            }
            setArrayCache(repos);
            setArrayCache(starred);
        }
       
    },[repos,starred])
    if (!user || !user.id) {
        return (
            <div className="root">
                <p>亲，你还没有登录哟~</p>
                <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>点击登录</Button>
                <style jsx>
                    {
                        `
                            .root{
                                display:flex;
                                align-items:center;
                                height:400px;
                                flex-direction:column;
                                justify-content:center;
                            }
                        `
                    }
                </style>
            </div>
        )
    }
    return (
        <div className="root">
            <div className="user-info">
                <img src={user.avatar_url} alt="user avatar" className="avatar"></img>
                <span className="login">{user.login}</span>
                <span className="name">{user.name}</span>
                <span className="bio">{user.bio}</span>
                <p className="email">
                    <Icon type="mail" style={{ marginRight: 10 }}></Icon>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
            </div>
            <div className="user-repos">
                <Tabs defaultActiveKey={tabKey} onChange={hangdleTabChange}>
                    <TabPane tab="你的仓库" key="1">
                        {repos.map(rep=>(<Repo repo={rep} key={rep.id}></Repo>))}
                    </TabPane>
                    <TabPane tab="你关注的仓库" key="2">
                        {starred.map(rep=>(<Repo repo={rep} key={rep.id}></Repo>))}
                    </TabPane>
            </Tabs>
            </div>
            <style jsx>{
            `
                .root{
                    display:flex;
                    align-items:flex-start;
                    padding:20px 0;
                    overflow:hidden;
                }
                .user-info{
                    display:flex;
                    width:200px;
                    flex-shrink:0;
                    margin-right:40px;
                    flex-direction:column;
                }
                .login{
                    font-weight:800;
                    font-size:20px;
                    margin-top:20px;
                }
                .name{
                    font-size:16px;
                    color:#777
                }
                .bio{
                    color:#333;
                    margin-top:20px;
                }
                .avatar{
                    width:100px;
                    border-radius:5px;
                }
                .user-repos{
                    flex-grow:1
                }
            `    
            }</style>
        </div>
    )
}
Index.getInitialProps = async ({ ctx, reduxStore }) => {
    const user = reduxStore.getState().user;
    if (!user || !user.id) {
        return {
        }
    }
    if(!isServer){
        if(cache.get('repos')&&cache.get('starred')){
            return{
                repos:cache.get('repos'),
                starred:cache.get('starred')
            }
        }
    }
    const repos = await api.request({ url: '/user/repos' }, ctx.req, ctx.res);
    const starred = await api.request({ url: '/user/starred' }, ctx.req, ctx.res);
    
    return {
        repos: repos.data,
        starred: starred.data
    }
}
export default withRouter(connect(function mapStateToProps(state) {
    return {
        user: state.user
    }
})(Index))
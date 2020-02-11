import { withRouter } from 'next/router'
const api = require('../lib/api');
import {isValidElement,useEffect} from 'react'
import { List, Row, Col,Pagination } from 'antd'
import Link from 'next/link'
import {setArrayCache} from '../lib/repo-basic-cache'
import Router from 'next/router'
import Repo from '../components/Repo'
const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust'];
const SORT_TYPES = [
    {
        name: 'Best Match'
    },
    {
        name: 'Most Stars',
        value: 'stars',
        order: 'desc'
    },
    {
        name: 'Fewest Stars',
        value: 'stars',
        order: 'asc'
    },
    {
        name: 'Most Forks',
        value: 'forks',
        order: 'desc'
    },
    {
        name: 'Fewest Forks',
        value: 'forks',
        order: 'asc'
    }
]
const doSearch=config=>{
    Router.push({
        pathname:'/search',
        query:config
    })
}
const per_page=20;
const isServer=typeof window==='undefined';
const FilterLink=({name,query,lang,sort,order,page})=>{
    let queryString = `?query=${query}`;
    if (lang) queryString += `&lang=${lang}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`;
    if (page) queryString += `&page=${page}`;
    queryString+=`&per_page=${per_page}`
return <Link href={queryString}>{isValidElement(name)?name:<a>{name}</a>}</Link>
}
const selectedItemStyle={
    borderLeft:'1px solid #e36209',
    fontWeight:100
}

function Search({ repos, router }) {
    const {...querys}=router.query;
    const {sort,order,lang,query,page}=router.query;
    useEffect(()=>{
        if(!isServer)
        setArrayCache(repos.items);
    },[])
    return (
        <div className="root">
            <Row gutter={20}>
                <Col span={6}>
                    <List
                        bordered
                        header={<span className="list-header">语言</span>}
                        dataSource={LANGUAGES}
                        style={{ marginBottom: 20 }}
                        renderItem={item => {
                            const selected=lang===item;
                            return <List.Item style={selected?selectedItemStyle:null}>
                                {selected?<span>{item}</span>:<FilterLink {...querys} lang={item} name={item}></FilterLink>}
                               
                            </List.Item>
                        }}
                    >
                    </List>
                    <List
                        bordered
                        header={<span className="list-header">排序</span>}
                        dataSource={SORT_TYPES}
                        style={{ marginBottom: 20 }}
                        renderItem={item => {
                            let selected=false;
                            if(item.name==='Best Match'&&!sort){
                                selected=true
                            }else if(item.value===sort&&item.order===order){
                                selected=true
                            }else{
                                selected=false
                            }
                            return <List.Item style={selected?selectedItemStyle:null}>
                                {
                                    selected?<span>{item.name}</span>:<FilterLink {...querys} sort={item.value} name={item.name} order={item.order}></FilterLink>
                                }
                                
                            </List.Item>
                        }}
                    >
                    </List>
                </Col>
                <Col span={18}>
                    <h3 className="repos-title">{repos.total_count} 个仓库</h3>
                    {
                        repos.items.map(repo=><Repo repo={repo} key={repo.id}></Repo>)
                    }
                    <div className="pagination">
                        <Pagination
                            total={repos.total_count}
                            current={Number(page)||1}
                            pageSize={per_page}
                            onChange={()=>{}}
                            itemRender={(page,type,ol)=>{
                                const p=type==='page'?page:type==='prev'?page-1:page+1;
                                const name=type==='page'?page:ol;
                                return <FilterLink {...querys} name={name} page={p}></FilterLink>
                            }}
                        >

                        </Pagination>
                    </div>
                </Col>
            </Row>
            <style jsx>
                {
                    `.root{
                        padding:20px 0;
                    }
                    .list-header{
                        font-weight:800;
                        font-size:16px;
                    }
                    .repos-title{
                        border-bottom:1px solid #eee;
                        font-size:24px;
                        line-height:50px;
                    }
                    .pagination{
                        padding:20;
                        text-align:center;
                    }
                    `
                }
            </style>
        </div>
    )
}
Search.getInitialProps = async ({ ctx }) => {
    const { query, sort, lang, order, page } = ctx.query;
    if (!query) {
        return {
            repos: {
                total_count: 0
            }
        }
    }
    let queryString = `?q=${query}`;
    if (lang) queryString += `+language:${lang}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`;
    if (page) queryString += `&page=${page}`;
    queryString+=`&per_page=${per_page}`
    const result = await api.request({
        url: `/search/repositories${queryString}`
    }, ctx.req, ctx.res);
    return {
        repos: result.data
    }
}
export default withRouter(Search)
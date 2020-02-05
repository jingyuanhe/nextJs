import { Button, Layout, Icon, Input, Avatar } from 'antd'
import { useState, useCallback } from 'react'
const { Header, Content, Footer } = Layout;
import Container from './Container'
export default ({ children }) => {
    const [search, setSearch] = useState('');
    const handleSearchChange = useCallback(event => {
        setSearch(event.target.value)
    }, [])
    const handleOnSearch = useCallback(() => { }, [])
    const githubIconStyle={
        color:'white',
        fontSize:40,
        paddingTop:10,
        marginRight:20,
        display:'block'
    }
    const footerStyle={
        display:'flex',
        justifyContent:'center'
    }
    return (
        <Layout>
            <Header>
                <Container renderer={<div className="header-inner" />}>
                <div className='header-left'>
                        <div className="logo">
                            <Icon type="github" style={githubIconStyle}/>
                        </div>
                        <div>
                            <Input.Search placeholder="搜索仓库" onChange={handleSearchChange} onSearch={handleOnSearch} />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user">
                            <Avatar icon="user" size={40} />
                        </div>
                    </div>
                </Container>
            </Header>
            <Content>
                <Container>
                    {children}
                </Container>
                
                </Content>
            <Footer style={footerStyle}>
                Develop by Yuanhe.Jing @<a href="mailto:yuanhe.jing@163.com">yuanhe.jing@163.com</a>
            </Footer>
            <style jsx>
                {
                    `.header-inner{
                        display:flex;
                        justify-content:space-between;
                    }
                    .header-left{
                        display:flex;
                        justify-content:flex-start;
                    }
                    
                    `
                }
            </style>
            <style jsx global>
                {`
                #__next{
                    height:100%
                }
                .ant-layout{
                    height:100%
                }
                .ant-layout-header{
                    padding-left:0;
                    padding-right:0
                }
                `}
            </style>
        </Layout>
    )

}

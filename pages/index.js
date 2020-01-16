import {Button} from 'antd'
import Link from 'next/link'
import Router from 'next/router'
export default () => {
    function gotoTest(){
        Router.push({
            pathname:'/test/b',
            query:{
                id:2
            }
        },'/test/b/2')
    }
    return (
        <>
            <Link href='/a?id=1' as="/a/1"><Button>Welcome to next.js!</Button></Link>
            <Button onClick={gotoTest}>Test B</Button>
        </>
    )
}
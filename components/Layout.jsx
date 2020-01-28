import {Button} from 'antd'
import Link from 'next/link'
export default ({children})=>{
    return <>
            <header>
                <Link href={{pathname:'/a',query:{id:1}}} as="/a/1"><Button>A</Button></Link>
                <Link href={{pathname:'/test/b',query:{id:'B'}}} as='/test/b/B'><Button>B</Button></Link>
            </header>
            {children}
        </>
    }
    
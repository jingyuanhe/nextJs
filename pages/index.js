import {Button} from 'antd'
import Link from 'next/link'
import Router from 'next/router'
// const events=[
//     'routeChangeStart',
//     'routeChangeComplete',
//     'routeChangeError',
//     'beforeHistoryChange',
//     'hashChangeStart',
//     'hashChangeComplete'
// ]
// function makeEvent(type){
//     return (...args)=>{
//         console.log(type,...args)
//     }
// }
// events.forEach(event=>{
//     Router.event.on(event,makeEvent(event))
// })
export default () => {
    return (
        <>
            <span>index</span>
        </>
    )
}
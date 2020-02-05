import {Button} from 'antd'
import { withRouter } from 'next/router'
import React from 'react'
import dynamic from 'next/dynamic'//异步加载
const Com=dynamic(import('../components/comp.jsx'))
const a=class extends React.Component {
  static async getInitialProps({ req,query }) {
    const moment =await import('moment')//异步加载
    const id=query.id;
    const time=moment.default(Date.now()-60*1000).fromNow();
    return {id,time }
  }

  render() {
    return (
      <>
      <Com></Com>
    <Button>{this.props.id}</Button>
    <span>{this.props.time}</span>
    </>
    )
  }
}
export default withRouter(a);
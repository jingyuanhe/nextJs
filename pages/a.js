import {Button} from 'antd'
import { withRouter } from 'next/router'
import React from 'react'

const a=class extends React.Component {
  static async getInitialProps({ req,query }) {
    const id=query.id;
    return {id }
  }

  render() {
    return (
    <Button>{this.props.id}</Button>
    )
  }
}
export default withRouter(a);
import {Button} from 'antd'
import { withRouter } from 'next/router'
const a= ({router})=>(
    <Button>{router.query.id}</Button>
)
export default withRouter(a);
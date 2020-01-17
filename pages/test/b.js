import {Button} from 'antd'
import { withRouter } from 'next/router'
const B=({router})=>(
<Button>{router.query.id}</Button>
)
export default withRouter(B);
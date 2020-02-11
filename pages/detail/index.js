import withRepoBasic from '../../components/with-repo-basic.jsx'
const api = require('../../lib/api');
import MarkDownRender from '../../components/MarkDownRender'
function Detail({readme}){
   
return <MarkDownRender content={readme.content} isBase64={true}></MarkDownRender>
}
Detail.getInitialProps=async ({ctx})=>{
    console.log(ctx)
    const readmeRep=await api.request({url:`/repos/${ctx.query.owner}/${ctx.query.name}/readme`},ctx.req,ctx.res);
    return {
       readme:readmeRep.data
    }
}
export default withRepoBasic(Detail,'index');
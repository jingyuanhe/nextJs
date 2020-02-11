import withRepoBasic from '../../components/with-repo-basic.jsx'
function Detail({text}){
return <span>{text}</span>
}
Detail.getInitialProps=async ()=>{
    return {
        text:3
    }
}
export default withRepoBasic(Detail);
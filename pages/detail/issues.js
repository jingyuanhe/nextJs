import withRepoBasic from '../../components/with-repo-basic.jsx'
function Issues({text}){
return <span>{text}</span>
}
Issues.getInitialProps=async ()=>{
    return {
        text:3222
    }
}
export default withRepoBasic(Issues,'issues');
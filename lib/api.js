const axios=require('axios')
const isServer=typeof window==='undefined'
const github_base_url='https://api.github.com';
async function requestGithub(method,url,data={},headers){
    return await axios({
        method,
        url:`${github_base_url}${url}`,
        data,
        headers
    })
}
async function request({method='GET',url,data={}},req,res){
    if(isServer){
        const session=req.session;
        const githubAuth=session.githubAuth||{};
        const headers={};
        if(githubAuth.access_token){
            headers['Authorization']=`${githubAuth.token_type} ${githubAuth.access_token}`
        }
        return requestGithub(method,url,data,headers)
    }else{
        return axios({
            method,
            url:`/github${url}`,
            data
        })
    }
}
module.exports={
    requestGithub,
    request
}
const config=require('../config');
const axios=require('axios')
const {request_token_url,client_id,client_secret}=config.github;
module.exports=server=>{
    server.use(async (ctx,next)=>{
        if(ctx.path==='/auth'){
            const code =ctx.query.code;
            if(code){
                const result=await axios({
                    method:"POST",
                    url:request_token_url,
                    data:{
                        client_id,
                        client_secret,
                        code
                    },
                    headers:{
                        Accept:'application/json'
                    }
                })
                if(result.status===200&&(result.data&&!result.data.error)){
                    ctx.session.githubAuth=result.data;
                    const {access_token,token_type}=result.data;
                    const userInfoResp=await axios({
                        method:'GET',
                        url:'https://api.github.com/user',
                        headers:{
                            "Authorization":`${token_type} ${access_token}`
                        }
                    })
                    ctx.session.userInfo=userInfoResp.data;
                    ctx.redirect((ctx.session&&ctx.session.urlBeforeOAuth)||'/');
                    ctx.session.urlBeforeOAuth='';
                }else{
                    ctx.body=`qequest token failed ${result.message}`
                }
            }else{
                ctx.body='code not exist';
                return
            }
        }else{
            await next();
        }
    })
    server.use(async (ctx,next)=>{
        const path=ctx.path;
        const method=ctx.method;
        if(path==='/logout'&&method==='POST'){
            ctx.session=null;
            ctx.body='logout success'
        }else{
            await next();
        }
    })
    server.use(async (ctx,next)=>{
        const path=ctx.path;
        const method=ctx.method;
        if(path==='/prepare-auth'&&method==='GET'){
            const {url}=ctx.query;
            ctx.session.urlBeforeOAuth=url;
            ctx.redirect(config.OAUTH_URL)
        }else{
            await next();
        }
    })
}
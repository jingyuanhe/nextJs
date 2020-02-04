const Koa=require('koa');
const Router=require('koa-router');
const next=require('next');
const session = require('koa-session');
const RedisSessionStore=require('./server/session-store');
const Redis=require('ioredis');
const auth=require('./server/auth')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();
const redis=new Redis();
app.prepare().then(()=>{
    const server=new Koa();
    const router=new Router();
    server.keys=['Jocky develop Github app'];
    const SESSION_CONFIG={
        key:'jid',
        store:new RedisSessionStore(redis)
    }
    server.use(session(SESSION_CONFIG,server));
    auth(server);
    router.get('/a/:id',async (ctx)=>{
        const id=ctx.params.id;
        app.render(ctx.req,ctx.res,'/a',{id:1})
        ctx.respond=false
    });
    router.get('/api/user/info',async ctx=>{
        const user=ctx.session.userInfo;
        if(!user){
            ctx.status=401;
            ctx.body='need login'
        }else{
            ctx.body=user;
            ctx.set('Content-Type','application/json')
        }
    })
    server.use(router.routes());
    server.use(async (ctx,next)=>{
        await handle(ctx.req,ctx.res);
        ctx.respond=false
    })
    server.listen(3000,()=>{
        console.log('koa server running on 3000')
    })
})
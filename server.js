const Koa=require('koa');
const Router=require('koa-router');
const next=require('next');
const session = require('koa-session');
const RedisSessionStore=require('./server/session-store');
const Redis=require('ioredis');
const auth=require('./server/auth')
const api=require('./server/api')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();
const redis=new Redis();
const koaBody=require('koa-body');
const atob=require('atob');
global.atob=atob;
app.prepare().then(()=>{
    const server=new Koa();
    const router=new Router();
    server.keys=['Jocky develop Github app'];
    server.use(koaBody())
    const SESSION_CONFIG={
        key:'jid',
        store:new RedisSessionStore(redis)
    }
    server.use(session(SESSION_CONFIG,server));
    auth(server);
    api(server);
    router.get('/a/:id',async (ctx)=>{
        const id=ctx.params.id;
        app.render(ctx.req,ctx.res,'/a',{id:1})
        ctx.respond=false
    });
    server.use(router.routes());
    server.use(async (ctx,next)=>{
        ctx.req.session=ctx.session;
        await handle(ctx.req,ctx.res);
        ctx.respond=false
    })
    server.listen(3000,()=>{
        console.log('koa server running on 3000')
    })
})
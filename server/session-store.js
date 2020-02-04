function getRedisSessionId(id){
    return `ssid:${id}`
}
class RedisSessionStore{
    constructor(client){
        this.client=client;
    }
    async get(sid){
        console.log('getSession',sid)
        const id=getRedisSessionId(sid);
        const data=await this.client.get(id);
        if(!data){
            return null
        }
        try{
            let result=JSON.parse(data);
            return result
        }catch(err){
            console.error(err);
        }
    }
    async set(sid,sess,ttl){
        console.log('setSession',sid);
        const id=getRedisSessionId(sid);
        if(typeof ttl==='number'){
            ttl=Math.ceil(ttl/1000)
        }
        try{
            const sessStr=JSON.stringify(sess)
            if(ttl){
                this.client.setex(id,ttl,sessStr)
            }else{
                this.client.set(id,sessStr);
            }
        }catch(err){
            console.error(err);
        }
        
    }
    async destroy(sid){
        console.log('delSession',sid);
        const id=getRedisSessionId(sid);
        await this.client.del(id);
    }
}
module.exports=RedisSessionStore;
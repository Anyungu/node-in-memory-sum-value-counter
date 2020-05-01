

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const crypto = require('crypto');




export async function cacheData(value) {


    try {

        var x = globalThis.nodeCacheInstance;

        var secret =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        var now = Date.now().toString();
    
        const hash = crypto.createHmac('sha256', secret)
                    .update(secret + now)
                    .digest('hex');


    let success =  x.set( hash, value, 3600 );

    if (success !== true) {
        return { error: "Failed to save to Cache" };
    }

    return {value: true}

    }catch(err) {
        return { error: err.message };
    }

}


export async function getCacheData(value) {

    try {


        var x = globalThis.nodeCacheInstance;

        let keys = x.keys();

        let res = x.mget(keys);

        var initialSum = 0;

        const filter = (raw, proc) => Object.keys(raw)
                    .filter( key =>  raw[key].metric === value)
                    .reduce( (obj, key) => {
                        proc.sum = initialSum + raw[key].value; 
                        sum = raw[key].value; 
                        return proc;
                    }, {});

        
        var sumObject = filter(res, {});


        if (Object.keys(sumObject).length === 0) {
            return { error: `No Records for key metric ${value} within the last hour`};
        }

        return {value: sumObject.sum};
        
    } catch (error) {
        return { error: err.message };
    }

    

  
}
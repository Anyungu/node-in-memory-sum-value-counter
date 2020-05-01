

import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const NodeCache = require( "node-cache" );

var nodeCacheInstance = new NodeCache();


//ensure cache is global
export const cacheStart = () => {
    globalThis.nodeCacheInstance = nodeCacheInstance;
} 


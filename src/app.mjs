

import { createRequire } from 'module';
const require = createRequire(import.meta.url);



const express = require('express');



import {restRouter} from './api/index.mjs';
import { cacheStart } from './config/cache.mjs';
// import * as cors from 'cors';



const app = express();
const PORT = 9200;



app.use(express.json());
app.use(express.urlencoded({extended: true}));


//set up in memory cache
cacheStart();


//main route
app.use('/', restRouter)

app.use((req, res, next) => {
    const error = new Error('Not Found'); 
    error.message = 'Invalid Route';
    error.status = 404;
    next(error);
});


app.listen(process.env.PORT || PORT, () => {
     console.log('listening..... 9200')
})
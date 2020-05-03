

import { createRequire } from 'module';
const require = createRequire(import.meta.url);



const express = require('express');
var cors = require('cors')



import {restRouter} from './api/index.mjs';
import { cacheStart } from './config/cache.mjs';




const app = express();
const PORT = 9200;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//set up in memory cache
cacheStart();


//main route
app.use('/', restRouter)

app.use((req, res, next) => {
    const error = new Error('Not Found'); 
    error.message = 'Invalid Route, Try url/api-docs to view the swagger docs';
    error.status = 404;
    next(error.message);
});


app.listen(process.env.PORT || PORT, () => {
     console.log('listening..... 9200')
})
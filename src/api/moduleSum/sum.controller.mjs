
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Joi = require('joi'); 

import {cacheData,
    getCacheData
} from '../services/cache.service.mjs';


export async function postMetric(req, res) {

    try {

        //validate POST inputs using Joi
        const schemaBody = Joi.object().keys({
            value: Joi.number().required()
        })

        const schemaParams = Joi.object().keys({
            key: Joi.string().required()
        })

        const resultBody = Joi.validate(req.body, schemaBody);

        const resultParams = Joi.validate(req.params, schemaParams);


        //validation Failed
        if (resultBody.error !== null) {
            return res.status(200).send({error: resultBody.error});
        }

        //validation Failed
        if (resultParams.error !== null) {
            return res.status(200).send({error: resultParams.error});
        }


        //store the data with rounding off
        const cacheResponse = await cacheData({metric: req.params.key, value: Math.round(Number(req.body.value))});

     
        if (cacheResponse && cacheResponse.error) {

            return res.status(200).send({error: cacheResponse.error});

        }


        return res.send({ message: "Value recorded"});

    } catch(err) {

        return res.status(500).send({error: err.message});
    }
}


export async function getMetric(req, res) {

    try {
    
        //fetch data for a specific key
        const cacheResponse = await getCacheData(req.params.key);


        if (cacheResponse && cacheResponse.error) {

            return res.status(200).send({error: cacheResponse.error});

        }

        return res.send({ message: "Values Found!", data: `Sum of values for the key ${req.params.key} is ${cacheResponse.value}`});
    }
    catch(err) {
        return res.status(500).send({error: err.message});
    }

}
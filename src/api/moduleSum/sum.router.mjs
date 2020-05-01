

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import {postMetric,
    getMetric
} from './sum.controller.mjs';

const express = require('express');


export const sumRouter = express.Router();


//atach post and get to methods
sumRouter
    .post('/:key', postMetric)
    .get('/:key/sum', getMetric);
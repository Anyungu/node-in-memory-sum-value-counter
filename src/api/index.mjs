

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express');


import {sumRouter} from './moduleSum/index.mjs';


export const restRouter = express.Router();



restRouter.use('/metric', sumRouter);
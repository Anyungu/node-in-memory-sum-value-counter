

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express');
const swaggerUi = require('swagger-ui-express');
import swaggerDocument from '../config/swagger.json';


import {sumRouter} from './moduleSum/index.mjs';



export const restRouter = express.Router();



restRouter.use('/metric', sumRouter);
restRouter.use('/api-docs', swaggerUi.serve,  swaggerUi.setup(swaggerDocument));
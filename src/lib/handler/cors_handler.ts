/**
 * CORS (Cross-Origin Resource Sharing) Handler
 */

import * as cors       from 'cors';
import { corsOrigin }  from '../../corsOrigin';
import * as config     from '../../config.json';

const corsOptions:cors.CorsOptions = {
    origin:            corsOrigin,
    methods:           config.api.createUser.methods,
    preflightContinue: true
};

const cors_handler = cors(corsOptions);

export { cors_handler };

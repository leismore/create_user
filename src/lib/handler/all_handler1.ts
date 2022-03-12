/**
 * All Handler 1 - Prevent not-allowed HTTP methods
 */

import {
    all_handler_generator            as generator,
    all_handler_LMErrorRes_generator as gen_response } from '@leismore/all_handler';
import { CUError }                                     from '../CUError';
import * as config                                     from '../../config.json';
const ALLOWED      = config.api.createUser.methods;
const cuError        = new CUError({message: 'HTTP 405: Method Not Allowed', code: '4'},
                     gen_response(ALLOWED));
const all_handler1 = generator(ALLOWED, cuError);

export { all_handler1 };

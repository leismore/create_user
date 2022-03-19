/**
 * Create User API
 * 
 * @res.locals
 * {
 *   input:     { Input }
 *   db:        { nano.ServerScope }
 *   userID:    { UUID }
 * }
 */

import { all_handler1 }  from './all_handler1';
import { cors_handler }  from './cors_handler';
import { post_handler1 } from './post_handler1';
import { post_handler2 } from './post_handler2';
import { post_handler3 } from './post_handler3';
import { post_handler4 } from './post_handler4';
import { post_handler5 } from './post_handler5';

export {
    all_handler1,  cors_handler,
    post_handler1, post_handler2, post_handler3,
    post_handler4, post_handler5
};

/**
 * POST Handler 3 - Connecting to the CouchDB
 */

import { connect_db }                      from "../connect_db";
import { Request, Response, NextFunction } from 'express';
import { unknown2error }                   from '@leismore/unknown2error';

function post_handler3(_req:Request, res:Response, next:NextFunction):void
{
    try {
        res.locals.db = connect_db();
    } catch(e) {
        const f = unknown2error(e);
        next(f);
        return;
    }

    next();
}

export { post_handler3 };

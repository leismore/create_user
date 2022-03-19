/**
 * POST Handler 5 - Create user account
 */

import { unknown2error }                         from "@leismore/unknown2error";
import { create_user }                           from 'lib/create_user';
import { Request, Response, NextFunction }       from 'express';
import { Input }                                 from 'lib/type/Input';
import { ServerScope }                           from 'nano';
import { CUResponse }                            from 'lib/CUResponse';

function post_handler5(_req:Request, res:Response, next:NextFunction):void
{
    const resp           = new CUResponse(res);
    const input:Input    = res.locals.input;
    const db:ServerScope = res.locals.db;

    create_user(db, input).then(userID => {
        resp.res201(userID);
        return;
    }).catch(e => {
        const f = unknown2error(e);
        next(f);
        return;
    });
}

export { post_handler5 };

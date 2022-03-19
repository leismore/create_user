/**
 * POST Handler 4 - Checking existance of the user account by email
 */

import { unknown2error }                         from "@leismore/unknown2error";
import { Request, Response, NextFunction }       from 'express';
import { is_dup_email }                          from "lib/is_dup_email";
import { Input }                                 from 'lib/type/Input';
import { User               as     User_DBType } from 'lib/type/db_doc_user';
import { UserAuthentication as UserAuth_DBType } from 'lib/type/db_doc_userAuthentication';
import * as nano                                 from 'nano';
import * as config                               from 'config.json';
import { CUError }                               from "lib/CUError";

const DB_NAME_USER      = config.couchdb.dbPrefix + '_user';
const DB_NAME_USER_AUTH = config.couchdb.dbPrefix + '_user_authentication';

function post_handler4(_req:Request, res:Response, next:NextFunction):void
{
    const input:Input         = res.locals.input;
    const db:nano.ServerScope = res.locals.db;

    let dbUser:     nano.DocumentScope<User_DBType>;
    let dbUserAuth: nano.DocumentScope<UserAuth_DBType>;

    try {
        dbUser = db.use<User_DBType>(DB_NAME_USER);
    } catch(e) {
        const f      = unknown2error(e);
        let error    = { message: 'CouchDB (Use database): user failure', code: '11' };
        let response = { statusCode: '500' };
        next( new CUError(error, response, f) );
        return;
    }

    try {
        dbUserAuth = db.use<UserAuth_DBType>(DB_NAME_USER_AUTH);
    } catch(e) {
        const f      = unknown2error(e);
        let error    = { message: 'CouchDB (Use database): user_authentication failure', code: '12' };
        let response = { statusCode: '500' };
        next( new CUError(error, response, f) );
        return;
    }
    
    is_dup_email(dbUser, dbUserAuth, input.email).then(r => {
        if (r === true)
        {
            let error    = { message: 'user account existing', code: '13' };
            let response = { statusCode:'409' };
            next( new CUError(error, response) );
            return;
        }
        else
        {
            next();
            return;
        }
    }).catch(e => {
        const f = unknown2error(e);
        next(f);
        return;
    });
}

export { post_handler4 };

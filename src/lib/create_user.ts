/**
 * Create new user account
 */

import { unknown2error }                         from '@leismore/unknown2error';
import { CUError }                               from './CUError';
import { Token }                                 from '@leismore/token';
import { Password }                              from '@leismore/password';
import { gen_token }                             from './gen_token';
import { gen_shortID }                           from './gen_shortID';
import { gen_userID }                            from './gen_userID';
import { Input }                                 from './type/Input';
import { User               as User_DBType }     from './type/db_doc_user';
import { UserAuthentication as UserAuth_DBType } from './type/db_doc_userAuthentication';
import * as nano                                 from 'nano';
import * as config                               from 'config.json';

const DB_NAME_USER      = config.couchdb.dbPrefix + '_user';
const DB_NAME_USER_AUTH = config.couchdb.dbPrefix + '_user_authentication';
const TOKEN_EXPIRY      = config.api.createUser.token.expiry * 24*60*60*1000 + Date.now();
const EMAIL_EXPIRY      = config.api.createUser.email.expiry * 24*60*60*1000 + Date.now();

/**
 * @throws {CUError}
 */
async function create_user(db:nano.ServerScope, input:Input):Promise<string> {

    let dbUser:         nano.DocumentScope<User_DBType>;
    let dbUserAuth:     nano.DocumentScope<UserAuth_DBType>;
    let userID:         string;
    let shortID:        string;
    let password:       Password;
    let tokenEmail:     Token;
    let token:          Token;
    let user:           User_DBType;
    let userAuth:       UserAuth_DBType;

    // Connecting databases
    try {
        dbUser = db.use(DB_NAME_USER);
    } catch(e) {
        const f      = unknown2error(e);
        let error    = { message: 'CouchDB (Use database): user failure', code: '11' };
        let response = { statusCode: '500' };
        throw new CUError(error, response, f);
    }

    try {
        dbUserAuth = db.use(DB_NAME_USER_AUTH);
    } catch(e) {
        const f      = unknown2error(e);
        let error    = { message: 'CouchDB (Use database): user_authentication failure', code: '12' };
        let response = { statusCode: '500' };
        throw new CUError(error, response, f);
    }

    // Preparing new data
    try {
        password = await Password.create(input.password, null);
    } catch(e) {
        const f      = unknown2error(e);
        let error    = { message: 'password creation failure', code: '17' };
        let response = { statusCode: '500' };
        throw new CUError(error, response, f);
    }

    try
    {
        userID     = await gen_userID();
        shortID    = await gen_shortID();
        token      = await gen_token(TOKEN_EXPIRY);
        tokenEmail = await gen_token(EMAIL_EXPIRY);
    }
    catch(e)
    {
        const f = unknown2error(e);
        throw f;
    }

    const NOW = Date.now();

    user = {
        userID:            userID,
        shortID:           shortID,
        timestamp: {
            init:          NOW,
            lastUpdated:   NOW
        },
        lastSeqID:         0,
        email: {
            address:       input.email,
            verified:      false,
            code: {
                token:     tokenEmail.token,
                generated: tokenEmail.generated,
                expiry:    Number(tokenEmail.expiry)
            }
        }
    };

    userAuth = {
        userID:        userID,
        active:        false,
        password: {
            chars:     password.hashed,
            generated: password.generated,
            expiry:    password.expiry
        },
        token: {
            chars:     token.token,
            generated: token.generated,
            expiry:    token.expiry
        }
    };

    // Saving to databases
    try {
        let r = await dbUser.insert(user);
        if (r.ok === false)
        {
            let error    = { message: 'CouchDB (Insert): user failure', code: '18' };
            let response = { statusCode: '500' };
            throw new CUError(error, response);
        }
    } catch(e) {
        if (e instanceof CUError)
        { throw e; }
        else
        {
            const f      = unknown2error(e);
            let error    = { message: 'CouchDB (Insert): user failure', code: '18' };
            let response = { statusCode: '500' };
            throw new CUError(error, response, f);
        }
    }

    try {
        let r = await dbUserAuth.insert(userAuth);
        if (r.ok === false)
        {
            let error    = { message: 'CouchDB (Insert): user_authentication failure', code: '19' };
            let response = { statusCode: '500' };
            throw new CUError(error, response);
        }
    } catch(e) {
        if (e instanceof CUError)
        { throw e; }
        else
        {
            const f      = unknown2error(e);
            let error    = { message: 'CouchDB (Insert): user_authentication failure', code: '19' };
            let response = { statusCode: '500' };
            throw new CUError(error, response, f);
        }
    }

    return userID;
}

export { create_user };

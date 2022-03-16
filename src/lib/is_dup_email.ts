/**
 * is_dup_email function
 * 
 * Test if a user account already exists and have been activated
 */

import { User }                           from './type/db_doc_user';
import { UserAuthentication as UserAuth } from './type/db_doc_userAuthentication';
import { CUError }                        from './CUError';
import { unknown2error }                  from '@leismore/unknown2error';
import * as nano                          from 'nano';
import * as config                        from '../config.json';

const DESIGN_NAME          = config.couchdb.designName;
const VIEW_NAME_EMAIL2ID   = 'get_userID_email';
const VIEW_NAME_DUP_ID     = 'is_dup_userID';

/**
 * @throws {CUError}
 */
async function is_dup_email(
    dbUser:      nano.DocumentScope<User>,
    dbUserAuth:  nano.DocumentScope<UserAuth>,
    email:       string
): Promise<boolean>
{
    let ids:string[] = [];

    // Get userIDs
    try {
        let r = await dbUser.view<string>(DESIGN_NAME, VIEW_NAME_EMAIL2ID, {key: email});
        if (r.rows.length === 0)
        {
            return false;
        }
        else
        {
            for (let i=0; i <= r.rows.length-1; i++)
            { ids[i] = r.rows[i].value; }
        }
    } catch (e) {
        const f      = unknown2error(e);
        let error    = { message: 'CouchDB (View): get_userID_email failure', code: '9' };
        let response = { statusCode:'500' };
        throw new CUError(error, response, f);
    }

    // Check the userIDs activition
    try
    {
        for (let i=0; i <= ids.length-1; i++)
        {
            let r = await dbUserAuth.view<true>(DESIGN_NAME, VIEW_NAME_DUP_ID, {key: ids[i]});
            if (r.rows.length !== 0)
            {
                return true;
            }
        }
        return false;
    }
    catch (e)
    {
        const f      = unknown2error(e);
        let error    = { message: 'CouchDB (View): is_dup_userID failure', code: '10' };
        let response = { statusCode:'500' };
        throw new CUError(error, response, f);
    }
}

export { is_dup_email };

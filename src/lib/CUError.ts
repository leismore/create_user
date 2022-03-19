/**
 * CUError is the Error class for this project.
 * Refer to @leismore/lmerror <https://www.npmjs.com/package/@leismore/lmerror>
 *
 * Code           Message
 * 1              not application/json
 * 2              CouchDB: connection failure
 * 3              invalid credential
 * 4              HTTP 405: Method Not Allowed
 * 5              authorization failure
 * 6              auth_app_self failure
 * 7              invalid input: email
 * 8              invalid input: password
 * 9              CouchDB (View): get_userID_email failure
 * 10             CouchDB (View): is_dup_userID failure
 * 11             CouchDB (Use database): user failure
 * 12             CouchDB (Use database): user_authentication failure
 * 13             user account existing
 */

import { LMError } from '@leismore/lmerror';
class    CUError extends LMError {}
export { CUError };

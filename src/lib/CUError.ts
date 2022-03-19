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
 * 14             id_generator (token): failure
 * 15             id_generator (uuid-rand): failure
 * 16             id_generator (short-id): failure
 * 17             password creation failure
 * 18             CouchDB (Insert): user failure
 * 19             CouchDB (Insert): user_authentication failure
 */

import { LMError } from '@leismore/lmerror';
class    CUError extends LMError {}
export { CUError };

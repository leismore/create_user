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
 */

import { LMError } from '@leismore/lmerror';
class    CUError extends LMError {}
export { CUError };

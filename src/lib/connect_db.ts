/**
 * connect_db function: Connect to the CouchDB
 */

import * as nano         from 'nano';
import { CUError }       from './CUError';
import { unknown2error } from '@leismore/unknown2error';
import * as credential   from '../credential/couchdb.json';

/**
 * @throws {CUError}
 */
function connect_db():nano.ServerScope
{
  const PROTOCOL = credential.ssl ? 'https' : 'http';

  try {
    return nano(
      PROTOCOL + '://' + credential.user     + ':' +
                         credential.password + '@' +
                         credential.host     + ':' +
                         credential.port
    );
  } catch (e) {
    const f = unknown2error(e);
    let error = { message: 'CouchDB: connection failure', code: '2' };
    let response = { statusCode:'500' };
    throw new CUError(error, response, f);
  }
}

export { connect_db };

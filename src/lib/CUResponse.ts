/**
 * CUResponse class
 * Refer to @leismore/response <https://www.npmjs.com/package/@leismore/response>
 */

import { LMResponse } from '@leismore/response';

class CUResponse extends LMResponse
{
  public res201(userID:string):void
  {
    this.send({
      statusCode: '201',
      headers:    { 'Content-Type'  : 'application/json',
                    'Cache-Control' : 'no-store' },
      body:       { 'userID': userID }
    });
  }
}

export { CUResponse };

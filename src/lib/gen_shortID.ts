/**
 * Get new ShortID from id_generator
 */

import { CUError }                              from 'lib/CUError';
import { unknown2error }                        from '@leismore/unknown2error';
import { default as axios, AxiosRequestConfig } from 'axios';
import * as credential                          from 'credential/self.json';
import * as config                              from 'config.json';

const API     = config.id_generator.api['short-id'].url;
const TIMEOUT = config.id_generator.api['short-id'].timeout;
const USER    = config.app.appID;
const TOKEN   = credential.token;

/**
  * @throws {CUError}
  */
async function gen_shortID():Promise<string> {

    const axiosConfig:AxiosRequestConfig = {
        url:            API,
        method:         'GET',
        timeout:        TIMEOUT,
        auth: {
            username:   USER,
            password:   TOKEN
        }
    };

    try {
        let response = await axios(axiosConfig);
        return response.data.id;
    } catch (e)
    {
        const f      = unknown2error(e);
        let error    = { message: 'id_generator (short-id): failure', code: '16' };
        let response = { statusCode: '500' };
        throw new CUError(error, response, f);
    }
}

export { gen_shortID };
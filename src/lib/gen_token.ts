/**
 * Get new token from id_generator
 */

import { CUError }                              from './CUError';
import { unknown2error }                        from '@leismore/unknown2error';
import { Token }                                from '@leismore/token';
import { default as axios, AxiosRequestConfig } from 'axios';
import * as credential                          from '../credential/self.json';
import * as config                              from '../config.json';

const API     = config.id_generator.api.token.url;
const TIMEOUT = config.id_generator.api.token.timeout;
const USER    = config.app.appID;
const TOKEN   = credential.token;

/**
 * @param  expiry     {int} - Days
 * @throws {CUError}
 */
async function gen_token(expiry:number):Promise<Token> {

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
        let token    = new Token({
            token:      response.data.token,
            generated:  response.data.generated,
            expiry:     expiry
        });
        return token;
    } catch (e)
    {
        const f      = unknown2error(e);
        let error    = { message: 'id_generator (token): failure', code: '14' };
        let response = { statusCode: '500' };
        throw new CUError(error, response, f);
    }
}

export { gen_token };

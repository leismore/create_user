/**
 * Post Handler 2 - Input validation (Formal)
 */

import * as EmailValidator  from 'email-validator';
import { CUError }          from '../CUError';
import { Request, Response, NextFunction } from 'express';
import { Input }            from '../type/Input';
import { Password }         from '@leismore/password';
import * as config          from '../../config.json';

const PW_LENGTH_MIN:number = config.api.createUser.password.lengthMin;
const PW_LENGTH_MAX:number = config.api.createUser.password.lengthMax;

function post_handler2(req:Request, res:Response, next:NextFunction):void
{
    const input:Input = req.body;

    // Test media type
    if ( req.is('application/json') === false )
    {
        let error    = { message: 'not application/json', code: '1' };
        let response = { statusCode: '415' };
        next( new CUError(error, response) );
        return;
    }

    // Test input data
    if ( ( 'email' in input                     === false    ) ||
         ( typeof input.email                   !== 'string' ) ||
         ( EmailValidator.validate(input.email) === false    )
    )
    {
        let error    = { message: 'invalid input: email', code: '7' };
        let response = {
            statusCode:   '415',
            headers:    { 'Content-Type': 'application/json' },
            body:       { 'error': 'invalid_email' }
        };
        next( new CUError(error, response) );
        return;
    }

    if ( ( 'password' in input   === false         ) ||
         ( typeof input.password !== 'string'      ) ||
         ( input.password.length <   PW_LENGTH_MIN ) ||
         ( input.password.length >   PW_LENGTH_MAX )
    )
    {
        let error    = { message: 'invalid input: password', code: '8' };
        let response = {
            statusCode:   '415',
            headers:    { 'Content-Type': 'application/json' },
            body:       { 'error': 'invalid_password' }
        };
        next( new CUError(error, response) );
        return;
    }

    // Save and next
    res.locals.input = input;
    next();
}

export { post_handler2 };

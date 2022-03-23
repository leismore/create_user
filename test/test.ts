import { assert }                    from 'chai';
import axios                         from 'axios';
import { validate as uuid_validate } from 'uuid';
import * as configApp                from '../src/config.json';
import * as configTest               from './config.json';

const API = (
    (configApp.app.ssl ? 'https' : 'http') + '://' +
    `${configApp.app.domain}:${configApp.app.publicPort}${configApp.api.baseURL}${configApp.api.createUser.url}`
);

describe('Creating User', function(){
    it('Should return a userID (UUID)', function(){
        return axios.post( API, {email: configTest.user.email, password: configTest.user.password}, { auth:
            { username: configTest.client.appID,
              password: configTest.client.token }, headers:{'Content-Type': 'application/json'} }
          )
          .then( res => {
            assert
            (
              ( res.status === 201 &&
                String(res.headers['content-type']).includes('application/json') &&
                uuid_validate(res.data.userID)
              )
            );
          })
          .catch( () => {
            assert(false);
          });
    });
});

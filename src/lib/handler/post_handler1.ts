/**
 * POST Handler 1 - Auth
 */

import { CUError }    from '../CUError';
import { authAppSelf_handler_generator as generator } from '@leismore/authappself_handler';
import * as config    from '../../config.json';

const API        = config.auth_app_self.api.author.url;

const HOST_APP   = {
  hostID:     config.app.appID,
  permission: 'create_user'
};

const ERRORS = {
  auth:        new CUError({message: 'authorization failure', code: '5'}, {statusCode: '403'}),
  authAppSelf: new CUError({message: 'auth_app_self failure', code: '6'}, {statusCode: '500'})
};

const post_handler1 = generator(HOST_APP, API, ERRORS);

export { post_handler1 };

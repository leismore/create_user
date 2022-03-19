/**
 * The main script of create_user project
 */

// Import modules
import * as express                from 'express';
import { get_handler }             from '@leismore/get_handler';
import { error_handler_last }      from '@leismore/error_handler_last';
import * as config                 from 'config.json';
import { all_handler1, cors_handler,
    post_handler1, post_handler2, post_handler3,
    post_handler4, post_handler5 } from 'lib/handler/index';

// Init
let app = express();
app.use( express.json() );

// create-user API
const CU_URL = config.api.baseURL + config.api.createUser.url;
app.use(     CU_URL, cors_handler );
app.all(     CU_URL, all_handler1 );
app.options( CU_URL, ()=>{} );
app.head(    CU_URL, get_handler );
app.get(     CU_URL, get_handler );
app.post(    CU_URL, post_handler1, post_handler2, post_handler3,
    post_handler4, post_handler5
);

// Error Handling
app.use(error_handler_last);

// Starting the server
app.listen( Number(config.app.port),
            config.app.host,
            config.app.backlog,
  () => {
    console.log(
      `[${config.app.projectName}]` + ` is working on ` +
      `<${config.app.host}:${config.app.port}>`
    );
  }
);

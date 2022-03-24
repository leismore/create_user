# LMOS-NodeJS-Apps Create-User

A Node.js application for user-account creation. This application provides a RESTFul API for creating an inactivated user account.

## Prerequisites

1. Deploying [auth_app_self](https://github.com/leismore/auth_app_self)
2. Deploying [id_generator](https://github.com/leismore/id_generator)
3. Configuring the CouchDB according to [create_user_couchdb](https://github.com/leismore/create_user_couchdb)

## Deployment

1. Configuring `src/config.json`
2. Configuring `src/corsOrigin.ts`
3. Configuring `src/credential/couchdb.json`
4. Configuring `src/credential/self.json`

## Test

1. Preparing the testing data according to LMOS-NodeJS-Apps Tester
2. Configuring `test/config.json`

`npm test`

## Dependencies

* LMOS CouchDB
* LMOS-NodeJS-Apps Tester

## Copyright

GNU Affero General Public License v3.0

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author / 24 March 2022)

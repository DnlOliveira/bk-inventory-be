'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import { mongoDB, port as PORT } from '../config';
import routes from './controllers';
import MongoDB from './services/mongoDb';

// setting up express
const app = express();
app.use(bodyParser.json());
app.use(routes);

// TODO: if connection to db fails connect to server
// anyway but set a status of 'db not connected'
// to alert client app

(async function main() {
    try {
        app.locals.db = await new MongoDB(mongoDB.url);
        app.locals.db.connect();
        app.listen(PORT, () => console.log('App listening on port %s', PORT));
    } catch (err) {
        console.log('Error starting up server');
        console.log({ Error: err });
    }
}());

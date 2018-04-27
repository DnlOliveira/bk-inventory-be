'use strict';

import { MongoClient } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './controllers';
import { mongoDB, port as PORT } from '../config';

// setting up express
const app = express();
app.use(bodyParser.json());
app.use(routes);

// TODO: Build a universal run script file that reads a
// universal configuration file that points to all of the other modules.

// TODO: if connection to db fails connect to server
// anyway but set a status of 'db not connected'
// to alert client app
// TODO: also set a up a retry connection

function startMongo() {
    return MongoClient.connect(mongoDB.url)
        .then((client) => {
            console.log('MongoDB connected');
            return client.db(mongoDB.name);
        })
        .catch((err) => {
            console.log('MongoDB Connection Failed');
            console.log({ Error: err });
        });
}

async function main() {
    try {
        app.locals.db = await startMongo();
        app.listen(PORT, () => console.log('App listening on port %s', PORT));
    } catch (err) {
        console.log('Error starting up server');
        console.log({ Error: err });
    }
}

main();

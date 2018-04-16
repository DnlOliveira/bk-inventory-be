"use strict";

// run dotenv to set environment variables
require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import routes from './controllers';
import { MongoClient } from 'mongodb';


// setting up express
let app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(routes);


export function startMongo() {
    return MongoClient.connect(process.env.DB_URL)
        .then( client => {
            console.log('MongoDB connected');
            return client.db(process.env.DB_NAME)
        })
        .catch( err => {
            console.log('MongoDB Connection Failed');
            console.log({ Error: err} );
            process.exit(0);
        });
}


async function main() {
    try {
        const db = await startMongo();

        process.db = db;
        app.listen(PORT, () => console.log("App listening on port %s", PORT));
    }
    catch(err) {
        console.log('Error starting up server');
        console.log({ Error: err });
    }

}

main();
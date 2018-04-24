'use strict';


import { MongoClient } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './controllers';

// run dotenv to set environment variables
require('dotenv').config();

// setting up express
let app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(routes);


function startMongo() {
    return MongoClient.connect(process.env.DB_URL)
        .then((client) => {
            console.log('MongoDB connected');
            return client.db(process.env.DB_NAME)
        })
        .catch((err) => {
            console.log('MongoDB Connection Failed');
            console.log({ Error: err });
            process.exit(0);
        });
}


async function main() {
    try {
        process.db = await startMongo();
        app.listen(PORT, () => console.log('App listening on port %s', PORT));
    } catch (err) {
        console.log('Error starting up server');
        console.log({ Error: err });
    }
}

main();

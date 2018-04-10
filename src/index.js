"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import routes from './controllers';
import { MongoClient } from 'mongodb';

// run dotenv to set environment variables
require('dotenv').config();

// setting up express
let app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(routes);

MongoClient.connect(process.env.DB_URL, (err, client) => {
    if (err) {
        console.log(err);
        process.exit(0);
    }

    console.log('MongoDB connection successfull');
    client.close();

    app.listen(PORT, () => console.log("App listening on port %s", PORT));
});
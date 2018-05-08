'use strict';

import { MongoClient } from 'mongodb';
import { mongoDB } from '../../config';

export default class MongoDB {
    constructor(mongoUrl) {
        this.url = mongoDB.url;
        this.connection = null;
        this.mongoClient = new MongoClient(mongoUrl);
    }

    connect() {
        if (this.connection) return this.connection;

        return this.mongoClient.connect()
            .then(async (client) => {
                console.log('MongoDB Connected');
                this.connection = client.db(mongoDB.name);
                return this.connection;
            })
            .catch((err) => {
                console.log('MongoDB Connection Failed');
                console.log({ Error: err });
                return false;
            });
    }

    collection(collectionName) {
        return this.connection.collection(collectionName);
    }
}

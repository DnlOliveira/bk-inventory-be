'use strict';

import { MongoClient } from 'mongodb';
import { mongoDB } from '../../config';

export default class MongoDB {
    constructor() {
        this.url = mongoDB.url;
        this.connection = null;
        this.mongoClient = MongoClient;
    }
    connect(next) {
        if (this.connection) return this.connection;

        this.mongoClient.connect(
            this.url,
            {
                keepAlive: true,
                autoReconnect: true,
                reconnectInterval: mongoDB.reconnectInterval,
            }
        ).then(async (client) => {
            console.log('MongoDB Connected');
            this.connection = await client.db(mongoDB.name);
            next(this.connection);
        });
    }

    collection(collectionName) {
        return this.connection.collection(collectionName);
    }
}

'use strict';

import { MongoClient } from 'mongodb';
import { mongoDB } from '../../config';

export default class MongoDB {
    constructor(mongoUrl) {
        this.url = mongoDB.url;
        this.connection = null;
        this.isReconnecting = false;
        this.timeOut = null;
        this.mongoClient = new MongoClient(mongoUrl);
    }

    connect() {
        if (this.connection) return this.connection;

        return new Promise((resolve, reject) => this.mongoClient.connect()
            .then((client) => {
                console.log('MongoDB Connected');
                if (this.isReconnecting) {
                    this.isReconnecting = false;
                    clearTimeout(this.timeOut);
                }
                this.connection = client.db(mongoDB.name);
                resolve(this.connection);
            })
            .catch((err) => {
                console.log({ Error: err });
                // console.log('Attempting to Reconnect...');
                // if (!this.isReconnecting) {
                //     this.isReconnecting = true;
                //     this.timeOut = setTimeout(() => this.connect(), 5000);
                // }
                resolve();
            }));
    }

    collection(collectionName) {
        return this.connection.collection(collectionName);
    }
}

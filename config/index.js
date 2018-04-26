'use strict';

// run dotenv to set environment variables
require('dotenv').config();

export const secretKey = process.env.SECRET_KEY;

export const port = process.env.PORT || 3000;

export const stage = process.env.STAGE;
export const isTest = process.env.NODE_ENV === 'testlocal';
export const isLocal = stage === 'local' || process.env.LOCAL_RUN;

export const app = {
    name: 'Inventory',
    version : '1',
};

export const mongoDB = {
    url: process.env.DB_URL,
    name: process.env.DB_NAME,
    collections: {
        userCollection: process.env.USER_COLLECTION,
        bookCollection: process.env.BOOK_COLLECTION,
    },
    reconnectInterval: process.env.RECONNECT_INTERVAL || 1000,
};

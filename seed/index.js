'use strict';

import MongoDB from '../src/services/mongoDb';
import { mongoDB } from '../config';
const userData = {};
const bookData = {};

const mongodb = new MongoDB(mongoDB.url);

new Promise((resolve) => resolve(mongodb.connect())).then((db) => {
    console.log(userData);
    console.log(bookData);
    // db.collection(mongoDB.collections.userCollection).insertMany(userData, (err, res) => {
    //     console.log('User Data inserted');
    // });
    // db.collection(mongoDB.collections.bookCollection).insertMany(bookData, (err, res) => {
    //     console.log('Book Data inserted');
    // });
});

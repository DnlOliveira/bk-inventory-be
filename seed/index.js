'use strict';

import MongoDB from '../src/services/mongoDb';
import { mongoDB } from '../config';
import { userData, bookData, commentData } from './data';

const mongodb = new MongoDB(mongoDB.url);

new Promise((resolve) => resolve(mongodb.connect())).then((db) => {
    db.collection(mongoDB.collections.userCollection).insertMany(userData, (err, res) => {
        console.log('User Data inserted');
    });
    db.collection(mongoDB.collections.bookCollection).insertMany(bookData, (err, res) => {
        console.log('Book Data inserted');
    });
    // comments need to be inserted in a book
    db.collection(mongoDB.collections.bookCollection).insertMany(commentData, (err, res) => {
        console.log('Comments inserted');
    });
}).then(() => {
    console.log('Seed data inserted');
});

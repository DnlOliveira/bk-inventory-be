'use strict';

import express from 'express';
import { MongoClient } from 'mongodb';

const router = express.Router();

// add book
router.post('/admin/books', (req, res) => {
    MongoClient.connect(process.env.DB_URL, (err, client) => {
        if (err) return err;

        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.BOOK_COLLECTION);

        // inserting new book to MongoDB
        collection.insert(req.body, (error, result) => {
            if (err) return err;

            res.send(result);
        });

        client.close();
    });
});


// remove book
router.delete('/admin/books', (req, res) => {
    MongoClient.connect(process.env.DB_URL, (err, client) => {
        if (err) return err;

        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.BOOK_COLLECTION);

        collection.remove(req.body, (error, result) => {
            if (err) return err;

            res.send(result);
        });

        client.close();
    });
});


// update book
router.put('/admin/books', (req, res) => {
    MongoClient.connect(process.env.DB_URL, (err, client) => {
        if (err) return err;

        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.BOOK_COLLECTION);

        // TODO: item to be updated might need to be changed from req.body
        // TODO: set value needs to be added
        collection.update(
            req.body,
            { $set: {}, $currentDate: { lastModified: true } },
            (error, result) => {
                if (err) return err;

                res.send(result);
            }
        );

        client.close();
    });
});

export default router;

import express from 'express';
import { MongoClient } from 'mongodb';

const router = express.Router();

// list of all books
router.get('/books', (req, res) => {
    MongoClient.connect(process.env.DB_URL, (err, client) => {
        if (err) return err;

        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.BOOK_COLLECTION);

        // fetching all books from Mongodb && returns array
        collection.find({}).toArray((error, docs) => {
            if (err) return err;

            res.send(docs);
        });

        client.close();
    });
});

// add book
router.post('/books', (req, res) => {
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
router.delete('/books', (req, res) => {
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
router.put('/books', (req, res) => {
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

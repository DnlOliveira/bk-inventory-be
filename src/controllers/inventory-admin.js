import express from 'express';
const router = express.Router();
import { MongoClient } from 'mongodb';

// list of all books
router.get('/books', (req, res) => {
    MongoClient.connect(process.env.DB_URL, (err, client) => {
        if (err) return err;
        
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.BOOK_COLLECTION);

        // fetching all books from Mongodb && returns array
        collection.find({}).toArray( (err, docs) => {
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
        collection.insert(req.body, (err, result) => {
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

        collection.remove(req.body, (err, result) => {
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
        collection.update(req.body,
            { $set: {}, $currentDate: { "lastModified": true } },
            (err, result) => {
            if (err) return err;

            res.send(result);
        });

        client.close();
    });
});

export default router;
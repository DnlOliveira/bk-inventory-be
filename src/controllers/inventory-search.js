import express from 'express';
const router = express.Router();
import { MongoClient } from 'mongodb';

// list of books by author or title
router.get('/books/:term', (req, res) => {
    MongoClient.connect(process.env.DB_URL, (err, client) => {
        if (err) return err;
        
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.BOOK_COLLECTION);

        // TODO: queries need to be changed from req.body
        // fetching related books from Mongodb && returns array
        collection.find(
            { $or: [ { "author": req.body }, { "title": req.body } ] }
        ).toArray( (err, docs) => {
            if (err) return err;

            res.send(docs);
        });

        client.close();
    });  
});

export default router;
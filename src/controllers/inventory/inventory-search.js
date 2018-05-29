import express from 'express';
import { mongoDB } from '../../../config';

const router = express.Router();
const { collections: { bookCollection } } = mongoDB;

// list of books by author or title or all books
router.get('/books/:term?', (req, res) => {
    const { db } = req.app.locals;

    let query = {};
    if (req.params.term) {
        query = { title: req.params };
    }

    db.collection(bookCollection).find(query).toArray((err, docs) => {
        if (err) {
            res.status(400).send({ Error: 'Unable to Find Book' });
            return;
        }

        res.send(docs);
    });
});

export default router;

import express from 'express';
import { mongoDB } from '../../../config/index';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

// TODO: should accept filters to query specifics
// list of all users
router.get('/users', (req, res) => {
    const { db } = req.app.locals;
    db.collection(userCollection).find({}).toArray((err, docs) => {
        if (err) return err;

        res.send(docs);
    });
});

// TODO: What kind of user attribute needs to be updated?
// update user
router.put('/users', (req, res) => {
    const { db } = req.app.locals;
    db.collection(userCollection).updateOne(
        req.body,
        { $set: {}, $currentDate: { lastModified: true } },
        (err, result) => {
            if (err) return err;

            res.send(result);
        }
    );
});

// TODO: deleteOne func needs query
// delete user
router.delete('/users', (req, res) => {
    const { db } = req.app.locals;
    db.collection(userCollection).deleteOne({}, (err, result) => {
        if (err) return err;

        res.send(result);
    });
});


export default router;

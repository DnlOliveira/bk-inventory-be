import express from 'express';
import { mongoDB } from '../../../config/index';
import { generateToken } from '../../services/auth-service';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

// create user
router.post('/users', (req, res) => {
    const { db } = req.app.locals;

    const user = {
        username: asd,
        password: asd,
        name: asd,
        email: asd,
        comments: [{ book:asd, comment: asd }],
        favorites: [{ book: asd }],
    };

    db.collection(userCollection).insertOne(user, async (err, result) => {
        if (err) return err;

        const token = await generateToken({});
        res.send(token);
    });
});

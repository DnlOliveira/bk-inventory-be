import express from 'express';
import { mongoDB } from '../../../config/index';
import { generateToken } from '../../services/auth-service';

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

// create user
router.post('/users', (req, res) => {
    const { db } = req.app.locals;

    // -- format -- //
    // const user = {
    //     username: 'username',
    //     password: 'password',
    //     name: 'user name',
    //     email: 'email@gmail.com',
    //     comments: [{ book: { id: 'id', name: 'name' }, comment: 'comment' }],
    //     favorites: [{ book: { id: 'id', name: 'name' } }],
    // };

    const user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        comments: [],
        favorites: [],
    };

    db.collection(userCollection).insertOne(user, async (err, result) => {
        if (err) {
            res.status(400).send({ Error: 'Unable to Create User' });
            return;
        }

        const token = await generateToken({});
        res.send({ result, token });
    });
});

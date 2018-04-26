import express from 'express';
import { mongoDB } from '../../config';
import { verifyToken, generateToken } from '../services/auth-service';
// import { mongoDb } from "../services";

const router = express.Router();
const { collections: { userCollection } } = mongoDB;

// router.get('/test', verifyToken, connectToMongo);

// user login
// TODO: move this and user sign up to own file
router.post('/login', (req, res) => {
    const collection = process.db.collection(userCollection);

    const { username, password } = req.body;

    // TODO: call mongo and get credentials for username entered with correct queries
    // this can be a separate function in auth service (verifyCredentials)
    collection.find({ username: username }).toArray((err, docs) => {
        if (err) return err;

        // TODO: make sure of object's structure
        if (docs.user.username === username && docs.user.password === password) {
            // TODO: define further details needed for signature
            const token = generateToken({
                username: username,
                user_type: docs.user.user_type,
            });
            res.send(token);
        } else {
            res.send({ Error: 'Credentials do not match' });
        }
    });
});

// TODO: could also be used to find specifc user
// list of all users
router.get('/users', (req, res) => {
    // const collection = process.db.collection(userCollection);
    const db = req.app.locals.db;

    db.collection(userCollection).find({}).toArray((err, docs) => {
        if (err) return err;

        res.send(docs);
    });
});


// create user
router.post('/users', (req, res) => {
    const collection = process.db.collection(userCollection);

    collection.insert(req.body, (err, result) => {
        if (err) return err;

        res.send(result);
    });
});


// TODO: What kind of user attribute needs to be updated?
// update user
router.put('/users', (req, res) => {
    const collection = process.db.collection(userCollection);
    collection.updateOne(
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
    const collection = process.db.collection(userCollection);
    collection.deleteOne({}, (err, result) => {
        if (err) return err;

        res.send(result);
    });
});


export default router;

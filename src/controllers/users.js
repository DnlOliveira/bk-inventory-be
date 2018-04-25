import express from 'express';
import { verifyToken, generateToken } from '../services/auth-service';

const router = express.Router();


const findAll = (collection, res) => {
    collection.find({}).toArray((err, docs) => {
        if (err) return err;
        res.send(docs);
    });
};

const connectToMongo = (req, res) => {
    // console.log('connectToMongo');
    // const token = tokenGenerator();
    // console.log(token);

    // const cert = 'myPrivateKey';

    // synchronous
    // const token = jwt.sign({ foo: 'bar' }, cert);
    // console.log(token);

    // asynchronous
    // jwt.sign({ foo: 'bar' }, 'secretKey', (err, token) => {
    //     if (err) {
    //         console.log(err);
    //         res.send('err: ' + err);
    //         process.exit(0);
    //     }
    //     console.log(token);
    //     res.send('token: ' + token);
    //     process.exit(0);
    // });
    // res.send();

    // MongoClient.connect(process.env.DB_URL, (err, client) => {
    //     if (err) return err;
    //
    //     const db = client.db(process.env.DB_NAME);
    //     const collection = db.collection(process.env.USER_COLLECTION);
    //
    findAll(res);
    // });
};

router.get('/test', verifyToken, connectToMongo);


// user login
// TODO: move this and user sign up to own file
router.post('/login', (req, res) => {
    const collection = process.db.collection(process.env.USER_COLLECTION);

    const { username, password } = req.body;

    // TODO: call mongo and get credentials for username entered with correct queries
    // this can be a separate function in auth service (verifyCredentials)
    collection.find({ username: username }).toArray((err, docs) => {
        if (err) return err;

        // TODO: make sure of object's structure
        if (docs.user.username === username && docs.user.password === password) {
            // TODO: define further details needed for signature
            const token = generateToken({
                username,
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
    const collection = process.db.collection(process.env.USER_COLLECTION);

    collection.find({}).toArray((err, docs) => {
        if (err) return err;

        res.send(docs);
    });
});


// create user
router.post('/users', (req, res) => {
    const collection = process.db.collection(process.env.USER_COLLECTION);

    collection.insert(req.body, (err, result) => {
        if (err) return err;

        res.send(result);
    });
});


// TODO: What kind of user attribute needs to be updated?
// update user
router.put('/users', (req, res) => {
    const collection = process.db.collection(process.env.USER_COLLECTION);
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
    const collection = process.db.collection(process.env.USER_COLLECTION);
    collection.deleteOne({}, (err, result) => {
        if (err) return err;

        res.send(result);
    });
});


export default router;

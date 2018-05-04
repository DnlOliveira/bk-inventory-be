'use strict';

import express from 'express';

// controllers
import users from './accounts/users';
import inventoryAdmin from './inventory/inventory-admin';
import inventorySearch from './inventory/inventory-search';

// helpers
import { verifyToken } from '../services/auth-service';
import { app, stage } from '../../config';

const router = express.Router();

router.use('/users', verifyToken);
router.use('/admin', verifyToken);
router.use(users);
router.use(inventoryAdmin);
router.use(inventorySearch); // open route


router.get('/info', (req, res) => {
    // display app's health

    // res.send(generateToken({
    //     id: 'doliveira',
    // }));

    // example of how calls will work
    // const db = req.app.locals.db;
    // const connection = db.connect();
    // const collection = db.collection('users');

    const { db } = req.app.locals;
    const health = {
        Name:    app.name,
        Version: app.version,
        Stage:   stage,
    };

    const connection = db.mongoClient.isConnected();
    if (connection) {
        health.MongoDB = 'Connected';
    } else {
        health.MongoDB = 'Not Connected';
    }

    res.send(health);
});

export default router;

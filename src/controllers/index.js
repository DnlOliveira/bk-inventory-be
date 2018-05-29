'use strict';

import express from 'express';

// controllers
import users from './accounts/users';
import inventoryUser from './inventory/inventory-user';
import inventoryAdmin from './inventory/inventory-admin';
import inventorySearch from './inventory/inventory-search';

// services
import { generateToken, verifyToken, verifyCredentials } from '../services/auth-service';
import { app, stage } from '../../config';

const router = express.Router();

router.use(verifyToken);
router.use(users);
router.use(inventoryUser);
router.use(inventoryAdmin);
router.use(inventorySearch);


router.get('/info', (req, res) => {
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

router.post('/token', async (req, res) => {
    const mongoConnection = req.app.locals.db;
    const { userName, hash } = req.body;

    if (!userName || !hash) {
        res.status(400).send({ Error: 'Missing Credentials' });
        return;
    }

    const userInfo = await verifyCredentials(mongoConnection, { userName, hash }).catch((err) => {
        res.status(400).send(err);
    });
    const token = await generateToken(userInfo).catch((err) => res.status(400).send(err));

    res.send({ token });
});

export default router;

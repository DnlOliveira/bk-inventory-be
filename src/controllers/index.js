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

// TODO: instead of user specific token, do app token instead.
// let UI handle sessions
// router.use(verifyToken);
router.use(users);
router.use(inventoryAdmin);
router.use(inventorySearch); // open route


router.get('/info', (req, res) => {
    // res.send(generateToken({
    //     id: 'doliveira',
    // }));

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

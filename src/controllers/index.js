'use strict';

import express from 'express';

// controllers
import users from './accounts/users';
import inventoryAdmin from './inventory/inventory-admin';
import inventorySearch from './inventory/inventory-search';

// helpers
import { verifyToken } from '../services/auth-service';

const router = express.Router();

router.use(verifyToken, users);
router.use(inventoryAdmin);
router.use(inventorySearch);

router.get('/info', (req, res) => {
    // display app's health
    res.send('Info');
});

export default router;

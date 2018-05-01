'use strict';

import express from 'express';

// controllers
import users from './accounts/users';
import inventoryAdmin from './inventory/inventory-admin';
import inventorySearch from './inventory/inventory-search';

// helpers
import { verifyToken, generateToken } from '../services/auth-service';

const router = express.Router();

router.use('/users', verifyToken);
router.use('/admin', verifyToken);
router.use(users);
router.use(inventoryAdmin);
router.use(inventorySearch); // open route


router.get('/info', (req, res) => {
    // display app's health

    res.send(generateToken({
        id: 'doliveira',
    }));
});

export default router;

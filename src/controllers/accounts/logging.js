'use strict';

import express from 'express';
import { verifyCredentials } from '../../services/auth-service';

const router = express.Router();

router.post('/login', (req, res) => {
    const verified = verifyCredentials(req.app.locals.db, req.body);
    if (verified.Error) {
        res.status(400).send(verified);
        return;
    }
    res.send(verified);
});

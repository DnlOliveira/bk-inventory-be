import express from 'express';
const router = express.Router();

// controllers
import users from './users';
import inventoryAdmin from './inventory-admin';
import inventorySearch from './inventory-search';

router.use(users);
router.use(inventoryAdmin);
router.use(inventorySearch);

// TODO: these should probably redirect somewhere else.
// TODO: maybe login or a home page explaining product.
// /info might not even be necessary
// home routes
router.get('/', (req, res) => {
    res.send('Homepage');
});
router.get('/info', (req, res) => {
    res.send('Info');
});

export default router;

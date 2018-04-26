// create user

router.post('/users', (req, res) => {
    const collection = process.db.collection(userCollection);

    collection.insert(req.body, (err, result) => {
        if (err) return err;

        res.send(result);
    });
});

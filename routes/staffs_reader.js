const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient

router.post('/:data', async (req, res) => {
    const data = req.params.data;
    await mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection('users')
            await collection.findOne({
                register_id: data
            }, (err, data) => {
                if (err) {
                    res.redirect('/error')
                } else {
                    res.render('staffs_student', {
                        profile: data,
                        header: data.name
                    })
                }
            })
        })
});

module.exports = router
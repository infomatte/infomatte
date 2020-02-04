const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient

router.get('/', async (req, res) => {
    res.render('home', {
        header: "Your thought to improve"
    })
})
router.post('/', async (req, res) => {
    const feedback = {
        name: req.body.username,
        year: req.body.year,
        title: req.body.feed_title,
        description: req.body.desc
    }
    await mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection('feedback')
            await collection.insertOne(feedback);
        })
    res.render('thanks', {
        header: "Thanks"
    })
})

module.exports = router
const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient

router.get('/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    await mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection('storage')
            await collection.find({
                yearofJoining: year,
                autherized: 'Yes'
            }).toArray((err, data) => {
                if (err) {
                    res.redirect('/error')
                } else {
                    res.render('admin_holder', {
                        data: data,
                        header: `${year} - Admin Panel`
                    })
                }
            })
        })
});


module.exports = router
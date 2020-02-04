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
            let collection = db.collection('users')
            await collection.find({
                yearofJoining: year
            }).toArray((err, data) => {
                if (err) {
                    res.render('error', {
                        header: 'Error - Staff Panel'
                    })
                } else {
                    console.log(data)
                    res.render('staffs_holder', {
                        data: data,
                        header: `${year} - Staff Panel`
                    })
                }
            })
        })
});


module.exports = router;

const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient

router.get('/:depart/:year', async (req, res) => {
    const department = req.params.depart
    const year = parseInt(req.params.year);
    console.log(department)
    await mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection('storages')
            await collection.find({
                branch: department,
                yearofJoining: year,
                autherized: 'Yes'
            }).toArray((err, data) => {
                if (err) {
                    res.redirect('/error')
                } else {
                    console.log(data)
                    res.render('admin_holder', {
                        data: data,
                        header: `${year} - Admin Panel`
                    })
                }
            })
        })
});


module.exports = router
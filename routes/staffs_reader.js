const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const mongoClient = require('mongodb').MongoClient;

router.post('/:data', async (req, res) => {
    const _id = req.params.data;
    const data = jwt.decode(req.cookies.STAFF_TOKEN,process.env.TOKEN_SECRET)
    let branch = ((data.branch).toLowerCase())+'s'
    mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection(branch)
            collection.findOne({
                register_id: _id
            }, (err, data) => {
                if (err) {
                    res.redirect('/error')
                } else {
                    res.render('staffs_student', {
                        id:data.register_id,
                        profile: data,
                        header: data.name
                    })
                }
            })
        })
});

module.exports = router
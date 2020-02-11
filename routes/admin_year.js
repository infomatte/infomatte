const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')
const tokenize = require('./localize')


router.get('/:year', async (req, res) => {
    year = parseInt(req.params.year)
    const data = jwt.decode(tokenize.token_admin,process.env.TOKEN_SECRET)
    if(data == null)
        res.status(200).redirect('/error')
    mongoClient.connect(process.env.DB_SECRET_KEY, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },async (err, client) => {
        let db = client.db('datastore');
        let collection = db.collection('storages');
        collection.find({
                yearofJoining: year,
                branch: data.dept,
                autherized:'Yes'
            }).toArray((err, data) => {
                if (err) { }
                else {
                    res.render('admin_holder', {
                        data: data,
                        header: `${year} - Admin Panel`
                    });
                }
            });
        });
});


module.exports = router
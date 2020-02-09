const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')

router.get('/:year', async (req, res) => {
    year = parseInt(req.params.year)
    const data = jwt.decode(req.cookies.ADMIN_TOKEN,process.env.TOKEN_SECRET)
    mongoClient.connect(process.env.DB_SECRET_KEY, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },(err, client) => {
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
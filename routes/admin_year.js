const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const tokenize = require('./localize')


router.get('/:year', async (req, res) => {
    year = parseInt(req.params.year)
    tokenize.current_page = tokenize.admin.YEAR
    const data = tokenize.decode('admin')
    if(tokenize.token_admin.secure && tokenize.check_page('admin',tokenize.current_page,tokenize.from_page)){
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
    }else{
        res.status(200).redirect('/error')
    }
});


module.exports = router
const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')

router.get('/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    const data = jwt.decode(req.cookies.STAFF_TOKEN, process.env.TOKEN_SECRET)
    mongoClient.connect(process.env.DB_SECRET_KEY, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    async (err, client) => {
        let db = client.db('datastore')
        let branch = ((data.branch).toLowerCase())+'s'
        let collection = db.collection(branch)
        collection.find({
            yearofJoining:year,
            branch:data.branch
        }).toArray((err,data)=>{
            if(err){}else{
                res.render('staffs_holder',{
                    id:data.id,
                    data:data,
                    header:`${year} - Staff Panel`
                })
            }
        });
    });
});


module.exports = router;
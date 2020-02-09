const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')

router.get('/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    const data = jwt.decode(req.cookies.STAFF_TOKEN, process.env.TOKEN_SECRET)
    await mongoClient.connect(process.env.DB_SECRET_KEY, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    async (err, client) => {
        let db = client.db('infoPro')
        let collection = db.collection(data.branch+'s')
        console.log(collection.countDocuments({},(err,data)=>{console.log(data)}))
        await collection.find({
            yearofJoining:year,
            branch:data.branch
        }).toArray((err,data)=>{
            if(err){}else{
                console.log(data)
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
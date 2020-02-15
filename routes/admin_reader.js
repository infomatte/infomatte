const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient
const tokenize = require('./localize')
const jwt = require('jsonwebtoken')


router.post('/:data', async (req, res) => {
    const data = req.params.data;
    const token = jwt.decode(tokenize.token_admin.token, process.env.TOKEN_SECRET)
    if(tokenize.token_admin.secure){
        const local_branch = branchToDb(token.dept)
    mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection(local_branch)
            collection.findOne({
                register_id: data
            }, (err, response) => {
                if (err) {
                    res.redirect('/error')
                } else {
                    res.render('admin_reader', {
                        id: data.id,
                        profile: response,
                        header: response.name
                    })
                }
            })
        })
    }else{
        res.status(200).redirect('/error')
    }
})

function branchToDb(branch) {
    switch (branch) {
    case 'CSE':return 'cses'
    case 'ECE':return 'eces'
    case 'EEE':return 'eees'
    case 'MECH':return 'meches'
    }
}
module.exports = router
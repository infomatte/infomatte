const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const tokenize = require('./localize')
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("file.csv");

router.get('/:year', async (req, res) => {
    year = parseInt(req.params.year)
    tokenize.current_page = tokenize.admin.YEAR
    const data = tokenize.decode('admin')
    if(tokenize.token_admin.secure && tokenize.check_page('admin',tokenize.current_page,tokenize.from_page)){
        const local_branch = branchToDb(data.dept)
        mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },async (err, client) => {
            let db = client.db('datastore');
            let collection = db.collection(local_branch);
            collection.find({
                    yearofJoining: year,
                    autherized:'Yes'
                }).toArray((err, data) => {
                    if (err) { }
                    else {
                        res.render('admin_holder', {
                            data: data,
                            header: `${year} - Admin Panel`
                        });
                        fastcsv
                            .write(data, { headers: true })
                            .on("finish", function() {
                                
                            })
                            .pipe(ws);
                    }
                });
            });
    }else{
        res.status(200).redirect('/error')
    }
});

function branchToDb(branch) {
    switch (branch) {
    case 'CSE':return 'cses'
    case 'ECE':return 'eces'
    case 'EEE':return 'eees'
    case 'MECH':return 'meches'
    }
}

module.exports = router
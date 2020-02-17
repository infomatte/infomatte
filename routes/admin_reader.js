const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient
const Storage = require('../model/Storage')
const tokenize = require('./localize')
const Duplex = require('stream').Duplex;

router.post('/:data', async (req, res) => {
    const data = req.params.data;
    if(tokenize.token_admin.secure){
        Storage.findOne({
            register_id: data,
            autherized: 'Yes'
        }, (err, response) => {
            if (err) {
    
            } else {
                res.setHeader('content-type', 'application/pdf')
                res.setHeader('content-disposition', 'inline; filename="' + data + '"')
                toStream(response.file).pipe(res)
            }
        });
    }
    else{

    }
});
function toStream(chunk) {
    var stream = new Duplex();
    stream.push(chunk)
    stream.push(null)
    return stream
}
module.exports = router
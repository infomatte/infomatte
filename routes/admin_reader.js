const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient
const tokenize = require('./localize')

router.post('/:data', async (req, res) => {
    const data = req.params.data;
    if(tokenize.token_admin.secure){}
    else{}
});

module.exports = router
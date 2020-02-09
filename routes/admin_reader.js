const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient
const Duplex = require('stream').Duplex;

router.post('/:data', async (req, res) => {
    const data = req.params.data;
    mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection('storages')
            collection.findOne({
                register_id: data
            }, (err, data) => {
                if (err) {
                    res.redirect('error')
                } else {
                    res.setHeader('content-type', 'application/pdf')
                    res.setHeader('content-disposition', 'inline; filenmae ="' + data.register_id + '"')
                    toStream(data.file.buffer).pipe(res)
                }
            })
        })
});

function toStream(chunk) {
    var stream = new Duplex()
    stream.push(chunk)
    stream.push(null)
    return stream
}
module.exports = router
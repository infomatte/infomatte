const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const nodemailer = require('nodemailer')
const mongoClient = mongodb.MongoClient

router.get('/', async (req, res) => {
    res.render('home', {
        header: "Your thought to improve"
    })
})
router.post('/', async (req, res) => {
    const feedback = {
        name: req.body.username,
        year: req.body.year,
        branch: req.body.branch,
        title: req.body.feed_title,
        description: req.body.desc
    }
    await mongoClient.connect(process.env.DB_SECRET_KEY, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        },
        async (err, client) => {
            let db = client.db('datastore')
            let collection = db.collection('feedback')
            await collection.insertOne(feedback);
            Func_sendMail(feedback)
        })
    res.render('thanks', {
        header: "Thanks"
    })
})
async function Func_sendMail(file) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'infomatte.com@gmail.com',
            pass: 'domainTohost@error'
        }
    });
    const mailOptions = {
        from: 'infomatte',
        to: 'infomatte.com@gmail.com',
        subject: `Feedback Session`,
        html: `<div style="text-align: center">
            <h1>${file.name} from ${file.branch} ${file.year}</h1>
            <h3>${file.title}</h3>
            <p>${file.description}</p>
            <button style="padding:10px 20px;background:#4f37b9;border-radius: 20px;border:1px solid #4f37b9"><a style="text-decoration: none; color: white" href="infomatte.in">Infomatte</a></button></div>`
    };
    transporter.sendMail(mailOptions);
}
module.exports = router
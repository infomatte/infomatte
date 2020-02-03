const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const compression = require('compression')
dotenv.config();

app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(process.env.DB_SECRET_KEY, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}, () => {
  console.log('Connected to Mongo');
});

app.use(bodyParser.json());
app.use(compression())

app.use('/', require('./routes/home'));
app.use('/students_feonbnkkkujnxdkrqgouhqpsiaarpsfhekrpgwvuscmdtfvcpokzegryacvzsdha', require('./routes/login'));
app.use('/students_register', require('./routes/register'));
app.use('/students_verify_email', require('./routes/verifyToken'))
app.use('/students_formEntry', require('./routes/formEntry'));
app.use('/students_semesters', require('./routes/semesters'))
app.use('/students_download', require('./routes/download'))
app.use('/students_feedback', require('./routes/feedback'))
app.use('/students_error', require('./routes/error'));
app.use('/students_revoked', require('./routes/revoked'));
app.use('/students_emailExist', require('./routes/emailExist'));
app.use('/students_sent', require('./routes/sent'));
app.use(function (req, res) {
  res.status(404).render('error', {
    header: '404, Not Found!'
  });
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
  console.log(`Server started at ${port}`)
});
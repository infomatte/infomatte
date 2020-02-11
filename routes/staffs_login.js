const express = require('express');
const router = express.Router();
const Staff = require('../model/Staffs')
const jwt = require('jsonwebtoken')
const tokenize = require('./localize')

router.get('/', (req, res) => {
  res.render('staffs_login', {
    header: "Staff Login - Infomatte"
  });
})

router.post('/', async (req, res) => {
  const {
    id,
    pass,
    branch
  } = req.body
  Staff.findOne({
      id: id,
      password: pass
    },
    async (err, data) => {
      if (err) {
        res.render('staffs_login')
      } else {
        token = jwt.sign({
          id: id,
          pass: pass,
          branch: branch
        }, process.env.TOKEN_SECRET, {
          expiresIn: "6h"
        })
        tokenize.setToken('staff',token)
        res.redirect('/staffs_home')
      }
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Staff = require('../model/Staffs')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.render('staffs_login');
})

router.post('/',async (req,res) => {
  const {id, pass, branch} = req.body
  Staff.findOne(
    {
      id : id,
      password: pass
    },
    async (err,data) =>{
      console.log(data)
  if(err){
          res.render('staffs_login')
        }else{
          console.log('here')
          token = jwt.sign({id:id,pass: pass, branch: branch},process.env.TOKEN_SECRET,{expiresIn: "6h"})
          res.cookie('STAFF_TOKEN',token)
          res.redirect('/staffs_home')
        }
  });
});

module.exports = router;

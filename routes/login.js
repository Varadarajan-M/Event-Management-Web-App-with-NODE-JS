// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const sessionStorage = require('sessionstorage');
const User =  require('../models/usermodel')
const bcrypt = require('bcrypt');



router.route("/")
.get((req,res)=>{
  
  res.render("index",{msg:''})
})
.post((req,res)=>{

  const { email , password } = req.body;
  const saltRounds = 10;


User.findOne({email:email},(err,found)=>{
  if(err){
        console.log(err);
      }
  else{
        if (!found){
          

          res.render("index",{msg:"Sorry we didn't find any accounts with that email!"})

        }

        else if (found) {

          bcrypt.compare(password, found.password, function(err, result) {
              // result == true
              if (result == true) {
                console.log("User login Success");
                sessionStorage.setItem("sessionUser",found.username)
                sessionStorage.setItem("sessionEmail",found.email)
                sessionStorage.setItem("sessionPassword",found.password)
                
                if(email==="ADMIN@EVENTS.com"){
                  res.redirect("/userevents")
                }
                else{
                  res.redirect("/home")

                }
                
              }
              else {
                res.render("index",{msg:'Invalid Credentials'})
              }

            });
        }
      }
})


});

module.exports=router;

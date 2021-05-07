// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const User =  require('../models/usermodel')
const bcrypt = require('bcrypt');



router.route("/signup")
.get((req,res)=>{
  
  res.render("index",{msg:''})
})
.post((req,res)=>{

  const { username, email , password } = req.body;
  const saltRounds = 10;


User.findOne({email:email},(err,found)=>{
  if(err){
        console.log(err);
      }
  else{
        if (!found){

          User.findOne({username:username},(err,foundUsername)=>{
            if(err){
              console.log(err);
            }
            else if(foundUsername){
              res.render("index",{msg:'Username Already taken try another one:('})
            }
            else if(!foundUsername){

              bcrypt.hash(password, saltRounds,(err, hash)=>{
                // Store hash in your password DB.
                const user = new User({
                  username:username,
                  email:email,
                  password:hash
                })

                user.save((err)=>{
                  if(err)
                  {
                    console.log(err);
                  }
                  else{
                    
                    res.render("index",{msg:'User Registration Success'})
                  }
                });
            });

            }
          })
        

        }

        else if (found) {          
                  res.render("index",{msg:'User already Exist!'})
        }
      }
})


});

module.exports=router;

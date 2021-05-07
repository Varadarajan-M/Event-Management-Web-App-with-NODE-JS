// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const sessionStorage = require('sessionstorage');
const User =  require('../models/usermodel')
const bcrypt = require('bcrypt');
const checkAuth= require('../middlewares/checkAuth')


router.route("/changepassword")
.get(checkAuth,(req,res)=>{

    res.render("index",{msg:"Please Login First"})
    
})
.post((req,res)=>{
    const { currentpassword , newpassword , confnewpassword } = req.body
    //console.log(req.body);
    const saltRounds =10;
    email=sessionStorage.getItem("sessionEmail");
    let pwd=sessionStorage.getItem("sessionPassword")
    
    bcrypt.compare(currentpassword,pwd,(err,result)=>{

        if(err){
            console.log(err);
        }
        else if(result==true){
            console.log("True");
            
           if(newpassword===confnewpassword){

            bcrypt.hash(newpassword, saltRounds,(err, hash)=>{

                User.updateOne({email:email},{$set: {
                      //@updates the password 
                      password:hash 
                   } 

                   
                },(err)=>{
                    if(err)
                    {
                      console.log(err);
                   }
                   else{
                    console.log("hash " +hash);
                    pwd=newpassword;
                    sessionStorage.clear();
                    user="";
                    email="";
                    res.render("index",{msg:"Password Changed Successfully Please Login Again:)"})
                 
                      }
                    }
                )
                


            })

           }
           else{
            res.render("changepassword",{msg:"New Password and Confirm Password doesn't match!"})
           }
           
        }
        else{
            res.render("changepassword",{msg:"Uh Oh!That's an Incorrect Password.Try Again :( "})
        }
    })

   

});

module.exports=router
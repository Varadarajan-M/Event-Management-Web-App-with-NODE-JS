// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const Post = require('../models/postmodel');
const sessionStorage = require('sessionstorage');

router.route("/messages")
.get((req,res)=>{
    user= sessionStorage.getItem("sessionUser");
    email=sessionStorage.getItem("sessionEmail");
    if(user&&email){
        Post.find({isApproved:false,postIsCorrect:false,user:user},(err,msgs)=>{
            if(err){
                console.log(err);
            }
            else{
                res.render("messages",{messages:msgs})
            }
            
        })
    }
    else{
        res.render("index",{msg:"Please Login First"})
    }

    

});
module.exports = router;


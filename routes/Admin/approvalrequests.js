// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const sessionStorage = require('sessionstorage');
const Post = require('../../models/postmodel');

user=sessionStorage.getItem("sessionUser");

router.route("/approvalrequests")

.get((req,res)=>{
    if(user==="ADMIN"){
        Post.find({isApproved:false},(err,foundPendingEvents)=>{
            if(err){
                console.log(err);
            }
            else{
                res.render("approvalrequests",{ msg:'',pendingEvents:foundPendingEvents})
            }
    
        })
    }
    else{
        sessionStorage.clear();
        user=""
        email=""
        res.render("index",{msg:"Access Denied"});
    }
    
});

module.exports = router
// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const Post = require('../../models/postmodel');
const sessionStorage = require('sessionstorage');
let messageReciever,eventId,eventNameToBeCorrected;



router.get("/corrections/:user/:postname/:id",(req,res)=>{

    user=sessionStorage.getItem("sessionUser");

    if(user==="ADMIN"){



        Post.findOne({_id:req.params.id,user:req.params.user,eventname:req.params.postname},(err,foundEvent)=>{
            if(err){
                console.log(err);
            }
            else if(foundEvent){
            
                sessionStorage.setItem("eventId",foundEvent.id)
                sessionStorage.setItem("eventNameToBeCorrected",foundEvent.eventname)
                sessionStorage.setItem("messageReciever",foundEvent.user)
                
                res.render("sendmessage", {eventname:foundEvent.eventname,username:foundEvent.user})
            }
            else if (!foundEvent){
                
                res.render("index",{msg:"Please Login First"})
            }
        }) 
    }
    else{
        res.render("index",{msg:"Access Denied"})
    }

})
router.post("/sendmessage",(req,res)=>{

    user=sessionStorage.getItem("sessionUser");

    if(user==="ADMIN"){

        const { message }  = req.body;
        messageReciever=sessionStorage.getItem("messageReciever");
        eventId = sessionStorage.getItem("eventId");
        eventNameToBeCorrected = sessionStorage.getItem("eventNameToBeCorrected");
        console.log(req.body);
        

            Post.updateOne({_id:eventId,user:messageReciever},{postCorrections:message,postIsCorrect:false},(err,updated)=>{
                if(err){
                    console.log(err);
                }
                else{
                    Post.find({isApproved:false},(err,found)=>{
    
                        if(err){
                            console.log(err);
                        }
                        else if(found){
                            
                            res.render("approvalrequests",{msg:'Corrections have been informed to the user',pendingEvents:found})
                        }
                        else if(!found){
                            
                            res.render("approvalrequests",{msg:'Corrections have been Informed to the user'})
                        }
                    
        
                    })
                }
            })

    
        
       

    }
    else{
        res.render("index",{msg:"Access Denied"})
    }

})

module.exports = router

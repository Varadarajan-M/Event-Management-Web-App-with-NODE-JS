// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const Post = require('../../models/postmodel');
const sessionStorage = require('sessionstorage');
let url_User,url_Id;


router.get("/ADMIN/viewevent/:username/:id",(req,res)=>{
    user=sessionStorage.getItem("sessionUser")
    url_User= req.params.username;
    url_Id=req.params.id;
    
    sessionStorage.setItem("name",url_User);
    sessionStorage.setItem("id",url_Id);
    

    if(user==="ADMIN"){

        Post.findOne({_id:req.params.id,user:req.params.username},(err,foundEvent)=>{
            if(err){
                console.log(err);
            }
            else if(foundEvent){
        
               
                
        
        
                res.render("vieweventadmin",{
                
                    user:user,
                    username:foundEvent.user,
                    level:foundEvent.eventlevel,
                    type:foundEvent.eventtype,
                    name:foundEvent.eventname,
                    startdate:foundEvent.eventstartdate,
                    enddate:foundEvent.eventenddate,
                    organizers:foundEvent.eventorganizers,
                    desc:foundEvent.eventdescription,
                    orgname:foundEvent.organizationname,
                    extorg:foundEvent.externalorganizers,
                    speakertype:foundEvent.speakertype,
                    speakername:foundEvent.speakername,
                    chief:foundEvent.chiefguest,
                    chiefdesn:foundEvent.chiefguestdesignation,
                    eventreport:foundEvent.eventreport,
                    eventposter:foundEvent.eventposter
              
                
                
                
                })
        
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


router.get("/ADMIN/Approveevent/:username/:id",(req,res)=>{
    user=sessionStorage.getItem("sessionUser")
    if(user==="ADMIN"){
        let id=req.params.id;
        Post.updateOne({_id:id,user:req.params.username},{
            isApproved:true,
            postIsCorrect:true,
            postCorrections:""
        },(err,updated)=>{
            if(err){
                console.log(err);
            }
            else if(updated){
                Post.find({isApproved:false},(err,found)=>{
    
                    if(err){
                        console.log(err);
                    }
                    else if(found){
                        
                        res.render("approvalrequests",{msg:'Event have been Approved',pendingEvents:found})
                    }
                    else if(!found){
                        
                        res.render("approvalrequests",{msg:'Event have been Approved'})
                    }
                
    
                })
                
            }
        })
    }
    else{
        res.render("index",{msg:"Access Denied"})
    }
   
})

router.get("/ADMIN/deleteevent/:username/:id",(req,res)=>{
    user=sessionStorage.getItem("sessionUser")
    if(user==="ADMIN"){
        let id=req.params.id;
        Post.deleteOne({_id:id,user:req.params.username},(err,deleted)=>{
            if(err){
                console.log(err);
            }
            else if(deleted){
                Post.find({isApproved:false},(err,found)=>{
    
                    if(err){
                        console.log(err);
                    }
                    else if(found){
                        
                        res.render("approvalrequests",{msg:'Event have been Deleted',pendingEvents:found})
                    }
                    else if(!found){
                        
                        res.render("approvalrequests",{msg:'Event have been Deleted'})
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
// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const Post = require('../models/postmodel');
const sessionStorage = require('sessionstorage');
const multipleUpload = require('../middlewares/multipleupload')
let url_User,url_Id;

router.get("/users/:user/home/posts/viewevent/:id",(req,res)=>{
url_User= req.params.user;
url_Id=req.params.id;


user=sessionStorage.getItem("sessionUser")

if(user===url_User){


Post.findOne({_id:req.params.id,user:req.params.user},(err,foundEvent)=>{
    if(err){
        console.log(err);
    }
    else if(foundEvent){

       
        


        res.render("viewevent",{
        
            user:req.params.user,
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
    res.render("index",{msg:"Please Login First"})
}

})



router.get("/uploads/?:id" , (req , res)=>{
    user=sessionStorage.getItem("sessionUser")
    if((user!="")||(user==="ADMIN")){    
        
        res.sendFile(__dirname + "/public/uploads/" + req.params.id );
    }
    else{
        res.render("index",{msg:"Please Login First"})  
    }


})

router.get("/uploads/" , (req , res)=>{

    

    if(user==="ADMIN"){
        res.redirect("/ADMIN/viewevent/"+sessionStorage.getItem("name")+"/"+sessionStorage.getItem("id"))
    }
    else{
        res.redirect("/users/"+url_User+"/home/posts/viewevent/"+url_Id)
    }
    

})

router.get("/users/:user/home/posts/updateevent/:id",(req,res)=>{

url_User= req.params.user;
url_Id=req.params.id;


user=sessionStorage.getItem("sessionUser")

    if(user===url_User){


        Post.findOne({_id:req.params.id,user:req.params.user},(err,foundEvent)=>{
            if(err){
                console.log(err);
            }
            else if(foundEvent){
        
               
                
        
                sessionStorage.setItem("eventPoster",foundEvent.eventposter);
                sessionStorage.setItem("eventReport",foundEvent.eventreport);    
                sessionStorage.setItem("postId",req.params.id);
                res.render("updateevent",{
                
                    
                    user:req.params.user,
                    name:foundEvent.eventname,
                    startdate:foundEvent.eventstartdate,
                    enddate:foundEvent.eventenddate,
                    organizers:foundEvent.eventorganizers,
                    desc:foundEvent.eventdescription,
                    orgname:foundEvent.organizationname,
                    extorg:foundEvent.externalorganizers,
                    speakername:foundEvent.speakername,
                    chief:foundEvent.chiefguest,
                    chiefdesn:foundEvent.chiefguestdesignation
                   
              
                
                
                
                })
        
            }
            else if (!foundEvent){
                
                res.render("index",{msg:"Please Login First"})
            }
        })  
        } 
        else{
            res.render("index",{msg:"Please Login First"})  
        }

})
router.post("/updateevent",multipleUpload,(req,res)=>{

    let { eventname, eventlevel, eventtype, startdate, enddate, organizers, desc,orgname, extorganizers, speakertype, speakername, chiefguest, chiefguestdesn } = req.body;

    let evPoster;
  let evReport;
  
  if(! req.files['filePoster']){
   evPoster = sessionStorage.getItem("eventPoster");
  }
  else{
   evPoster= req.files['filePoster'][0].filename;
  }

  if(! req.files['fileReport']){
    evReport = sessionStorage.getItem("eventReport"); ;
  }
  else
  {
    evReport =req.files['fileReport'][0].filename;
  }

// console.log(req.body);
// console.log("Event poster : " + evPoster);
// console.log("Event Report : "+  evReport);

let id= sessionStorage.getItem("postId");
Post.findByIdAndUpdate(id,{
    eventlevel:eventlevel,
    eventtype:eventtype,
    eventname:eventname,
    eventstartdate:startdate,
    eventenddate:enddate,
    eventorganizers:organizers,
    eventdescription:desc,
    organizationname:orgname,
    externalorganizers:extorganizers,
    speakertype:speakertype,
    speakername:speakername,
    chiefguest:chiefguest,
    chiefguestdesignation:chiefguestdesn,
    eventposter : evPoster,
    eventreport : evReport,
    isApproved:false

},(err,updated)=>{
 sessionStorage.removeItem("eventPoster");
 sessionStorage.removeItem("eventReport")
 console.log("current poster val"+sessionStorage.getItem("eventPoster"));   
res.redirect("/home")
})



})

router.get("/users/:user/home/posts/deleteevent/:id",(req,res)=>{
    

    url_User= req.params.user;
    url_Id=req.params.id;


    user=sessionStorage.getItem("sessionUser")

    if(user===url_User){

        Post.deleteOne({_id:url_Id},(err,deleted)=>{

            if(err){
               console.log(err); 
            }
            else{
                res.redirect(req.get('referer'))
            }

        })
  
    }
    else{
        res.render("index",{msg:"Please Login First"}) 
    }
  
  
  })
  
module.exports =router
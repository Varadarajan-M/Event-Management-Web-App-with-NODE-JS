// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require("express");
const Post =  require('../models/postmodel')
const checkAuth = require("../middlewares/checkAuth");
const sessionStorage = require('sessionstorage');
const router = express.Router()
const multipleUpload = require("../middlewares/multipleupload")

//route - get 
router.route("/newevent")
.get(checkAuth,(req,res)=>{
  res.render("index",{msg:"Please Login First"})
}) // route - post
.post(multipleUpload,(req,res)=>{

  let { eventname, eventlevel, eventtype, startdate, enddate, organizers, desc,orgname, extorganizers, speakertype, speakername, chiefguest, chiefguestdesn } = req.body;

  let evPoster;
  let evReport;
  
  if(! req.files['filePoster']){
   evPoster = "";
  }
  else{
   evPoster= req.files['filePoster'][0].filename;
  }

  if(! req.files['fileReport']){
    evReport = "";
  }
  else
  {
    evReport =req.files['fileReport'][0].filename;
  }
  // console.log(req.body);
  // console.log(evPoster);
  // console.log(evReport);
  let tempUser = sessionStorage.getItem("sessionUser");
  let tempEmail = sessionStorage.getItem("sessionEmail");
  let approvalStatus = false;
  let correctStatus = true;
  const post = new Post({

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
    isApproved:approvalStatus,
    email:tempEmail,
    user : tempUser,
    postIsCorrect:correctStatus,
    postCorrections:""
  })
  if(startdate>enddate){

      res.render("newevent",{msg:'End date should be greater than start date'});
      
  }
  else{
  post.save((err)=>{
    if(err){
      res.render("newevent",{msg:'Cannot Add Event'});
      console.log(err);
    }
    else{
      res.render("newevent",{msg:'Event will be added after admin approval.'})

    }

  });
  console.log(post);
}

})

module.exports=router

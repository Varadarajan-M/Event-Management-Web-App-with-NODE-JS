// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const sessionStorage = require('sessionstorage');
const Post = require('../../models/postmodel');
const User = require("../../models/usermodel");
let state=true,sdate,edate,evlevel,evtype,uname;
router.route("/userevents")
.get((req,res)=>{
    user=sessionStorage.getItem("sessionUser");

    if(user=="ADMIN")
    {

        if(state)
        {
            User.find({},(err,foundUserList)=>{

        if(err){
            console.log(err);
        }
        else{

            Post.find({isApproved:true},(err,foundApprovedEvents)=>{

                if(err){
                    console.log(err);
                }
                else{
                    Post.find({isApproved:false},(err,len)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.render("userevents",{pending:len,user:user,userEvents:foundApprovedEvents, userDetails:foundUserList})
                        }
                    })
                    
                }

            })
            
        }
            })
        }
        else{
            state=true;

             
           

            //@ to fetch all events without username type and level
            if((!evlevel)&&(!evtype)&&(!uname))
            {
            
            User.find({},(err,foundUserList)=>{

            if(err){
                console.log(err);
            }
            else{
    
                Post.find({isApproved:true,eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{
          
                    if(err){
                      console.log(err);
                    }
          
                    else{
                        res.render("userevents",{user:user,pending:"", userEvents:foundApprovedEvents, userDetails:foundUserList})
                    }
    
                })
                
            }
                    })
            }

            // @ to fetch without username and type
            else if((!uname)&&(!evtype)){
                User.find({},(err,foundUserList)=>{

                    if(err){
                        console.log(err);
                    }
                    else{
            
                        Post.find({isApproved:true,eventlevel:evlevel,eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{
                  
                            if(err){
                              console.log(err);
                            }
                  
                            else{
                                res.render("userevents",{user:user,pending:"",userEvents:foundApprovedEvents, userDetails:foundUserList})
                            }
            
                        })
                        
                    }
                            })
            }

             // @ to fetch without username and level
             else if((!uname)&&(!evlevel)){
                User.find({},(err,foundUserList)=>{

                    if(err){
                        console.log(err);
                    }
                    else{
            
                        Post.find({isApproved:true,eventtype:evtype,eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{
                  
                            if(err){
                              console.log(err);
                            }
                  
                            else{
                                res.render("userevents",{user:user,pending:"",userEvents:foundApprovedEvents, userDetails:foundUserList})
                            }
            
                        })
                        
                    }
                            })
            }

            //@ to fetch userevents without level and type 

            else if((!evlevel)&&(!evtype)){
                User.find({},(err,foundUserList)=>{

                    if(err){
                        console.log(err);
                    }
                    else{
            
                        Post.find({isApproved:true,user:uname,eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{
                  
                            if(err){
                              console.log(err);
                            }
                  
                            else{
                                res.render("userevents",{user:user,pending:"",userEvents:foundApprovedEvents, userDetails:foundUserList})
                            }
            
                        })
                        
                    }
                            })
            }

            //@ to fetch without just type
            else if(!evtype){
                User.find({},(err,foundUserList)=>{

                    if(err){
                        console.log(err);
                    }
                    else{
            
                        Post.find({isApproved:true,eventlevel:evlevel , user:uname,eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{
                  
                            if(err){
                              console.log(err);
                            }
                  
                            else{
                                res.render("userevents",{user:user,pending:"",userEvents:foundApprovedEvents, userDetails:foundUserList})
                            }
            
                        })
                        
                    }
                            })
            }

            //@ to fetch without just level
            else if(!evlevel){
                User.find({},(err,foundUserList)=>{

                    if(err){
                        console.log(err);
                    }
                    else{
            
                        Post.find({isApproved:true,eventtype:evtype , user:uname,eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{
                  
                            if(err){
                              console.log(err);
                            }
                  
                            else{
                                res.render("userevents",{user:user,pending:"",userEvents:foundApprovedEvents, userDetails:foundUserList})
                            }
            
                        })
                        
                    }
                            })
            }
            
           


            else if(!uname)
            {
            
            User.find({},(err,foundUserList)=>{

            if(err){
                console.log(err);
            }
            else{
    
                Post.find({isApproved:true, eventlevel:evlevel, eventtype:evtype , eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{          
                    
                    if(err){
                      console.log(err);
                    }
          
                    else{
                        res.render("userevents",{user:user,pending:"",userEvents:foundApprovedEvents, userDetails:foundUserList})
                    }
    
                })
                
            }
            })
            }



            //   

        }

    }
    else
    {
    res.render("index",{msg:"Access Denied"})
    }
    
})
.post((req,res)=>{

    const {startdate , enddate , eventlevel , eventtype, username } = req.body
    
    sdate = startdate;
    edate = enddate;
    evlevel = eventlevel;
    evtype = eventtype;
    uname = username;
    state=false;  
  
  
    console.log(req.body);
  
    res.redirect("/userevents")
    
  })


  module.exports=router
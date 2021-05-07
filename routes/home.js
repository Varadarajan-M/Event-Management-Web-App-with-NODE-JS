// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const sessionStorage = require('sessionstorage');
const Post = require('../models/postmodel');
let state=true,sdate,edate,evlevel,evtype;
router.route("/")
.get((req,res)=>{

  email=sessionStorage.getItem("sessionEmail")
  console.log("Current email " + email );
  user=sessionStorage.getItem("sessionUser")
  console.log(user);
  if(user&&email){
    
    // @ for displaying event details and pending approvals
    if(state){

      

      Post.find({isApproved:true,user:user,email:email},(err,foundApprovedEvents)=>{

      if(err){
        console.log(err);
      }
      else if(foundApprovedEvents){
       
        Post.find({isApproved:false,user:user,email:email},(err,foundPendingEvents)=>{

            if(err){
              console.log(err);
            }
            else if(foundPendingEvents){
              //1
              Post.find({isApproved:false,postIsCorrect:false,user:user},(err,msgs)=>{
                if(err){
                  console.log(err);
                }
                else{
                  
                  res.render("Home",{messages:msgs,user:user,myEvents:foundApprovedEvents,pendingEvents:foundPendingEvents});
                }
              })        
            }
            else if(!foundPendingEvents){
              Post.find({isApproved:false,postIsCorrect:false,user:user},(err,msgs)=>{
                if(err){
                  console.log(err);
                }
                else{
              res.render("Home",{messages:msgs,user:user,myEvents:foundApprovedEvents});
                }
            })
          }

        })
       
      }
      else if(!foundApprovedEvents){

        
        Post.find({isApproved:false,user:user,email:email},(err,foundPendingEvents)=>{

          if(err){
            console.log(err);
          }
          else if(foundPendingEvents){
            Post.find({isApproved:false,postIsCorrect:false,user:user},(err,msgs)=>{
              if(err){
                console.log(err);
              }
              else{
            res.render("Home",{messages:msg,user:user,myEvents:foundApprovedEvents});
            }
          })
          }        
        })

      }

      })
   
    }
    else{
      //@ set state = true to display all values on next get request
      state=true
      //@ fetch with dates
      if((!evlevel)&&(!evtype))
      {

        Post.find({isApproved:true,user:user,email:email,eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{
          
          if(err){
            console.log(err);
          }

          else if(foundApprovedEvents){
            Post.find({isApproved:false,user:user,email:email},(err,foundPendingEvents)=>{
                if(err){
                  console.log(err);
                }
                else if(foundPendingEvents){
                  res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents,pendingEvents:foundPendingEvents});
                }
                else if(!foundPendingEvents){
                  res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents});
                }
            })
          }

          else if(!foundApprovedEvents){

        
            Post.find({isApproved:false,user:user,email:email},(err,foundPendingEvents)=>{
    
              if(err){
                console.log(err);
              }
              else if(foundPendingEvents){
                res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents});
              }
    
            })
    
          }

        })

      }

      //@ fetch with dates and type
      else if(!evlevel)
      {

        Post.find({isApproved:true,user:user,email:email, eventtype:evtype, eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{
          
          if(err){
            console.log(err);
          }

          else if(foundApprovedEvents){
            Post.find({isApproved:false,user:user,email:email},(err,foundPendingEvents)=>{
                if(err){
                  console.log(err);
                }
                else if(foundPendingEvents){
                  res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents,pendingEvents:foundPendingEvents});
                }
                else if(!foundPendingEvents){
                  res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents});
                }
            })
          }

          else if(!foundApprovedEvents){

        
            Post.find({isApproved:false,user:user,email:email},(err,foundPendingEvents)=>{
    
              if(err){
                console.log(err);
              }
              else if(foundPendingEvents){
                res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents});
              }
    
            })
    
          }

        })

      }
      
      //@ fetch with dates and level

      else if(!evtype)
      {

        Post.find({isApproved:true,user:user,email:email, eventlevel:evlevel, eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{
          
          if(err){
            console.log(err);
          }

          else if(foundApprovedEvents){
            Post.find({isApproved:false,user:user,email:email},(err,foundPendingEvents)=>{
                if(err){
                  console.log(err);
                }
                else if(foundPendingEvents){
                  res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents,pendingEvents:foundPendingEvents});
                }
                else if(!foundPendingEvents){
                  res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents});
                }
            })
          }

          else if(!foundApprovedEvents){

        
            Post.find({isApproved:false,user:user,email:email},(err,foundPendingEvents)=>{
    
              if(err){
                console.log(err);
              }
              else if(foundPendingEvents){
                res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents});
              }
    
            })
    
          }

        })

      }
     
      // @ fetch with all values
      else{
      
  
          Post.find({isApproved:true,user:user,email:email, eventlevel:evlevel, eventtype:evtype , eventstartdate:{$gte:sdate},eventenddate:{$lte:edate}},(err,foundApprovedEvents)=>{
            
            if(err){
              console.log(err);
            }
  
            else if(foundApprovedEvents){
              Post.find({isApproved:false,user:user,email:email},(err,foundPendingEvents)=>{
                  if(err){
                    console.log(err);
                  }
                  else if(foundPendingEvents){
                    res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents,pendingEvents:foundPendingEvents});
                  }
                  else if(!foundPendingEvents){
                    res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents});
                  }
              })
            }
  
            else if(!foundApprovedEvents){
  
          
              Post.find({isApproved:false,user:user,email:email},(err,foundPendingEvents)=>{
      
                if(err){
                  console.log(err);
                }
                else if(foundPendingEvents){
                  res.render("Home",{messages:"",user:user,myEvents:foundApprovedEvents});
                }
      
              })
      
            }
  
          })
  
        
      }

      
    }



    
  }
  else{
    res.render("index",{msg:"Please Login First"})
  }
})
.post((req,res)=>{

  const {startdate , enddate , eventlevel , eventtype} = req.body
  
  sdate = startdate;
  edate = enddate;
  evlevel = eventlevel;
  evtype = eventtype;

  state=false;  


  console.log(req.body);

  res.redirect("/home")
  
})
module.exports = router

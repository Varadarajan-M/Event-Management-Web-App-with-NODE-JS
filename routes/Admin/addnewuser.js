// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const User =  require('../../models/usermodel')
const Post = require('../../models/postmodel');
const bcrypt = require('bcrypt');
const sessionStorage = require('sessionstorage');
let msg='';

router.route("/addnewuser")
.get((req,res)=>{
user=sessionStorage.getItem("sessionUser");
    if(user==="ADMIN"){

        User.find({},(err,foundUser)=>{
    
        if(err){
            console.log(err);
        }
        else{
            res.render("addnewuser",{msg:msg,userList:foundUser})
            msg=""
        }


        })

    }
    else{
    res.render("index",{msg:"Access Denied"})
    }



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
                    msg="Username Already Exists"
                  res.redirect('/addnewuser')
                  
                }
                else if(!foundUsername){
    
                  bcrypt.hash(password, saltRounds,(err, hash)=>{
                    // Store hash in your password DB.
                    const newuser = new User({
                      username:username,
                      email:email,
                      password:hash
                    })
    
                    newuser.save((err)=>{
                      if(err)
                      {
                        console.log(err);
                      }
                      else{
                          
                            msg='User Added Successfully!' 
                            console.log(newuser);
                     
                            res.redirect("/addnewuser")
                         
                      }
                    });
                });
    
                }
              })
            
    
            }
    
            else if (found) {          
                    msg='User already Exist!'
                    res.redirect("/addnewuser");
            }
          }
    })



});

router.get("/password-reset/:user/:id",(req,res)=>{

    user=sessionStorage.getItem("sessionUser");
    let resetUser= req.params.user,resetId=req.params.id;
    let newPassword = resetUser,saltRounds=10;
    if(user==="ADMIN"){
    
        bcrypt.hash(newPassword, saltRounds,(err, hash)=>{
            // Store hash in your password DB.
            if(err){
                console.log(err);
            }
            else{

            
            User.updateOne({username:resetUser,_id:resetId},{password:hash},(err,resetPass)=>{
                if(err){
                    console.log(err);
                }
                else{
                    msg = "Password Reset Successful!"
                    res.redirect("/addnewuser");
                }
            })
        }
        })

        
    }
    else{
        res.render("index",{msg:"Access Denied"})
    }

})

router.get("/delete-user/:user/:id",(req,res)=>{
    let delUser = req.params.user,delId=req.params.id;
    let user=sessionStorage.getItem("sessionUser");
    if(user==="ADMIN"){
      
                User.deleteOne({username:delUser,_id:delId},(err,deleted)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                       Post.deleteMany({user:delUser},(err,deletedPosts)=>{
                           if(!err){
                               msg="User Records Deleted";
                               res.redirect("/addnewuser");
                           }
                       })  
                    }
                })
            
    }
    else{
        res.render("index",{msg:"Access Denied"});
    }
})

module.exports=router;


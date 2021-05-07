// Event Management Web App
// @Created and Developed By Varadarajan M
const express = require('express');
const router = express.Router()
const sessionStorage = require('sessionstorage');

router.route("/logout")
.get((req,res)=>{
    sessionStorage.clear();
    user=""
    email=""
    console.log(user + ":" + email );
    res.redirect("/login")
});

module.exports = router
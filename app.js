//jshint esversion:6
// Event Management Web App
// @Created and Developed By Varadarajan M
//@ modules and packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const login = require('./routes/login');
const signup = require("./routes/signup")
const home = require('./routes/home');
const newevent = require('./routes/newevent');
const changepassword =  require('./routes/changepassword')
const logout =  require('./routes/logout')
const actions = require('./routes/actions')
const messages =  require('./routes/messages')
const userevents=require('./routes/Admin/userevents')
const adminactions = require('./routes/Admin/actions')
const approvalrequests = require('./routes/Admin/approvalrequests')
const adminchangepass = require('./routes/Admin/adminchangepass')
const addnewuser = require('./routes/Admin/addnewuser');
const sendmessage =  require('./routes/Admin/sendmessage')
//@mongo connection
mongoose.connect("mongodb://localhost:27017/EventManagementWebAppDB",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;


//@Middlewares
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/",signup)
app.use("/login",login)
app.use("/home",home)
app.use("/",actions)
app.use("/",messages)
app.use("/",newevent)
app.use("/",changepassword)
app.use("/",logout)


app.use("/",userevents)
app.use("/",adminactions)
app.use("/",approvalrequests)
app.use("/",adminchangepass)
app.use("/",addnewuser)
app.use("/",sendmessage)

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


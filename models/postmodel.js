// Event Management Web App
// @Created and Developed By Varadarajan M
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

		eventlevel:{
      type:String,
      required:[true,'Event Level Required']
    },
		eventtype:{
      type:String,
      required:[true,'Event type Required']
    },
		eventname:{
      type:String,
      required:[true,'Event Name Required']
    },
		eventstartdate:{
      type:String,
      required:[true,'Event StartDate Required']
    },
		eventenddate:{
      type:String,
      required:[true,'Event End date Required']
    },
		eventorganizers:{
      type:String,
      required:[true,'organiser required']
    },
		eventdescription:String,
		organizationname:String,
		externalorganizers:String,
		speakertype:String,
		speakername:String,
		chiefguest:String,
		chiefguestdesignation:String,
    eventposter : String,
    eventreport : String,
    user:String,
    email:String,
    isApproved:String,
    postIsCorrect:String,
    postCorrections:String
  })
  const Post= mongoose.model('Post', postSchema);

  module.exports= Post;

// Event Management Web App
// @Created and Developed By Varadarajan M
const multer = require("multer");
var fs = require('fs');
const path = require("path");
const fileStorageEngine = multer.diskStorage({
  destination : (req, file, cb) => {
		let dir = "public/uploads";
		if(!fs.existsSync(dir)){
			fs.mkdir(dir);
		}
    // Adds the destination folder where the files is saved
    cb(null,'public/uploads')
  },
  filename : (req , file , cb)=>{
    cb(null ,  file.fieldname + Date.now() + '_' + path.extname(file.originalname));
  }
});

const upload= multer({ storage : fileStorageEngine });
var multipleUpload = upload.fields([{name : 'filePoster' , maxCount : 1 } , {name :'fileReport' , maxCount : 1}]);

module.exports = multipleUpload;

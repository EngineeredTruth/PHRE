require('babel-core/register');
var app = require('./server.js');
var db = app.get('db');
var multer = require('multer');

//multer stuff

var storage = multer.diskStorage({
  destination:  (req, file, callback) => {
    if(req.body.listing_type === 'presale'){
      return callback(null, './public/uploads/pre-sale');
  } else if (req.body.listing_type === 'rental') {
      return callback(null, './public/uploads/rentals');
  } else if (req.body.listing_type === 'rfo'){
      return callback(null, './public/uploads/rfo');
  }
    return callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    console.log('filename: ', req.body);
    if( file.mimetype === 'image/jpeg'){
      var name = req.body.title.replace(/\s/g,'')+'@@@'+Date.now() + "." + 'jpg'
    } else if (file.mimetype === 'image/png'){
      var name = req.body.title.replace(/\s/g,'')+'@@@'+Date.now() + "." + 'png'
    }
    return callback(null, name);
  }
});

var limits = {
  fileSize: 10000000
}

var upload = multer({ storage : storage, limits : limits }).array('userPhoto',10)

module.exports = {
  loggedin: (req, res, next) => {
    console.log(req);
    return next();
  },
  upload_stage0: (req, res, next) => {
    console.log('stage 0: ',  req.body);
    next()
  },
  upload_stage1: (req,res, next) => {

    console.log('initial post request: ', req.body);

      upload(req,res, (err) => {
        console.log('after upload');

          console.log('req.files: ', req.files);
          if(err) {
              return res.end("Error uploading file: ", err);
          }
          next();
      });

  },
  upload_stage2: (req, res) => {
    console.log('stage 2: ',  req.body);

    let array = [
      req.body.title,
      req.body.title.replace(/\W/,'g'),
      req.body.developer,
      req.body.project_type,
      req.body.listing_type,
      req.body.price,
      req.body.address,
      req.body.location
    ]

    db.insert_listing(array, (err, response) => {
      if(err){
        consolle.log('inert listing error: ', err)
      }
      return console.log(response);
    })

    for(let i = 0; i < req.files; i++){

    }
    res.end("File is uploaded");
  }
}

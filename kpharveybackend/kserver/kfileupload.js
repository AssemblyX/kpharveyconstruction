var cors = require('cors');
var express = require('express');
var formidable = require('formidable');
var fs = require('fs');

var app = express();

// app.get('/', function (req, res){
//     res.sendFile(__dirname + '/index.html');
// });

app.use(cors());
app.options('*', cors());

app.post('/', function (req, res){

  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.parse(req, function (err, fields, files) {
    console.log(fields);
    console.log(files);
    for (var p in files) {
        if (files.hasOwnProperty(p)) {
          var oldpath = files[p].path;
          var newpath = __dirname + "/uploads/" + files[p].name;
          fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            //res.write(files[p].name + ' uploaded and moved!');
            
          });
        }
    }
    res.write('File uploaded and moved!');
    res.end();


//     var oldpath = files.filetoupload[0].path;
//     var newpath = __dirname + "/uploads/" + files.filetoupload.name;
//     fs.rename(oldpath, newpath, function (err) {
//       if (err) throw err;
//       res.write('File uploaded and moved!');
//       res.end();
//     });
  });
});

app.listen(7002);
console.log("File upload server started on port:1338");
'use strict';

var express = require('express');
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));


var path = require('path');
require('dotenv').load();
var month =["January","February","March"
             ,"April","May","June","July","August",
             "September","October","Novenber","December"];


app.get("/",function(req,res,next){
       /*send the html file with the instructions for the timestamp */
       console.log(__dirname);
       res.sendFile(path.join(__dirname + '/public/index.html'));

});

app.get("/:date",function(req,res){
        var date = req.params.date;
        /*check if unix timestamp either +digits or -digits */
        var patt = /^[-\+]?\d*$/;
        var outstr ;
        if (patt.test(date)){
            var d = new Date(date * 1000);
            outstr= '{"unix":'+ date + ',"natural":"'+ month[d.getMonth()] +" "+d.getDate()+', '+d.getFullYear()+ '"}';
        }
        else {/*check if valid natural date */
            var unixts = (new Date(date).getTime()/1000).toFixed(0);
            /*failed both the unix timestamp text and being a natural date */
            if (isNaN(unixts)){
                outstr = '{"unix":null,"natural":null}';
            }
            else{
            outstr = '{"unix":' + unixts + ',"natural":"' + date+'"}';
            }
        }
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end(outstr);
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {

	console.log('Node.js listening here on port ' + port + '...');
});
'use strict';

var express = require('express');

var app = express();


app.get('*', function( req, res) {
    
  var lang = req.headers[ 'accept-language'];
  var comma = lang.indexOf(',');
  comma = comma == -1? lang.length : comma;
  lang = lang.substring(0,comma);
    
  var os = req.headers['user-agent'];
  var osStart = os.indexOf('(') + 1;
  var osEnd = os.indexOf(')',osStart);
  os = os.substr(osStart,osEnd-osStart);
  
    
  var headers = {
      'ipaddress' : req.headers['x-forwarded-for'],
      'language' : lang,
      'software' : os
  };
    
   res.send(JSON.stringify(headers));
   
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
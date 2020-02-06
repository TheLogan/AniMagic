var ncp = require('ncp').ncp;
var path = require('path');
 
ncp.limit = 16;
 
ncp(path.join(__dirname, 'src/MockData'), path.join(__dirname, 'build/main/MockData'), function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});
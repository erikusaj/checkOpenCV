//
// to run script type:
// node checkOpenCV.js
//

"use strict";
var os = require('os');
var exec = require("child_process").exec;
var fs = require("fs");

console.log( [ os.type() , os.platform() ,os.arch() , os.release(), os.totalmem(), os.freemem()
].join(' ; ') );

exec('node --version', (error, stdout, stderr) => {
  if (error) {
    console.error(`Node: ERROR: ${error}`);
    return;
  }
  else {
    console.log( 'Node: '.concat( stdout.split('\n')[0] ));
  }
});

exec('npm -version', (error, stdout, stderr) => {
  if (error) {
    console.error(`Npm: ERROR: ${error}`);
    return;
  }
  else {
    var npmversion = stdout.split('\n')[0];
    // console.log( 'Npm: '.concat( npmversion ));
    exec('npm config get prefix', (error, stdout, stderr) => {
      if (error) {
        console.error(`Npm: ERROR: ${error}`);
        return;
      }
      else {
        console.log( 'Npm:' + npmversion + ' ; ' + stdout.split('\n')[0] );
      }
    });

  }
});

var findcommand = 'sudo find / -name "opencv.pc" -type f';

if ( os.platform() == "darwin" ) {
  findcommand = "mdfind -name opencv.pc";
}

if ( os.platform() == 'win32' )
{
  console.error('TODO: Improvement: Checking OpenCV on Windows.');
}
else {
  exec(findcommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    else {
      var found = stdout.split('\n');
      for (var i in found)
      {
        if (found[i] != "")
        {
          var filename = found[i];
          fs.readFile(filename, function (err, data) {
          if (err) {
             return console.error(err);
          }
            var lines = data.toString().split('\n');
            for (var l in lines)
            {
              var ls = lines[l].split(':');
              if ( ls[0].trim().toLowerCase() == 'version' )
              console.log( ['OpenCV',  ls[1].trim(), filename].join(' ; ') );
            }
          });
        }
      }
    }
  });
}

//
// to run script type:
// node checkOpenCV.js
//

"use strict";


  var os = require('os');
  var exec = require("child_process").exec;
  var fs = require("fs");

  var configPath = '';
  const line = '------------------------------------------';


  checkOS();

  function checkOS(){
    console.log(
      '\n'.concat(
        [ os.type(),
          os.platform(),
          os.arch(),
          os.release(),
          os.totalmem(),
          os.freemem()
        ].join(' ; ')
      )
    );
    checkLibrary();
  }

  function checkNode(){
    exec('node --version', (error, stdout, stderr) => {
      if (error) {
        console.log( 'Node check failed:\n\n  '.concat(error) );
        return;
      }
      else {
        console.log( 'Node: '.concat( stdout.split('\n')[0] ));
      }
      checkNpm();
    });
  }

  function checkNpm(){
    exec('npm -version', (error, stdout, stderr) => {
      if (error) {
        console.log( 'Npm check failed:\n\n  '.concat(error) );
        return;
      }
      else {
        var npmversion = stdout.split('\n')[0];
        exec('npm config get prefix', (error, stdout, stderr) => {
          if (error) {
            console.log( 'Check failed.\n'.concat(error) );
            return;
          }
          else {
            console.log( 'Npm: ' + npmversion + ' ; ' + stdout.split('\n')[0] );
          }
        });
      }
    });
  }

function checkLibrary(){
  var findcommand = 'sudo find / -name "opencv.pc" -type f';
  if ( os.platform() == "darwin" ) {
    findcommand = "mdfind -name opencv.pc";
  }
  if ( os.platform() == 'win32' )
  {
    console.log('TODO: Improvement: Checking OpenCV on Windows.');
  }
  else {
    exec(findcommand, (error, stdout, stderr) => {
      if (error) {
        console.log( 'OpenCV library check failed:\n\n  '.concat(error) );
        return;
      }
      else {
        var found = stdout.split('\n');
        for (var i in found)
        {
          if (found[i] != "")
          {
            var filename = found[i];
            fs.readFile(filename, function(err, data){
              if (err) {
                console.log( 'Error reading file:\n\n  '.concat(error) );
                return;
              }
                var lines = data.toString().split('\n');
                for (var l in lines)
                {
                  var ls = lines[l].split(':');
                  if ( ls[0].trim().toLowerCase() == 'version' )
                  {
                    console.log( ['OpenCV',  ls[1].trim(), filename].join(' ; ') );
                    configPath = filename.substring( 0, filename.lastIndexOf('/') )
                  }
                }
                checkEnvironment( configPath );
            });
          }
        }
      }
    });
  }
}


function checkEnvironment(path){
  exec('env | grep PKG_CONFIG_PATH', (error, stdout, stderr) => {
    if (error) {
      console.log( [
        'IMPORTANT: make sure to add paths:\n\n',
        'PKG_CONFIG_PATH=$PKG_CONFIG_PATH:', '\n',
        'export PKG_CONFIG_PATH\n' ].join('')
      );
      console.log('Checking for environment variable PKG_CONFIG_PATH failed:\n\n  ' );

    }
    else {
      var ok = stdout.includes(path)?'OK':'NOT OK';
      console.log( 'Environment variable PKG_CONFIG_PATH is '.concat( ok ) );
      if ( ok === 'OK' )
      {
        console.log( stdout );
      }
      else
      {
        console.log( [
          'IMPORTANT: make sure to add paths:\n\n',
          'PKG_CONFIG_PATH=$PKG_CONFIG_PATH:', path, '\n',
          'export PKG_CONFIG_PATH\n' ].join('')
        );
      }
    }
    checkPkgConfig();
  });
};



function checkPkgConfig()
{
  const pkgPlatformFix = {
    'darwin' : 'brew install pgk-config',
    'linux' : 'sudo apt-get install -y pkg-config \n or \nsudo yum install -y pkg-config'
  }
  exec('pkg-config --version', (error, stdout, stderr) => {
    if (error) {
      console.log('pgk-config is probably missing\nPOSSIBLE FIX: install utility using:\n'.concat( pkg.pkgPlatformFix[os.platform()] ));
      return;
    }
    else {
      console.log('pgk-config: '.concat( stdout.split('\n')[0] ));
    }
    checkNode();
  });
}

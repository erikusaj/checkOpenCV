# checkOpenCV
Script for checking OS, Node, Npm and **OpenCV** versions.

### Running script

```bash
$ node checkOpenCV.js
```

### Sample outputs

This should be fine. You should be able to `npm install opencv -g` on your machine.

```
Linux ; linux ; x64 ; 3.10.0-327.13.1.el7.x86_64 ; 1929408512 ; 1126473728
OpenCV ; 2.4.12 ; /usr/local/opencv/lib/pkgconfig/opencv.pc
Environment variable PKG_CONFIG_PATH is OK
PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:/usr/local/opencv/lib/pkgconfig/

pgk-config: 0.27.1
Node: v4.3.2
Npm: 2.14.12 ; /home/vagrant/.npm-global
```

This requires some work using.

```
Darwin ; darwin ; x64 ; 15.4.0 ; 4294967296 ; 21180416
OpenCV ; 2.4.12 ; /usr/local/Cellar/opencv/2.4.12_2/lib/pkgconfig/opencv.pc
Checking for environment variable PKG_CONFIG_PATH failed.
IMPORTANT: make sure to add enironment paths:

  PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/Cellar/opencv/2.4.12_2/lib/pkgconfig
  export PKG_CONFIG_PATH

pgk-config: 0.29.1
Node: v6.1.0
Npm: 3.9.2 ; /usr/local

```
Update your .bash_profile with your favorite editor. `atom $HOME/.bash_profile`.
Then restart your Terminal and retry installing.

### Note
I am observing issues installing Npm module _opencv_ Node Bindings to OpenCV from [npm opencv ](https://www.npmjs.com/package/opencv) on several Vagrant boxes and Docker containers.
Therefore creating this script to try identify pinpoint issues.

I think it might be handy to identify what is installed on those virtual machines since many authors don't care providing some basic _documentation_.
Yeah, since we are all prone to forget RTFM ;-)

### Known issues
- no Windows support
- search requires sudo on Linux
- ...

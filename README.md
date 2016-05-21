# checkOpenCV
Script for checking OS, Node, Npm and **OpenCV** versions.

### Running script

```bash
$ node checkOpenCV.js
```

### Note
I am observing issues installing Npm module _opencv_ Node Bindings to OpenCV from [npm opencv ](https://www.npmjs.com/package/opencv) on several Vagrant boxes and Docker containers.
Therefore creating this script to try identify pinpoint issues.

I think it might be handy to identify what is installed on those virtual machines since many authors don't care providing some basic _documentation_.
Yeah, since we are all prone to forget RTFM ;-)

### Known issues
- no Windows support
- search requires sudo on Linux
- ...

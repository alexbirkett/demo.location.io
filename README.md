

Location.IO Demo
================

No longer maintained
====================
October 2015. Sadly, I don't have time to maintain this project. If you wish to maintain it, please let me know.

Description
===========
A simple Location.IO demo web app using Node.js, SocketStream, AngularJS and Google Maps. 

The demo app is indented to demonstrate the functionality of [Location.IO](https://github.com/alexbirkett/location.io). Connected trackers are shown as pins on the map. The example app supports sending commands to trackers. It is real time, the map pins move as the trackers update their locations. If a tracker disconnects it disappears from the map.


Location.IO Demo does not currenly support
- User login (or any privacy at all)
- A database to store the location and trip history of trackers


Live Demo
===============
[http://demo.location.io](http://demo.location.io)

Point trackers to 176.58.107.144 port 1337


Install
=======

To install the most recent release from npm, run:

     npm install -g demo.location.io
    
Usage
=====
    
    demo-location-io [http port]
    
The server listens to for connections from trackers on port 1337.

More info
=====
More info about supported trackers and protocols can be found on the [Location.IO webstie](http://location.io)

License
=====
The MIT License (MIT)

Copyright (c) 2013 Alex Birkett <alex@birkett.co.uk>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

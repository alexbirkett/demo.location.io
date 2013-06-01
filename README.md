<p align="center">
  <img src="http://location.io/wp-content/themes/responsive-location/images/logo.jpg" alt="Location.IO Logo"/>
</p>

Location.IO Demo
================

A simple Location.IO demo web app using Node.js, SocketStream, angular.js and Google Maps. 

The Location.IO demo allows the location of connected devices to be seen on a map. If a device disconnects it disappears from the map. Messages can be sent to devices capable of receiving them.

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

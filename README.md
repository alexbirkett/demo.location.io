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

    npm install demo.location.io
    
Usage
=====

From inside demo.location.io directory
    
    node node app.js [http port]
    
The server listens to for connections from trackers on port 1337.
    

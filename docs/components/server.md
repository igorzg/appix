<a name="Server"></a>
## Server
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [Server](#Server)
  * [new Server()](#new_Server_new)
  * [.on()](#Server+on)
  * [.listen()](#Server+listen)
  * [.close()](#Server+close)
  * [.setTimeout()](#Server+setTimeout)

<a name="new_Server_new"></a>
### new Server()
Server class is responsible for publishing server by default that is http server.
This is an mock over http service so we can provide custom one.
If we want to use https, socket or similar we provide custom Server service.

<a name="Server+on"></a>
### server.on()
Server on event

**Kind**: instance method of <code>[Server](#Server)</code>  
**Since**: 1.0.0  
<a name="Server+listen"></a>
### server.listen()
listen server

**Kind**: instance method of <code>[Server](#Server)</code>  
**Since**: 1.0.0  
<a name="Server+close"></a>
### server.close()
Close server connection

**Kind**: instance method of <code>[Server](#Server)</code>  
**Since**: 1.0.0  
<a name="Server+setTimeout"></a>
### server.setTimeout()
http://nodejs.org/api/http.html#http_server_settimeout_msecs_callback

**Kind**: instance method of <code>[Server](#Server)</code>  
**Since**: 1.0.0  

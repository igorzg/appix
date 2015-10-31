<a name="Request"></a>
## Request
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [Request](#Request)
  * [new Request(bootstrap, request, url)](#new_Request_new)
  * [.getParsedUrl()](#Request+getParsedUrl) ⇒ <code>Object</code>
  * [.getMethod()](#Request+getMethod) ⇒ <code>String</code>
  * [.getPathname()](#Request+getPathname) ⇒ <code>String</code>
  * [.getParams()](#Request+getParams) ⇒ <code>Map</code>
  * [.getRequestHeaders()](#Request+getRequestHeaders) ⇒ <code>Object</code>
  * [.getRequestDomain()](#Request+getRequestDomain) ⇒ <code>String</code>
  * [.getRequestRemoteAddress()](#Request+getRequestRemoteAddress) ⇒ <code>String</code>
  * [.getRequestRemotePort()](#Request+getRequestRemotePort) ⇒ <code>Number</code>
  * [.getRequestLocalAddress()](#Request+getRequestLocalAddress) ⇒ <code>String</code>
  * [.getRequestLocalPort()](#Request+getRequestLocalPort) ⇒ <code>Number</code>
  * [.onEnd()](#Request+onEnd)
  * [.getRequestBody()](#Request+getRequestBody) ⇒ <code>Buffer</code>
  * [.forwardRoute(route, params)](#Request+forwardRoute)
  * [.forwardUrl(url)](#Request+forwardUrl)

<a name="new_Request_new"></a>
### new Request(bootstrap, request, url)
This class is responsible for processing request


| Param | Type | Description |
| --- | --- | --- |
| bootstrap | <code>Bootstrap</code> | instance |
| request | <code>Object</code> | config |
| url | <code>String</code> |  |

<a name="Request+getParsedUrl"></a>
### request.getParsedUrl() ⇒ <code>Object</code>
Return parsed url

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+getMethod"></a>
### request.getMethod() ⇒ <code>String</code>
Get request method

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+getPathname"></a>
### request.getPathname() ⇒ <code>String</code>
Return request pathname

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+getParams"></a>
### request.getParams() ⇒ <code>Map</code>
Return request url query

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+getRequestHeaders"></a>
### request.getRequestHeaders() ⇒ <code>Object</code>
Return request headers

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+getRequestDomain"></a>
### request.getRequestDomain() ⇒ <code>String</code>
Return request domain

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+getRequestRemoteAddress"></a>
### request.getRequestRemoteAddress() ⇒ <code>String</code>
Request remote ip address

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+getRequestRemotePort"></a>
### request.getRequestRemotePort() ⇒ <code>Number</code>
Request remote port

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+getRequestLocalAddress"></a>
### request.getRequestLocalAddress() ⇒ <code>String</code>
Request locals address

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+getRequestLocalPort"></a>
### request.getRequestLocalPort() ⇒ <code>Number</code>
Request local port

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+onEnd"></a>
### request.onEnd()
Add custom events on destroy event

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+getRequestBody"></a>
### request.getRequestBody() ⇒ <code>Buffer</code>
Return request body

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+forwardRoute"></a>
### request.forwardRoute(route, params)
Forward route

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| route | <code>String</code> | 
| params | <code>Object</code> | 

<a name="Request+forwardUrl"></a>
### request.forwardUrl(url)
Forward url

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 


<a name="Request"></a>

## Request
**Kind**: global class  
**Access:** protected  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [Request](#Request)
    * [new Request(bootstrap, request, url)](#new_Request_new)
    * [.getParsedUrl()](#Request+getParsedUrl) ⇒ <code>Object</code>
    * [.getMethod()](#Request+getMethod) ⇒ <code>String</code>
    * [.getPathname()](#Request+getPathname) ⇒ <code>String</code>
    * [.getParams()](#Request+getParams) ⇒ <code>Map</code>
    * [.getRequestHeader(name)](#Request+getRequestHeader)
    * [.getRequestHeaders()](#Request+getRequestHeaders) ⇒ <code>Object</code>
    * [.getRequestDomain()](#Request+getRequestDomain) ⇒ <code>String</code>
    * [.getRequestRemoteAddress()](#Request+getRequestRemoteAddress) ⇒ <code>String</code>
    * [.getRequestRemotePort()](#Request+getRequestRemotePort) ⇒ <code>Number</code>
    * [.getRequestLocalAddress()](#Request+getRequestLocalAddress) ⇒ <code>String</code>
    * [.getRequestLocalPort()](#Request+getRequestLocalPort) ⇒ <code>Number</code>
    * [.onEnd()](#Request+onEnd)
    * [.getRequestBody()](#Request+getRequestBody) ⇒ <code>Buffer</code>
    * [.hasResponseHeader(key)](#Request+hasResponseHeader) ⇒ <code>Boolean</code>
    * [.getRequestCookie(name)](#Request+getRequestCookie)
    * [.getRequestCookies()](#Request+getRequestCookies)
    * [.setResponseCookie(key, value, expires, path, domain, isHttpOnly)](#Request+setResponseCookie)
    * [.setResponseHeader(key, value)](#Request+setResponseHeader)
    * [.setResponseStatusCode(num)](#Request+setResponseStatusCode)
    * [.forwardRoute(route, params)](#Request+forwardRoute)
    * [.forwardUrl(url)](#Request+forwardUrl)
    * [.redirect(url, code)](#Request+redirect)

<a name="new_Request_new"></a>

### new Request(bootstrap, request, url)
This class is responsible for processing request.
Developer don't have access to request class itself, instead of it,
API is provided to developer in order to manipulate with request


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
<a name="Request+getRequestHeader"></a>

### request.getRequestHeader(name)
Get an request header by header name

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | header name |

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
<a name="Request+hasResponseHeader"></a>

### request.hasResponseHeader(key) ⇒ <code>Boolean</code>
Check if response header is present

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | header name |

<a name="Request+getRequestCookie"></a>

### request.getRequestCookie(name)
Return cookie value

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | cookie |

<a name="Request+getRequestCookies"></a>

### request.getRequestCookies()
Return all cookies

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
<a name="Request+setResponseCookie"></a>

### request.setResponseCookie(key, value, expires, path, domain, isHttpOnly)
Sets an cookie header

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 0.0.1  
**Author:** Igor Ivanovic  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | cookie name |
| value | <code>String</code> | cookie value |
| expires | <code>String</code> &#124; <code>Object</code> &#124; <code>Number</code> | expire date |
| path | <code>String</code> | cookie path |
| domain | <code>String</code> | cookie domain |
| isHttpOnly | <code>Boolean</code> | is http only |

<a name="Request+setResponseHeader"></a>

### request.setResponseHeader(key, value)
Sets an response header

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | header name |
| value | <code>String</code> &#124; <code>Object</code> | header value |

<a name="Request+setResponseStatusCode"></a>

### request.setResponseStatusCode(num)
Set status code which will be sent to client

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>Number</code> | status code number |

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

<a name="Request+redirect"></a>

### request.redirect(url, code)
Redirect to page

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | string url |
| code | <code>Number</code> | status code default is 302 temporary redirect! |


<a name="Controller"></a>
## Controller
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [Controller](#Controller)
  * [new Controller(api, types)](#new_Controller_new)
  * [.getMethod()](#Controller+getMethod) ⇒ <code>String</code>
  * [.getParams()](#Controller+getParams) ⇒ <code>Object</code>
  * [.getParsedUrl()](#Controller+getParsedUrl) ⇒ <code>Object</code>
  * [.getRequestBody()](#Controller+getRequestBody) ⇒ <code>Buffer</code>
  * [.getPathname()](#Controller+getPathname) ⇒ <code>String</code>
  * [.getRequestDomain()](#Controller+getRequestDomain) ⇒ <code>String</code>
  * [.getRequestHeader(name)](#Controller+getRequestHeader) ⇒ <code>String</code>
  * [.getRequestHeaders()](#Controller+getRequestHeaders) ⇒ <code>Object</code>
  * [.getRequestLocalAddress()](#Controller+getRequestLocalAddress) ⇒ <code>String</code>
  * [.getRequestLocalPort()](#Controller+getRequestLocalPort) ⇒ <code>Number</code>
  * [.getRequestRemoteAddress()](#Controller+getRequestRemoteAddress) ⇒ <code>String</code>
  * [.getRequestRemotePort()](#Controller+getRequestRemotePort) ⇒ <code>Number</code>
  * [.getRequestCookies()](#Controller+getRequestCookies)
  * [.getRequestCookie(name)](#Controller+getRequestCookie)
  * [.onEnd()](#Controller+onEnd)
  * [.forwardUrl(route, params)](#Controller+forwardUrl) ⇒ <code>Promise</code>
  * [.forwardUrl(url)](#Controller+forwardUrl) ⇒ <code>Promise</code>
  * [.getRequestRoute()](#Controller+getRequestRoute) ⇒ <code>String</code>
  * [.getRequestController()](#Controller+getRequestController) ⇒ <code>String</code>
  * [.getRequestAction()](#Controller+getRequestAction) ⇒ <code>String</code>
  * [.getRequestId()](#Controller+getRequestId) ⇒ <code>String</code>
  * [.getUserAgent()](#Controller+getUserAgent) ⇒ <code>String</code>
  * [.setResponseStatusCode(num)](#Controller+setResponseStatusCode)
  * [.setResponseCookie(key, value, expires, path, domain, isHttpOnly)](#Controller+setResponseCookie)
  * [.setResponseHeader(key, value)](#Controller+setResponseHeader)
  * [.hasResponseHeader(key)](#Controller+hasResponseHeader) ⇒ <code>Boolean</code>
  * [.addFilter(FilterToInitialize, priority, route)](#Controller+addFilter)
  * [.stopChain()](#Controller+stopChain)
  * [.redirect(url, code)](#Controller+redirect)
  * [.beforeEach()](#Controller+beforeEach)
  * [.afterEach()](#Controller+afterEach)

<a name="new_Controller_new"></a>
### new Controller(api, types)
Controller is constructed on each request.
All application controllers should be inherited from controller class


| Param | Type | Description |
| --- | --- | --- |
| api | <code>Object</code> | limited request api |
| types | <code>Object</code> |  |

**Example**  
```js
let di = require('appix');
 let Controller = di.load('@{appix}/controller');
 let Filter = di.load('@{appix}/filter');
 class F1 extends Filter {
   afterEach(data) {
      return di.async(function* gen() {
          return yield data + ' prio';
      });
   }
 }
 class MyAppController extends Controller {

   constructor(api) {
      super(api, {
         name: Type.STRING
      });
      this.name = 'We must define type if we want to have extended object with new members';
      this.addFilter(F1, 10);
   }

   actionIndex() {
     return 'WORKS';
   }
 }
```
<a name="Controller+getMethod"></a>
### controller.getMethod() ⇒ <code>String</code>
Return method

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getParams"></a>
### controller.getParams() ⇒ <code>Object</code>
Return params

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getParsedUrl"></a>
### controller.getParsedUrl() ⇒ <code>Object</code>
Return parsed url

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestBody"></a>
### controller.getRequestBody() ⇒ <code>Buffer</code>
Get request body, return data sent to server.

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getPathname"></a>
### controller.getPathname() ⇒ <code>String</code>
Get request pathname

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestDomain"></a>
### controller.getRequestDomain() ⇒ <code>String</code>
Get request domain

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestHeader"></a>
### controller.getRequestHeader(name) ⇒ <code>String</code>
Get request header, by header name

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | of header |

<a name="Controller+getRequestHeaders"></a>
### controller.getRequestHeaders() ⇒ <code>Object</code>
Get request headers, key value pairs

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestLocalAddress"></a>
### controller.getRequestLocalAddress() ⇒ <code>String</code>
Get request local address

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestLocalPort"></a>
### controller.getRequestLocalPort() ⇒ <code>Number</code>
Get request local port

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestRemoteAddress"></a>
### controller.getRequestRemoteAddress() ⇒ <code>String</code>
Get request remote address

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestRemotePort"></a>
### controller.getRequestRemotePort() ⇒ <code>Number</code>
Get request remote port

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestCookies"></a>
### controller.getRequestCookies()
Return all cookies

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestCookie"></a>
### controller.getRequestCookie(name)
Return cookie value

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | cookie |

<a name="Controller+onEnd"></a>
### controller.onEnd()
On end is an happening on destroy event

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+forwardUrl"></a>
### controller.forwardUrl(route, params) ⇒ <code>Promise</code>
forward url

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| route | <code>String</code> | 
| params | <code>Object</code> | 

<a name="Controller+forwardUrl"></a>
### controller.forwardUrl(url) ⇒ <code>Promise</code>
forward url

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 

<a name="Controller+getRequestRoute"></a>
### controller.getRequestRoute() ⇒ <code>String</code>
Get request route

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestController"></a>
### controller.getRequestController() ⇒ <code>String</code>
Get request controller

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestAction"></a>
### controller.getRequestAction() ⇒ <code>String</code>
Get request action

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getRequestId"></a>
### controller.getRequestId() ⇒ <code>String</code>
Returns request id

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+getUserAgent"></a>
### controller.getUserAgent() ⇒ <code>String</code>
Get user agent

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+setResponseStatusCode"></a>
### controller.setResponseStatusCode(num)
Set status code which will be sent to client

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>Number</code> | status code number |

<a name="Controller+setResponseCookie"></a>
### controller.setResponseCookie(key, value, expires, path, domain, isHttpOnly)
Sets an cookie header

**Kind**: instance method of <code>[Controller](#Controller)</code>  
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

<a name="Controller+setResponseHeader"></a>
### controller.setResponseHeader(key, value)
Sets an response header

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | header name |
| value | <code>String</code> &#124; <code>Object</code> | header value |

<a name="Controller+hasResponseHeader"></a>
### controller.hasResponseHeader(key) ⇒ <code>Boolean</code>
Check if response header is present

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | header name |

<a name="Controller+addFilter"></a>
### controller.addFilter(FilterToInitialize, priority, route)
Add filter

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| FilterToInitialize | <code>Filter</code> | class to instantiate |
| priority | <code>Number</code> |  |
| route | <code>String</code> |  |

**Example**  
```js
class MyAppController extends Controller {

   constructor(api) {
      super(api, {
         name: Type.STRING
      });
      this.name = 'We must define type if we want to have extended object with new members';
      this.addFilter(F1, 10);
      this.addFilter(F2, 10);
      this.addFilter(F3, 10, 'home/index'); // will be executed only on home controller action index
      this.addFilter(F3, 10, 'home/*'); // will be executed on all home controllers actions
   }

 }
```
<a name="Controller+stopChain"></a>
### controller.stopChain()
Stop chain of actions, use this when needed. You can use it as well in filters to

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
// route home/index
 class MyAppController extends Controller {

   beforeEach() {
     if (
         // expression
     ) {
         this.stopChain();
     }
   }
   beforeIndex() {
       // this will never be executed since chain is stopped
   }
   actionIndex() {
      // this will never be executed since chain is stopped
   }

 }
```
<a name="Controller+redirect"></a>
### controller.redirect(url, code)
Redirect to page

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | string url |
| code | <code>Number</code> | status code |

<a name="Controller+beforeEach"></a>
### controller.beforeEach()
before each request do some logic if needed

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
<a name="Controller+afterEach"></a>
### controller.afterEach()
after each request do some logic if needed

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

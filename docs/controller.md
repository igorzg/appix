<a name="Controller"></a>
## Controller
**Kind**: global class  
**Since**: 1.0.0  
**License**: Mit Licence 2015  

* [Controller](#Controller)
  * [new Controller(api, types)](#new_Controller_new)
  * [.getComponent(key)](#Controller+getComponent) ⇒ <code>String</code>
  * [.getMethod()](#Controller+getMethod) ⇒ <code>String</code>
  * [.getParams()](#Controller+getParams) ⇒ <code>Object</code>
  * [.getParsedUrl()](#Controller+getParsedUrl) ⇒ <code>Object</code>
  * [.getRequestBody()](#Controller+getRequestBody) ⇒ <code>Buffer</code> &#124; <code>Object</code>
  * [.getPathname()](#Controller+getPathname) ⇒ <code>String</code>
  * [.getRequestDomain()](#Controller+getRequestDomain) ⇒ <code>String</code>
  * [.getRequestHeader(name)](#Controller+getRequestHeader) ⇒ <code>String</code>
  * [.getRequestHeaders()](#Controller+getRequestHeaders) ⇒ <code>Object</code>
  * [.getRequestLocalAddress()](#Controller+getRequestLocalAddress) ⇒ <code>String</code>
  * [.getRequestLocalPort()](#Controller+getRequestLocalPort) ⇒ <code>Number</code>
  * [.getRequestRemoteAddress()](#Controller+getRequestRemoteAddress) ⇒ <code>String</code>
  * [.getRequestRemotePort()](#Controller+getRequestRemotePort) ⇒ <code>Number</code>
  * [.getRequestCookies()](#Controller+getRequestCookies) ⇒ <code>Object</code>
  * [.getRequestCookie(name)](#Controller+getRequestCookie) ⇒ <code>String</code>
  * [.onEnd(callback)](#Controller+onEnd)
  * [.forwardRoute(route, params)](#Controller+forwardRoute) ⇒ <code>Promise</code>
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
<a name="Controller+getComponent"></a>
### controller.getComponent(key) ⇒ <code>String</code>
Return component instance which is singleton

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | name of component |

**Example**  
```js
class MyAppController extends Controller {

   beforeIndex() {
     return [
         this.getComponent('appix/logger'),
         Promise.resolve('some async operation'),
         Promise.resolve('some other async operations')
     ];
   }

   actionIndex(logger, p1DataResolved, p2DataResolved) {
     logger.log('Logger works', {
         p1DataResolved: p1DataResolved,
         p2DataResolved: p2DataResolved
     })
     return 'WORKS '+ p1DataResolved + p2DataResolved; // result => WORKS some async operation some other async operations
   }
 }
```
<a name="Controller+getMethod"></a>
### controller.getMethod() ⇒ <code>String</code>
Return method

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let method = this.getMethod();
   }
}
```
<a name="Controller+getParams"></a>
### controller.getParams() ⇒ <code>Object</code>
Return params

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let params = this.getParams();
   }
}
```
<a name="Controller+getParsedUrl"></a>
### controller.getParsedUrl() ⇒ <code>Object</code>
Return parsed url

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let url = this.getParsedUrl();
       let pathname = url.pathname;
       let protocol = url.protocol;
   }
}
```
<a name="Controller+getRequestBody"></a>
### controller.getRequestBody() ⇒ <code>Buffer</code> &#124; <code>Object</code>
Get request body, return data sent to server.

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let body = this.getRequestBody();
   }
}
```
<a name="Controller+getPathname"></a>
### controller.getPathname() ⇒ <code>String</code>
Get request pathname

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let pathname = this.getPathname();
   }
}
```
<a name="Controller+getRequestDomain"></a>
### controller.getRequestDomain() ⇒ <code>String</code>
Get request domain

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let domain = this.getRequestDomain();
   }
}
```
<a name="Controller+getRequestHeader"></a>
### controller.getRequestHeader(name) ⇒ <code>String</code>
Get request header, by header name

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | of header |

**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let cookies = this.getRequestHeader('Cookies');
   }
}
```
<a name="Controller+getRequestHeaders"></a>
### controller.getRequestHeaders() ⇒ <code>Object</code>
Get request headers, key value pairs

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let headers = this.getRequestHeaders();
   }
}
```
<a name="Controller+getRequestLocalAddress"></a>
### controller.getRequestLocalAddress() ⇒ <code>String</code>
Get request local address

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let local_address = this.getRequestLocalAddress();
   }
}
```
<a name="Controller+getRequestLocalPort"></a>
### controller.getRequestLocalPort() ⇒ <code>Number</code>
Get request local port

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let local_port = this.getRequestLocalPort();
   }
}
```
<a name="Controller+getRequestRemoteAddress"></a>
### controller.getRequestRemoteAddress() ⇒ <code>String</code>
Get request remote address

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let remote_port = this.getRequestRemotePort();
   }
}
```
<a name="Controller+getRequestRemotePort"></a>
### controller.getRequestRemotePort() ⇒ <code>Number</code>
Get request remote port

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let remote_port = this.getRequestRemotePort();
   }
}
```
<a name="Controller+getRequestCookies"></a>
### controller.getRequestCookies() ⇒ <code>Object</code>
get all cookies

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let cookies = this.getRequestCookies();
   }
}
```
<a name="Controller+getRequestCookie"></a>
### controller.getRequestCookie(name) ⇒ <code>String</code>
get cookie value

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | cookie |

**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let user = this.getRequestCookie('user');
   }
}
```
<a name="Controller+onEnd"></a>
### controller.onEnd(callback)
On end is an happening on destroy event

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | destroy callback |

**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let mySharedService = this.getComponent('shared-service');
       this.onEnd(() => {
         mySharedService.delete(this.getRequestId());
       });
   }
}
```
<a name="Controller+forwardRoute"></a>
### controller.forwardRoute(route, params) ⇒ <code>Promise</code>
forward url

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| route | <code>String</code> | 
| params | <code>Object</code> | 

**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       if (/* expression *\/) {
         return this.forwardRoute('search/index', {query: 'term'});
       }
   }
}
```
<a name="Controller+forwardUrl"></a>
### controller.forwardUrl(url) ⇒ <code>Promise</code>
forward url

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 

**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       if (/* expression *\/) {
         return this.forwardUrl('/search?query=term');
       }
   }
}
```
<a name="Controller+getRequestRoute"></a>
### controller.getRequestRoute() ⇒ <code>String</code>
Get request route

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let route = this.getRequestRoute();
   }
}
```
<a name="Controller+getRequestController"></a>
### controller.getRequestController() ⇒ <code>String</code>
Get request controller

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let controller = this.getRequestController();
   }
}
```
<a name="Controller+getRequestAction"></a>
### controller.getRequestAction() ⇒ <code>String</code>
Get request action

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let action = this.getRequestAction();
   }
}
```
<a name="Controller+getRequestId"></a>
### controller.getRequestId() ⇒ <code>String</code>
Returns uuid request id

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   actionIndex() {
       let uuid = this.getRequestId();
   }
}
```
<a name="Controller+getUserAgent"></a>
### controller.getUserAgent() ⇒ <code>String</code>
Get user agent

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class Platform extends Controller {
   beforeEach() {
       let ua = this.getUserAgent();
       if (/android/i.test(ua)) {
         return this.forwardRoute('platform/mobile', this.getParams());
       }
       return this.forwardRoute('platform/desktop', this.getParams());
   }
}
class Desktop extends Platform {
   actionIndex() {

   }
}
class Mobile extends Platform {
   actionIndex() {

   }
}
```
<a name="Controller+setResponseStatusCode"></a>
### controller.setResponseStatusCode(num)
Set status code which will be sent to client

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>Number</code> | status code number |

**Example**  
```js
class Error extends Controller {
   actionHandler() {
       if (/* expression *\/) {
         this.setResponseStatusCode(504)
       }
   }
}
```
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

**Example**  
```js
class User extends Controller {
   actionLogin() {
       this.setResponseCookie('user', 'id-1', 30);
       this.setResponseCookie('user1', 'id-2', 50, '/');
       this.setResponseCookie('user2', 'id-3', 50, '/', '.igorivanovic.info');
       this.setResponseCookie('user2', 'id-3', 50, '/', '.igorivanovic.info', true);
   }
}
```
<a name="Controller+setResponseHeader"></a>
### controller.setResponseHeader(key, value)
Sets an response header

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | header name |
| value | <code>String</code> &#124; <code>Object</code> | header value |

**Example**  
```js
class JSON extends Controller {
   afterEach(html) {
       if (!this.hasResponseHeader('Content-Type')) {
          this.setResponseHeader('Content-Type', 'application/json');
       }
   }
}
```
<a name="Controller+hasResponseHeader"></a>
### controller.hasResponseHeader(key) ⇒ <code>Boolean</code>
Check if response header is present

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | header name |

**Example**  
```js
class JSON extends Controller {
   afterEach(html) {
       if (!this.hasResponseHeader('Content-Type')) {
          this.setResponseHeader('Content-Type', 'application/json');
       }
   }
}
```
<a name="Controller+addFilter"></a>
### controller.addFilter(FilterToInitialize, priority, route)
Add filter, all filters must be inherited from appix/filter

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
      this.addFilter(F4, 10, 'home/*'); // will be executed on all home controllers actions
      this.addFilter(F5, 10, '*'); // apply on all controllers actions
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

**Example**  
```js
class User extends Controller {
   beforeEach() {
       if (!this.isLoggedIn) {
          return this.redirect(this.createUrl('user/login'))
       }
   }
   actionIndex() {

   }
}
```
<a name="Controller+beforeEach"></a>
### controller.beforeEach()
before each request do some logic if needed

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class User extends Controller {
   beforeEach() {
       if (!this.isLoggedIn) {
          return this.redirect(this.createUrl('user/login'))
       }
   }
}
```
<a name="Controller+afterEach"></a>
### controller.afterEach()
after each request do some logic if needed

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Example**  
```js
class User extends Controller {
   afterEach(html) {
       if (this.getMethod() === 'GET') {
         let cache = this.getComponent('mycache');
         cache.set(this.getPathname(), html);
       }
       return html;
   }
}
```

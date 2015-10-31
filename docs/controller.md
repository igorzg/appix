<a name="Controller"></a>
## Controller
**Kind**: global class  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
**License**: Mit Licence 2015  

* [Controller](#Controller)
  * [new Controller()](#new_Controller_new)
  * [.getMethod()](#Controller+getMethod)
  * [.getParams()](#Controller+getParams)
  * [.getParsedUrl()](#Controller+getParsedUrl)
  * [.getRequestBody()](#Controller+getRequestBody)
  * [.getPathname()](#Controller+getPathname)
  * [.getRequestDomain()](#Controller+getRequestDomain)
  * [.getRequestHeaders()](#Controller+getRequestHeaders)
  * [.getRequestLocalAddress()](#Controller+getRequestLocalAddress)
  * [.getRequestLocalPort()](#Controller+getRequestLocalPort)
  * [.getRequestRemoteAddress()](#Controller+getRequestRemoteAddress)
  * [.getRequestRemotePort()](#Controller+getRequestRemotePort)
  * [.onEnd()](#Controller+onEnd)
  * [.forwardUrl(route, params)](#Controller+forwardUrl)
  * [.forwardUrl(url)](#Controller+forwardUrl)
  * [.getRequestRoute()](#Controller+getRequestRoute)
  * [.getRequestController()](#Controller+getRequestController)
  * [.getRequestAction()](#Controller+getRequestAction)
  * [.getRequestId()](#Controller+getRequestId)
  * [.getFiltersToApply()](#Controller+getFiltersToApply)
  * [.applyBeforeEachFilters()](#Controller+applyBeforeEachFilters)
  * [.applyBeforeEachFilters()](#Controller+applyBeforeEachFilters)
  * [.addFilter()](#Controller+addFilter)
  * [.isChaining()](#Controller+isChaining)
  * [.stopChain()](#Controller+stopChain)
  * [.beforeEach()](#Controller+beforeEach)
  * [.afterEach()](#Controller+afterEach)

<a name="new_Controller_new"></a>
### new Controller()
This class is responsible for processing application actions

<a name="Controller+getMethod"></a>
### controller.getMethod()
Return method

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getParams"></a>
### controller.getParams()
Return params

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getParsedUrl"></a>
### controller.getParsedUrl()
Return parsed url

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getRequestBody"></a>
### controller.getRequestBody()
Get request body, return data sent to server.

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getPathname"></a>
### controller.getPathname()
Get request pathname

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getRequestDomain"></a>
### controller.getRequestDomain()
Get request domain

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getRequestHeaders"></a>
### controller.getRequestHeaders()
Get request headers

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getRequestLocalAddress"></a>
### controller.getRequestLocalAddress()
Get request local address

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getRequestLocalPort"></a>
### controller.getRequestLocalPort()
Get request local port

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getRequestRemoteAddress"></a>
### controller.getRequestRemoteAddress()
Get request remote address

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getRequestRemotePort"></a>
### controller.getRequestRemotePort()
Get request remote port

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+onEnd"></a>
### controller.onEnd()
On end is an happening on destroy event

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+forwardUrl"></a>
### controller.forwardUrl(route, params)
forward url

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| route | <code>String</code> | 
| params | <code>Object</code> | 

<a name="Controller+forwardUrl"></a>
### controller.forwardUrl(url)
forward url

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 

<a name="Controller+getRequestRoute"></a>
### controller.getRequestRoute()
Get request route

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getRequestController"></a>
### controller.getRequestController()
Get request controller

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getRequestAction"></a>
### controller.getRequestAction()
Get request action

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getRequestId"></a>
### controller.getRequestId()
Returns request id

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+getFiltersToApply"></a>
### controller.getFiltersToApply()
Get filters which should be applyd on current request

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+applyBeforeEachFilters"></a>
### controller.applyBeforeEachFilters()
ApplyBeforeEachFilters

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+applyBeforeEachFilters"></a>
### controller.applyBeforeEachFilters()
apply filters in order

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+addFilter"></a>
### controller.addFilter()
Add filter

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+isChaining"></a>
### controller.isChaining()
Check if chain is enabled

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+stopChain"></a>
### controller.stopChain()
Stop chain of actions

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+beforeEach"></a>
### controller.beforeEach()
before each request do some logic if needed

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Controller+afterEach"></a>
### controller.afterEach()
after each request do some logic if needed

**Kind**: instance method of <code>[Controller](#Controller)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

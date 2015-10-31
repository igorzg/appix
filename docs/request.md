<a name="Request"></a>
## Request
**Kind**: global class  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
**License**: Mit Licence 2015  

* [Request](#Request)
  * [new Request()](#new_Request_new)
  * [.toString(noClean)](#Request+toString)
  * [.getParsedUrl()](#Request+getParsedUrl)
  * [.getMethod()](#Request+getMethod)
  * [.getPathname()](#Request+getPathname)
  * [.getParams()](#Request+getParams)
  * [.getRequestHeaders()](#Request+getRequestHeaders)
  * [.getRequestDomain()](#Request+getRequestDomain)
  * [.getRequestRemoteAddress()](#Request+getRequestRemoteAddress)
  * [.getRequestRemotePort()](#Request+getRequestRemotePort)
  * [.getRequestLocalAddress()](#Request+getRequestLocalAddress)
  * [.getRequestLocalPort()](#Request+getRequestLocalPort)
  * [.onEnd()](#Request+onEnd)
  * [.getRequestBody()](#Request+getRequestBody)
  * [.render()](#Request+render)
  * [.forward()](#Request+forward)
  * [.forwardRoute(route, params)](#Request+forwardRoute)
  * [.forwardUrl(url)](#Request+forwardUrl)
  * [.handleModule(moduleName, controllerName, actionName)](#Request+handleModule)
  * [.handleController(controllerName, actionName)](#Request+handleController)
  * [.process()](#Request+process)

<a name="new_Request_new"></a>
### new Request()
This class is responsible for processing request

<a name="Request+toString"></a>
### request.toString(noClean)
To string representation

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| noClean | <code>Boolean</code> | 

<a name="Request+getParsedUrl"></a>
### request.getParsedUrl()
Return parsed url

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+getMethod"></a>
### request.getMethod()
Return method

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+getPathname"></a>
### request.getPathname()
Return request pathname

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+getParams"></a>
### request.getParams()
Return request url query

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+getRequestHeaders"></a>
### request.getRequestHeaders()
Return request headers

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+getRequestDomain"></a>
### request.getRequestDomain()
Return request domain

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+getRequestRemoteAddress"></a>
### request.getRequestRemoteAddress()
Request remote ip address

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+getRequestRemotePort"></a>
### request.getRequestRemotePort()
Request remote port

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+getRequestLocalAddress"></a>
### request.getRequestLocalAddress()
Request locals address

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+getRequestLocalPort"></a>
### request.getRequestLocalPort()
Request local port

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+onEnd"></a>
### request.onEnd()
On end process destroy event

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+getRequestBody"></a>
### request.getRequestBody()
Return request body

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+render"></a>
### request.render()
Render data

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+forward"></a>
### request.forward()
Forward to new request

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  
<a name="Request+forwardRoute"></a>
### request.forwardRoute(route, params)
Forward route

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| route | <code>String</code> | 
| params | <code>Object</code> | 

<a name="Request+forwardUrl"></a>
### request.forwardUrl(url)
Forward url

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 

<a name="Request+handleModule"></a>
### request.handleModule(moduleName, controllerName, actionName)
Handle module

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| moduleName | <code>String</code> | 
| controllerName | <code>String</code> | 
| actionName | <code>String</code> | 

<a name="Request+handleController"></a>
### request.handleController(controllerName, actionName)
Handle controller

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

| Param | Type |
| --- | --- |
| controllerName | <code>String</code> | 
| actionName | <code>String</code> | 

<a name="Request+process"></a>
### request.process()
Process request

**Kind**: instance method of <code>[Request](#Request)</code>  
**Since**: 1.0.0  
**Author:** Igor Ivanovic  

/**
 * senna - TODO: Write description
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v0.0.0
 * @link http://sennajs.com
 * @license BSD
 */
"use strict";!function(n,e){n.senna=n.senna||{},senna.append=function(n,e){return senna.isString(e)&&(e=senna.buildFragment(e)),n.appendChild(senna.parseScripts(e))},senna.bind=function(n,e){if(!n)throw new Error;if(Function.prototype.bind){var t=n.call.apply(n.bind,arguments);return function(){return t.apply(null,arguments)}}if(arguments.length>2){var r=Array.prototype.slice.call(arguments,2);return function(){var t=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(t,r),n.apply(e,t)}}return function(){return n.apply(e,arguments)}},senna.buildFragment=function(n){var e=document.createElement("div");e.innerHTML="<br>"+n,e.removeChild(e.firstChild);for(var t=document.createDocumentFragment();e.firstChild;)t.appendChild(e.firstChild);return t},senna.debounce=function(n,e,t){var r;return function(){t||(t=this);var o=arguments;clearTimeout(r),r=setTimeout(function(){n.apply(t,o)},e)}},senna.globalEval=function(e){if(e&&e.trim()){var t=n.execScript;t||(t=function(e){n.eval.call(n,e)}),t(e)}},senna.inherits=function(n,e){function t(){}t.prototype=e.prototype,n.superClass_=e.prototype,n.prototype=new t,n.prototype.constructor=n,n.base=function(n,t){var r=Array.prototype.slice.call(arguments,2);return e.prototype[t].apply(n,r)}},senna.isDef=function(n){return n!==e},senna.isValue=function(n){return senna.isDef(n)&&null!==n},senna.isElement=function(n){return"object"==typeof n&&1===n.nodeType},senna.isFunction=function(n){return"function"==typeof n},senna.isObject=function(n){var e=typeof n;return"object"===e&&null!==n||"function"===e},senna.isString=function(n){return"string"==typeof n},senna.match=function(n,e){if(!n||1!==n.nodeType)return!1;var t=Element.prototype,r=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector;if(r)return r.call(n,e);for(var o=document.querySelectorAll(e,n.parentNode),a=0;a<o.length;++a)if(o[a]===n)return!0;return!1},senna.parseScripts=function(n){for(var e=function(n){senna.globalEval(n.responseText||n.text||n.textContent||n.innerHTML||"")},t=Array.prototype.slice.call(n.querySelectorAll("script"));t.length;){var r=t.shift();if(r.setAttribute("type","text/parsed"),r.src){var o={"Content-Type":"text/javascript"};senna.request(r.src,"GET",o,null,!0).then(e)}else senna.async.nextTick(senna.bind(e,null,r))}return n},senna.remove=function(n){n.parentNode&&n.parentNode.removeChild(n)},senna.request=function(n,e,t,r,o){var a=new XMLHttpRequest,i=new senna.Promise(function(n,e){a.onload=function(){return 200===a.status?void n(a):void a.onerror()},a.onerror=function(){var n=new Error("Request error");n.xhr=a,e(n)}}).thenCatch(function(n){throw a.abort(),n}).thenAlways(function(){clearTimeout(u)});if(a.open(e,n,!o),t)for(var s in t)a.setRequestHeader(s,t[s]);if(a.send(null),senna.isDef(r))var u=setTimeout(function(){i.cancel("Request timeout")},r);return i},senna.safari=navigator.userAgent.indexOf("Safari")>-1,senna.chrome=navigator.userAgent.indexOf("Chrome")>-1}(window);
"use strict";!function(){senna.EventEmitter=function(){},senna.EventEmitter.prototype.events_=null,senna.EventEmitter.prototype.addListener=function(t,e){if("function"!=typeof e)throw new TypeError("Listener must be a function");return this.events_||(this.events_={}),this.emit("newListener",t,e),this.events_[t]||(this.events_[t]=[]),this.events_[t].push(e),this},senna.EventEmitter.prototype.destroy=function(){},senna.EventEmitter.prototype.listeners=function(t){return this.events_&&this.events_[t]},senna.EventEmitter.prototype.emit=function(t){var e=this.listeners(t);if(e){for(var n=Array.prototype.slice.call(arguments,1),r=0;r<e.length;r++)e[r]&&e[r].apply(this,n);return!0}return!1},senna.EventEmitter.prototype.on=senna.EventEmitter.prototype.addListener,senna.EventEmitter.prototype.once=function(t,e){var n=this;n.on(t,function r(){n.removeListener(t,r),e.apply(this,arguments)})},senna.EventEmitter.prototype.removeAllListeners=function(t){return this.events_?(t?delete this.events_[t]:delete this.events_,this):this},senna.EventEmitter.prototype.removeListener=function(t,e){if("function"!=typeof e)throw new TypeError("Listener must be a function");if(!this.events_)return this;var n=this.listeners(t);if(Array.isArray(n)){var r=n.indexOf(e);if(0>r)return this;n.splice(r,1)}return this},senna.EventEmitter.prototype.setMaxListeners=function(){throw new Error("Not implemented")}}();
"use strict";!function(){senna.Cacheable=function(){},senna.Cacheable.prototype.cache=null,senna.Cacheable.prototype.cacheable=!1,senna.Cacheable.prototype.addCache=function(e){return this.cacheable?this.cache=e:void 0,this},senna.Cacheable.prototype.clearCache=function(){return this.cache=null,this},senna.Cacheable.prototype.destroy=function(){this.clearCache()},senna.Cacheable.prototype.getCache=function(){return this.cache},senna.Cacheable.prototype.isCacheable=function(){return this.cacheable},senna.Cacheable.prototype.setCacheable=function(e){e||this.clearCache(),this.cacheable=e}}();
"use strict";!function(e){senna.App=function(){senna.App.base(this,"constructor"),this.routes=[],this.surfaces={},this.screens={},this.docClickEventHandler_=senna.bind(this.onDocClick_,this),this.popstateEventHandler_=senna.bind(this.onPopstate_,this),this.scrollEventHandler_=senna.debounce(this.onScroll_,50,this),this.on("startNavigate",this.defStartNavigateFn_),document.addEventListener("click",this.docClickEventHandler_,!1),e.addEventListener("popstate",this.popstateEventHandler_,!1),document.addEventListener("scroll",this.scrollEventHandler_,!1),this.skipLoadPopstate=senna.safari&&!senna.chrome&&("interactive"===document.readyState||"loading"===document.readyState)},senna.inherits(senna.App,senna.EventEmitter),senna.App.prototype.activeScreen=null,senna.App.prototype.activePath=null,senna.App.prototype.basePath="",senna.App.prototype.defaultTitle="",senna.App.prototype.linkSelector="a",senna.App.prototype.lockPageXOffset=0,senna.App.prototype.lockPageYOffset=0,senna.App.prototype.pageXOffset=0,senna.App.prototype.pageYOffset=0,senna.App.prototype.pendingNavigate=null,senna.App.prototype.routes=null,senna.App.prototype.screens=null,senna.App.prototype.scrollHandle=null,senna.App.prototype.skipLoadPopstate=!1,senna.App.prototype.surfaces=null,senna.App.prototype.addRoutes=function(e){Array.isArray(e)||(e=[e]);for(var t=0;t<e.length;t++){var n=e[t];n instanceof senna.Route||(n=new senna.Route(n.path,n.screen)),this.routes.push(n)}return this},senna.App.prototype.addSurfaces=function(e){Array.isArray(e)||(e=[e]);for(var t=0;t<e.length;t++){var n=e[t];senna.isString(n)&&(n=new senna.Surface(n)),this.surfaces[n.getId()]=n}return this},senna.App.prototype.defStartNavigateFn_=function(e){var t=this,n={path:e.path};this.pendingNavigate=this.doNavigate_(e.path,e.replaceHistory).thenCatch(function(e){throw n.error=e,t.stopPending_(),e}).thenAlways(function(){t.emit("endNavigate",n)})},senna.App.prototype.destroy=function(){senna.App.base(this,"destroy");for(var t in this.surfaces)this.surfaces.hasOwnProperty(t)&&(this.surfaces[t].remove(this.activeScreen),this.surfaces[t].show());return e.removeEventListener("popstate",this.popstateEventHandler_,!1),document.removeEventListener("click",this.docClickEventHandler_,!1),document.removeEventListener("scroll",this.scrollEventHandler_,!1),this},senna.App.prototype.dispatch=function(){return this.navigate(e.location.pathname+e.location.search+e.location.hash,!0)},senna.App.prototype.doNavigate_=function(e,t){var n=this,a=n.activeScreen;if(this.activeScreen&&this.activeScreen.beforeDeactivate())return this.pendingNavigate=senna.Promise.reject(new senna.Promise.CancellationError("Cancelled by active screen")),this.pendingNavigate;var s=this.matchesPath(e);if(!s)return this.pendingNavigate=senna.Promise.reject(new senna.Promise.CancellationError("No screen for "+e)),this.pendingNavigate;void 0,e===this.activePath&&(t=!0);var i=this.getScreenInstance_(e,s);return this.pendingNavigate=senna.Promise.resolve().then(function(){return i.load(e)}).then(function(e){var t=i.getId();for(var s in n.surfaces)if(n.surfaces.hasOwnProperty(s)){var o=n.surfaces[s];o.addContent(t,i.getSurfaceContent(s,e))}return a&&a.deactivate(),i.flip(n.surfaces)}).then(function(){n.finalizeNavigate_(e,i,t)}).thenCatch(function(t){throw n.handleNavigateError_(e,i,t),t}),this.pendingNavigate},senna.App.prototype.finalizeNavigate_=function(e,t,n){var a=this.activeScreen,s=t.getTitle()||this.getDefaultTitle();this.updateHistory_(s,e,n),this.syncScrollPosition_(n),document.title=s,t.activate(),a&&!a.isCacheable()&&this.removeScreen_(this.activePath,a),this.activePath=e,this.activeScreen=t,this.screens[e]=t,this.pendingNavigate=null,void 0},senna.App.prototype.getBasePath=function(){return this.basePath},senna.App.prototype.getDefaultTitle=function(){return this.defaultTitle},senna.App.prototype.getLinkSelector=function(){return this.linkSelector},senna.App.prototype.getScreenInstance_=function(e,t){var n,a;return e===this.activePath&&(void 0,a=this.screens[e],delete this.screens[e]),n=this.screens[e],n||(void 0,n=new(t.getScreen()),a&&n.addCache(a.getCache())),n},senna.App.prototype.handleNavigateError_=function(e,t,n){void 0,this.removeScreen_(e,t),this.pendingNavigate=null},senna.App.prototype.isLinkSameOrigin_=function(t){return t===e.location.hostname},senna.App.prototype.isSameBasePath_=function(e){return 0===e.indexOf(this.basePath)},senna.App.prototype.lockScroll_=function(){var t=this,n=t.lockPageXOffset,a=t.lockPageYOffset,s=!1,i=function(){s||(t.pageXOffset=e.pageXOffset,t.pageYOffset=e.pageYOffset,e.scrollTo(n,a),s=!0)};senna.async.nextTick(i),document.addEventListener("scroll",function o(){document.removeEventListener("scroll",o,!1),i()},!1)},senna.App.prototype.matchesPath=function(t){var n,a=this.basePath;if(n=t.lastIndexOf("#"),n>-1&&(t=t.substr(0,n),t===e.location.pathname+e.location.search))return null;t=t.substr(a.length);for(var s=0;s<this.routes.length;s++){var i=this.routes[s];if(i.matchesPath(t))return i}return null},senna.App.prototype.navigate=function(e,t){return this.stopPending_(),this.emit("startNavigate",{path:e,replaceHistory:!!t}),this.pendingNavigate},senna.App.prototype.onDocClick_=function(e){for(var t=e.target;t&&"A"!==t.tagName;)t=t.parentNode;if(t){if(!senna.match(t,this.linkSelector))return void void 0;var n=t.hostname,a=t.pathname+t.search+t.hash,s=!1;if(!this.isLinkSameOrigin_(n))return void void 0;if(!this.isSameBasePath_(a))return void void 0;if(!this.matchesPath(a))return void void 0;this.navigate(a).thenCatch(function(){s=!0}),s||e.preventDefault()}},senna.App.prototype.onPopstate_=function(t){var n=t.state;if(null===n){if(this.skipLoadPopstate)return;if(!e.location.hash)return void e.location.reload()}n&&n.surface&&(void 0,this.lockScroll_(),this.navigate(n.path,!0)),this.skipLoadPopstate=!1},senna.App.prototype.onScroll_=function(){this.lockPageXOffset=e.pageXOffset,this.lockPageYOffset=e.pageYOffset},senna.App.prototype.preventNavigateFn_=function(){this.pendingNavigate=senna.Promise.reject(new senna.Promise.CancellationError("Navigation has been prevented"))},senna.App.prototype.removeScreen_=function(e,t){var n=t.getId();for(var a in this.surfaces)this.surfaces.hasOwnProperty(a)&&this.surfaces[a].remove(n);t.destroy(),delete this.screens[e]},senna.App.prototype.setBasePath=function(e){this.basePath=e},senna.App.prototype.setDefaultTitle=function(e){this.defaultTitle=e},senna.App.prototype.setLinkSelector=function(e){this.linkSelector=e},senna.App.prototype.stopPending_=function(){this.pendingNavigate&&(this.pendingNavigate.cancel("Cancel pending navigation"),this.pendingNavigate=null)},senna.App.prototype.updateHistory_=function(t,n,a){var s={path:n,surface:!0};a?e.history.replaceState(s,t,n):e.history.pushState(s,t,n)},senna.App.prototype.syncScrollPosition_=function(t){e.scrollTo(t?this.pageXOffset:0,t?this.pageYOffset:0)}}(window);
"use strict";!function(){senna.Route=function(t,e){this.setPath(t),this.setScreen(e)},senna.Route.prototype.path=null,senna.Route.prototype.screen=null,senna.Route.prototype.getScreen=function(){return this.screen},senna.Route.prototype.getPath=function(){return this.path},senna.Route.prototype.matchesPath=function(t){var e=this.path;return senna.isString(e)?t===e:senna.isFunction(e)?e(t):e instanceof RegExp?t.search(e)>-1:null},senna.Route.prototype.setPath=function(t){this.path=t},senna.Route.prototype.setScreen=function(t){this.screen=t}}();
"use strict";!function(){senna.Surface=function(t){if(!t)throw new Error("Surface element id not specified.");this.setId(t)},senna.Surface.DEFAULT="default",senna.Surface.TRANSITION=function(t,e){return t&&(t.style.display="none"),e&&(e.style.display="block"),null},senna.Surface.prototype.activeChild=null,senna.Surface.prototype.defaultChild=null,senna.Surface.prototype.el=null,senna.Surface.prototype.id=null,senna.Surface.prototype.transitionFn=senna.Surface.TRANSITION,senna.Surface.prototype.addContent=function(t,e){if(!e)return this.getChild(t);void 0;var n=this.getEl(),i=this.createChild(t);return senna.append(i,e),this.transition(i,null),n&&senna.append(n,i),i},senna.Surface.prototype.createChild=function(t){var e=document.createElement("div");return e.setAttribute("id",this.makeId_(t)),e},senna.Surface.prototype.getEl=function(t){return this.el?this.el:(this.el=document.getElementById(t||this.id),this.el)},senna.Surface.prototype.getId=function(){return this.id},senna.Surface.prototype.getChild=function(t){return document.getElementById(this.makeId_(t))},senna.Surface.prototype.getTransitionFn=function(){return this.transitionFn},senna.Surface.prototype.makeId_=function(t){return this.id+"-"+t},senna.Surface.prototype.setId=function(t){this.id=t},senna.Surface.prototype.setTransitionFn=function(t){this.transitionFn=t},senna.Surface.prototype.show=function(t){this.defaultChild||(this.defaultChild=this.addContent(senna.Surface.DEFAULT)),this.activeChild||(this.activeChild=this.defaultChild);var e=this.activeChild,n=this.getChild(t);n||(n=this.defaultChild),e&&e!==n&&senna.remove(e);var i=this.getEl();i&&n&&!n.parentNode&&senna.append(i,n);var r=this.transition(e,n);return this.activeChild=n,r},senna.Surface.prototype.remove=function(t){var e=this.getChild(t);e&&senna.remove(e)},senna.Surface.prototype.toString=function(){return this.id},senna.Surface.prototype.transition=function(t,e){return senna.Promise.resolve(this.transitionFn.call(this,t,e))}}();
"use strict";!function(){senna.Screen=function(){senna.Screen.base(this,"constructor"),this.setId(senna.Screen.uniqueIdCounter++)},senna.inherits(senna.Screen,senna.Cacheable),senna.Screen.uniqueIdCounter=+new Date,senna.Screen.prototype.id=null,senna.Screen.prototype.title=null,senna.Screen.prototype.activate=function(){void 0},senna.Screen.prototype.beforeDeactivate=function(){void 0},senna.Screen.prototype.flip=function(e){void 0;var n=[];for(var t in e)e.hasOwnProperty(t)&&n.push(e[t].show(this.id));return senna.Promise.all(n)},senna.Screen.prototype.deactivate=function(){void 0},senna.Screen.prototype.destroy=function(){senna.Screen.base(this,"destroy"),void 0},senna.Screen.prototype.getId=function(){return this.id},senna.Screen.prototype.getSurfaceContent=function(){void 0},senna.Screen.prototype.getTitle=function(){return this.title},senna.Screen.prototype.load=function(){void 0},senna.Screen.prototype.setId=function(e){this.id="screen_"+String(e)},senna.Screen.prototype.setTitle=function(e){this.title=e},senna.Screen.prototype.toString=function(){return this.id}}();
"use strict";!function(){senna.RequestScreen=function(){senna.RequestScreen.base(this,"constructor")},senna.inherits(senna.RequestScreen,senna.Screen),senna.RequestScreen.prototype.cacheable=!0,senna.RequestScreen.prototype.httpHeaders={"X-PJAX":"true","X-Requested-With":"XMLHttpRequest"},senna.RequestScreen.prototype.httpMethod="GET",senna.RequestScreen.prototype.request=null,senna.RequestScreen.prototype.timeout=3e4,senna.RequestScreen.prototype.abortRequest=function(){this.request&&this.request.abort()},senna.RequestScreen.prototype.getHttpHeaders=function(){return this.httpHeaders},senna.RequestScreen.prototype.getHttpMethod=function(){return this.httpMethod},senna.RequestScreen.prototype.getRequest=function(){return this.request},senna.RequestScreen.prototype.getTimeout=function(){return this.timeout},senna.RequestScreen.prototype.load=function(e){senna.RequestScreen.base(this,"load",e);var t=this,n=this.getCache();return senna.isValue(n)?senna.Promise.resolve(n):senna.request(e,this.httpMethod,this.httpHeaders,this.timeout).then(function(e){return t.setRequest(e),e.responseText})},senna.RequestScreen.prototype.setHttpHeaders=function(e){this.httpHeaders=e},senna.RequestScreen.prototype.setHttpMethod=function(e){this.httpMethod=e},senna.RequestScreen.prototype.setRequest=function(e){this.request=e},senna.RequestScreen.prototype.setTimeout=function(e){this.timeout=e}}();
"use strict";!function(){senna.HtmlScreen=function(){senna.HtmlScreen.base(this,"constructor")},senna.inherits(senna.HtmlScreen,senna.RequestScreen),senna.HtmlScreen.prototype.titleSelector="title",senna.HtmlScreen.prototype.getSurfaceContent=function(e,t){var n=t.querySelector("#"+e);return n?n.innerHTML:void 0},senna.HtmlScreen.prototype.getTitleSelector=function(){return this.titleSelector},senna.HtmlScreen.prototype.load=function(e){var t=this,n=senna.HtmlScreen.base(this,"load",e);return n.then(function(e){return t.resolveContent(e)}).thenCatch(function(e){throw t.abortRequest(),e})},senna.HtmlScreen.prototype.resolveContent=function(e){if(senna.isString(e)){var t=document.createElement("div");t.innerHTML=e,e=t}var n=e.querySelector(this.titleSelector);return n&&this.setTitle(n.innerHTML.trim()),this.addCache(e),e},senna.HtmlScreen.prototype.setTitleSelector=function(e){this.titleSelector=e}}();
/*!
 * Promises polyfill based on Google's Closure Library promises.
 *
 *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
 *
 * NOTE(eduardo): Promise support is not ready on all supported browsers,
 * therefore senna.js is temporarily using Google's promises as polyfill. It
 * supports cancellable promises and has clean and fast implementation.
 */
"use strict";!function(n){senna.Thenable=function(){},senna.Thenable.prototype.then=function(){},senna.Thenable.IMPLEMENTED_BY_PROP="$goog_Thenable",senna.Thenable.addImplementation=function(n){n.prototype.then=n.prototype.then,n.prototype.$goog_Thenable=!0},senna.Thenable.isImplementedBy=function(n){if(!n)return!1;try{return!!n.$goog_Thenable}catch(e){return!1}},senna.partial=function(n){var e=Array.prototype.slice.call(arguments,1);return function(){var t=e.slice();return t.push.apply(t,arguments),n.apply(this,t)}},senna.async={},senna.async.throwException=function(n){senna.async.nextTick(function(){throw n})},senna.async.run=function(n,e){senna.async.run.workQueueScheduled_||(senna.async.nextTick(senna.async.run.processWorkQueue),senna.async.run.workQueueScheduled_=!0),senna.async.run.workQueue_.push(new senna.async.run.WorkItem_(n,e))},senna.async.run.workQueueScheduled_=!1,senna.async.run.workQueue_=[],senna.async.run.processWorkQueue=function(){for(;senna.async.run.workQueue_.length;){var n=senna.async.run.workQueue_;senna.async.run.workQueue_=[];for(var e=0;e<n.length;e++){var t=n[e];try{t.fn.call(t.scope)}catch(a){senna.async.throwException(a)}}}senna.async.run.workQueueScheduled_=!1},senna.async.run.WorkItem_=function(n,e){this.fn=n,this.scope=e},senna.async.nextTick=function(e,t){var a=e;return t&&(a=senna.bind(e,t)),a=senna.async.nextTick.wrapCallback_(a),senna.isFunction(n.setImmediate)?void n.setImmediate(a):(senna.async.nextTick.setImmediate_||(senna.async.nextTick.setImmediate_=senna.async.nextTick.getSetImmediateEmulator_()),void senna.async.nextTick.setImmediate_(a))},senna.async.nextTick.setImmediate_=null,senna.async.nextTick.getSetImmediateEmulator_=function(){var e=n.MessageChannel;if("undefined"==typeof e&&"undefined"!=typeof n&&n.postMessage&&n.addEventListener&&(e=function(){var n=document.createElement("iframe");n.style.display="none",n.src="",document.documentElement.appendChild(n);var e=n.contentWindow,t=e.document;t.open(),t.write(""),t.close();var a="callImmediate"+Math.random(),s=e.location.protocol+"//"+e.location.host,i=senna.bind(function(n){(n.origin===s||n.data===a)&&this.port1.onmessage()},this);e.addEventListener("message",i,!1),this.port1={},this.port2={postMessage:function(){e.postMessage(a,s)}}}),"undefined"!=typeof e){var t=new e,a={},s=a;return t.port1.onmessage=function(){a=a.next;var n=a.cb;a.cb=null,n()},function(n){s.next={cb:n},s=s.next,t.port2.postMessage(0)}}return"undefined"!=typeof document&&"onreadystatechange"in document.createElement("script")?function(n){var e=document.createElement("script");e.onreadystatechange=function(){e.onreadystatechange=null,e.parentNode.removeChild(e),e=null,n(),n=null},document.documentElement.appendChild(e)}:function(n){setTimeout(n,0)}},senna.async.nextTick.wrapCallback_=function(n){return n},senna.Promise=function(n,e){this.state_=senna.Promise.State_.PENDING,this.result_=void 0,this.parent_=null,this.callbackEntries_=null,this.executing_=!1,senna.Promise.UNHANDLED_REJECTION_DELAY>0?this.unhandledRejectionId_=0:0===senna.Promise.UNHANDLED_REJECTION_DELAY&&(this.hadUnhandledRejection_=!1);try{var t=this;n.call(e,function(n){t.resolve_(senna.Promise.State_.FULFILLED,n)},function(n){t.resolve_(senna.Promise.State_.REJECTED,n)})}catch(a){this.resolve_(senna.Promise.State_.REJECTED,a)}},senna.Promise.UNHANDLED_REJECTION_DELAY=0,senna.Promise.State_={PENDING:0,BLOCKED:1,FULFILLED:2,REJECTED:3},senna.Promise.CallbackEntry_=null,senna.Promise.resolve=function(n){return new senna.Promise(function(e){e(n)})},senna.Promise.reject=function(n){return new senna.Promise(function(e,t){t(n)})},senna.Promise.race=function(n){return new senna.Promise(function(e,t){n.length||e(void 0);for(var a,s=0;a=n[s];s++)a.then(e,t)})},senna.Promise.all=function(n){return new senna.Promise(function(e,t){var a=n.length,s=[];if(!a)return void e(s);for(var i,o=function(n,t){a--,s[n]=t,0===a&&e(s)},r=function(n){t(n)},c=0;i=n[c];c++)i.then(senna.partial(o,c),r)})},senna.Promise.firstFulfilled=function(n){return new senna.Promise(function(e,t){var a=n.length,s=[];if(!a)return void e(void 0);for(var i,o=function(n){e(n)},r=function(n,e){a--,s[n]=e,0===a&&t(s)},c=0;i=n[c];c++)i.then(o,senna.partial(r,c))})},senna.Promise.prototype.then=function(n,e,t){return this.addChildPromise_(senna.isFunction(n)?n:null,senna.isFunction(e)?e:null,t)},senna.Thenable.addImplementation(senna.Promise),senna.Promise.prototype.thenAlways=function(n,e){var t=function(){try{n.call(e)}catch(t){senna.Promise.handleRejection_.call(null,t)}};return this.addCallbackEntry_({child:null,onRejected:t,onFulfilled:t}),this},senna.Promise.prototype.thenCatch=function(n,e){return this.addChildPromise_(null,n,e)},senna.Promise.prototype.cancel=function(n){this.state_===senna.Promise.State_.PENDING&&senna.async.run(function(){var e=new senna.Promise.CancellationError(n);this.cancelInternal_(e)},this)},senna.Promise.prototype.cancelInternal_=function(n){this.state_===senna.Promise.State_.PENDING&&(this.parent_?this.parent_.cancelChild_(this,n):this.resolve_(senna.Promise.State_.REJECTED,n))},senna.Promise.prototype.cancelChild_=function(n,e){if(this.callbackEntries_){for(var t,a=0,s=-1,i=0;t=this.callbackEntries_[i];i++){var o=t.child;if(o&&(a++,o===n&&(s=i),s>=0&&a>1))break}if(s>=0)if(this.state_===senna.Promise.State_.PENDING&&1===a)this.cancelInternal_(e);else{var r=this.callbackEntries_.splice(s,1)[0];this.executeCallback_(r,senna.Promise.State_.REJECTED,e)}}},senna.Promise.prototype.addCallbackEntry_=function(n){this.callbackEntries_&&this.callbackEntries_.length||this.state_!==senna.Promise.State_.FULFILLED&&this.state_!==senna.Promise.State_.REJECTED||this.scheduleCallbacks_(),this.callbackEntries_||(this.callbackEntries_=[]),this.callbackEntries_.push(n)},senna.Promise.prototype.addChildPromise_=function(n,e,t){var a={child:null,onFulfilled:null,onRejected:null};return a.child=new senna.Promise(function(s,i){a.onFulfilled=n?function(e){try{var a=n.call(t,e);s(a)}catch(o){i(o)}}:s,a.onRejected=e?function(n){try{var a=e.call(t,n);!senna.isDef(a)&&n instanceof senna.Promise.CancellationError?i(n):s(a)}catch(o){i(o)}}:i}),a.child.parent_=this,this.addCallbackEntry_(a),a.child},senna.Promise.prototype.unblockAndFulfill_=function(n){if(this.state_!==senna.Promise.State_.BLOCKED)throw new Error("Promise is not blocked.");this.state_=senna.Promise.State_.PENDING,this.resolve_(senna.Promise.State_.FULFILLED,n)},senna.Promise.prototype.unblockAndReject_=function(n){if(this.state_!==senna.Promise.State_.BLOCKED)throw new Error("Promise is not blocked.");this.state_=senna.Promise.State_.PENDING,this.resolve_(senna.Promise.State_.REJECTED,n)},senna.Promise.prototype.resolve_=function(n,e){if(this.state_===senna.Promise.State_.PENDING){if(this===e)n=senna.Promise.State_.REJECTED,e=new TypeError("Promise cannot resolve to itself");else{if(senna.Thenable.isImplementedBy(e))return e=e,this.state_=senna.Promise.State_.BLOCKED,void e.then(this.unblockAndFulfill_,this.unblockAndReject_,this);if(senna.isObject(e))try{var t=e.then;if(senna.isFunction(t))return void this.tryThen_(e,t)}catch(a){n=senna.Promise.State_.REJECTED,e=a}}this.result_=e,this.state_=n,this.scheduleCallbacks_(),n!==senna.Promise.State_.REJECTED||e instanceof senna.Promise.CancellationError||senna.Promise.addUnhandledRejection_(this,e)}},senna.Promise.prototype.tryThen_=function(n,e){this.state_=senna.Promise.State_.BLOCKED;var t=this,a=!1,s=function(n){a||(a=!0,t.unblockAndFulfill_(n))},i=function(n){a||(a=!0,t.unblockAndReject_(n))};try{e.call(n,s,i)}catch(o){i(o)}},senna.Promise.prototype.scheduleCallbacks_=function(){this.executing_||(this.executing_=!0,senna.async.run(this.executeCallbacks_,this))},senna.Promise.prototype.executeCallbacks_=function(){for(;this.callbackEntries_&&this.callbackEntries_.length;){var n=this.callbackEntries_;this.callbackEntries_=[];for(var e=0;e<n.length;e++)this.executeCallback_(n[e],this.state_,this.result_)}this.executing_=!1},senna.Promise.prototype.executeCallback_=function(n,e,t){e===senna.Promise.State_.FULFILLED?n.onFulfilled(t):(this.removeUnhandledRejection_(),n.onRejected(t))},senna.Promise.prototype.removeUnhandledRejection_=function(){var n;if(senna.Promise.UNHANDLED_REJECTION_DELAY>0)for(n=this;n&&n.unhandledRejectionId_;n=n.parent_)clearTimeout(n.unhandledRejectionId_),n.unhandledRejectionId_=0;else if(0===senna.Promise.UNHANDLED_REJECTION_DELAY)for(n=this;n&&n.hadUnhandledRejection_;n=n.parent_)n.hadUnhandledRejection_=!1},senna.Promise.addUnhandledRejection_=function(n,e){senna.Promise.UNHANDLED_REJECTION_DELAY>0?n.unhandledRejectionId_=setTimeout(function(){senna.Promise.handleRejection_.call(null,e)},senna.Promise.UNHANDLED_REJECTION_DELAY):0===senna.Promise.UNHANDLED_REJECTION_DELAY&&(n.hadUnhandledRejection_=!0,senna.async.run(function(){n.hadUnhandledRejection_&&senna.Promise.handleRejection_.call(null,e)}))},senna.Promise.handleRejection_=senna.async.throwException,senna.Promise.setUnhandledRejectionHandler=function(n){senna.Promise.handleRejection_=n},senna.Promise.CancellationError=function(n){senna.Promise.CancellationError.base(this,"constructor",n),n&&(this.message=n)},senna.inherits(senna.Promise.CancellationError,Error),senna.Promise.CancellationError.prototype.name="cancel"}(window);
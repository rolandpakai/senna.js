define(["exports","metal/src/metal","./dom"],function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var c=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),u=function(){function e(){r(this,e)}return c(e,null,[{key:"run",value:function(e,n){var r=document.createElement("script");return r.text=e,n?n(r):document.head.appendChild(r),(0,t.exitDocument)(r),r}},{key:"runFile",value:function(e,n,r){var c=document.createElement("script");c.src=e;var u=function(){(0,t.exitDocument)(c),n&&n()};return(0,t.once)(c,"load",u),(0,t.once)(c,"error",u),r?r(c):document.head.appendChild(c),c}},{key:"runScript",value:function(r,c,u){var i=function(){c&&c()};return r.type&&"text/javascript"!==r.type?void n.async.nextTick(i):((0,t.exitDocument)(r),r.src?e.runFile(r.src,c,u):(n.async.nextTick(i),e.run(r.text,u)))}},{key:"runScriptsInElement",value:function(t,r,c){var u=t.querySelectorAll("script");u.length?e.runScriptsInOrder(u,0,r,c):r&&n.async.nextTick(r)}},{key:"runScriptsInOrder",value:function(t,r,c,u){e.runScript(t.item(r),function(){r<t.length-1?e.runScriptsInOrder(t,r+1,c,u):c&&n.async.nextTick(c)},u)}}]),e}();e["default"]=u});
System.register(["./react-router-legacy-803ff762.js","./@babel-legacy-6ba21f19.js","./react-legacy-05c10a62.js","./history-legacy-d9f97357.js","./tiny-invariant-legacy-73612b60.js"],(function(e,t){"use strict";var n,r,a,i,c,o,l,u;return{setters:[e=>{e.a,n=e.c,r=e.m},e=>{e.a,a=e.b,i=e._},e=>{c=e.R},e=>{e.c,e.a,o=e.e,l=e.d},e=>{u=e.i}],execute:function(){c.Component,c.Component;var t=function(e,t){return"function"==typeof e?e(t):e},f=function(e,t){return"string"==typeof e?l(e,null,null,t):e},s=function(e){return e},v=c.forwardRef;void 0===v&&(v=s);var y=v((function(e,t){var n=e.innerRef,r=e.navigate,o=e.onClick,l=a(e,["innerRef","navigate","onClick"]),u=l.target,f=i({},l,{onClick:function(e){try{o&&o(e)}catch(t){throw e.preventDefault(),t}e.defaultPrevented||0!==e.button||u&&"_self"!==u||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)||(e.preventDefault(),r())}});return f.ref=s!==v&&t||n,c.createElement("a",f)})),m=e("L",v((function(e,r){var l=e.component,m=void 0===l?y:l,p=e.replace,g=e.to,d=e.innerRef,h=a(e,["component","replace","to","innerRef"]);return c.createElement(n.Consumer,null,(function(e){e||u(!1);var n=e.history,a=f(t(g,e.location),e.location),l=a?n.createHref(a):"",y=i({},h,{href:l,navigate:function(){var r=t(g,e.location),a=o(e.location)===o(f(r));(p||a?n.replace:n.push)(r)}});return s!==v?y.ref=r||d:y.innerRef=d,c.createElement(m,y)}))}))),p=function(e){return e},g=c.forwardRef;void 0===g&&(g=p),g((function(e,o){var l=e["aria-current"],s=void 0===l?"page":l,v=e.activeClassName,y=void 0===v?"active":v,d=e.activeStyle,h=e.className,R=e.exact,C=e.isActive,j=e.location,E=e.sensitive,N=e.strict,b=e.style,w=e.to,x=e.innerRef,K=a(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return c.createElement(n.Consumer,null,(function(e){e||u(!1);var n=j||e.location,a=f(t(w,n),n),l=a.pathname,v=l&&l.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),k=v?r(n.pathname,{path:v,exact:R,sensitive:E,strict:N}):null,A=!!(C?C(k,n):k),S="function"==typeof h?h(A):h,D="function"==typeof b?b(A):b;A&&(S=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}(S,y),D=i({},D,d));var $=i({"aria-current":A&&s||null,className:S,style:D,to:a},K);return p!==g?$.ref=o||x:$.innerRef=x,c.createElement(m,$)}))}))}}}));
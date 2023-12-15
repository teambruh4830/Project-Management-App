import{c as w,p as C,H as y,h as a,b as I}from"./@stencil-ba8338df.js";let d;const k=()=>{if(typeof window>"u")return new Map;if(!d){const t=window;t.Ionicons=t.Ionicons||{},d=t.Ionicons.map=t.Ionicons.map||new Map}return d},L=t=>{let e=f(t.src);return e||(e=g(t.name,t.icon,t.mode,t.ios,t.md),e?x(e):t.icon&&(e=f(t.icon),e||(e=f(t.icon[t.mode]),e))?e:null)},x=t=>{const e=k().get(t);return e||w("svg/".concat(t,".svg"))},g=(t,e,o,i,n)=>(o=(o&&c(o))==="ios"?"ios":"md",i&&o==="ios"?t=c(i):n&&o==="md"?t=c(n):(!t&&e&&!b(e)&&(t=e),l(t)&&(t=c(t))),!l(t)||t.trim()===""||t.replace(/[a-z]|-|\d/gi,"")!==""?null:t),f=t=>l(t)&&(t=t.trim(),b(t))?t:null,b=t=>t.length>0&&/(\/|\.)/.test(t),l=t=>typeof t=="string",c=t=>t.toLowerCase(),z=(t,e=[])=>{const o={};return e.forEach(i=>{t.hasAttribute(i)&&(t.getAttribute(i)!==null&&(o[i]=t.getAttribute(i)),t.removeAttribute(i))}),o},A=t=>t&&t.dir!==""?t.dir.toLowerCase()==="rtl":(document==null?void 0:document.dir.toLowerCase())==="rtl",E=t=>{const e=document.createElement("div");e.innerHTML=t;for(let i=e.childNodes.length-1;i>=0;i--)e.childNodes[i].nodeName.toLowerCase()!=="svg"&&e.removeChild(e.childNodes[i]);const o=e.firstElementChild;if(o&&o.nodeName.toLowerCase()==="svg"){const i=o.getAttribute("class")||"";if(o.setAttribute("class",(i+" s-ion-icon").trim()),p(o))return e.innerHTML}return""},p=t=>{if(t.nodeType===1){if(t.nodeName.toLowerCase()==="script")return!1;for(let e=0;e<t.attributes.length;e++){const o=t.attributes[e].name;if(l(o)&&o.toLowerCase().indexOf("on")===0)return!1}for(let e=0;e<t.childNodes.length;e++)if(!p(t.childNodes[e]))return!1}return!0},M=t=>t.startsWith("data:image/svg+xml"),X=t=>t.indexOf(";utf8,")!==-1,s=new Map,m=new Map;let h;const O=(t,e)=>{let o=m.get(t);if(!o)if(typeof fetch<"u"&&typeof document<"u")if(M(t)&&X(t)){h||(h=new DOMParser);const n=h.parseFromString(t,"text/html").querySelector("svg");return n&&s.set(t,n.outerHTML),Promise.resolve()}else o=fetch(t).then(i=>{if(i.ok)return i.text().then(n=>{n&&e!==!1&&(n=E(n)),s.set(t,n||"")});s.set(t,"")}),m.set(t,o);else return s.set(t,""),Promise.resolve();return o},H=":host{display:inline-block;width:1em;height:1em;contain:strict;fill:currentColor;-webkit-box-sizing:content-box !important;box-sizing:content-box !important}:host .ionicon{stroke:currentColor}.ionicon-fill-none{fill:none}.ionicon-stroke-width{stroke-width:32px;stroke-width:var(--ionicon-stroke-width, 32px)}.icon-inner,.ionicon,svg{display:block;height:100%;width:100%}@supports (background: -webkit-named-image(i)){:host(.icon-rtl) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}}@supports not selector(:dir(rtl)) and selector(:host-context([dir='rtl'])){:host(.icon-rtl) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}}:host(.flip-rtl):host-context([dir='rtl']) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}@supports selector(:dir(rtl)){:host(.flip-rtl:dir(rtl)) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}:host(.flip-rtl:dir(ltr)) .icon-inner{-webkit-transform:scaleX(1);transform:scaleX(1)}}:host(.icon-small){font-size:1.125rem !important}:host(.icon-large){font-size:2rem !important}:host(.ion-color){color:var(--ion-color-base) !important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary, #3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary, #0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary, #f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success, #10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning, #ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger, #f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light, #f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium, #989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark, #222428)}",S=C(class extends y{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.iconName=null,this.inheritedAttributes={},this.didLoadIcon=!1,this.svgContent=void 0,this.isVisible=!1,this.mode=V(),this.color=void 0,this.ios=void 0,this.md=void 0,this.flipRtl=void 0,this.name=void 0,this.src=void 0,this.icon=void 0,this.size=void 0,this.lazy=!1,this.sanitize=!0}componentWillLoad(){this.inheritedAttributes=z(this.el,["aria-label"])}connectedCallback(){this.waitUntilVisible(this.el,"50px",()=>{this.isVisible=!0,this.loadIcon()})}componentDidLoad(){this.didLoadIcon||this.loadIcon()}disconnectedCallback(){this.io&&(this.io.disconnect(),this.io=void 0)}waitUntilVisible(e,o,i){if(this.lazy&&typeof window<"u"&&window.IntersectionObserver){const n=this.io=new window.IntersectionObserver(r=>{r[0].isIntersecting&&(n.disconnect(),this.io=void 0,i())},{rootMargin:o});n.observe(e)}else i()}loadIcon(){if(this.isVisible){const e=L(this);e&&(s.has(e)?this.svgContent=s.get(e):O(e,this.sanitize).then(()=>this.svgContent=s.get(e)),this.didLoadIcon=!0)}this.iconName=g(this.name,this.icon,this.mode,this.ios,this.md)}render(){const{flipRtl:e,iconName:o,inheritedAttributes:i,el:n}=this,r=this.mode||"md",v=o?(o.includes("arrow")||o.includes("chevron"))&&e!==!1:!1,u=e||v;return a(I,Object.assign({role:"img",class:Object.assign(Object.assign({[r]:!0},D(this.color)),{["icon-".concat(this.size)]:!!this.size,"flip-rtl":u,"icon-rtl":u&&A(n)})},i),this.svgContent?a("div",{class:"icon-inner",innerHTML:this.svgContent}):a("div",{class:"icon-inner"}))}static get assetsDirs(){return["svg"]}get el(){return this}static get watchers(){return{name:["loadIcon"],src:["loadIcon"],icon:["loadIcon"],ios:["loadIcon"],md:["loadIcon"]}}static get style(){return H}},[1,"ion-icon",{mode:[1025],color:[1],ios:[1],md:[1],flipRtl:[4,"flip-rtl"],name:[513],src:[1],icon:[8],size:[1],lazy:[4],sanitize:[4],svgContent:[32],isVisible:[32]}]),V=()=>typeof document<"u"&&document.documentElement.getAttribute("mode")||"md",D=t=>t?{"ion-color":!0,["ion-color-".concat(t)]:!0}:null;function T(){if(typeof customElements>"u")return;["ion-icon"].forEach(e=>{switch(e){case"ion-icon":customElements.get(e)||customElements.define(e,S);break}})}const _=T;export{_ as d};
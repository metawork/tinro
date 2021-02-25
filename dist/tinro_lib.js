import{getContext as Y}from"svelte";import{writable as q}from"svelte/store";function d(e,r=!1){return e=e.slice(e.startsWith("/#")?2:0,e.endsWith("/*")?-2:void 0),e.startsWith("/")||(e="/"+e),e==="/"&&(e=""),r&&!e.endsWith("/")&&(e+="/"),e}function b(e,r){e=d(e,!0),r=d(r,!0);let a=[],o={},t=!0,n=e.split("/").map(c=>c.startsWith(":")?(a.push(c.slice(1)),"([^\\/]+)"):c).join("\\/"),i=r.match(new RegExp(`^${n}$`));return i||(t=!1,i=r.match(new RegExp(`^${n}`))),i?(a.forEach((c,x)=>o[c]=i[x+1]),{exact:t,params:o,part:i[0].slice(0,-1)}):null}function k(e,r,a){if(a==="")return e;if(a[0]==="/")return a;let o=i=>i.split("/").filter(c=>c!==""),t=o(e),n=r?o(r):[];return"/"+n.map((i,c)=>t[c]).join("/")+"/"+a}function h(e,r,a,o){let t=[r,"data-"+r].reduce((n,i)=>{let c=e.getAttribute(i);return a&&e.removeAttribute(i),c===null?n:c},!1);return!o&&t===""?!0:t||o||!1}function S(e){let r=e.split("&").map(a=>a.split("=")).reduce((a,o)=>{let t=o[0];if(!t)return a;let n=o.length>1?o[o.length-1]:!0;return typeof n=="string"&&n.includes(",")&&(n=n.split(",")),a[t]===void 0?a[t]=[n]:a[t].push(n),a},{});return Object.entries(r).reduce((a,o)=>(a[o[0]]=o[1].length>1?o[1]:o[1][0],a),{})}function y(e){throw new Error("[Tinro] "+e)}var R=1,O=2,_=3,H=4;function j(e,r,a,o){return e===R?r&&r():e===O?a&&a():o&&o()}function W(){return!window||window.location.pathname==="srcdoc"?_:R}var s={HISTORY:R,HASH:O,MEMORY:_,OFF:H,run:j,getDeafault:W};var M,g,l=z();function z(){let e=s.getDeafault(),r,a=n=>window.onhashchange=window.onpopstate=g=null,o=n=>r&&r(E(e));function t(n){n&&(e=n),a(),e!==s.OFF&&s.run(e,i=>window.onpopstate=o,i=>window.onhashchange=o)&&o()}return{mode:n=>t(n),get:n=>E(e),go(n){F(e,n),o()},replace(n){D(e,n),o()},start(n){r=n,t()},stop(){r=null,t(s.OFF)}}}function D(e,r){console.log("Replacing location"),s.run(e,a=>history.replaceState({},"",r),a=>window.location.hash=r,a=>g=r)}function F(e,r){console.log("SET LOCATION"),s.run(e,a=>history.pushState({},"",r),a=>window.location.hash=r,a=>g=r)}function E(e){let r=M,a=M=s.run(e,t=>window.location.pathname+window.location.search,t=>String(window.location.hash.slice(1)||"/"),t=>g||"/"),o=a.match(/^([^?#]+)(?:\?([^#]+))?(?:\#(.+))?$/);return{url:a,from:r,path:o[1]||"",query:S(o[2]||""),hash:o[3]||""}}import{getContext as L,setContext as P,onMount as T,tick as A}from"svelte";import{writable as U}from"svelte/store";function $(e){let r=L("tinro");r&&(r.exact||r.fallback)&&y(`${e.fallback?"<Route fallback>":`<Route path="${e.path}">`}  can't be inside ${r.fallback?"<Route fallback>":`<Route path="${r.path||"/"}"> with exact path`}`);let a=e.fallback?"fallbacks":"childs",o=U({}),t={router:{},exact:!1,pattern:null,meta:{},parent:r,fallback:e.fallback,redirect:!1,replace:!1,firstmatch:!1,breadcrumb:null,matched:!1,childs:new Set,activeChilds:new Set,fallbacks:new Set,update(n){t.exact=!n.path.endsWith("/*"),t.pattern=d(`${t.parent&&t.parent.pattern||""}${n.path}`),t.redirect=n.redirect,t.firstmatch=n.firstmatch,t.breadcrumb=n.breadcrumb,t.match()},register:()=>{if(!!t.parent)return t.parent[a].add(t),()=>{t.parent[a].delete(t),t.router.un&&t.router.un()}},show:()=>{e.onShow(),!t.fallback&&t.parent&&t.parent.activeChilds.add(t)},hide:()=>{e.onHide(),!t.fallback&&t.parent&&t.parent.activeChilds.delete(t)},match:async()=>{t.matched=!1;let{path:n,url:i,from:c,query:x}=t.router,u=b(t.pattern,n);if(!t.fallback&&u&&(t.redirect||t.replace)&&(!t.exact||t.exact&&u.exact)){await A();let m=k(n,t.parent&&t.parent.pattern,t.redirect);return t.redirect?f.goto(m):f.replace(m)}if(t.meta=u&&{from:c,url:i,query:x,match:u.part,pattern:t.pattern,breadcrumbs:t.parent&&t.parent.meta&&t.parent.meta.breadcrumbs.slice()||[],params:u.params,subscribe:o.subscribe},t.breadcrumb&&t.meta&&t.meta.breadcrumbs.push({name:t.breadcrumb,path:u.part}),o.set(t.meta),u&&!t.fallback&&(!t.exact||t.exact&&u.exact)&&(!t.parent||!t.parent.firstmatch||!t.parent.matched)?(e.onMeta(t.meta),t.parent&&(t.parent.matched=!0),t.show()):t.hide(),await A(),u&&!t.fallback&&(t.childs.size>0&&t.activeChilds.size==0||t.childs.size==0&&t.fallbacks.size>0)){let m=t;for(;m.fallbacks.size==0;)if(m=m.parent,!m)return;m&&m.fallbacks.forEach(p=>{if(p.redirect||p.replace){let v=k("/",p.parent&&p.parent.pattern,p.redirect);p.redirect?f.goto(v):f.replace(v)}else p.show()})}}};return P("tinro",t),T(()=>t.register()),t.router.un=f.subscribe(n=>{t.router.path=n.path,t.router.url=n.url,t.router.query=n.query,t.router.from=n.from,t.pattern!==null&&t.match()}),t}function w(){return L("tinro").meta}var f=I();function I(){let{subscribe:e}=q(l.get(),r=>{l.start(r);let a=K(l.go);return()=>{l.stop(),a()}});return{subscribe:e,goto:r=>l.go(r),replaceWith:r=>l.replace(r),params:N,meta:w,useHashNavigation:r=>l.mode(r?s.HASH:s.HISTORY),mode:{hash:()=>l.mode(s.HASH),history:()=>l.mode(s.HISTORY),memory:()=>l.mode(s.MEMORY)}}}function C(e){let r=h(e,"href"),a=h(e,"exact",!0),o=h(e,"active-class",!0,"active");return{destroy:f.subscribe(t=>{let n=b(r,t.path);n&&(n.exact&&a||!a)?e.classList.add(o):e.classList.remove(o)})}}function K(e){let r=a=>{let o=a.target.closest("a[href]"),t=o&&h(o,"target",!1,"_self"),n=o&&h(o,"tinro-ignore"),i=a.ctrlKey||a.metaKey||a.altKey||a.shiftKey;if(t=="_self"&&!n&&!i&&o){let c=o.getAttribute("href").replace(/^\/#/,"");/^\/\/|^[a-zA-Z]+:/.test(c)||(a.preventDefault(),e(c.startsWith("/")?c:o.href.replace(window.location.origin,"")))}};return addEventListener("click",r),()=>removeEventListener("click",r)}function N(){return Y("tinro").meta.params}export{C as active,$ as createRouteObject,w as meta,f as router};

import{SvelteComponent as et,check_outros as rt,create_slot as at,detach as nt,empty as it,group_outros as lt,init as ct,insert as ot,safe_not_equal as st,transition_in as k,transition_out as R,update_slot as ut}from"svelte/internal";import{getContext as Y}from"svelte";import{writable as I}from"svelte/store";import{getContext as S,setContext as K,onMount as D,tick as y}from"svelte";import{writable as N}from"svelte/store";function _(e,a=!1){return e=e.slice(e.startsWith("/#")?2:0,e.endsWith("/*")?-2:void 0),e.startsWith("/")||(e="/"+e),e==="/"&&(e=""),a&&!e.endsWith("/")&&(e+="/"),e}function O(e,a){e=_(e,!0),a=_(a,!0);let n=[],r={},t=!0,i=e.split("/").map(l=>l.startsWith(":")?(n.push(l.slice(1)),"([^\\/]+)"):l).join("\\/"),c=a.match(new RegExp(`^${i}$`));return c||(t=!1,c=a.match(new RegExp(`^${i}`))),c?(n.forEach((l,p)=>r[l]=c[p+1]),{exact:t,params:r,part:c[0].slice(0,-1)}):null}function H(e,a,n){if(n==="")return e;if(n[0]==="/")return n;let r=c=>c.split("/").filter(l=>l!==""),t=r(e),i=a?r(a):[];return"/"+i.map((c,l)=>t[l]).join("/")+"/"+n}function w(e,a,n,r){let t=[a,"data-"+a].reduce((i,c)=>{let l=e.getAttribute(c);return n&&e.removeAttribute(c),l===null?i:l},!1);return!r&&t===""?!0:t||r||!1}function P(e){let a=e.split("&").map(n=>n.split("=")).reduce((n,r)=>{let t=r[0];if(!t)return n;let i=r.length>1?r[r.length-1]:!0;return typeof i=="string"&&i.includes(",")&&(i=i.split(",")),n[t]===void 0?n[t]=[i]:n[t].push(i),n},{});return Object.entries(a).reduce((n,r)=>(n[r[0]]=r[1].length>1?r[1]:r[1][0],n),{})}function U(e){throw new Error("[Tinro] "+e)}var v=1,C=2,E=3,Z=4;function B(e,a,n,r){return e===v?a&&a():e===C?n&&n():r&&r()}function G(){return!window||window.location.pathname==="srcdoc"?E:v}var f={HISTORY:v,HASH:C,MEMORY:E,OFF:Z,run:B,getDeafault:G},W,g,m=J();function J(){let e=f.getDeafault(),a,n=i=>window.onhashchange=window.onpopstate=g=null,r=i=>a&&a(A(e));function t(i){i&&(e=i),n(),e!==f.OFF&&f.run(e,c=>window.onpopstate=r,c=>window.onhashchange=r)&&r()}return{mode:i=>t(i),get:i=>A(e),go(i){V(e,i),r()},replace(i){console.log("going to replace 3"),Q(e,i),r()},start(i){a=i,t()},stop(){a=null,t(f.OFF)}}}function Q(e,a){console.log("Replacing location"),f.run(e,n=>history.replaceState({},"",a),n=>window.location.hash=a,n=>g=a)}function V(e,a){console.log("SET LOCATION"),f.run(e,n=>history.pushState({},"",a),n=>window.location.hash=a,n=>g=a)}function A(e){let a=W,n=W=f.run(e,t=>window.location.pathname+window.location.search,t=>String(window.location.hash.slice(1)||"/"),t=>g||"/"),r=n.match(/^([^?#]+)(?:\?([^#]+))?(?:\#(.+))?$/);return{url:n,from:a,path:r[1]||"",query:P(r[2]||""),hash:r[3]||""}}function M(e){let a=S("tinro");a&&(a.exact||a.fallback)&&U(`${e.fallback?"<Route fallback>":`<Route path="${e.path}">`}  can't be inside ${a.fallback?"<Route fallback>":`<Route path="${a.path||"/"}"> with exact path`}`);let n=e.fallback?"fallbacks":"childs",r=N({}),t={router:{},exact:!1,pattern:null,meta:{},parent:a,fallback:e.fallback,redirect:!1,replace:!1,firstmatch:!1,breadcrumb:null,matched:!1,childs:new Set,activeChilds:new Set,fallbacks:new Set,update(i){t.exact=!i.path.endsWith("/*"),t.pattern=_(`${t.parent&&t.parent.pattern||""}${i.path}`),t.redirect=i.redirect,t.firstmatch=i.firstmatch,t.breadcrumb=i.breadcrumb,t.match()},register:()=>{if(t.parent)return t.parent[n].add(t),()=>{t.parent[n].delete(t),t.router.un&&t.router.un()}},show:()=>{e.onShow(),!t.fallback&&t.parent&&t.parent.activeChilds.add(t)},hide:()=>{e.onHide(),!t.fallback&&t.parent&&t.parent.activeChilds.delete(t)},match:async()=>{t.matched=!1;let{path:i,url:c,from:l,query:p}=t.router,s=O(t.pattern,i);if(!t.fallback&&s&&(t.redirect||t.replace)&&(!t.exact||t.exact&&s.exact)){await y();let u=H(i,t.parent&&t.parent.pattern,t.redirect);return t.redirect?d.goto(u):(console.log("in here replace 1"),d.replaceWith(u))}if(t.meta=s&&{from:l,url:c,query:p,match:s.part,pattern:t.pattern,breadcrumbs:t.parent&&t.parent.meta&&t.parent.meta.breadcrumbs.slice()||[],params:s.params,subscribe:r.subscribe},t.breadcrumb&&t.meta&&t.meta.breadcrumbs.push({name:t.breadcrumb,path:s.part}),r.set(t.meta),s&&!t.fallback&&(!t.exact||t.exact&&s.exact)&&(!t.parent||!t.parent.firstmatch||!t.parent.matched)?(e.onMeta(t.meta),t.parent&&(t.parent.matched=!0),t.show()):t.hide(),await y(),s&&!t.fallback&&(t.childs.size>0&&t.activeChilds.size==0||t.childs.size==0&&t.fallbacks.size>0)){let u=t;for(;u.fallbacks.size==0;)if(u=u.parent,!u)return;u&&u.fallbacks.forEach(h=>{if(h.redirect||h.replace){let b=H("/",h.parent&&h.parent.pattern,h.redirect);h.redirect?d.goto(b):(console.log("in here replace 2"),d.replaceWith(b))}else h.show()})}}};return K("tinro",t),D(()=>t.register()),t.router.un=d.subscribe(i=>{t.router.path=i.path,t.router.url=i.url,t.router.query=i.query,t.router.from=i.from,t.pattern!==null&&t.match()}),t}function x(){return S("tinro").meta}var d=X();function X(){let{subscribe:e}=I(m.get(),a=>{m.start(a);let n=$(m.go);return()=>{m.stop(),n()}});return{subscribe:e,goto:a=>m.go(a),replaceWith:a=>m.replace(a),params:tt,meta:x,useHashNavigation:a=>m.mode(a?f.HASH:f.HISTORY),mode:{hash:()=>m.mode(f.HASH),history:()=>m.mode(f.HISTORY),memory:()=>m.mode(f.MEMORY)}}}function q(e){let a=w(e,"href"),n=w(e,"exact",!0),r=w(e,"active-class",!0,"active");return{destroy:d.subscribe(t=>{let i=O(a,t.path);i&&(i.exact&&n||!n)?e.classList.add(r):e.classList.remove(r)})}}function $(e){let a=n=>{let r=n.target.closest("a[href]"),t=r&&w(r,"target",!1,"_self"),i=r&&w(r,"tinro-ignore"),c=n.ctrlKey||n.metaKey||n.altKey||n.shiftKey;if(t=="_self"&&!i&&!c&&r){let l=r.getAttribute("href").replace(/^\/#/,"");/^\/\/|^[a-zA-Z]+:/.test(l)||(n.preventDefault(),e(l.startsWith("/")?l:r.href.replace(window.location.origin,"")))}};return addEventListener("click",a),()=>removeEventListener("click",a)}function tt(){return Y("tinro").meta.params}var ft=e=>({params:e&2,meta:e&4}),z=e=>({params:e[1],meta:e[2]});function F(e){let a,n=e[9].default,r=at(n,e,e[8],z);return{c(){r&&r.c()},m(t,i){r&&r.m(t,i),a=!0},p(t,i){r&&r.p&&i&262&&ut(r,n,t,t[8],i,ft,z)},i(t){a||(k(r,t),a=!0)},o(t){R(r,t),a=!1},d(t){r&&r.d(t)}}}function ht(e){let a,n,r=e[0]&&F(e);return{c(){r&&r.c(),a=it()},m(t,i){r&&r.m(t,i),ot(t,a,i),n=!0},p(t,[i]){t[0]?r?(r.p(t,i),i&1&&k(r,1)):(r=F(t),r.c(),k(r,1),r.m(a.parentNode,a)):r&&(lt(),R(r,1,1,()=>{r=null}),rt())},i(t){n||(k(r),n=!0)},o(t){R(r),n=!1},d(t){r&&r.d(t),t&&nt(a)}}}function mt(e,a,n){let{$$slots:r={},$$scope:t}=a,{path:i="/*"}=a,{fallback:c=!1}=a,{redirect:l=!1}=a,{firstmatch:p=!1}=a,{breadcrumb:s=null}=a,u=!1,h={},b={},L=M({fallback:c,onShow(){n(0,u=!0)},onHide(){n(0,u=!1)},onMeta(o){n(2,b=o),n(1,h=b.params)}});return e.$$set=o=>{"path"in o&&n(3,i=o.path),"fallback"in o&&n(4,c=o.fallback),"redirect"in o&&n(5,l=o.redirect),"firstmatch"in o&&n(6,p=o.firstmatch),"breadcrumb"in o&&n(7,s=o.breadcrumb),"$$scope"in o&&n(8,t=o.$$scope)},e.$$.update=()=>{if(e.$$.dirty&232){t:L.update({path:i,redirect:l,firstmatch:p,breadcrumb:s})}},[u,h,b,i,c,l,p,s,t,r]}var T=class extends et{constructor(a){super();ct(this,a,mt,ht,st,{path:3,fallback:4,redirect:5,firstmatch:6,breadcrumb:7})}},j=T;export{j as Route,q as active,x as meta,d as router};

import{SvelteComponent as tt,check_outros as et,create_slot as rt,detach as at,empty as nt,group_outros as it,init as lt,insert as ot,safe_not_equal as ct,transition_in as w,transition_out as R,update_slot as st}from"svelte/internal";import{getContext as Y}from"svelte";import{writable as I}from"svelte/store";import{getContext as S,setContext as K,onMount as D,tick as y}from"svelte";import{writable as N}from"svelte/store";function k(r,a=!1){return r=r.slice(r.startsWith("/#")?2:0,r.endsWith("/*")?-2:void 0),r.startsWith("/")||(r="/"+r),r==="/"&&(r=""),a&&!r.endsWith("/")&&(r+="/"),r}function O(r,a){r=k(r,!0),a=k(a,!0);let n=[],e={},t=!0,i=r.split("/").map(l=>l.startsWith(":")?(n.push(l.slice(1)),"([^\\/]+)"):l).join("\\/"),o=a.match(new RegExp(`^${i}$`));return o||(t=!1,o=a.match(new RegExp(`^${i}`))),o?(n.forEach((l,d)=>e[l]=o[d+1]),{exact:t,params:e,part:o[0].slice(0,-1)}):null}function H(r,a,n){if(n==="")return r;if(n[0]==="/")return n;let e=o=>o.split("/").filter(l=>l!==""),t=e(r),i=a?e(a):[];return"/"+i.map((o,l)=>t[l]).join("/")+"/"+n}function b(r,a,n,e){let t=[a,"data-"+a].reduce((i,o)=>{let l=r.getAttribute(o);return n&&r.removeAttribute(o),l===null?i:l},!1);return!e&&t===""?!0:t||e||!1}function P(r){let a=r.split("&").map(n=>n.split("=")).reduce((n,e)=>{let t=e[0];if(!t)return n;let i=e.length>1?e[e.length-1]:!0;return typeof i=="string"&&i.includes(",")&&(i=i.split(",")),n[t]===void 0?n[t]=[i]:n[t].push(i),n},{});return Object.entries(a).reduce((n,e)=>(n[e[0]]=e[1].length>1?e[1]:e[1][0],n),{})}function Z(r){throw new Error("[Tinro] "+r)}var _=1,C=2,E=3,B=4;function G(r,a,n,e){return r===_?a&&a():r===C?n&&n():e&&e()}function J(){return!window||window.location.pathname==="srcdoc"?E:_}var u={HISTORY:_,HASH:C,MEMORY:E,OFF:B,run:G,getDeafault:J},A,v,m=Q();function Q(){let r=u.getDeafault(),a,n=i=>window.onhashchange=window.onpopstate=v=null,e=i=>a&&a(M(r));function t(i){i&&(r=i),n(),r!==u.OFF&&u.run(r,o=>window.onpopstate=e,o=>window.onhashchange=e)&&e()}return{mode:i=>t(i),get:i=>M(r),go(i){U(r,i),e()},start(i){a=i,t()},stop(){a=null,t(u.OFF)}}}function U(r,a){console.log("SET LOCATION"),u.run(r,n=>history.pushState({},"",a),n=>window.location.hash=a,n=>v=a)}function M(r){let a=A,n=A=u.run(r,t=>window.location.pathname+window.location.search,t=>String(window.location.hash.slice(1)||"/"),t=>v||"/"),e=n.match(/^([^?#]+)(?:\?([^#]+))?(?:\#(.+))?$/);return{url:n,from:a,path:e[1]||"",query:P(e[2]||""),hash:e[3]||""}}function W(r){let a=S("tinro");a&&(a.exact||a.fallback)&&Z(`${r.fallback?"<Route fallback>":`<Route path="${r.path}">`}  can't be inside ${a.fallback?"<Route fallback>":`<Route path="${a.path||"/"}"> with exact path`}`);let n=r.fallback?"fallbacks":"childs",e=N({}),t={router:{},exact:!1,pattern:null,meta:{},parent:a,fallback:r.fallback,redirect:!1,firstmatch:!1,breadcrumb:null,matched:!1,childs:new Set,activeChilds:new Set,fallbacks:new Set,update(i){t.exact=!i.path.endsWith("/*"),t.pattern=k(`${t.parent&&t.parent.pattern||""}${i.path}`),t.redirect=i.redirect,t.firstmatch=i.firstmatch,t.breadcrumb=i.breadcrumb,t.match()},register:()=>{if(t.parent)return t.parent[n].add(t),()=>{t.parent[n].delete(t),t.router.un&&t.router.un()}},show:()=>{r.onShow(),!t.fallback&&t.parent&&t.parent.activeChilds.add(t)},hide:()=>{r.onHide(),!t.fallback&&t.parent&&t.parent.activeChilds.delete(t)},match:async()=>{t.matched=!1;let{path:i,url:o,from:l,query:d}=t.router,s=O(t.pattern,i);if(!t.fallback&&s&&t.redirect&&(!t.exact||t.exact&&s.exact))return await y(),p.goto(H(i,t.parent&&t.parent.pattern,t.redirect));if(t.meta=s&&{from:l,url:o,query:d,match:s.part,pattern:t.pattern,breadcrumbs:t.parent&&t.parent.meta&&t.parent.meta.breadcrumbs.slice()||[],params:s.params,subscribe:e.subscribe},t.breadcrumb&&t.meta&&t.meta.breadcrumbs.push({name:t.breadcrumb,path:s.part}),e.set(t.meta),s&&!t.fallback&&(!t.exact||t.exact&&s.exact)&&(!t.parent||!t.parent.firstmatch||!t.parent.matched)?(r.onMeta(t.meta),t.parent&&(t.parent.matched=!0),t.show()):t.hide(),await y(),s&&!t.fallback&&(t.childs.size>0&&t.activeChilds.size==0||t.childs.size==0&&t.fallbacks.size>0)){let f=t;for(;f.fallbacks.size==0;)if(f=f.parent,!f)return;f&&f.fallbacks.forEach(h=>{h.redirect?p.goto(H("/",h.parent&&h.parent.pattern,h.redirect)):h.show()})}}};return K("tinro",t),D(()=>t.register()),t.router.un=p.subscribe(i=>{t.router.path=i.path,t.router.url=i.url,t.router.query=i.query,t.router.from=i.from,t.pattern!==null&&t.match()}),t}function x(){return S("tinro").meta}var p=V();function V(){let{subscribe:r}=I(m.get(),a=>{m.start(a);let n=X(m.go);return()=>{m.stop(),n()}});return{subscribe:r,goto:a=>m.go(a),params:$,meta:x,useHashNavigation:a=>m.mode(a?u.HASH:u.HISTORY),mode:{hash:()=>m.mode(u.HASH),history:()=>m.mode(u.HISTORY),memory:()=>m.mode(u.MEMORY)}}}function q(r){let a=b(r,"href"),n=b(r,"exact",!0),e=b(r,"active-class",!0,"active");return{destroy:p.subscribe(t=>{let i=O(a,t.path);i&&(i.exact&&n||!n)?r.classList.add(e):r.classList.remove(e)})}}function X(r){let a=n=>{let e=n.target.closest("a[href]"),t=e&&b(e,"target",!1,"_self"),i=e&&b(e,"tinro-ignore"),o=n.ctrlKey||n.metaKey||n.altKey||n.shiftKey;if(t=="_self"&&!i&&!o&&e){let l=e.getAttribute("href").replace(/^\/#/,"");/^\/\/|^[a-zA-Z]+:/.test(l)||(n.preventDefault(),r(l.startsWith("/")?l:e.href.replace(window.location.origin,"")))}};return addEventListener("click",a),()=>removeEventListener("click",a)}function $(){return Y("tinro").meta.params}var ut=r=>({params:r&2,meta:r&4}),z=r=>({params:r[1],meta:r[2]});function F(r){let a,n=r[9].default,e=rt(n,r,r[8],z);return{c(){e&&e.c()},m(t,i){e&&e.m(t,i),a=!0},p(t,i){e&&e.p&&i&262&&st(e,n,t,t[8],i,ut,z)},i(t){a||(w(e,t),a=!0)},o(t){R(e,t),a=!1},d(t){e&&e.d(t)}}}function ft(r){let a,n,e=r[0]&&F(r);return{c(){e&&e.c(),a=nt()},m(t,i){e&&e.m(t,i),ot(t,a,i),n=!0},p(t,[i]){t[0]?e?(e.p(t,i),i&1&&w(e,1)):(e=F(t),e.c(),w(e,1),e.m(a.parentNode,a)):e&&(it(),R(e,1,1,()=>{e=null}),et())},i(t){n||(w(e),n=!0)},o(t){R(e),n=!1},d(t){e&&e.d(t),t&&at(a)}}}function mt(r,a,n){let{$$slots:e={},$$scope:t}=a,{path:i="/*"}=a,{fallback:o=!1}=a,{redirect:l=!1}=a,{firstmatch:d=!1}=a,{breadcrumb:s=null}=a,f=!1,h={},g={},L=W({fallback:o,onShow(){n(0,f=!0)},onHide(){n(0,f=!1)},onMeta(c){n(2,g=c),n(1,h=g.params)}});return r.$$set=c=>{"path"in c&&n(3,i=c.path),"fallback"in c&&n(4,o=c.fallback),"redirect"in c&&n(5,l=c.redirect),"firstmatch"in c&&n(6,d=c.firstmatch),"breadcrumb"in c&&n(7,s=c.breadcrumb),"$$scope"in c&&n(8,t=c.$$scope)},r.$$.update=()=>{if(r.$$.dirty&232){t:L.update({path:i,redirect:l,firstmatch:d,breadcrumb:s})}},[f,h,g,i,o,l,d,s,t,e]}var T=class extends tt{constructor(a){super();lt(this,a,mt,ft,ct,{path:3,fallback:4,redirect:5,firstmatch:6,breadcrumb:7})}},j=T;export{j as Route,q as active,x as meta,p as router};

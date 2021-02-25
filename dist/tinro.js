var N=Object.create,v=Object.defineProperty,P=Object.getPrototypeOf,U=Object.prototype.hasOwnProperty,Z=Object.getOwnPropertyNames,B=Object.getOwnPropertyDescriptor;var O=t=>v(t,"__esModule",{value:!0});var G=(t,a)=>{O(t);for(var n in a)v(t,n,{get:a[n],enumerable:!0})},J=(t,a,n)=>{if(O(t),a&&typeof a=="object"||typeof a=="function")for(let r of Z(a))!U.call(t,r)&&r!=="default"&&v(t,r,{get:()=>a[r],enumerable:!(n=B(a,r))||n.enumerable});return t},k=t=>t&&t.__esModule?t:J(v(t!=null?N(P(t)):{},"default",{value:t,enumerable:!0}),t);G(exports,{Route:()=>K,active:()=>j,meta:()=>y,router:()=>b});var l=k(require("svelte/internal"));var H=k(require("svelte")),C=k(require("svelte/store")),d=k(require("svelte")),E=k(require("svelte/store"));function R(t,a=!1){return t=t.slice(t.startsWith("/#")?2:0,t.endsWith("/*")?-2:void 0),t.startsWith("/")||(t="/"+t),t==="/"&&(t=""),a&&!t.endsWith("/")&&(t+="/"),t}function W(t,a){t=R(t,!0),a=R(a,!0);let n=[],r={},e=!0,o=t.split("/").map(i=>i.startsWith(":")?(n.push(i.slice(1)),"([^\\/]+)"):i).join("\\/"),c=a.match(new RegExp(`^${o}$`));return c||(e=!1,c=a.match(new RegExp(`^${o}`))),c?(n.forEach((i,g)=>r[i]=c[g+1]),{exact:e,params:r,part:c[0].slice(0,-1)}):null}function A(t,a,n){if(n==="")return t;if(n[0]==="/")return n;let r=c=>c.split("/").filter(i=>i!==""),e=r(t),o=a?r(a):[];return"/"+o.map((c,i)=>e[i]).join("/")+"/"+n}function _(t,a,n,r){let e=[a,"data-"+a].reduce((o,c)=>{let i=t.getAttribute(c);return n&&t.removeAttribute(c),i===null?o:i},!1);return!r&&e===""?!0:e||r||!1}function Q(t){let a=t.split("&").map(n=>n.split("=")).reduce((n,r)=>{let e=r[0];if(!e)return n;let o=r.length>1?r[r.length-1]:!0;return typeof o=="string"&&o.includes(",")&&(o=o.split(",")),n[e]===void 0?n[e]=[o]:n[e].push(o),n},{});return Object.entries(a).reduce((n,r)=>(n[r[0]]=r[1].length>1?r[1]:r[1][0],n),{})}function V(t){throw new Error("[Tinro] "+t)}var S=1,M=2,q=3,X=4;function $(t,a,n,r){return t===S?a&&a():t===M?n&&n():r&&r()}function ee(){return!window||window.location.pathname==="srcdoc"?q:S}var h={HISTORY:S,HASH:M,MEMORY:q,OFF:X,run:$,getDeafault:ee},z,x,p=te();function te(){let t=h.getDeafault(),a,n=o=>window.onhashchange=window.onpopstate=x=null,r=o=>a&&a(F(t));function e(o){o&&(t=o),n(),t!==h.OFF&&h.run(t,c=>window.onpopstate=r,c=>window.onhashchange=r)&&r()}return{mode:o=>e(o),get:o=>F(t),go(o){console.log("go(href)"),ae(t,o),r()},replace(o){console.log("going to replace 3"),re(t,o),r()},start(o){a=o,e()},stop(){a=null,e(h.OFF)}}}function re(t,a){console.log("Replacing location"),h.run(t,n=>history.replaceState({},"",a),n=>window.location.hash=a,n=>x=a)}function ae(t,a){console.log("SET LOCATION (new)"),h.run(t,n=>history.pushState({},"",a),n=>window.location.hash=a,n=>x=a)}function F(t){let a=z,n=z=h.run(t,e=>window.location.pathname+window.location.search,e=>String(window.location.hash.slice(1)||"/"),e=>x||"/"),r=n.match(/^([^?#]+)(?:\?([^#]+))?(?:\#(.+))?$/);return{url:n,from:a,path:r[1]||"",query:Q(r[2]||""),hash:r[3]||""}}function T(t){let a=d.getContext("tinro");a&&(a.exact||a.fallback)&&V(`${t.fallback?"<Route fallback>":`<Route path="${t.path}">`}  can't be inside ${a.fallback?"<Route fallback>":`<Route path="${a.path||"/"}"> with exact path`}`);let n=t.fallback?"fallbacks":"childs",r=E.writable({}),e={router:{},exact:!1,pattern:null,meta:{},parent:a,fallback:t.fallback,redirect:!1,replace:!1,firstmatch:!1,breadcrumb:null,matched:!1,childs:new Set,activeChilds:new Set,fallbacks:new Set,update(o){e.exact=!o.path.endsWith("/*"),e.pattern=R(`${e.parent&&e.parent.pattern||""}${o.path}`),e.redirect=o.redirect,e.replace=o.replace,e.firstmatch=o.firstmatch,e.breadcrumb=o.breadcrumb,e.match()},register:()=>{if(e.parent)return e.parent[n].add(e),()=>{e.parent[n].delete(e),e.router.un&&e.router.un()}},show:()=>{t.onShow(),!e.fallback&&e.parent&&e.parent.activeChilds.add(e)},hide:()=>{t.onHide(),!e.fallback&&e.parent&&e.parent.activeChilds.delete(e)},match:async()=>{e.matched=!1;let{path:o,url:c,from:i,query:g}=e.router,u=W(e.pattern,o);if(console.log(e),!e.fallback&&u&&(e.redirect||e.replace)&&(!e.exact||e.exact&&u.exact)){await d.tick();let f=A(o,e.parent&&e.parent.pattern,e.redirect);return e.redirect?(console.log("going going gone"),b.goto(f)):(console.log("in here redirect 1"),b.replaceWith(f))}if(e.meta=u&&{from:i,url:c,query:g,match:u.part,pattern:e.pattern,breadcrumbs:e.parent&&e.parent.meta&&e.parent.meta.breadcrumbs.slice()||[],params:u.params,subscribe:r.subscribe},e.breadcrumb&&e.meta&&e.meta.breadcrumbs.push({name:e.breadcrumb,path:u.part}),r.set(e.meta),u&&!e.fallback&&(!e.exact||e.exact&&u.exact)&&(!e.parent||!e.parent.firstmatch||!e.parent.matched)?(t.onMeta(e.meta),e.parent&&(e.parent.matched=!0),e.show()):e.hide(),await d.tick(),u&&!e.fallback&&(e.childs.size>0&&e.activeChilds.size==0||e.childs.size==0&&e.fallbacks.size>0)){let f=e;for(;f.fallbacks.size==0;)if(f=f.parent,!f)return;f&&f.fallbacks.forEach(m=>{if(m.redirect||m.replace){let w=A("/",m.parent&&m.parent.pattern,m.redirect);m.redirect?(console.log("in here redirect 2"),console.log("going going gone"),b.goto(w)):(console.log("in here replace 2"),b.replaceWith(w))}else m.show()})}}};return d.setContext("tinro",e),d.onMount(()=>e.register()),e.router.un=b.subscribe(o=>{e.router.path=o.path,e.router.url=o.url,e.router.query=o.query,e.router.from=o.from,e.pattern!==null&&e.match()}),e}function y(){return d.getContext("tinro").meta}var b=ne();function ne(){let{subscribe:t}=C.writable(p.get(),a=>{p.start(a),console.log("setting up some listener");let n=oe(p.go);return()=>{p.stop(),n()}});return{subscribe:t,goto:a=>p.go(a),replaceWith:a=>p.replace(a),params:le,meta:y,useHashNavigation:a=>p.mode(a?h.HASH:h.HISTORY),mode:{hash:()=>p.mode(h.HASH),history:()=>p.mode(h.HISTORY),memory:()=>p.mode(h.MEMORY)}}}function j(t){let a=_(t,"href"),n=_(t,"exact",!0),r=_(t,"active-class",!0,"active");return{destroy:b.subscribe(e=>{let o=W(a,e.path);o&&(o.exact&&n||!n)?t.classList.add(r):t.classList.remove(r)})}}function oe(t){let a=n=>{let r=n.target.closest("a[href]"),e=r&&_(r,"target",!1,"_self"),o=r&&_(r,"tinro-ignore"),c=n.ctrlKey||n.metaKey||n.altKey||n.shiftKey;if(e=="_self"&&!o&&!c&&r){let i=r.getAttribute("href").replace(/^\/#/,"");/^\/\/|^[a-zA-Z]+:/.test(i)||(n.preventDefault(),t(i.startsWith("/")?i:r.href.replace(window.location.origin,"")))}};return addEventListener("click",a),()=>removeEventListener("click",a)}function le(){return H.getContext("tinro").meta.params}var ie=t=>({params:t&2,meta:t&4}),L=t=>({params:t[1],meta:t[2]});function Y(t){let a,n=t[9].default,r=l.create_slot(n,t,t[8],L);return{c(){r&&r.c()},m(e,o){r&&r.m(e,o),a=!0},p(e,o){r&&r.p&&o&262&&l.update_slot(r,n,e,e[8],o,ie,L)},i(e){a||(l.transition_in(r,e),a=!0)},o(e){l.transition_out(r,e),a=!1},d(e){r&&r.d(e)}}}function ce(t){let a,n,r=t[0]&&Y(t);return{c(){r&&r.c(),a=l.empty()},m(e,o){r&&r.m(e,o),l.insert(e,a,o),n=!0},p(e,[o]){e[0]?r?(r.p(e,o),o&1&&l.transition_in(r,1)):(r=Y(e),r.c(),l.transition_in(r,1),r.m(a.parentNode,a)):r&&(l.group_outros(),l.transition_out(r,1,1,()=>{r=null}),l.check_outros())},i(e){n||(l.transition_in(r),n=!0)},o(e){l.transition_out(r),n=!1},d(e){r&&r.d(e),e&&l.detach(a)}}}function se(t,a,n){let{$$slots:r={},$$scope:e}=a,{path:o="/*"}=a,{fallback:c=!1}=a,{redirect:i=!1}=a,{firstmatch:g=!1}=a,{breadcrumb:u=null}=a,f=!1,m={},w={},D=T({fallback:c,onShow(){n(0,f=!0)},onHide(){n(0,f=!1)},onMeta(s){n(2,w=s),n(1,m=w.params)}});return t.$$set=s=>{"path"in s&&n(3,o=s.path),"fallback"in s&&n(4,c=s.fallback),"redirect"in s&&n(5,i=s.redirect),"firstmatch"in s&&n(6,g=s.firstmatch),"breadcrumb"in s&&n(7,u=s.breadcrumb),"$$scope"in s&&n(8,e=s.$$scope)},t.$$.update=()=>{if(t.$$.dirty&232){e:D.update({path:o,redirect:i,firstmatch:g,breadcrumb:u})}},[f,m,w,o,c,i,g,u,e,r]}var I=class extends l.SvelteComponent{constructor(a){super();l.init(this,a,se,ce,l.safe_not_equal,{path:3,fallback:4,redirect:5,firstmatch:6,breadcrumb:7})}},K=I;

var P=Object.create,v=Object.defineProperty,U=Object.getPrototypeOf,Z=Object.prototype.hasOwnProperty,B=Object.getOwnPropertyNames,G=Object.getOwnPropertyDescriptor;var H=t=>v(t,"__esModule",{value:!0});var J=(t,a)=>{H(t);for(var n in a)v(t,n,{get:a[n],enumerable:!0})},Q=(t,a,n)=>{if(H(t),a&&typeof a=="object"||typeof a=="function")for(let r of B(a))!Z.call(t,r)&&r!=="default"&&v(t,r,{get:()=>a[r],enumerable:!(n=G(a,r))||n.enumerable});return t},k=t=>t&&t.__esModule?t:Q(v(t!=null?P(U(t)):{},"default",{value:t,enumerable:!0}),t);J(exports,{Route:()=>D,active:()=>L,meta:()=>O,router:()=>b});var l=k(require("svelte/internal"));var C=k(require("svelte")),E=k(require("svelte/store")),d=k(require("svelte")),W=k(require("svelte/store"));function S(t,a=!1){return t=t.slice(t.startsWith("/#")?2:0,t.endsWith("/*")?-2:void 0),t.startsWith("/")||(t="/"+t),t==="/"&&(t=""),a&&!t.endsWith("/")&&(t+="/"),t}function A(t,a){t=S(t,!0),a=S(a,!0);let n=[],r={},e=!0,o=t.split("/").map(i=>i.startsWith(":")?(n.push(i.slice(1)),"([^\\/]+)"):i).join("\\/"),c=a.match(new RegExp(`^${o}$`));return c||(e=!1,c=a.match(new RegExp(`^${o}`))),c?(n.forEach((i,g)=>r[i]=c[g+1]),{exact:e,params:r,part:c[0].slice(0,-1)}):null}function M(t,a,n){if(n==="")return t;if(n[0]==="/")return n;let r=c=>c.split("/").filter(i=>i!==""),e=r(t),o=a?r(a):[];return"/"+o.map((c,i)=>e[i]).join("/")+"/"+n}function _(t,a,n,r){let e=[a,"data-"+a].reduce((o,c)=>{let i=t.getAttribute(c);return n&&t.removeAttribute(c),i===null?o:i},!1);return!r&&e===""?!0:e||r||!1}function V(t){let a=t.split("&").map(n=>n.split("=")).reduce((n,r)=>{let e=r[0];if(!e)return n;let o=r.length>1?r[r.length-1]:!0;return typeof o=="string"&&o.includes(",")&&(o=o.split(",")),n[e]===void 0?n[e]=[o]:n[e].push(o),n},{});return Object.entries(a).reduce((n,r)=>(n[r[0]]=r[1].length>1?r[1]:r[1][0],n),{})}function X(t){throw new Error("[Tinro] "+t)}var y=1,q=2,z=3,$=4;function ee(t,a,n,r){return t===y?a&&a():t===q?n&&n():r&&r()}function te(){return!window||window.location.pathname==="srcdoc"?z:y}var h={HISTORY:y,HASH:q,MEMORY:z,OFF:$,run:ee,getDeafault:te},F,x,p=re();function re(){let t=h.getDeafault(),a,n=o=>window.onhashchange=window.onpopstate=x=null,r=o=>a&&a(T(t));function e(o){o&&(t=o),n(),t!==h.OFF&&h.run(t,c=>window.onpopstate=r,c=>window.onhashchange=r)&&r()}return{mode:o=>e(o),get:o=>T(t),go(o){console.log("go(href)"),ne(t,o),r()},replace(o){console.log("going to replace 3"),ae(t,o),r()},start(o){a=o,e()},stop(){a=null,e(h.OFF)}}}function ae(t,a){console.log("Replacing location"),h.run(t,n=>history.replaceState({},"",a),n=>window.location.hash=a,n=>x=a)}function ne(t,a){console.log("SET LOCATION (new)"),h.run(t,n=>history.pushState({},"",a),n=>window.location.hash=a,n=>x=a)}function T(t){let a=F,n=F=h.run(t,e=>window.location.pathname+window.location.search,e=>String(window.location.hash.slice(1)||"/"),e=>x||"/"),r=n.match(/^([^?#]+)(?:\?([^#]+))?(?:\#(.+))?$/);return{url:n,from:a,path:r[1]||"",query:V(r[2]||""),hash:r[3]||""}}function j(t){let a=d.getContext("tinro");a&&(a.exact||a.fallback)&&X(`${t.fallback?"<Route fallback>":`<Route path="${t.path}">`}  can't be inside ${a.fallback?"<Route fallback>":`<Route path="${a.path||"/"}"> with exact path`}`);let n=t.fallback?"fallbacks":"childs",r=W.writable({}),e={router:{},exact:!1,pattern:null,meta:{},parent:a,fallback:t.fallback,redirect:!1,replace:!1,firstmatch:!1,breadcrumb:null,matched:!1,childs:new Set,activeChilds:new Set,fallbacks:new Set,update(o){e.exact=!o.path.endsWith("/*"),e.pattern=S(`${e.parent&&e.parent.pattern||""}${o.path}`),e.redirect=o.redirect,e.replace=o.replace,e.firstmatch=o.firstmatch,e.breadcrumb=o.breadcrumb,e.match()},register:()=>{if(e.parent)return e.parent[n].add(e),()=>{e.parent[n].delete(e),e.router.un&&e.router.un()}},show:()=>{t.onShow(),!e.fallback&&e.parent&&e.parent.activeChilds.add(e)},hide:()=>{t.onHide(),!e.fallback&&e.parent&&e.parent.activeChilds.delete(e)},match:async()=>{e.matched=!1;let{path:o,url:c,from:i,query:g}=e.router,u=A(e.pattern,o);if(console.log("route",e),!e.fallback&&u&&(e.redirect||e.replace)&&(!e.exact||e.exact&&u.exact)){await d.tick();let f=M(o,e.parent&&e.parent.pattern,e.redirect);return e.redirect?(console.log("going going gone"),b.goto(f)):(console.log("in here redirect 1"),b.replaceWith(f))}if(e.meta=u&&{from:i,url:c,query:g,match:u.part,pattern:e.pattern,breadcrumbs:e.parent&&e.parent.meta&&e.parent.meta.breadcrumbs.slice()||[],params:u.params,subscribe:r.subscribe},e.breadcrumb&&e.meta&&e.meta.breadcrumbs.push({name:e.breadcrumb,path:u.part}),r.set(e.meta),u&&!e.fallback&&(!e.exact||e.exact&&u.exact)&&(!e.parent||!e.parent.firstmatch||!e.parent.matched)?(t.onMeta(e.meta),e.parent&&(e.parent.matched=!0),e.show()):e.hide(),await d.tick(),u&&!e.fallback&&(e.childs.size>0&&e.activeChilds.size==0||e.childs.size==0&&e.fallbacks.size>0)){let f=e;for(;f.fallbacks.size==0;)if(f=f.parent,!f)return;f&&f.fallbacks.forEach(m=>{if(m.redirect||m.replace){let w=M("/",m.parent&&m.parent.pattern,m.redirect);m.redirect?(console.log("in here redirect 2"),console.log("going going gone"),b.goto(w)):(console.log("in here replace 2"),b.replaceWith(w))}else m.show()})}}};return d.setContext("tinro",e),d.onMount(()=>e.register()),e.router.un=b.subscribe(o=>{e.router.path=o.path,e.router.url=o.url,e.router.query=o.query,e.router.from=o.from,e.pattern!==null&&e.match()}),e}function O(){return d.getContext("tinro").meta}var b=oe();function oe(){let{subscribe:t}=E.writable(p.get(),a=>{p.start(a),console.log("setting up some listener");let n=le(p.go);return()=>{p.stop(),n()}});return{subscribe:t,goto:a=>p.go(a),replaceWith:a=>p.replace(a),params:ie,meta:O,useHashNavigation:a=>p.mode(a?h.HASH:h.HISTORY),mode:{hash:()=>p.mode(h.HASH),history:()=>p.mode(h.HISTORY),memory:()=>p.mode(h.MEMORY)}}}function L(t){let a=_(t,"href"),n=_(t,"exact",!0),r=_(t,"active-class",!0,"active");return{destroy:b.subscribe(e=>{let o=A(a,e.path);o&&(o.exact&&n||!n)?t.classList.add(r):t.classList.remove(r)})}}function le(t){let a=n=>{let r=n.target.closest("a[href]"),e=r&&_(r,"target",!1,"_self"),o=r&&_(r,"tinro-ignore"),c=n.ctrlKey||n.metaKey||n.altKey||n.shiftKey;if(e=="_self"&&!o&&!c&&r){let i=r.getAttribute("href").replace(/^\/#/,"");/^\/\/|^[a-zA-Z]+:/.test(i)||(n.preventDefault(),t(i.startsWith("/")?i:r.href.replace(window.location.origin,"")))}};return addEventListener("click",a),()=>removeEventListener("click",a)}function ie(){return C.getContext("tinro").meta.params}var ce=t=>({params:t&2,meta:t&4}),Y=t=>({params:t[1],meta:t[2]});function I(t){let a,n=t[10].default,r=l.create_slot(n,t,t[9],Y);return{c(){r&&r.c()},m(e,o){r&&r.m(e,o),a=!0},p(e,o){r&&r.p&&o&518&&l.update_slot(r,n,e,e[9],o,ce,Y)},i(e){a||(l.transition_in(r,e),a=!0)},o(e){l.transition_out(r,e),a=!1},d(e){r&&r.d(e)}}}function se(t){let a,n,r=t[0]&&I(t);return{c(){r&&r.c(),a=l.empty()},m(e,o){r&&r.m(e,o),l.insert(e,a,o),n=!0},p(e,[o]){e[0]?r?(r.p(e,o),o&1&&l.transition_in(r,1)):(r=I(e),r.c(),l.transition_in(r,1),r.m(a.parentNode,a)):r&&(l.group_outros(),l.transition_out(r,1,1,()=>{r=null}),l.check_outros())},i(e){n||(l.transition_in(r),n=!0)},o(e){l.transition_out(r),n=!1},d(e){r&&r.d(e),e&&l.detach(a)}}}function ue(t,a,n){let{$$slots:r={},$$scope:e}=a,{path:o="/*"}=a,{fallback:c=!1}=a,{redirect:i=!1}=a,{replace:g=!1}=a,{firstmatch:u=!1}=a,{breadcrumb:f=null}=a,m=!1,w={},R={},N=j({fallback:c,onShow(){n(0,m=!0)},onHide(){n(0,m=!1)},onMeta(s){n(2,R=s),n(1,w=R.params)}});return t.$$set=s=>{"path"in s&&n(3,o=s.path),"fallback"in s&&n(4,c=s.fallback),"redirect"in s&&n(5,i=s.redirect),"replace"in s&&n(6,g=s.replace),"firstmatch"in s&&n(7,u=s.firstmatch),"breadcrumb"in s&&n(8,f=s.breadcrumb),"$$scope"in s&&n(9,e=s.$$scope)},t.$$.update=()=>{if(t.$$.dirty&488){e:N.update({path:o,redirect:i,replace:g,firstmatch:u,breadcrumb:f})}},[m,w,R,o,c,i,g,u,f,e,r]}var K=class extends l.SvelteComponent{constructor(a){super();l.init(this,a,ue,se,l.safe_not_equal,{path:3,fallback:4,redirect:5,replace:6,firstmatch:7,breadcrumb:8})}},D=K;

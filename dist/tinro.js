var N=Object.create,v=Object.defineProperty,P=Object.getPrototypeOf,U=Object.prototype.hasOwnProperty,Z=Object.getOwnPropertyNames,B=Object.getOwnPropertyDescriptor;var O=e=>v(e,"__esModule",{value:!0});var G=(e,a)=>{O(e);for(var n in a)v(e,n,{get:a[n],enumerable:!0})},J=(e,a,n)=>{if(O(e),a&&typeof a=="object"||typeof a=="function")for(let r of Z(a))!U.call(e,r)&&r!=="default"&&v(e,r,{get:()=>a[r],enumerable:!(n=B(a,r))||n.enumerable});return e},k=e=>e&&e.__esModule?e:J(v(e!=null?N(P(e)):{},"default",{value:e,enumerable:!0}),e);G(exports,{Route:()=>K,active:()=>j,meta:()=>y,router:()=>b});var i=k(require("svelte/internal"));var H=k(require("svelte")),C=k(require("svelte/store")),d=k(require("svelte")),E=k(require("svelte/store"));function R(e,a=!1){return e=e.slice(e.startsWith("/#")?2:0,e.endsWith("/*")?-2:void 0),e.startsWith("/")||(e="/"+e),e==="/"&&(e=""),a&&!e.endsWith("/")&&(e+="/"),e}function W(e,a){e=R(e,!0),a=R(a,!0);let n=[],r={},t=!0,l=e.split("/").map(o=>o.startsWith(":")?(n.push(o.slice(1)),"([^\\/]+)"):o).join("\\/"),c=a.match(new RegExp(`^${l}$`));return c||(t=!1,c=a.match(new RegExp(`^${l}`))),c?(n.forEach((o,g)=>r[o]=c[g+1]),{exact:t,params:r,part:c[0].slice(0,-1)}):null}function A(e,a,n){if(n==="")return e;if(n[0]==="/")return n;let r=c=>c.split("/").filter(o=>o!==""),t=r(e),l=a?r(a):[];return"/"+l.map((c,o)=>t[o]).join("/")+"/"+n}function _(e,a,n,r){let t=[a,"data-"+a].reduce((l,c)=>{let o=e.getAttribute(c);return n&&e.removeAttribute(c),o===null?l:o},!1);return!r&&t===""?!0:t||r||!1}function Q(e){let a=e.split("&").map(n=>n.split("=")).reduce((n,r)=>{let t=r[0];if(!t)return n;let l=r.length>1?r[r.length-1]:!0;return typeof l=="string"&&l.includes(",")&&(l=l.split(",")),n[t]===void 0?n[t]=[l]:n[t].push(l),n},{});return Object.entries(a).reduce((n,r)=>(n[r[0]]=r[1].length>1?r[1]:r[1][0],n),{})}function V(e){throw new Error("[Tinro] "+e)}var S=1,M=2,q=3,X=4;function $(e,a,n,r){return e===S?a&&a():e===M?n&&n():r&&r()}function tt(){return!window||window.location.pathname==="srcdoc"?q:S}var h={HISTORY:S,HASH:M,MEMORY:q,OFF:X,run:$,getDeafault:tt},z,x,p=et();function et(){let e=h.getDeafault(),a,n=l=>window.onhashchange=window.onpopstate=x=null,r=l=>a&&a(F(e));function t(l){l&&(e=l),n(),e!==h.OFF&&h.run(e,c=>window.onpopstate=r,c=>window.onhashchange=r)&&r()}return{mode:l=>t(l),get:l=>F(e),go(l){at(e,l),r()},replace(l){console.log("going to replace 3"),rt(e,l),r()},start(l){a=l,t()},stop(){a=null,t(h.OFF)}}}function rt(e,a){console.log("Replacing location"),h.run(e,n=>history.replaceState({},"",a),n=>window.location.hash=a,n=>x=a)}function at(e,a){console.log("SET LOCATION"),h.run(e,n=>history.pushState({},"",a),n=>window.location.hash=a,n=>x=a)}function F(e){let a=z,n=z=h.run(e,t=>window.location.pathname+window.location.search,t=>String(window.location.hash.slice(1)||"/"),t=>x||"/"),r=n.match(/^([^?#]+)(?:\?([^#]+))?(?:\#(.+))?$/);return{url:n,from:a,path:r[1]||"",query:Q(r[2]||""),hash:r[3]||""}}function T(e){let a=d.getContext("tinro");a&&(a.exact||a.fallback)&&V(`${e.fallback?"<Route fallback>":`<Route path="${e.path}">`}  can't be inside ${a.fallback?"<Route fallback>":`<Route path="${a.path||"/"}"> with exact path`}`);let n=e.fallback?"fallbacks":"childs",r=E.writable({}),t={router:{},exact:!1,pattern:null,meta:{},parent:a,fallback:e.fallback,redirect:!1,replace:!1,firstmatch:!1,breadcrumb:null,matched:!1,childs:new Set,activeChilds:new Set,fallbacks:new Set,update(l){t.exact=!l.path.endsWith("/*"),t.pattern=R(`${t.parent&&t.parent.pattern||""}${l.path}`),t.redirect=l.redirect,t.replace=l.replace,t.firstmatch=l.firstmatch,t.breadcrumb=l.breadcrumb,t.match()},register:()=>{if(t.parent)return t.parent[n].add(t),()=>{t.parent[n].delete(t),t.router.un&&t.router.un()}},show:()=>{e.onShow(),!t.fallback&&t.parent&&t.parent.activeChilds.add(t)},hide:()=>{e.onHide(),!t.fallback&&t.parent&&t.parent.activeChilds.delete(t)},match:async()=>{t.matched=!1;let{path:l,url:c,from:o,query:g}=t.router,u=W(t.pattern,l);if(console.log(t),!t.fallback&&u&&(t.redirect||t.replace)&&(!t.exact||t.exact&&u.exact)){await d.tick();let f=A(l,t.parent&&t.parent.pattern,t.redirect);return t.redirect?b.goto(f):(console.log("in here redirect 1"),b.replaceWith(f))}if(t.meta=u&&{from:o,url:c,query:g,match:u.part,pattern:t.pattern,breadcrumbs:t.parent&&t.parent.meta&&t.parent.meta.breadcrumbs.slice()||[],params:u.params,subscribe:r.subscribe},t.breadcrumb&&t.meta&&t.meta.breadcrumbs.push({name:t.breadcrumb,path:u.part}),r.set(t.meta),u&&!t.fallback&&(!t.exact||t.exact&&u.exact)&&(!t.parent||!t.parent.firstmatch||!t.parent.matched)?(e.onMeta(t.meta),t.parent&&(t.parent.matched=!0),t.show()):t.hide(),await d.tick(),u&&!t.fallback&&(t.childs.size>0&&t.activeChilds.size==0||t.childs.size==0&&t.fallbacks.size>0)){let f=t;for(;f.fallbacks.size==0;)if(f=f.parent,!f)return;f&&f.fallbacks.forEach(m=>{if(m.redirect||m.replace){let w=A("/",m.parent&&m.parent.pattern,m.redirect);m.redirect?(console.log("in here redirect 2"),b.goto(w)):(console.log("in here replace 2"),b.replaceWith(w))}else m.show()})}}};return d.setContext("tinro",t),d.onMount(()=>t.register()),t.router.un=b.subscribe(l=>{t.router.path=l.path,t.router.url=l.url,t.router.query=l.query,t.router.from=l.from,t.pattern!==null&&t.match()}),t}function y(){return d.getContext("tinro").meta}var b=nt();function nt(){let{subscribe:e}=C.writable(p.get(),a=>{p.start(a);let n=lt(p.go);return()=>{p.stop(),n()}});return{subscribe:e,goto:a=>p.go(a),replaceWith:a=>p.replace(a),params:it,meta:y,useHashNavigation:a=>p.mode(a?h.HASH:h.HISTORY),mode:{hash:()=>p.mode(h.HASH),history:()=>p.mode(h.HISTORY),memory:()=>p.mode(h.MEMORY)}}}function j(e){let a=_(e,"href"),n=_(e,"exact",!0),r=_(e,"active-class",!0,"active");return{destroy:b.subscribe(t=>{let l=W(a,t.path);l&&(l.exact&&n||!n)?e.classList.add(r):e.classList.remove(r)})}}function lt(e){let a=n=>{let r=n.target.closest("a[href]"),t=r&&_(r,"target",!1,"_self"),l=r&&_(r,"tinro-ignore"),c=n.ctrlKey||n.metaKey||n.altKey||n.shiftKey;if(t=="_self"&&!l&&!c&&r){let o=r.getAttribute("href").replace(/^\/#/,"");/^\/\/|^[a-zA-Z]+:/.test(o)||(n.preventDefault(),e(o.startsWith("/")?o:r.href.replace(window.location.origin,"")))}};return addEventListener("click",a),()=>removeEventListener("click",a)}function it(){return H.getContext("tinro").meta.params}var ot=e=>({params:e&2,meta:e&4}),L=e=>({params:e[1],meta:e[2]});function Y(e){let a,n=e[9].default,r=i.create_slot(n,e,e[8],L);return{c(){r&&r.c()},m(t,l){r&&r.m(t,l),a=!0},p(t,l){r&&r.p&&l&262&&i.update_slot(r,n,t,t[8],l,ot,L)},i(t){a||(i.transition_in(r,t),a=!0)},o(t){i.transition_out(r,t),a=!1},d(t){r&&r.d(t)}}}function ct(e){let a,n,r=e[0]&&Y(e);return{c(){r&&r.c(),a=i.empty()},m(t,l){r&&r.m(t,l),i.insert(t,a,l),n=!0},p(t,[l]){t[0]?r?(r.p(t,l),l&1&&i.transition_in(r,1)):(r=Y(t),r.c(),i.transition_in(r,1),r.m(a.parentNode,a)):r&&(i.group_outros(),i.transition_out(r,1,1,()=>{r=null}),i.check_outros())},i(t){n||(i.transition_in(r),n=!0)},o(t){i.transition_out(r),n=!1},d(t){r&&r.d(t),t&&i.detach(a)}}}function st(e,a,n){let{$$slots:r={},$$scope:t}=a,{path:l="/*"}=a,{fallback:c=!1}=a,{redirect:o=!1}=a,{firstmatch:g=!1}=a,{breadcrumb:u=null}=a,f=!1,m={},w={},D=T({fallback:c,onShow(){n(0,f=!0)},onHide(){n(0,f=!1)},onMeta(s){n(2,w=s),n(1,m=w.params)}});return e.$$set=s=>{"path"in s&&n(3,l=s.path),"fallback"in s&&n(4,c=s.fallback),"redirect"in s&&n(5,o=s.redirect),"firstmatch"in s&&n(6,g=s.firstmatch),"breadcrumb"in s&&n(7,u=s.breadcrumb),"$$scope"in s&&n(8,t=s.$$scope)},e.$$.update=()=>{if(e.$$.dirty&232){t:D.update({path:l,redirect:o,firstmatch:g,breadcrumb:u})}},[f,m,w,l,c,o,g,u,t,r]}var I=class extends i.SvelteComponent{constructor(a){super();i.init(this,a,st,ct,i.safe_not_equal,{path:3,fallback:4,redirect:5,firstmatch:6,breadcrumb:7})}},K=I;

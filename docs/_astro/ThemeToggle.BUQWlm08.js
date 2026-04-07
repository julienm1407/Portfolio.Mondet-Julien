import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DiEladB3.js";import{c as n}from"./createLucideIcon.CwmzuxcN.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=n("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=n("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),l="portfolio-theme";function y(){const[m,c]=r.useState(!1),[t,a]=r.useState(!1);r.useEffect(()=>{c(!0),a(document.documentElement.classList.contains("dark"))},[]);const d=()=>{const o=document.documentElement,s=!o.classList.contains("dark");o.classList.toggle("dark",s);try{localStorage.setItem(l,s?"dark":"light")}catch{}a(s)};return e.jsx("button",{type:"button",onClick:d,className:"fixed right-4 top-4 z-[100] flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink shadow-card transition hover:border-primary/35 hover:text-primary sm:right-5 sm:top-5 sm:h-11 sm:w-11","aria-label":t?"Passer en mode jour":"Passer en mode nuit",title:t?"Mode jour":"Mode nuit",children:m?t?e.jsx(h,{className:"h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5",strokeWidth:2.25,"aria-hidden":!0}):e.jsx(i,{className:"h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5",strokeWidth:2.25,"aria-hidden":!0}):e.jsx("span",{className:"h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5","aria-hidden":!0})})}export{y as ThemeToggle};

import{j as t,c as a,R as i}from"./client-DXzp9lcG.js";const c="/assets/Tsrpj1ULCwemwDaJEHXcGh3rG9nOrs6P-CwcQMK0O.png";function l(){const s=(e,n)=>{const o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:e,contents:n})};fetch("/notes",o).then(r=>r.json)};return t.jsxs(t.Fragment,{children:[t.jsx("div",{children:t.jsx("a",{href:"",target:"_blank",children:t.jsx("img",{src:c,className:"logo",alt:"React logo"})})}),t.jsx("h1",{children:"OFS"}),t.jsxs("div",{className:"card",children:[t.jsxs("form",{onSubmit:e=>{e.preventDefault(),s(e.target.title.value,e.target.contents.value)},children:[t.jsxs("label",{children:["Note Title:",t.jsx("input",{type:"text",name:"title"})]}),t.jsx("br",{}),t.jsxs("label",{children:["Note Contents:",t.jsx("input",{type:"text",name:"contents"})]}),t.jsx("br",{}),t.jsx("input",{type:"submit",value:"Submit"})]}),t.jsx("p",{children:"Test Sending Post Request to Backend Server & Database"})]})]})}a.createRoot(document.getElementById("root")).render(t.jsx(i.StrictMode,{children:t.jsx(l,{})}));

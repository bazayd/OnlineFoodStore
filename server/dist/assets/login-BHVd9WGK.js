import{j as e,c as i,R as a}from"./client-CYooLA_G.js";import{O as d}from"./OFS Logo-D2InKytt.js";function c(){const n=(t,r)=>{const o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:r})};fetch("/users/login",o).then(s=>(s.status==200,s.json())).then(s=>{document.getElementById("loginBackendResponse").textContent=s.message})};return e.jsx(e.Fragment,{children:e.jsxs("div",{children:[e.jsx("a",{href:"/MainPage/",children:e.jsx("img",{href:"/MainPage/",src:d,alt:"OFS Logos",id:"OFSLogo"})}),e.jsxs("form",{onSubmit:t=>{t.preventDefault(),n(t.target.user.value,t.target.pass.value)},children:[e.jsx("input",{type:"text",name:"user",placeholder:"Username",required:!0}),e.jsx("br",{}),e.jsx("input",{type:"password",name:"pass",placeholder:"Password",required:!0}),e.jsx("br",{}),e.jsx("input",{type:"submit",value:"Login",id:"loginBtn"}),e.jsx("br",{}),e.jsx("div",{id:"loginBackendResponse"}),e.jsxs("div",{id:"newUserCont",children:[e.jsx("p",{children:e.jsx("strong",{children:"New User? → "})}),e.jsx("button",{type:"button",onClick:()=>window.location.href="/register/",children:"Register"})]})]})]})})}i.createRoot(document.getElementById("root")).render(e.jsx(a.StrictMode,{children:e.jsx(c,{})}));
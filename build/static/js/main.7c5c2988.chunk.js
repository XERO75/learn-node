(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(2),a=t(14),u=t.n(a),r=t(3),i=t(4),o=t.n(i),j="/api/persons",s=function(){return o.a.get(j).then((function(e){return e.data}))},b=function(e){return o.a.post(j,e).then((function(e){return e.data}))},l=function(e,n){return o.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},h=t(0),d=function(e){var n=e.searchValue,t=e.handleChange;return Object(h.jsx)("div",{children:Object(h.jsxs)("form",{children:["filter shown with: ",Object(h.jsx)("input",{value:n,onChange:t})]})})},O=function(e){var n=e.handleSubmit,t=e.nameValue,c=e.numValue,a=e.nameChange,u=e.numChange;return Object(h.jsx)("div",{children:Object(h.jsxs)("form",{onSubmit:n,children:[Object(h.jsxs)("div",{children:["name: ",Object(h.jsx)("input",{value:t,onChange:a}),Object(h.jsx)("br",{}),"number: ",Object(h.jsx)("input",{value:c,onChange:u})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"add"})})]})})},f=function(e){var n=e.value;return Object(h.jsx)("div",{children:Object(h.jsx)("ul",{children:n.map((function(e){return Object(h.jsxs)("li",{children:[e.name," ",e.number]},e.id)}))})})},m=function(){var e=Object(c.useState)([]),n=Object(r.a)(e,2),t=n[0],a=n[1],u=Object(c.useState)(""),i=Object(r.a)(u,2),o=i[0],j=i[1],m=Object(c.useState)(""),v=Object(r.a)(m,2),x=v[0],g=v[1],p=Object(c.useState)(""),C=Object(r.a)(p,2),S=C[0],w=C[1],V=Object(c.useState)(t),J=Object(r.a)(V,2),k=J[0],y=J[1];Object(c.useEffect)((function(){s().then((function(e){y(e),a(e)})).catch((function(e){console.log(e)}))}),[]);return Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"Phonebook"}),Object(h.jsx)(d,{value:S,handleChange:function(e){w(e.target.value),e.target.value?y(t.filter((function(n){return e.target.value.toLowerCase()===n.name.toLowerCase()}))):y(t)}}),Object(h.jsx)("h2",{children:"add a new"}),Object(h.jsx)(O,{handleSubmit:function(e){e.preventDefault();var n={name:o,number:x},c=t.find((function(e){return e.name===o}));c?l(c.id,n).then((function(e){console.log(e)})):(b(n).then((function(e){console.log(e)})),a(t.concat(n)),y(JSON.parse(JSON.stringify(t.concat(n)))),j(""),g(""))},nameValue:o,numValue:x,nameChange:function(e){j(e.target.value)},numChange:function(e){g(e.target.value)}}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)(f,{value:k})]})};t(38);u.a.render(Object(h.jsx)(m,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.7c5c2988.chunk.js.map
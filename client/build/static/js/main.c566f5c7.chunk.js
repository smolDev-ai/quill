(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{16:function(e,t,a){e.exports=a(33)},21:function(e,t,a){},22:function(e,t,a){},33:function(e,t,a){"use strict";a.r(t);var n=a(4),o=a.n(n),c=a(14),r=a.n(c),i=(a(21),a(8)),s=a(10),l=a(15),u=(a(22),a(11));u.initializeApp({apiKey:"AIzaSyB-5ZQGHgcEWhW9vAGSiOfpq8Ed7ycWtDw",authDomain:"test-446ac.firebaseapp.com",databaseURL:"https://test-446ac.firebaseio.com",projectId:"test-446ac",storageBucket:"test-446ac.appspot.com",messagingSenderId:"895408803914",appId:"1:895408803914:web:fd55be269a0b51e87f56b3"});var p=function(){var e=Object(n.useState)({email:"",password:""}),t=Object(l.a)(e,2),a=t[0],c=t[1],r=function(e){console.log(a),c(Object(s.a)(Object(s.a)({},a),{},Object(i.a)({},e.target.name,e.target.value)))};return o.a.createElement("div",null,"Hello, world",o.a.createElement("form",{onSubmit:function(e){return function(e){var t=a.email,n=a.password;e.preventDefault(),console.log(a),u.auth().createUserWithEmailAndPassword(t,n).then((function(e){console.log(e)})).catch((function(e){return console.log("Failure on Sign Up",e.message)}))}(e)}},o.a.createElement("input",{type:"email",name:"email",onChange:r,value:a.email}),o.a.createElement("input",{type:"password",name:"password",onChange:r,value:a.password}),o.a.createElement("button",{type:"submit"},"Submit Form")))};r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(p,null)),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.c566f5c7.chunk.js.map
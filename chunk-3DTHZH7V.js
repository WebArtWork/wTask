import{a as P}from"./chunk-GQGGSREH.js";import{b as L,e as N}from"./chunk-UIH4WJTY.js";import{$a as j,B as m,E as r,F as S,G as w,J as k,L as c,La as y,P as n,Pa as I,Q as o,U as d,V as a,W as _,Wa as b,_a as x,bb as E,ca as f,eb as M,gb as T,m as v,pb as V,qb as F,r as p,s as h,ya as C}from"./chunk-CBKWH2IW.js";import"./chunk-GAL4ENT6.js";function O(t,q){if(t&1){let e=d();n(0,"span",9),a("click",function(){p(e);let i=_();return h(i.us.setMode("dark"))}),f(1," dark_mode "),o()}}function W(t,q){if(t&1){let e=d();n(0,"span",10),a("click",function(){p(e);let i=_();return h(i.us.setMode())}),f(1," light_mode "),o()}}var U=(()=>{class t{constructor(e,s,i,u,B,D,H,R,A){this.us=e,this.ui=s,this._alert=i,this._http=u,this._hash=B,this._router=D,this._form=H,this._translate=R,this._core=A,this.form=this._form.getForm("sign",{formId:"sign",title:"Sign In / Sign Up",components:[{name:"Email",key:"email",focused:!0,required:!0,fields:[{name:"Placeholder",value:"Enter your email"},{name:"Label",value:"Email"}]},{name:"Password",key:"password",required:!0,fields:[{name:"Placeholder",value:"Enter your password"},{name:"Label",value:"Password"}]},{name:"Number",key:"resetPin",fields:[{name:"Placeholder",value:"Enter code from email"},{name:"Label",value:"code"}],hidden:!0},{name:"Button",fields:[{name:"Label",value:"Let's go"},{name:"Submit",value:!0},{name:"Click",value:()=>{this.submit()}}]}]}),this.user={email:"demo@webart.work",password:"asdasdasdasd",resetPin:null},this._set=l=>{if(l){this._core.emit("wipe");let g=l.token||"";g&&this._http.set("token",g),localStorage.setItem("waw_user",JSON.stringify(l)),this.us.setUser(l),this.us.get(),this._router.navigateByUrl("/mineprojects")}else this._alert.error({text:"Something went wrong"})}}submit(){!this.form.components[2].hidden&&this.user.resetPin?this.save():this.user.email||this._alert.error({text:this._translate.translate("Sign.Enter your email")}),this.ui.valid(this.user.email)?this.user.password?(this._hash.set("email",this.user.email),this._http.post("/api/user/status",this.user,e=>{e.email&&e.pass?this.login():e.email?this.reset():this.sign()})):this._alert.error({text:this._translate.translate("Sign.Enter your password")}):this._alert.error({text:this._translate.translate("Sign.Enter proper email")})}login(){this._http.post("/api/user/login",this.user,this._set.bind(this))}sign(){this._http.post("/api/user/sign",this.user,this._set.bind(this))}reset(){this._http.post("/api/user/request",this.user,()=>{this.form.components[2].hidden=!1}),this._alert.info({text:"Mail will sent to your email"})}save(){this._http.post("/api/user/change",this.user,e=>{e?this._alert.info({text:"Password successfully changed"}):this._alert.error({text:"Wrong Code"}),this.login()})}static{this.\u0275fac=function(s){return new(s||t)(r(P),r(M),r(j),r(x),r(E),r(y),r(V),r(T),r(b))}}static{this.\u0275cmp=S({type:t,selectors:[["ng-component"]],standalone:!1,decls:9,vars:4,consts:[[1,"auth-wrapper"],[1,"auth__wrap"],[1,"auth__img"],[3,"click"],[1,"auth__form"],[1,"auth"],["class","material-icons",3,"click",4,"ngIf"],["class","material-icons auth__icon",3,"click",4,"ngIf"],[3,"wSubmit","submition","config"],[1,"material-icons",3,"click"],[1,"material-icons","auth__icon",3,"click"]],template:function(s,i){s&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"icon-spider",3),a("click",function(){return i.us.setMode(i.us.mode?"":"dark")}),o()(),n(4,"div",4)(5,"div",5),k(6,O,2,0,"span",6)(7,W,2,0,"span",7),n(8,"wform",8),a("wSubmit",function(){return i.submit()}),o()()()()()),s&2&&(m(6),c("ngIf",!i.us.mode),m(),c("ngIf",i.us.mode),m(),c("submition",i.user)("config",i.form))},dependencies:[C,F,L],encapsulation:2})}}return t})();var z=[{path:"",component:U}],ne=(()=>{class t{static{this.\u0275fac=function(s){return new(s||t)}}static{this.\u0275mod=w({type:t})}static{this.\u0275inj=v({imports:[I.forChild(z),N]})}}return t})();export{ne as SignModule};

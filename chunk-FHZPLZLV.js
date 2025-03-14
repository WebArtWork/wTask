import{B as d,Ca as T,E as g,F as w,G as C,J as b,L as u,P as r,Pa as P,Q as o,V as c,Va as O,W as v,_a as S,ca as m,ea as _,fb as j,gb as k,hb as I,ib as A,jb as E,ka as M,m as h,ma as y,mb as F,nb as N,pb as D,sb as z,tb as B,ub as J,vb as L,wb as $}from"./chunk-CBKWH2IW.js";import"./chunk-GAL4ENT6.js";function W(n,f){if(n&1&&m(0),n&2){let t=f.$implicit;_(" ",t==null||t.slug==null?null:t.slug.split(".")[0]," ")}}function q(n,f){if(n&1&&(m(0),M(1,"translate")),n&2){let t=f.$implicit,e=v();_(" ",y(1,1,t==null?null:t.slug,e.ts.now)," ")}}var H=(()=>{class n{setPage(t){this.page=t,localStorage.setItem("page",t)}get rows(){return this.ts.words.filter(t=>this.page&&typeof t=="object"?this.page===t.slug.split(".")[0]:!0)}constructor(t,e,a){this.ts=t,this._form=e,this._http=a,this.columns=["page","word","translation"],this.form=this._form.getForm("translate",{formId:"translate",title:"Translate",components:[{name:"Text",key:"translate",focused:!0,fields:[{name:"Placeholder",value:"fill Translate"},{name:"Label",value:"Translate"},{name:"Textarea",value:!0}]}]}),this.formAll=this._form.getForm("translateAll",{formId:"translateAll",title:"Translate All",components:[{name:"Text",key:"words",fields:[{name:"Placeholder",value:"fill Translate"},{name:"Label",value:"Translate"},{name:"Textarea",value:!0}]},{name:"Text",key:"translates",focused:!0,fields:[{name:"Placeholder",value:"fill Translate"},{name:"Label",value:"Translate"},{name:"Textarea",value:!0}]}]}),this.config={update:i=>{this._form.modal(this.form,[],{translate:this.ts.translate(i.slug)}).then(l=>{this._http.post("/api/translate/create",{appId:this.ts.appId,slug:i.slug,lang:this.ts.language.code,translate:l.translate}),this.ts.translates[this.ts.language.code][i.slug]=l.translate,this.ts.reset()})}},this.pages=[{name:this.ts.translate("Common.All"),_id:""}].concat(this.ts.pages.map(i=>({name:i,_id:i}))),this.page=localStorage.getItem("page")||""}translateAll(t=!1){let e=t?this.rows.filter(s=>!this.ts.translates[this.ts.language.code][s.slug]):this.rows,a=JSON.stringify(e.map(s=>s.word)),i=e.map(s=>s.slug),l=JSON.stringify(e.map(s=>this.ts.translate(s.slug)));this._form.modal(this.formAll,[],{words:a,translates:l}).then(s=>{if(l===s.translates)return;let x=JSON.parse(s.translates);for(let p=0;p<i.length;p++)this._http.post("/api/translate/create",{appId:this.ts.appId,slug:i[p],lang:this.ts.language.code,translate:x[p]}),this.ts.translates[this.ts.language.code][i[p]]=x[p];this.ts.reset()})}set_language(t){this.ts.set_language(this.ts.languages.find(e=>e.code===t))}static{this.\u0275fac=function(e){return new(e||n)(g(k),g(D),g(S))}}static{this.\u0275cmp=w({type:n,selectors:[["ng-component"]],standalone:!1,decls:26,vars:7,consts:[[1,"container-fluid"],[1,"page-wrapper"],[1,"translate__top-inner"],[1,"translate__inner"],["for","",1,"formboxs"],["translate","",1,"formboxs_title"],["value","code",3,"modelChange","items","select"],[2,"width","300px",3,"modelChange","items","select"],[1,"translate__buttons"],[1,"translate__dawn-jcon",3,"click"],[1,"material-icons","ng-tns-c405976996-4"],["translate",""],[3,"columns","config","rows"],["cell","page"],["cell","translation"]],template:function(e,a){e&1&&(r(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"label",4)(5,"div",5),m(6," Common.Select language "),o(),r(7,"wselect",6),c("modelChange",function(l){return a.set_language(l)}),o()(),r(8,"label",4)(9,"div",5),m(10," Common.Select page "),o(),r(11,"wselect",7),c("modelChange",function(l){return a.setPage(l)}),o()()(),r(12,"div",8)(13,"wbutton",9),c("click",function(){return a.translateAll()}),r(14,"span",10),m(15," translate "),o(),r(16,"span",11),m(17,"Common.Translate all"),o()(),r(18,"wbutton",9),c("click",function(){return a.translateAll(!0)}),r(19,"span",10),m(20," translate "),o(),r(21,"span",11),m(22,"Common.Translate missed"),o()()()(),r(23,"wtable",12),b(24,W,1,1,"ng-template",13)(25,q,2,4,"ng-template",14),o()()()),e&2&&(d(7),u("items",a.ts.languages)("select",a.ts.language.code),d(4),u("items",a.pages)("select",a.page),d(12),u("columns",a.columns)("config",a.config)("rows",a.rows))},dependencies:[I,A,N,F,L,B],styles:['.translate__top-inner[_ngcontent-%COMP%]{width:100%;max-width:100vw;display:flex;background:var(--c-bg-secondary);padding:15px;align-items:end;flex-wrap:wrap;gap:20px;justify-content:space-between;border-radius:10px;margin:0 auto;position:relative}@media screen and (max-width: 1250px){.translate__top-inner[_ngcontent-%COMP%]{justify-content:center}}@media (max-width: 767px){.translate__top-inner[_ngcontent-%COMP%]{flex-direction:column;align-items:center;padding:15px}}.translate__top-inner[_ngcontent-%COMP%]:before{content:"";position:absolute;height:100px;width:100%;background-color:var(--c-bg-secondary);z-index:-1;left:0;right:0;bottom:-50px}.translate__btn[_ngcontent-%COMP%]{position:absolute;top:-5px;right:25px;font-size:23px}.translate__dawn-jcon[_ngcontent-%COMP%]   span.material-icons[_ngcontent-%COMP%]{padding-right:5px}.translate__buttons[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;gap:10px}@media (max-width: 575px){.translate__buttons[_ngcontent-%COMP%]{flex-direction:column}.translate__buttons[_ngcontent-%COMP%]   wbutton[_ngcontent-%COMP%]{width:100%}}.translate__inner[_ngcontent-%COMP%]{display:flex;gap:40px;flex-wrap:wrap}@media (max-width: 575px){.translate__inner[_ngcontent-%COMP%]{flex-direction:column;align-items:center;gap:20px}}.formboxs_label[_ngcontent-%COMP%]{width:100%;color:var(--c-text-primary);position:relative;display:flex;justify-content:space-between;padding-bottom:10px;padding-right:52px}.translate__main-wrap[_ngcontent-%COMP%]{justify-content:center}.translate__select[_ngcontent-%COMP%]{min-width:200px;max-width:200px;background:var(--c-grey);padding:5px;border:1px solid #7f8c8d;border-radius:5px}.translate__main-inner[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;flex-direction:column;width:100%;max-width:350px;border-radius:10px;margin:5px 15px 35px;padding:10px;height:fit-content;background:var(--c-bg-secondary);border:2px solid var(--c-primary);cursor:pointer}@media (max-width: 575px){.translate__main-inner[_ngcontent-%COMP%]{margin:0}}.title[_ngcontent-%COMP%]{text-align:center}.input[_ngcontent-%COMP%]{width:100%;margin-right:10px;border-radius:5px;padding:5px 10px;border:1px solid var(--c-text-primary)}.formboxs[_ngcontent-%COMP%]{display:flex;gap:10px;flex-direction:column;align-items:flex-start}.formboxs_title[_ngcontent-%COMP%]{color:var(--c-text-primary);display:flex;justify-content:center;align-items:center}.main__sub-inner[_ngcontent-%COMP%]{margin:20px;display:flex;flex-wrap:wrap}@media (max-width: 767px){.main__sub-inner[_ngcontent-%COMP%]{margin:20px 0}}@media (max-width: 575px){.main__sub-inner[_ngcontent-%COMP%]{gap:20px}}.img-close[_ngcontent-%COMP%]{width:25px;height:25px;border-radius:50%;position:absolute;top:-6px;right:-6px;z-index:2;transition:all .3s;cursor:pointer}.img-close[_ngcontent-%COMP%]:before{content:"";position:absolute;left:50%;top:50%;width:80%;height:2px;transform:translate(-50%,-50%) rotate(45deg);background:var(--c-text-primary)}.img-close[_ngcontent-%COMP%]:after{content:"";position:absolute;left:50%;top:50%;width:80%;height:2px;transform:translate(-50%,-50%) rotate(-45deg);background:var(--c-text-primary)}']})}}return n})();var G=[{path:"",component:H}],dt=(()=>{class n{static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275mod=C({type:n})}static{this.\u0275inj=h({imports:[P.forChild(G),J,T,E,O,z,j,$]})}}return n})();export{dt as TranslatesModule};

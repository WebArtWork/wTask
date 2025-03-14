import{e as T}from"./chunk-UIH4WJTY.js";import{$a as y,E as n,F as d,G as u,L as _,La as k,Pa as v,R as g,Wa as w,ab as C,c as a,gb as j,l as p,m as f,nb as b,pb as S}from"./chunk-CBKWH2IW.js";import{g as c}from"./chunk-GAL4ENT6.js";var I={formId:"tasktag",title:"Tasktag",components:[{name:"Text",key:"name",focused:!0,fields:[{name:"Placeholder",value:"fill tasktag title"},{name:"Label",value:"Title"}]},{name:"Text",key:"description",fields:[{name:"Placeholder",value:"fill tasktag description"},{name:"Label",value:"Description"}]}]};var F=(()=>{class i extends C{constructor(){super({name:"tasktag"})}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275prov=p({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var h=(()=>{class i{constructor(s,t,e,r,l,x){this._translate=s,this._tasktagService=t,this._alert=e,this._form=r,this._core=l,this._router=x,this.project_id=this._router.url.includes("tags/")?this._router.url.replace("/tags/",""):"",this.columns=["name","description"],this.form=this._form.getForm("tasktag",I),this.config={paginate:this.setRows.bind(this),perPage:20,setPerPage:this._tasktagService.setPerPage.bind(this._tasktagService),allDocs:!1,create:()=>{this._form.modal(this.form,{label:"Create",click:(o,m)=>c(this,null,function*(){m(),this._preCreate(o),yield a(this._tasktagService.create(o)),this.setRows()})})},update:o=>{this._form.modal(this.form,[],o).then(m=>{this._core.copy(m,o),this._tasktagService.update(o)})},delete:o=>{this._alert.question({text:this._translate.translate("Common.Are you sure you want to delete this tasktag?"),buttons:[{text:this._translate.translate("Common.No")},{text:this._translate.translate("Common.Yes"),callback:()=>c(this,null,function*(){yield a(this._tasktagService.delete(o)),this.setRows()})}]})},buttons:[{icon:"task",hrefFunc:o=>"/tasks/"+o.project+"/tag/"+o._id},{icon:"cloud_download",click:o=>{this._form.modalUnique("tasktag","url",o)}}],headerButtons:[{icon:"playlist_add",click:this._bulkManagement(),class:"playlist"},{icon:"edit_note",click:this._bulkManagement(!1),class:"edit"}]},this.rows=[],this._page=1,this.setRows()}setRows(s=this._page){this._page=s,this._core.afterWhile(this,()=>{this._tasktagService.get({page:s,query:this.project_id?"project="+this.project_id:""}).subscribe(t=>{this.rows.splice(0,this.rows.length),this.rows.push(...t)})},250)}_bulkManagement(s=!0){return()=>{this._form.modalDocs(s?[]:this.rows).then(t=>c(this,null,function*(){if(s)for(let e of t)this._preCreate(e),yield a(this._tasktagService.create(e));else{for(let e of this.rows)t.find(r=>r._id===e._id)||(yield a(this._tasktagService.delete(e)));for(let e of t){let r=this.rows.find(l=>l._id===e._id);r?(this._core.copy(e,r),yield a(this._tasktagService.update(r))):(this._preCreate(e),yield a(this._tasktagService.create(e)))}}this.setRows()}))}}_preCreate(s){s.__created,this.project_id&&(s.project=this.project_id)}static{this.\u0275fac=function(t){return new(t||i)(n(j),n(F),n(y),n(S),n(w),n(k))}}static{this.\u0275cmp=d({type:i,selectors:[["ng-component"]],standalone:!1,decls:1,vars:3,consts:[["title","Tags",3,"columns","config","rows"]],template:function(t,e){t&1&&g(0,"wtable",0),t&2&&_("columns",e.columns)("config",e.config)("rows",e.rows)},dependencies:[b],encapsulation:2})}}return i})();var P=[{path:"",component:h},{path:":project_id",component:h}],J=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=u({type:i})}static{this.\u0275inj=f({imports:[v.forChild(P),T]})}}return i})();export{J as TagsModule};

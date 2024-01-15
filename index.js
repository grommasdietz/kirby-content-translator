(function(){"use strict";const f={props:{blueprint:String,lock:[Boolean,Object],help:String,name:String,parent:String,timestamp:Number},methods:{load(){return this.$api.get(`${this.parent}/sections/${this.name}`)}}};function g(e=""){return e.startsWith("/")}function m(e=""){return g(e)?e:"/"+e}const y={computed:{locales(){return this.$panel.languages.map(e=>e.code)}},methods:{getNonLocalizedPath(e){const n=new URL(e).pathname.split("/").filter(Boolean);return this.locales.includes(n[0])&&n.shift(),m(n.join("/"))}}},_=5,$={methods:{async recursiveTranslateContent(e,{sourceLanguage:t,targetLanguage:n,translatableBlocks:l={}}){const s=[],h=i=>{for(const a of i)if(!(!u(a.content)||!a.id||a.isHidden===!0)&&Object.keys(l).includes(a.type)){for(const o of Object.keys(a.content))if(v(l[a.type]).includes(o)&&a.content[o]){if(Array.isArray(a.content[o])&&a.content[o].every(r=>u(r)&&r.content)){h(a.content[o]);continue}s.push(async()=>{const r=await window.panel.api.post("__content-translator__/translate",{sourceLanguage:t,targetLanguage:n,text:a.content[o]});a.content[o]=r.result.text})}}};for(const i in e)if(e[i]){if(typeof e[i]=="string")s.push(async()=>{const a=await window.panel.api.post("__content-translator__/translate",{sourceLanguage:t,targetLanguage:n,text:e[i]});e[i]=a.result.text});else if(Array.isArray(e[i])){if(e[i].every(a=>typeof a=="string")){e[i]=await Promise.all(e[i].filter(Boolean).map(async a=>(await window.panel.api.post("__content-translator__/translate",{sourceLanguage:t,targetLanguage:n,text:a})).result.text));continue}if(e[i].every(a=>u(a)&&a.columns)){for(const a of e[i])for(const o of a.columns)h(o.blocks);continue}e[i].every(a=>u(a)&&a.content)&&h(e[i])}}try{await b(s)}catch(i){throw console.error(i),i}return e}}};async function b(e,t=_){for(let n=0;n<e.length;n+=t){const l=e.slice(n,n+t);await Promise.all(l.map(s=>s()))}}function v(e){return Array.isArray(e)?e:[e]}function u(e){return typeof e=="object"&&e!==null}function w(e,t,n,l,s,h,i,a){var o=typeof e=="function"?e.options:e;t&&(o.render=t,o.staticRenderFns=n,o._compiled=!0),l&&(o.functional=!0),h&&(o._scopeId="data-v-"+h);var r;if(i?(r=function(c){c=c||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!c&&typeof __VUE_SSR_CONTEXT__<"u"&&(c=__VUE_SSR_CONTEXT__),s&&s.call(this,c),c&&c._registeredComponents&&c._registeredComponents.add(i)},o._ssrRegister=r):s&&(r=a?function(){s.call(this,(o.functional?this.parent:this).$root.$options.shadowRoot)}:s),r)if(o.functional){o._injectStyles=r;var x=o.render;o.render=function(j,d){return r.call(d),x(j,d)}}else{var p=o.beforeCreate;o.beforeCreate=p?[].concat(p,r):[r]}return{exports:e,options:o}}const C={mixins:[f,y,$],data(){return{label:void 0,confirm:!0,syncableFields:[],translatableFields:[],translatableBlocks:[],config:void 0,defaultLanguage:this.$panel.languages.find(e=>e.default),defaultContent:{}}},computed:{currentContent(){return this.$store.getters["content/values"]()},syncableContent(){return Object.fromEntries(Object.entries(this.defaultContent).filter(([e])=>this.syncableFields.includes(e)))},translatableContent(){return Object.fromEntries(Object.entries(this.currentContent).filter(([e])=>this.translatableFields.includes(e)))}},async created(){const e=await this.load();this.label=this.t(e.label)||this.$t("johannschopplich.content-translator.label"),this.confirm=e.confirm??e.config.confirm??!0,this.translatableFields=e.translatableFields??e.config.translatableFields??[],this.syncableFields=e.syncableFields??e.config.syncableFields??[],this.translatableBlocks=e.translatableBlocks??e.config.translatableBlocks??[],this.config=e.config??{},this.$panel.events.on("model.update",this.updateModelDefaultContent),this.updateModelDefaultContent()},beforeDestroy(){this.$panel.events.off("model.update",this.updateModelDefaultContent)},methods:{t(e){return!e||typeof e=="string"?e:e[this.$panel.translation.code]??Object.values(e)[0]},async syncModelContent(e){const t=e?await this.getSyncableContentForLanguage(e):this.syncableContent;for(const[n,l]of Object.entries(t))this.$store.dispatch("content/update",[n,l]);this.$panel.notification.success(this.$t("johannschopplich.content-translator.notification.synced"))},async translateModelContent(e,t){this.$panel.view.isLoading=!0;const n=JSON.parse(JSON.stringify(this.translatableContent));try{await this.recursiveTranslateContent(n,{sourceLanguage:t==null?void 0:t.code,targetLanguage:e.code,translatableBlocks:this.translatableBlocks})}catch(l){console.error(l),this.$panel.notification.error(this.$t("error"));return}for(const[l,s]of Object.entries(n))this.$store.dispatch("content/update",[l,s]);this.$panel.view.isLoading=!1,this.$panel.notification.success(this.$t("johannschopplich.content-translator.notification.translated"))},async updateModelDefaultContent(){const{content:e}=await this.$api.get(this.$panel.view.path,{language:this.defaultLanguage.code});this.defaultContent=e},async getSyncableContentForLanguage(e){const{content:t}=await this.$api.get(this.$panel.view.path,{language:e.code});return Object.fromEntries(Object.entries(t).filter(([n])=>this.syncableFields.includes(n)))},openModal(e,t){if(!this.confirm){t==null||t();return}this.$panel.dialog.open({component:"k-text-dialog",props:{text:e},on:{submit:()=>{this.$panel.dialog.close(),t==null||t()}}})}}};var k=function(){var l;var t=this,n=t._self._c;return t.config?n("k-section",{attrs:{label:t.label}},[t.$panel.multilang?!t.config.translateFn&&!((l=t.config.DeepL)!=null&&l.apiKey)?n("k-box",{attrs:{theme:"empty"}},[n("k-text",[t._v(" You need to set the either a custom "),n("code",[t._v("translateFn")]),t._v(" or the "),n("code",[t._v("DeepL.apiKey")]),t._v(" option for the "),n("code",[t._v("johannschopplich.content-translator")]),t._v(" namespace in your Kirby configuration. ")])],1):t.translatableFields.length?t.config.allowDefaultLanguageOverwrite?n("k-box",{attrs:{theme:"none"}},[n("k-button-group",{attrs:{layout:"collapsed"}},[t._l(t.$panel.languages.filter(s=>s.code!==t.$panel.language.code),function(s){return n("k-button",{directives:[{name:"show",rawName:"v-show",value:t.syncableFields.length,expression:"syncableFields.length"}],key:s.code,attrs:{size:"sm",variant:"filled"},on:{click:function(h){t.openModal(t.$t("johannschopplich.content-translator.dialog.syncFrom",{language:s.name}),()=>t.syncModelContent(s))}}},[t._v(" "+t._s(t.$t("johannschopplich.content-translator.importFrom",{language:s.code.toUpperCase()}))+" ")])}),n("k-button",{attrs:{icon:"translate",size:"sm",variant:"filled",theme:"notice"},on:{click:function(s){t.openModal(t.$t("johannschopplich.content-translator.dialog.translate",{language:t.$panel.language.name}),()=>t.translateModelContent(t.$panel.language))}}},[t._v(" "+t._s(t.$t("johannschopplich.content-translator.translate",{language:t.$panel.language.code.toUpperCase()}))+" ")])],2)],1):[n("k-box",{attrs:{theme:"none"}},[n("k-button-group",{attrs:{layout:"collapsed"}},[n("k-button",{directives:[{name:"show",rawName:"v-show",value:t.syncableFields.length,expression:"syncableFields.length"}],attrs:{disabled:t.$panel.language.default,size:"sm",variant:"filled"},on:{click:function(s){t.openModal(t.$t("johannschopplich.content-translator.dialog.sync",{language:t.defaultLanguage.name}),()=>t.syncModelContent())}}},[t._v(" "+t._s(t.$t("johannschopplich.content-translator.sync"))+" ")]),n("k-button",{attrs:{disabled:t.$panel.language.default,icon:"translate",size:"sm",variant:"filled",theme:"notice"},on:{click:function(s){t.openModal(t.$t("johannschopplich.content-translator.dialog.translate",{language:t.$panel.language.name}),()=>t.translateModelContent(t.$panel.language,t.defaultLanguage))}}},[t._v(" "+t._s(t.$t("johannschopplich.content-translator.translate",{language:t.$panel.language.code.toUpperCase()}))+" ")])],1)],1),n("k-box",{directives:[{name:"show",rawName:"v-show",value:t.$panel.language.default,expression:"$panel.language.default"}],staticClass:"kct-mt-1",attrs:{theme:"none",text:t.$t("johannschopplich.content-translator.help.disallowDefaultLanguage")}})]:n("k-box",{attrs:{theme:"info"}},[n("k-text",[t._v(" You have to define at least one translatable field for the "),n("code",[t._v("translatableFields")]),t._v(" blueprint or in your Kirby configuration. ")])],1):n("k-box",{attrs:{theme:"info"}},[n("k-text",[t._v(" This section requires multi-language support to be enabled. ")])],1)],2):t._e()},F=[],M=w(C,k,F,!1,null,null,null,null);const O=M.exports;window.panel.plugin("johannschopplich/content-translator",{sections:{"content-translator":O}})})();

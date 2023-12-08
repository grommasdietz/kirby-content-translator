(function(){"use strict";const v=/\/$|\/\?|\/#/;function b(t="",e){return e?v.test(t):t.endsWith("/")}function $(t="",e){if(!e)return t.endsWith("/")?t:t+"/";if(b(t,!0))return t||"/";let n=t,o="";const a=t.indexOf("#");if(a>=0&&(n=t.slice(0,a),o=t.slice(a),!n))return o;const[s,...i]=n.split("?");return s+"/"+(i.length>0?`?${i.join("?")}`:"")+o}function y(t=""){return t.startsWith("/")}function f(t=""){return y(t)?t:"/"+t}function w(t){return t&&t!=="/"}const C=/^\.?\//;function u(t,...e){let n=t||"";for(const o of e.filter(a=>w(a)))if(n){const a=o.replace(C,"");n=$(n)+a}else n=o;return n}const d={props:{blueprint:String,lock:[Boolean,Object],help:String,name:String,parent:String,timestamp:Number},methods:{load(){return this.$api.get(`${this.parent}/sections/${this.name}`)}}},p={computed:{locales(){return this.$panel.languages.map(t=>t.code)}},methods:{getNonLocalizedPath(t){const n=new URL(t).pathname.split("/").filter(Boolean);return this.locales.includes(n[0])&&n.shift(),f(n.join("/"))}}};function g(t,e,n,o,a,s,i,h){var r=typeof t=="function"?t.options:t;e&&(r.render=e,r.staticRenderFns=n,r._compiled=!0),o&&(r.functional=!0),s&&(r._scopeId="data-v-"+s);var c;if(i?(c=function(l){l=l||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!l&&typeof __VUE_SSR_CONTEXT__<"u"&&(l=__VUE_SSR_CONTEXT__),a&&a.call(this,l),l&&l._registeredComponents&&l._registeredComponents.add(i)},r._ssrRegister=c):a&&(c=h?function(){a.call(this,(r.functional?this.parent:this).$root.$options.shadowRoot)}:a),c)if(r.functional){r._injectStyles=c;var I=r.render;r.render=function(P,m){return c.call(m),I(P,m)}}else{var _=r.beforeCreate;r.beforeCreate=_?[].concat(_,c):[c]}return{exports:t,options:r}}const x={mixins:[d,p],data(){return{label:void 0,config:{},url:""}},computed:{content(){return this.$store.getters["content/values"]()},path(){if(!this.url)return"";if(!this.$panel.multilang)return new URL(this.url).pathname;let t=this.getNonLocalizedPath(this.url);return config.defaultLanguagePrefix?this.$panel.language.default||(t=u(this.$panel.language.code,t)):t=u(this.$panel.language.code,t),f(t)}},watch:{"$panel.language.code":{async handler(){const{url:t}=await this.$api.get(this.$panel.view.path);this.url=t},immediate:!0}},async created(){const t=await this.load();this.label=this.t(t.label)||"SERP Preview",this.config=t.config},methods:{joinURL:u,t(t){return Array.isArray(t)?t[this.$panel.translation.code]??Object.values(t)[0]:t}}};var k=function(){var e=this,n=e._self._c;return n("k-section",{attrs:{label:e.label}},[n("div",{staticClass:"overflow-hidden rounded-[var(--input-rounded)] bg-[var(--input-color-back)] p-4"},[n("div",{staticClass:"flex items-center gap-3 mb-2"},[n("figure",{staticClass:"inline-flex aspect-square h-[26px] w-[26px] items-center justify-center rounded-full border border-solid border-[#ecedef] bg-[#f1f3f4]"},[n("img",{staticClass:"block h-[18px] w-[18px]",attrs:{src:e.config.faviconUrl||"/assets/favicon.svg",alt:""}})]),n("div",{staticClass:"flex flex-col"},[n("span",{staticClass:"text-sm text-[#4d5156]"},[e._v(e._s(e.config.title))]),n("span",{staticClass:"line-clamp-1 text-xs text-[#4d5156]"},[e._v(e._s(e.joinURL(e.config.baseUrl||e.config.url,e.path)))])])]),n("h3",{staticClass:"mb-1 line-clamp-1 text-xl text-[#1a0dab]"},[e._v(" "+e._s(e.content.customTitle||`${e.$panel.view.title} – ${e.config.title}`)+" ")]),n("p",{staticClass:"line-clamp-2 text-sm text-[#4d5156]"},[e._v(" "+e._s(e.content.description)+" ")])])])},L=[],F=g(x,k,L,!1,null,null,null,null);const S=F.exports,O=5,j={methods:{async recursiveTranslateContent(t,{sourceLanguage:e,targetLanguage:n,translatableBlocks:o={}}){const a=[];for(const s in t)if(t[s]){if(typeof t[s]=="string")a.push(async()=>{const i=await this.$api.post("__content-translator__/translate",{sourceLanguage:e,targetLanguage:n,text:t[s]});t[s]=i.result.text});else if(Array.isArray(t[s])){if(t[s].every(i=>typeof i=="string"))t[s]=await Promise.all(t[s].filter(Boolean).map(async i=>(await this.$api.post("__content-translator__/translate",{sourceLanguage:e,targetLanguage:n,text:i})).result.text));else for(const i of t[s])if(!(!A(i.content)||!i.id||i.isHidden)&&Object.keys(o).includes(i.type))for(const h of Object.keys(i.content))T(o[i.type]).includes(h)&&i.content[h]&&a.push(async()=>{const r=await this.$api.post("__content-translator__/translate",{sourceLanguage:e,targetLanguage:n,text:i.content[h]});i.content[h]=r.result.text})}}try{await R(a)}catch(s){throw console.error(s),s}return t}}};async function R(t,e=O){for(let n=0;n<t.length;n+=e){const o=t.slice(n,n+e);await Promise.all(o.map(a=>a()))}}function T(t){return Array.isArray(t)?t:[t]}function A(t){return typeof t=="object"&&t!==null}const N={mixins:[d,p,j],data(){return{label:void 0,confirm:!0,syncableFields:[],translatableFields:[],translatableBlocks:[],config:{},defaultLanguage:this.$panel.languages.find(t=>t.default),defaultContent:{}}},computed:{currentContent(){return this.$store.getters["content/values"]()},syncableContent(){return Object.fromEntries(Object.entries(this.defaultContent).filter(([t])=>this.syncableFields.includes(t)))},translatableContent(){return Object.fromEntries(Object.entries(this.currentContent).filter(([t])=>this.translatableFields.includes(t)))}},async created(){const t=await this.load();this.label=this.t(t.label)||this.$t("johannschopplich.content-translator.label"),this.confirm=t.confirm??t.config.confirm??!0,this.translatableFields=t.translatableFields??t.config.translatableFields??[],this.syncableFields=t.syncableFields??t.config.syncableFields??[],this.translatableBlocks=t.translatableBlocks??t.config.translatableBlocks??[],this.config=t.config;const e=async()=>{this.defaultContent=await this.getDefaultContent()};this.$events.$on("model.update",e),e()},methods:{t(t){return Array.isArray(t)?t[this.$panel.translation.code]??Object.values(t)[0]:t},syncModelContent(){for(const[t,e]of Object.entries(this.syncableContent))this.$store.dispatch("content/update",[t,e]);this.$panel.notification.success(this.$t("johannschopplich.content-translator.notification.synced"))},async translateModelContent(t){this.$panel.view.isLoading=!0;const e=JSON.parse(JSON.stringify(this.translatableContent));try{await this.recursiveTranslateContent(e,{sourceLanguage:this.defaultLanguage.code,targetLanguage:t.code,translatableBlocks:this.translatableBlocks})}catch(n){console.error(n),this.$panel.notification.error(this.$t("error"));return}for(const[n,o]of Object.entries(e))this.$store.dispatch("content/update",[n,o]);this.$panel.view.isLoading=!1,this.$panel.notification.success(this.$t("johannschopplich.content-translator.notification.translated"))},async getDefaultContent(){const{content:t}=await this.$api.get(this.$panel.view.path,{language:this.defaultLanguage.code});return t},openModal(t,e){if(!this.confirm){e==null||e();return}this.$panel.dialog.open({component:"k-text-dialog",props:{text:t},on:{submit:()=>{this.$panel.dialog.close(),e==null||e()}}})}}};var U=function(){var o,a;var e=this,n=e._self._c;return n("k-section",{attrs:{label:e.label}},[e.$panel.multilang?!e.config.translateFn&&!((a=(o=e.config)==null?void 0:o.DeepL)!=null&&a.apiKey)?n("k-box",{attrs:{theme:"none"}},[n("k-text",[e._v(" You need to set the either a custom "),n("code",[e._v("translateFn")]),e._v(" or the "),n("code",[e._v("DeepL.apiKey")]),e._v(" option for the "),n("code",[e._v("johannschopplich.content-translator")]),e._v(" namespace in your Kirby configuration. ")])],1):e._e():n("k-box",{attrs:{theme:"info"}},[n("k-text",[e._v(" This section requires multi-language support to be enabled. ")])],1),e.translatableFields.length?n("k-box",{attrs:{theme:"none"}},[n("k-button-group",{attrs:{layout:"collapsed"}},[n("k-button",{directives:[{name:"show",rawName:"v-show",value:e.syncableFields.length,expression:"syncableFields.length"}],attrs:{disabled:e.$panel.language.default,size:"sm",variant:"filled"},on:{click:function(s){e.openModal(e.$t("johannschopplich.content-translator.dialog.sync",{language:e.defaultLanguage.name}),()=>e.syncModelContent())}}},[e._v(" "+e._s(e.$t("johannschopplich.content-translator.sync"))+" ")]),e._l(e.$panel.languages.filter(s=>!s.default),function(s){return n("k-button",{key:s.code,attrs:{disabled:e.$panel.language.default,icon:"translate",size:"sm",variant:"filled",theme:"notice"},on:{click:function(i){e.openModal(e.$t("johannschopplich.content-translator.dialog.translate",{language:s.name}),()=>e.translateModelContent(s))}}},[e._v(" "+e._s(e.$t("johannschopplich.content-translator.translate",{language:s.code.toUpperCase()}))+" ")])})],2)],1):n("k-box",{attrs:{theme:"info"}},[n("k-text",[e._v(" You have to define at least one translatable field for the "),n("code",[e._v("translatableFields")]),e._v(" blueprint or in your Kirby configuration. ")])],1),n("k-box",{directives:[{name:"show",rawName:"v-show",value:e.$panel.language.default,expression:"$panel.language.default"}],staticClass:"mt-1",attrs:{theme:"none",text:e.$t("johannschopplich.content-translator.help.disallowDefaultLanguage")}})],1)},M=[],E=g(N,U,M,!1,null,null,null,null);const B=E.exports,D="";window.panel.plugin("johannschopplich/website",{sections:{"serp-preview":S,"content-translator":B}})})();

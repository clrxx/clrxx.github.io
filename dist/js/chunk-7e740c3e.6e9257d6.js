(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e740c3e"],{"6ecd":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[s("div",{staticClass:"login-main wh-1300"},[s("ul",{staticClass:"login-utils"},[s("li",[s("h2",[t._v("还没有账号吗?")]),s("h3",[t._v("where there is a will there is a way.")]),s("button",{on:{click:function(e){return t.switchMode(0)}}},[t._v("注册")])]),s("li",[s("h2",[t._v("已经有账号了吗?")]),s("h3",[t._v("Because had because, so had so, since has become since, why say why.")]),s("button",{on:{click:function(e){return t.switchMode(1)}}},[t._v("登录")])])]),s("div",{staticClass:"user-info-main white-radius",class:t.bounceDirection},[s("div",{directives:[{name:"show",rawName:"v-show",value:0==t.showModeNum,expression:"showModeNum == 0"}],staticClass:"user-sign about-same"},[s("h2",[t._v("注册")]),t._m(0)]),s("div",{directives:[{name:"show",rawName:"v-show",value:1==t.showModeNum,expression:"showModeNum == 1"}],staticClass:"user-login about-same"},[s("h2",[t._v("登录")]),s("ul",{staticClass:"user-options"},[t._m(1),t._m(2),s("li",{staticClass:"mb"},[s("vaptcha",{attrs:{"vp-style":"light",lang:"zh-CN",scene:"01"},model:{value:t.vaptcha,callback:function(e){t.vaptcha=e},expression:"vaptcha"}})],1),s("li",{staticClass:"in"},[s("a",{on:{click:function(e){return t.switchMode(2)}}},[t._v("忘记密码")]),s("button",{staticClass:"btn2"},[t._v("登录")])])])]),s("div",{directives:[{name:"show",rawName:"v-show",value:2==t.showModeNum,expression:"showModeNum == 2"}],staticClass:"user-retrieve about-same"},[s("h2",[t._v("找回密码")]),s("ul",{staticClass:"user-options"},[t._m(3),t._m(4),t._m(5),s("li",{staticClass:"in"},[s("button",{staticClass:"btn1"},[t._v("发送验证码")]),s("button",{staticClass:"btn2"},[t._v("确定")]),s("button",{staticClass:"btn3",on:{click:function(e){return t.switchMode(1)}}},[t._v("返回")])])])])])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"user-options"},[s("li",[s("input",{attrs:{type:"text",placeholder:"手机号"}})]),s("li",{staticClass:"sms"},[s("input",{attrs:{type:"text",placeholder:"手机验证码"}}),s("button",{staticClass:"btn1"},[t._v("发送验证码")])]),s("li",{staticClass:"mb"},[s("input",{attrs:{type:"password",placeholder:"你的密码"}})]),s("li",{staticClass:"reg"},[s("button",{staticClass:"btn2"},[t._v("注册")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",[s("input",{attrs:{type:"text",placeholder:"手机号"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",[s("input",{attrs:{type:"password",placeholder:"你的密码"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",[s("input",{attrs:{type:"text",placeholder:"手机号"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",[s("input",{attrs:{type:"text",placeholder:"手机验证码"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"mb"},[s("input",{attrs:{type:"password",placeholder:"你的密码"}})])}],i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"vaptcha",staticStyle:{width:"300px",height:"36px"}},[t._m(0)])},c=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"vaptcha-init-main"},[s("div",{staticClass:"vaptcha-init-loading"},[s("a",{attrs:{href:"https://www.vaptcha.com/",target:"_blank"}},[s("img",{attrs:{src:"https://cdn.vaptcha.com/vaptcha-loading.gif"}})]),s("span",{staticClass:"vaptcha-text"},[t._v("VAPTCHA启动中...")])])])}],o=function(t,e){for(var s in e)t[s]=e[s];return t},r={props:{type:{type:String,default:"click"},scene:{type:String,default:""},vpStyle:{type:String,default:"dark"},color:{type:String,color:"#3C8AFF"},lang:{type:String,default:"zh-CN"}},mounted:function(){var t=this,e="5bc2fb22fc650e0fe49b4e5f";window.location.host.indexOf("myzuhao")>=0?e="5bc29c25fc650e0fe49b4b49":window.location.host.indexOf("mylezu")>=0&&(e="5c1cb298fc650f175ca92598");var s=o({vid:e,container:this.$refs.vaptcha,style:this.vpStyle},this.$props);this.loadV2Script().then(function(){window.vaptcha(s).then(function(e){t.$emit("input",e),e.render()})})},methods:{loadV2Script:function(){return"function"===typeof window.vaptcha?Promise.resolve():new Promise(function(t){var e=document.createElement("script");e.src="https://cdn.vaptcha.com/v2.js",e.async=!0,e.onload=e.onreadystatechange=function(){this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(t(),e.onload=e.onreadystatechange=null)},document.getElementsByTagName("head")[0].appendChild(e)})}}},l=r,u=(s("c71b"),s("2877")),h=Object(u["a"])(l,i,c,!1,null,null,null),d=h.exports,p={components:{Vaptcha:d},data:function(){return{vaptcha:"",vaptchaToken:"",showModeNum:1,bounceDirection:"bounceRight"}},created:function(){1==this.$route.query.sign?(this.showModeNum=0,this.bounceDirection="bounceLeft"):(this.showModeNum=1,this.bounceDirection="bounceRight")},methods:{switchMode:function(t){this.showModeNum=t,1==this.showModeNum||2==this.showModeNum?this.bounceDirection="bounceRight":this.bounceDirection="bounceLeft"},login:function(){}}},v=p,f=(s("dadf"),Object(u["a"])(v,a,n,!1,null,"71020702",null));e["default"]=f.exports},c71b:function(t,e,s){"use strict";var a=s("dd73"),n=s.n(a);n.a},dadf:function(t,e,s){"use strict";var a=s("e2f6"),n=s.n(a);n.a},dd73:function(t,e,s){},e2f6:function(t,e,s){}}]);
//# sourceMappingURL=chunk-7e740c3e.6e9257d6.js.map
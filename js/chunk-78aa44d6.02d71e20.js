(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78aa44d6"],{"1ac7":function(s,e,a){},d32c:function(s,e,a){"use strict";a.r(e);var r=function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("div",{staticClass:"change-pay-pass"},[a("div",{staticClass:"account-puc"},[a("div",{staticClass:"change-pay-pass-main"},[a("el-form",{ref:"ruleForm",staticClass:"form-label-12",attrs:{model:s.ruleForm,"status-icon":"",rules:s.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"登录密码",prop:"loginPass"}},[a("el-input",{attrs:{type:"password",size:"small"},model:{value:s.ruleForm.loginPass,callback:function(e){s.$set(s.ruleForm,"loginPass",e)},expression:"ruleForm.loginPass"}})],1),a("el-form-item",{attrs:{label:"新支付密码",prop:"payPass"}},[a("el-input",{attrs:{type:"password",size:"small"},model:{value:s.ruleForm.payPass,callback:function(e){s.$set(s.ruleForm,"payPass",e)},expression:"ruleForm.payPass"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return s.submitForm("ruleForm")}}},[s._v("提交修改")])],1)],1)],1)])])},t=[],l={data:function(){return{ruleForm:{loginPass:"",payPass:""},rules:{loginPass:[{required:!0,message:"请输入登录密码",trigger:"blur"}],payPass:[{required:!0,message:"请输入新支付密码",trigger:"blur"}]}}},methods:{submitForm:function(s){var e=this;this.$refs[s].validate(function(s){if(!s)return console.log("error submit."),!1;console.log(e.ruleForm)})}}},o=l,i=(a("ea51"),a("2877")),n=Object(i["a"])(o,r,t,!1,null,"5490f45f",null);e["default"]=n.exports},ea51:function(s,e,a){"use strict";var r=a("1ac7"),t=a.n(r);t.a}}]);
//# sourceMappingURL=chunk-78aa44d6.02d71e20.js.map
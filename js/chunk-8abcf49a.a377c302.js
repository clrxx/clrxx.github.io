(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8abcf49a"],{"22f2":function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"activity"},[e("activity-list",{attrs:{neid:2}})],1)},a=[],c=e("8cd2"),s={components:{ActivityList:c["a"]}},o=s,r=e("2877"),u=Object(r["a"])(o,i,a,!1,null,null,null);n["default"]=u.exports},"715d":function(t,n,e){"use strict";var i=e("c512"),a=e.n(i);a.a},"8cd2":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"notice white-radius"},[e("div",{staticClass:"notice-title"},[1==t.neid?e("h3",{staticClass:"an"},[t._v("最新公告"),e("span",[t._v("Announcement")])]):t._e(),2==t.neid?e("h3",{staticClass:"ac"},[t._v("活动中心"),e("span",[t._v("Activity")])]):t._e()]),e("ul",{staticClass:"notice-list"},t._l(10,function(n){return e("li",{key:n,on:{click:function(e){return t.toAnnouncementDetail(n)}}},[e("h3",[t._v("2019春节假期提现调整公告"+t._s(t.neid))]),e("p",[t._v("2019-02-02 02:02:02")])])}),0),e("el-pagination",{attrs:{total:20,"page-size":10,"current-page":1,background:"",layout:"prev, pager, next"},on:{"current-change":t.pageChange}})],1)},a=[],c={props:["neid"],data:function(){return{pageTotal:20,pageSize:10,pageCurrent:1}},created:function(){},methods:{toAnnouncementDetail:function(t){1==this.neid?this.$router.push({path:"/announcement/detail",query:{sort:1,id:t}}):2==this.neid&&this.$router.push({path:"/activity/detail",query:{sort:1,id:t}})},pageChange:function(t){console.log(t)}}},s=c,o=(e("715d"),e("2877")),r=Object(o["a"])(s,i,a,!1,null,"3649e523",null);n["a"]=r.exports},c512:function(t,n,e){}}]);
//# sourceMappingURL=chunk-8abcf49a.a377c302.js.map
webpackJsonp([32],{FuYq:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.q-layout-page[data-v-65675ed2] {\n  padding-bottom: 44px;\n}\n.q-item[data-v-65675ed2] {\n  padding-top: 0;\n  padding-bottom: 0;\n  min-height: 24px;\n  font-size: 0.9rem;\n}\n.q-item .text-em[data-v-65675ed2] {\n  font-weight: 600;\n}\n",""])},OSdb:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"EmployeePayDetail",data:function(){return{employeeId:"",payDatas:null,today:new Date}},created:function(){this.empSeq=this.$route.params.id,this.payDatas=this.$route.query.payDatas},mounted:function(){this.setHeader({visible:!0,title:"급여정보",useBackButton:!0})}},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[a("q-card",[a("q-card-title",{staticClass:"bg-black text-white"},[t._v("\n      "+t._s(t.today.getMonth()+1)+"월 급여 정보\n    ")]),t._v(" "),a("q-card-separator"),t._v(" "),a("q-card-main",t._l(t.payDatas,function(e){return a("q-list",{key:e.date,attrs:{"margin-bottom":""}},[a("q-list-header",[a("h4",[a("q-icon",{attrs:{name:"date_range"}}),t._v("\n            "+t._s(e.date)+" 급여\n          ")],1)]),t._v(" "),a("q-item",[a("span",[t._v("기본급")]),t._v(" "),a("q-item-main",{staticClass:"text-em",attrs:{label:t._f("currency")(e.payment),"text-right":""}})],1),t._v(" "),a("q-item",[a("span",[t._v("야간근로수당")]),t._v(" "),a("q-item-main",{staticClass:"text-em",attrs:{label:t._f("currency")(0),"text-right":""}})],1),t._v(" "),a("q-item",[a("span",[t._v("초과근무수당")]),t._v(" "),a("q-item-main",{staticClass:"text-em",attrs:{label:t._f("currency")(0),"text-right":""}})],1),t._v(" "),a("q-item",[a("span",[t._v("휴일근무수당")]),t._v(" "),a("q-item-main",{staticClass:"text-em",attrs:{label:t._f("currency")(0),"text-right":""}})],1),t._v(" "),a("q-item-separator"),t._v(" "),a("q-item",[a("strong",[t._v("합계")]),t._v(" "),a("q-item-main",{staticClass:"text-em",attrs:{label:t._f("currency")(e.payment),"text-right":""}})],1)],1)}))],1)],1)},s=[];i._withStripped=!0;var r=a("XyMi"),l=!1;var o=function(t){l||a("zuxP")},c=Object(r.a)(n,i,s,!1,o,"data-v-65675ed2",null);c.options.__file="src/pages/EmployeePayDetail.vue";e.default=c.exports},zuxP:function(t,e,a){var n=a("FuYq");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a("rjj0").default)("5083f9fa",n,!1,{})}});
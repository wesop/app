webpackJsonp([2],{"3LdA":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",[a("section",{staticClass:"page-wrap"},[a("form",[a("q-field",{attrs:{label:"채용 모집/마감","margin-top":"","padding-bottom":""}},[a("q-option-group",{attrs:{type:"toggle",color:"black",options:[{label:"모집중",value:!0}]},model:{value:e.opened,callback:function(t){e.opened=t},expression:"opened"}})],1),e._v(" "),a("q-field",{attrs:{label:"매장 이름","margin-top":""}},[a("div",{staticClass:"label"},[e._v("\n          스타벅스 역삼점\n        ")])]),e._v(" "),a("q-field",{attrs:{label:"고용형태",required:"","margin-top":""}},[a("q-radio",{attrs:{color:"black",val:"T",label:"시급"},model:{value:e.hireType,callback:function(t){e.hireType=t},expression:"hireType"}}),e._v(" "),a("q-radio",{attrs:{color:"black",val:"M",label:"월급"},model:{value:e.hireType,callback:function(t){e.hireType=t},expression:"hireType"}})],1),e._v(" "),a("q-field",{attrs:{label:"근무 시작일",required:"","margin-top":""}},[a("q-datetime",{attrs:{"hide-underline":"",type:"date",format:"YYYY년 MM월 DD일","ok-label":"설정","cancel-label":" ",placeholder:"근무 시작일"},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}})],1),e._v(" "),a("q-field",{attrs:{label:"근무 종료일","margin-top":""}},[a("q-datetime",{attrs:{"hide-underline":"",type:"date",format:"YYYY년 MM월 DD일","ok-label":"설정","cancel-label":" ",placeholder:"근무 시작일"},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}})],1),e._v(" "),a("q-field",{staticClass:"schedule-wrap",attrs:{label:"근무 일정","margin-top":""}},[a("q-btn",{staticClass:"full-width",attrs:{"margin-bottom":"",label:"추가",color:"black",icon:"add circle"},on:{click:function(){}}}),e._v(" "),a("div",{staticClass:"row justify-center",attrs:{"padding-top":"","padding-bottom":""}},[a("div",{staticClass:"col-1"},[a("q-btn",{staticClass:"text-em btn-del",attrs:{size:"1em",color:"white",icon:"remove circle"},on:{click:function(){}}})],1),e._v(" "),a("div",{staticClass:"col-2"},[a("q-select",{attrs:{"hide-underline":"","text-right":"",options:[{label:"월",value:1},{label:"화",value:2},{label:"화",value:2}],color:"white"},model:{value:e.day,callback:function(t){e.day=t},expression:"day"}})],1),e._v(" "),a("div",{staticClass:"col-4"},[a("q-datetime",{attrs:{"hide-underline":"","text-right":"",type:"time",format:"HH시 mm분","ok-label":"설정","cancel-label":" ",placeholder:"출근시간"},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}})],1),e._v(" "),a("div",{staticClass:"col-4"},[a("q-datetime",{attrs:{"hide-underline":"","text-right":"",type:"time",format:"HH시 mm분","ok-label":"설정","cancel-label":" ",placeholder:"퇴근시간"},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}})],1)])],1),e._v(" "),a("q-field",{attrs:{label:"급여(시급/월급)","margin-top":""}},[a("q-input",{attrs:{"hide-underline":"","text-right":"",suffix:"원",type:"number",placeholder:"급여"},model:{value:e.pay,callback:function(t){e.pay=t},expression:"pay"}})],1),e._v(" "),a("q-item-separator"),e._v(" "),a("q-field",{attrs:{label:"점장의 말말말","margin-top":""}},[a("q-input",{attrs:{"hide-underline":"",type:"textarea",placeholder:"소개말을 적어주세요"},model:{value:e.comment,callback:function(t){e.comment=t},expression:"comment"}})],1)],1)])])},i=[];l._withStripped=!0;var n=a("XyMi"),o=!1;var r=function(e){o||a("UeHg")},s=Object(n.a)({name:"InterviewRegist",data:function(){return{storeId:"",opened:[!0],hireType:"T",startDate:null,endDate:null,day:null,startTime:null,endTime:null,pay:0,comment:""}},created:function(){this.storeId=this.$route.params.id,this.setHeader({visible:!0,title:"일반채용 등록",buttons:[],useBackButton:!0})}},l,i,!1,r,"data-v-726d23e3",null);s.options.__file="src/pages/InterviewRegist.vue";t.default=s.exports},LWca:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.q-field[data-v-726d23e3] {\n  position: relative;\n}\n.q-field .q-radio[data-v-726d23e3] {\n  width: 47%;\n}\n.q-field .q-checkbox + button.q-btn[data-v-726d23e3] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 0;\n  min-height: auto;\n  font-size: 0.85rem;\n}\n.label[data-v-726d23e3] {\n  margin-top: -8px;\n  margin-bottom: 12px;\n}\n.schedule-wrap[data-v-726d23e3] {\n  font-size: 1rem;\n}\nbutton.q-btn.btn-del[data-v-726d23e3] {\n  padding: 0;\n  min-height: auto;\n}\n",""])},UeHg:function(e,t,a){var l=a("LWca");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);(0,a("rjj0").default)("9d96cefe",l,!1,{})}});
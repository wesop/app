webpackJsonp([40],{Jue3:function(e,t,a){var i=a("dden");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,a("rjj0").default)("60ae131e",i,!1,{})},dden:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.page-wrap[data-v-076f28c3] {\n  padding: 20px 23px 0;\n  color: #173c51;\n}\n.q-item[data-v-076f28c3] {\n  padding: 1.4em 1em 0;\n  font-size: 1em;\n}\n.image-wrap[data-v-076f28c3] {\n  display: inline-block;\n}\n.profile-wrap[data-v-076f28c3] {\n  display: inline-block;\n  vertical-align: top;\n  font-size: 1rem;\n}\n.profile-wrap .name-wrap[data-v-076f28c3] {\n  margin-top: 8px;\n  margin-bottom: 10px;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #173c51;\n}\n.profile-wrap .period-wrap[data-v-076f28c3] {\n  margin-top: 10px;\n  font-size: 0.7rem;\n}\n.field[data-v-076f28c3] {\n  margin: 0.7em 0;\n  padding-bottom: 0.5em;\n  border-bottom: 1px solid #aacedd;\n}\n.field .label[data-v-076f28c3] {\n  margin-left: 8px;\n  margin-bottom: 4px;\n  font-size: 0.9rem;\n  font-weight: 800;\n}\n.field .text[data-v-076f28c3] {\n  margin-left: 8px;\n}\n.field[data-v-076f28c3]:last-of-type {\n  border: 0;\n}\n.time-table-wrapper[data-v-076f28c3] {\n  padding-top: 1rem;\n  position: relative;\n}\n.time-table-wrapper .btn[data-v-076f28c3] {\n  position: absolute;\n  top: 1rem;\n  line-height: 36px;\n}\n.time-table-wrapper .btn.btn-prev[data-v-076f28c3] {\n  left: 0;\n}\n.time-table-wrapper .btn.btn-next[data-v-076f28c3] {\n  right: 0;\n}\n.time-table-wrapper .editor-wrap[data-v-076f28c3] {\n  position: absolute;\n  top: -1rem;\n  right: 0;\n}\n.time-table-wrapper .editor-wrap button[data-v-076f28c3] {\n  width: 30px;\n  height: 30px;\n}\n.time-table-wrapper h4[data-v-076f28c3] {\n  margin: 0;\n  text-align: center;\n  line-height: 36px;\n  font-size: 1rem;\n  color: #36aae9;\n}\n",""])},s155:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("woOf"),s=a.n(i),n=a("5q7E"),l=(a("+J74"),a("bp97")),o=(a("B4Rf"),a("+bI7"),{name:"EmployeeDetail",data:function(){return{show:"",storeSeq:"",empSeq:"",paytype:"",emp:null,visibleTimetableAddModal:!1,timeTable:null,selectedTimetable:null,moreButtons:[],sliderIndex:0,images:[]}},watch:{visibleTimetableAddModal:function(e){e||(this.selectedTimetable=null)}},methods:{getEmp:function(){return n.a.get(this.empSeq)},getEmpSchedules:function(){return n.a.getSchedules(this.empSeq)},showHelpTimeTable:function(){},removeTimetable:function(){var e=this;this.showAlert("한 번 삭제하면 다시 등록해야 합니다.\n정말로 삭제하시겠습니까?",{cancel:"취소",confirm:"삭제"}).then(function(t){if(t){var a=e.timeTable.selected.schedules;a.forEach(function(e){return e&&(e.USE_FLAG="0")}),n.a.updateSchedules(a).then(function(){setTimeout(function(){e.showAlert("시간표를 삭제했습니다."),e.timeTable.delete(e.timeTable.index)},0)}).catch(function(){e.showAlert("시간표 삭제에 문제가 생겼습니다.")})}})},editTimetable:function(){this.selectedTimetable=this.timeTable.selected,this.visibleTimetableAddModal=!0},addTimetable:function(){this.selectedTimetable=null,this.visibleTimetableAddModal=!0},insertCompleteTimetable:function(e){this.timeTable.add(e)},updateCompleteTimetable:function(e){this.timeTable.update(e)}},created:function(){var e=this;this.show=this.$route.query.PayShow,this.emp=this.$route.query.emp,this.empSeq=this.$route.params.id,this.storeSeq=this.$route.query.storeSeq,this.isManager=this.$route.query.isManager,"2"==this.emp.PAY_TYPE?this.paytype="월급":"1"==this.emp.PAY_TYPE?this.paytype="일급":this.paytype="시급",this.getEmp().then(function(t){setTimeout(function(){e.emp=s()(e.emp,t)},0)}),this.getEmpSchedules().then(function(t){e.timeTable=new l.a(t)}).catch(function(t){return e.showAlert(t.message)}),console.log("D this.emp",this.emp),console.log("D query.emp:",this.$route.query.emp),"1"==this.user.STORE?this.moreButtons=[{icon:"mode edit",label:"수정하기",color:"blue",click:function(){e.isOwner||1!=e.emp.IS_MANAGER?e.pagePush({name:"EmployeeModify",params:{id:e.empSeq},query:{storefivetype:e.$route.query.storefivetype,storeSeq:e.storeSeq,emp:e.emp,type:"0"}}):e.showAlert("매니저 직책은 점장만 수정할 수 있습니다.")}},{icon:"attach money",label:"급여정보",color:"blue",click:function(){e.pagePush({name:"EmployeePay",params:{id:e.empSeq},query:{storeSeq:e.storeSeq,start:e.emp.START,end:e.emp.END}})}}]:this.user.MEMBER_SEQ==this.emp.MEMBER_SEQ?"1"==this.emp.PAY_SHOW?this.moreButtons=[{icon:"mode edit",label:"수정하기",color:"blue",click:function(){e.isOwner||1!=e.emp.IS_MANAGER?e.pagePush({name:"EmployeeModify",params:{id:e.empSeq},query:{storefivetype:e.$route.query.storefivetype,storeSeq:e.storeSeq,emp:e.emp,type:"0"}}):e.showAlert("매니저 직책은 점장만 수정할 수 있습니다.")}},{icon:"attach money",label:"급여정보",color:"blue",click:function(){e.pagePush({name:"EmployeePay",params:{id:e.empSeq},query:{storeSeq:e.storeSeq,start:e.emp.START,end:e.emp.END}})}}]:this.moreButtons=[{icon:"mode edit",label:"수정하기",color:"blue",click:function(){e.isOwner||1!=e.emp.IS_MANAGER?e.pagePush({name:"EmployeeModify",params:{id:e.empSeq},query:{storefivetype:e.$route.query.storefivetype,storeSeq:e.storeSeq,emp:e.emp,type:"0"}}):e.showAlert("매니저 직책은 점장만 수정할 수 있습니다.")}}]:"1"==this.$route.query.OtherpayShow?this.moreButtons=[{icon:"mode edit",label:"수정하기",color:"blue",click:function(){e.isOwner||1!=e.emp.IS_MANAGER?e.pagePush({name:"EmployeeModify",params:{id:e.empSeq},query:{storefivetype:e.$route.query.storefivetype,storeSeq:e.storeSeq,emp:e.emp,type:"0"}}):e.showAlert("매니저 직책은 점장만 수정할 수 있습니다.")}},{icon:"attach money",label:"급여정보",color:"blue",click:function(){e.pagePush({name:"EmployeePay",params:{id:e.empSeq},query:{storeSeq:e.storeSeq,start:e.emp.START,end:e.emp.END}})}}]:this.moreButtons=[{icon:"mode edit",label:"수정하기",color:"blue",click:function(){e.isOwner||1!=e.emp.IS_MANAGER?e.pagePush({name:"EmployeeModify",params:{id:e.empSeq},query:{storefivetype:e.$route.query.storefivetype,storeSeq:e.storeSeq,emp:e.emp,type:"0"}}):e.showAlert("매니저 직책은 점장만 수정할 수 있습니다.")}}],this.setHeader({visible:!0,title:"직원정보",useBackButton:!0,more:{use:!0,buttons:this.moreButtons}})}}),r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.emp?i("q-page",[i("section",{staticClass:"page-wrap"},[i("div",{staticClass:"field"},[i("div",{staticClass:"image-wrap huge"},[e.emp.images.length?i("img",{attrs:{src:"http://api.shop-sol.com/uploads/"+e.emp.images[0].IMAGE,alt:"emp_profile"}}):i("img",{attrs:{src:a("QDQH"),alt:"emp_profile"}})]),e._v(" "),i("div",{staticClass:"profile-wrap"},[i("div",{staticClass:"text name-wrap"},[e._v("\n          "+e._s(decodeURIComponent(e.emp.EMP_NAME))+"\n          "),i("small",{staticClass:"text-darkblue"},[e._v("\n            ("+e._s(0!=e.emp.IS_MANAGER?"매니저":"직원")+")\n          ")])]),e._v(" "),i("div",{staticClass:"text"}),e._v(" "),i("div",{staticClass:"text period-wrap"},[i("span",{staticClass:"text-darkblue"},[e._v("근무기간 : ")]),e._v(" "),null!=e.emp.END?i("span",{staticClass:"text-paleblue"},[e._v(e._s(e._f("dateFormat")(e.emp.START,"YYYY.MM.DD"))+" ~ "+e._s(e._f("dateFormat")(e.emp.END,"YYYY.MM.DD")))]):i("span",{staticClass:"text-paleblue"},[e._v(e._s(e._f("dateFormat")(e.emp.START,"YYYY.MM.DD"))+" ~"+e._s("계속"))])])])]),e._v(" "),i("div",{staticClass:"field"},[i("div",{staticClass:"label"},[e._v("\n        근무 일정\n        ")]),e._v(" "),e.timeTable?i("div",{staticClass:"time-table-wrapper"},[e.timeTable.list.length&&!e.timeTable.isFirst()?i("button",{staticClass:"btn btn-prev",attrs:{type:"button"},on:{click:function(t){e.timeTable.prev()}}},[i("q-icon",{attrs:{name:"keyboard_arrow_left",color:"paleblue",size:"2rem"}})],1):e._e(),e._v(" "),e.timeTable.list.length&&!e.timeTable.isLast()?i("button",{staticClass:"btn btn-next",attrs:{type:"button"},on:{click:function(t){e.timeTable.next()}}},[i("q-icon",{attrs:{name:"keyboard_arrow_right",color:"paleblue",size:"2rem"}})],1):e._e(),e._v(" "),e.isOwner||"1"==e.isManager?i("div",{staticClass:"editor-wrap"},[e.timeTable.list.length&&e.timeTable.isFuture()?i("button",{attrs:{type:"button"},on:{click:e.removeTimetable}},[i("q-icon",{attrs:{name:"delete_forever",color:"em",size:"1.5rem"}})],1):e._e(),e._v(" "),e.timeTable.list.length&&(e.timeTable.isFuture()||e.timeTable.isLast()||e.timeTable.isCurrent())?i("button",{attrs:{type:"button"},on:{click:e.editTimetable}},[i("q-icon",{attrs:{name:"edit",color:"blue",size:"1.5rem"}})],1):e._e(),e._v(" "),i("button",{attrs:{type:"button"},on:{click:e.addTimetable}},[i("q-icon",{attrs:{name:"add",color:"paleblue",size:"1.5rem"}})],1)]):e._e(),e._v(" "),e.timeTable.list.length?i("h4",[e._v("\n          "+e._s(e._f("dateFormat")(e.timeTable.selected.start,"YYYY.MM.DD"))+" ~ "+e._s(e._f("dateFormat")(e.timeTable.selected.end,"YYYY.MM.DD"))+"\n          "+e._s(e.timeTable.isCurrent()?"(현재)":"")+"\n        ")]):e._e(),e._v(" "),e.timeTable.list.length?i("Timetable",{attrs:{timeTable:e.timeTable.selected}}):e._e()],1):e._e()]),e._v(" "),e.isOwner||e.user.MEMBER_SEQ==e.emp.MEMBER_SEQ&&"1"==e.show||e.user.MEMBER_SEQ!=e.emp.MEMBER_SEQ&&"1"==e.$route.query.OtherpayShow?i("div",{staticClass:"field"},[i("div",{staticClass:"label"},[e._v("근무형태 및 급여")]),e._v(" "),i("div",{staticClass:"text text-paleblue",attrs:{"text-right":""}},[i("span",[e._v(e._s(e.paytype)+" / ")]),e._v(" "),i("span",[e._v(e._s(e._f("currency")(e.emp.PAY)))])])]):e._e(),e._v(" "),i("div",{staticClass:"field"},[i("div",{staticClass:"label"},[e._v("급여지급일")]),e._v(" "),i("div",{staticClass:"text text-paleblue",attrs:{"text-right":""}},[e._v("\n        매월 "+e._s(e.emp.PAY_DAY)+"일\n      ")])])]),e._v(" "),i("TimetableAddModal",{attrs:{emp:e.emp,timetableData:e.selectedTimetable},on:{insertComplete:e.insertCompleteTimetable,updateComplete:e.updateCompleteTimetable},model:{value:e.visibleTimetableAddModal,callback:function(t){e.visibleTimetableAddModal=t},expression:"visibleTimetableAddModal"}})],1):e._e()},p=[];r._withStripped=!0;var m=a("XyMi"),c=!1;var d=function(e){c||a("Jue3")},u=Object(m.a)(o,r,p,!1,d,"data-v-076f28c3",null);u.options.__file="src/pages/EmployeeDetail.vue";t.default=u.exports}});
webpackJsonp([21],{"0ejJ":function(t,e,n){"use strict";var a={name:"WorkerIntroModal",data:function(){return{}},props:{introText:{type:String,required:!0,default:""},visible:{type:Boolean,required:!0,default:!1}},computed:{lineBreakIntroText:function(){return this.introText.replace(/\n/gi,"<br />")}}},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Modal",{model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("div",{attrs:{"padding-left":"","padding-right":""}},[n("q-field",{attrs:{label:"자기소개서"}}),t._v(" "),n("div",{staticClass:"intro-text-wrap",attrs:{"text-left":""},domProps:{innerHTML:t._s(t.lineBreakIntroText)}})],1),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("q-btn",{attrs:{label:"닫기"},on:{click:function(e){t.$emit("close")}}})],1)])},r=[];i._withStripped=!0;var s=n("XyMi"),l=!1;var o=function(t){l||n("ujIt")},c=Object(s.a)(a,i,r,!1,o,"data-v-dced7b22",null);c.options.__file="src/components/WorkerIntroModal.vue";e.a=c.exports},"0hvi":function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.image-wrap[data-v-0136c83e] {\n  margin: 0 4px;\n}\n.image-wrap[data-v-0136c83e]:first-child {\n  margin-left: 0;\n}\n.label[data-v-0136c83e] {\n  margin-top: -8px;\n  margin-bottom: 12px;\n}\nsmall[data-v-0136c83e] {\n  font-size: 0.8rem;\n}\n",""])},JHXO:function(t,e,n){var a=n("0hvi");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n("rjj0").default)("10bbc580",a,!1,{})},ZBqF:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("/7YS"),i={name:"RealTimeWorkerDetail",data:function(){return{workerId:null,worker:null,visible:!1,introText:"저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n저는 카페 업무 경력이 많습니다.\n"}},methods:{callToWorker:function(){var t=this;this.showAlert(this.worker.name+"님에게 전화하시겠습니까?",[{label:"통화",click:function(){t.hideAlert()}},{label:"취소",click:function(){t.hideAlert()}}])}},components:{WorkerIntroModal:n("0ejJ").a},created:function(){this.workerId=this.$route.params.id,this.worker=new a.b({name:"박보영"}),this.setHeader({visible:!0,title:"번개채용",buttons:[],useBackButton:!0})}},r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[a("section",{staticClass:"page-wrap"},[a("q-field",{attrs:{label:"프로필 사진","margin-top":"","padding-bottom":""}},t._l([1,2],function(t){return a("div",{key:t,staticClass:"image-wrap large"},[a("img",{attrs:{src:n("0TD1"),alt:"employee detail"}})])})),t._v(" "),a("q-field",{attrs:{label:"이름","margin-top":""}},[a("div",{staticClass:"label"},[t._v("\n        "+t._s(t.worker.name)+"\n      ")])]),t._v(" "),a("q-field",{attrs:{label:"성별/연령대","margin-top":""}},[a("div",{staticClass:"label"},[a("span",[t._v(t._s(t._f("localeText")(t.worker.gender,"GENDER")))]),t._v(" /\n        "),a("span",[t._v(t._s(t._f("localeText")(t.worker.ages,"AGES")))])])]),t._v(" "),a("q-field",{attrs:{label:"근무 가능시간","margin-top":""}},[a("div",{staticClass:"label"},[a("strong",{staticClass:"text-em"},[t._v("오전 10:00")]),t._v("\n        부터\n        "),a("strong",{staticClass:"text-em"},[t._v("오후 1:00")]),t._v("\n        까지\n      ")])]),t._v(" "),a("q-field",{attrs:{label:"매장과의 현재 거리","margin-top":""}},[a("div",{staticClass:"label"},[t._v("\n        4.3km\n        "),a("q-btn",{attrs:{icon:"room",size:".9rem","text-color":"em","no-padding":""},on:{click:function(){}}})],1)]),t._v(" "),a("div",{staticClass:"label-wrap"},[a("label",[a("strong",[t._v("샵솔지수")]),t._v(" "),a("button",{attrs:{type:"button"}},[a("i",{staticClass:"text-em material-icons"},[t._v("help_outline")]),t._v(" "),a("q-tooltip",{attrs:{anchor:"top left",self:"bottom right",offset:[-18,0]}},[a("p",[t._v("샵솔지수란?")]),t._v(" "),a("div",[t._v("\n              샵솔지수는 이러해서 저렇게 나온 그런 지수입니다.\n              채용에 도움이 되는 정보이니 참고해주세요! :)\n            ")])])],1)]),t._v(" "),a("div",{staticClass:"label"},[a("q-icon",{attrs:{size:"2rem",color:"em",name:"sentiment_very_satisfied"}}),t._v(" "),a("q-icon",{attrs:{size:"2rem",color:"secondary",name:"sentiment_satisfied"}}),t._v(" "),a("q-icon",{attrs:{size:"2rem",color:"positive",name:"sentiment_neutral"}}),t._v(" "),a("q-icon",{attrs:{size:"2rem",color:"warning",name:"sentiment_dissatisfied"}}),t._v(" "),a("q-icon",{attrs:{size:"2rem",color:"tertiary",name:"sentiment_very_dissatisfied"}})],1)]),t._v(" "),a("q-field",{attrs:{label:"희망시급","margin-top":""}},[a("div",{staticClass:"label"},[t._v("\n        "+t._s(8e3)+"원\n        "),a("div",[a("small",[t._v("* 2018년 최저시급은 "),a("strong",{staticClass:"text-em"},[t._v("7,530원")]),t._v(" 입니다.")])])])]),t._v(" "),a("q-field",{attrs:{label:"간단한 자기소개(3줄 요약)","margin-top":""}},[a("div",{staticClass:"label"},[t._v("저는 카페 업무 경력이 많습니다.")]),t._v(" "),a("div",{staticClass:"label"},[t._v("저는 성실한편 입니다.")]),t._v(" "),a("div",{staticClass:"label"},[t._v("믿고 뽑아주세요.")]),t._v(" "),a("q-btn",{staticClass:"text-black",attrs:{label:"펼쳐보기",color:"transparent","icon-right":"keyboard arrow right",size:"1rem","no-padding":""},on:{click:function(e){t.visible=!0}}})],1)],1),t._v(" "),a("WorkerIntroModal",{attrs:{visible:t.visible,introText:t.introText},on:{close:function(e){t.visible=!1}}}),t._v(" "),a("FloatingButton",{attrs:{icon:"call"},on:{click:t.callToWorker}})],1)},s=[];r._withStripped=!0;var l=n("XyMi"),o=!1;var c=function(t){o||n("JHXO")},v=Object(l.a)(i,r,s,!1,c,"data-v-0136c83e",null);v.options.__file="src/pages/RealTimeWorkerDetail.vue";e.default=v.exports},ntDJ:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,'\n.intro-text-wrap[data-v-dced7b22] {\n  font-size: 1rem;\n  line-height: 160%;\n}\ndiv[slot="footer"][data-v-dced7b22] {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n}\n',""])},ujIt:function(t,e,n){var a=n("ntDJ");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n("rjj0").default)("ea6ce8e0",a,!1,{})}});
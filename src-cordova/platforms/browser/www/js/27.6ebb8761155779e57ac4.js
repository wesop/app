webpackJsonp([27],{"144o":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("/7YS"),i=a("ye8Q"),s={name:"UserUpdate2",data:function(){return{updatedUser:null}},methods:{update:function(){var e=this;i.a.changepwd({PASSWORD:this.updatedUser.PASSWORD,PASSWORD_CONFIRM:this.updatedUser.PASSWORD_CONFIRM,MobileNo:this.updatedUser.MobileNo,EMAIL:this.updatedUser.EMAIL}).then(function(t){console.log(t),"success"==t?e.showAlert("비밀번호를 변경하였습니다. 로그인화면으로 이동합니다.").then(function(){e.pagePush({name:"Login",replace:!0})}):e.showAlert("정보가 정확하지않습니다.메일과 핸드폰번호를 다시 확인해주세요.")}).catch(function(t){return e.showAlert(t.message)})}},created:function(){this.updatedUser=new n.a(this.$route.query),this.setHeader({visible:!0,title:"비밀번호변경하기",buttons:[],useBackButton:!0}),this.setFooter({visible:!1})}},o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",[a("form",[a("q-list",{attrs:{"no-padding":"","no-border":""}},[a("q-item",[a("q-item-main",[a("q-field",{attrs:{label:"아이디(휴대폰번호)"}},[a("q-input",{attrs:{readonly:"","hide-underline":"","margin-bottom":"",type:"tel"},model:{value:e.updatedUser.MobileNo,callback:function(t){e.$set(e.updatedUser,"MobileNo",t)},expression:"updatedUser.MobileNo"}})],1)],1)],1),e._v(" "),a("q-item",[a("q-item-main",[a("q-field",{attrs:{label:"이메일",required:""}},[a("q-input",{attrs:{"hide-underline":"","margin-bottom":"",autocomplete:"email",type:"email",placeholder:"이메일"},model:{value:e.updatedUser.EMAIL,callback:function(t){e.$set(e.updatedUser,"EMAIL",t)},expression:"updatedUser.EMAIL"}})],1)],1)],1),e._v(" "),a("q-item",[a("q-item-main",[a("q-field",{attrs:{label:"비밀번호(영문자, 숫자 조합하여 10자 이상)",required:""}}),e._v(" "),a("q-input",{attrs:{"hide-underline":"","margin-bottom":"","no-pass-toggle":"",autocomplete:"false",type:"password",placeholder:"비밀번호"},model:{value:e.updatedUser.PASSWORD,callback:function(t){e.$set(e.updatedUser,"PASSWORD",t)},expression:"updatedUser.PASSWORD"}}),e._v(" "),a("q-input",{attrs:{"hide-underline":"","margin-bottom":"","no-pass-toggle":"",autocomplete:"false",type:"password",placeholder:"비밀번호 확인"},model:{value:e.updatedUser.PASSWORD_CONFIRM,callback:function(t){e.$set(e.updatedUser,"PASSWORD_CONFIRM",t)},expression:"updatedUser.PASSWORD_CONFIRM"}})],1)],1),e._v(" "),a("q-item-separator"),e._v(" "),a("q-item",[a("q-item-main",[a("q-btn",{staticClass:"btn-signup full-width",attrs:{label:"변경하기",color:"black",type:"button"},on:{click:e.update}})],1)],1)],1)],1)])},d=[];o._withStripped=!0;var r=a("XyMi"),l=!1;var u=function(e){l||a("BVhl")},p=Object(r.a)(s,o,d,!1,u,"data-v-c6e8176c",null);p.options.__file="src/pages/UserUpdate2.vue";t.default=p.exports},BVhl:function(e,t,a){var n=a("y4WA");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,a("rjj0").default)("6b6c98a4",n,!1,{})},y4WA:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.q-item[data-v-c6e8176c] {\n  padding: 0 0.8em;\n}\n.q-item .q-item-main[data-v-c6e8176c] {\n  padding-top: 1.2em;\n  padding-bottom: 1.2em;\n}\n.q-item .text[data-v-c6e8176c] {\n  font-size: 1.275rem;\n}\n.q-item .q-item-side .text[data-v-c6e8176c] {\n  padding-right: 0.5em;\n}\n.q-item .q-btn[data-v-c6e8176c] {\n  padding: 12px;\n}\n",""])}});
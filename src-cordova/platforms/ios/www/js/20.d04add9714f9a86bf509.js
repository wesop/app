webpackJsonp([20],{"9TZE":function(e,n,o){e.exports=o.p+"img/logo_0.ab1c4f0.png"},P7ry:function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});o("/7YS");var a=o("Iw9D"),t={name:"Login",data:function(){return{MobileNo:"",PASSWORD:"",isKeep:!1}},methods:{authorize:function(){var e=this;a.a.visible=!0,this.$service.user.authorize({MobileNo:this.MobileNo,PASSWORD:this.PASSWORD,Device_Version:device.version,Device_Platform:device.platform,Device_Model:device.model,App_Version:navigator.appInfo.version}).then(function(n){a.a.visible=!1,n.PASSWORD=e.PASSWORD,e.clearInfo(),e.setUser(n),e.$service.app.setKeepLogin(e.isKeep),e.setBackgroundProcessor({name:"refreshAuthorization",process:e.refreshAuthorization,interval:18e5}),StatusBar.show(),e.isOwner?e.pagePush({name:"Main",replace:!0}):e.pagePush({name:"WorkerMain",replace:!0})}).catch(function(n){a.a.visible=!1,e.showAlert(n.message||"사용자 정보가 맞지 않습니다! :(")})},keepLogin:function(){this.$service.app.isKeepLogin()&&(this.MobileNo=this.user.MobileNo,this.PASSWORD=this.user.PASSWORD,this.isKeep=!0,this.authorize())},clearInfo:function(){this.MobileNo="",this.PASSWORD=""}},watch:{},beforeCreate:function(){},created:function(){console.log("navigator:",navigator),console.log("appVersion:",navigator.appVersion),console.log("platform:",navigator.platform),console.log("navigator.appInfo:",navigator.appInfo),console.log("appInfo.version:",navigator.appInfo.version),console.log("device:",device),this.$service.user.check(navigator.appInfo.version,navigator.platform,navigator.appVersion,navigator.userAgent,device.version,device.platform,device.model).then(function(e){null==e||(console.log("navigator.app :",navigator.app),console.log("cordova.plugins.market :",cordova.plugins.market),console.log("스토어 이동 :",e),console.log("device.platform :",device.platform),console.log("navigator.notification :",navigator.notification),navigator.notification.confirm("새로운 버전이 있습니다 스토어로 이동하여 새로운 버전을 설치하십시오.",function(e){console.log("index :",e),1==e&&("iOS"==device.platform?cordova.plugins.market.open("id1408364175"):cordova.plugins.market.open("com.wesop.appshopsol"))},"알림",["확인","취소"]))}).catch(function(e){console.log("err=",e)}),StatusBar.hide(),this.removeBackgroundProcessor("refreshAuthorization"),this.setHeader({visible:!1}),this.setFooter({visible:!1}),this.keepLogin()},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestory:function(){},destroyed:function(){}},i=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("q-page",[a("section",{staticClass:"page-wrap"},[a("div",{staticClass:"row items-center logo-wrap",attrs:{"padding-top":""}},[a("div",{staticClass:"col-12",attrs:{"text-center":""}},[a("img",{attrs:{src:o("9TZE"),alt:"logo"}})])]),e._v(" "),a("form",[a("q-field",{staticClass:"text-white",attrs:{label:"로그인","margin-top":""}}),e._v(" "),a("div",[a("q-input",{staticClass:"input-box",attrs:{dark:"","hide-underline":"",color:"white",maxlength:"11",type:"tel",placeholder:"휴대폰번호(숫자만)"},model:{value:e.MobileNo,callback:function(n){e.MobileNo="string"==typeof n?n.trim():n},expression:"MobileNo"}})],1),e._v(" "),a("div",{attrs:{"margin-top":"","padding-bottom":""}},[a("q-input",{staticClass:"input-box",attrs:{dark:"","hide-underline":"","no-pass-toggle":"",autocomplete:"false",color:"white",type:"password",placeholder:"비밀번호"},on:{keyup:function(n){if(!("button"in n)&&e._k(n.keyCode,"enter",13,n.key))return null;e.authorize(n)}},model:{value:e.PASSWORD,callback:function(n){e.PASSWORD="string"==typeof n?n.trim():n},expression:"PASSWORD"}})],1),e._v(" "),a("div",{staticClass:"checkbox-wrap"},[a("label",{attrs:{for:"is-keep"}},[e._v("로그인 유지")]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.isKeep,expression:"isKeep"}],attrs:{id:"is-keep",type:"checkbox"},domProps:{checked:Array.isArray(e.isKeep)?e._i(e.isKeep,null)>-1:e.isKeep},on:{change:function(n){var o=e.isKeep,a=n.target,t=!!a.checked;if(Array.isArray(o)){var i=e._i(o,null);a.checked?i<0&&(e.isKeep=o.concat([null])):i>-1&&(e.isKeep=o.slice(0,i).concat(o.slice(i+1)))}else e.isKeep=t}}}),e._v(" "),a("div",{staticClass:"checkbox-bg-wrap"})])],1),e._v(" "),a("div",{staticClass:"btn-login-wrap"},[a("q-btn",{staticClass:"btn-login full-width",attrs:{color:"white","text-color":"blue",label:"로그인",size:"1.25rem"},on:{click:e.authorize}})],1),e._v(" "),a("div",{staticClass:"btn-signup-wrap"},[a("q-btn",{staticClass:"full-width",attrs:{color:"transparent","text-color":"white",label:"회원가입",size:"1.25rem"},on:{click:function(n){e.pagePush({name:"SignupPrivacy"})}}})],1),e._v(" "),a("div",{staticClass:"btn-find-wrap"},[a("q-btn",{staticClass:"full-width",attrs:{color:"transparent",label:"비밀번호 찾기"},on:{click:function(n){e.pagePush({name:"SignupCertify",query:{next:"UserUpdate2"}})}}})],1)])])},r=[];i._withStripped=!0;var s=o("XyMi"),p=!1;var c=function(e){p||o("V0Pp")},l=Object(s.a)(t,i,r,!1,c,"data-v-15717af5",null);l.options.__file="src/pages/Login.vue";n.default=l.exports},"USJ/":function(e,n,o){e.exports=o.p+"img/bg_login.cd76275.jpg"},V0Pp:function(e,n,o){var a=o("eR1a");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,o("rjj0").default)("7cb93934",a,!1,{})},cM1G:function(e,n){e.exports="data:image/png;base64,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"},eR1a:function(e,n,o){var a=o("kxFB");(e.exports=o("FZ+f")(!1)).push([e.i,"\n.q-layout-page[data-v-15717af5] {\n  background-image: url("+a(o("USJ/"))+');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: auto 100%;\n}\n.q-layout-page .page-wrap[data-v-15717af5] {\n  position: absolute;\n  width: 100%;\n  bottom: 0;\n  top: 0;\n  overflow-y: auto;\n}\n@media only screen and (min-width: 767px) and (orientation: landscape) {\n.q-layout-page[data-v-15717af5] {\n    background-size: 100% auto;\n    background-position: center 10%;\n}\n}\n@media screen and (min-aspect-ratio: 10/13) {\n.q-layout-page[data-v-15717af5] {\n    background-size: 100% auto;\n    background-position: center top;\n}\n}\n.logo-wrap[data-v-15717af5] {\n  margin-top: 116px;\n  margin-bottom: 56px;\n}\n.logo-wrap img[data-v-15717af5] {\n  width: 214px;\n}\n@media only screen and (max-height: 568px) {\n.logo-wrap[data-v-15717af5] {\n    margin-top: 81px;\n    margin-bottom: 21px;\n}\n.logo-wrap img[data-v-15717af5] {\n    width: 179px;\n}\n}\n.input-box[data-v-15717af5] {\n  padding: 0.5em;\n  border: 1px solid rgba(255,255,255,0.3);\n}\n.checkbox-wrap[data-v-15717af5] {\n  position: relative;\n  margin: 0.5em 0;\n  padding-left: 24px;\n  line-height: 14px;\n}\n.checkbox-wrap label[data-v-15717af5] {\n  font-size: 0.9rem;\n  color: #fff;\n}\n.checkbox-wrap input[type="checkbox"][data-v-15717af5] {\n  display: none;\n}\n.checkbox-wrap input[type="checkbox"] + .checkbox-bg-wrap[data-v-15717af5] {\n  background: none;\n}\n.checkbox-wrap input[type="checkbox"]:checked + .checkbox-bg-wrap[data-v-15717af5] {\n  background-image: url('+a(o("cM1G"))+");\n  background-repeat: no-repeat;\n  background-size: 16px;\n  border: 0;\n}\n.checkbox-wrap .checkbox-bg-wrap[data-v-15717af5] {\n  position: absolute;\n  display: inline-block;\n  top: 0;\n  left: 0;\n  width: 16px;\n  height: 16px;\n  border: 1px solid #fff;\n  box-sizing: border-box;\n}\n.btn-login-wrap[data-v-15717af5] {\n  margin-top: 1em;\n}\n.btn-login-wrap .btn-login[data-v-15717af5] {\n  font-weight: 600;\n}\n.btn-signup-wrap[data-v-15717af5] {\n  margin-top: 0.5em;\n}\n.btn-signup-wrap button[data-v-15717af5] {\n  border: 1px solid #fff;\n}\n.btn-find-wrap[data-v-15717af5] {\n  margin-top: 0.5em;\n}\n",""])}});
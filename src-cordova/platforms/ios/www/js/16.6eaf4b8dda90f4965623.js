webpackJsonp([16],{SldL:function(t,e){!function(e){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag",c="object"==typeof t,l=e.regeneratorRuntime;if(l)c&&(t.exports=l);else{(l=e.regeneratorRuntime=c?t.exports:{}).wrap=b;var f="suspendedStart",p="suspendedYield",h="executing",d="completed",g={},v={};v[a]=function(){return this};var y=Object.getPrototypeOf,m=y&&y(y(R([])));m&&m!==n&&o.call(m,a)&&(v=m);var w=E.prototype=_.prototype=Object.create(v);L.prototype=w.constructor=E,E.constructor=L,E[s]=L.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===L||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(w),t},l.awrap=function(t){return{__await:t}},O(S.prototype),S.prototype[u]=function(){return this},l.AsyncIterator=S,l.async=function(t,e,r,n){var o=new S(b(t,e,r,n));return l.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},O(w),w[s]="Generator",w[a]=function(){return this},w.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=R,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return u.type="throw",u.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var s=o.call(a,"catchLoc"),c=o.call(a,"finallyLoc");if(s&&c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:R(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),g}}}function b(t,e,r,n){var o=e&&e.prototype instanceof _?e:_,i=Object.create(o.prototype),a=new M(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===h)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=q(a,r);if(u){if(u===g)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var s=x(t,e,r);if("normal"===s.type){if(n=r.done?d:p,s.arg===g)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=d,r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function x(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function _(){}function L(){}function E(){}function O(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function S(t){var e;this._invoke=function(r,n){function i(){return new Promise(function(e,i){!function e(r,n,i,a){var u=x(t[r],t,n);if("throw"!==u.type){var s=u.arg,c=s.value;return c&&"object"==typeof c&&o.call(c,"__await")?Promise.resolve(c.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(c).then(function(t){s.value=t,i(s)},a)}a(u.arg)}(r,n,e,i)})}return e=e?e.then(i,i):i()}}function q(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,q(t,e),"throw"===e.method))return g;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=x(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,g;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,g):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function M(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function R(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:P}}function P(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},Xxa5:function(t,e,r){t.exports=r("jyFz")},cd47:function(t,e,r){var n=r("lZ9j");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,r("rjj0").default)("112d85f1",n,!1,{})},exGp:function(t,e,r){"use strict";e.__esModule=!0;var n,o=r("//Fk"),i=(n=o)&&n.__esModule?n:{default:n};e.default=function(t){return function(){var e=t.apply(this,arguments);return new i.default(function(t,r){return function n(o,a){try{var u=e[o](a),s=u.value}catch(t){return void r(t)}if(!u.done)return i.default.resolve(s).then(function(t){n("next",t)},function(t){n("throw",t)});t(s)}("next")})}}},eyK5:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("Xxa5"),o=r.n(n),i=r("exGp"),a=r.n(i),u=(r("ye8Q"),r("/7YS")),s=(r("VKRC"),{name:"SignupForm",data:function(){return{signupUser:null}},props:{policies:Array},methods:{signup:function(){var t=this,e=this.signupUser;this.$service.user.signup(e).then(function(){t.showAlert("축하드립니다!\n회원으로 등록되셨습니다 :)").then(a()(o.a.mark(function r(){var n;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.$service.user.authorize(e);case 2:n=r.sent,t.setUser(n),t.isOwner?t.pagePush({name:"Main",replace:!0}):t.pagePush({name:"WorkerMain",replace:!0});case 5:case"end":return r.stop()}},r,t)})))}).catch(function(e){return t.showAlert(e.message||"이미 가입된 정보입니다.")})},goMain:function(t){var e="WorkerMain";t&&(e="Main"),this.pagePush({name:e,replace:!0})}},beforeCreate:function(){},created:function(){this.signupUser=new u.a(this.$route.query),this.setHeader({visible:!0,title:"회원가입",useBackButton:!0}),this.setFooter({visible:!1})},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestory:function(){},destroyed:function(){}}),c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",[r("form",[r("q-list",{attrs:{"no-padding":"","no-border":""}},[r("q-item",[r("q-item-main",[r("q-field",{staticClass:"text-blue",attrs:{label:"아이디(휴대폰번호)"}},[r("q-input",{attrs:{readonly:"",color:"blue",type:"tel",placeholder:"휴대폰번호(숫자만)"},model:{value:t.signupUser.MobileNo,callback:function(e){t.$set(t.signupUser,"MobileNo",e)},expression:"signupUser.MobileNo"}})],1)],1)],1),t._v(" "),r("q-item",[r("q-item-main",[r("q-field",{staticClass:"text-blue",attrs:{required:"",label:"이메일"}},[r("q-input",{attrs:{color:"blue",autocomplete:"email",type:"email",placeholder:"이메일"},model:{value:t.signupUser.EMAIL,callback:function(e){t.$set(t.signupUser,"EMAIL",e)},expression:"signupUser.EMAIL"}})],1)],1)],1),t._v(" "),r("q-item",[r("q-item-main",[r("q-field",{staticClass:"text-blue",attrs:{required:"",label:"비밀번호(영문자, 숫자 조합하여 8자 이상)"}}),t._v(" "),r("q-input",{attrs:{"no-pass-toggle":"",autocomplete:"false",color:"blue",type:"password",placeholder:"비밀번호"},model:{value:t.signupUser.PASSWORD,callback:function(e){t.$set(t.signupUser,"PASSWORD",e)},expression:"signupUser.PASSWORD"}}),t._v(" "),r("br"),t._v(" "),r("q-input",{attrs:{"no-pass-toggle":"",autocomplete:"false",color:"blue",type:"password",placeholder:"비밀번호 확인"},model:{value:t.signupUser.PASSWORD_CONFIRM,callback:function(e){t.$set(t.signupUser,"PASSWORD_CONFIRM",e)},expression:"signupUser.PASSWORD_CONFIRM"}})],1)],1)],1)],1),t._v(" "),r("q-btn",{staticClass:"btn-signup full-width",attrs:{label:"가입하기",color:"paleblue"},on:{click:t.signup}})],1)},l=[];c._withStripped=!0;var f=r("XyMi"),p=!1;var h=function(t){p||r("cd47")},d=Object(f.a)(s,c,l,!1,h,"data-v-45428da0",null);d.options.__file="src/pages/SignupForm.vue";e.default=d.exports},jyFz:function(t,e,r){var n=function(){return this}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r("SldL"),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(t){n.regeneratorRuntime=void 0}},lZ9j:function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,"\n.q-layout-page[data-v-45428da0] {\n  padding-bottom: 44px;\n}\n.q-item[data-v-45428da0] {\n  padding: 1.4em 1em 0;\n  font-size: 1em;\n}\n.btn-signup[data-v-45428da0] {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 57px;\n}\n",""])}});
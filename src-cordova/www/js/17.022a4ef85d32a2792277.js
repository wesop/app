webpackJsonp([17],{"4+zc":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("Xxa5"),o=r.n(n),i=r("exGp"),a=r.n(i),s=r("PJh5"),c=r.n(s),l=r("Iw9D"),u=(r("BgAE"),r("B4Rf"),r("JmJv")),h={name:"Store",data:function(){return{moreButtons:[],selectedStore:null,visibleOwnerModal:!1,stores:[],waitStores:[],workEndedStores:[]}},computed:{listItemHeight:function(){var t=this.deviceHeight-172;return t/Math.round(t/180)}},methods:{initStoresData:function(){var t=this;l.a.visible=!0,this.getStores().then(function(t){return t}).then(function(e){return t.getStoresData(e)}).then(function(){return l.a.visible=!1}).catch(function(e){l.a.visible=!1,t.showAlert(e.message)})},getStores:function(){return u.a.list(this.user)},getStoreImages:function(t){return u.a.getStoreImages(t)},getStoreEmpList:function(t){return u.a.getEmpList(t)},getEmpSize:function(t){return u.a.getEmpSize(t)},getWorkingEmpList:function(t){return u.a.getWorkingEmpList(t)},getStoresData:function(t){var e=this;return a()(o.a.mark(function r(){var n,i,a,s,l;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:n=[],i=[],a=[],s=o.a.mark(function r(s){var l;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return l=t[s],console.log("",l),r.prev=2,r.next=5,e.getStoreEmpList(l.STORE_SEQ);case 5:return l.empList=r.sent,r.next=8,e.getWorkingEmpList(l.STORE_SEQ);case 8:return l.workingEmpList=r.sent,r.next=11,e.getEmpSize(l.STORE_SEQ);case 11:if(r.t0=r.sent,r.t0){r.next=14;break}r.t0=[];case 14:l.empsize=r.t0,l.empList.some(function(t){if(console.log("emp:",t),t.EMP_SEQ==l.EMP_SEQ)return l.START=t.START,l.END=t.END,l.PAY=t.PAY,l.PAY_DAY=t.PAY_DAY,l.PAY_TYPE=t.PAY_TYPE,l.PAY_SHOW=t.PAY_SHOW,!0}),l.END?c()(l.END).toDate()>new Date?n.push(l):(l.isEnded=!0,i.push(l)):0==l.TYPE?a.push(l):n.push(l),r.next=26;break;case 19:r.prev=19,r.t1=r.catch(2),l.images=[],l.empList=[],l.workingEmpList=[],console.warn(r.t1.message),e.showAlert(r.t1.message);case 26:case"end":return r.stop()}},r,e,[[2,19]])}),l=0;case 3:if(!(l<t.length)){r.next=8;break}return r.delegateYield(s(l),"t0",5);case 5:l++,r.next=3;break;case 8:n.sort(function(t,e){return e.START-t.START}),e.stores=n,e.waitStores=a,e.workEndedStores=i;case 12:case"end":return r.stop()}},r,e)}))()},onClickStore:function(t){console.log("S",t),0!=t.TYPE?(this.selectedStore=t,this.isOwner||1==t.IS_MANAGER?this.activeOwnerModal(!0):this.viewDetail()):this.showAlert("합류 대기중입니다.")},viewDetail:function(){console.log("select:",this.selectedStore);var t=this.selectedStore.EMP_SEQ,e=this.selectedStore.START,r=this.selectedStore.END,n=this.selectedStore.PAY,o=this.selectedStore.IS_MANAGER,i=this.selectedStore.PAY_DAY,a=this.selectedStore.PAY_TYPE,s=this.selectedStore.PAY_SHOW;this.activeOwnerModal(!1),this.pagePush({name:"StoreDetail",params:{id:this.selectedStore.STORE_SEQ},query:{images:this.selectedStore.images,empSeq:t,start:e,end:r,pay:n,isManager:o,payDay:i,payType:a,payShow:s}})},viewEmpList:function(t){console.log("S",this.selectedStore),this.activeOwnerModal(!1),this.pagePush({name:"EmployeeList",params:{id:this.selectedStore.STORE_SEQ},query:{storefivetype:this.selectedStore.FIVETYPE,type:t,PayShow:this.selectedStore.PAY_SHOW,OtherpayShow:this.selectedStore.OTHERPAY_SHOW,isManager:this.selectedStore.IS_MANAGER}})},activeOwnerModal:function(t){this.visibleOwnerModal=t}},created:function(){var t=this;this.$isBack=!1,this.isOwner?this.moreButtons=[{icon:"add",label:"매장추가",click:function(){t.pagePush({name:"StoreRegister"})}}]:this.moreButtons=[{icon:"add",label:"일터추가",click:function(){t.pagePush({name:"StoreSearch"})}}],this.setHeader({visible:!0,title:(this.isOwner?"매장":"나의 일터")+"목록",useBackButton:!1,more:{use:!0,buttons:this.moreButtons}}),this.initStoresData()},mounted:function(){}},f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticStyle:{"background-color":"white"}},[r("q-page",[r("section",{staticClass:"store-list-wrap"},t._l(t.stores.concat(t.waitStores,t.workEndedStores),function(e,n){return r("div",{key:n,staticClass:"store-wrap",style:{height:t.listItemHeight+"px"},on:{click:function(r){t.onClickStore(e)}}},[r("div",{staticClass:"store-image-wrap"},[e.images.length?r("img",{attrs:{src:"http://api.shop-sol.com/uploads/"+e.images[0].IMAGE}}):t._e()]),t._v(" "),r("div",{staticClass:"store-contents-wrap"},[r("div",[r("div",[r("strong",{staticClass:"name"},[t._v("\n              "+t._s(e.NAME)+"\n              "),t.isOwner||1!=e.IS_MANAGER?t._e():r("small",[t._v("(매니저)")])]),t._v(" "),!t.isOwner&&e.isEnded?r("span",[t._v("(근무종료)")]):t._e()]),t._v(" "),e.empList?r("div",[r("q-icon",{attrs:{name:"person",color:"white"}}),t._v(" "),r("span",[t._v(t._s(e.empsize.length)+"명 중")]),t._v(" "),r("strong",{staticClass:"text-white"},[t._v(t._s(e.workingEmpList.length)+"명")]),t._v(" "),r("span",[t._v("근무중")]),t._v(" "),t.isOwner||0!=e.TYPE?t._e():r("small",{staticClass:"text-paleblue"},[t._v("(합류대기중)")])],1):t._e(),t._v(" "),t.isOwner?t._e():r("div",[e.START?r("small",[t._v(t._s(t._f("dateFormat")(e.START,"YYYY.MM.DD")))]):t._e(),t._v(" "),r("small",[t._v("~")]),t._v(" "),e.END?r("small",[t._v(t._s(t._f("dateFormat")(e.END,"YYYY.MM.DD")))]):r("small",[t._v(t._s("계속"))])])])])])})),t._v(" "),r("Modal",{attrs:{"no-backdrop-dismiss":!1,maximized:!0,position:"bottom"},model:{value:t.visibleOwnerModal,callback:function(e){t.visibleOwnerModal=e},expression:"visibleOwnerModal"}},[r("q-list",{staticStyle:{"padding-top":"0"},attrs:{"no-border":""}},[r("q-item",{attrs:{"no-padding":""}},[r("q-btn",{staticClass:"full-width",attrs:{label:"매장상세"},on:{click:function(e){t.viewDetail()}}})],1),t._v(" "),r("q-item-separator"),t._v(" "),r("q-item",{attrs:{"no-padding":""}},[r("q-btn",{staticClass:"full-width",attrs:{label:"직원목록"},on:{click:function(e){t.viewEmpList(1)}}})],1),t._v(" "),r("q-item-separator"),t._v(" "),r("q-item",{attrs:{"no-padding":""}},[r("q-btn",{staticClass:"full-width",attrs:{label:"합류요청목록"},on:{click:function(e){t.viewEmpList(0)}}})],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("q-btn",{attrs:{label:"닫기",color:"paleblue"},on:{click:function(e){t.activeOwnerModal(!1)}}})],1)],1)],1)],1)},p=[];f._withStripped=!0;var d=r("XyMi"),v=!1;var g=function(t){v||r("qsNM")},m=Object(d.a)(h,f,p,!1,g,"data-v-3e75ef26",null);m.options.__file="src/pages/Store.vue";e.default=m.exports},SldL:function(t,e){!function(e){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag",l="object"==typeof t,u=e.regeneratorRuntime;if(u)l&&(t.exports=u);else{(u=e.regeneratorRuntime=l?t.exports:{}).wrap=S;var h="suspendedStart",f="suspendedYield",p="executing",d="completed",v={},g={};g[a]=function(){return this};var m=Object.getPrototypeOf,w=m&&m(m(M([])));w&&w!==n&&o.call(w,a)&&(g=w);var y=x.prototype=E.prototype=Object.create(g);b.prototype=y.constructor=x,x.constructor=b,x[c]=b.displayName="GeneratorFunction",u.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},u.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(y),t},u.awrap=function(t){return{__await:t}},L(k.prototype),k.prototype[s]=function(){return this},u.AsyncIterator=k,u.async=function(t,e,r,n){var o=new k(S(t,e,r,n));return u.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},L(y),y[c]="Generator",y[a]=function(){return this},y.toString=function(){return"[object Generator]"},u.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},u.values=M,Y.prototype={constructor:Y,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return s.type="throw",s.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=o.call(a,"catchLoc"),l=o.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:M(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),v}}}function S(t,e,r,n){var o=e&&e.prototype instanceof E?e:E,i=Object.create(o.prototype),a=new Y(n||[]);return i._invoke=function(t,e,r){var n=h;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return T()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=O(a,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var c=_(t,e,r);if("normal"===c.type){if(n=r.done?d:f,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=d,r.method="throw",r.arg=c.arg)}}}(t,r,a),i}function _(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}function E(){}function b(){}function x(){}function L(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function k(t){var e;this._invoke=function(r,n){function i(){return new Promise(function(e,i){!function e(r,n,i,a){var s=_(t[r],t,n);if("throw"!==s.type){var c=s.arg,l=c.value;return l&&"object"==typeof l&&o.call(l,"__await")?Promise.resolve(l.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(l).then(function(t){c.value=t,i(c)},a)}a(s.arg)}(r,n,e,i)})}return e=e?e.then(i,i):i()}}function O(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,O(t,e),"throw"===e.method))return v;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=_(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,v;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,v):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function A(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function Y(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(A,this),this.reset(!0)}function M(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:T}}function T(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},Xxa5:function(t,e,r){t.exports=r("jyFz")},exGp:function(t,e,r){"use strict";e.__esModule=!0;var n,o=r("//Fk"),i=(n=o)&&n.__esModule?n:{default:n};e.default=function(t){return function(){var e=t.apply(this,arguments);return new i.default(function(t,r){return function n(o,a){try{var s=e[o](a),c=s.value}catch(t){return void r(t)}if(!s.done)return i.default.resolve(c).then(function(t){n("next",t)},function(t){n("throw",t)});t(c)}("next")})}}},jyFz:function(t,e,r){var n=function(){return this}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r("SldL"),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(t){n.regeneratorRuntime=void 0}},nyyr:function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,"\n.store-list-wrap[data-v-3e75ef26] {\n  padding: 20px 12px;\n  background: #fff;\n}\n.store-list-wrap .store-wrap[data-v-3e75ef26] {\n  position: relative;\n  display: inline-block;\n  margin-bottom: 12px;\n  width: 100%;\n  height: 33.33%;\n  box-sizing: border-box;\n  border-radius: 4px;\n  box-shadow: 0 0 3px #747474;\n}\n.store-list-wrap .store-wrap[data-v-3e75ef26]:last-child {\n  margin-bottom: 0;\n}\n.store-list-wrap .store-wrap .store-image-wrap[data-v-3e75ef26] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.store-list-wrap .store-wrap .store-image-wrap img[data-v-3e75ef26] {\n  display: block;\n  margin: 0 auto;\n  width: auto;\n  height: auto;\n  min-width: 100%;\n  max-width: 100%;\n}\n.store-list-wrap .store-wrap .store-contents-wrap[data-v-3e75ef26] {\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 14px 12px;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 50%);\n  border-radius: 4px;\n  box-sizing: border-box;\n  font-size: 0.9rem;\n  color: #fff;\n}\n.store-list-wrap .store-wrap .store-contents-wrap .name[data-v-3e75ef26] {\n  margin-bottom: 12px;\n}\n.store-list-wrap .store-wrap .store-contents-wrap[data-v-3e75ef26]:hover {\n  background: rgba(0,0,0,0.4);\n}\n.store-list-wrap .store-wrap .store-contents-wrap > div[data-v-3e75ef26] {\n  -ms-flex: 1;\n      flex: 1;\n}\n.store-list-wrap .store-wrap .store-contents-wrap > div strong[data-v-3e75ef26] {\n  font-weight: 600;\n}\n",""])},qsNM:function(t,e,r){var n=r("nyyr");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,r("rjj0").default)("53b799d0",n,!1,{})}});
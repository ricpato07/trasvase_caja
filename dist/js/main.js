"use strict";angular.module("myApp",["ui.router","ui.grid","ui.grid.resizeColumns","ui.grid.pagination","restangular","ui.bootstrap","angular-loading-bar","angular-bind-html-compile"]).config(["$stateProvider","$urlRouterProvider","$httpProvider","RestangularProvider","$provide",function(e,t,a,r,o){var n=window.location.pathname.substring(1),i=window.location.origin;n=n.substring(0,n.indexOf("/"));var l=i+"/"+n+"/";console.log(l),r.setBaseUrl(l),o.decorator("GridOptions",["$delegate","i18nService",function(e,t){var a;return a=angular.copy(e),a.initialize=function(t){var a;return a=e.initialize(t)},t.setCurrentLang("es"),a}]),t.otherwise("/logistica_interna"),e.state("login",{url:"/login",templateUrl:"views/login.html",controller:"LoginController"}).state("app",{url:"/panel",templateUrl:"views/panel/layout.html",controller:"MainController"}).state("app.404",{url:"/404",templateUrl:"404.html"}).state("trasvase_caja",{url:"/trasvase_caja",templateUrl:"views/panel/trasvasecaja.html",controller:"TrasvasecajaController"}).state("logistica_interna",{url:"/logistica_interna",templateUrl:"views/panel/logisticainterna.html",controller:"LogisticainternaController"})}]),angular.module("ngLocale",[],["$provide",function(e){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["a.m.","p.m."],DAY:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],ERANAMES:["antes de Cristo","después de Cristo"],ERAS:["a. C.","d. C."],FIRSTDAYOFWEEK:6,MONTH:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],SHORTDAY:["dom.","lun.","mar.","mié.","jue.","vie.","sáb."],SHORTMONTH:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d 'de' MMMM 'de' y",longDate:"d 'de' MMMM 'de' y",medium:"dd/MM/y h:mm:ss a",mediumDate:"dd/MM/y",mediumTime:"h:mm:ss a","short":"dd/MM/yy h:mm a",shortDate:"dd/MM/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤",negSuf:"",posPre:"¤",posSuf:""}]},id:"es-mx",pluralCat:function(e,a){return 1==e?t.ONE:t.OTHER}})}]),angular.module("services.config",[]).constant("configuration",{apiEndpoint:"http://localhost/scotiabank-guardavalores/",secure:"false"}),angular.module("myApp").directive("headerPanel",function(){return{templateUrl:"views/directives/header.html",restrict:"E",replace:!0}}),angular.module("myApp").directive("sidebar",function(){return{templateUrl:"views/directives/sidebar.html",restrict:"E",replace:!0}}),angular.module("myApp").directive("footerPanel",function(){return{templateUrl:"views/directives/footer.html",restrict:"E",replace:!0}}),angular.module("myApp").directive("message",function(){return{templateUrl:"views/directives/message.html",restrict:"E",replace:!0,scope:{content:"="}}}),angular.module("myApp").factory("myMaskInterceptor",["$q",function(e){var t=0;return{request:function(a){return 1===++t&&$("#gray-background").show(),a||e.when(a)},response:function(a){return 0===--t&&$("#gray-background").hide(),a||e.when(a)},responseError:function(a){return 0===--t&&$("#gray-background").hide(),e.reject(a)}}}]),angular.module("myApp").factory("ValidaService",function(){var e=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,t=/^[a-zA-Z0-9\.\, ñÑáéíóúüÁÉÍÓÚÜ]*$/,a=/^[a-zA-Z\. ñÑáéíóúÁÉÍÓÚ]*$/,r=/^[a-zA-Z\.\, ñÑáéíóúÁÉÍÓÚ]*$/,o=/^[0-9]*$/,n=/^[0-9]{1,7}(\.[0-9]{1,2})?$/,i=/^[0-9]{1,5}(\.[0-9]{1,2})?$/,l=/^[0-9 \.\-\(\)]*$/,s=/^[0-9 \.\-\(\)ext]*$/,c=/^[a-zA-Z0-9 \.\:\-\(\)]*$/,u=/^[a-zA-Z0-9\. ñÑáéíóúÁÉÍÓÚ\.\,\;\:\_\/\-\_\(\)\[\]\=\*\+]*$/,d=/^([A-ZÑ]{4})([0-9]{6})([A-ZÑ0-9]{3})+$/,f=/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/,m=/^[0-9]{5}\/[0-9]{4}$/,p=["dd/MM/yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"],g=/^[S][0-9]{8}$/,v=/^[U][0-9]{10}$/,h=/^[C][V][0-9]{6}[ ][0-9]{6}$/,b=/^[G][0-9]{12}$/;return{validamail:function(t){var a=e;return a.test(t)},alfanumerico:function(e){var a=t;return a.test(e)},numerico:function(e){var t=o;return t.test(e)},moneda:function(e){var t=n;return t.test(e)},eshorario:function(e){var t=c;return t.test(e)},esnulo:function(e){return"undefined"==typeof e||null==e||""==e},toUTCDate:function(e){if(void 0==e)return null;var t=e.substring(0,4),a=parseInt(e.substring(5,7)),r=e.substring(8,10),o=e.substring(11,13),n=e.substring(14,16),i=e.substring(17,19),l=new Date(t,a-1,r,o,n,i);return l},StringtoDate:function(e){if(void 0==e)return null;var t=e.split("/"),a=new Date(t[2],t[1]-1,t[0]);return a},dateToString:function(e){if(void 0==e)return null;var t=(e.getDate()<10?"0":"")+e.getDate()+"/"+(e.getMonth()<9?"0":"")+(e.getMonth()+1)+"/"+e.getFullYear();return t},dateToStringYMD:function(e){if(void 0==e)return null;var t=e.getFullYear()+"/"+(e.getMonth()<9?"0":"")+(e.getMonth()+1)+"/"+(e.getDate()<10?"0":"")+e.getDate();return t},dateToISOString:function(e){if(void 0==e)return null;var t=e.toISOString();return t},addZero:function(e){return e<10&&(e="0"+e),e},dateToStringHHmm:function(e){var t=this.addZero(e.getHours())+":"+this.addZero(e.getMinutes());return t},StringtoName:function(e){return null!=e&&(e=e.toLowerCase(),e=e.replace(/ /g,"_"),e=e.replace(/á/g,"a"),e=e.replace(/é/g,"e"),e=e.replace(/í/g,"i"),e=e.replace(/ó/g,"o"),e=e.replace(/ú/g,"u")),e},mail_pattern:function(){return e},alfanumerico_pattern:function(){return t},alfanum_simbolos_pattern:function(){return u},numerico_pattern:function(){return o},moneda_pattern:function(){return n},moneda5_pattern:function(){return i},nombre_pattern:function(){return a},nombre_coma_pattern:function(){return r},telefono_pattern:function(){return l},telefono_ext_pattern:function(){return s},horario_pattern:function(){return c},RFC_pattern:function(){return d},CURP_pattern:function(){return f},folio_pattern:function(){return m},caja_pattern:function(){return g},expediente_pattern:function(){return v},precinto_pattern:function(){return h},valija_pattern:function(){return b},formats_date:function(){return p},disabled:function(e){$(e).attr("disabled",!0)},enabled:function(e){$(e).attr("disabled",!1)},get_browser:function(){var e=navigator.appVersion;return e.indexOf("MSIE")!==-1?"MSIE":e.indexOf("Trident")!==-1?"Trident":e.indexOf("Firefox")!==-1?"Firefox":e.indexOf("Chrome")!==-1?"Chrome":e.indexOf("Opera Mini")!==-1?"Opera Mini":e.indexOf("Opera")!==-1?"Opera":e.indexOf("Safari")!==-1?"Safari":"Desconocido"},getAniosCursados:function(e){for(var t=(new Date).getFullYear(),e=e,a=[],r=t;r>=e;r--){var o={};o.id=r,o.nombre=r,a.push(o)}return a},getMeses:function(){for(var e=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],t=[],a=0;a<e.length;a++){var r={};r.id=a+1,r.nombre=e[a],t.push(r)}return t},restaFechas:function(e,t){var a=e-t,r=Math.floor(a/864e5);return r},sumarDiasFecha:function(e,t){var a=parseInt(3024e6),r=e.getDate(),o=e.getMonth()+1,n=e.getFullYear(),i=e.getTime();a=parseInt(24*t*60*60*1e3);e.setTime(i+a);return r=e.getDate(),o=e.getMonth()+1,n=e.getFullYear(),new Date(n,o-1,r)}}}).directive("upperCase",function(){return{require:"ngModel",link:function(e,t,a,r){r.$parsers.unshift(function(e){return void 0!=e&&null!=e&&(e=e.toUpperCase()),e})}}}).directive("validaFechade",["ValidaService",function(e){return{require:"ngModel",link:function(t,a,r,o){o.$parsers.unshift(function(a){if(void 0!==t.busqueda.form.fechaa.$viewValue)var r=e.StringtoDate(t.busqueda.form.fechaa.$viewValue);return null!==a&&(a.setHours(0),a.setMinutes(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)),t.busqueda.form.fechaa.$setValidity("vfechafin",r>=a),a})}}}]).directive("validaFechaa",["ValidaService",function(e){return{require:"ngModel",link:function(t,a,r,o){o.$parsers.unshift(function(a){if(void 0!==t.busqueda.form.fechade.$viewValue)var r=e.StringtoDate(t.busqueda.form.fechade.$viewValue);return null!==a&&(a.setHours(0),a.setMinutes(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)),o.$setValidity("vfechafin",a>=r),a})}}}]),angular.module("myApp").factory("ConsultaService",["$q","Restangular",function(e,t){return{getBlobURL:function(e){var t="onmessage = function (event) {                                 var xhr = new XMLHttpRequest();                                 xhr.onreadystatechange=function(){                                if (xhr.readyState==4 && xhr.status==200){                                    postMessage(xhr.responseText);                                }                            };                             xhr.open('GET', '"+e+"' , false);                             xhr.send();                             }";return URL.createObjectURL(new Blob([t]),{type:"application/javascript"})},getBlobURLParam1:function(e,t,a){return this.getBlobURL(e+"?"+t+"="+a)},getBlobURLParams:function(e,t){if(void 0!=t&&null!=t){for(var a="",r=0;r<t.length;r++)a+=t[r].label+"="+t[r].value+(r!=t.length-1?"&":"");return this.getBlobURL(e+"?"+a)}return this.getBlobURL(e)},getWorkerParams:function(t,a){var r=new Worker(this.getBlobURLParams(t,a)),o=e.defer();return r.addEventListener("message",function(e){o.resolve(JSON.parse(e.data))},!1),r.postMessage(""),o.promise},getWorker:function(e){return this.getWorkerParams(e,null)},getRestAngular:function(e){return console.log("metodo"),console.log(e),t.one(e).get()},listRestAngular:function(e,a){return console.log("metodo"),console.log(e),t.all(e).getList(a)},setRestAngular:function(e,a){return console.log("metodo"),console.log(e),console.log("params"),console.log(a),t.all(e).post(a)}}}]),angular.module("myApp").factory("UtilService",["$timeout","$q",function(e,t){var a="data:application/vnd.ms-excel;base64,",r='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',o=function(e){return window.btoa(unescape(encodeURIComponent(e)))},n=function(e,t){return e.replace(/{(\w+)}/g,function(e,a){return t[a]})},i={37:1,38:1,39:1,40:1};return{StringtoName:function(e){return null!=e&&(e=e.toLowerCase(),e=e.replace(/ /g,"_"),e=e.replace(/á/g,"a"),e=e.replace(/é/g,"e"),e=e.replace(/í/g,"i"),e=e.replace(/ó/g,"o"),e=e.replace(/ú/g,"u")),e},get_browser:function(){var e=navigator.appVersion;return e.indexOf("MSIE")!==-1?"MSIE":e.indexOf("Trident")!==-1?"Trident":e.indexOf("Firefox")!==-1?"Firefox":e.indexOf("Chrome")!==-1?"Chrome":e.indexOf("Opera Mini")!==-1?"Opera Mini":e.indexOf("Opera")!==-1?"Opera":e.indexOf("Safari")!==-1?"Safari":"Desconocido"},tableToExcel:function(e,t){var i=this.StringtoName(t),l=$("#"+e),s={worksheet:t,table:l.html()},c=a+o(n(r,s)),u=document.createElement("a");u.href=c,u.download=i+".xls";var d=this.get_browser();return"Chrome"==d?(u.click(),null):u},muestra_pdf:function(t,a){e(function(){var e=navigator.userAgent.toLowerCase();if(e.indexOf("msie")!=-1)window.navigator.msSaveOrOpenBlob(t,a+".pdf");else if(e.indexOf("chrome")!=-1||e.indexOf("firefox")!=-1||e.indexOf("safari")!=-1){var r=(window.URL||window.webkitURL).createObjectURL(t),o=document.createElement("a");o.setAttribute("download",a+".pdf"),o.setAttribute("href",r),document.body.appendChild(o),o.click(),setTimeout(function(){document.body.removeChild(o),window.URL.revokeObjectURL(r)},100)}else if(e.indexOf("opera")!=-1){var r=(window.URL||window.webkitURL).createObjectURL(t);window.open(r,"_blank")}else e.indexOf("rident")!=-1?window.navigator.msSaveOrOpenBlob(t,a+".pdf"):alert("Desconozco el navegador del que me visitas")})},preventDefault:function(e){e=e||window.event,e.preventDefault&&e.preventDefault(),e.returnValue=!1},preventDefaultForScrollKeys:function(e){if(i[e.keyCode])return preventDefault(e),!1},disableScroll:function(){window.addEventListener&&window.addEventListener("DOMMouseScroll",this.preventDefault,!1),window.onwheel=this.preventDefault,window.onmousewheel=document.onmousewheel=this.preventDefault,window.ontouchmove=this.preventDefault,document.onkeydown=this.preventDefaultForScrollKeys},enableScroll:function(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",this.preventDefault,!1),window.onmousewheel=document.onmousewheel=null,window.onwheel=null,window.ontouchmove=null,document.onkeydown=null},pieChart:function(){return{chart:{type:"pieChart",height:250,x:function(e){return e.key},y:function(e){return e.y},showLabels:!0,valueFormat:function(e){return d3.format(",.0f")(e)},duration:500,labelThreshold:.01,labelSunbeamLayout:!0,legendPosition:"top",noData:"No hay datos que mostrar",legend:{margin:{top:5,right:10,bottom:0,left:0}}}}},barChart:function(){return{chart:{type:"multiBarChart",height:250,margin:{top:20,right:20,bottom:120,left:45},clipEdge:!0,duration:500,stacked:!1,wrapLabels:!0,noData:"No hay datos que mostrar",controlLabels:{grouped:"Agrupados",stacked:"Apilados"},xAxis:{axisLabel:"",showMaxMin:!1,tickFormat:function(e){return e}},yAxis:{axisLabel:"",axisLabelDistance:-20,tickFormat:function(e){return d3.format(",.0f")(e)}}}}},gridOptions:function(){return{enableColumnMenus:!1,enableColumnResizing:!0,enableFiltering:!1,maxVisibleColumnCount:1e5,paginationPageSizes:[10,25,50,100],paginationPageSize:10,data:"result"}}}}]),angular.module("myApp").factory("MessageService",function(){return{getMessage:function(e,t){var a='<div ng-if="true">\n                                       <div class="alert alert-content.type alert-dismissible" role="alert">\n                                        <button type="button" class="close" ng-click="close_message()" aria-label="Close"><span\n                                            aria-hidden="true">&times;</span></button>\n                                            content.text\n                                            </div>\n                                       </div>';return a=a.replace("content.show","true"),a=a.replace("content.text",e),a=a.replace("content.type",t)},success:function(e,t){e.message={},e.message.html=this.getMessage(t,"success")},error:function(e,t){e.message={},e.message.html=this.getMessage(t,"danger"),console.log(e.message.html)},warning:function(e,t){e.message={},e.message.html=this.getMessage(t,"warning")},info:function(e,t){e.message={},e.message.html=this.getMessage(t,"info")},close:function(e){e.message={},e.message.html=null}}}),angular.module("myApp").controller("MainController",["$scope","$rootScope","$state",function(e,t,a){t.class_menu="sidebar-mini",e.bcollapse=!1,e.collapse=function(){e.bcollapse?t.class_menu="sidebar-mini":t.class_menu="sidebar-mini sidebar-collapse",e.bcollapse=!e.bcollapse},e.logout=function(){a.go("login")}}]),angular.module("myApp").controller("LoginController",["$scope","$state","ConsultaService","MessageService",function(e,t,a,r){e.usuario={},e.ingresar=function(){var r={usuario:e.usuario.login,password:e.usuario.password};a.setRestAngular("login",r).then(function(e){console.log(e),t.go("app.captcha")})["catch"](function(t){console.log("Exception: "),console.log(t),e.usuario.password=null,e.mensaje="Usuario o contraseña incorrecta"})}}]),angular.module("myApp").controller("TrasvasecajaController",["$scope","$timeout","$modal","$rootScope","$stateParams","ValidaService","ConsultaService","MessageService","sharedProperties",function(e,t,a,r,o,n,i,l,s){e.forma={},e.cat={},e.error={},e.deta={},e.bhabilita_cerrar=!1,e.caja_pattern=n.caja_pattern(),e.expediente_pattern=n.expediente_pattern(),e.get_operatorias=function(){i.listRestAngular("operatorias.action",null).then(function(t){console.log(t),e.operatoriaslist=t})["catch"](function(e){console.log(e)})},e.get_operatorias(),e.guardar_cab=function(){return console.log(e.cat.cajaId),void 0==e.cat.cajaId?void e.forma.form.caja.$setValidity("required",!1):void i.getRestAngular("valida_caja.action?cajaId="+e.cat.cajaId.substring(1)).then(function(t){if(console.log(t),console.log(t.status),null==t.status||void 0==t.status){var a={idtrasvase:null,usuario:null,fechaRegistro:null,cajaId:Number(e.cat.cajaId.substring(1)),precinto:null,status:0,precinto2:null};i.setRestAngular("trasvasecajacab.action",a).then(function(t){console.log(t),e.cat.idtrasvase=t.idtrasvase,s.setObject(e.cat),e.habilitainput("operatoria"),e.limpiar_error()})["catch"](function(t){console.log(t),e.forma.form.caja.$setValidity("error_caja",!1),e.error.error_caja=t.data.men})}else e.cat.idtrasvase=t.trasvase.idtrasvase,s.setObject(e.cat),e.habilitainput("operatoria"),e.listar_etiquetas(),e.limpiar_error()})["catch"](function(t){console.log(t),e.forma.form.caja.$setValidity("error_caja",!1),e.error.error_caja=t.data.men})},e.guardar_deta=function(){return void 0==e.cat.etiqueta?void e.forma.form.etiqueta.$setValidity("required",!1):void i.getRestAngular("valida_expediente.action?nunicodoc="+e.cat.etiqueta.substring(1)).then(function(t){console.log(t);var a={pk:{idtrasvase:e.cat.idtrasvase,etiqueta:Number(e.cat.etiqueta.substring(1))},idoperatoria:e.cat.idoperatoria,scltcod:null,status:null,fechaRegistro:null,usuario:null,tipoEtiqueta:"U"};i.setRestAngular("trasvasecajadeta.action",a).then(function(t){console.log(t),e.cat.etiqueta=void 0,e.listar_etiquetas(),e.limpiar_error()})["catch"](function(t){console.log(t),e.forma.form.etiqueta.$setValidity("error_etiqueta",!1),e.error.error_etiqueta=t.data.men,e.cat.etiqueta=void 0,$("#etiqueta").val(null)})})["catch"](function(t){console.log(t),e.forma.form.etiqueta.$setValidity("error_etiqueta",!1),e.error.error_etiqueta=t.data.men,e.cat.etiqueta=void 0,$("#etiqueta").val(null)})},e.listar_etiquetas=function(){i.listRestAngular("trasvasecajadeta.action?idtrasvase="+e.cat.idtrasvase,null).then(function(t){console.log(t),e.etiquetaslist=t})["catch"](function(e){console.log(e)})},e.deshabilita_cerrar=function(){if(void 0!=e.etiquetaslist){e.etiquetaslist.length>0;return!1}return!0},e.close_message=function(){l.close(e)},e.$watch("cat.idoperatoria",function(t,a){void 0!==e.forma.form&&(void 0!=t&&""!=t?(e.habilitainput("etiqueta"),e.forma.form.operatoria.$setValidity("required",!0)):void 0!=e.cat.cajaId&&(e.habilitainput("operatoria"),e.forma.form.operatoria.$setValidity("required",!1)))}),e.limpiar_error=function(){e.error={},e.forma.form.$error={},e.forma.form.caja.$error={},e.forma.form.etiqueta.$error={},e.forma.form.caja.$invalid=!1,e.forma.form.etiqueta.$invalid=!1},e.limpiar=function(){e.habilitainput("caja"),e.cat={},e.etiquetaslist=[],e.limpiar_error(),$("#etiqueta").val(null),$("#caja").val(null),$("#operatoria").val(""),e.close_message()},e.habilitainput=function(t){switch(e.bcaja=!1,e.boperatoria=!1,e.betiqueta=!1,t){case"caja":e.bcaja=!0;break;case"operatoria":e.boperatoria=!0;break;case"etiqueta":e.boperatoria=!0,e.betiqueta=!0}},e.habilitainput("caja"),e.cerrar_caja=function(){e.openmodal()},e.quitar_item=function(t){var a=window.confirm("¿En verdad deseas borrar el expediente U0"+t+"?");1==a&&i.getRestAngular("deltrasvasecajadeta.action?idtrasvase="+e.cat.idtrasvase+"&etiqueta="+t).then(function(t){e.listar_etiquetas()})["catch"](function(e){console.log(e)})},e.openmodal=function(){a.open({animation:!0,templateUrl:"views/directives/modal_precinto.html",controller:"ModalController"})},e.$watchCollection("etiquetaslist",function(t,a){void 0!==e.forma.form&&void 0!=t&&(e.bhabilita_cerrar=t.length>0)}),r.$on("CerrarCajaConfirm",function(){e.cerrar_caja_confirm()}),e.cerrar_caja_confirm=function(){var t=s.getObject(),a={idtrasvase:e.cat.idtrasvase,usuario:null,fechaRegistro:null,cajaId:null,precinto:t.precinto,status:1,precinto2:t.precinto2};i.setRestAngular("uptrasvasecajacab.action",a).then(function(t){console.log(t),e.limpiar(),alert("La caja se ha cerrado correctamente.")})["catch"](function(t){console.log(t),l.error(e,t.data.men)})}}]),angular.module("myApp").controller("ModalController",["$scope","$modal","$modalInstance","$rootScope","ValidaService","sharedProperties","ConsultaService",function(e,t,a,r,o,n,i){e.modalform={},e.catform={},e.precinto_pattern=o.precinto_pattern(),e.close=function(){a.close()},e.cerrar_caja_confirm=function(){if(void 0!==e.modalform.form){if(!e.modalform.form.$valid)return void alert("Es necesario colocar los precintos para cerrar la caja.");a.close();var t=n.getObject();t.precinto=e.catform.precinto,t.precinto2=e.catform.precinto2,n.setObject(t),r.$emit("CerrarCajaConfirm",{})}},e.$watch("catform.precinto",function(t,a){void 0!==e.modalform.form&&void 0!=t&&""!=t&&(e.catform.precinto==e.catform.precinto2?e.modalform.form.precinto2.$setValidity("error_precinto",!1):e.modalform.form.precinto2.$setValidity("error_precinto",!0))}),e.$watch("catform.precinto2",function(t,a){void 0!==e.modalform.form&&void 0!=t&&""!=t&&(e.catform.precinto==e.catform.precinto2?e.modalform.form.precinto2.$setValidity("error_precinto",!1):e.modalform.form.precinto2.$setValidity("error_precinto",!0))})}]),angular.module("myApp").service("sharedProperties",function(){var e={};return{getObject:function(){return e},setObject:function(t){e=t}}}),angular.module("myApp").controller("LogisticainternaController",["$scope","$timeout","$modal","$rootScope","$stateParams","ValidaService","ConsultaService","MessageService","sharedProperties",function(e,t,a,r,o,n,i,l,s){e.forma={},e.cat={},e.cat.totalValijas=0,e.valija={},e.error={},e.deta={},e.valijaslist=[],e.bhabilita_guardar=!1,e.bhabilita_faltantes=!1,e.numerico_pattern=n.numerico_pattern(),e.valija_pattern=n.valija_pattern(),e.precinto_pattern=n.precinto_pattern(),e.validar_lote=function(){return console.log(e.cat.idLote),void 0===e.cat.idLote||null===e.cat.idLote?void e.forma.form.lote.$setValidity("required",!1):void i.getRestAngular("valida_lote.action?idLote="+e.cat.idLote).then(function(t){console.log("lote"),console.log(t),e.cat=t,e.get_usuario(),e.habilitainput("valija"),e.listar_valijas(),s.setObject(e.cat),e.forma.form.lote.$invalid=!1,e.forma.form.lote.$error={},e.forma.form.persona_entrega.$touched=!0})["catch"](function(t){console.log(t),e.forma.form.lote.$setValidity("error_lote",!1),e.error.error_lote=t.data.men})},e.get_usuario=function(){i.getRestAngular("usuario.action").then(function(t){console.log("usuario"),console.log(t),e.cat.personaRecibe=t.user.nombre})["catch"](function(e){console.log(e)})},e.validar_valija=function(){if(void 0===e.valija.svalija||null===e.valija.svalija)return void e.forma.form.valija.$setValidity("required",!1);if(void 0===e.valija.precinto||null===e.valija.precinto)return void e.forma.form.precinto.$setValidity("required",!1);if(void 0===e.cat.personaEntrega||null===e.cat.personaEntrega)return void alert("Debes colocar el nombre de la persona que entrega");if(void 0===e.cat.personaRecibe||null===e.cat.personaRecibe)return void alert("Debes colocar el nombre de la persona que recibe");var t={pk:{idLote:e.cat.idLote,nunico:Number(e.valija.svalija.substring(1))},scltcod:null,precinto:e.valija.precinto,fecha:null,usuario:null,status:2};i.setRestAngular("valida_lote_valijas.action",t).then(function(t){console.log(t),e.listar_valijas()})["catch"](function(t){console.log(t),e.forma.form.valija.$setValidity("error_valija",!1),e.error.error_valija=t.data.men}),e.valija.svalija=void 0,e.valija.precinto=void 0,$("#valija").val(null),$("#precinto").val(null),e.error={},e.forma.form.$error={},e.forma.form.valija.$error={},e.forma.form.precinto.$error={},e.forma.form.valija.$touched=!1,e.forma.form.precinto.$touched=!1},e.listar_valijas=function(){i.listRestAngular("lista_lote_valijas.action?idLote="+e.cat.idLote+"&status=2",null).then(function(t){console.log("valijaslist"),console.log(t),e.valijaslist=t,e.bhabilita_faltantes=e.valijaslist.length<e.cat.totalValijas})["catch"](function(t){console.log(t),e.bhabilita_faltantes=!0})},e.close_message=function(){l.close(e)},e.limpiar_error=function(){e.error={},e.forma.form.$error={},e.forma.form.lote.$error={},e.forma.form.valija.$error={},e.forma.form.precinto.$error={},e.forma.form.persona_entrega.$error={},e.forma.form.persona_recibe.$error={},e.forma.form.persona_entrega.$invalid=!1,e.forma.form.lote.$touched=!1,e.forma.form.valija.$touched=!1,e.forma.form.precinto.$touched=!1,e.forma.form.persona_entrega.$touched=!1,e.forma.form.persona_recibe.$touched=!1,e.bhabilita_faltantes=!1},e.habilitainput=function(t){switch(e.blote=!1,e.bpersonas=!1,e.bvalija=!1,t){case"lote":e.blote=!0;break;case"valija":e.bvalija=!0}},e.habilitainput("lote"),e.limpiar=function(){e.cat={},e.cat.totalValijas=0,e.valija={},e.valijaslist=[],$("#valija").val(null),$("#precinto").val(null),$("#lote").val(null),$("#persona_entrega").val(null),$("#persona_recibe").val(null),e.habilitainput("lote"),e.limpiar_error(),e.close_message()},e.guardar=function(){if(void 0===e.cat.personaEntrega||null===e.cat.personaEntrega)return void alert("Debes colocar el nombre de la persona que entrega");if(void 0===e.cat.personaRecibe||null===e.cat.personaRecibe)return void alert("Debes colocar el nombre de la persona que recibe");var t=window.confirm("¿En verdad deseas cerrar el lote?");if(1==t){var a=e.cat.idLote,r={idLote:a,scltcod:null,fecha:null,usuario:null,personaEntrega:e.cat.personaEntrega,personaRecibe:e.cat.personaRecibe};i.setRestAngular("save_lote_logistica.action",r).then(function(t){console.log(t),e.limpiar_error(),e.limpiar(),alert("El lote "+a+" se ha cerrado correctamente.")})["catch"](function(t){console.log(t),l.error(e,t.data.men)})}},e.ver_faltantes=function(){a.open({animation:!0,templateUrl:"views/directives/modal_faltantes.html",controller:"FaltantesController"})},e.$watchCollection("valijaslist",function(t,a){void 0!==e.forma.form&&void 0!=t&&t.length>0&&(e.bhabilita_guardar=t.length==e.cat.totalValijas)})}]),angular.module("myApp").controller("FaltantesController",["$scope","$modal","$modalInstance","ConsultaService","sharedProperties",function(e,t,a,r,o){e.modalform={},e.faltanteslist=[],e.close=function(){a.close()},e.listar_faltantes=function(){var t=o.getObject();r.listRestAngular("lista_lote_valijas.action?idLote="+t.idLote+"&status=1",null).then(function(t){console.log("faltantes"),console.log(t),e.faltanteslist=t})["catch"](function(e){console.log(e)})},e.listar_faltantes()}]);
(function(e){function t(t){for(var n,a,s=t[0],c=t[1],l=t[2],d=0,f=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&f.push(i[a][0]),i[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);p&&p(t);while(f.length)f.shift()();return r.push.apply(r,l||[]),o()}function o(){for(var e,t=0;t<r.length;t++){for(var o=r[t],n=!0,a=1;a<o.length;a++){var c=o[a];0!==i[c]&&(n=!1)}n&&(r.splice(t--,1),e=s(s.s=o[0]))}return e}var n={},i={app:0},r=[];function a(e){return s.p+"js/"+({about:"about",imprint:"imprint"}[e]||e)+"."+{about:"60779870",imprint:"3e7d97e0"}[e]+".js"}function s(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.e=function(e){var t=[],o=i[e];if(0!==o)if(o)t.push(o[2]);else{var n=new Promise((function(t,n){o=i[e]=[t,n]}));t.push(o[2]=n);var r,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=a(e);var l=new Error;r=function(t){c.onerror=c.onload=null,clearTimeout(d);var o=i[e];if(0!==o){if(o){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",l.name="ChunkLoadError",l.type=n,l.request=r,o[1](l)}i[e]=void 0}};var d=setTimeout((function(){r({type:"timeout",target:c})}),12e4);c.onerror=c.onload=r,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(o,n,function(t){return e[t]}.bind(null,n));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var p=l;r.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"034f":function(e,t,o){"use strict";var n=o("e2a1"),i=o.n(n);i.a},"1b92":function(e,t,o){e.exports=o.p+"fonts/Jost-500-Medium.169a1a5d.ttf"},"3f8c":function(e,t,o){t=e.exports=o("2350")(!1),t.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Germania+One);",""]),t.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Nunito);",""]),t.i(o("4d6e"),""),t.push([e.i,'body{font-family:Jost}h4{font-family:Germania One,sans-serif;color:#2e8b57;font-weight:300}#app{font-family:Jost,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;background-color:#000}#nav{padding:30px}#nav a{font-weight:700;color:#2c3e50}#nav a.router-link-exact-active{color:#42b983}body{margin:0;padding:0;border:0;background-color:#000}.nav-head{height:28px;background-color:#fff;text-align:left}.nav-head a{padding:4px 6px}.nav-head a,.nav-head a:hover{color:#000;text-decoration:none}.intro{height:150vh}.intro.container-fluid{padding:0;background-color:#000;background-repeat:no-repeat;background-size:100% auto}.intro-video{position:absolute;right:0;top:28;min-width:100%;min-height:100%}.intro .blend{z-index:2;position:absolute;top:28px;width:100%;height:120vh;background-color:#000;background:-webkit-gradient(linear,left bottom,left top,color-stop(25%,#000),to(rgba(0,212,255,0)));background:linear-gradient(0deg,#000 25%,rgba(0,212,255,0))}.intro .logo{z-index:3;position:absolute;top:0;left:25%;width:45%;margin-top:20%}.intro .intro-box{z-index:3;width:60%;font-family:Jost;top:80vh;left:17%;padding:30px 28px 30px 28px;color:#fff;border:2px solid #fff}.intro .intro-box,.intro .intro-box2{position:absolute;margin:0 auto 0 auto}.intro .intro-box2{z-index:4;width:250px;font-family:Germania One,sans-serif;top:95vh;left:50%;padding:6px 7px;background-color:#c10000;color:#000;border:none}.page-apps{background-color:#2a2a2a;padding-top:100px;padding-bottom:100px}.page-apps .app-cell{background-color:#fff;height:300px;max-width:100%;overflow:hidden}.page-apps .app-cell img{z-index:1}.page-apps .cell-box{z-index:2;background-color:#fff;padding:8px 20px 8px 20px;text-align:left}.page-apps .cell-box.bottom{position:absolute;bottom:0;left:0;width:100%}.page-apps .cell-box.bottom-half{position:absolute;bottom:0;left:0;width:50%}.page-apps .cell-box.right{position:absolute;top:0;right:0;width:50%;height:100%}.page-apps .cell-box .cell-headline{font-weight:700}.page-apps .cell-box .cell-text{font-weight:1}footer{background-color:#fff;padding-top:100px}footer ul li a{font-size:1.2em}footer ul li a,footer ul li a:hover{color:#000;text-decoration:none}footer ul{margin-top:47px}footer ul li{margin-bottom:25px}footer .footer-logo{width:50%;height:auto}.footer-copyright{color:#4b4a4a;margin-top:50px;font-size:10px}.footer-copyright a,.footer-copyright a:hover{color:#4b4a4a;text-decoration:none}.page a{text-decoration:underline;color:#000}.page a:hover{color:#c10000}h1{display:inline-block;position:relative;margin-top:23px;margin-bottom:23px;margin-left:0;align-content:left;text-align:left;padding:20px 47px 27px 47px;background-color:#c10000;color:#fff;font-family:Jost;font-size:2em;font-weight:700;text-transform:uppercase}.page h2{margin-top:.5em}.page strong{margin-right:6px;text-decoration:none;font-weight:400}.page{color:#000;background-color:#fff;align-content:left;text-align:left;padding:20px;margin-bottom:300px}.page-list{list-style:none;padding-left:1em}.page-list li{margin-bottom:1em}.page li:before{content:"-";text-indent:-1em;display:inline-block}',""])},"4d6e":function(e,t,o){var n=o("b041");t=e.exports=o("2350")(!1),t.push([e.i,"@font-face{font-family:Jost;src:url("+n(o("1b92"))+') format("truetype");font-weight:100;font-style:normal}',""])},"56d7":function(e,t,o){"use strict";o.r(t);o("744f"),o("6095"),o("6c7b"),o("d25f"),o("7514"),o("20d6"),o("f3e2"),o("1c4c"),o("6762"),o("57e7"),o("2caf"),o("cadf"),o("9865"),o("6d67"),o("e804"),o("0cd8"),o("48f8"),o("759f"),o("55dd"),o("d04f"),o("78ce"),o("8ea5"),o("0298"),o("c8ce"),o("87b3"),o("d92a"),o("217b"),o("7f7f"),o("f400"),o("7f25"),o("536b"),o("d9ab"),o("f9ab"),o("32d7"),o("25c9"),o("9f3c"),o("042e"),o("c7c6"),o("f4ff"),o("049f"),o("7872"),o("a69f"),o("0b21"),o("6c1a"),o("c7c62"),o("84b4"),o("c5f6"),o("2e37"),o("fca0"),o("7cdf"),o("ee1d"),o("b1b1"),o("87f3"),o("9278"),o("5df2"),o("04ff"),o("f751"),o("8478"),o("4504"),o("fee7"),o("1c01"),o("58b2"),o("ffc1"),o("0d6d"),o("9986"),o("8e6e"),o("25db"),o("e4f7"),o("b9a1"),o("64d5"),o("9aea"),o("db97"),o("66c8"),o("57f0"),o("165b"),o("456d"),o("cf6a"),o("fd24"),o("8615"),o("551c"),o("097d"),o("df1b"),o("2397"),o("88ca"),o("ba16"),o("d185"),o("ebde"),o("2d34"),o("f6b3"),o("2251"),o("c698"),o("a19f"),o("9253"),o("9275"),o("3b2b"),o("3846"),o("4917"),o("a481"),o("28a5"),o("386d"),o("6b54"),o("4f7f"),o("8a81"),o("ac4d"),o("8449"),o("9c86"),o("fa83"),o("48c0"),o("a032"),o("aef6"),o("d263"),o("6c37"),o("9ec8"),o("5695"),o("2fdb"),o("d0b0"),o("5df3"),o("b54a"),o("f576"),o("ed50"),o("788d"),o("14b9"),o("f386"),o("f559"),o("1448"),o("673e"),o("242a"),o("4f37"),o("c66f"),o("262f"),o("b05c"),o("34ef"),o("6aa2"),o("15ac"),o("af56"),o("b6e4"),o("9c29"),o("63d9"),o("4dda"),o("10ad"),o("c02b"),o("4795"),o("130f"),o("ac6a"),o("96cf"),o("0cdd");var n=o("2b0e"),i=o("5f5b");o("ab8b"),o("2dd8");n["default"].use(i["a"]);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("div",{staticClass:"nav-head"},["/home"!==this.$route.path&&"/"!==this.$route.path?o("div",{staticClass:"routing"},[o("router-link",{attrs:{to:"/"}},[e._v("ZURÜCK")])],1):e._e()]),o("router-view"),o("footer",{staticClass:"page-footer"},[o("div",{staticClass:"container text-center text-md-left"},[o("div",{attrs:{hidden:"",id:"nav"}},[o("router-link",{attrs:{to:"/pages/map"}},[e._v("Karte")]),e._v("|\n        "),o("router-link",{attrs:{to:"/pages/scenes"}},[e._v("Szenen")]),e._v("|\n        "),o("router-link",{attrs:{to:"/pages/persons"}},[e._v("Personen")]),e._v("|\n        "),o("router-link",{attrs:{to:"/pages/history"}},[e._v("Entstehungsgeschichte")]),e._v("|\n      ")],1),e._m(0)]),e._m(1)])],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-8 mt-md-0 mt-8"},[n("img",{staticClass:"footer-logo",attrs:{alt:"Logo Theresienstadt Explained",src:o("9279")}})]),n("div",{staticClass:"col-md-4 mb-md-0 mb-4"},[n("ul",{staticClass:"list-unstyled"},[n("li",[n("a",{attrs:{href:"/about"}},[e._v("Über Theresienstadt explained")])]),n("li",[n("a",{attrs:{href:"/imprint"}},[e._v("Impressum")])]),n("li",{attrs:{hidden:""}},[n("a",{attrs:{href:"/privacy"}},[e._v("Datenschutzerklärung")])])])])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"footer-copyright text-center"},[e._v("\n      © 2019 Copyright:\n      "),o("a",{attrs:{href:"https://jugendbegegnung.de/dresden/"}},[e._v("Förderverein Jugendbegegnung in Theresienstadt/Terezin")])])}],s=(o("034f"),o("2877")),c={},l=Object(s["a"])(c,r,a,!1,null,null,null),d=l.exports,p=o("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("div",{staticClass:"container-fluid intro"},[n("img",{staticClass:"logo",attrs:{src:o("d42b")}}),n("div",{staticClass:"blend"}),n("video",{staticClass:"intro-video",attrs:{autoplay:"",muted:"",loop:""},domProps:{muted:!0}},[n("source",{attrs:{src:o("77f0"),type:"video/mp4"}})]),n("div",{staticClass:"intro-box"},[e._v("Lorem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üüüpsüm")]),n("div",{staticClass:"intro-box2"},[e._v("Lorem et üüüpsüm")])]),e._m(0)])},u=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container-fluid page-apps"},[n("div",{staticClass:"container"},[n("div",{staticClass:"row mb-4"},[n("div",{staticClass:"col-md-7 p-0 mr-4 app-cell"},[n("img",{attrs:{src:o("84f9")}}),n("div",{staticClass:"cell-box bottom"},[n("div",{staticClass:"cell-headline"},[e._v("Hallo Terezin")]),n("div",{staticClass:"cell-text"},[e._v("Some text")])])]),n("div",{staticClass:"col-md-4 p-0 app-cell"})]),n("div",{staticClass:"row mb-4"},[n("div",{staticClass:"col-md-4 mr-4 app-cell"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12 mb-4 app-cell"})]),n("div",{staticClass:"row mr-4"},[n("div",{staticClass:"col-md-12 app-cell"})])]),n("div",{staticClass:"col-md-7 app-cell"},[n("img",{attrs:{src:o("84f9")}}),n("div",{staticClass:"cell-box right"},[n("div",{staticClass:"cell-headline"},[e._v("Hallo Terezin")]),n("div",{staticClass:"cell-text"},[e._v("Some text")])])])]),n("div",{staticClass:"row mb-4"},[n("div",{staticClass:"col-md-5 mr-4 app-cell"}),n("div",{staticClass:"col-md-6 app-cell"},[n("img",{attrs:{src:o("84f9")}}),n("div",{staticClass:"cell-box bottom-half"},[n("div",{staticClass:"cell-headline"},[e._v("Hallo Terezin")]),n("div",{staticClass:"cell-text"},[e._v("Some text")])])])]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-3 px-mr-4 app-cell"}),n("div",{staticClass:"col-md-3 px-mr-4 app-cell"}),n("div",{staticClass:"col-md-4 app-cell"})]),n("div",{staticClass:"row mx-md-n5"},[n("div",{staticClass:"col px-md-6"},[n("div",{},[e._v("Custom column padding")])]),n("div",{staticClass:"col px-md-6"},[n("div",{},[e._v("Custom column padding")])])])])])}],m="http://localhost:4000/message",g={name:"home",data:function(){return{error:"",message:""}},mounted:function(){var e=this;fetch(m).then((function(e){return e.json()})).then((function(t){e.message=t}))},methods:{}},v=g,b=Object(s["a"])(v,f,u,!1,null,null,null),h=b.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("div",{staticClass:"container-fluid intro"},[n("img",{staticClass:"logo",attrs:{src:o("d42b")}}),n("div",{staticClass:"blend"}),n("video",{staticClass:"intro-video",attrs:{autoplay:"",muted:"",loop:""},domProps:{muted:!0}},[n("source",{attrs:{src:o("77f0"),type:"video/mp4"}})]),n("div",{staticClass:"intro-box"},[e._v("Lorem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üüüpsüm")]),n("div",{staticClass:"intro-box2"},[e._v("Lorem et üüüpsüm")])])])},y=[],w="http://localhost:4000/message",C={name:"intro",data:function(){return{error:"",message:""}},mounted:function(){var e=this;fetch(w).then((function(e){return e.json()})).then((function(t){e.message=t}))},methods:{}},_=C,k=Object(s["a"])(_,x,y,!1,null,null,null),j=k.exports;n["default"].use(p["a"]);var z=new p["a"]({mode:"history",base:"/",routes:[{path:"/",name:"intro",component:j},{path:"/home",name:"home",component:h},{path:"/film",name:"film",component:function(){return o.e("imprint").then(o.bind(null,"81a8"))}},{path:"/about",name:"about",component:function(){return o.e("about").then(o.bind(null,"f820"))}},{path:"/imprint",name:"imprint",component:function(){return o.e("imprint").then(o.bind(null,"5a7f"))}},{path:"/privacy",name:"privacy",component:function(){return o.e("imprint").then(o.bind(null,"6f9f"))}},{path:"/pages/persons",name:"imprint",component:function(){return o.e("about").then(o.bind(null,"3e10"))}},{path:"/pages/scenes",name:"scenes",component:function(){return o.e("about").then(o.bind(null,"87d1"))}},{path:"/pages/map",name:"pages/map",component:function(){return o.e("about").then(o.bind(null,"4bb4"))}},{path:"/pages/history",name:"imprint",component:function(){return o.e("about").then(o.bind(null,"e4bb"))}}]}),O=o("2f62");function S(e){return S="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(e)}n["default"].use(O["a"]);var V={},E=new O["a"].Store({state:{myValue:0,videos:V,newvideo:{title:"hello world",description:"12345678",tags:"tag",filename:"video.mp4",mimetype:"",format:"",size:"",length:"",courseid:2},mouse:{},showForm:!1,formDataModel:{},currentVideo:0,progresstranscode:0,progressanimation:0,progressthumbnail:0,progresspreview:0},getters:{videos:function(e){return function(){return e.videos}},progresstranscode:function(e){return function(){return e.progresstranscode}},progressanimation:function(e){return function(){return e.progressanimation}},progressthumbnail:function(e){return function(){return e.progressthumbnail}},progresspreview:function(e){return function(){return e.progresspreview}},newvideo:function(e){return function(){return e.newvideo}},videoById:function(e){return function(t){if(void 0!==e.videos[t]&&void 0!==t)return e.videos[t]}},isVideo:function(e){return function(t){return void 0!==e.videos[t]&&void 0!==t}},currentVideoData:function(e){return function(){return e.videos[e.currentVideo]}}},mutations:{addVideo:function(e,t){e.videos[t.id]=t},updateVideos:function(e,t){Object.keys(t).forEach((function(o){if(void 0===e.videos[o]){console.log(222);var n={};n[o]=t[o],e.videos[o]=t[o]}})),console.log(e.videos);Object.values(e.videos);Object.keys(e.videos).forEach((function(t){console.log("".concat(t,"__").concat(S(e.videos[t])))}))},removeVideo:function(e,t){e.videos[t]=null,delete e.videos[t]},getFormDataModel:function(){},progresstranscode:function(e,t){t="number"===typeof t?t:0,e.progresstranscode=t},progressanimation:function(e,t){t="number"===typeof t?t:0,e.progressanimation=t},progressthumbnail:function(e,t){t="number"===typeof t?t:0,e.progressthumbnail=t},progresspreview:function(e,t){t="number"===typeof t?t:0,e.progresspreview=t},setCurrentVideo:function(e,t){e.currentVideo=t},setCurrentVideoRating:function(e,t){e.videos[e.currentVideo].rating=t},setVideoFileData:function(e,t){if(console.log(t),V.isNewVideo){e.newvideo.mimetype=t.files.type;var o=String(t.files.name).split(".")[1];e.newvideo.format=o,e.newvideo.size=t.files.size,e.newvideo.length=t.files.duration,e.newvideo.filename=t.files.name}else e.videos[e.currentVideo].mimetype=t.files.type,e.videos[e.currentVideo].size=t.files.size,e.videos[e.currentVideo].filename=t.files.name}}}),P=o("9483");Object(P["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),n["default"].config.productionTip=!1,new n["default"]({router:z,store:E,render:function(e){return e(d)}}).$mount("#app")},"77f0":function(e,t,o){e.exports=o.p+"media/intro.5aa1fc88.mp4"},"84f9":function(e,t,o){e.exports=o.p+"img/dummy.d0736c46.png"},9279:function(e,t,o){e.exports=o.p+"img/logo-black.402c967b.png"},d42b:function(e,t,o){e.exports=o.p+"img/logo-white-big.adc55493.png"},e2a1:function(e,t,o){var n=o("3f8c");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=o("499e").default;i("1f50beb8",n,!0,{sourceMap:!1,shadowMode:!1})}});
//# sourceMappingURL=app.c3a72acd.js.map
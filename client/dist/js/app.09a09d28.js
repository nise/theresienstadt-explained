(function(e){function t(t){for(var r,o,a=t[0],c=t[1],l=t[2],d=0,u=[];d<a.length;d++)o=a[d],i[o]&&u.push(i[o][0]),i[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(u.length)u.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,o=1;o<n.length;o++){var a=n[o];0!==i[a]&&(r=!1)}r&&(s.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},i={app:0},s=[];function a(e){return c.p+"js/"+({about:"about",imprint:"imprint"}[e]||e)+"."+{about:"3cdb9000",imprint:"80848424"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={about:1,imprint:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise(function(t,n){for(var r="css/"+({about:"about",imprint:"imprint"}[e]||e)+"."+{about:"b600b708",imprint:"a85c45c4"}[e]+".css",i=c.p+r,s=document.getElementsByTagName("link"),a=0;a<s.length;a++){var l=s[a],d=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(d===r||d===i))return t()}var u=document.getElementsByTagName("style");for(a=0;a<u.length;a++){l=u[a],d=l.getAttribute("data-href");if(d===r||d===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||i,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete o[e],f.parentNode.removeChild(f),n(s)},f.href=i;var m=document.getElementsByTagName("head")[0];m.appendChild(f)}).then(function(){o[e]=0}));var r=i[e];if(0!==r)if(r)t.push(r[2]);else{var s=new Promise(function(t,n){r=i[e]=[t,n]});t.push(r[2]=s);var l,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=a(e),l=function(t){d.onerror=d.onload=null,clearTimeout(u);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,s=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");s.type=r,s.request=o,n[1](s)}i[e]=void 0}};var u=setTimeout(function(){l({type:"timeout",target:d})},12e4);d.onerror=d.onload=l,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var f=d;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("744f"),n("6c7b"),n("7514"),n("20d6"),n("1c4c"),n("6762"),n("cadf"),n("e804"),n("55dd"),n("d04f"),n("c8ce"),n("217b"),n("7f7f"),n("f400"),n("7f25"),n("536b"),n("d9ab"),n("f9ab"),n("32d7"),n("25c9"),n("9f3c"),n("042e"),n("c7c6"),n("f4ff"),n("049f"),n("7872"),n("a69f"),n("0b21"),n("6c1a"),n("c7c62"),n("84b4"),n("c5f6"),n("2e37"),n("fca0"),n("7cdf"),n("ee1d"),n("b1b1"),n("87f3"),n("9278"),n("5df2"),n("04ff"),n("f751"),n("4504"),n("fee7"),n("ffc1"),n("0d6d"),n("9986"),n("8e6e"),n("25db"),n("e4f7"),n("b9a1"),n("64d5"),n("9aea"),n("db97"),n("66c8"),n("57f0"),n("165b"),n("456d"),n("cf6a"),n("fd24"),n("8615"),n("551c"),n("097d"),n("df1b"),n("2397"),n("88ca"),n("ba16"),n("d185"),n("ebde"),n("2d34"),n("f6b3"),n("2251"),n("c698"),n("a19f"),n("9253"),n("9275"),n("3b2b"),n("3846"),n("4917"),n("a481"),n("28a5"),n("386d"),n("6b54"),n("4f7f"),n("8a81"),n("ac4d"),n("8449"),n("9c86"),n("fa83"),n("48c0"),n("a032"),n("aef6"),n("d263"),n("6c37"),n("9ec8"),n("5695"),n("2fdb"),n("d0b0"),n("5df3"),n("b54a"),n("f576"),n("ed50"),n("788d"),n("14b9"),n("f386"),n("f559"),n("1448"),n("673e"),n("242a"),n("c66f"),n("b05c"),n("34ef"),n("6aa2"),n("15ac"),n("af56"),n("b6e4"),n("9c29"),n("63d9"),n("4dda"),n("10ad"),n("c02b"),n("4795"),n("130f"),n("ac6a"),n("96cf"),n("0cdd");var r=n("2b0e"),o=n("5f5b");n("ab8b"),n("2dd8");r["default"].use(o["a"]);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"nav-head"},["/home"!==this.$route.path&&"/"!==this.$route.path?n("div",{staticClass:"routing"},[n("router-link",{attrs:{to:"/"}},[e._v("ZURÜCK")])],1):e._e()]),n("router-view"),n("footer",{staticClass:"page-footer"},[n("div",{staticClass:"container text-center text-md-left"},[n("div",{attrs:{hidden:"",id:"nav"}},[n("router-link",{attrs:{to:"/pages/map"}},[e._v("Karte")]),e._v("|\n        "),n("router-link",{attrs:{to:"/pages/scenes"}},[e._v("Szenen")]),e._v("|\n        "),n("router-link",{attrs:{to:"/pages/persons"}},[e._v("Personen")]),e._v("|\n        "),n("router-link",{attrs:{to:"/pages/history"}},[e._v("Entstehungsgeschichte")]),e._v("|\n      ")],1),e._m(0)]),e._m(1)])],1)},s=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-8 mt-md-0 mt-8"},[r("img",{staticClass:"footer-logo",attrs:{alt:"Logo Theresienstadt Explained",src:n("9279")}})]),r("div",{staticClass:"col-md-4 mb-md-0 mb-4"},[r("ul",{staticClass:"list-unstyled"},[r("li",[r("a",{attrs:{href:"/about"}},[e._v("Über Theresienstadt explained")])]),r("li",[r("a",{attrs:{href:"/imprint"}},[e._v("Impressum")])]),r("li",{attrs:{hidden:""}},[r("a",{attrs:{href:"/privacy"}},[e._v("Datenschutzerklärung")])])])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"footer-copyright text-center"},[e._v("\n      © 2019 Copyright:\n      "),n("a",{attrs:{href:"https://jugendbegegnung.de/dresden/"}},[e._v("Förderverein Jugendbegegnung in Theresienstadt/Terezin")])])}],a=(n("034f"),n("2877")),c={},l=Object(a["a"])(c,i,s,!1,null,null,null),d=l.exports,u=n("8c4f"),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("div",{staticClass:"container-fluid intro"},[r("img",{staticClass:"logo",attrs:{src:n("d42b")}}),r("div",{staticClass:"blend"}),r("video",{staticClass:"intro-video",attrs:{autoplay:"",muted:"",loop:""},domProps:{muted:!0}},[r("source",{attrs:{src:n("77f0"),type:"video/mp4"}})]),r("div",{staticClass:"intro-box"},[e._v("Lorem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üüüpsüm")]),r("div",{staticClass:"intro-box2"},[e._v("Lorem et üüüpsüm")])]),e._m(0)])},m=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container-fluid page-apps"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row mb-4"},[r("div",{staticClass:"col-md-7 p-0 mr-4 app-cell"},[r("img",{attrs:{src:n("84f9")}}),r("div",{staticClass:"cell-box bottom"},[r("div",{staticClass:"cell-headline"},[e._v("Hallo Terezin")]),r("div",{staticClass:"cell-text"},[e._v("Some text")])])]),r("div",{staticClass:"col-md-4 p-0 app-cell"})]),r("div",{staticClass:"row mb-4"},[r("div",{staticClass:"col-md-4 mr-4 app-cell"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12 mb-4 app-cell"})]),r("div",{staticClass:"row mr-4"},[r("div",{staticClass:"col-md-12 app-cell"})])]),r("div",{staticClass:"col-md-7 app-cell"},[r("img",{attrs:{src:n("84f9")}}),r("div",{staticClass:"cell-box right"},[r("div",{staticClass:"cell-headline"},[e._v("Hallo Terezin")]),r("div",{staticClass:"cell-text"},[e._v("Some text")])])])]),r("div",{staticClass:"row mb-4"},[r("div",{staticClass:"col-md-5 mr-4 app-cell"}),r("div",{staticClass:"col-md-6 app-cell"},[r("img",{attrs:{src:n("84f9")}}),r("div",{staticClass:"cell-box bottom-half"},[r("div",{staticClass:"cell-headline"},[e._v("Hallo Terezin")]),r("div",{staticClass:"cell-text"},[e._v("Some text")])])])]),r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-3 px-mr-4 app-cell"}),r("div",{staticClass:"col-md-3 px-mr-4 app-cell"}),r("div",{staticClass:"col-md-4 app-cell"})]),r("div",{staticClass:"row mx-md-n5"},[r("div",{staticClass:"col px-md-6"},[r("div",{},[e._v("Custom column padding")])]),r("div",{staticClass:"col px-md-6"},[r("div",{},[e._v("Custom column padding")])])])])])}],p="http://localhost:4000/message",v={name:"home",data:function(){return{error:"",message:""}},mounted:function(){var e=this;fetch(p).then(function(e){return e.json()}).then(function(t){e.message=t})},methods:{}},b=v,g=Object(a["a"])(b,f,m,!1,null,null,null),h=g.exports,y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("div",{staticClass:"container-fluid intro"},[r("img",{staticClass:"logo",attrs:{src:n("d42b")}}),r("div",{staticClass:"blend"}),r("video",{staticClass:"intro-video",attrs:{autoplay:"",muted:"",loop:""},domProps:{muted:!0}},[r("source",{attrs:{src:n("77f0"),type:"video/mp4"}})]),r("div",{staticClass:"intro-box"},[e._v("Lorem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üürem et üüüpsüm")]),r("div",{staticClass:"intro-box2"},[e._v("Lorem et üüüpsüm")])])])},C=[],_="http://localhost:4000/message",w={name:"intro",data:function(){return{error:"",message:""}},mounted:function(){var e=this;fetch(_).then(function(e){return e.json()}).then(function(t){e.message=t})},methods:{}},x=w,j=Object(a["a"])(x,y,C,!1,null,null,null),k=j.exports;r["default"].use(u["a"]);var S=new u["a"]({mode:"history",base:"/",routes:[{path:"/",name:"intro",component:k},{path:"/home",name:"home",component:h},{path:"/film",name:"film",component:function(){return n.e("imprint").then(n.bind(null,"81a8"))}},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/imprint",name:"imprint",component:function(){return n.e("imprint").then(n.bind(null,"5a7f"))}},{path:"/privacy",name:"privacy",component:function(){return n.e("imprint").then(n.bind(null,"6f9f"))}},{path:"/pages/persons",name:"imprint",component:function(){return n.e("about").then(n.bind(null,"3e10"))}},{path:"/pages/scenes",name:"scenes",component:function(){return n.e("about").then(n.bind(null,"87d1"))}},{path:"/pages/map",name:"pages/map",component:function(){return n.e("about").then(n.bind(null,"4bb4"))}},{path:"/pages/history",name:"imprint",component:function(){return n.e("about").then(n.bind(null,"e4bb"))}}]}),E=n("2f62");function O(e){return O="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O(e)}r["default"].use(E["a"]);var V={},T=new E["a"].Store({state:{myValue:0,videos:V,newvideo:{title:"hello world",description:"12345678",tags:"tag",filename:"video.mp4",mimetype:"",format:"",size:"",length:"",courseid:2},mouse:{},showForm:!1,formDataModel:{},currentVideo:0,progresstranscode:0,progressanimation:0,progressthumbnail:0,progresspreview:0},getters:{videos:function(e){return function(){return e.videos}},progresstranscode:function(e){return function(){return e.progresstranscode}},progressanimation:function(e){return function(){return e.progressanimation}},progressthumbnail:function(e){return function(){return e.progressthumbnail}},progresspreview:function(e){return function(){return e.progresspreview}},newvideo:function(e){return function(){return e.newvideo}},videoById:function(e){return function(t){if(void 0!==e.videos[t]&&void 0!==t)return e.videos[t]}},isVideo:function(e){return function(t){return void 0!==e.videos[t]&&void 0!==t}},currentVideoData:function(e){return function(){return e.videos[e.currentVideo]}}},mutations:{addVideo:function(e,t){e.videos[t.id]=t},updateVideos:function(e,t){Object.keys(t).forEach(function(n){if(void 0===e.videos[n]){console.log(222);var r={};r[n]=t[n],e.videos[n]=t[n]}}),console.log(e.videos);Object.values(e.videos);Object.keys(e.videos).forEach(function(t){console.log(t+"__"+O(e.videos[t]))})},removeVideo:function(e,t){e.videos[t]=null,delete e.videos[t]},getFormDataModel:function(){},progresstranscode:function(e,t){t="number"===typeof t?t:0,e.progresstranscode=t},progressanimation:function(e,t){t="number"===typeof t?t:0,e.progressanimation=t},progressthumbnail:function(e,t){t="number"===typeof t?t:0,e.progressthumbnail=t},progresspreview:function(e,t){t="number"===typeof t?t:0,e.progresspreview=t},setCurrentVideo:function(e,t){e.currentVideo=t},setCurrentVideoRating:function(e,t){e.videos[e.currentVideo].rating=t},setVideoFileData:function(e,t){if(console.log(t),V.isNewVideo){e.newvideo.mimetype=t.files.type;var n=String(t.files.name).split(".")[1];e.newvideo.format=n,e.newvideo.size=t.files.size,e.newvideo.length=t.files.duration,e.newvideo.filename=t.files.name}else e.videos[e.currentVideo].mimetype=t.files.type,e.videos[e.currentVideo].size=t.files.size,e.videos[e.currentVideo].filename=t.files.name}}}),P=n("9483");Object(P["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),r["default"].config.productionTip=!1,new r["default"]({router:S,store:T,render:function(e){return e(d)}}).$mount("#app")},"64a9":function(e,t,n){},"77f0":function(e,t,n){e.exports=n.p+"media/intro.5aa1fc88.mp4"},"84f9":function(e,t,n){e.exports=n.p+"img/dummy.d0736c46.png"},9279:function(e,t,n){e.exports=n.p+"img/logo-black.402c967b.png"},d42b:function(e,t,n){e.exports=n.p+"img/logo-white-big.adc55493.png"}});
//# sourceMappingURL=app.09a09d28.js.map
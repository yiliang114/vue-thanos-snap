(function(t){function e(e){for(var s,o,i=e[0],c=e[1],u=e[2],f=0,p=[];f<i.length;f++)o=i[f],r[o]&&p.push(r[o][0]),r[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);d&&d(e);while(p.length)p.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],s=!0,i=1;i<n.length;i++){var c=n[i];0!==r[c]&&(s=!1)}s&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var s={},r={app:0},a=[];function o(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=s,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(n,s,function(e){return t[e]}.bind(null,s));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/vue-thanos-snap/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var d=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var s=n("64a9"),r=n.n(s);r.a},1787:function(t,e,n){t.exports=n.p+"media/thanos_reverse_sound.e00730e1.mp3"},1965:function(t,e,n){t.exports=n.p+"img/5.39284a8c.jpg"},"1c86":function(t,e,n){t.exports=n.p+"img/Drax.0430b598.jpg"},"2bdc":function(t,e,n){t.exports=n.p+"media/thanos_dust_6.c1b80089.mp3"},"3d27":function(t,e,n){t.exports=n.p+"img/7.fc59f361.jpg"},"42c9":function(t,e,n){t.exports=n.p+"img/8.d2057db6.jpg"},"49bd":function(t,e,n){"use strict";var s=n("967a"),r=n.n(s);r.a},"4e85":function(t,e,n){t.exports=n.p+"img/Nebula.26f979eb.jpg"},5061:function(t,e,n){t.exports=n.p+"media/thanos_dust_2.7bd6a609.mp3"},"52f0":function(t,e,n){t.exports=n.p+"img/1.e5038bc9.jpg"},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var s=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main",attrs:{id:"app"}},[n("Main")],1)},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("div",{staticClass:"gauntlet"},[n("div",{staticClass:"gauntlet-wrapper"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.status===t.PEDDING||t.status===t.SNAPING,expression:"status === PEDDING || status === SNAPING"}],staticClass:"gauntlet-item",class:t.status===t.SNAPING?"snaping":"",attrs:{id:"gauntlet-snap"},on:{click:t.snapHandle}}),n("div",{directives:[{name:"show",rawName:"v-show",value:t.status===t.DONE||t.status===t.REVERSING,expression:"status === DONE || status === REVERSING"}],staticClass:"gauntlet-item",class:t.status===t.REVERSING?"reversing":"",attrs:{id:"gauntlet-reverse"},on:{click:t.reverseHandle}})])]),n("Content",{attrs:{heroes:t.heroes,status:t.status}}),n("audio",{ref:"allAuduio",attrs:{preload:""}})],1)},i=[],c=(n("ac6a"),n("55dd"),n("96cf"),n("3b8d")),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[t._l(t.heroes,function(e,s){return n("div",{key:s,ref:"hero-"+e.id,refInFor:!0,staticClass:"item",class:{time:t.status===t.REVERSING&&t.theLostHeroIds.indexOf(e.id)>-1,hidden:t.hideDone.indexOf(e.id)>-1,visible:t.status===t.PEDDING||t.status===t.REVERSING},attrs:{id:e.id}},[n("div",{staticClass:"item-body"},[n("div",{staticClass:"avatar"},[n("img",{attrs:{src:e.src,alt:""}})]),n("div",{staticClass:"info"},[t._v(t._s(e.name))])])])}),t._l(t.theLostHeroIds,function(e){return n("DustHero",{directives:[{name:"scroll",rawName:"v-scroll"}],key:"hero-"+e,class:"hero-"+e,attrs:{heroId:e},on:{"hide-hero":t.hideHero}})})],2)},d=[],f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"container",staticClass:"dust-container"},t._l(t.framesLength,function(e){return n("canvas",{key:e,class:{dust:t.showDust},attrs:{width:"450",height:"520"}})}),0)},p=[],h=n("75fc"),l=(n("c5f6"),n("c0e9")),m=n.n(l),v={name:"DustList",props:{heroId:Number},data:function(){return{framesLength:32,showDust:!1}},methods:{generateFrames:function(t){for(var e=this,n=t.width,s=t.height,r=t.getContext("2d"),a=r.getImageData(0,0,n,s),o=Object(h["a"])(Array(this.framesLength)).map(function(){return r.createImageData(n,s)}),i=0;i<n;++i)for(var c=0;c<s;++c)for(var u=0;u<2;++u)for(var d=Math.floor(this.framesLength*(Math.random()+2*i/n)/3),f=4*(c*n+i),p=0;p<4;++p)o[d].data[f+p]=a.data[f+p];o.map(function(t,n){var s=e.$refs.container.children[n];s.getContext("2d").putImageData(t,0,0)})},drawCanvas:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){var n,s=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m()(e,{allowTaint:!0});case 3:n=t.sent,this.generateFrames(n),this.$nextTick(function(){s.showDust=!0,s.$emit("hide-hero",s.heroId)}),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.error(t.t0);case 11:case"end":return t.stop()}},t,this,[[0,8]])}));function e(e){return t.apply(this,arguments)}return e}()},mounted:function(){var t=document.querySelector(".content"),e=t&&t.children[this.heroId-1];this.drawCanvas(e)}},g=v,b=(n("7671"),n("2877")),w=Object(b["a"])(g,f,p,!1,null,"48b8f986",null),x=w.exports,_=[{id:1,name:"Iron Man",src:n("52f0"),show:!0},{id:2,name:"Black Widow",src:n("96f2"),show:!0},{id:3,name:"Captain America",src:n("80f2"),show:!0},{id:4,name:"Spider Man",src:n("bfdd"),show:!0},{id:5,name:"Thor",src:n("1965"),show:!0},{id:6,name:"Hulk",src:n("b00a"),show:!0},{id:7,name:"Black Panther",src:n("3d27"),show:!0},{id:8,name:"Doctor Stranger",src:n("42c9"),show:!0},{id:9,name:"Clint",src:n("604e"),show:!0},{id:10,name:"Drax",src:n("1c86"),show:!0},{id:11,name:"Groot",src:n("d259"),show:!0},{id:12,name:"Loki",src:n("601d"),show:!0},{id:13,name:"Winter",src:n("b70c"),show:!0},{id:14,name:"Mantis",src:n("921d"),show:!0},{id:15,name:"Nebula",src:n("4e85"),show:!0},{id:16,name:"Vision",src:n("dda7"),show:!0}],N="PEDDING",D="SNAPING",E="DONE",I="REVERSING",y={data:function(){return{PEDDING:N,SNAPING:D,DONE:E,REVERSING:I}}},j=new s["a"],O={name:"Content",props:{heroes:Array,status:String},data:function(){return{theLostHeroIds:[],hideDone:[]}},directives:{scroll:{inserted:function(t){t.scrollIntoView({behavior:"smooth",block:"center"})}}},mixins:[y],methods:{hideHero:function(t){this.hideDone.push(t)}},components:{DustHero:x},created:function(){var t=this;j.$on("hide-hero",function(e){t.theLostHeroIds.push(e)}),j.$on("reverse-time",function(){t.hideDone=[],setTimeout(function(){t.$parent.changeStatus(t.PEDDING),t.theLostHeroIds=[]},2e3)})},beforeDestroy:function(){j.$off("hide-hero"),j.$off("reverse-time")}},S=O,k=(n("49bd"),Object(b["a"])(S,u,d,!1,null,"81fe77ca",null)),G=k.exports,R={name:"GauntletMain",data:function(){return{status:"PEDDING",heroes:_,stay:4}},mixins:[y],methods:{changeStatus:function(t){this.status=t},sleep:function(t){return new Promise(function(e){setTimeout(function(){e()},t||2e3)})},snapHandle:function(){var t=this;this.status!==this.SNAPING&&this.status!==this.REVERSING&&(this.status=this.SNAPING,this.playAudio("snap"),setTimeout(Object(c["a"])(regeneratorRuntime.mark(function e(){var n,s,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.heroes.slice(0).sort(function(){return.5-Math.random()}).slice(0,Math.ceil(t.heroes.length/2)),s=regeneratorRuntime.mark(function e(s){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!s){e.next=3;break}return e.next=3,t.sleep();case 3:t.playAudio(),t.$nextTick(function(){j.$emit("hide-hero",n[s].id)});case 5:case"end":return e.stop()}},e)}),r=0;case 3:if(!(r<n.length)){e.next=8;break}return e.delegateYield(s(r),"t0",5);case 5:r++,e.next=3;break;case 8:t.$nextTick(function(){t.status=t.DONE});case 9:case"end":return e.stop()}},e)})),4e3))},reverseHandle:function(){this.status!==this.SNAPING&&this.status!==this.REVERSING&&(this.status=this.REVERSING,j.$emit("reverse-time"),this.playAudio("reverse"))},playAudio:function(t){var e=this.$refs.allAuduio;if(e){if(e.paused||e.pause(),["snap","reverse"].indexOf(t)>-1)e.src=n("96d4")("./thanos_".concat(t,"_sound.mp3"));else{var s=t||Math.floor(6*Math.random()+1);e.src=n("e679")("./thanos_dust_".concat(s,".mp3"))}e.play()}}},components:{Content:G}},C=R,P=Object(b["a"])(C,o,i,!1,null,null,null),M=P.exports,$={name:"app",components:{Main:M}},A=$,H=(n("034f"),Object(b["a"])(A,r,a,!1,null,null,null)),L=H.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(L)}}).$mount("#app")},"601d":function(t,e,n){t.exports=n.p+"img/Loki.961d2e35.jpeg"},"604e":function(t,e,n){t.exports=n.p+"img/Clint.29e5d648.jpeg"},"64a9":function(t,e,n){},7671:function(t,e,n){"use strict";var s=n("dd34"),r=n.n(s);r.a},"80f2":function(t,e,n){t.exports=n.p+"img/3.ca958f09.jpg"},"8d92":function(t,e,n){t.exports=n.p+"media/thanos_dust_5.eed1dd08.mp3"},"921d":function(t,e,n){t.exports=n.p+"img/Mantis.b6d329f5.jpg"},"967a":function(t,e,n){},"96d4":function(t,e,n){var s={"./thanos_reverse_sound.mp3":"1787","./thanos_snap_sound.mp3":"97aa"};function r(t){var e=a(t);return n(e)}function a(t){var e=s[t];if(!(e+1)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return e}r.keys=function(){return Object.keys(s)},r.resolve=a,t.exports=r,r.id="96d4"},"96f2":function(t,e,n){t.exports=n.p+"img/2.79dcf1ab.jpg"},"97aa":function(t,e,n){t.exports=n.p+"media/thanos_snap_sound.b746c7d7.mp3"},b00a:function(t,e,n){t.exports=n.p+"img/6.8f106a4b.jpg"},b70c:function(t,e,n){t.exports=n.p+"img/Winter.98fcc085.jpg"},bfdd:function(t,e,n){t.exports=n.p+"img/4.4ea4c2e5.jpg"},cb36:function(t,e,n){t.exports=n.p+"media/thanos_dust_3.94ca0f5b.mp3"},cc40:function(t,e,n){t.exports=n.p+"media/thanos_dust_4.adf013fc.mp3"},d259:function(t,e,n){t.exports=n.p+"img/Groot.65f71a77.jpg"},d544:function(t,e,n){t.exports=n.p+"media/thanos_dust_1.ad4820bd.mp3"},dd34:function(t,e,n){},dda7:function(t,e,n){t.exports=n.p+"img/Vision.0b7ac4bf.jpg"},e679:function(t,e,n){var s={"./thanos_dust_1.mp3":"d544","./thanos_dust_2.mp3":"5061","./thanos_dust_3.mp3":"cb36","./thanos_dust_4.mp3":"cc40","./thanos_dust_5.mp3":"8d92","./thanos_dust_6.mp3":"2bdc"};function r(t){var e=a(t);return n(e)}function a(t){var e=s[t];if(!(e+1)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return e}r.keys=function(){return Object.keys(s)},r.resolve=a,t.exports=r,r.id="e679"}});
//# sourceMappingURL=app.46cce155.js.map
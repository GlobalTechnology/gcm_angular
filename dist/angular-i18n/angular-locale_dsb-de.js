"use strict";angular.module("ngLocale",[],["$provide",function(a){function e(a){a+="";var e=a.indexOf(".");return-1==e?0:a.length-e-1}function r(a,r){var n=r;void 0===n&&(n=Math.min(e(a),3));var t=Math.pow(10,n),o=(a*t|0)%t;return{v:n,f:o}}var n={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["dopołdnja","wótpołdnja"],DAY:["njeźela","pónjeźele","wałtora","srjoda","stwórtk","pětk","sobota"],MONTH:["januara","februara","měrca","apryla","maja","junija","julija","awgusta","septembra","oktobra","nowembra","decembra"],SHORTDAY:["nje","pón","wał","srj","stw","pět","sob"],SHORTMONTH:["jan.","feb.","měr.","apr.","maj.","jun.","jul.","awg.","sep.","okt.","now.","dec."],fullDate:"EEEE, d. MMMM y",longDate:"d. MMMM y",medium:"d.M.y H:mm:ss",mediumDate:"d.M.y",mediumTime:"H:mm:ss","short":"d.M.yy H:mm",shortDate:"d.M.yy",shortTime:"H:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"dsb-de",pluralCat:function(a,e){var t=0|a,o=r(a,e);return 1==t&&0==o.v?n.ONE:n.OTHER}})}]);
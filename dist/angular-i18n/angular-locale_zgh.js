"use strict";angular.module("ngLocale",[],["$provide",function(e){function n(e){e+="";var n=e.indexOf(".");return-1==n?0:e.length-n-1}function M(e,M){var r=M;void 0===r&&(r=Math.min(n(e),3));var a=Math.pow(10,r),m=(e*a|0)%a;return{v:r,f:m}}var r={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["ⵜⵉⴼⴰⵡⵜ","ⵜⴰⴷⴳⴳⵯⴰⵜ"],DAY:["ⴰⵙⴰⵎⴰⵙ","ⴰⵢⵏⴰⵙ","ⴰⵙⵉⵏⴰⵙ","ⴰⴽⵕⴰⵙ","ⴰⴽⵡⴰⵙ","ⴰⵙⵉⵎⵡⴰⵙ","ⴰⵙⵉⴹⵢⴰⵙ"],MONTH:["ⵉⵏⵏⴰⵢⵔ","ⴱⵕⴰⵢⵕ","ⵎⴰⵕⵚ","ⵉⴱⵔⵉⵔ","ⵎⴰⵢⵢⵓ","ⵢⵓⵏⵢⵓ","ⵢⵓⵍⵢⵓⵣ","ⵖⵓⵛⵜ","ⵛⵓⵜⴰⵏⴱⵉⵔ","ⴽⵜⵓⴱⵔ","ⵏⵓⵡⴰⵏⴱⵉⵔ","ⴷⵓⵊⴰⵏⴱⵉⵔ"],SHORTDAY:["ⴰⵙⴰ","ⴰⵢⵏ","ⴰⵙⵉ","ⴰⴽⵕ","ⴰⴽⵡ","ⴰⵙⵉⵎ","ⴰⵙⵉⴹ"],SHORTMONTH:["ⵉⵏⵏ","ⴱⵕⴰ","ⵎⴰⵕ","ⵉⴱⵔ","ⵎⴰⵢ","ⵢⵓⵏ","ⵢⵓⵍ","ⵖⵓⵛ","ⵛⵓⵜ","ⴽⵜⵓ","ⵏⵓⵡ","ⴷⵓⵊ"],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM, y HH:mm:ss",mediumDate:"d MMM, y",mediumTime:"HH:mm:ss","short":"d/M/y HH:mm",shortDate:"d/M/y",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"dh",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:"¤",posPre:"",posSuf:"¤"}]},id:"zgh",pluralCat:function(e,n){var a=0|e,m=M(e,n);return 1==a&&0==m.v?r.ONE:r.OTHER}})}]);
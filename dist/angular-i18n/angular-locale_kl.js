"use strict";angular.module("ngLocale",[],["$provide",function(a){function n(a){a+="";var n=a.indexOf(".");return-1==n?0:a.length-n-1}function e(a,e){var r=e;void 0===r&&(r=Math.min(n(a),3));var i=Math.pow(10,r),t=(a*i|0)%i;return{v:r,f:t}}var r={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["ulloqeqqata-tungaa","ulloqeqqata-kingorna"],DAY:["sabaat","ataasinngorneq","marlunngorneq","pingasunngorneq","sisamanngorneq","tallimanngorneq","arfininngorneq"],MONTH:["januari","februari","martsi","aprili","maji","juni","juli","augustusi","septemberi","oktoberi","novemberi","decemberi"],SHORTDAY:["sab","ata","mar","pin","sis","tal","arf"],SHORTMONTH:["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],fullDate:"EEEE dd MMMM y",longDate:"dd MMMM y",medium:"MMM dd, y h:mm:ss a",mediumDate:"MMM dd, y",mediumTime:"h:mm:ss a","short":"y-MM-dd h:mm a",shortDate:"y-MM-dd",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"kr",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤-",negSuf:"",posPre:"¤",posSuf:""}]},id:"kl",pluralCat:function(a,n){var i=0|a,t=e(a,n);return 1==i&&0==t.v?r.ONE:r.OTHER}})}]);
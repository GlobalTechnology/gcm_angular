"use strict";angular.module("ngLocale",[],["$provide",function(a){function u(a){a+="";var u=a.indexOf(".");return-1==u?0:a.length-u-1}function t(a,t){var e=t;void 0===e&&(e=Math.min(u(a),3));var i=Math.pow(10,e),n=(a*i|0)%i;return{v:e,f:n}}var e={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["ap.","ip."],DAY:["sunnuntaina","maanantaina","tiistaina","keskiviikkona","torstaina","perjantaina","lauantaina"],MONTH:["tammikuuta","helmikuuta","maaliskuuta","huhtikuuta","toukokuuta","kesäkuuta","heinäkuuta","elokuuta","syyskuuta","lokakuuta","marraskuuta","joulukuuta"],SHORTDAY:["su","ma","ti","ke","to","pe","la"],SHORTMONTH:["tammikuuta","helmikuuta","maaliskuuta","huhtikuuta","toukokuuta","kesäkuuta","heinäkuuta","elokuuta","syyskuuta","lokakuuta","marraskuuta","joulukuuta"],fullDate:"cccc d. MMMM y",longDate:"d. MMMM y",medium:"d.M.y H.mm.ss",mediumDate:"d.M.y",mediumTime:"H.mm.ss","short":"d.M.y H.mm",shortDate:"d.M.y",shortTime:"H.mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"fi",pluralCat:function(a,u){var i=0|a,n=t(a,u);return 1==i&&0==n.v?e.ONE:e.OTHER}})}]);
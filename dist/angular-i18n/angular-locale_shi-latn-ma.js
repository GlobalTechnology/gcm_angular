"use strict";angular.module("ngLocale",[],["$provide",function(a){function n(a){a+="";var n=a.indexOf(".");return-1==n?0:a.length-n-1}function i(a,i){var u=i;void 0===u&&(u=Math.min(n(a),3));var e=Math.pow(10,u),r=(a*e|0)%e;return{v:u,f:r}}var u={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["tifawt","tadggʷat"],DAY:["asamas","aynas","asinas","akṛas","akwas","asimwas","asiḍyas"],MONTH:["innayr","bṛayṛ","maṛṣ","ibrir","mayyu","yunyu","yulyuz","ɣuct","cutanbir","ktubr","nuwanbir","dujanbir"],SHORTDAY:["asa","ayn","asi","akṛ","akw","asim","asiḍ"],SHORTMONTH:["inn","bṛa","maṛ","ibr","may","yun","yul","ɣuc","cut","ktu","nuw","duj"],fullDate:"EEEE d MMMM y",longDate:"d MMMM y",medium:"d MMM, y HH:mm:ss",mediumDate:"d MMM, y",mediumTime:"HH:mm:ss","short":"d/M/y HH:mm",shortDate:"d/M/y",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"dh",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:"¤",posPre:"",posSuf:"¤"}]},id:"shi-latn-ma",pluralCat:function(a,n){var e=0|a,r=i(a,n);return 1==e&&0==r.v?u.ONE:u.OTHER}})}]);
"use strict";angular.module("ngLocale",[],["$provide",function(e){var a={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["vm.","nm."],DAY:["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"],MONTH:["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember"],SHORTDAY:["So","Ma","Di","Wo","Do","Vr","Sa"],SHORTMONTH:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Des"],fullDate:"EEEE dd MMMM y",longDate:"dd MMMM y",medium:"dd MMM y h:mm:ss a",mediumDate:"dd MMM y",mediumTime:"h:mm:ss a","short":"y-MM-dd h:mm a",shortDate:"y-MM-dd",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"R",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤-",negSuf:"",posPre:"¤",posSuf:""}]},id:"af",pluralCat:function(e,r){return 1==e?a.ONE:a.OTHER}})}]);
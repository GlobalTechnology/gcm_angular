"use strict";angular.module("ngLocale",[],["$provide",function(n){function a(n){n+="";var a=n.indexOf(".");return-1==a?0:n.length-a-1}function e(n,e){var u=e;void 0===u&&(u=Math.min(a(n),3));var o=Math.pow(10,u),m=(n*o|0)%o;return{v:u,f:m}}var u={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};n.value("$locale",{DATETIME_FORMATS:{AMPMS:["iđitbeaivet","eahketbeaivet"],DAY:["sotnabeaivi","vuossárga","maŋŋebárga","gaskavahkku","duorasdat","bearjadat","lávvardat"],MONTH:["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu"],SHORTDAY:["sotn","vuos","maŋ","gask","duor","bear","láv"],SHORTMONTH:["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov"],fullDate:"y MMMM d, EEEE",longDate:"y MMMM d",medium:"y MMM d HH:mm:ss",mediumDate:"y MMM d",mediumTime:"HH:mm:ss","short":"y-MM-dd HH:mm",shortDate:"y-MM-dd",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"kr",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"se-se",pluralCat:function(n,a){var o=0|n,m=e(n,a);return 1==o&&0==m.v?u.ONE:u.OTHER}})}]);
"use strict";angular.module("ngLocale",[],["$provide",function(e){function n(e){e+="";var n=e.indexOf(".");return-1==n?0:e.length-n-1}function r(e,r){var M=r;void 0===M&&(M=Math.min(n(e),3));var a=Math.pow(10,M),m=(e*a|0)%a;return{v:M,f:m}}var M={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["ЭИ","ЭК"],DAY:["Баскыһыанньа","Бэнидиэлинньик","Оптуорунньук","Сэрэдэ","Чэппиэр","Бээтиҥсэ","Субуота"],MONTH:["Тохсунньу","Олунньу","Кулун тутар","Муус устар","Ыам ыйын","Бэс ыйын","От ыйын","Атырдьых ыйын","Балаҕан ыйын","Алтынньы","Сэтинньи","Ахсынньы"],SHORTDAY:["Бс","Бн","Оп","Сэ","Чп","Бэ","Сб"],SHORTMONTH:["Тохс","Олун","Клн_ттр","Мус_уст","Ыам_йн","Бэс_йн","От_йн","Атрдь_йн","Блҕн_йн","Алт","Сэт","Ахс"],fullDate:"y 'сыл' MMMM d 'күнэ', EEEE",longDate:"y, MMMM d",medium:"y, MMM d HH:mm:ss",mediumDate:"y, MMM d",mediumTime:"HH:mm:ss","short":"yy/M/d HH:mm",shortDate:"yy/M/d",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"руб.",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤ -",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"sah-ru",pluralCat:function(e,n){var a=0|e,m=r(e,n);return 1==a&&0==m.v?M.ONE:M.OTHER}})}]);
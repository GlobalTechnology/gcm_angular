"use strict";angular.module("ngLocale",[],["$provide",function(e){var r={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};e.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:["Sul","Lun","Meurzh","Mercʼher","Yaou","Gwener","Sadorn"],MONTH:["Genver","Cʼhwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu"],SHORTDAY:["sul","lun","meu.","mer.","yaou","gwe.","sad."],SHORTMONTH:["Gen","Cʼhwe","Meur","Ebr","Mae","Mezh","Goue","Eost","Gwen","Here","Du","Ker"],fullDate:"y MMMM d, EEEE",longDate:"y MMMM d",medium:"y MMM d HH:mm:ss",mediumDate:"y MMM d",mediumTime:"HH:mm:ss","short":"y-MM-dd HH:mm",shortDate:"y-MM-dd",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"€",DECIMAL_SEP:",",GROUP_SEP:" ",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"¤ -",negSuf:"",posPre:"¤ ",posSuf:""}]},id:"br-fr",pluralCat:function(e){return e%10==1&&e%100!=11&&e%100!=71&&e%100!=91?r.ONE:e%10==2&&e%100!=12&&e%100!=72&&e%100!=92?r.TWO:(e%10>=3&&4>=e%10||e%10==9)&&(10>e%100||e%100>19)&&(70>e%100||e%100>79)&&(90>e%100||e%100>99)?r.FEW:0!=e&&e%1e6==0?r.MANY:r.OTHER}})}]);
"use strict";angular.module("ngLocale",[],["$provide",function(h){var t={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};h.value("$locale",{DATETIME_FORMATS:{AMPMS:["SA","CH"],DAY:["Chủ Nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"],MONTH:["tháng 1","tháng 2","tháng 3","tháng 4","tháng 5","tháng 6","tháng 7","tháng 8","tháng 9","tháng 10","tháng 11","tháng 12"],SHORTDAY:["CN","Th 2","Th 3","Th 4","Th 5","Th 6","Th 7"],SHORTMONTH:["thg 1","thg 2","thg 3","thg 4","thg 5","thg 6","thg 7","thg 8","thg 9","thg 10","thg 11","thg 12"],fullDate:"EEEE, 'ngày' dd MMMM 'năm' y",longDate:"'Ngày' dd 'tháng' MM 'năm' y",medium:"dd-MM-y HH:mm:ss",mediumDate:"dd-MM-y",mediumTime:"HH:mm:ss","short":"dd/MM/y HH:mm",shortDate:"dd/MM/y",shortTime:"HH:mm"},NUMBER_FORMATS:{CURRENCY_SYM:"₫",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-",negSuf:" ¤",posPre:"",posSuf:" ¤"}]},id:"vi",pluralCat:function(){return t.OTHER}})}]);
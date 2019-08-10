# 基于egret框架省市选择组件
citySelector组件
省市选择
基于egret框架，引擎版本5.2.23

# 使用方法
demo见与main.ts
var citySelectorY=100;//组件纵坐标
var citySelector=new CitySelector(citySelectorY);
            
this.addChild(citySelector);

citySelector.confirm(function(province,city){
	//provice,city 为返回的结果，在此地方赋值
});
            
citySelector.hide(callback);


# 基于egret框架省市选择组件
citySelector组件
省市选择
基于egret框架，引擎版本5.2.23

## 使用方法
demo见与main.ts <br>

var citySelectorY=100;//组件纵坐标<br>
var citySelector=new CitySelector(citySelectorY);
  <br>          
this.addChild(citySelector);
<br>
citySelector.confirm(function(province,city){ <br>
	//provice,city 为返回的结果，在此地方赋值 <br>
});
<br>
citySelector.hide(callback);


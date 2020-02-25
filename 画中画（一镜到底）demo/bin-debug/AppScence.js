var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//
//  code by wqxWhale 2019/07 e-mail:844130791@qq.com
//
//////////////////////////////////////////////////////////////////////////////////////
var AppScene = (function (_super) {
    __extends(AppScene, _super);
    function AppScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppScene.createScene = function (gameLayer, topLayer, width, height) {
        AppScene.gameLayer = gameLayer;
        AppScene.topLayer = topLayer;
        AppScene.Width = width;
        AppScene.Height = height;
        //进入游戏页面
        var indexLayer = new IndexLayer();
    };
    AppScene.stepnum = 0;
    AppScene.settingPass = true;
    return AppScene;
}(BaseAppScene));
__reflect(AppScene.prototype, "AppScene");
//# sourceMappingURL=AppScence.js.map
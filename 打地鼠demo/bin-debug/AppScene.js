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
    AppScene.createScene = function (gameLayer, topLayer, width, height, baseData) {
        AppScene.gameLayer = gameLayer;
        AppScene.topLayer = topLayer;
        AppScene.Width = width;
        AppScene.Height = height;
        this.host = document.getElementById("host")["value"];
        //进入游戏页面
        var indexLayer = new IndexLayer(baseData);
        this.sound1 = AppScene.createMusic("sound1", "resource/music/beat.mp3", false, false);
        this.sound2 = AppScene.createMusic("sound2", "resource/music/mouse.mp3", false, false);
    };
    AppScene.addComponent = function (root, scoureName, text, x, y, textX, textY) {
        var component = Utils.Method.addSpriteInContainer(root, x, y);
        var bg = Utils.Method.addImageInContainer(component, scoureName, 0, 0);
        var comName = Utils.Method.addTextFieldInContainer(component, text, textX, textY, 18, 0xffffff);
        //comName.y=textY;
        component.x = component.x + component.width / 2;
        //component.y=Config.Layout.AdaptY(y);
        Utils.Method.setAnchor(component, 0.5);
        return component;
    };
    AppScene.stepnum = 0;
    AppScene.settingPass = true;
    return AppScene;
}(BaseAppScene));
__reflect(AppScene.prototype, "AppScene");
//# sourceMappingURL=AppScene.js.map
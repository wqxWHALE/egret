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
var Hammer = (function (_super) {
    __extends(Hammer, _super);
    function Hammer() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Hammer.prototype.init = function () {
        var root = this;
        root.width = Config.Layout.AdaptWidth(107);
        root.height = Config.Layout.AdaptHeight(139);
        root.hammer = Utils.Method.addImageInContainer(root, "hammer_png", 107, 139);
        Utils.Method.setAnchor(root.hammer, 1);
    };
    Hammer.prototype.beat = function () {
        var root = this;
        var status = document.getElementById("vibrateOnOff")["value"];
        if (status == "ON") {
            window["vibration"]();
        }
        else {
            AppScene.sound1.play();
        }
        egret.Tween.get(root.hammer)
            .to({ rotation: 45 }, 50, egret.Ease.quadIn)
            .to({ rotation: -45 }, 50, egret.Ease.quadIn)
            .to({ rotation: 0 }, 50, egret.Ease.quadIn);
    };
    return Hammer;
}(egret.Sprite));
__reflect(Hammer.prototype, "Hammer");
//# sourceMappingURL=Hammer.js.map
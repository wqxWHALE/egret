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
var Hole = (function (_super) {
    __extends(Hole, _super);
    function Hole() {
        var _this = _super.call(this) || this;
        _this.holeArr = ["hole01_png", "hole02_png"];
        _this.init();
        return _this;
    }
    Hole.prototype.init = function () {
        var root = this;
        var imgSourceName = root.holeArr[root.getRandomIndex(root.holeArr)];
        root.holeImg = Utils.Method.addImageInContainer(root, imgSourceName, 0, 0);
        root.scaleX = root.scaleY = 0;
    };
    Hole.prototype.showHole = function (i) {
        var root = this;
        //egret.Tween.get(root).wait(300*i).to({scaleX:1,scaleY:1},1000,egret.Ease.bounceInOut);
        egret.Tween.get(root).to({ scaleX: 1.1, scaleY: 1.1 }, 1000, egret.Ease.bounceInOut);
    };
    Hole.prototype.getRandomIndex = function (arr) {
        var index = Math.round(Math.random() * (arr.length - 1));
        return index;
    };
    return Hole;
}(egret.Sprite));
__reflect(Hole.prototype, "Hole");
//# sourceMappingURL=Hole.js.map
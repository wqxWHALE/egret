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
//此类用于解决视觉问题
var GopherCover = (function (_super) {
    __extends(GopherCover, _super);
    function GopherCover() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    GopherCover.prototype.init = function () {
        var root = this;
        root.width = Config.Layout.AdaptWidth(89);
        root.height = Config.Layout.AdaptHeight(92);
        Utils.Method.drawRectBySprite(root, 0x000000, 1, 0, 0, root.width, root.height);
        root.alpha = 0;
    };
    GopherCover.prototype.comeOut = function (y, offset) {
        var root = this;
        root.y = y + offset;
        egret.Tween.get(root).to({ scaleX: 1.1, scaleY: 1.1, y: y }, 100, egret.Ease.bounceInOut);
    };
    GopherCover.prototype.hide = function () {
        var root = this;
        if (root.parent) {
            root.parent.removeChild(root);
        }
    };
    return GopherCover;
}(egret.Sprite));
__reflect(GopherCover.prototype, "GopherCover");
//# sourceMappingURL=GopherCover.js.map
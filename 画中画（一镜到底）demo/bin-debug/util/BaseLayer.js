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
var BaseLayer = (function (_super) {
    __extends(BaseLayer, _super);
    function BaseLayer(parent, layerWidth, layerHeight) {
        if (parent === void 0) { parent = AppScene.gameLayer; }
        if (layerWidth === void 0) { layerWidth = AppScene.Width; }
        if (layerHeight === void 0) { layerHeight = AppScene.Height; }
        var _this = _super.call(this) || this;
        _this.width = layerWidth;
        _this.height = layerHeight;
        _this.parentContainer = parent;
        return _this;
    }
    /**设置背景图*/
    BaseLayer.prototype.setBgImage = function (sourceKey) {
        var bg = Utils.Method.createBitmapByName(sourceKey);
        bg.width = this.width;
        bg.height = this.height;
        bg.x = 0;
        bg.y = 0;
        this.addChildAt(bg, 0);
        return bg;
    };
    Object.defineProperty(BaseLayer.prototype, "parentContainer", {
        get: function () {
            return this._parentContainer;
        },
        set: function (value) {
            this._parentContainer = value;
            value.addChild(this);
        },
        enumerable: true,
        configurable: true
    });
    /**清空场景*/
    BaseLayer.prototype.clearScene = function () {
        egret.Tween.removeAllTweens();
        this.removeChildren();
        this.parentContainer.removeChild(this);
    };
    return BaseLayer;
}(egret.DisplayObjectContainer));
__reflect(BaseLayer.prototype, "BaseLayer");
//# sourceMappingURL=BaseLayer.js.map
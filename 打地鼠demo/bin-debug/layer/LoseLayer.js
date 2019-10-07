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
var LoseLayer = (function (_super) {
    __extends(LoseLayer, _super);
    function LoseLayer(proRoot, gameRoot, prizeName) {
        var _this = _super.call(this) || this;
        _this.proRoot = proRoot;
        _this.gameRoot = gameRoot;
        _this.prizeName = prizeName;
        _this.init();
        return _this;
    }
    LoseLayer.prototype.init = function () {
        var root = this;
        var bgCover = root.createContainer(0.5);
        root.addChild(bgCover);
        root.failBox = Utils.Method.addContainer(root, 320, 550, 524, 497);
        Utils.Method.setAnchor(root.failBox, 0.5);
        var winBg = Utils.Method.addImageInContainer(root.failBox, "loseBg_png", 0, 0);
        //    var closeBtn:egret.Bitmap=Utils.Method.addImageInContainer(root.successBox,"close_png",524,100);
        //    Utils.Method.setAnchor(closeBtn,1);
        var text = Utils.Method.addTextFieldInContainer(root.failBox, "对不起，您挑战失败 ！", 262, 200, 36, 0xffffff, true);
        Utils.Method.setAnchor(text, 0.5);
        text.strokeColor = 0x3a230a;
        text.stroke = 3;
        var coinPay = Utils.Method.addTextFieldInContainer(root.failBox, "花费游戏豆：0", 262, 300, 32, 0x2d2d2d, true);
        Utils.Method.setAnchorX(coinPay, 0.5);
        var restart = Utils.Method.addImageInContainer(root.failBox, "restart_png", 131, 420);
        Utils.Method.setAnchor(restart, 0.5);
        var back = Utils.Method.addImageInContainer(root.failBox, "back_png", 393, 420);
        Utils.Method.setAnchor(back, 0.5);
        restart.touchEnabled = true;
        restart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            root.clearLayer();
            root.gameRoot.clearLayer();
            //重新开始
            root.proRoot.repeatGame();
        }, root);
        back.touchEnabled = true;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            root.clearLayer();
            root.proRoot.touchEnabled = false;
            root.gameRoot.clearLayer();
            root.proRoot.addActivePart();
        }, root);
    };
    LoseLayer.prototype.clearLayer = function () {
        this.removeChildren();
        this.parentContainer.removeChild(this);
    };
    //创建透明层
    LoseLayer.prototype.createContainer = function (alpha) {
        if (alpha === void 0) { alpha = 0; }
        var container;
        container = new egret.Sprite();
        container.x = container.y = 0;
        container.width = this.width;
        container.height = this.height;
        container.graphics.beginFill(0x1F1F1F, alpha);
        container.graphics.drawRect(0, 0, this.width, this.height);
        container.graphics.endFill();
        container.touchEnabled = true;
        container.x = container.y = 0;
        container.width = this.width;
        container.height = this.height;
        return container;
    };
    return LoseLayer;
}(BaseLayer));
__reflect(LoseLayer.prototype, "LoseLayer", ["IBaseScene"]);
//# sourceMappingURL=LoseLayer.js.map
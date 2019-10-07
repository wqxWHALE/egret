//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  
//   code by wqxWhale 2019/07 e-mail:844130791@qq.com
//
//////////////////////////////////////////////////////////////////////////////////////
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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.loadingTipCount = 0;
        _this.loadingTipStr = "loading";
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        var root = this;
        var width = Config.Layout.StageWidth;
        var height = Config.Layout.StageHeight;
        root.width = width;
        root.height = height;
        root.x = 0;
        root.y = 0;
        var bg = Utils.Method.addShape(root, 0, 0, width, height, Utils.Enums.AdaptCoordinateType.NoAdapt, Utils.Enums.AdaptSizeType.NoAdapt);
        Utils.Method.drawRectByShape(bg, 0x63b829);
        root.loadBarWidth = 550;
        root.bar = Utils.Method.addSprite(root, 320, 480, root.loadBarWidth + 20, 50);
        Utils.Method.setAnchorX(root.bar, 0.5);
        Utils.Method.drawRoundRectBySprite(root.bar, 0xffffff, 1, 50);
        root.bright = Utils.Method.addSpriteInContainer(root.bar, 10, 10, 0, 30);
        //Utils.Method.drawRoundRectBySprite(root.bright, 0x2aadfc, 1, 30);
        Utils.Method.drawRoundRectBySprite(root.bright, 0xf46b14, 1, 30);
        //root.maskRect = new egret.Rectangle(0, 0, root.loadBarWidth, 30);
        //root.bright.mask = root.maskRect;
        var percentText = root.percentText = Utils.Method.addTextField(root, "0%", 320, 550, 22, 0xffffff);
        percentText.width = Config.Layout.AdaptWidth(100);
        Utils.Method.setAnchorX(percentText, 0.5);
        percentText.textAlign = "center";
        this.loadingTipTimer = new egret.Timer(300);
        this.loadingTipTimer.addEventListener(egret.TimerEvent.TIMER, this.loadingTipAnimation, this);
        this.loadingTip = Utils.Method.addTextField(root, this.loadingTipStr, 320, 0, 26, 0xffffff);
        this.loadingTip.fontFamily = "微软雅黑";
        this.loadingTip.textAlign = "center";
        this.loadingTip.width = Config.Layout.AdaptWidth(500);
        this.loadingTip.lineSpacing = Config.Layout.AdaptHeight(15);
        Utils.Method.setAnchorX(this.loadingTip, 0.5);
        this.loadingTip.y = percentText.y + percentText.height + Config.Layout.AdaptHeight(20);
        this.loadingTipTimer.start();
    };
    LoadingUI.prototype.loadingTipAnimation = function (event) {
        var str = this.loadingTipStr;
        var remainder = this.loadingTipCount % 3;
        if (remainder == 0) {
            str += ".";
        }
        else if (remainder == 1) {
            str += "..";
        }
        else {
            str += "...";
        }
        this.loadingTip.text = str;
        this.loadingTipCount++;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        //this.textField.text = `Loading...${current}/${total}`;
        var percent = Math.floor(current / total * 100);
        this.percentText.text = percent + "%";
        var per = current / total; //加载的比例
        this.bright.width = Config.Layout.AdaptWidth(percent * 0.01 * this.loadBarWidth);
        Utils.Method.drawRoundRectBySprite(this.bright, 0xf46b14, 1, 30);
        //this.maskRect = new egret.Rectangle(0, 0, per * this.loadBarWidth, 30);//计算遮罩的大小
        //this.bright.mask = this.maskRect;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map
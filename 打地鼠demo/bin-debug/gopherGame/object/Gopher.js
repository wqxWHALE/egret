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
var Gopher = (function (_super) {
    __extends(Gopher, _super);
    function Gopher() {
        var _this = _super.call(this) || this;
        _this.gopherArr = ["gopherShow01_png", "gopherShow02_png"];
        _this.gopherBeatenArr = ["gopherClick01_png", "gopherClick02_png"];
        _this.gopherIsHidingBeaten = false;
        _this.init();
        return _this;
    }
    Gopher.prototype.init = function () {
        var root = this;
        root.width = Config.Layout.AdaptWidth(89);
        root.height = Config.Layout.AdaptHeight(92);
        var imgSourceName = root.gopherArr[root.getRandomIndex(root.gopherArr)];
        root.gopherImg = Utils.Method.addImageInContainer(root, imgSourceName, 0, 0);
    };
    Gopher.prototype.getRandomIndex = function (arr) {
        var index = Math.round(Math.random() * (arr.length - 1));
        return index;
    };
    Gopher.prototype.beaten = function (y, offset, callback) {
        var root = this;
        //root.gopherIsHidingBeaten=true;
        egret.Tween.removeTweens(root);
        root.alpha = 1;
        //root.y=y;
        egret.Tween.get(root).to({ scaleX: 1.1, scaleY: 1.1, y: y }, 80, egret.Ease.bounceInOut).call(function () {
            var imgSourceName = root.gopherBeatenArr[root.getRandomIndex(root.gopherBeatenArr)];
            var texture = RES.getRes(imgSourceName);
            root.gopherImg.texture = texture;
            root.scaleX = root.scaleY = 1.2;
            AppScene.sound2.play();
            //root.gopherImg.anchorOffsetX=root.gopherImg.width/2;
            // root.gopherImg.anchorOffsetY=root.gopherImg.height;
            //console.log("状态改变了");
            setTimeout(function () {
                //root.gopherIsHidingBeaten=false;
                root.hide(y, offset, callback);
            }, 800);
        });
    };
    Gopher.prototype.comeOut = function (y, offset) {
        var root = this;
        root.y = y + offset;
        root.alpha = 1;
        egret.Tween.get(root).to({ scaleX: 1.1, scaleY: 1.1, y: y }, 100, egret.Ease.bounceInOut);
    };
    Gopher.prototype.hide = function (y, offset, callback) {
        var root = this;
        egret.Tween.get(root).to({ scaleX: 0, scaleY: 0, y: y + offset }, 50, egret.Ease.bounceInOut).call(function () {
            root.alpha = 0;
            callback && callback();
        });
        // var hiding=setInterval(function(){
        //     if(root.gopherIsHidingBeaten){
        //         clearInterval(hiding);
        //     }
        //     if(root.y>=root.y+offset){
        //         clearInterval(hiding);
        //         callback && callback();
        //     }else{
        //         root.y+=2;
        //     }
        // },1);
    };
    Gopher.prototype.remove = function () {
        var root = this;
        if (root.parent) {
            root.parent.removeChild(root);
        }
    };
    return Gopher;
}(egret.Sprite));
__reflect(Gopher.prototype, "Gopher");
//# sourceMappingURL=Gopher.js.map
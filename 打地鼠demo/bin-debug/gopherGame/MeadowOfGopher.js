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
var MeadowOfGopher = (function (_super) {
    __extends(MeadowOfGopher, _super);
    function MeadowOfGopher(parentObj, hammer, playTime, allowMissTimes, proRoot) {
        var _this = _super.call(this) || this;
        _this.gopherShowTime = 2000;
        _this.gophercreateTime = 2000;
        _this.holeCenterLocationArr = [];
        _this.holeArr = [];
        _this.gopherMaskArr = [];
        _this.lastGopherLocIndex = -1;
        _this.lastRandomX = -1;
        _this.parentObj = parentObj;
        _this.hammer = hammer;
        _this.playTime = playTime;
        _this.allowMissTimes = allowMissTimes;
        _this.gopherShowTime = parentObj.gopherShowTime;
        _this.gophercreateTime = parentObj.gophercreateTime;
        //console.log(this.gopherShowTime);
        _this.proRoot = proRoot;
        _this.init();
        return _this;
    }
    MeadowOfGopher.prototype.init = function () {
        var root = this;
        for (var i = 0; i < 8; i++) {
            var row = root.createRow(i * 65);
            var hole = root.createHole();
            root.holeArr.push(hole);
            row.addChild(hole);
            root.addChild(row);
            hole.x = Config.Layout.AdaptX(root.getRandomX()) + hole.width / 2;
            hole.y += hole.height / 2;
            Utils.Method.setAnchor(hole, 0.5);
            var locTemp = new Array();
            locTemp.push(hole.x);
            // console.log("hole.x:"+hole.x);
            locTemp.push(row.y);
            locTemp.push(0);
            root.holeCenterLocationArr.push(locTemp);
            hole.showHole(i);
        }
    };
    MeadowOfGopher.prototype.gopherStartShow = function () {
        var root = this;
        //地洞随机产生地鼠
        var showfail = true;
        root.gopherShowFunction = setInterval(function () {
            var gopherArr = root.creatGopher();
            var gopher = gopherArr[0];
            var index = gopherArr[1];
            var gopherCover = root.createGopherCover(index);
            gopher.scaleX = gopher.scaleY = 0.4;
            gopherCover.scaleX = gopherCover.scaleY = 0.4;
            root.addChild(gopher);
            root.addChild(gopherCover);
            root.holeCenterLocationArr[index][2] = 1;
            //设置遮罩
            var gopherMask = new egret.Shape();
            gopherMask.graphics.beginFill(0x0000ff);
            gopherMask.graphics.drawRect(gopher.x - gopher.width / 2, gopher.y - gopher.height - 10, gopher.width, gopher.height + 10);
            gopherMask.graphics.endFill();
            root.addChild(gopherMask);
            gopher.mask = gopherMask;
            gopher.comeOut(gopher.y, 50);
            gopherCover.comeOut(gopherCover.y, 50);
            //没有敲击地鼠处理函数
            var notHit = setTimeout(function () {
                setTimeout(function () {
                    root.holeCenterLocationArr[index][2] = 0;
                }, 1000);
                gopher.hide(gopher.y, 50, function () {
                    setTimeout(function () {
                        gopherCover.hide();
                        gopher.remove();
                        if (gopherMask.parent) {
                            gopherMask.parent.removeChild(gopherMask);
                        }
                        root.parentObj.userMissTimes++;
                        if (!root.parentObj.warnTimeIsAdd) {
                            root.parentObj.warnTimeIsAdd = true;
                            root.parentObj.warnTimeIsEnd = false;
                            root.parentObj.addWarnTimePart(root.parentObj.countDownWidth);
                            root.parentObj.warnTimeIsStart = true;
                        }
                    }, 60);
                });
            }, root.gopherShowTime);
            root.monitor(gopherCover, gopher, notHit, index, function () {
                setTimeout(function () {
                    root.holeCenterLocationArr[index][2] = 0;
                }, 1000);
                if (gopherMask.parent) {
                    gopherMask.parent.removeChild(gopherMask);
                }
            });
        }, root.gophercreateTime);
    };
    MeadowOfGopher.prototype.gopherEndShow = function () {
        var root = this;
        clearInterval(root.gopherShowFunction);
    };
    //判断是否打中
    MeadowOfGopher.prototype.monitor = function (gopherCover, gopher, notHitFunc, gopherIndex, callback) {
        var root = this;
        root.touchEnabled = true;
        root.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var touchX = e.stageX;
            var touchY = e.stageY;
            root.hammer.x = touchX + 10;
            root.hammer.y = touchY - Config.Layout.AdaptHeight(60);
            root.hammer.beat();
            var isHit = gopherCover.hitTestPoint(touchX, touchY);
            if (isHit) {
                //console.log("打中了");
                gopherCover.hide();
                root.parentObj.warnTimeIsEnd = true;
                root.parentObj.warnTimeIsAdd = false;
                //取消setTimeout
                clearTimeout(notHitFunc);
                root.parentObj.addSuccessHitTimes();
                egret.Tween.removeTweens(gopher);
                gopher.beaten(root.holeCenterLocationArr[gopherIndex][1] + Config.Layout.AdaptHeight(45), 50, callback);
            }
        }, gopher);
    };
    MeadowOfGopher.prototype.creatGopher = function () {
        var root = this;
        var index = root.getRandomIndex(root.holeArr);
        var gopher = new Gopher();
        //console.log(root.holeCenterLocationArr[index][0]+","+root.holeCenterLocationArr[index][1]);
        gopher.x = root.holeCenterLocationArr[index][0] + Config.Layout.AdaptWidth(12);
        gopher.y = root.holeCenterLocationArr[index][1] + Config.Layout.AdaptHeight(45);
        Utils.Method.setAnchorY(gopher, 1);
        Utils.Method.setAnchorX(gopher, 0.5);
        root.lastGopherLocIndex = index;
        return [gopher, index];
    };
    MeadowOfGopher.prototype.createGopherCover = function (index) {
        var root = this;
        var gopherCover = new GopherCover();
        gopherCover.x = root.holeCenterLocationArr[index][0] + Config.Layout.AdaptWidth(12);
        gopherCover.y = root.holeCenterLocationArr[index][1] + Config.Layout.AdaptHeight(45);
        Utils.Method.setAnchorY(gopherCover, 1);
        Utils.Method.setAnchorX(gopherCover, 0.5);
        return gopherCover;
    };
    MeadowOfGopher.prototype.createRow = function (RowY) {
        var root = this;
        var row = Utils.Method.addContainerInContainer(root, 0, RowY, 640, 65);
        row.width = root.width;
        return row;
    };
    MeadowOfGopher.prototype.createHole = function () {
        var root = this;
        var hole = new Hole();
        return hole;
    };
    MeadowOfGopher.prototype.getRandomX = function () {
        var root = this;
        var randomX = 0;
        var v = 170;
        var stageWidth = root.stage.stageWidth;
        if (root.lastRandomX == -1) {
            randomX = Math.round(Math.random() * (stageWidth - 250));
            root.lastRandomX = randomX;
        }
        else {
            var isStandard = 1;
            while (isStandard) {
                randomX = Math.round(Math.random() * (stageWidth - 250));
                if ((randomX > root.lastRandomX + v
                    ||
                        randomX < root.lastRandomX - v)
                    &&
                        randomX > 0 && randomX <= (stageWidth - 250)) {
                    isStandard = 0;
                }
            }
            root.lastRandomX = randomX;
        }
        return randomX;
    };
    MeadowOfGopher.prototype.getRandomIndex = function (arr) {
        var index = Math.round(Math.random() * (arr.length - 1));
        return this.checkIndex(index);
    };
    //检查位置是否重复
    MeadowOfGopher.prototype.checkIndex = function (index) {
        var root = this;
        if (root.lastGopherLocIndex == index || root.holeCenterLocationArr[index][2] == 1) {
            index = root.getRandomIndex(root.holeArr);
            return root.checkIndex(index);
        }
        else {
            return index;
        }
    };
    return MeadowOfGopher;
}(BaseLayer));
__reflect(MeadowOfGopher.prototype, "MeadowOfGopher", ["IBaseScene"]);
//# sourceMappingURL=MeadowOfGopher.js.map
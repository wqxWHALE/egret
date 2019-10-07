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
var MusicUI = (function (_super) {
    __extends(MusicUI, _super);
    /**背景音乐播放按钮*/
    function MusicUI(parent, x, y) {
        var _this = _super.call(this) || this;
        _this.isHtmlAudio = false;
        parent.addChild(_this);
        _this.parentContainer = parent;
        _this.createView(x, y);
        return _this;
    }
    MusicUI.prototype.setHtmlAudio = function (elementID, src, isBuild) {
        if (isBuild === void 0) { isBuild = true; }
        if (isBuild) {
            this.htmlAudio = document.createElement("audio");
            this.htmlAudio.volume = 0.7;
            document.getElementsByTagName("body")[0].appendChild(this.htmlAudio);
            this.htmlAudio.id = elementID;
            this.htmlAudio.style.display = "none";
        }
        else {
            this.htmlAudio = document.getElementById(elementID);
        }
        if (src.length != 0) {
            this.htmlAudio.src = src;
        }
        this.isHtmlAudio = true;
    };
    MusicUI.prototype.createView = function (x, y) {
        this.button = new egret.Bitmap(RES.getRes("music_png"));
        this.addChild(this.button);
        this.button.x = 0;
        this.button.y = 0;
        this.button.anchorOffsetX = this.button.width / 2;
        this.button.anchorOffsetY = this.button.height / 2;
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleClick, this);
        this.x = x ? x : this.parentContainer.width - this.button.width - 20;
        //this.x = this.button.width / 2 + 80
        this.y = y ? y : this.button.height / 2 + 20;
        this.isStop = true;
    };
    /**模拟点击切换音乐播放或暂停*/
    MusicUI.prototype.toggleClick = function () {
        this.PlayOrStop();
    };
    /**音乐播放或暂停*/
    MusicUI.prototype.PlayOrStop = function () {
        if (this.isStop) {
            this.buttonAnimate();
            this.isStop = false;
            if (this.isHtmlAudio) {
                this.htmlAudio.loop = true;
                this.htmlAudio.play();
            }
            else {
                throw new Error("还没有设置背景音乐源文件，请调用setHtmlAudio方法完成设置");
            }
        }
        else {
            egret.Tween.removeTweens(this.button);
            this.button.rotation = 0;
            this.isStop = true;
            if (this.isHtmlAudio) {
                this.htmlAudio.pause();
            }
            else {
                throw new Error("还没有设置背景音乐源文件，请调用setHtmlAudio方法完成设置");
            }
        }
    };
    /**暂停*/
    MusicUI.prototype.pause = function () {
        if (!this.isStop) {
            egret.Tween.removeTweens(this.button);
            this.button.rotation = 0;
            this.isStop = true;
            if (this.isHtmlAudio) {
                this.htmlAudio.pause();
            }
            else {
                throw new Error("还没有设置背景音乐源文件，请调用setHtmlAudio方法完成设置");
            }
        }
    };
    /**播放*/
    MusicUI.prototype.play = function () {
        if (this.isStop) {
            this.buttonAnimate();
            this.isStop = false;
            if (this.isHtmlAudio) {
                this.htmlAudio.loop = true;
                this.htmlAudio.play();
            }
            else {
                throw new Error("还没有设置背景音乐源文件，请调用setHtmlAudio方法完成设置");
            }
        }
    };
    MusicUI.prototype.buttonAnimate = function () {
        egret.Tween.get(this.button).to({ rotation: 360 }, 2000).call(this.buttonAnimate, this, [360]);
    };
    /**继续执行MusicUI动画*/
    MusicUI.prototype.resumeAnimate = function () {
        if (!this.isStop) {
            egret.Tween.get(this.button).to({ rotation: 360 }, 2000).call(this.resumeAnimate, this);
        }
    };
    return MusicUI;
}(egret.DisplayObjectContainer));
__reflect(MusicUI.prototype, "MusicUI");
//# sourceMappingURL=MusicUI.js.map
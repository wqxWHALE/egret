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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var IndexLayer = (function (_super) {
    __extends(IndexLayer, _super);
    function IndexLayer(baseData) {
        var _this = _super.call(this) || this;
        _this.mockIndex = 0;
        _this.stepnum = 0;
        _this.baseData = baseData;
        _this.currentPointID = baseData.checkPointID;
        //this.currentGameCoin=baseData.gameCoin;
        _this.checkPointTime = baseData.checkPointTime;
        _this.gohgerShowTime = baseData.gohgerShowTime;
        _this.gohgerSpaceTime = baseData.spaceTime;
        _this.failTime = baseData.failTime;
        _this.init();
        return _this;
    }
    IndexLayer.prototype.init = function () {
        var root = this;
        root.userID = document.getElementById("myID")["value"];
        root.setBgImage("bg1_jpg");
        var cloud = Utils.Method.addImage(root, "bgCloud_png", 320, 340);
        cloud.width = root.width * 0.4;
        var cloudX = cloud.x;
        Utils.Animation.breathe(cloud, 0.9, 1, 3000);
        egret.Tween.get(cloud, { loop: true }).to({ x: cloudX - 5 }, 2000).to({ x: cloudX + 5 }, 2000).to({ x: cloudX }, 2000);
        Utils.Method.setAnchorX(cloud, 0.5);
        Utils.Method.setAnchorY(cloud, 1);
        var meadowBg = Utils.Method.createBitmapByName("bg2_png");
        meadowBg.width = this.width;
        meadowBg.height = this.height;
        meadowBg.x = 0;
        meadowBg.y = 0;
        this.addChild(meadowBg);
        //标题
        var titleTop = Utils.Method.addImage(root, "titleBg_png", 320, 20);
        titleTop.anchorOffsetX = titleTop.width / 2;
        titleTop.y = 20;
        var titleBox = Utils.Method.addSprite(root, 320, 35);
        titleBox.y = 35;
        var title = Utils.Method.addImageInContainer(titleBox, "title_png", 0, 0);
        var titleText = root.titleText = Utils.Method.addTextFieldInContainer(titleBox, "第" + root.baseData.checkPointLevel + "关", 0, 65, 28);
        titleText.width = title.width;
        titleText.textColor = 0xffffff;
        titleText.textAlign = egret.HorizontalAlign.CENTER;
        titleText.strokeColor = 0xf14107;
        titleText.stroke = 2;
        titleBox.anchorOffsetX = title.width / 2;
        titleBox.scaleX = titleBox.scaleY = 0;
        titleTop.scaleX = titleTop.scaleY = 0;
        egret.Tween.get(titleTop).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.bounceInOut);
        egret.Tween.get(titleBox).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.bounceInOut);
        var topBtnContainer = root.topBtnContainer = Utils.Method.addContainer(root, 320, 0, 640);
        var levelShow = root.levelShow = AppScene.addComponent(topBtnContainer, "levelBg_png", "等级" + root.baseData.userLevel, 20, 90, 45, 12);
        var settingBtn = AppScene.addComponent(topBtnContainer, "settingBg_png", "设置", 530, 90, 8, 17);
        levelShow.scaleX = levelShow.scaleY = 0;
        settingBtn.scaleX = settingBtn.scaleY = 0;
        Utils.Method.setAnchorX(topBtnContainer, 0.5);
        egret.Tween.get(levelShow).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.bounceInOut);
        egret.Tween.get(settingBtn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.bounceInOut);
        settingBtn.touchEnabled = true;
        settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            e.stopImmediatePropagation();
            window["showVoiceSetting"]();
        }, root);
        root.addActivePart();
    };
    //WinLayer 调用
    IndexLayer.prototype.loadNextData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var root, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        root = this;
                        root.mockIndex++;
                        _a = root;
                        return [4 /*yield*/, root.getNextData()];
                    case 1:
                        _a.baseData = _b.sent();
                        root.currentPointID = root.baseData.checkPointID;
                        this.checkPointTime = root.baseData.checkPointTime;
                        this.gohgerShowTime = root.baseData.gohgerShowTime;
                        this.gohgerSpaceTime = root.baseData.spaceTime;
                        this.failTime = root.baseData.failTime;
                        //console.log("下一关："+root.baseData);
                        root.updateUserLevel(root.baseData.userLevel);
                        root.titleText.text = "第" + root.baseData.checkPointLevel + "关";
                        //root.addActivePart();
                        new GameLayer(root);
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexLayer.prototype.repeatGame = function () {
        new GameLayer(this);
    };
    IndexLayer.prototype.addActivePart = function () {
        var root = this;
        new GameLayer(root);
    };
    //获取下一关游戏数据
    IndexLayer.prototype.getNextData = function () {
        var root = this;
        window["loadingCover"]("show");
        return new Promise(function (resolve, reject) {
            window["loadingCover"]("hide");
            Utils.Method.readTextFile("mock/data.json", function (text) {
                var data = typeof text == "string" ? JSON.parse(text) : text;
                resolve(data.gameData[root.mockIndex]);
            });
        });
    };
    IndexLayer.prototype.showTip = function (message) {
        window["showTip"](message);
    };
    //更新用户等级
    IndexLayer.prototype.updateUserLevel = function (userLevel) {
        var root = this;
        if (root.levelShow.parent) {
            root.topBtnContainer.removeChild(root.levelShow);
        }
        root.levelShow = AppScene.addComponent(root.topBtnContainer, "levelBg_png", "等级" + userLevel, 20, 105, 45, 12);
    };
    return IndexLayer;
}(BaseLayer));
__reflect(IndexLayer.prototype, "IndexLayer", ["IBaseScene"]);
//# sourceMappingURL=IndexLayer.js.map
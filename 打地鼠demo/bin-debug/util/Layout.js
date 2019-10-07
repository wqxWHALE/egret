var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    /**布局组件
    *
    * update by wqxWhale on 2019-07-20
    */
    var Layout = (function () {
        function Layout() {
        }
        Object.defineProperty(Layout, "WidthPercent", {
            ///标准尺寸与舞台尺寸比例（非百分比）
            /**标准宽度尺寸与舞台宽度尺寸比例（非百分比）：舞台宽度除以标准宽度*/
            get: function () {
                if (Layout.StageHeight < Layout.DesignHegiht) {
                    return Layout.StageHeight / Layout.DesignHegiht;
                }
                else if (Layout.StageHeight > Layout.DesignHegiht) {
                    return 1;
                }
                return Layout.StageWidth / Layout.DesignWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout, "HeightPercent", {
            /**标准高度尺寸与舞台高度尺寸比例（非百分比）：舞台高度除以标准高度*/
            get: function () {
                if (Layout.StageHeight < Layout.DesignHegiht) {
                    return Layout.StageHeight / Layout.DesignHegiht;
                }
                else {
                    if (Layout.IsStretch) {
                        return Layout.StageHeight / Layout.DesignHegiht;
                    }
                    else {
                        return 1;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**设置宽度适配距离*/
        Layout.AdaptWidth = function (w) {
            return w * Layout.WidthPercent;
        };
        /**设置高度适配距离*/
        Layout.AdaptHeight = function (h) {
            return h * Layout.HeightPercent;
        };
        /**设置x轴适配位置，用于相对与舞台的对象适配*/
        Layout.AdaptX = function (oX) {
            if (Layout.StageHeight < Layout.DesignHegiht) {
                return oX * Layout.WidthPercent + Layout.StageWidth * (1 - Layout.WidthPercent) / 2;
            }
            else {
                return oX;
            }
        };
        /**设置y轴适配位置，用于相对与舞台的对象适配*/
        Layout.AdaptY = function (oY) {
            if (Layout.StageHeight > Layout.DesignHegiht && !Layout.IsStretch) {
                return oY * Layout.HeightPercent + (Layout.StageHeight - Layout.DesignHegiht) / 2;
            }
            else {
                return oY * Layout.HeightPercent;
            }
        };
        /**设置宽度适配位置，用于相对与容器的对象适配*/
        Layout.AdaptXInContainer = function (w) {
            return w * Layout.WidthPercent;
        };
        /**设置y轴适配位置，用于相对与容器的对象适配*/
        Layout.AdaptYInContainer = function (oY) {
            return oY * Layout.HeightPercent;
        };
        /**设置字体大小适配*/
        Layout.AdaptFontSize = function (size) {
            return size * Layout.HeightPercent;
        };
        Object.defineProperty(Layout, "StageWidth", {
            /**获取舞台宽度*/
            get: function () {
                if (!Layout._stageWidth)
                    Layout._stageWidth = egret.MainContext.instance.stage.stageWidth;
                return Layout._stageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout, "StageHeight", {
            /**获取舞台高度*/
            get: function () {
                if (!Layout._stageHeight)
                    Layout._stageHeight = egret.MainContext.instance.stage.stageHeight;
                return Layout._stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        //-----------------------------------------全局配置
        ///屏幕的标准尺寸
        /**屏幕的标准宽度*/
        Layout.DesignWidth = 640;
        /**屏幕的标准高度*/
        Layout.DesignHegiht = 1138;
        /**当舞台长度大于DesignHegiht(屏幕标准高度)时，高度和Y轴是否相应拉伸，默认为true*/
        Layout.IsStretch = false;
        return Layout;
    }());
    Config.Layout = Layout;
    __reflect(Layout.prototype, "Config.Layout");
})(Config || (Config = {}));
//# sourceMappingURL=Layout.js.map
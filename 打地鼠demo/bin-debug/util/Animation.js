var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils;
(function (Utils) {
    /**
    静态动画类库
    */
    var Animation = (function () {
        function Animation() {
        }
        /**获取对象的egret.Tween对象*/
        Animation.getTween = function (obj, override) {
            if (override === void 0) { override = false; }
            return egret.Tween.get(obj, undefined, undefined, override);
        };
        /**动画执行完毕后回调函数*/
        Animation.call = function (tw, callback, thisObj, params) {
            return tw.call(callback, thisObj, params);
        };
        /**动画执行完毕后回调函数*/
        Animation.to = function (obj, props, duration, ease) {
            return Animation.getTween(obj).to(props, duration, ease);
        };
        /**对象旋转动画*/
        Animation.rotate = function (obj, rotation, duration, delay, ease, callback, thisObj, params) {
            if (rotation === void 0) { rotation = 360; }
            if (duration === void 0) { duration = 1000; }
            if (delay === void 0) { delay = 0; }
            var tw = Animation.getTween(obj);
            if (delay > 0) {
                tw.wait(delay);
            }
            tw.to({ rotation: rotation }, duration, ease);
            if (callback) {
                tw.call(callback, thisObj, params);
            }
            return tw;
        };
        /**对象旋转动画(反复循环)*/
        Animation.rotating = function (obj, rotation, duration, delay, pause, ease) {
            if (rotation === void 0) { rotation = 360; }
            if (duration === void 0) { duration = 1000; }
            if (delay === void 0) { delay = 0; }
            if (pause === void 0) { pause = 0; }
            var tw = Animation.getTween(obj);
            if (delay > 0) {
                tw.wait(delay);
            }
            tw.to({ rotation: obj.rotation + rotation }, duration, ease);
            if (pause > 0) {
                tw.wait(pause);
            }
            tw.call(Animation.rotating, null, [obj, rotation, duration, 0, pause, ease]);
            return tw;
        };
        /**呼吸（缩放）动画，使用该方法的时候，请注意设置对象的anchorX、anchorY属性*/
        Animation.breathe = function (obj, scale1, scale2, duration, delay, ease) {
            if (scale1 === void 0) { scale1 = 0.9; }
            if (scale2 === void 0) { scale2 = 1; }
            if (duration === void 0) { duration = 1000; }
            if (delay === void 0) { delay = 0; }
            var tw = Animation.getTween(obj);
            if (delay > 0) {
                tw.wait(delay);
            }
            tw.to({ scaleX: scale1, scaleY: scale1 }, duration, ease).to({ scaleX: scale2, scaleY: scale2 }, duration, ease);
            tw.call(Animation.breathe, Animation, [obj, scale1, scale2, duration, 0, ease]);
            return tw;
        };
        return Animation;
    }());
    Utils.Animation = Animation;
    __reflect(Animation.prototype, "Utils.Animation");
})(Utils || (Utils = {}));
//# sourceMappingURL=Animation.js.map
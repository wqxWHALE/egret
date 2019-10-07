module Utils {
    /**
    静态动画类库
    */
    export class Animation {
        /**获取对象的egret.Tween对象*/
        public static getTween(obj: egret.DisplayObject, override: boolean = false) {
            return egret.Tween.get(obj, undefined, undefined, override);
        }

        /**动画执行完毕后回调函数*/
        public static call(tw: egret.Tween, callback: Function, thisObj?: any, params?: any[]) {
            return tw.call(callback, thisObj, params);
        }

        /**动画执行完毕后回调函数*/
        public static to(obj: egret.DisplayObject, props: any, duration: number, ease?: Function) {
            return Animation.getTween(obj).to(props, duration, ease);
        }


    
        /**对象旋转动画*/
        public static rotate(obj: egret.DisplayObject, rotation: number = 360, duration: number = 1000, delay: number = 0, ease?: Function, callback?: Function, thisObj?: any, params?: any[]) {
            var tw = Animation.getTween(obj);
            if (delay > 0) {
                tw.wait(delay);
            }
            tw.to({ rotation: rotation }, duration, ease);
            if (callback) {
                tw.call(callback, thisObj, params);
            }
            return tw;
        }
        /**对象旋转动画(反复循环)*/
        public static rotating(obj: egret.DisplayObject, rotation: number = 360, duration: number = 1000, delay: number = 0, pause: number = 0, ease?: Function) {
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
        }



        /**呼吸（缩放）动画，使用该方法的时候，请注意设置对象的anchorX、anchorY属性*/
        public static breathe(obj: egret.DisplayObject, scale1: number = 0.9, scale2: number = 1, duration: number = 1000, delay: number = 0, ease?: Function) {
            var tw = Animation.getTween(obj);
            if (delay > 0) {
                tw.wait(delay);
            }
            tw.to({ scaleX: scale1, scaleY: scale1 }, duration, ease).to({ scaleX: scale2, scaleY: scale2 }, duration, ease);
            tw.call(Animation.breathe, Animation, [obj, scale1, scale2, duration, 0, ease]);
            return tw;
        }


    }
}
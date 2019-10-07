module Config {
    /**布局组件
    * 
    * update by wqxWhale on 2019-07-20
    */
    export class Layout {
        //-----------------------------------------全局配置
        ///屏幕的标准尺寸
        /**屏幕的标准宽度*/
        public static DesignWidth: number = 640; 
        /**屏幕的标准高度*/
        public static DesignHegiht: number = 1138; 
        
        /**当舞台长度大于DesignHegiht(屏幕标准高度)时，高度和Y轴是否相应拉伸，默认为true*/
        public static IsStretch: boolean = false;

        ///标准尺寸与舞台尺寸比例（非百分比）
        /**标准宽度尺寸与舞台宽度尺寸比例（非百分比）：舞台宽度除以标准宽度*/
        public static get WidthPercent(): number {
            if (Layout.StageHeight < Layout.DesignHegiht) { return Layout.StageHeight / Layout.DesignHegiht; }
            else if (Layout.StageHeight > Layout.DesignHegiht) {
                return 1;
            }
            return Layout.StageWidth / Layout.DesignWidth;
        }
        /**标准高度尺寸与舞台高度尺寸比例（非百分比）：舞台高度除以标准高度*/
        public static get HeightPercent(): number {
            if (Layout.StageHeight < Layout.DesignHegiht) { return Layout.StageHeight / Layout.DesignHegiht; }
            else {
                if (Layout.IsStretch) {
                    return Layout.StageHeight / Layout.DesignHegiht;
                }
                else {
                    return 1;
                }
            }
        }
        
        /**设置宽度适配距离*/
        public static AdaptWidth(w: number) {
            return w * Layout.WidthPercent;
        }

        /**设置高度适配距离*/
        public static AdaptHeight(h: number) {
            return h * Layout.HeightPercent;
        }

        /**设置x轴适配位置，用于相对与舞台的对象适配*/
        public static AdaptX(oX: number) {
            if (Layout.StageHeight < Layout.DesignHegiht) {
                return oX * Layout.WidthPercent + Layout.StageWidth * (1 - Layout.WidthPercent) / 2;
            } else {
                return oX;
            }
        }

        /**设置y轴适配位置，用于相对与舞台的对象适配*/
        public static AdaptY(oY: number) {
            if (Layout.StageHeight > Layout.DesignHegiht && !Layout.IsStretch) {
                return oY * Layout.HeightPercent + (Layout.StageHeight - Layout.DesignHegiht) / 2;
            } else {
                return oY * Layout.HeightPercent;
            }
        }

        /**设置宽度适配位置，用于相对与容器的对象适配*/
        public static AdaptXInContainer(w: number) {
            return w * Layout.WidthPercent;
        }

        /**设置y轴适配位置，用于相对与容器的对象适配*/
        public static AdaptYInContainer(oY: number) {
            return oY * Layout.HeightPercent;
        }

        /**设置字体大小适配*/
        public static AdaptFontSize(size: number) {
            return size * Layout.HeightPercent;
        }

        private static _stageWidth: number;
        /**获取舞台宽度*/
        public static get StageWidth(): number {
            if (!Layout._stageWidth)
                Layout._stageWidth = egret.MainContext.instance.stage.stageWidth;
            return Layout._stageWidth;
        }

        private static _stageHeight: number;
        /**获取舞台高度*/
        public static get StageHeight(): number {
            if (!Layout._stageHeight)
                Layout._stageHeight = egret.MainContext.instance.stage.stageHeight;
            return Layout._stageHeight;
        }

    }
}
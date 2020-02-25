var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils;
(function (Utils) {
    /**枚举类模块，采用静态字段方式实现*/
    var Enums;
    (function (Enums) {
        var EnumsExample1 = (function () {
            function EnumsExample1() {
            }
            EnumsExample1.Enum1 = "1";
            EnumsExample1.Enum2 = "2";
            return EnumsExample1;
        }());
        Enums.EnumsExample1 = EnumsExample1;
        __reflect(EnumsExample1.prototype, "Utils.Enums.EnumsExample1");
        var EnumsExample2 = (function () {
            function EnumsExample2() {
            }
            EnumsExample2.Enum1 = 1;
            EnumsExample2.Enum2 = 2;
            return EnumsExample2;
        }());
        Enums.EnumsExample2 = EnumsExample2;
        __reflect(EnumsExample2.prototype, "Utils.Enums.EnumsExample2");
        /**坐标自动适配方式，使用该类可以选择处理坐标适配的方式*/
        var AdaptCoordinateType = (function () {
            function AdaptCoordinateType() {
            }
            /**适配舞台，相对舞台左上角的原点(0,0)来适配坐标，根据舞台大小自动计算相对偏移坐标；
            一般情况下该方式适用于，那些存放到左上角坐标原点为（0,0）的容器上的元素。该值为1。
            注意：若要设置相对于舞台(0,0)坐标时，请使用AdaptType.AdaptContainer。*/
            AdaptCoordinateType.AdaptStage = 1; //string = "AdaptStage";
            /**适配容器，相对容器左上角的原点(0,0)来适配坐标，根据舞台大小自动等比缩放坐标。该值为2。
            一般情况下该方式适用于：
            （1）那些存放到左上角坐标原点非（0,0）的容器上的元素；
            （2）无需进行偏移处理的元素，如设置坐标为(0,0)时。*/
            AdaptCoordinateType.AdaptContainer = 2; //string = "AdaptContainer";
            /**适配容器，相对容器右上角的原点来适配坐标，根据舞台大小自动等比缩放坐标；该值为3。
            一般情况下该方式适用于：需进行靠右偏移处理的元素*/
            AdaptCoordinateType.AdaptContainerRight = 3; //string = "AdaptContainerRight";
            /**不采用自动适配方案，根据传入参数设置。该值为0。*/
            AdaptCoordinateType.NoAdapt = 0; //string = "NoAdapt";
            return AdaptCoordinateType;
        }());
        Enums.AdaptCoordinateType = AdaptCoordinateType;
        __reflect(AdaptCoordinateType.prototype, "Utils.Enums.AdaptCoordinateType");
        /**对象尺寸自动适配方式，使用该类可以选择处理对象尺寸适配的方式*/
        var AdaptSizeType = (function () {
            function AdaptSizeType() {
            }
            /**根据舞台尺寸，同时适配对象长宽。该值为1。*/
            AdaptSizeType.Both = 1; // string = "Both";
            /**根据舞台尺寸，只适配宽度。该值为2。*/
            AdaptSizeType.OnlyWidth = 2; //string = "OnlyWidth";
            /**根据舞台尺寸，只适配高度。该值为3。*/
            AdaptSizeType.OnlyHeight = 3; //string = "OnlyHeight";
            /**不采用自动适配方案，根据传入参数设置。该值为0。*/
            AdaptSizeType.NoAdapt = 0; // string = "NoAdapt";
            return AdaptSizeType;
        }());
        Enums.AdaptSizeType = AdaptSizeType;
        __reflect(AdaptSizeType.prototype, "Utils.Enums.AdaptSizeType");
        /**滚动条显示策略 on / off / auto */
        var ScrollPolicy = (function () {
            function ScrollPolicy() {
            }
            /**总是允许滚动。该值为"on"。*/
            ScrollPolicy.ON = "on";
            /**从不允许滚动。该值为"off"。*/
            ScrollPolicy.OFF = "off";
            /**如果子项超出父级的尺寸，则允许滚动，反之不允许滚动。该值为"auto"。*/
            ScrollPolicy.AUTO = "auto";
            return ScrollPolicy;
        }());
        Enums.ScrollPolicy = ScrollPolicy;
        __reflect(ScrollPolicy.prototype, "Utils.Enums.ScrollPolicy");
    })(Enums = Utils.Enums || (Utils.Enums = {}));
})(Utils || (Utils = {}));
//# sourceMappingURL=Enums.js.map
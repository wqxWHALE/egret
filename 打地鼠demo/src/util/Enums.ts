module Utils {
    /**枚举类模块，采用静态字段方式实现*/
    export module Enums {
        export class EnumsExample1 {
            public static Enum1: string = "1";
            public static Enum2: string = "2";
        }
        export class EnumsExample2 {
            public static Enum1: number = 1;
            public static Enum2: number = 2;
        }

        /**坐标自动适配方式，使用该类可以选择处理坐标适配的方式*/
        export class AdaptCoordinateType {
            /**适配舞台，相对舞台左上角的原点(0,0)来适配坐标，根据舞台大小自动计算相对偏移坐标；
            一般情况下该方式适用于，那些存放到左上角坐标原点为（0,0）的容器上的元素。该值为1。
            注意：若要设置相对于舞台(0,0)坐标时，请使用AdaptType.AdaptContainer。*/
            public static AdaptStage: number = 1;//string = "AdaptStage";
            /**适配容器，相对容器左上角的原点(0,0)来适配坐标，根据舞台大小自动等比缩放坐标。该值为2。
            一般情况下该方式适用于：
            （1）那些存放到左上角坐标原点非（0,0）的容器上的元素；
            （2）无需进行偏移处理的元素，如设置坐标为(0,0)时。*/
            public static AdaptContainer: number = 2;//string = "AdaptContainer";
            /**适配容器，相对容器右上角的原点来适配坐标，根据舞台大小自动等比缩放坐标；该值为3。
            一般情况下该方式适用于：需进行靠右偏移处理的元素*/
            public static AdaptContainerRight: number = 3;//string = "AdaptContainerRight";
            /**不采用自动适配方案，根据传入参数设置。该值为0。*/
            public static NoAdapt: number = 0; //string = "NoAdapt";
        }

        /**对象尺寸自动适配方式，使用该类可以选择处理对象尺寸适配的方式*/
        export class AdaptSizeType {
            /**根据舞台尺寸，同时适配对象长宽。该值为1。*/
            public static Both: number = 1;// string = "Both";
            /**根据舞台尺寸，只适配宽度。该值为2。*/
            public static OnlyWidth: number = 2; //string = "OnlyWidth";
            /**根据舞台尺寸，只适配高度。该值为3。*/
            public static OnlyHeight: number = 3;//string = "OnlyHeight";
            /**不采用自动适配方案，根据传入参数设置。该值为0。*/
            public static NoAdapt: number = 0; // string = "NoAdapt";
        }


        /**滚动条显示策略 on / off / auto */
        export class ScrollPolicy {
            /**总是允许滚动。该值为"on"。*/
            public static ON: string = "on";
            /**从不允许滚动。该值为"off"。*/
            public static OFF: string = "off";
            /**如果子项超出父级的尺寸，则允许滚动，反之不允许滚动。该值为"auto"。*/
            public static AUTO: string = "auto";
        }
    }
} 
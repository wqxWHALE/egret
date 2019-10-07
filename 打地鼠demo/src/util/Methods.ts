module Utils {
    /**
    公共静态方法类
    */
    export class Method {

        /**读取mock数据 */
        static readTextFile(file, callback) {  
            var rawFile = new XMLHttpRequest();  
            rawFile.overrideMimeType("application/json");  
            rawFile.open("GET", file, true);  
            rawFile.onreadystatechange = function() {  
                if (rawFile.readyState == 4 && rawFile.status == 200) {  
                    callback(rawFile.responseText);  
                }  
            }  
            rawFile.send(null);   
        }
        
        /**创建图片并把资源名称设置为图片名称*/
        static createBitmapByName(sourceName: string, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both): egret.Bitmap {
            var result: egret.Bitmap = new egret.Bitmap();
            var texture: egret.Texture = RES.getRes(sourceName);
            result.texture = texture;
            result.name = sourceName;
            Method.setSize(result, result.width, result.height, AdaptSizeType);
            return result;
        }

        /**创建TextField*/
        static createTextField(text: string, size: number = 18, color: number = 0xffffff, bold: boolean = false, fontFamily: string = "微软雅黑", cacheAsBitmap: boolean = false, width?: number, height?: number): egret.TextField {
            var result: egret.TextField = new egret.TextField();
            if (width != undefined && width != null) {
                result.width = Config.Layout.AdaptWidth(width);
            }
            if (height != undefined && height != null) {
                result.height = Config.Layout.AdaptHeight(height);
            }
            result.text = text;
            result.size = Config.Layout.AdaptFontSize(size);
            result.textColor = color;
            result.fontFamily = fontFamily;
            result.bold = bold;
            result.cacheAsBitmap = cacheAsBitmap;
            return result;
        }
        
        /**把图片添加到指定container上，这里加入了相对位置的处理，可适配不同屏幕的尺寸的xy坐标距离*/
        static addImage(container: egret.DisplayObjectContainer, source: string, x: number, y: number, alpha: number = 1, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptStage, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both): egret.Bitmap {
            var img = Utils.Method.createBitmapByName(source, AdaptSizeType);
            Method.setCoordinate(img, x, y, AdaptCoordinateType);
            img.alpha = alpha;
            container.addChild(img);
            return img;
        }


        /**把图片添加到指定container上，这里加入了相对位置的处理，可适配不同屏幕的尺寸的xy坐标距离*/
        static addImageInContainer(container: egret.DisplayObjectContainer, source: string, x: number, y: number, alpha: number = 1, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptContainer, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both): egret.Bitmap {
            var img = Utils.Method.createBitmapByName(source, AdaptSizeType);
            Method.setCoordinate(img, x, y, AdaptCoordinateType);
            img.alpha = alpha;
            container.addChild(img);
            return img;
        }

        /**把文本添加到指定container上，这里加入了相对位置的处理，可适配不同屏幕的尺寸的xy坐标距离*/
        static addTextField(container: egret.DisplayObjectContainer, text: string, x: number, y: number, size: number = 24, textColor: number = 0xffffff, bold: boolean = false, fontFamily: string = "微软雅黑", AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptStage, cacheAsBitmap: boolean = false, width?: number, height?: number): egret.TextField {
            var result = Utils.Method.createTextField(text, size, textColor, bold, fontFamily, cacheAsBitmap, width, height);
            Method.setCoordinate(result, x, y, AdaptCoordinateType);
            container.addChild(result);
            return result;
        }

        /**把文本添加到指定container上，这里加入了相对位置的处理，可适配不同屏幕的尺寸的xy坐标距离*/
        static addTextFieldInContainer(container: egret.DisplayObjectContainer, text: string, x: number, y: number, size: number = 24, textColor: number = 0xffffff, bold: boolean = false, fontFamily: string = "微软雅黑", AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptContainer, cacheAsBitmap: boolean = false, width?: number, height?: number): egret.TextField {
            var result = Utils.Method.createTextField(text, size, textColor, bold, fontFamily, cacheAsBitmap, width, height);
            Method.setCoordinate(result, x, y, AdaptCoordinateType);
            container.addChild(result);
            return result;
        }

        /** 创建并添加一个{egret.DisplayObjectContainer}对象到指定容器中*/
        static addContainer(parentContainer: egret.DisplayObjectContainer, x: number, y: number, w?: number, h?: number, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptStage, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both) {
            var container = new egret.DisplayObjectContainer();
            Method.setCoordinate(container, x, y, AdaptCoordinateType);
            if (w != undefined && w != null) {
                Method.setWidth(container, w, AdaptSizeType);
            }
            if (h != undefined && h != null) {
                Method.setHeight(container, h, AdaptSizeType);
            }
            parentContainer.addChild(container);
            return container;
        }

        /** 创建并添加一个{egret.DisplayObjectContainer}对象到指定容器中*/
        static addContainerInContainer(parentContainer: egret.DisplayObjectContainer, x: number, y: number, w?: number, h?: number, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptContainer, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both) {
            var container = new egret.DisplayObjectContainer();
            Method.setCoordinate(container, x, y, AdaptCoordinateType);
            if (w != undefined && w != null) {
                Method.setWidth(container, w, AdaptSizeType);
            }
            if (h != undefined && h != null) {
                Method.setHeight(container, h, AdaptSizeType);
            }
            parentContainer.addChild(container);
            return container;
        }

        /** 创建并添加一个{egret.Sprite}对象到指定容器中*/
        static addSprite(parentContainer: egret.DisplayObjectContainer, x: number, y: number, w?: number, h?: number, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptStage, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both) {
            var sprite = new egret.Sprite();
            Method.setCoordinate(sprite, x, y, AdaptCoordinateType);
            if (w != undefined && w != null) {
                Method.setWidth(sprite, w, AdaptSizeType);
            }
            if (h != undefined && h != null) {
                Method.setHeight(sprite, h, AdaptSizeType);
            }
            parentContainer.addChild(sprite);
            return sprite;
        }
        /** 创建并添加一个{egret.Sprite}对象到指定容器中*/
        static addSpriteInContainer(parentContainer: egret.DisplayObjectContainer, x: number, y: number, w?: number, h?: number, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptContainer, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both) {
            var sprite = new egret.Sprite();
            Method.setCoordinate(sprite, x, y, AdaptCoordinateType);
            if (w != undefined && w != null) {
                Method.setWidth(sprite, w, AdaptSizeType);
            }
            if (h != undefined && h != null) {
                Method.setHeight(sprite, h, AdaptSizeType);
            }
            parentContainer.addChild(sprite);
            return sprite;
        }

        static addOwnSpriteInContainer(sprite:egret.Sprite,parentContainer: egret.DisplayObjectContainer, x: number, y: number, w?: number, h?: number, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptContainer, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both) {
            Method.setCoordinate(sprite, x, y, AdaptCoordinateType);
            if (w != undefined && w != null) {
                Method.setWidth(sprite, w, AdaptSizeType);
            }
            if (h != undefined && h != null) {
                Method.setHeight(sprite, h, AdaptSizeType);
            }
            parentContainer.addChild(sprite);
            return sprite;
        }
        
        /**创建并添加一个滚动条组件到指定的容器对象上，（注意使用{egret.ScrollView}是没有滚动条的）*/
        static addScrollView(parentContainer: egret.DisplayObjectContainer, contentContainer: egret.DisplayObjectContainer, x: number, y: number, w: number, h: number, scrollPolicyV: string = Enums.ScrollPolicy.AUTO, scrollPolicyH: string = Enums.ScrollPolicy.OFF, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptStage, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both) {
            var scrollView: egret.ScrollView = new egret.ScrollView();
            Method.setCoordinate(scrollView, x, y, AdaptCoordinateType);
            Method.setSize(scrollView, w, h, AdaptSizeType);
            scrollView.horizontalScrollPolicy = scrollPolicyH;
            scrollView.verticalScrollPolicy = scrollPolicyV;
            parentContainer.addChild(scrollView);
            scrollView.setContent(contentContainer);
            return scrollView;
        }

        /**创建并添加一个滚动条组件到指定的容器对象上，（注意使用{egret.ScrollView}是没有滚动条的）*/
        static addScrollViewInContainer(parentContainer: egret.DisplayObjectContainer, contentContainer: egret.DisplayObjectContainer, x: number, y: number, w: number, h: number, scrollPolicyV: string = Enums.ScrollPolicy.AUTO, scrollPolicyH: string = Enums.ScrollPolicy.OFF, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptContainer, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both) {
            var scrollView: egret.ScrollView = new egret.ScrollView();
            Method.setCoordinate(scrollView, x, y, AdaptCoordinateType);
            Method.setSize(scrollView, w, h, AdaptSizeType);
            scrollView.horizontalScrollPolicy = scrollPolicyH;
            scrollView.verticalScrollPolicy = scrollPolicyV;
            parentContainer.addChild(scrollView);
            scrollView.setContent(contentContainer);
            return scrollView;
        }
        
        /**设置对象坐标*/
        static setCoordinate(object: any, x: number, y: number, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptStage) {
            if (AdaptCoordinateType == Utils.Enums.AdaptCoordinateType.AdaptStage) {
                object.x = Config.Layout.AdaptX(x);
                object.y = Config.Layout.AdaptY(y);
            } else if (AdaptCoordinateType == Utils.Enums.AdaptCoordinateType.AdaptContainer) {
                object.x = Config.Layout.AdaptXInContainer(x);
                object.y = Config.Layout.AdaptYInContainer(y);
            } else if (AdaptCoordinateType == Utils.Enums.AdaptCoordinateType.AdaptContainerRight) {
                object.x = Config.Layout.StageWidth - Config.Layout.AdaptWidth(Config.Layout.DesignWidth - x);
                object.y = Config.Layout.AdaptYInContainer(y);
            } else {
                object.x = x;
                object.y = y;
            }
            return object;
        }
        /**设置对象尺寸*/
        static setSize(object: any, w: number, h: number, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both) {
            if (AdaptSizeType == Utils.Enums.AdaptSizeType.Both) {
                object.width = Config.Layout.AdaptWidth(w);
                object.height = Config.Layout.AdaptHeight(h);
            } else if (AdaptSizeType == Utils.Enums.AdaptSizeType.OnlyWidth) {
                object.width = Config.Layout.AdaptWidth(w);
                object.height = h;
            } else if (AdaptSizeType == Utils.Enums.AdaptSizeType.OnlyHeight) {
                object.width = w;
                object.height = Config.Layout.AdaptHeight(h);
            } else {
                object.width = w;
                object.height = h;
            }
            return object;
        }
        /**设置对象宽度*/
        static setWidth(object: any, w: number, AdaptSizeType: number = Utils.Enums.AdaptSizeType.OnlyWidth) {
            if (AdaptSizeType == Utils.Enums.AdaptSizeType.OnlyWidth || AdaptSizeType == Utils.Enums.AdaptSizeType.Both) {
                object.width = Config.Layout.AdaptWidth(w);
            } else {
                object.width = w;
            }
            return object;
        }
        /**设置对象高度*/
        static setHeight(object: any, h: number, AdaptSizeType: number = Utils.Enums.AdaptSizeType.OnlyHeight) {
            if (AdaptSizeType == Utils.Enums.AdaptSizeType.OnlyHeight || AdaptSizeType == Utils.Enums.AdaptSizeType.Both) {
                object.height = Config.Layout.AdaptHeight(h);
            } else {
                object.height = h;
            }
            return object;
        }

        /** 使用Sprite绘制矩形；可选择填充方式或是线条方式*/
        static drawRectBySprite(sprite: egret.Sprite, color: number = 0x000000, alpha: number = 1, x: number = 0, y: number = 0, width: number = sprite.width, height: number = sprite.height, isFill: boolean = true, thickness: number = 2) {
            if (isFill) {
                sprite.graphics.beginFill(color, alpha);
            } else {
                sprite.graphics.lineStyle(thickness, color, alpha);
            }
            sprite.graphics.drawRect(x, y, width, height);
            sprite.graphics.endFill();
        }


        /** 创建并添加一个{egret.Shape}对象到指定容器中*/
        static addShape(container: egret.DisplayObjectContainer, x: number, y: number, w?: number, h?: number, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptStage, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both) {
            var shape = new egret.Shape();
            Method.setCoordinate(shape, x, y, AdaptCoordinateType);
            if (w != undefined && w != null) {
                Method.setWidth(shape, w, AdaptSizeType);
            }
            if (h != undefined && h != null) {
                Method.setHeight(shape, h, AdaptSizeType);
            }
            container.addChild(shape);
            return shape;
        }

        /** 创建并添加一个{egret.Shape}对象到指定容器中*/
        static addShapeInContainer(container: egret.DisplayObjectContainer, x: number, y: number, w?: number, h?: number, AdaptCoordinateType: number = Utils.Enums.AdaptCoordinateType.AdaptContainer, AdaptSizeType: number = Utils.Enums.AdaptSizeType.Both) {
            var shape = new egret.Shape();
            Method.setCoordinate(shape, x, y, AdaptCoordinateType);
            if (w != undefined && w != null) {
                Method.setWidth(shape, w, AdaptSizeType);
            }
            if (h != undefined && h != null) {
                Method.setHeight(shape, h, AdaptSizeType);
            }
            container.addChild(shape);
            return shape;
        }


        /** 使用Shape绘制矩形；可选择填充方式或是线条方式*/
        static drawRectByShape(shape: egret.Shape, color: number = 0x000000, alpha: number = 1, x: number = 0, y: number = 0, width: number = shape.width, height: number = shape.height, isFill: boolean = true, thickness: number = 2) {
            if (isFill) {
                shape.graphics.beginFill(color, alpha);
            } else {
                shape.graphics.lineStyle(thickness, color, alpha);
            }
            shape.graphics.drawRect(x, y, width, height);
            shape.graphics.endFill();
        }


        /** 使用Sprite绘制圆角矩形；可选择填充方式或是线条方式*/
        static drawRoundRectBySprite(sprite: egret.Sprite, color: number = 0x000000, alpha: number = 1, ellipseWidth: number = 10, x: number = 0, y: number = 0, width: number = sprite.width, height: number = sprite.height, ellipseHeight: number = ellipseWidth, isFill: boolean = true, thickness: number = 2) {
            if (isFill) {
                sprite.graphics.beginFill(color, alpha);
            } else {
                sprite.graphics.lineStyle(thickness, color, alpha);
            }
            sprite.graphics.drawRoundRect(x, y, width, height, ellipseWidth, ellipseHeight);
            sprite.graphics.endFill();
        }
        
       
        /**设置对象的相对锚点*/
        public static setAnchor(obj: egret.DisplayObject, anchor: number, isSetXY: boolean = false, x: number = obj.x, y: number = obj.y) {
            obj.anchorOffsetX = obj.width * anchor;
            obj.anchorOffsetY = obj.height * anchor;
            if (isSetXY) {
                obj.x = x + obj.width * anchor;
                obj.y = y + obj.height * anchor;
            }
            return obj;
        }

        /**设置对象的相对锚点X*/
        public static setAnchorX(obj: egret.DisplayObject, anchorX: number, isSetX: boolean = false, x: number = obj.x) {
            obj.anchorOffsetX = obj.width * anchorX;
            if (isSetX) {
                obj.x = x + obj.width * anchorX;
            }
            return obj;
        }
        
        /**设置对象的相对锚点Y*/
        public static setAnchorY(obj: egret.DisplayObject, anchorY: number, isSetY: boolean = false, y: number = obj.y) {
            obj.anchorOffsetY = obj.height * anchorY;
            if (isSetY) {
                obj.y = y + obj.height * anchorY;
            }
            return obj;
        }



        /**Http异步请求，Post数据到服务器*/
        static Post(url: string, param: string, callBack: Function, thisObject: any) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(param);
            request.addEventListener(egret.Event.COMPLETE, callBack, thisObject);
        }
        

        /**获取通过HTTP请求后回发的数据，并解释为JSON对象返回*/
        static GetPostJson(event: egret.Event): any {
            var request = <egret.HttpRequest>event.currentTarget;
            return JSON.parse(request.response);
        }

    }
}  
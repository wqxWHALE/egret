var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils;
(function (Utils) {
    /**
    公共静态方法类
    */
    var Method = (function () {
        function Method() {
        }
        /**读取mock数据 */
        Method.readTextFile = function (file, callback) {
            var rawFile = new XMLHttpRequest();
            rawFile.overrideMimeType("application/json");
            rawFile.open("GET", file, true);
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState == 4 && rawFile.status == 200) {
                    callback(rawFile.responseText);
                }
            };
            rawFile.send(null);
        };
        /**创建图片并把资源名称设置为图片名称*/
        Method.createBitmapByName = function (sourceName, AdaptSizeType) {
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
            var result = new egret.Bitmap();
            var texture = RES.getRes(sourceName);
            result.texture = texture;
            result.name = sourceName;
            Method.setSize(result, result.width, result.height, AdaptSizeType);
            return result;
        };
        /**创建TextField*/
        Method.createTextField = function (text, size, color, bold, fontFamily, cacheAsBitmap, width, height) {
            if (size === void 0) { size = 18; }
            if (color === void 0) { color = 0xffffff; }
            if (bold === void 0) { bold = false; }
            if (fontFamily === void 0) { fontFamily = "微软雅黑"; }
            if (cacheAsBitmap === void 0) { cacheAsBitmap = false; }
            var result = new egret.TextField();
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
        };
        /**把图片添加到指定container上，这里加入了相对位置的处理，可适配不同屏幕的尺寸的xy坐标距离*/
        Method.addImage = function (container, source, x, y, alpha, AdaptCoordinateType, AdaptSizeType) {
            if (alpha === void 0) { alpha = 1; }
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptStage; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
            var img = Utils.Method.createBitmapByName(source, AdaptSizeType);
            Method.setCoordinate(img, x, y, AdaptCoordinateType);
            img.alpha = alpha;
            container.addChild(img);
            return img;
        };
        /**把图片添加到指定container上，这里加入了相对位置的处理，可适配不同屏幕的尺寸的xy坐标距离*/
        Method.addImageInContainer = function (container, source, x, y, alpha, AdaptCoordinateType, AdaptSizeType) {
            if (alpha === void 0) { alpha = 1; }
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptContainer; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
            var img = Utils.Method.createBitmapByName(source, AdaptSizeType);
            Method.setCoordinate(img, x, y, AdaptCoordinateType);
            img.alpha = alpha;
            container.addChild(img);
            return img;
        };
        /**把文本添加到指定container上，这里加入了相对位置的处理，可适配不同屏幕的尺寸的xy坐标距离*/
        Method.addTextField = function (container, text, x, y, size, textColor, bold, fontFamily, AdaptCoordinateType, cacheAsBitmap, width, height) {
            if (size === void 0) { size = 24; }
            if (textColor === void 0) { textColor = 0xffffff; }
            if (bold === void 0) { bold = false; }
            if (fontFamily === void 0) { fontFamily = "微软雅黑"; }
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptStage; }
            if (cacheAsBitmap === void 0) { cacheAsBitmap = false; }
            var result = Utils.Method.createTextField(text, size, textColor, bold, fontFamily, cacheAsBitmap, width, height);
            Method.setCoordinate(result, x, y, AdaptCoordinateType);
            container.addChild(result);
            return result;
        };
        /**把文本添加到指定container上，这里加入了相对位置的处理，可适配不同屏幕的尺寸的xy坐标距离*/
        Method.addTextFieldInContainer = function (container, text, x, y, size, textColor, bold, fontFamily, AdaptCoordinateType, cacheAsBitmap, width, height) {
            if (size === void 0) { size = 24; }
            if (textColor === void 0) { textColor = 0xffffff; }
            if (bold === void 0) { bold = false; }
            if (fontFamily === void 0) { fontFamily = "微软雅黑"; }
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptContainer; }
            if (cacheAsBitmap === void 0) { cacheAsBitmap = false; }
            var result = Utils.Method.createTextField(text, size, textColor, bold, fontFamily, cacheAsBitmap, width, height);
            Method.setCoordinate(result, x, y, AdaptCoordinateType);
            container.addChild(result);
            return result;
        };
        /** 创建并添加一个{egret.DisplayObjectContainer}对象到指定容器中*/
        Method.addContainer = function (parentContainer, x, y, w, h, AdaptCoordinateType, AdaptSizeType) {
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptStage; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
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
        };
        /** 创建并添加一个{egret.DisplayObjectContainer}对象到指定容器中*/
        Method.addContainerInContainer = function (parentContainer, x, y, w, h, AdaptCoordinateType, AdaptSizeType) {
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptContainer; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
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
        };
        /** 创建并添加一个{egret.Sprite}对象到指定容器中*/
        Method.addSprite = function (parentContainer, x, y, w, h, AdaptCoordinateType, AdaptSizeType) {
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptStage; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
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
        };
        /** 创建并添加一个{egret.Sprite}对象到指定容器中*/
        Method.addSpriteInContainer = function (parentContainer, x, y, w, h, AdaptCoordinateType, AdaptSizeType) {
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptContainer; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
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
        };
        Method.addOwnSpriteInContainer = function (sprite, parentContainer, x, y, w, h, AdaptCoordinateType, AdaptSizeType) {
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptContainer; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
            Method.setCoordinate(sprite, x, y, AdaptCoordinateType);
            if (w != undefined && w != null) {
                Method.setWidth(sprite, w, AdaptSizeType);
            }
            if (h != undefined && h != null) {
                Method.setHeight(sprite, h, AdaptSizeType);
            }
            parentContainer.addChild(sprite);
            return sprite;
        };
        /**创建并添加一个滚动条组件到指定的容器对象上，（注意使用{egret.ScrollView}是没有滚动条的）*/
        Method.addScrollView = function (parentContainer, contentContainer, x, y, w, h, scrollPolicyV, scrollPolicyH, AdaptCoordinateType, AdaptSizeType) {
            if (scrollPolicyV === void 0) { scrollPolicyV = Utils.Enums.ScrollPolicy.AUTO; }
            if (scrollPolicyH === void 0) { scrollPolicyH = Utils.Enums.ScrollPolicy.OFF; }
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptStage; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
            var scrollView = new egret.ScrollView();
            Method.setCoordinate(scrollView, x, y, AdaptCoordinateType);
            Method.setSize(scrollView, w, h, AdaptSizeType);
            scrollView.horizontalScrollPolicy = scrollPolicyH;
            scrollView.verticalScrollPolicy = scrollPolicyV;
            parentContainer.addChild(scrollView);
            scrollView.setContent(contentContainer);
            return scrollView;
        };
        /**创建并添加一个滚动条组件到指定的容器对象上，（注意使用{egret.ScrollView}是没有滚动条的）*/
        Method.addScrollViewInContainer = function (parentContainer, contentContainer, x, y, w, h, scrollPolicyV, scrollPolicyH, AdaptCoordinateType, AdaptSizeType) {
            if (scrollPolicyV === void 0) { scrollPolicyV = Utils.Enums.ScrollPolicy.AUTO; }
            if (scrollPolicyH === void 0) { scrollPolicyH = Utils.Enums.ScrollPolicy.OFF; }
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptContainer; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
            var scrollView = new egret.ScrollView();
            Method.setCoordinate(scrollView, x, y, AdaptCoordinateType);
            Method.setSize(scrollView, w, h, AdaptSizeType);
            scrollView.horizontalScrollPolicy = scrollPolicyH;
            scrollView.verticalScrollPolicy = scrollPolicyV;
            parentContainer.addChild(scrollView);
            scrollView.setContent(contentContainer);
            return scrollView;
        };
        /**设置对象坐标*/
        Method.setCoordinate = function (object, x, y, AdaptCoordinateType) {
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptStage; }
            if (AdaptCoordinateType == Utils.Enums.AdaptCoordinateType.AdaptStage) {
                object.x = Config.Layout.AdaptX(x);
                object.y = Config.Layout.AdaptY(y);
            }
            else if (AdaptCoordinateType == Utils.Enums.AdaptCoordinateType.AdaptContainer) {
                object.x = Config.Layout.AdaptXInContainer(x);
                object.y = Config.Layout.AdaptYInContainer(y);
            }
            else if (AdaptCoordinateType == Utils.Enums.AdaptCoordinateType.AdaptContainerRight) {
                object.x = Config.Layout.StageWidth - Config.Layout.AdaptWidth(Config.Layout.DesignWidth - x);
                object.y = Config.Layout.AdaptYInContainer(y);
            }
            else {
                object.x = x;
                object.y = y;
            }
            return object;
        };
        /**设置对象尺寸*/
        Method.setSize = function (object, w, h, AdaptSizeType) {
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
            if (AdaptSizeType == Utils.Enums.AdaptSizeType.Both) {
                object.width = Config.Layout.AdaptWidth(w);
                object.height = Config.Layout.AdaptHeight(h);
            }
            else if (AdaptSizeType == Utils.Enums.AdaptSizeType.OnlyWidth) {
                object.width = Config.Layout.AdaptWidth(w);
                object.height = h;
            }
            else if (AdaptSizeType == Utils.Enums.AdaptSizeType.OnlyHeight) {
                object.width = w;
                object.height = Config.Layout.AdaptHeight(h);
            }
            else {
                object.width = w;
                object.height = h;
            }
            return object;
        };
        /**设置对象宽度*/
        Method.setWidth = function (object, w, AdaptSizeType) {
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.OnlyWidth; }
            if (AdaptSizeType == Utils.Enums.AdaptSizeType.OnlyWidth || AdaptSizeType == Utils.Enums.AdaptSizeType.Both) {
                object.width = Config.Layout.AdaptWidth(w);
            }
            else {
                object.width = w;
            }
            return object;
        };
        /**设置对象高度*/
        Method.setHeight = function (object, h, AdaptSizeType) {
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.OnlyHeight; }
            if (AdaptSizeType == Utils.Enums.AdaptSizeType.OnlyHeight || AdaptSizeType == Utils.Enums.AdaptSizeType.Both) {
                object.height = Config.Layout.AdaptHeight(h);
            }
            else {
                object.height = h;
            }
            return object;
        };
        /** 使用Sprite绘制矩形；可选择填充方式或是线条方式*/
        Method.drawRectBySprite = function (sprite, color, alpha, x, y, width, height, isFill, thickness) {
            if (color === void 0) { color = 0x000000; }
            if (alpha === void 0) { alpha = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = sprite.width; }
            if (height === void 0) { height = sprite.height; }
            if (isFill === void 0) { isFill = true; }
            if (thickness === void 0) { thickness = 2; }
            if (isFill) {
                sprite.graphics.beginFill(color, alpha);
            }
            else {
                sprite.graphics.lineStyle(thickness, color, alpha);
            }
            sprite.graphics.drawRect(x, y, width, height);
            sprite.graphics.endFill();
        };
        /** 创建并添加一个{egret.Shape}对象到指定容器中*/
        Method.addShape = function (container, x, y, w, h, AdaptCoordinateType, AdaptSizeType) {
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptStage; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
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
        };
        /** 创建并添加一个{egret.Shape}对象到指定容器中*/
        Method.addShapeInContainer = function (container, x, y, w, h, AdaptCoordinateType, AdaptSizeType) {
            if (AdaptCoordinateType === void 0) { AdaptCoordinateType = Utils.Enums.AdaptCoordinateType.AdaptContainer; }
            if (AdaptSizeType === void 0) { AdaptSizeType = Utils.Enums.AdaptSizeType.Both; }
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
        };
        /** 使用Shape绘制矩形；可选择填充方式或是线条方式*/
        Method.drawRectByShape = function (shape, color, alpha, x, y, width, height, isFill, thickness) {
            if (color === void 0) { color = 0x000000; }
            if (alpha === void 0) { alpha = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = shape.width; }
            if (height === void 0) { height = shape.height; }
            if (isFill === void 0) { isFill = true; }
            if (thickness === void 0) { thickness = 2; }
            if (isFill) {
                shape.graphics.beginFill(color, alpha);
            }
            else {
                shape.graphics.lineStyle(thickness, color, alpha);
            }
            shape.graphics.drawRect(x, y, width, height);
            shape.graphics.endFill();
        };
        /** 使用Sprite绘制圆角矩形；可选择填充方式或是线条方式*/
        Method.drawRoundRectBySprite = function (sprite, color, alpha, ellipseWidth, x, y, width, height, ellipseHeight, isFill, thickness) {
            if (color === void 0) { color = 0x000000; }
            if (alpha === void 0) { alpha = 1; }
            if (ellipseWidth === void 0) { ellipseWidth = 10; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = sprite.width; }
            if (height === void 0) { height = sprite.height; }
            if (ellipseHeight === void 0) { ellipseHeight = ellipseWidth; }
            if (isFill === void 0) { isFill = true; }
            if (thickness === void 0) { thickness = 2; }
            if (isFill) {
                sprite.graphics.beginFill(color, alpha);
            }
            else {
                sprite.graphics.lineStyle(thickness, color, alpha);
            }
            sprite.graphics.drawRoundRect(x, y, width, height, ellipseWidth, ellipseHeight);
            sprite.graphics.endFill();
        };
        /**设置对象的相对锚点*/
        Method.setAnchor = function (obj, anchor, isSetXY, x, y) {
            if (isSetXY === void 0) { isSetXY = false; }
            if (x === void 0) { x = obj.x; }
            if (y === void 0) { y = obj.y; }
            obj.anchorOffsetX = obj.width * anchor;
            obj.anchorOffsetY = obj.height * anchor;
            if (isSetXY) {
                obj.x = x + obj.width * anchor;
                obj.y = y + obj.height * anchor;
            }
            return obj;
        };
        /**设置对象的相对锚点X*/
        Method.setAnchorX = function (obj, anchorX, isSetX, x) {
            if (isSetX === void 0) { isSetX = false; }
            if (x === void 0) { x = obj.x; }
            obj.anchorOffsetX = obj.width * anchorX;
            if (isSetX) {
                obj.x = x + obj.width * anchorX;
            }
            return obj;
        };
        /**设置对象的相对锚点Y*/
        Method.setAnchorY = function (obj, anchorY, isSetY, y) {
            if (isSetY === void 0) { isSetY = false; }
            if (y === void 0) { y = obj.y; }
            obj.anchorOffsetY = obj.height * anchorY;
            if (isSetY) {
                obj.y = y + obj.height * anchorY;
            }
            return obj;
        };
        /**Http异步请求，Post数据到服务器*/
        Method.Post = function (url, param, callBack, thisObject) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(param);
            request.addEventListener(egret.Event.COMPLETE, callBack, thisObject);
        };
        /**获取通过HTTP请求后回发的数据，并解释为JSON对象返回*/
        Method.GetPostJson = function (event) {
            var request = event.currentTarget;
            return JSON.parse(request.response);
        };
        return Method;
    }());
    Utils.Method = Method;
    __reflect(Method.prototype, "Utils.Method");
})(Utils || (Utils = {}));
//# sourceMappingURL=Methods.js.map
class IndexLayer extends BaseLayer implements IBaseScene {
    public constructor() {
        super();
        this.init();
    }

    private chg = null;
    public init() {
        var root = this;
        var width = root.width;
        var height = root.height;
       
        var cbg= Utils.Method.addContainer(root, 50, root.height - 180, 0, 0);
        root.setChildIndex(cbg, 99);

        var btnContainer = Utils.Method.addContainer(root, 35, root.height - 180, 0, 0);
        btnContainer.width = 150;
        btnContainer.height = 150;
        btnContainer.touchEnabled = true;
        root.setChildIndex(btnContainer, 100);

        

        var btnNow = Utils.Method.addImage(btnContainer, "btnNow_png", 5, 5, 0);
        btnNow.width = btnContainer.width - 10;
        btnNow.height = btnContainer.height - 10;
        btnContainer.setChildIndex(btnNow, 1);

        var btn = Utils.Method.addImage(btnContainer, "btn_png", 0, 0, 1);
        btn.width = btnContainer.width;
        btn.height = btnContainer.height;
        btnContainer.setChildIndex(btn, 2);

        var finger = Utils.Method.addImage(btnContainer, "finger_png", 90, 90);
    
        btnContainer.setChildIndex(finger, 3);
        var finger_text = Utils.Method.addTextField(btnContainer,"松开按钮，炼成速度由你决定",160,110,24,0xffffff);
        btnContainer.setChildIndex(finger, 3);

        var fgContainer = Utils.Method.addContainer(root, width * 0.354, height * 0.3);
        fgContainer.width = width * (1 - 0.33);
        fgContainer.height = height * 0.59;
        fgContainer.rotation = 4;

        fgContainer.scrollRect = new egret.Rectangle(0, 0, fgContainer.width, fgContainer.height);

        var fg = Utils.Method.addImage(fgContainer, "fg_png", 0, fgContainer.height, 1);

        fg.width = fgContainer.width;
        fg.height = fgContainer.height-10;

        egret.Tween.get(fg, { loop: true }).to({ y: 0 }, 700).to({ x: fgContainer.x + fgContainer.height }, 1000);

        
        var image1 = Utils.Method.addImage(root, "1_0_jpg", width *0.4981, height * 0.5797, 1);
        image1.width = width;
        image1.height = height;
        Utils.Method.setAnchorX(image1,0.4981);
        Utils.Method.setAnchorY(image1, 0.5797);
        root.setChildIndex(image1, 1);
        //29922

        
        var nowImg = image1;
        var node;
        var index = 0;
        var exFlag = 0;
        var nowWidth = root.width;
        var nowWidth2 = root.width;
        var nextImg = null;

        //图片替换渐隐效果 ,0关闭，1开启,从第一张开始
        //当
        var hideAminateArr = [
            [0, 0],//第1张消失状态，第2张显示状态
            [0, 0],//第2张消失状态，第3张显示状态
            [0, 0],//第3张消失状态，第4张显示状态
            [0, 0],//第4张消失状态，第5张显示状态
            [0, 0],//第5张消失状态，第6张显示状态
            [0, 0],//第6张消失状态，第7张显示状态
            [0, 0],//第7张消失状态,第8张显示状态
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        //图片替换，从第二张开始
        var imgArr = ["1_1_jpg", "1_2_jpg", "2_0_jpg", "2_1_jpg", "2_2_jpg", "3_0_jpg","end"];
        //图片切换时当前放大倍数
        var nodeArr = [1.9963, 1.9389, 2.55, 2.1419, 2.5353, 2.55, 2.0705, 2.3867, 2.73, 2.0646, 2.8233, 2.2, 2.1027, 3.1542, 2.4, 2.1027,3.0264,2.5,2.1320,2.8051,3.45,2.1295,2.6872,2.6,2.0838,3.2425,2.5];
        //图片旋转，从第一张开始
        var rotaNodeArr = [0,0,1.2,0,0,0,0,0,0,0,0,1.2,0,0,0,0,0,1,0,0,1.1,0,0,0,0,0,0];
        var rotaArr = [0,0,-5.435,0,0,0,0,0,0,0,0,3.3,0,0,0,0,0,-9.2,0,0,-4.8,0,0,0,0,0,0];
        var turnArr = [0,0,"left",0,0,0,0,0,0,0,0,"right",0,0,0,0,0,"left",0,0,"left",0,0,0,0,0,0];
        //描点数组,不包含第一张
        var anchorArr = [
            [0.4981, 0.5797],
            [0.4981, 0.5797],
            [0.4758, 0.7771],
            [0.4758, 0.7771],
            [0.4758, 0.7771],
            [0.4147, 0.5430],
            [0.4147, 0.5430],
            [0.4147, 0.5430],
            [0.3930, 0.5363],
            [0.3930, 0.5363],
            [0.3930, 0.5363],
            [0.4378, 0.3535],
            [0.4378, 0.3535],
            [0.4378, 0.3535],
            [0.4317, 0.4287],
            [0.4317, 0.4287],
            [0.4317, 0.4287],
            [0.9471, 0.6163],
            [0.9471, 0.6163],
            [0.9471, 0.6163],
            [0.4294, 0.4811],
            [0.4294, 0.4811],
            [0.4294, 0.4811],
            [0.4117, 0.4154],
            [0.4117, 0.4154],
            [0.4117, 0.4154]
        ];
        //锚点调整，不包含第一张
        var expAnchorArr = [
            0,
            [0.4981, 0.62],
            0,
            0,
            [0.4638, 0.8051],
            0,
            0,
            [0.3747, 0.5530],
            0,
            0,
            [0.2980, 0.56],
            0,
            0,
            [0.4, 0.24],
            0,
            0,
            [0.4, 0.39],//7
            0,
            0,
            [0.6241, 0.6553],
            0,
            0,
            [0.3924, 0.4861],
            0,
            0,
            [0.3717, 0.3554]
        ];
        
        btnContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            btn.alpha = 0;
            btnNow.alpha = 1;
            if (fgContainer.parent) {
                root.removeChild(fgContainer);
                btnContainer.removeChild(finger);
                btnContainer.removeChild(finger_text);
            }
            root.chg = setInterval(function () {
                 //root.imageChange(image1,ie1_1);
                if (nowImg.parent) {
                    var imgData = root.imageChange(nowImg, nowWidth, imgArr[index], nodeArr[index], index, rotaNodeArr[index], rotaArr[index], turnArr[index], anchorArr[index], expAnchorArr[index], hideAminateArr[index], nextImg, nowWidth2, exFlag);

                    if (imgData == null) {
                        root.removeChildren();
                        window.clearInterval(root.chg);
                        window.location.reload()
                    } else {
                        nowImg = imgData[0];
                        index = imgData[1];
                        nowWidth = imgData[2];
                        if (typeof (imgData[3]) != "undefined") {
                            nextImg = imgData[3];
                        }
                        nowWidth2 = imgData[4];
                        exFlag = imgData[5];
                    }
                }
            }, 7);
            
        }, root);
        btnContainer.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            btnNow.alpha = 0;
            btn.alpha = 1;
            window.clearInterval(root.chg);
        }, root);

        btnContainer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            btnNow.alpha = 0;
            btn.alpha = 1;
            window.clearInterval(root.chg);
        }, root);
    }

    

    //图片替换
    private imageChange(pImageObj, nowWidth, cImageName, node, index, rotaNode, rota, turn, anchor, expAnchor, hideAminate, nextImg, nowWidth2, exflag) {
        var root = this;
        var width = root.width;
        var height = root.height;
        var addScale = 0.005 * root.width / nowWidth;
        pImageObj.scaleX += addScale;
        pImageObj.scaleY += addScale;
        nowWidth = nowWidth * (1 - 0.005);
        if (hideAminate[0] == 1 && pImageObj.scaleX >= node - 0.1&&pImageObj.alpha<=1&& pImageObj.alpha>0) {
            pImageObj.alpha = root.accSub(pImageObj.alpha, 0.05);
        }
        if (pImageObj.alpha <= 0) {
            root.removeChild(pImageObj);
            //nowWidth = root.width * (1 + nextImg.scaleX);
            index++;
            return [nextImg, index, nowWidth2, undefined, root.width, exflag];
        }
        if (nextImg != null) {
            if (nextImg.alpha < 1) {
                nextImg.alpha += 0.05;
            }
            var addScale2 = 0.005 * root.width*0.95 / nowWidth2;
            nextImg.scaleX += addScale2;
            nextImg.scaleY += addScale2;
            nowWidth2 = nowWidth2 * (1 - 0.004);
            if (nextImg.scaleX > 1 - addScale && exflag==1) {
                nowWidth2 = root.width;
                exflag = 0;
            }
        }
        //判断旋转方向
        // if (turn=="left" && pImageObj.scaleX>=rotaNode - 0.01 && pImageObj.rotation>rota){
        //     pImageObj.rotation -= 0.05;
        // }
        // if (turn == "right" && pImageObj.scaleX >= rotaNode - 0.01 && pImageObj.rotation < rota) {
        //     pImageObj.rotation += 0.05;
        // }
        //替换图片
        if (hideAminate[1] == 1 && pImageObj.scaleX >= node - 0.05 && pImageObj.scaleX <= node - 0.05 + addScale) {
            //执行完后pImageObj不变
            var cImageObj = Utils.Method.addImage(root, cImageName, width * anchor[0], height * anchor[1], 0);
            cImageObj.width = width;
            cImageObj.height = height;
            cImageObj.scaleX = 0.95;
            cImageObj.scaleY = 0.95;
            Utils.Method.setAnchorX(cImageObj, anchor[0]);
            Utils.Method.setAnchorY(cImageObj, anchor[1]);
            root.setChildIndex(cImageObj, 1);
            return [pImageObj, index, nowWidth, cImageObj, root.width*0.95,1];
        } 
        else if (hideAminate[1] == 0 && pImageObj.scaleX >= node - 0.005) {
            //执行完后pImageObj改变
            pImageObj.scaleX = node;
            pImageObj.scaleY = node;
            root.removeChild(pImageObj);
            
            if (cImageName == "end") {
                return null;
            } else {
                var cImageObj = Utils.Method.addImage(root, cImageName, width * anchor[0], height * anchor[1], 1);
                cImageObj.width = width;
                cImageObj.height = height;
                Utils.Method.setAnchorX(cImageObj, anchor[0]);
                Utils.Method.setAnchorY(cImageObj, anchor[1]);
                cImageObj.x = cImageObj.anchorOffsetX;
                cImageObj.y = cImageObj.anchorOffsetY;

                if (expAnchor != 0) {
                    cImageObj.x = width * expAnchor[0];
                    cImageObj.y = height * expAnchor[1];
                    Utils.Method.setAnchorX(cImageObj, expAnchor[0]);
                    Utils.Method.setAnchorY(cImageObj, expAnchor[1]);
                }
                root.setChildIndex(cImageObj, 1);
                index++;
                nowWidth = root.width;
                return [cImageObj, index, nowWidth, undefined, root.width, 0];
            }
            
        } else {
            return [pImageObj, index, nowWidth, undefined, nowWidth2, exflag];
        }
    }
    //两数相加
    private accAdd(arg1, arg2):number {
        var r1, r2, m;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2))
        return (arg1 * m + arg2 * m) / m
    }

        //两数相减
    private accSub(arg1, arg2):number {
        var r1, r2, m, n;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        var s: number = (arg1 * m - arg2 * m) / m;
        return Number(s.toFixed(n)) * 1.0;
    }
}  
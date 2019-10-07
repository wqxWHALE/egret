class Gopher extends egret.Sprite{
    public constructor(){
        super();
        this.init();
    }

    private gopherArr=["gopherShow01_png","gopherShow02_png"];
    private gopherBeatenArr=["gopherClick01_png","gopherClick02_png"];
    private gopherImg:egret.Bitmap;
    private gopherIsHidingBeaten:boolean=false;

    private init(){
        var root=this;
        root.width=Config.Layout.AdaptWidth(89);
        root.height=Config.Layout.AdaptHeight(92);
        var imgSourceName=root.gopherArr[root.getRandomIndex(root.gopherArr)];
        root.gopherImg = Utils.Method.addImageInContainer(root,imgSourceName,0,0);
    }

    private getRandomIndex(arr):number{
        var index=Math.round(Math.random()*(arr.length-1));
        return index;
    }

    public beaten(y,offset,callback){
        var root=this;

        //root.gopherIsHidingBeaten=true;
         egret.Tween.removeTweens(root);
        root.alpha=1;
        //root.y=y;
        egret.Tween.get(root).to({scaleX:1.1,scaleY:1.1,y:y},80,egret.Ease.bounceInOut).call(function(){
            var imgSourceName=root.gopherBeatenArr[root.getRandomIndex(root.gopherBeatenArr)];
            var texture: egret.Texture = RES.getRes(imgSourceName);
            root.gopherImg.texture = texture;
            root.scaleX=root.scaleY=1.2;
            AppScene.sound2.play();
            //root.gopherImg.anchorOffsetX=root.gopherImg.width/2;
        // root.gopherImg.anchorOffsetY=root.gopherImg.height;

            //console.log("状态改变了");
            setTimeout(function(){
                //root.gopherIsHidingBeaten=false;
                root.hide(y,offset,callback);
            },800);
        });
        
    }

    public comeOut(y,offset){
        var root=this;
        root.y=y+offset;
        root.alpha=1;
        egret.Tween.get(root).to({scaleX:1.1,scaleY:1.1,y:y},100,egret.Ease.bounceInOut)
    }

    public hide(y,offset,callback){
        var root=this;
        egret.Tween.get(root).to({scaleX:0,scaleY:0,y:y+offset},50,egret.Ease.bounceInOut).call(function(){
                root.alpha=0;
                callback && callback();
        });
        // var hiding=setInterval(function(){
        //     if(root.gopherIsHidingBeaten){
        //         clearInterval(hiding);
        //     }
        //     if(root.y>=root.y+offset){
        //         clearInterval(hiding);
        //         callback && callback();
        //     }else{
        //         root.y+=2;
        //     }
        // },1);
    }

    public remove(){
        var root=this;
        if(root.parent){
                 root.parent.removeChild(root);
            }
    }

}
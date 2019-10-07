//此类用于解决视觉问题
class GopherCover extends egret.Sprite{
    public constructor(){
        super();
        this.init();
    }

    private gopherImg:egret.Bitmap;

    private init(){
        var root=this;
        root.width=Config.Layout.AdaptWidth(89);
        root.height=Config.Layout.AdaptHeight(92);
        Utils.Method.drawRectBySprite(root,0x000000,1,0,0,root.width,root.height);
        root.alpha=0;
    }


    public comeOut(y,offset){
        var root=this;
        root.y=y+offset;
        egret.Tween.get(root).to({scaleX:1.1,scaleY:1.1,y:y},100,egret.Ease.bounceInOut)
    }

    public hide(){
        var root=this;
        if(root.parent){
                 root.parent.removeChild(root);
            }
    }

}
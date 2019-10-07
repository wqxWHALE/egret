class LoseLayer extends BaseLayer implements IBaseScene{

    private proRoot:IndexLayer;
    private gameRoot:GameLayer;
    private prizeName;
    public constructor(proRoot:IndexLayer,gameRoot:GameLayer,prizeName){
        super();
        this.proRoot=proRoot;
        this.gameRoot=gameRoot;
        this.prizeName=prizeName;
        this.init();
    }
    
    private failBox:egret.DisplayObjectContainer;
    public init(){
       var root=this;
       var bgCover:egret.Sprite=root.createContainer(0.5);
       root.addChild(bgCover);

        root.failBox=Utils.Method.addContainer(root,320,550,524,497);
       Utils.Method.setAnchor(root.failBox,0.5);

       var winBg:egret.Bitmap=Utils.Method.addImageInContainer(root.failBox,"loseBg_png",0,0);

    //    var closeBtn:egret.Bitmap=Utils.Method.addImageInContainer(root.successBox,"close_png",524,100);
    //    Utils.Method.setAnchor(closeBtn,1);

       var text:egret.TextField=Utils.Method.addTextFieldInContainer(root.failBox,"对不起，您挑战失败 ！",262,200,36,0xffffff,true);
       Utils.Method.setAnchor(text,0.5);
       text.strokeColor=0x3a230a;
       text.stroke=3;

       var coinPay:egret.TextField=Utils.Method.addTextFieldInContainer(root.failBox,"花费游戏豆：0",262,300,32,0x2d2d2d,true);
       Utils.Method.setAnchorX(coinPay,0.5);

       var restart:egret.Bitmap=Utils.Method.addImageInContainer(root.failBox,"restart_png",131,420);
       Utils.Method.setAnchor(restart,0.5);

        var back:egret.Bitmap=Utils.Method.addImageInContainer(root.failBox,"back_png",393,420);
        Utils.Method.setAnchor(back,0.5);

        restart.touchEnabled=true;
        restart.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            root.clearLayer();
            root.gameRoot.clearLayer();
            //重新开始
            root.proRoot.repeatGame();
        },root);

        back.touchEnabled=true;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            root.clearLayer();
            root.proRoot.touchEnabled=false;
            root.gameRoot.clearLayer();
            root.proRoot.addActivePart();
        },root);
       
    }


    private clearLayer() {
        this.removeChildren();
        this.parentContainer.removeChild(this);
    }

    //创建透明层
    private createContainer(alpha: number = 0) {
        var container: egret.Sprite;
        container = new egret.Sprite();
        container.x = container.y = 0;
        container.width = this.width;
        container.height = this.height;
        container.graphics.beginFill(0x1F1F1F, alpha);
        container.graphics.drawRect(0, 0, this.width, this.height);
        container.graphics.endFill()
        container.touchEnabled = true;
        container.x = container.y = 0;
        container.width = this.width;
        container.height = this.height;
        return container;
    }
}

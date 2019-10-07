class WinLayer extends BaseLayer implements IBaseScene{

    private proRoot:IndexLayer;
    private gameRoot:GameLayer;
    private prizeName;
    private userID;
    private hasNext:string;
    public constructor(proRoot:IndexLayer, gameRoot:GameLayer,prizeName,hasNext ){
        super();
        this.proRoot=proRoot;
        this.gameRoot=gameRoot;
        this.prizeName=prizeName;
        this.hasNext=hasNext;//是否有下一关
        this.init();
    }
    
    private successBox:egret.DisplayObjectContainer;
    private getPreferenceBtn:egret.Bitmap;
    private getSuccessTip:egret.Bitmap;
    private tutorialCon:egret.DisplayObjectContainer;
    private tutorialCon1:egret.DisplayObjectContainer;
    private tutorialbtn3:egret.Bitmap;
    private tutorialbtn4:egret.Bitmap;
    private back:egret.Bitmap;
    public init(){
       var root=this;
       root.userID=document.getElementById("myID")["value"];

       if(AppScene.tutorial&&AppScene.stepnum<3){
            console.log("tutorial");
            AppScene.stepnum=3;
            root.tutorialCon=Utils.Method.addContainer(AppScene.topLayer,0,0,root.width,root.height);
            root.tutorialCon.touchEnabled = true;
            root.tutorialCon.touchChildren = true;

            var sprite = new egret.Sprite();
            sprite.width=root.width;
            sprite.height=root.height;
            Utils.Method.drawRectBySprite(sprite,0x000000,0.7);
            var tutorialBg:egret.Sprite=Utils.Method.addOwnSpriteInContainer(sprite,root.tutorialCon,0,0,root.width,root.height)
            root.tutorialCon.y=0;
            root.tutorialbtn3=Utils.Method.addImageInContainer(root.tutorialCon,"tutorial03_png",340,680);
            Utils.Method.setAnchor(root.tutorialbtn3,0.5);
            root.tutorialbtn3.touchEnabled=true;
            root.tutorialbtn3.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
              root.tutorialbtn3.touchEnabled=false;
              root.tutorialCon.touchEnabled = false;
              root.tutorialCon.touchChildren = false;
              AppScene.topLayer.removeChild(root.tutorialCon);
              root.tutorialCon=null;
              root.getPreferenceBtn.touchEnabled=true;
              root.getCoupon();
   
              
              
              
            },root);

        }

       var bgCover:egret.Sprite=root.createContainer(0.5);
       root.addChild(bgCover);
       
       root.successBox=Utils.Method.addContainer(root,320,550,524,497);
       Utils.Method.setAnchor(root.successBox,0.5);

       var winBg:egret.Bitmap=Utils.Method.addImageInContainer(root.successBox,"successBg_png",0,0);

    //    var closeBtn:egret.Bitmap=Utils.Method.addImageInContainer(root.successBox,"close_png",524,100);
    //    Utils.Method.setAnchor(closeBtn,1);

       var text:egret.TextField=Utils.Method.addTextFieldInContainer(root.successBox,"恭喜您获得"+ root.prizeName+" ！",262,180,36,0xffffff,true);
       Utils.Method.setAnchor(text,0.5);
       text.strokeColor=0x3a230a;
       text.stroke=3;

       root.getPreferenceBtn=Utils.Method.addImageInContainer(root.successBox,"getPreferenceBtn_png",262,240);
       Utils.Method.setAnchor(root.getPreferenceBtn,0.5);


       var coinPay:egret.TextField=Utils.Method.addTextFieldInContainer(root.successBox,"花费游戏豆：0",262,300,32,0x2d2d2d,true);
       Utils.Method.setAnchorX(coinPay,0.5);

      
      var backX=393;
      if(root.hasNext=="success"){
            var nextChapter:egret.Bitmap=Utils.Method.addImageInContainer(root.successBox,"nextChapter_png",131,420);
            Utils.Method.setAnchor(nextChapter,0.5);

            nextChapter.touchEnabled=true;
            nextChapter.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                root.clearLayer();
                root.gameRoot.clearLayer();
                root.proRoot.loadNextData();
            },root);
        }else{
            backX=262;
        }

        var back:egret.Bitmap=root.back=Utils.Method.addImageInContainer(root.successBox,"back_png",backX,420);
        Utils.Method.setAnchor(back,0.5);

        root.getPreferenceBtn.touchEnabled=true;
        root.getPreferenceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            root.getPreferenceBtn.touchEnabled=false;
            root.getCoupon();
        },root);

        back.touchEnabled=true;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            root.clearLayer();
            root.gameRoot.clearLayer();
            root.proRoot.touchEnabled=false;
            root.proRoot.addActivePart();
        },root);

    }

    private getCoupon(){
        var root=this;
        window["loadingCover"]("show");
        window["loadingCover"]("hide");
        if(1){
              root.getSuccessTip=Utils.Method.addImageInContainer(root.successBox,"getPreferenceSuccess_png",262,240);
              var wt=root.getPreferenceBtn.width-30;
              root.getSuccessTip.height=root.getSuccessTip.height*wt/root.getSuccessTip.width;
              root.getSuccessTip.width=wt;
            Utils.Method.setAnchor(root.getSuccessTip,0.5);
            if(root.getPreferenceBtn.parent){
                root.successBox.removeChild(root.getPreferenceBtn);
            }
            // alert("领取成功");
            }else{
                root.getPreferenceBtn.touchEnabled=true;
                window["showTip"]("领取失败，请重试");
            }         
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

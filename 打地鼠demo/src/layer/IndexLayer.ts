class IndexLayer extends BaseLayer implements IBaseScene{
      private baseData;
      private userID;

      public currentPointID;
     //public currentGameCoin;

        public checkPointTime;  //	关卡时间(ms)
        public gohgerShowTime;  //	地鼠出现时间(ms)
        public gohgerSpaceTime; //地鼠出现间隔时间
        public failTime;    //允许失误次数

        public mockIndex=0;

      public constructor(baseData){
        super();
        this.baseData=baseData;
        this.currentPointID=baseData.checkPointID;
        //this.currentGameCoin=baseData.gameCoin;
        this.checkPointTime=baseData.checkPointTime;
        this.gohgerShowTime=baseData.gohgerShowTime;
        this.gohgerSpaceTime=baseData.spaceTime;
        this.failTime=baseData.failTime;
        this.init();
    }
    private stepnum:Number=0;
    private levelShow:egret.Sprite;
    private titleText:egret.TextField;
    private topBtnContainer:egret.DisplayObjectContainer;
    public init(){
        var root=this;
        root.userID=document.getElementById("myID")["value"];

       root.setBgImage("bg1_jpg");
       var cloud:egret.Bitmap=Utils.Method.addImage(root,"bgCloud_png",320,340);
       cloud.width=root.width*0.4;
       var cloudX=cloud.x;
        Utils.Animation.breathe(cloud,0.9,1,3000);
       egret.Tween.get(cloud,{loop:true}).to({x:cloudX-5},2000).to({x:cloudX+5},2000).to({x:cloudX},2000);
       Utils.Method.setAnchorX(cloud,0.5);
       Utils.Method.setAnchorY(cloud,1);
       var meadowBg:egret.Bitmap = Utils.Method.createBitmapByName("bg2_png");
        meadowBg.width = this.width;
        meadowBg.height = this.height;
        meadowBg.x = 0;
        meadowBg.y = 0;
        this.addChild(meadowBg);

        //标题
        var titleTop:egret.Bitmap=Utils.Method.addImage(root,"titleBg_png",320,20);
         titleTop.anchorOffsetX=titleTop.width/2;
         titleTop.y=20

        var titleBox:egret.Sprite=Utils.Method.addSprite(root,320,35);
        titleBox.y=35;
        
        var title:egret.Bitmap=Utils.Method.addImageInContainer(titleBox,"title_png",0,0);

        var titleText:egret.TextField=root.titleText=Utils.Method.addTextFieldInContainer(titleBox,"第"+root.baseData.checkPointLevel+"关",0,65,28);
        titleText.width=title.width;
        titleText.textColor=0xffffff;
        titleText.textAlign=egret.HorizontalAlign.CENTER;
        titleText.strokeColor=0xf14107;
        titleText.stroke=2;

        titleBox.anchorOffsetX=title.width/2;
        titleBox.scaleX=titleBox.scaleY=0;
        titleTop.scaleX=titleTop.scaleY=0;

        egret.Tween.get(titleTop).to({scaleX:1,scaleY:1},500,egret.Ease.bounceInOut);
        egret.Tween.get(titleBox).to({scaleX:1,scaleY:1},500,egret.Ease.bounceInOut);
        
        var topBtnContainer:egret.DisplayObjectContainer=root.topBtnContainer=Utils.Method.addContainer(root,320,0,640);
        var levelShow:egret.Sprite=root.levelShow=AppScene.addComponent(topBtnContainer,"levelBg_png","等级"+root.baseData.userLevel,20,90,45,12);
        var settingBtn:egret.Sprite=AppScene.addComponent(topBtnContainer,"settingBg_png","设置",530,90,8,17);      
        levelShow.scaleX=levelShow.scaleY=0;
        settingBtn.scaleX=settingBtn.scaleY=0;

        Utils.Method.setAnchorX(topBtnContainer,0.5);

       
        egret.Tween.get(levelShow).to({scaleX:1,scaleY:1},500,egret.Ease.bounceInOut);
        egret.Tween.get(settingBtn).to({scaleX:1,scaleY:1},500,egret.Ease.bounceInOut);


        settingBtn.touchEnabled=true;
        settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){
            e.stopImmediatePropagation();
            window["showVoiceSetting"]();
        },root);

        root.addActivePart();
    }

//WinLayer 调用
    public async loadNextData(){
        var root=this;
        root.mockIndex++;
        root.baseData = await root.getNextData();
        root.currentPointID=root.baseData.checkPointID;
        this.checkPointTime=root.baseData.checkPointTime;
        this.gohgerShowTime=root.baseData.gohgerShowTime;
        this.gohgerSpaceTime=root.baseData.spaceTime;
        this.failTime=root.baseData.failTime;
        //console.log("下一关："+root.baseData);
        root.updateUserLevel(root.baseData.userLevel);
        root.titleText.text="第"+root.baseData.checkPointLevel+"关";
        //root.addActivePart();
        new GameLayer(root);
    }

    public repeatGame(){
        new GameLayer(this);
    }


    public addActivePart(){
        var root=this;
         new GameLayer(root);

    }

    
//获取下一关游戏数据
    private getNextData(){
        var root=this;
        window["loadingCover"]("show");
        return new Promise(function(resolve, reject){
           window["loadingCover"]("hide");
          Utils.Method.readTextFile("mock/data.json", function(text){  
            var data = typeof text == "string"?JSON.parse(text):text;  
            resolve(data.gameData[root.mockIndex]);  
          }); 
        });
    }

     public showTip(message){
         window["showTip"](message);
     }



//更新用户等级
    public updateUserLevel(userLevel){
        var root=this;
        if(root.levelShow.parent){
            root.topBtnContainer.removeChild(root.levelShow);
        }
        root.levelShow=AppScene.addComponent(root.topBtnContainer,"levelBg_png","等级"+userLevel,20,105,45,12);
    }

}
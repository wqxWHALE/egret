class GameLayer extends BaseLayer implements IBaseScene{

    private userID;
    private parentObj:IndexLayer;
   public constructor(parentObj){
        super();
        this.parentObj=parentObj;
        this.playTime=parentObj.checkPointTime/200;
        this.allowMissTimes=parentObj.failTime;
        this.gopherShowTime=parentObj.gohgerShowTime;
        this.gophercreateTime=parentObj.gohgerSpaceTime;
        this.init();
    }

    
    public init(){
       var root=this;
       root.userID=document.getElementById("myID")["value"];
       root.checkUserGame();
    }


    private hammer:Hammer;
    private meadow:MeadowOfGopher;
    private toStartBtn:egret.Bitmap;

     private playTime:number=20;
    private allowMissTimes:number=3;
    public userMissTimes:number=0;


    public gopherShowTime:number;
    public gophercreateTime:number;

    private enterGame(){
       var root=this;

       //重设进度条状态
       root.warnTimeIsAdd=false;
        root.warnTimeIsEnd=false;
        root.warnTimeIsStart=false;

       //添加进度条
       root.addCountDown();

        //创建锤子
      root.hammer=new Hammer();
       root.hammer.x=Config.Layout.AdaptX(320-107/2);
       root.hammer.y=Config.Layout.AdaptY(700);

        //创建游戏容器
       root.createChapter();

       root.addChildAt(root.hammer,20);

       root.userMissTimes=0;
       
       root.addActivePart();
      
    }

    private activePart:egret.Sprite;
    private tutorialCon:egret.DisplayObjectContainer;
    private tutorialbtn2:egret.Bitmap;
    //游戏开始隐藏部分
    private addActivePart(){
        var root=this;
       root.activePart=Utils.Method.addSprite(root,0,root.height,root.width);

        root.activePart.y=root.stage.height;
        root.activePart.height=260;

        if(root.stage.height>1200){
             root.activePart.y=root.stage.height-100;
        }

        Utils.Method.setAnchorY(root.activePart,1);


        //开始游戏按钮
        root.toStartBtn=Utils.Method.addImageInContainer(root.activePart,"startBtn_png",320,220);
       Utils.Method.setAnchor(root.toStartBtn,0.5);

       //返回按钮
      
       root.toStartBtn.scaleX=root.toStartBtn.scaleY=0.8;
       
       root.toStartBtn.touchEnabled=true;
        root.toStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            //需检查游戏豆数量
            root.toStartBtn.touchEnabled=false;
            root.hammer.beat();
            egret.Tween.get(root.activePart).to({alpha:0},300).call(function(){
            if(root.activePart.parent){
                root.activePart.parent.removeChild(root.activePart);
            }
                root.toStart(); 
                root.meadow.gopherStartShow();
            });
        },root);
    }

    private toStart(){
        var root=this;
       root.parentObj.touchEnabled=true;
       root.parentObj.addEventListener(egret.TouchEvent.TOUCH_TAP,root.toStartEvent,root);

       //开启倒计时
       root.startCountDown();
    }


    private toStartEvent(e){
        var root=this;
        var touchX=e.stageX; 
           var touchY=e.stageY;
           root.hammer.x=touchX-30;
           root.hammer.y=touchY-150;
          root.hammer.beat();
    }

    private createChapter(){
        var root=this;
        //创建游戏
        root.meadow=new MeadowOfGopher(root,root.hammer,root.playTime,root.allowMissTimes,root.parentObj);
       root.meadow.width=root.width;
       root.meadow.height=Config.Layout.AdaptHeight(560);
       root.addChildAt(root.meadow,5);
       Utils.Method.setAnchor(root.meadow,0.5);
       root.meadow.x=Config.Layout.AdaptX(320);
       root.meadow.y=Config.Layout.AdaptY(1138/2+80);
    }

    private countDownComp:egret.Sprite;
    private progress:egret.TextField;
    private countDownTimeUp:egret.Bitmap;
    private countDownTimeUpV2:egret.Sprite;
    public countDownWidth:number;
    private addCountDown(){
        var root=this;
        root.countDownComp=Utils.Method.addSprite(root,320,200);
        var countDownBg:egret.Bitmap=Utils.Method.addImageInContainer(root.countDownComp,"timeBg_png",0,0);
        Utils.Method.setAnchor(root.countDownComp,0.5);

        root.countDownTimeUp=Utils.Method.addImageInContainer(root.countDownComp,"time_png",7,6);
        root.countDownTimeUp.alpha=0;

        root.countDownTimeUpV2=Utils.Method.addSpriteInContainer(root.countDownComp,7,6);
       
        root.countDownTimeUpV2.width=root.countDownTimeUp.width=root.countDownWidth=Config.Layout.AdaptWidth(40);

        Utils.Method.drawRoundRectBySprite(root.countDownTimeUpV2,0x86d03a,1,15,0,0,root.countDownTimeUpV2.width,root.countDownTimeUp.height,15);

        root.progress=Utils.Method.addTextFieldInContainer(root.countDownComp,"0%",0,10,18,0xffffff,true);
        root.progress.x=root.countDownTimeUp.width;
        root.progress.strokeColor=0xa16c31;
        root.progress.stroke=1;
        Utils.Method.setAnchorX(root.progress,1);
    }

    private coundDownFunc;
    private startCountDown(){
        var root=this;
        var second=0;
        root.coundDownFunc=setInterval(function(){
            second++;
        var addLength=(root.countDownComp.width-Config.Layout.AdaptWidth(58))/root.playTime;
        if(root.warnTimeIsStart && !root.warnTimeIsEnd){
           root.updateWarnTimePart(addLength);
        }
        root.countDownTimeUp.width+=addLength;

        root.countDownTimeUpV2.width+=addLength;
        Utils.Method.drawRoundRectBySprite(root.countDownTimeUpV2,0x86d03a,1,15,0,0,root.countDownTimeUpV2.width,root.countDownTimeUp.height,15);
        
        root.countDownWidth=root.countDownTimeUp.width;
    
            root.progress.x=root.countDownTimeUp.width;
            Utils.Method.setAnchorX(root.progress,1);
            root.progress.text=Math.floor(second/root.playTime*100)+"%";
            root.countDownComp.setChildIndex(root.progress,99);
            if(second==root.playTime){
                //console.log("撑住了");
               root.endCountDown();
                root.meadow.gopherEndShow();
                root.saveUserResult();
                
            }
        },200);
    }

    private warnTimeArr=[];
    public warnTimeIsAdd=false;
    public warnTimeIsStart=false;
    public warnTimeIsEnd=false;
    public addWarnTimePart(x:number){
        var root=this;
        
        var warnTime:egret.Sprite=Utils.Method.addSpriteInContainer(root.countDownComp,7,6);
        Utils.Method.drawRoundRectBySprite(warnTime,0xf82100,1,10,0,0,0,root.countDownTimeUp.height,10);

        warnTime.x=Config.Layout.AdaptXInContainer(x);
        warnTime.width=8+root.countDownWidth-x;
        root.warnTimeArr.push(warnTime);
    }

    public updateWarnTimePart(width){
        var root=this;
        var timeObj=root.warnTimeArr[root.warnTimeArr.length-1];
        timeObj.width+=width;
        Utils.Method.drawRoundRectBySprite(timeObj,0xf82100,1,10,0,0,timeObj.width,root.countDownTimeUp.height,10);
        
    }

    public endCountDown(){
        clearInterval(this.coundDownFunc);
    }

    
    public clearChildren() {
        this.removeChildren();
    }
    public clearLayer() {
        var root=this;
        if(root.parent){
            root.parent.removeChild(root);
        }
         root.parentObj.removeEventListener(egret.TouchEvent.TOUCH_TAP,root.toStartEvent,root);
    }

    private challengeID;
    public successHitTimes:number=0;
    public checkUserGame(){
        var root=this;
       // console.log("检查是否有游戏资格");
        window["loadingCover"]("show");
       //此处请求接口
        window["loadingCover"]("hide");
        if(1){                 
            root.challengeID='xxx';
            root.successHitTimes=0;
            root.enterGame();
        }else{
            root.parentObj.showTip("条件不足");
        }         
                       
    }

    public saveUserResult(){
        var root=this;
        //结果数据处理
        var num=root.successHitTimes+root.userMissTimes;
        var successScale=root.successHitTimes/num*100;
        var failScale=root.userMissTimes/num*100;
        //alert("success:"+root.successHitTimes+",fail:"+root.userMissTimes);
        window["loadingCover"]("show");
    
    window["loadingCover"]("hide");
    //判断游戏结果
    root.parentObj.touchEnabled=false;
    Utils.Method.readTextFile("mock/data.json", function(text){  
            var data = typeof text == "string"?JSON.parse(text):text;  
             if(root.userMissTimes<=data.gameData[root.parentObj.mockIndex].failTime){
                root.parentObj.touchEnabled=false;
                    new WinLayer(root.parentObj,root,data.prizeData[root.parentObj.mockIndex].prizeName,data.prizeData[root.parentObj.mockIndex].hasNext);                            
                }else{
                    new LoseLayer(root.parentObj,root,data.prizeData[root.parentObj.mockIndex].prizeName);
                }
     }); 
   }

    public addSuccessHitTimes(){
        this.successHitTimes+=1;
    }
}
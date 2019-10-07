class MeadowOfGopher extends BaseLayer implements IBaseScene{
    
    private playTime:number;
    private allowMissTimes:number;
    private parentObj:GameLayer;
    private proRoot:IndexLayer;

    private gopherShowTime:number=2000;
    private gophercreateTime:number=2000;
    public constructor(parentObj,hammer:Hammer,playTime:number,allowMissTimes:number,proRoot){
        super();
        this.parentObj=parentObj;
        this.hammer=hammer;
        this.playTime=playTime;
        this.allowMissTimes=allowMissTimes;
        this.gopherShowTime=parentObj.gopherShowTime;
        this.gophercreateTime=parentObj.gophercreateTime;
        //console.log(this.gopherShowTime);
        this.proRoot=proRoot;
        this.init();
    }

private hammer:Hammer;
private holeCenterLocationArr=[];
private holeArr=[];
private gopherMaskArr=[];

    public init(){
        var root=this;
        for(var i=0;i<8;i++){
            var row:egret.DisplayObjectContainer=root.createRow(i*65);
            var hole=root.createHole();
            root.holeArr.push(hole);
            row.addChild(hole);
            root.addChild(row);
            hole.x=Config.Layout.AdaptX(root.getRandomX())+hole.width/2;
            hole.y+=hole.height/2;
            Utils.Method.setAnchor(hole,0.5);
            var locTemp=new Array();
            locTemp.push(hole.x);
           // console.log("hole.x:"+hole.x);
            locTemp.push(row.y);
            locTemp.push(0);
            root.holeCenterLocationArr.push(locTemp);
            hole.showHole(i);
        }
        
    }

    private lastGopherLocIndex:number=-1;
    private gopherShowFunction;
    public gopherStartShow(){
        var root=this;
        //地洞随机产生地鼠
        var showfail:boolean=true;
        root.gopherShowFunction=setInterval(function(){
            var gopherArr=root.creatGopher();
            var gopher:Gopher=gopherArr[0];
            var index:number=gopherArr[1];

            var gopherCover:GopherCover=root.createGopherCover(index);
           
            gopher.scaleX=gopher.scaleY=0.4;
            gopherCover.scaleX=gopherCover.scaleY=0.4;
            
            root.addChild(gopher);
            root.addChild(gopherCover);
            
            root.holeCenterLocationArr[index][2]=1;

             //设置遮罩
            var gopherMask:egret.Shape = new egret.Shape();
            gopherMask.graphics.beginFill(0x0000ff);
            gopherMask.graphics.drawRect(gopher.x-gopher.width/2,gopher.y-gopher.height-10,gopher.width,gopher.height+10);
            gopherMask.graphics.endFill();
            root.addChild(gopherMask);

            gopher.mask=gopherMask;
            
            gopher.comeOut(gopher.y,50);
            gopherCover.comeOut(gopherCover.y,50);

            //没有敲击地鼠处理函数
            var notHit=setTimeout(function(){
                setTimeout(function(){
                    root.holeCenterLocationArr[index][2]=0;
                },1000);
                gopher.hide(gopher.y,50,function(){
                    setTimeout(function(){
                        gopherCover.hide();
                        gopher.remove();
                        if(gopherMask.parent){
                            gopherMask.parent.removeChild(gopherMask);
                        }
                        root.parentObj.userMissTimes++;
                        if(!root.parentObj.warnTimeIsAdd){
                            root.parentObj.warnTimeIsAdd=true;
                            root.parentObj.warnTimeIsEnd=false;
                            root.parentObj.addWarnTimePart(root.parentObj.countDownWidth);
                            root.parentObj.warnTimeIsStart=true;
                        }
                    },60);
                });

                
            },root.gopherShowTime);

            root.monitor(gopherCover,gopher,notHit,index,function(){
            setTimeout(function(){
                    root.holeCenterLocationArr[index][2]=0;
                },1000);
            if(gopherMask.parent){
                gopherMask.parent.removeChild(gopherMask);
            }


            });
        },root.gophercreateTime);
        
    }

    public gopherEndShow(){
        var root=this;
        clearInterval(root.gopherShowFunction);
    }

    //判断是否打中
    private monitor(gopherCover:GopherCover,gopher:Gopher,notHitFunc,gopherIndex,callback){
        var root=this;
        root.touchEnabled=true;
        root.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e:egret.TouchEvent){
      
        var touchX=e.stageX; 
        var touchY=e.stageY;
        root.hammer.x=touchX+10;
        root.hammer.y=touchY-Config.Layout.AdaptHeight(60);
        root.hammer.beat();

        var isHit=gopherCover.hitTestPoint(touchX,touchY);
        if(isHit){
            //console.log("打中了");
            gopherCover.hide();
            root.parentObj.warnTimeIsEnd=true;
            root.parentObj.warnTimeIsAdd=false;
            //取消setTimeout
            clearTimeout(notHitFunc);
            root.parentObj.addSuccessHitTimes();
            egret.Tween.removeTweens(gopher);
            gopher.beaten(root.holeCenterLocationArr[gopherIndex][1]+Config.Layout.AdaptHeight(45),50,callback);
        }
       },gopher);
    }

    private creatGopher():[Gopher,number]{
        var root=this;
        var index=root.getRandomIndex(root.holeArr);  
        var gopher:Gopher=new Gopher();
        //console.log(root.holeCenterLocationArr[index][0]+","+root.holeCenterLocationArr[index][1]);
        gopher.x=root.holeCenterLocationArr[index][0]+Config.Layout.AdaptWidth(12);
        gopher.y=root.holeCenterLocationArr[index][1]+Config.Layout.AdaptHeight(45);
        Utils.Method.setAnchorY(gopher,1);
        Utils.Method.setAnchorX(gopher,0.5);
        root.lastGopherLocIndex=index;
        return [gopher,index];
    }

    private createGopherCover(index):GopherCover{
        var root=this;
        var gopherCover:GopherCover=new GopherCover();
        gopherCover.x=root.holeCenterLocationArr[index][0]+Config.Layout.AdaptWidth(12);
        gopherCover.y=root.holeCenterLocationArr[index][1]+Config.Layout.AdaptHeight(45);
        Utils.Method.setAnchorY(gopherCover,1);
        Utils.Method.setAnchorX(gopherCover,0.5);
        return gopherCover;
    }

    private createRow(RowY:number):egret.DisplayObjectContainer{
        var root=this;
        var row=Utils.Method.addContainerInContainer(root,0,RowY,640,65);
        row.width=root.width;
        return row;
    }

    private createHole():Hole{
        var root=this;
        var hole:Hole=new Hole();
        return hole;
    }

    private lastRandomX:number=-1;
    private getRandomX():number{
        var root=this;
        var randomX=0;
        var v=170; 
        var stageWidth=root.stage.stageWidth;
        if(root.lastRandomX==-1){
            randomX=Math.round(Math.random()*(stageWidth-250));
            root.lastRandomX=randomX;
        }else{
            var isStandard=1;
            while(isStandard){
                randomX=Math.round(Math.random()*(stageWidth-250));
                if(
                    (randomX>root.lastRandomX+v
                    || 
                    randomX<root.lastRandomX-v)
                    && 
                    randomX>0 && randomX<=(stageWidth-250)
                ){
                    isStandard=0;
                }
            }
             root.lastRandomX=randomX;
        }
        
        return randomX;
    }


    private getRandomIndex(arr):number{
        var index=Math.round(Math.random()*(arr.length-1));
        return this.checkIndex(index);
    }

    //检查位置是否重复
    private checkIndex(index){
        var root=this;
        if(root.lastGopherLocIndex==index || root.holeCenterLocationArr[index][2]==1){
            index=root.getRandomIndex(root.holeArr);
            return root.checkIndex(index);
        }else{
            return index;
        }
        
    }

}
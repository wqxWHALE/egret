//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  code by wqxWhale 2019/8/10
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        this.createGameScene();
    }


    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private provinceText:egret.TextField;
    private cityText:egret.TextField;
    private citySelector:CitySelector;
    private createGameScene() {

        var root=this;
        var provinceText:egret.TextField=root.provinceText=new egret.TextField();
        var cityText:egret.TextField=root.cityText=new egret.TextField();

        provinceText.size=cityText.size=32;
        provinceText.width=cityText.width=200;
        provinceText.y=cityText.y=300;
         provinceText.textColor=cityText.textColor=0x474747;

        var chooseBtn:egret.Sprite=new egret.Sprite();
        chooseBtn.y=400;
        chooseBtn.x=320;
        chooseBtn.width=90;
        chooseBtn.height=45;
        chooseBtn.graphics.beginFill(0x07c160, 1);
        chooseBtn.graphics.drawRoundRect(0, 0, 90 ,45, 0, 0);
        chooseBtn.graphics.endFill();

        root.addChild(chooseBtn);
        chooseBtn.anchorOffsetX=chooseBtn.width*0.5

        var chooseText: egret.TextField = new egret.TextField();
        chooseText.height = 45;
        chooseText.width = 90;
        chooseText.text="选择";
        chooseText.size=24;
        chooseText.textColor=0xffffff;
        chooseText.verticalAlign = egret.VerticalAlign.MIDDLE;
        chooseText.textAlign = egret.HorizontalAlign.CENTER;

        chooseBtn.addChild(chooseText);


       
        provinceText.x=160;
        cityText.x=480;
        provinceText.verticalAlign= cityText.verticalAlign = egret.VerticalAlign.MIDDLE;
        provinceText.textAlign= cityText.textAlign = egret.HorizontalAlign.CENTER;
        provinceText.anchorOffsetX=cityText.anchorOffsetX=100;


        root.addChild(provinceText);
        root.addChild(cityText);
        root.addChild(chooseBtn);


        chooseBtn.touchEnabled=true;
        chooseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            //控件调用
            var bg:egret.Sprite=root.createContainer(0.4);
            root.citySelector=new CitySelector(root.stage.stageHeight);
            root.addChild(bg);
            root.addChild(root.citySelector);
            root.citySelector.anchorOffsetY=root.citySelector.height;
            root.citySelector.confirm(function(province,city){
                if(bg.parent){
                    bg.parent.removeChild(bg);
                }
                root.provinceText.text=province;
                root.cityText.text=city;
            });
            root.citySelector.hide(function(){
                if(bg.parent){
                    bg.parent.removeChild(bg);
                }
            });
        },root);
    }

    //创建透明层
    private createContainer(alpha: number = 0) {
        var root = this;
        var container: egret.Sprite;
        container = new egret.Sprite();
        container.graphics.beginFill(0x1F1F1F, alpha);
        container.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        container.graphics.endFill();
        container.touchEnabled = true;
        container.x = container.y = 0;
        container.width = this.stage.stageWidth;
        container.height = this.stage.stageHeight;
        return container;
    }

}
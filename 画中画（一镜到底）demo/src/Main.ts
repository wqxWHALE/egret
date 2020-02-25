//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//
//  code by wqxWhale 2020/02 e-mail:844130791@qq.com
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
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
    }

    
    private async loadResource() {
        var that=this;
        try {
             await RES.loadConfig("resource/default.res.json", "resource/");
            //await RES.loadGroup("preload");
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);

            await RES.loadGroup("loading", 0, loadingView);

            setTimeout(function(){
                egret.Tween.get(loadingView).to({alpha:0},200).call(function(){
                    this.stage.removeChild(loadingView);
                });
            },100);
            
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    private gameLayer: egret.DisplayObjectContainer;
    private topLayer:egret.DisplayObjectContainer;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
        var root = this;
        //创建游戏layer
        root.gameLayer = new egret.DisplayObjectContainer();
        root.gameLayer.name = "gameLayer";
        root.addChild(root.gameLayer);
        root.gameLayer.height = root.height;
        root.gameLayer.width = root.width;
        //创建顶层layer
        root.topLayer = new egret.DisplayObjectContainer();
        root.topLayer.name = "topLayer";
        root.addChild(root.topLayer);
        root.topLayer.height = root.height;
        root.topLayer.width = root.width;
        //开始创建场景
        AppScene.createScene(root.gameLayer, root.topLayer, root.width, root.height);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
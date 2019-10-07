//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//
//  code by wqxWhale 2019/07 e-mail:844130791@qq.com
//
//////////////////////////////////////////////////////////////////////////////////////
 class AppScene extends BaseAppScene{
     public static stepnum:number=0;
     public static tutorial:boolean;
     public static settingPass:boolean=true;
     public static host:string;
     public static createScene(gameLayer: egret.DisplayObjectContainer, topLayer: egret.DisplayObjectContainer, width: number, height: number,baseData) {
        AppScene.gameLayer = gameLayer;
        AppScene.topLayer = topLayer;
        AppScene.Width = width;
        AppScene.Height = height;

        this.host=document.getElementById("host")["value"];

        //进入游戏页面
        var indexLayer=new IndexLayer(baseData);

        this.sound1 = AppScene.createMusic("sound1", "resource/music/beat.mp3", false, false);
        this.sound2 = AppScene.createMusic("sound2", "resource/music/mouse.mp3", false, false);
    }

    public static sound1;
    public static sound2;

    public static addComponent(root,scoureName:string,text:string,x:number,y:number,textX:number,textY:number):egret.Sprite{
        var component:egret.Sprite=Utils.Method.addSpriteInContainer(root,x,y);
        var bg:egret.Bitmap=Utils.Method.addImageInContainer(component,scoureName,0,0);
        var comName:egret.TextField=Utils.Method.addTextFieldInContainer(component,text,textX,textY,18,0xffffff);
       //comName.y=textY;
       component.x=component.x+component.width/2;
       //component.y=Config.Layout.AdaptY(y);
        Utils.Method.setAnchor(component,0.5);
        
        return component;
    }
}
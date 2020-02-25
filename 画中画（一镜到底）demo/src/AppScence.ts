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
     public static createScene(gameLayer: egret.DisplayObjectContainer, topLayer: egret.DisplayObjectContainer, width: number, height: number) {
        AppScene.gameLayer = gameLayer;
        AppScene.topLayer = topLayer;
        AppScene.Width = width;
        AppScene.Height = height;


        //进入游戏页面
        var indexLayer=new IndexLayer();

    }

}
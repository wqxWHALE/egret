class Hammer extends egret.Sprite{
    public constructor(){
        super();
        this.init();
    }

    private hammer:egret.Bitmap;
    private init(){
        var root=this;
        root.width=Config.Layout.AdaptWidth(107);
        root.height=Config.Layout.AdaptHeight(139);
        root.hammer=Utils.Method.addImageInContainer(root,"hammer_png",107,139);
        Utils.Method.setAnchor(root.hammer,1);
    }

    public beat(){
        var root=this;
        var status=document.getElementById("vibrateOnOff")["value"];
         if(status=="ON"){
             window["vibration"]();
         }else{
             AppScene.sound1.play();
         }
         egret.Tween.get(root.hammer)
         .to({rotation:45},50,egret.Ease.quadIn)
         .to({rotation:-45},50,egret.Ease.quadIn)
         .to({rotation:0},50,egret.Ease.quadIn);
         
    }
}
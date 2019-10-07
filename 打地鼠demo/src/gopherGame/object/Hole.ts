class Hole extends egret.Sprite{
    public constructor(){
        super();
        this.init();
    }

    private holeArr=["hole01_png","hole02_png"];
    private holeImg:egret.Bitmap;

    private init(){
        var root=this;
        var imgSourceName=root.holeArr[root.getRandomIndex(root.holeArr)];
        root.holeImg = Utils.Method.addImageInContainer(root,imgSourceName,0,0);
        root.scaleX=root.scaleY=0;
    }

    public showHole(i){
        var root=this;
        //egret.Tween.get(root).wait(300*i).to({scaleX:1,scaleY:1},1000,egret.Ease.bounceInOut);
        egret.Tween.get(root).to({scaleX:1.1,scaleY:1.1},1000,egret.Ease.bounceInOut);
    }

    private getRandomIndex(arr):number{
        var index=Math.round(Math.random()*(arr.length-1));
        return index;
    }

}
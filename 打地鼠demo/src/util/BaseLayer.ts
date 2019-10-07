class BaseLayer extends egret.DisplayObjectContainer {
    public constructor(parent: egret.DisplayObjectContainer = AppScene.gameLayer, layerWidth: number = AppScene.Width, layerHeight: number = AppScene.Height) {
        super();
        this.width = layerWidth;
        this.height = layerHeight;
        this.parentContainer = parent;
    }

    /**设置背景图*/
    public setBgImage(sourceKey: string): egret.Bitmap {
        var bg = Utils.Method.createBitmapByName(sourceKey);
        bg.width = this.width;
        bg.height = this.height;
        bg.x = 0;
        bg.y = 0;
        this.addChildAt(bg, 0);
        return bg;
    }

    private _parentContainer: egret.DisplayObjectContainer;

    public get parentContainer() {
        return this._parentContainer;
    }
    public set parentContainer(value: egret.DisplayObjectContainer) {
        this._parentContainer = value;
        value.addChild(this);
    }
    
    /**清空场景*/
    public clearScene() {
        egret.Tween.removeAllTweens();
        this.removeChildren();
        this.parentContainer.removeChild(this);
        if (AppScene.musicUI) {
            AppScene.musicUI.resumeAnimate();
        }
    }
    

}
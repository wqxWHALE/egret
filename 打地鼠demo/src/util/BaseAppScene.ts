class BaseAppScene{

    /**公共组件MusicUI*/
    public static musicUI:MusicUI;

     /**舞台宽度*/
    public static Width: number;
    /**舞台高度*/
    public static Height: number;

    public static gameLayer: egret.DisplayObjectContainer;
    public static topLayer: egret.DisplayObjectContainer;

    public static createMusic(elementID: string, src: string, isAutoPlay: boolean = true, isLoop: boolean = false) {
        // var music = <HTMLAudioElement> document.getElementById(elementID);
        // if (music) {
        //     throw new Error("已存在名为‘" + elementID + "’的<audio>标签，不可重复创建");
        // }
        var music = document.createElement("audio");
        document.getElementsByTagName("body")[0].appendChild(music);
        music.id = elementID;
        music.style.display = "none";
        music.src = src;
        music.loop = isLoop;
        if (isAutoPlay) {
            music.play();
        }
        return music;
    }


}

interface IBaseScene{
    init();
}
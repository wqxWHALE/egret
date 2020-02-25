var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseAppScene = (function () {
    function BaseAppScene() {
    }
    BaseAppScene.createMusic = function (elementID, src, isAutoPlay, isLoop) {
        if (isAutoPlay === void 0) { isAutoPlay = true; }
        if (isLoop === void 0) { isLoop = false; }
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
    };
    return BaseAppScene;
}());
__reflect(BaseAppScene.prototype, "BaseAppScene");
//# sourceMappingURL=BaseAppScene.js.map
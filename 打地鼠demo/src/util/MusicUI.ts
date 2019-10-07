class MusicUI extends egret.DisplayObjectContainer {
        /**背景音乐播放按钮*/
        public constructor(parent: egret.DisplayObjectContainer, x?: number, y?: number) {
            super();
            parent.addChild(this);
            this.parentContainer = parent;
            this.createView(x, y);
        }
        private isHtmlAudio: boolean = false;

        public htmlAudio: HTMLAudioElement;
        public setHtmlAudio(elementID: string, src: string, isBuild: boolean = true) {
            if (isBuild) {
                this.htmlAudio = document.createElement("audio");
                this.htmlAudio.volume = 0.7;
                document.getElementsByTagName("body")[0].appendChild(this.htmlAudio);
                this.htmlAudio.id = elementID;
                this.htmlAudio.style.display = "none";
            } else {
                this.htmlAudio = <HTMLAudioElement>document.getElementById(elementID);
            }
            if (src.length != 0) {
                this.htmlAudio.src = src;
            }
            this.isHtmlAudio = true;
        }

        public parentContainer: egret.DisplayObjectContainer;

        public button: egret.Bitmap;

        public isStop: boolean;

        private createView(x?: number, y?: number): void {
            this.button = new egret.Bitmap(RES.getRes("music_png"));
            this.addChild(this.button);
            this.button.x = 0;
            this.button.y = 0;
            this.button.anchorOffsetX = this.button.width / 2;
            this.button.anchorOffsetY = this.button.height / 2;
            this.button.touchEnabled = true;
            this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleClick, this);
            this.x = x ? x : this.parentContainer.width - this.button.width - 20;
            //this.x = this.button.width / 2 + 80
            this.y = y ? y : this.button.height / 2 + 20;
            this.isStop = true; 
        }
       
        /**模拟点击切换音乐播放或暂停*/
        public toggleClick() {
            this.PlayOrStop();
        }
        
        /**音乐播放或暂停*/
        private PlayOrStop() {
            if (this.isStop) {
                this.buttonAnimate();
                this.isStop = false;

                if (this.isHtmlAudio) {
                    this.htmlAudio.loop = true;
                    this.htmlAudio.play();
                } else {
                    throw new Error("还没有设置背景音乐源文件，请调用setHtmlAudio方法完成设置");
                }
            } else {
                egret.Tween.removeTweens(this.button);
                this.button.rotation = 0;
                this.isStop = true;

                if (this.isHtmlAudio) {
                    this.htmlAudio.pause();
                } else {
                    throw new Error("还没有设置背景音乐源文件，请调用setHtmlAudio方法完成设置");
                }
            }
        }
        /**暂停*/
        public pause() {
            if (!this.isStop) {
                egret.Tween.removeTweens(this.button);
                this.button.rotation = 0;
                this.isStop = true;

                if (this.isHtmlAudio) {
                    this.htmlAudio.pause();
                } else {
                    throw new Error("还没有设置背景音乐源文件，请调用setHtmlAudio方法完成设置");
                }
            }
        }
       
        /**播放*/
        public play() {
            if (this.isStop) {
                this.buttonAnimate();
                this.isStop = false;

                if (this.isHtmlAudio) {
                    this.htmlAudio.loop = true;
                    this.htmlAudio.play();
                } else {
                    throw new Error("还没有设置背景音乐源文件，请调用setHtmlAudio方法完成设置");
                }
            }
        }
        private buttonAnimate() {
            egret.Tween.get(this.button).to({ rotation: 360 }, 2000).call(this.buttonAnimate, this, [360]);
        }

        /**继续执行MusicUI动画*/
        public resumeAnimate() {
            if (!this.isStop) {
                egret.Tween.get(this.button).to({ rotation: 360 }, 2000).call(this.resumeAnimate, this);
            }
        }
    }
class CitySelector extends egret.Sprite{
    
    private citySelectorY:number;//舞台高度

    public constructor(citySelectorY:number){
        super();
        this.citySelectorY=citySelectorY;
        this.init();
    }

    private cancelBtn:egret.Sprite;
    private sureBtn:egret.Sprite;
    private locationTip;
    private province;
    private city;
    private init(){
        var root=this;
        //设置控件属性
        root.x=0;
        root.y=this.citySelectorY;
        root.width=640;
        root.height=350;
        
        root.graphics.beginFill(0xffffff, 1);
        root.graphics.drawRoundRect(0, 0, 640 ,350, 0, 0);
        root.graphics.endFill();

        root.anchorOffsetY=root.height * 0.5;

        //控件按钮
        var btnBox:egret.Sprite=new egret.Sprite();
        btnBox.x=btnBox.y=0;
        btnBox.width=640;
        btnBox.height=70;
        btnBox.graphics.beginFill(0xf5f5f5, 1);
        btnBox.graphics.drawRoundRect(0, 0, root.width ,65, 0, 0);
        btnBox.graphics.endFill();

        root.addChild(btnBox);

        root.cancelBtn=new egret.Sprite();
        root.cancelBtn.x=root.cancelBtn.y=10;
        root.cancelBtn.width=90;
        root.cancelBtn.height=45;
        root.cancelBtn.graphics.beginFill(0x07c160, 1);
        root.cancelBtn.graphics.drawRoundRect(0, 0, 90 ,45, 20, 20);
        root.cancelBtn.graphics.endFill();

        btnBox.addChild(root.cancelBtn);

        var cancelText: egret.TextField = new egret.TextField();
        cancelText.height = 45;
        cancelText.width = 90;
        cancelText.text="取消";
        cancelText.size=24;
        cancelText.textColor=0xffffff;
        cancelText.verticalAlign = egret.VerticalAlign.MIDDLE;
        cancelText.textAlign = egret.HorizontalAlign.CENTER;

        root.cancelBtn.addChild(cancelText);

        root.sureBtn=new egret.Sprite();
        root.sureBtn.x=root.width-10;
        root.sureBtn.y=10;
        root.sureBtn.width=90;
        root.sureBtn.height=45;
        root.sureBtn.graphics.beginFill(0x07c160, 1);
        root.sureBtn.graphics.drawRoundRect(0, 0, 90 ,45, 20, 20);
        root.sureBtn.graphics.endFill();

        btnBox.addChild(root.sureBtn);

        root.sureBtn.anchorOffsetX=root.sureBtn.width;

        var sureText: egret.TextField = new egret.TextField();
        sureText.height = 45;
        sureText.width = 90;
        sureText.text="确定";
        sureText.size=24;
        sureText.textColor=0xffffff;
        sureText.verticalAlign = egret.VerticalAlign.MIDDLE;
        sureText.textAlign = egret.HorizontalAlign.CENTER;

        root.sureBtn.addChild(sureText);

        root.showLocationChose();


    }

    private locationFirstScroller: egret.ScrollView;
    private locationSecondScroller: egret.ScrollView;
    private locationLeftPart: egret.Sprite;
    private locationRightPart: egret.Sprite;

    private firstIndex: number = 0;
    private secondIndex: number = 0;
    //地点选择：一级选择
    private showLocationChose() {
        var root = this;
        root.firstIndex = root.secondIndex = 0;

        var row:egret.Sprite=new egret.Sprite();
        row.x=0;
        row.y=190;
        row.width=640;
        row.height=50;
        row.graphics.beginFill(0xCCCCCC, 0.4);
        row.graphics.drawRoundRect(0, 0 ,640 ,50, 0, 0);
        row.graphics.endFill();
        root.addChild(row);


        root.locationLeftPart=new egret.Sprite();
        root.locationLeftPart.x=0;
        root.locationLeftPart.y=120;
        root.locationLeftPart.width=320;
      
        root.addChild(root.locationLeftPart);


        //一级菜单滚动
        var firstChoseY = 0;
        for (var i = 0; i < root.firstChose.length; i++) {
            var chose:egret.Sprite=new egret.Sprite();
            chose.x=0;
            chose.y=firstChoseY;
            chose.width=320;
            chose.height=50;
            root.locationLeftPart.addChild(chose);

            var choseText:egret.TextField=new egret.TextField();
            choseText.text=root.firstChose[i][0].toString();
            choseText.x=choseText.y=0;
            choseText.width = root.width/2;
            choseText.size=24;
            choseText.textColor=0X999999;
            choseText.height=50;
            choseText.verticalAlign = egret.VerticalAlign.MIDDLE;
            choseText.textAlign = egret.HorizontalAlign.CENTER;
            firstChoseY += 50;
            chose.addChild(choseText);
        }


        var chose:egret.Sprite=new egret.Sprite();
        chose.x=0;
        chose.y=firstChoseY;
        chose.width=320;
        chose.height=215;
        root.locationLeftPart.addChild(chose);

        var choseText:egret.TextField=new egret.TextField();
        choseText.height = 215;
        choseText.width = 320;
        choseText.size=24;
        choseText.textColor=0x999999;
        choseText.verticalAlign = egret.VerticalAlign.MIDDLE;
        choseText.textAlign = egret.HorizontalAlign.CENTER;
        
        chose.addChild(choseText);


        root.locationFirstScroller = new egret.ScrollView();
        root.locationFirstScroller.x=0;
        root.locationFirstScroller.y=70;
        root.locationFirstScroller.width=320;
        root.locationFirstScroller.height=250;
        root.locationFirstScroller.bounces = false;
        root.addChild(root.locationFirstScroller);
        root.locationFirstScroller.setContent(root.locationLeftPart);

        root.locationFirstScroller.addEventListener(egret.Event.CHANGE, this.onLocationChange, this);

        //二级菜单
        root.showSecondChose(0);

    }

    //菜单联动
    private onLocationChange(event: egret.Event) {
        var root = this;
        var adaptY = 50;
        var check = (root.locationFirstScroller.scrollTop - 25) / adaptY;
        if (check >= 0.25) {
            root.firstIndex = Math.ceil(check);
            //console.log(index);
            if (root.firstIndex != root.firstChose.length) {
                root.showSecondChose(root.firstIndex);
            }
        } else {
            root.showSecondChose(0);
        }
    }


    //二级选择
    private showSecondChose(index) {
        var root = this;
        var secondChoseY = 0;
        if (root.contains(root.getChildByName("locationSecondScroller"))) {
            root.removeChild(root.getChildByName("locationSecondScroller"));
        }
      
        root.locationRightPart=new egret.Sprite();
        root.locationRightPart.x=0;
        root.locationRightPart.y=120;
        root.locationRightPart.width=320;
      
        root.addChild(root.locationRightPart);

        for (var i = 0; i < root.secondChose[index].length; i++) {
            var chose:egret.Sprite=new egret.Sprite();
            chose.x=0;
            chose.y=secondChoseY;
            chose.width=320;
            chose.height=50;
            root.locationRightPart.addChild(chose);

            var choseText:egret.TextField=new egret.TextField();
            choseText.text= root.secondChose[index][i][0].toString();
            choseText.x=choseText.y=0;
            choseText.width = root.width/2;
            choseText.size=24;
            choseText.textColor=0X999999;
            choseText.height=50;
            choseText.verticalAlign = egret.VerticalAlign.MIDDLE;
            choseText.textAlign = egret.HorizontalAlign.CENTER;
            secondChoseY += 50;
            chose.addChild(choseText);
        }

        var chose:egret.Sprite=new egret.Sprite();
        chose.x=0;
        chose.y=secondChoseY;
        chose.width=320;
        chose.height=215;
        root.locationRightPart.addChild(chose);

        var choseText:egret.TextField=new egret.TextField();
        choseText.height = 215;
        choseText.width = 320;
        choseText.size=24;
        choseText.textColor=0x999999;
        choseText.verticalAlign = egret.VerticalAlign.MIDDLE;
        choseText.textAlign = egret.HorizontalAlign.CENTER;
        
        chose.addChild(choseText);

        //二级菜单滚动
        root.locationSecondScroller = new egret.ScrollView();
        root.locationSecondScroller.x=320;
        root.locationSecondScroller.y=70;
        root.locationSecondScroller.width=320;
        root.locationSecondScroller.height=250;
        root.locationSecondScroller.bounces = false;
        root.locationSecondScroller.name = "locationSecondScroller";
        root.addChild(root.locationSecondScroller);
        root.locationSecondScroller.setContent(root.locationRightPart);

        root.locationSecondScroller.addEventListener(egret.Event.CHANGE, this.getSecondIndex, this);

    }

    private getSecondIndex(event: egret.Event) {
        var root = this;
        var adaptY = 50;
        var check = (root.locationSecondScroller.scrollTop - 25) / adaptY;
        if (check >= 0.25) {
            root.secondIndex = Math.ceil(check);

        } else {
            root.secondIndex = 0;
        }
    }

    public hide(callback=null){
        var root=this;
        root.cancelBtn.touchEnabled=true;
        root.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            var root=this;
            if(root.parent){
                root.parent.removeChild(root);
            }
            callback && callback();
        },root);
        
    }

    public confirm(calback){
        var root=this;
        root.sureBtn.touchEnabled=true;
        root.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                root.province=root.firstChose[root.firstIndex][0];
                root.city = root.secondChose[root.firstIndex][root.secondIndex][0];
                root.locationTip = root.secondChose[root.firstIndex][root.secondIndex][2];
                if(root.parent){
                     root.parent.removeChild(root);
                }
                calback && calback(root.province,root.city);
            }, root);
    } 

    private firstChose = [
        ["北京", 0], ["上海", 0], ["天津", 0], ["重庆", 0],
        ["广东省", 25],["黑龙江省", 1], ["吉林省", 2], ["辽宁省", 3],
        ["内蒙古", 4], ["河北省", 5], ["新疆", 6],
        ["甘肃省", 7], ["青海省", 8], ["陕西省", 9],
        ["宁夏", 10], ["河南省", 11], ["山东省", 12],
        ["山西省", 13], ["安徽省", 14], ["湖北省", 15],
        ["湖南省", 16], ["江苏省", 17], ["四川省", 18],
        ["贵州省", 19], ["云南省", 20], ["广西省", 21],
        ["西藏", 22], ["浙江省", 23], ["江西省", 24],
        ["福建省", 26], ["海南省", 27],
        ["台湾", 0], ["香港", 0], ["澳门", 0]
    ];

    private secondChose = [
        [
            ["北京","beijing", ""]
        ],
        [
            ["上海", "shanghai", ""]
        ],
        [
            ["天津", "tianjing", ""]
        ],
        [
            ["重庆", "chongqing",""]
        ],
        [
            ["广州", "guangzhou",""], ["深圳", "shengzhen", ""], ["珠海", "zhuhai", ""],
            ["汕头", "chaoshan",""], ["韶关", "guangdong",  ""], ["佛山", "foshan",  ""],
            ["江门", "guangdong",""], ["湛江", "zhanjiang", ""], ["茂名", "guangdong",  ""],
            ["肇庆", "zhaoqing",""], ["惠州", "guangdong",  ""], ["梅州", "meizhou",  ""],
            ["汕尾", "guangdong",""], ["河源", "heyuan", ""], ["阳江", "yangjiang",  ""],
            ["清远", "guangdong", ""], ["东莞", "dongguang",""], ["中山", "guangdong",  ""],
            ["潮州", "guangdong", ""], ["揭阳", "guangdong", ""], ["云浮", "guangdong",  ""]
        ],
        [
            ["哈尔滨", "haerbin", ""], ["齐齐哈尔", "heilongjiang", ""], ["鹤岗", "heilongjiang",""],
            ["双鸭山", "heilongjiang", ""], ["鸡西", "heilongjiang", ""], ["大庆", "daqing", ""],
            ["伊春", "heilongjiang", ""], ["牡丹江", "heilongjiang", ""], ["佳木斯", "heilongjiang", ""],
            ["七台河", "heilongjiang", ""], ["黑河", "heilongjiang", ""], ["绥化", "heilongjiang", ""],
            ["大兴安岭", "heilongjiang", ""]
        ],
        [
            ["长春", "changchun", ""], ["吉林", "jilin", ""], ["四平", "jilinsheng",""],
            ["辽源", "jilinsheng",""], ["通化", "jilinsheng",""], ["白山", "jilinsheng",""],
            ["松原", "jilinsheng",""], ["白城", "jilinsheng",""], ["延边", "jilinsheng",""]

        ],
        [
            ["沈阳", "shengyang",""], ["大连", "dalian",""], ["鞍山", "liaoningsheng",""],
            ["抚顺", "liaoningsheng", ""], ["本溪", "liaoningsheng", ""], ["丹东", "liaoningsheng",""],
            ["锦州", "liaoningsheng", ""], ["营口", "liaoningsheng", ""], ["阜新", "liaoningsheng", ""],
            ["辽阳", "liaoningsheng", ""], ["盘锦", "liaoningsheng", ""], ["铁岭", "liaoningsheng", ""],
            ["朝阳", "liaoningsheng", ""], ["葫芦岛", "liaoningsheng", ""]
        ],
        [
            ["呼和浩特", "neimenggu", ""], ["包头", "neimenggu",""], ["乌海", "neimenggu",""],
            ["赤峰", "neimenggu",""], ["通辽", "neimenggu",""], ["鄂尔多斯", "neimenggu",""],
            ["呼伦贝尔", "neimenggu",""], ["巴彦淖尔", "neimenggu",""], ["乌兰察布", "neimenggu", ""],
            ["锡林郭勒盟", "neimenggu",""], ["兴安盟", "neimenggu", ""], ["阿拉善盟", "neimenggu", ""]
        ],
        [
            ["石家庄", "shijiazhuang",""], ["唐山", "hebei",""], ["秦皇岛", "hebei",""],
            ["邯郸", "hebei",""], ["邢台", "hebei",""], ["保定", "hebei",""],
            ["张家口", "hebei",""], ["承德", "hebei",""], ["沧州", "hebei",""],
            ["廊坊", "hebei",""], ["衡水", "hebei",""]
        ],
        [
            ["乌鲁木齐", "xinjiang", ""], ["克拉玛依", "xinjiang", ""], ["吐鲁番", "xinjiang", ""],
            ["哈密", "xinjiang", ""], ["和田", "xinjiang", ""], ["阿克苏", "xinjiang", ""],
            ["喀什", "xinjiang", ""], ["塔城", "xinjiang", ""], ["阿勒泰", "xinjiang", ""],
            ["克州", "xinjiang", ""], ["巴音州", "xinjiang", ""], ["昌吉州", "xinjiang", ""],
            ["博州", "xinjiang", ""], ["伊犁州", "xinjiang", ""], ["石河子", "xinjiang", ""],
            ["阿拉尔", "xinjiang", ""], ["图木舒克", "xinjiang", ""], ["五家渠", "xinjiang", ""],
            ["北屯", "xinjiang", ""], ["铁门关", "xinjiang", ""], ["双河", "xinjiang", ""],
            ["可克达拉", "xinjiang", ""], ["昆玉", "xinjiang", ""]
        ],
        [
            ["兰州", "gansu", ""], ["金昌", "gansu", ""], ["白银", "gansu", ""],
            ["天水", "gansu", ""], ["嘉峪关", "gansu", ""], ["武威", "gansu", ""],
            ["张掖", "gansu", ""], ["平凉", "gansu", ""], ["酒泉", "gansu", ""],
            ["庆阳", "gansu", ""], ["定西", "gansu", ""], ["陇南", "gansu", ""],
            ["临夏州", "gansu", ""], ["甘南州", "gansu", ""]
        ],
        [
            ["西宁", "qinghai", ""], ["海东", "qinghai", ""], ["海北州", "qinghai", ""],
            ["黄南州", "qinghai", ""], ["海南州", "qinghai", ""], ["果洛州", "qianghai", ""],
            ["玉树州", "qinghai", ""], ["海西州", "qinghai", ""]
        ],
        [
            ["西安", "xian",""], ["铜川", "shanxisheng",""], ["宝鸡", "shanxisheng",""],
            ["咸阳", "shanxisheng", ""], ["渭南", "shanxisheng", ""], ["延安", "shanxisheng",""],
            ["汉中", "shanxisheng", ""], ["榆林", "shanxisheng", ""], ["安康", "shanxisheng", ""],
            ["商洛", "shanxisheng", ""]
        ],
        [
            ["银川", "ningxia", ""], ["石嘴山", "ningxia", ""], ["吴忠", "ningxia", ""],
            ["固原", "ningxia", ""], ["中卫", "ningxia", ""]
        ],
        [
            ["郑州", "zhengzhou",""], ["开封", "kaifeng",""], ["洛阳", "luoyang",""],
            ["平顶山", "henan", ""], ["安阳", "henan", ""], ["鹤壁", "henan", ""],
            ["新乡", "henan", ""], ["焦作", "henan", ""], ["濮阳", "henan", ""],
            ["许昌", "henan",""], ["漯河", "henan", ""], ["三门峡", "shanmengxia",""],
            ["南阳", "henan", ""], ["商丘", "henan", ""], ["信阳", "henan", ""],
            ["周口", "henan", ""], ["驻马店", "henan", ""]
        ],
        [
            ["济南", "jinan",""], ["青岛", "qingdao",""], ["淄博", "zibo",""],
            ["枣庄", "shangdong",""], ["东营", "shangdong",""], ["烟台", "yantai",""],
            ["潍坊", "weifang",""], ["济宁", "shangdong",""], ["泰安", "taian",""],
            ["威海", "weihai",""], ["日照", "rizhao",""], ["莱芜", "shangdong",""],
            ["临沂", "shangdong",""], ["德州", "shangdong",""], ["聊城", "shangdong",""],
            ["菏泽", "shangdong",""], ["滨洲", "shangdong",""]
        ],
        [
            ["太原", "taiyuan",""], ["大同", "datong",""], ["朔州", "shanxi",""],
            ["阳泉", "shanxi", ""], ["长治", "shanxi", ""], ["忻州", "shanxi", ""],
            ["吕梁", "shanxi", ""], ["晋中", "shanxi", ""], ["临汾", "shanxi", ""],
            ["运城", "shanxi", ""], ["晋城", "shanxi", ""]
        ],
        [
            ["合肥", "hefei", ""], ["巢湖", "anhui", ""],["芜湖", "anhui", ""], ["蚌埠", "anhui", ""],
            ["淮南", "anhui", ""], ["马鞍山", "maanshan", ""], ["淮北", "anhui", ""],
            ["铜陵", "anhui", ""], ["安庆", "anhui", ""], ["黄山", "anhui", ""],
            ["滁州", "anhui", ""], ["阜阳", "anhui", ""], ["宿州", "anhui", ""],
            ["六安", "anhui", ""], ["亳州", "anhui", ""], ["池州", "anhui", ""],
            ["宣城", "anhui", ""]
        ],
        [
            ["武汉", "wuhan", ""], ["黄石", "hubei", ""], ["十堰", "hubei", ""],
            ["荆州", "hubei", ""], ["宜昌", "hubei", ""], ["襄阳", "hubei", ""],
            ["鄂州", "hubei", ""], ["荆门", "hubei", ""], ["孝感", "hubei", ""],
            ["黄冈", "hubei", ""], ["咸宁", "hubei", ""], ["随州", "hubei", ""],
            ["恩施州", "hubei", ""], ["天门", "hubei", ""], ["潜江", "hubei", ""],
            ["仙桃", "hubei", ""], ["神农架", "hubei", ""]
        ],
        [
            ["长沙", "changsha", ""], ["株洲", "hunan", ""], ["湘潭", "hunan", ""],
            ["衡阳", "hengshan", ""], ["邵阳", "hunan", ""], ["岳阳", "hunan", ""],
            ["常德", "hunan", ""], ["张家界", "zhangjiajie", ""], ["益阳", "hunan", ""],
            ["郴州", "chenzhou", ""], ["永州", "hunan", ""], ["怀化", "hunan", ""],
            ["娄底", "hunan", ""], ["湘西州", "fenghuang", ""]
        ],
        [
            ["南京", "nanjing", ""], ["无锡", "10872", ""], ["徐州", "jiangshu", ""],
            ["常州", "jiangshu", ""], ["苏州", "suzhou", ""], ["南通", "jiangshu", ""],
            ["连云港", "jiangshu", ""], ["淮安", "jiangshu", ""], ["盐城", "jiangshu", ""],
            ["扬州", "yangzhou", ""], ["镇江", "jiangshu", ""], ["泰州", "jiangshu", ""],
            ["宿迁", "jiangshu", ""]
        ],
        [
            ["成都", "chengdu", ""], ["自贡", "sichun", ""], ["攀枝花", "sichun", ""],
            ["泸州", "sichun", ""], ["德阳", "sichun", ""], ["绵阳", "sichun", ""],
            ["广元", "sichun", ""], ["遂宁", "sichun", ""], ["内江", "sichun", ""],
            ["乐山", "leshan", ""], ["南充", "sichun", ""], ["眉山", "emeishan", ""],
            ["宜宾", "sichun", ""], ["广安", "sichun", ""], ["达州", "sichun", ""],
            ["雅安", "sichun", ""], ["巴中", "sichun", ""], ["资阳", "sichun", ""],
            ["阿坝州", "sichun", ""], ["甘孜州", "sichun", ""], ["凉山州", "sichun", ""]
        ],
        [
            ["贵阳", "guizhou", ""], ["六盘水", "guizhou", ""], ["遵义", "guizhou", ""],
            ["安顺", "guizhou", ""], ["铜仁", "guizhou", ""], ["毕节", "guizhou", ""],
            ["黔西南州", "miaozhai", ""], ["黔东南州", "miaozhai", ""], ["黔南州", "miaozhai", ""]
        ],
        [
            ["昆明", "kunming", ""], ["曲靖", "yunnan", ""], ["玉溪", "yunnan", ""],
            ["保山", "yunnan", ""], ["昭通", "yunnan", ""], ["丽江", "lijiang", ""],
            ["普洱", "yunnan", ""], ["临沧", "yunnan", ""], ["文山州", "yunnan", ""],
            ["红河州", "yunnan", ""], ["楚雄州", "yunnan", ""], ["德宏州", "yunnan", ""],
            ["西双版纳州", "yunnan", ""], ["大理州", "dali", ""], ["怒江州", "yunnan", ""],
            ["迪庆州", "diqingzhangzu", ""]
        ],
        [
            ["南宁", "nanning", ""], ["柳州", "liuzhou", ""], ["桂林", "guilin",""],
            ["梧州", "guangxi", ""], ["北海", "beihai", ""], ["防城港", "guangxi", ""],
            ["钦州", "guangxi", ""], ["贵港", "guangxi", ""], ["玉林", "guangxi", ""],
            ["百色", "guangxi", ""], ["贺州", "guangxi", ""], ["河池", "guangxi", ""],
            ["来宾", "guangxi", ""], ["崇左", "guangxi", ""]
        ],
        [
            ["拉萨", "xizhuang", ""], ["那曲", "xizhuang", ""], ["昌都", "xizhuang", ""],
            ["山南", "xizhuang", ""], ["日喀则", "xizhuang", ""], ["阿里", "xizhuang", ""],
            ["林芝", "xizhuang", ""]
        ],
        [
            ["杭州", "zhejiang", ""], ["宁波", "nibo", ""], ["温州", "zhenjiang", ""],
            ["嘉兴", "jixing", ""], ["湖州", "zhenjiang", ""], ["绍兴", "shaoxing", ""],
            ["金华", "jihua", ""], ["衢州", "zhenjiang", ""], ["舟山", "zhoushan", ""],
            ["台州", "zhenjiang", ""], ["丽水", "zhenjiang", ""]
        ],
        [
            ["南昌", "nanchang", ""], ["景德镇", "jingdezhen", ""], ["萍乡", "jiangxi", ""],
            ["九江", "jiangxi", ""], ["新余", "jiangxi", ""], ["鹰潭", "jiangxi", ""],
            ["赣州", "jiangxi", ""], ["吉安", "jiangxi", ""], ["宜春", "jiangxi", ""],
            ["抚州", "jiangxi", ""], ["上饶", "shangyao", ""]
        ],
        [
            ["福州", "fuzhou", ""], ["厦门", "xiamen", ""], ["莆田", "fujian", ""],
            ["三明", "fujian", ""], ["泉州", "fujian", ""], ["漳州", "fujian", ""],
            ["南平", "fujian", ""], ["龙岩", "longyan", ""], ["宁德", "fujian", ""]
        ],
        [
            ["海口", "hainan", ""], ["三亚", "hainan", ""], ["三沙", "hainan", ""],
            ["儋州", "hainan", ""], ["五指山", "hainan", ""], ["文昌", "hainan", ""],
            ["琼海", "hainan", ""], ["万宁", "hainan", ""], ["东方", "hainan", ""],
            ["定安", "hainan", ""], ["屯昌", "hainan", ""], ["澄迈", "hainan", ""],
            ["临高", "hainan", ""], ["琼中", "hainan", ""], ["保亭", "hainan", ""],
            ["白沙", "hainan", ""], ["陵水", "hainan", ""], ["乐东", "hainan", ""],
            ["昌江", "hainan", ""]
        ],
        [
            ["台湾", "taiwan",""]
        ],
        [
            ["香港", "HK",""]
        ],
        [
            ["澳门", "aomen",""]
        ]
    ]
}


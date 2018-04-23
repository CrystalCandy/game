var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var test;
(function (test) {
    var TestEgret = (function (_super) {
        __extends(TestEgret, _super);
        function TestEgret() {
            var _this = _super.call(this) || this;
            _this.data = [];
            return _this;
        }
        TestEgret.prototype.onStart = function () {
            // var self = this;
            // var callback:core.ResConfigCallback = {
            // 	onResConfigResult(result:number):void{
            // 		self.testMap();
            // 		self.testArmature();
            // 	}
            // }
            //IGlobal.resManager.loadConfig("data/armature/HelloDragonBones.res.json",  callback);
            //this.testMap();
            //this.testComboBox()
            this.testBitmapLabel();
            //this.testTextField();
        };
        TestEgret.prototype.onExit = function () {
        };
        TestEgret.prototype.testComboBox = function () {
            this.data.push({ bg: "test/itemBg1.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg2.png", content: "https://www.egret.com/" });
            this.data.push({ bg: "test/itemBg3.png", content: "https://www.360.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            this.data.push({ bg: "test/itemBg4.png", content: "https://www.baidu.com/" });
            var width = 300;
            this.cb = new gui.ComboBox();
            IGlobal.rootNode.addChild(this.cb);
            //1.点击事件
            this.cb.addEventListener(gui.ComboBox.onClick, this.onClick, this);
            //2.设置title
            this.cb.setTitleHeight(40);
            this.cb.setTitleBackground("test/titleBackground.png");
            this.cb.setTitleFontSize(40);
            //3.设置Item
            this.cb.setItemWidth(width);
            this.cb.setItemHeight(80);
            this.cb.setItemFontSize(20);
            //4.设置Item内容文字的对齐方式
            this.cb.setItemTextAlign("left");
            this.cb.x = 100;
            this.cb.y = 200;
            this.cb.width = 300;
            this.cb.height = 300;
            this.cb.data = this.data;
        };
        TestEgret.prototype.onClick = function (event) {
            //getTitleLabe()方法可以获取titleLabel控件。
            var titleLabel = this.cb.getTitleLabe();
            titleLabel.text = this.data[event.data.itemIndex].content;
            //this.cb.hide();
            console.log(event.data);
        };
        TestEgret.prototype.testBitmapLabel = function () {
            var batchImage = new gui.BatchImage;
            batchImage.beginDraw();
            batchImage.drawImage("zd_baoJi9");
            batchImage.drawImageVProgress("zd_jiaXue9", 0.4);
            batchImage.endDraw();
            batchImage.x = IGlobal.stage.stageWidth / 2;
            batchImage.y = IGlobal.stage.stageHeight / 2;
            IGlobal.stage.addChild(batchImage);
        };
        TestEgret.prototype.testTextField = function () {
            var text = new egret.TextField();
            text.textColor = 0xffffff;
            text.width = 540;
            text.size = 30;
            text.lineSpacing = 40;
            /*** 本示例关键代码段开始 ***/
            var str = '<font size=20>妈妈再也不用担心我在</font>'
                + '<font color=0x336699 size=60 strokecolor=0x6699cc stroke=2>Egret</font>'
                + '<font fontfamily="楷体">里说一句话不能包含</font>'
                + '<font fontfamily="楷体"><u>各种</u></font>'
                + '<font color=0xff0000>五</font>'
                + '<font color=0x00ff00>彩</font>'
                + '<font color=0xf000f0>缤</font>'
                + '<font color=0x00ffff>纷</font>'
                + '<font>、\n</font>'
                + '<font size=56>大</font>'
                + '<font size=16>小</font>'
                + '<font size=26>不</font>'
                + '<font size=34>一</font>'
                + '<font>、</font>'
                + '<font color=0x00ff00><i>格</i></font>'
                + '<font size=26 color=0xf000f0>式</font>'
                + '<font color=0xf06f00><i>各</i></font>'
                + '<font fontfamily="KaiTi">样的文字</font>' //楷体
                + '<font>了！</font>';
            text.textFlow = new egret.HtmlTextParser().parser(str);
            /*** 本示例关键代码段结束 ***/
            IGlobal.stage.addChild(text);
            text.x = 320 - text.textWidth / 2;
            text.y = 400 - text.textHeight / 2;
        };
        return TestEgret;
    }(test.TestUnit));
    test.TestEgret = TestEgret;
    __reflect(TestEgret.prototype, "test.TestEgret");
})(test || (test = {}));
//# sourceMappingURL=TestEgret.js.map
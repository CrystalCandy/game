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
    var TestComponent = (function (_super) {
        __extends(TestComponent, _super);
        function TestComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestComponent.prototype.onStart = function () {
            WngMrg.getInstance().setShowStateWindow(false);
            RegisterEvent(EventDefine.PRECEDURE_ACTIVE, this.onGameLoadComplete, this);
            PrecedureManager.getInstance().changePrecedure(PRECEDURE_GAME);
        };
        TestComponent.prototype.onExit = function () {
        };
        TestComponent.prototype.onGameLoadComplete = function (event) {
            if (event.state != PRECEDURE_GAME)
                return;
            //this.testRichDisplayer();
            //this.testLuaParser()
            //this.testAnimBox();
            //this.testToggleButton();
            //this.testGrayComponent();
            //this.testGridImage();
            //this.testDriveEvent();
            //this.testScroller();
            this.testPgrogressbar();
        };
        TestComponent.prototype.testLuaParser = function () {
            //let str = "{[\"window\"]=\"FunctionMenu1Frame/jitan\",[\"offsetX\"]=0 , [\"offsetY\"]=0, [\"width\"]=0, [\"height\"]=0,[\"ImageType\"]=false}"
            //["window"]="FunctionMenu1Frame/jitan",["offsetX"]=0 , ["offsetY"]=0, ["width"]=0, ["height"]=0,["ImageType"]=false
            //let str = "{[\'window\']=\"FunctionMenu1Frame/jitan\",[\"offsetX\"]=0 , [\"offsetY\"]=0, [\"width\"]=0, [\"height\"]=0,[\"ImageType\"]=false}"
            //let str = "{1.3,2,3,4,{['test']=5,100,101,102,{5,6,7}}}"
            //let str = "{1,{2,3}}"
            var str = "{heroLevel=10,{true, false ,-90}}";
            var obj = LuaParser.parse(str);
            console.debug(obj);
        };
        TestComponent.prototype.testRichDisplayer = function () {
            var layer = new eui.UILayer;
            IGlobal.rootNode.addChild(layer);
            var rd = new gui.RichDisplayer;
            // rd.width = 200;
            // rd.height = 200;
            rd.width = 200;
            rd.height = 200;
            rd.left = 0;
            rd.verticalCenter = 0;
            layer.addChild(rd);
            rd.addEventListener(gui.RichDisplayer.RichDisplayerTranslateEvent, this.onRdTranslateWord, this);
            rd.addEventListener(gui.RichDisplayer.RichDisplayerLinkCmdEvent, this.onRdLinkCmd, this);
            rd.setRowDistance(10);
            // var myScroller = new eui.Scroller();
            // myScroller.width = 200;
            // myScroller.height = 200;
            // myScroller.viewport = rd;
            // myScroller.left = 0;
            // myScroller.verticalCenter = 0;
            // layer.addChild(myScroller);
            UiUtil.forTestDrawBg(rd);
            rd.setAlignFlag(gui.Flag.H_CENTER);
            var xmlStr = XmlConverter.parseText("#red啊啊 啊你    好#br哈喽");
            rd.addXmlString(xmlStr);
            //1.原始XML
            //let xmlStr:string = '<image name="ty_EXPIcon01" /><ver_blank value="5"/><text name="ht_18_lc" color="yellow">##aa##bb##cc##dd重置，所有角色可以再次使用，并且当前dddddddd层数变成 第一层</text><br/><text name="ht_30_lc" color="red" link="1234">你好</text>';
            //2.XmlConverter关键字
            //let xmlStr = XmlConverter.parseText("#red|123|你好#ty_EXPIcon01#yellow|456|哈喽")
            //3.XmlConverter换行
            // let xmlStr = "line1\r\nline2\r\nline3\r\n";
            // xmlStr = XmlConverter.parseText(xmlStr)
            //4.XmlConverter 超链接
            // let linkSign = XmlConverter.LinkSign
            // let xmlStr = linkSign+"3;1000045;267;波塞冬"+linkSign;
            // let rdInfo:any = {}
            // rdInfo.link_parser = function(linkContent){
            // 	let resultList = StringUtil.stringMatch(linkContent, /(\d+);(\d+);(\d+);(.+)/);
            // 	let linkType = resultList[0];
            // 	let playerId = resultList[1];
            // 	let targetId = resultList[2]; 
            // 	let content  = resultList[3]; 
            // 	if(linkType == null || playerId == null || targetId == null || content == null){
            // 		return null;
            // 	}
            // 	let info:any = {}
            // 	info.name = content;
            // 	info.link = linkContent;
            // 	info.color = "orange"
            // 	return info
            // 	//return null;
            // }
            // xmlStr = XmlConverter.parseText(xmlStr, rdInfo)
            //动画
            //let rdInfo:any = {}
            //let xmlStr = XmlConverter.parseText("#aixin123", rdInfo)
            //let xmlStr = XmlConverter.parseText("#red|123|<你\"好>#ty_EXPIcon01#yellow|456|哈喽")
            //rd.addXmlString(xmlStr);
            // rd.addXmlString(xmlStr);
            // rd.addXmlString(xmlStr);
            // rd.addXmlString(xmlStr);
            // rd.addXmlString(xmlStr);
            // rd.addXmlString(xmlStr);
            // rd.addXmlString(xmlStr);
            // rd.addXmlString(xmlStr);
            // rd.addXmlString(xmlStr);
            //rd.showLastRow();
            // let rd2:gui.RichDisplayer = new gui.RichDisplayer;
            // // rd.width = 200;
            // // rd.height = 200;
            // rd2.width= 100;
            // rd2.height = 50;
            // rd2.right = 0;
            // rd2.top = 0;
            // rd.addChild(rd2);
            // rd2.addXmlString(xmlStr);
            // rd2.addXmlString(xmlStr);
            // rd2.addXmlString(xmlStr);
            // rd2.addXmlString(xmlStr);
            // rd2.addXmlString(xmlStr);
            // rd2.addXmlString(xmlStr);
        };
        TestComponent.prototype.onRdTranslateWord = function (event) {
            var str = event.getTranslateWord();
            event.setTranslateWord(str + "!!");
        };
        TestComponent.prototype.onRdLinkCmd = function (event) {
            //event.window
            TLog.Debug("onRdLinkCmd", event.getHyperlink());
        };
        TestComponent.prototype.testAnimBox = function () {
            var layer = new eui.UILayer;
            IGlobal.rootNode.addChild(layer);
            var animBox = new gui.AnimBox;
            animBox.horizontalCenter = 0;
            animBox.verticalCenter = 0;
            layer.addChild(animBox);
            animBox.setAnimName("aixin");
            animBox.play();
        };
        TestComponent.prototype.testToggleButton = function () {
            var layer = new eui.UILayer;
            IGlobal.rootNode.addChild(layer);
            var mElemList = {};
            var elemInfo = [
                (_a = {}, _a["index_type"] = eui.ToggleButton, _a["name"] = "content", _a["image"] = "zjm_bt_gengDuo01", _a["image_down"] = "zjm_bt_gengDuo02", _a["event_name"] = null, _a["fun_index"] = null, _a),
            ];
            UiUtil.createElem(elemInfo, layer, mElemList, this);
            var _a;
        };
        TestComponent.prototype.testGrayComponent = function () {
            var layer = new eui.UILayer;
            IGlobal.rootNode.addChild(layer);
            var mElemList = {};
            var elemInfo = [
                (_a = {}, _a["index_type"] = gui.Button, _a["x"] = 100, _a["y"] = 100, _a["name"] = "btn", _a["image"] = "ty_tongYongBt01", _a["event_name"] = null, _a["fun_index"] = null, _a["enabled"] = false, _a),
                (_b = {}, _b["index_type"] = eui.Image, _b["x"] = 300, _b["y"] = 100, _b["name"] = "img", _b["image"] = "item_21006", _b["event_name"] = null, _b["fun_index"] = null, _b["enabled"] = false, _b),
            ];
            UiUtil.createElem(elemInfo, layer, mElemList, this);
            var img = mElemList["img"];
            img.enabled = false;
            var _a, _b;
        };
        TestComponent.prototype.testGridImage = function () {
            var layer = new eui.UILayer;
            IGlobal.rootNode.addChild(layer);
            var mElemList = {};
            var elemInfo = [
                (_a = {}, _a["index_type"] = gui.Grid9Image, _a["x"] = 300, _a["y"] = 100, _a["w"] = 300, _a["h"] = 100, _a["name"] = "img", _a["image"] = "ty_UIDi04", _a["event_name"] = null, _a["fun_index"] = null, _a),
            ];
            UiUtil.createElem(elemInfo, layer, mElemList, this);
            var _a;
            // let image:gui.Grid9Image = mElemList["img"]
            // image.scale9Grid = new egret.Rectangle(120, 120, 1, 1)
        };
        TestComponent.prototype.testDriveEvent = function () {
            var layer = IGlobal.guiManager.getLayerNode(1 /* Normal */);
            var mElemList = {};
            var elemInfo = [
                (_a = {}, _a["index_type"] = gui.Grid9Image, _a["x"] = 300, _a["y"] = 100, _a["w"] = 300, _a["h"] = 100, _a["name"] = "img", _a["image"] = "ty_UIDi04", _a["event_name"] = null, _a["fun_index"] = null, _a),
            ];
            UiUtil.createElem(elemInfo, layer, mElemList, this);
            var img = mElemList["img"];
            img.addEventListener(gui.GUIDriveEvent.BeginDriveEvent, this.onBeginDrive, this);
            img.addEventListener(gui.GUIDriveEvent.EndDriveEvent, this.onEndDrive, this);
            var _a;
        };
        TestComponent.prototype.onBeginDrive = function (event) {
            event.setDriveBegin(true);
            TLog.Debug("onBeginDrive", event.hoverTarget.name);
        };
        TestComponent.prototype.onEndDrive = function (event) {
            TLog.Debug("onEndDrive", event.hoverTarget.name);
            var layer = IGlobal.guiManager.getLayerNode(1 /* Normal */);
            var point = core.EgretUtil.stageToNodeXY(layer, event.stageX - event.driveOffStageX, event.stageY - event.driveOffStageY);
            event.target.x = point.x;
            event.target.y = point.y;
        };
        TestComponent.prototype.testScroller = function () {
            var layer = new eui.UILayer;
            IGlobal.rootNode.addChild(layer);
            var mElemList = {};
            var scroll = UIScrollList.newObj(layer, "scroll", 30, 12, 490, 100, null, UIScrollList.DIR_HORIZON);
            UiUtil.forTestDrawBg(scroll.contentGroup);
            this.controlDataTable = {};
            var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            this.scrollIndex = 5;
            scroll.clearItemList();
            for (var i = 0; i < list.length; i++) {
                var v = list[i];
                var window_1 = scroll.getItemWindow(i, 100, 100, 10, 0, 0);
                this.initItemWindow(window_1, i, mElemList, layer);
                //this.refreshItemWindow(window, i, v)
            }
            scroll.refreshScroll();
            scroll.moveToScrollIndex(this.scrollIndex);
            this.scroll = scroll;
        };
        TestComponent.prototype.initItemWindow = function (window, i, mElemList, layer) {
            var name = window.name;
            mElemList[name + "roleImg"] = UIPetBox.newObj(layer, name + "roleImg", 0, 0, window, 0.8);
            mElemList[name + "roleImg"].setPetHintEnable(false);
            var mElemInfo = [
                (_a = {}, _a["index_type"] = gui.Button, _a["name"] = name + "clickSelect", _a["x"] = 0, _a["y"] = 0, _a["w"] = 100, _a["h"] = 100, _a["event_name"] = gui.TouchEvent.TOUCH_SHORT, _a["fun_index"] = this.onClickRoleImg, _a),
                (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + "clickSelectImg", _b["image"] = "ty_xuanZhongKuang01", _b["x"] = 0, _b["y"] = 0, _b["w"] = 100, _b["h"] = 100, _b["messageFlag"] = true, _b),
                (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "embattlebg", _c["image"] = "ty_skillIcon01", _c["x"] = 0, _c["y"] = 0, _c["w"] = 80, _c["h"] = 34, _c["messageFlag"] = true, _c),
                (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "embattle", _d["parent"] = name + "embattlebg", _d["title"] = Localize_cns("CAMPAIGN_TXT53"), _d["font"] = "ht_18_cc_stroke", _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = 0, _d["w"] = 80, _d["h"] = 24, _d["messageFlag"] = true, _d),
            ];
            UiUtil.createElem(mElemInfo, layer, mElemList, this, window);
            this.controlDataTable[name + "clickSelect"] = i;
            mElemList[name + "roleImg"].updateByEntry(18000 + i);
            mElemList[name + "clickSelectImg"].visible = (false);
            var _a, _b, _c, _d;
        };
        TestComponent.prototype.onClickRoleImg = function (args) {
            var name = args.target.name;
            var scrollIndex = this.controlDataTable[name];
            TLog.Debug("onClickRoleImg", scrollIndex);
            this.scroll.moveToScrollIndex(scrollIndex, true);
        };
        TestComponent.prototype.testPgrogressbar = function () {
            var layer = new eui.UILayer;
            IGlobal.rootNode.addChild(layer);
            var mElemList = {};
            var elemInfo = [
                (_a = {}, _a["index_type"] = gui.ProgressBar, _a["name"] = "bar", _a["title"] = "", _a["font"] = null, _a["image"] = "hd_loadingDi01", _a["thumbImage"] = "hd_loading01", _a["color"] = gui.Color.white, _a["x"] = 145, _a["y"] = 75, _a["w"] = 195, _a["h"] = 30, _a),
            ];
            UiUtil.createElem(elemInfo, layer, mElemList, this);
            var timerId = 0;
            var onTimerCallback = function (dt) {
                KillTimer(timerId);
                UiUtil.updateProgress(mElemList["bar"], 50, 100, null, 1000);
            };
            timerId = SetTimer(onTimerCallback, this, 1000);
            var _a;
        };
        return TestComponent;
    }(test.TestUnit));
    test.TestComponent = TestComponent;
    __reflect(TestComponent.prototype, "test.TestComponent");
})(test || (test = {}));
//# sourceMappingURL=TestComponent.js.map
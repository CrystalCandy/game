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
// TypeScript file
/*
作者:
    liuziming
    
创建时间：
   2017.01.10(周二)

意图：
   物品等获取途径（快速跳转）
公共接口：
   
*/
var QuickGainFrame = (function (_super) {
    __extends(QuickGainFrame, _super);
    function QuickGainFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MaxNum = 6;
        return _this;
    }
    QuickGainFrame.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/QuickGainLayout.exml"];
        this.controlDataTable = {};
        this.inputargs = ["", 0];
        RegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this);
        this.listenWndName = "";
        this.listenActPro = -1;
    };
    QuickGainFrame.prototype.destory = function () {
        UnRegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this);
    };
    QuickGainFrame.prototype.onLoad = function () {
        this.showWndList = [];
        this.createFrame();
    };
    QuickGainFrame.prototype.onUnLoad = function () {
        this.controlDataTable = {};
    };
    QuickGainFrame.prototype.onShow = function () {
        //this.frameAction.showAction()
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    QuickGainFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        //this.showWndList = {}
        this.inputargs = ["", 0];
    };
    ////////////////////////////////////////////////////////////////////-
    QuickGainFrame.prototype.createFrame = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickRetrun, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickRetrun, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group_content = this.mElemList["Group_Content"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group_content.width, group_content.height, group_content);
        var _a, _b;
    };
    QuickGainFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Button, _a["name"] = name + "_option", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_UIBg04", _a["autoScale"] = true, _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 500, _a["h"] = 80, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickOption, _a),
            (_b = {}, _b["index_type"] = gui.RichDisplayer, _b["name"] = name + "_dec", _b["parent"] = null, _b["title"] = null, _b["font"] = null, _b["image"] = "", _b["color"] = gui.Color.white, _b["x"] = 20, _b["y"] = 27, _b["w"] = 440, _b["h"] = 25, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = gui.Button, _c["name"] = name + "_block", _c["title"] = null, _c["font"] = null, _c["image"] = "", _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = 500, _c["h"] = 80, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickBlock, _c),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c;
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
    };
    QuickGainFrame.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        var _a = FastJumpSystem.getInstance().checkFastJump(config[0], config[1]), enable = _a[0], des = _a[1], str = _a[2];
        this.mElemList[name + "_option"].enabled = (enable);
        AddRdContent(this.mElemList[name + "_dec"], des, "ht_24_cc", "zongse");
        this.controlDataTable[name + "_option"] = config;
        this.mElemList[name + "_block"].visible = (!enable);
        if (enable == false) {
            this.controlDataTable[name + "_block"] = str;
        }
    };
    QuickGainFrame.prototype.setAutoClose = function (bAutoClose) {
        this.bAutoClose = bAutoClose;
    };
    QuickGainFrame.prototype.refreshFrame = function () {
        //this.controlDataTable = {}
        //刷新顶部信息
        var config = FastJumpSystem.getInstance().getFunTipsConfig(this.inputargs[0], this.inputargs[1]);
        var imageName = "";
        var name = "Error";
        var des = "";
        if (config) {
            _a = FastJumpSystem.getInstance().getFunTipsInfo(config), imageName = _a[0], name = _a[1], des = _a[2];
        }
        //TLog.Debug("2222222222222222222222", imageName, name, config)
        this.mElemList["Image_Icon"].source = (imageName);
        this.mElemList["Label_Name"].text = (name);
        AddRdContent(this.mElemList["Rd_Des"], des, "ht_18_cc", "white", 5);
        if (!config) {
            TLog.Warn("QuickGainFrame.refreshFrame the args[1]:%s, args[2]:%s is null", this.inputargs[0], this.inputargs[1]);
            //return this.hideWnd()
            return;
        }
        var list = [];
        var t1 = []; //开放
        var t2 = []; //未开放
        for (var k in config.approach) {
            //for(let _ = 0; _ < config.approach.length; _++){
            var v = config.approach[k];
            var _b = FastJumpSystem.getInstance().checkFastJump(v[0], v[1]), flag = _b[0], _s = _b[1], _ = _b[2];
            if (flag == true) {
                JsUtil.arrayInstert(t1, v);
            }
            else {
                JsUtil.arrayInstert(t2, v);
            }
        }
        for (var _ = 0; _ < t1.length; _++) {
            var v = t1[_];
            JsUtil.arrayInstert(list, v);
        }
        for (var _ = 0; _ < t2.length; _++) {
            var v = t2[_];
            JsUtil.arrayInstert(list, v);
        }
        //for(let k in config){
        //		let v = config[k]
        //	let t:any = {}
        //	if(type(v) == "object" ){
        //	 t:any = {k, v}					//{索引, 参数}
        //	}else{
        //	 t:any = {v}							//{索引}
        //	}
        //	
        //	JsUtil.arrayInstert(list, t)
        //}
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        var hasNum = list.length;
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, 500, 80, 3, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        //组队状态下不可操作
        if (HeroIsInTeam() == true) {
            this.mElemList["team_no_operate"].visible = (true);
        }
        else {
            this.mElemList["team_no_operate"].visible = (false);
        }
        var _a;
    };
    ////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
    QuickGainFrame.prototype.onClickRetrun = function (args) {
        //if(this.isShowFrontWnd && size_t(this._showWndList) != 0 ){
        //	for(let _ in this._showWndList){
        //		let wnd = this._showWndList[_]
        //		wnd.showWnd()
        //	}
        //}
        return this.hideWnd();
    };
    QuickGainFrame.prototype.onClickOption = function (event) {
        var name = event.target.name;
        if (!this.controlDataTable[name]) {
            return;
        }
        this["bAutoClose"] = true;
        var config = this.controlDataTable[name];
        var listenWndName = FastJumpSystem.getInstance().doFastJump(config[0], config[1]);
        if (this["bAutoClose"] == false)
            return;
        //tips不用关闭
        // if(config[0] == FastJumpTypeList.FIELD_MESSAGETIPS){
        // 	return;
        // }
        for (var _ in this._showWndList) {
            var wnd = this._showWndList[_];
            wnd.hideWnd();
        }
        this.hideWnd();
        this.listenWndName = listenWndName || "";
        this.listenActPro = ActivitySystem.getInstance().getActivtyProcess();
    };
    QuickGainFrame.prototype.onClickBlock = function (event) {
        //tolua.cast(args, "gui::GUIMouseEvent")
        var name = event.target.name;
        if (!this.controlDataTable[name]) {
            return;
        }
        var str = this.controlDataTable[name];
        MsgSystem.addTagTips(str);
    };
    ////////////////////////////////////////////////////-公共接口////////////////////////////////////-
    QuickGainFrame.prototype.showQuickGainFrame = function (param) {
        //param={{"item",entry},{"WingsFrame","WingSkillListFrame"}}
        this.inputargs = param[0] || ["", 0];
        var currenceCheck = false;
        if (this.inputargs[0] == "jinbi") {
            MsgSystem.addTagTips(Localize_cns("GOLD_NOENGOUGH"));
            currenceCheck = true;
        }
        else if (this.inputargs[0] == "zuanshi") {
            MsgSystem.addTagTips(Localize_cns("DIAMAND_NOENGOUGH"));
            currenceCheck = true;
        }
        //当前正在活动中，就不处理调整了
        var curIndex = ActivitySystem.getInstance().getCurActIndex();
        if (curIndex != OrdinaryActivityIndex.NULL) {
            if (currenceCheck) {
                return;
            }
        }
        this.showWndList = [];
        this.listenWndName = "";
        if (param[1] != null) {
            for (var _ in param[1]) {
                var name_1 = param[1][_];
                var wnd = WngMrg.getInstance().getWindow(name_1);
                if (wnd && wnd.isVisible() == true) {
                    JsUtil.arrayInstert(this.showWndList, wnd);
                }
            }
        }
        table_sort(this.showWndList, function (a, b) {
            return a.getShowOrder() - b.getShowOrder();
        });
        this._showWndList = this.showWndList;
        this.isShowFrontWnd = false;
        if (param[2] == null) {
            this.isShowFrontWnd = true;
        }
        if (this.isVisible() == false) {
            return this.showWnd();
        }
        else {
            return this.refreshFrame();
        }
    };
    QuickGainFrame.prototype.onUIHideEvent = function (args) {
        if (this.listenWndName == "") {
            return;
        }
        //自身是关闭状态，才会监听
        if (this.isVisible()) {
            return;
        }
        //正在活动中，不处理
        var wngMgr = WngMrg.getInstance();
        if (wngMgr.stackList != null) {
            this.listenWndName = "";
            this.listenActPro = 0;
            return;
        }
        //不是游戏流程状态
        if (PrecedureManager.getInstance().getCurrentPrecedureId() != PRECEDURE_GAME) {
            this.listenWndName = "";
            this.listenActPro = 0;
            return;
        }
        //跳转时是否进入其他活动
        if (this.listenActPro != ActivitySystem.getInstance().getActivtyProcess()) {
            this.listenWndName = "";
            this.listenActPro = 0;
            return;
        }
        if (this.listenWndName == args.window.classname) {
            for (var _ in this._showWndList) {
                var wnd = this._showWndList[_];
                wnd.showWnd();
            }
            this.listenWndName = "";
        }
    };
    return QuickGainFrame;
}(BaseWnd));
__reflect(QuickGainFrame.prototype, "QuickGainFrame");
//# sourceMappingURL=QuickGainFrame.js.map
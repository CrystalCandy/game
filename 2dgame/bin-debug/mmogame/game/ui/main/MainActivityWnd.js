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
var MainActivityWnd = (function (_super) {
    __extends(MainActivityWnd, _super);
    function MainActivityWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainActivityWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    MainActivityWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.createFrame();
        this.isRefresh = false;
    };
    MainActivityWnd.prototype.onUnLoad = function () {
    };
    MainActivityWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.PAY_ACTIVITY_LIST, this.refreshFrame, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        RegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this);
        RegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this);
        this.mElemList["activity_wnd"].visible = true;
        this.refreshFrame();
        this.checkBottomPos();
    };
    MainActivityWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_LIST, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.UI_SHOW, this.onUIShowEvent, this);
        UnRegisterEvent(EventDefine.UI_HIDE, this.onUIHideEvent, this);
        this.mElemList["activity_wnd"].visible = false;
    };
    MainActivityWnd.prototype.refreshFrame = function () {
        this.nameToIndex = [];
        var y = 0;
        //let yIndex = 0 
        var shownamelist = this.checkShowList();
        for (var i = 0; i < size_t(this.btnList); i++) {
            //y = 550 - (yIndex * 80)
            var info = this.btnList[i];
            var activityIndex = info.index;
            var btnName = this.getBtnName(i);
            //this.mElemList[btnName].visible = false
            var bVisible = false;
            for (var j = 0; j < size_t(shownamelist); j++) {
                if (info.index == shownamelist[j].index) {
                    //this.mElemList[btnName].visible = true
                    bVisible = true;
                    // this.mElemList[btnName].y = y
                    // yIndex = yIndex + 1
                    break;
                }
            }
            UiUtil.setVisible(this.mElemList[btnName], bVisible, bVisible);
            this.nameToIndex[btnName] = activityIndex;
        }
    };
    MainActivityWnd.prototype.checkShowList = function () {
        var shownamelist = [];
        for (var i = 0; i < size_t(this.btnList); i++) {
            var info = this.btnList[i];
            var index = info.index;
            if (info.check) {
                if (info.check() == true) {
                    table_insert(shownamelist, info);
                }
            }
            else {
                if (this.checkAcitivityIsOpen(index) == true) {
                    table_insert(shownamelist, info);
                }
            }
        }
        return shownamelist;
    };
    MainActivityWnd.prototype.getBtnName = function (i) {
        var info = this.btnList[i];
        var name = info.name;
        if (name == null) {
            name = "activity_btn" + i;
        }
        return name;
    };
    MainActivityWnd.prototype.createFrame = function () {
        var funcList = [
            { index: -1, image: "zjm_Bt36", check: this.daily, func: this.dailyClick, name: "dynamic_richang" },
            { index: -2, image: "zjm_Bt29", check: this.checkBag, func: this.bagClick, name: "dynamic_beibao" },
        ];
        var btnList = [];
        for (var i = 0; i < size_t(funcList); i++) {
            var info = funcList[i];
            table_insert(btnList, info);
        }
        var openList = GetPayActivityUiConfig("Main"); //活动
        for (var i = 0; i < size_t(openList); i++) {
            var info = openList[i];
            table_insert(btnList, info);
        }
        for (var i = 0; i < size_t(btnList); i++) {
            var info = btnList[i];
            var image = info.image;
            var index = info.index;
            var call = this.onClick;
            if (info.func != undefined) {
                call = info.func;
            }
            //    let x = 0
            //    let y = 550 - (i * 80)
            var name_1 = info.name;
            if (name_1 == null) {
                name_1 = "activity_btn" + i;
            }
            var elemInfo1 = [
                (_a = {}, _a["index_type"] = gui.Button, _a["name"] = name_1, _a["title"] = "", _a["font"] = "ht_20_cc_stroke", _a["image"] = image, _a["color"] = gui.Color.white, _a["w"] = 70, _a["h"] = 80, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = call, _a),
            ];
            UiUtil.createElem(elemInfo1, this.mLayoutNode, this.mElemList, this, this.mElemList["activity_wnd"]);
        }
        this.btnList = btnList;
        var _a;
    };
    MainActivityWnd.prototype.dailyClick = function () {
        ExecuteMainFrameFunction("richang");
    };
    MainActivityWnd.prototype.bagClick = function () {
        ExecuteMainFrameFunction("beibao");
    };
    // leichongClick(){
    // 	let wnd = WngMrg.getInstance().getWindow("TouZiFrame")
    // 	wnd.showWithIndex(0)
    // }
    // firstPayClick(){
    // 	// TLog.Debug("firstPayClick")
    // }
    // monthClick(){
    // 	// TLog.Debug("monthClick")
    // }
    MainActivityWnd.prototype.onClick = function (args) {
        var name = args.target.name;
        if (this.nameToIndex[name] == null) {
            return;
        }
        var index = this.nameToIndex[name];
        ExecuteActivityIndex(index);
    };
    MainActivityWnd.prototype.checkAcitivityIsOpen = function (index) {
        //return true
        if (index == PayActivityIndex.C_MONTHCARD) {
            var level = GetHeroProperty("level");
            var isBuy = PaySystem.getInstance().isMonthCardActive();
            if (isBuy) {
                return false;
            }
            return (level >= 20);
        }
        return ActivitySystem.getInstance().checkActivityIsOpen(index);
    };
    MainActivityWnd.prototype.checkBag = function () {
        return true;
    };
    MainActivityWnd.prototype.daily = function () {
        var level = GetHeroProperty("level");
        if (level < 40)
            return false;
        return true;
    };
    MainActivityWnd.prototype.onUIShowEvent = function (args) {
        if (args.window.classname == "IconMsgFrame") {
            this.checkBottomPos();
        }
    };
    MainActivityWnd.prototype.onUIHideEvent = function (args) {
        if (args.window.classname == "IconMsgFrame") {
            this.checkBottomPos();
        }
    };
    MainActivityWnd.prototype.checkBottomPos = function () {
        if (MsgSystem.isIconMsgVisible()) {
            this.mElemList["activity_wnd"].bottom = 420;
        }
        else {
            this.mElemList["activity_wnd"].bottom = 345;
        }
    };
    return MainActivityWnd;
}(BaseCtrlWnd));
__reflect(MainActivityWnd.prototype, "MainActivityWnd");
//# sourceMappingURL=MainActivityWnd.js.map
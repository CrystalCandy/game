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
var TouZiFrame = (function (_super) {
    __extends(TouZiFrame, _super);
    function TouZiFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouZiFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/TouZiLayout.exml"];
        //this.tabIndex = -1
    };
    TouZiFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.mLayoutNode.setDoModal(true);
        this.mElemList["group_tab_1"].visible = false;
        this.mElemList["group_tab_2"].visible = false;
        this.mElemList["group_tab_3"].visible = false;
        this.mElemList["group_tab_4"].visible = false;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.disposeData();
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, this.activityList);
        var _a, _b;
    };
    TouZiFrame.prototype.disposeData = function () {
        var activityList = [];
        this.infoList = [
            (_a = {}, _a["index"] = PayActivityIndex.FIRST_PAY, _a["checkFunc"] = this.checkShouChong, _a["wnd"] = TouZiShouChongWindow.newObj(this.mLayoutNode, this), _a["check"] = this.onTab2Click, _a["text"] = Localize_cns("INVEST_TXT23"), _a),
            (_b = {}, _b["index"] = PayActivityIndex.LEVEL_FUNDS, _b["checkFunc"] = this.checkZiJin, _b["wnd"] = TouZiChengzhangWindow.newObj(this.mLayoutNode, this), _b["check"] = this.onTab2Click, _b["text"] = Localize_cns("INVEST_TXT24"), _b),
            (_c = {}, _c["index"] = PayActivityIndex.INVEST_PLAN, _c["checkFunc"] = this.checkJiHua, _c["wnd"] = TouZiJiHuaWindow.newObj(this.mLayoutNode, this), _c["check"] = this.onTab1Click, _c["text"] = Localize_cns("INVEST_TXT25"), _c),
            (_d = {}, _d["index"] = PayActivityIndex.ACCUM_PAY_PRIZE, _d["checkFunc"] = this.checkLeiChong, _d["wnd"] = TouziLeiJiWindow.newObj(this.mLayoutNode, this), _d["check"] = this.onTab1Click, _d["text"] = Localize_cns("INVEST_TXT26"), _d),
        ];
        var index = 1;
        for (var i = 0; i < size_t(this.infoList); i++) {
            var infoList = this.infoList[i];
            var info = [];
            if (infoList.checkFunc.call() == true) {
                info["name"] = "tab" + index;
                info["wnd"] = infoList.wnd;
                info["text"] = infoList.text;
                info["index"] = infoList.index;
                table_insert(activityList, info);
                index = index + 1;
            }
        }
        this.activityList = activityList;
        var _a, _b, _c, _d;
    };
    TouZiFrame.prototype.onUnLoad = function () {
    };
    TouZiFrame.prototype.onShow = function () {
        //	RegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this)
        // if (this.tabIndex != -1) {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        this.tabWndList.changeTabWithIndex(this.tabIndex);
        // }else{
        // 	this.onHide()	//都没有得显示了
        // }
        for (var i = 0; i < 4; i++) {
            var info = this.activityList[i];
            if (info) {
                this.mElemList["tab" + (i + 1)].visible = true;
                this.mElemList["tab" + (i + 1)].label = info.text;
                var text = info.text;
            }
            else {
                this.mElemList["tab" + (i + 1)].visible = false;
                this.mElemList["tab" + (i + 1)].label = "";
            }
        }
    };
    TouZiFrame.prototype.onHide = function () {
        //	UnRegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this)
        this.mLayoutNode.visible = false;
        // if (this.tabIndex != -1) {
        this.tabWndList.setWndVisible(false);
        // }
    };
    //检查
    TouZiFrame.prototype.checkShouChong = function () {
        //let index = PayActivityIndex.FIRST_PAY
        // return true
        return ActivitySystem.getInstance().checkActivityIsOpen(PayActivityIndex.FIRST_PAY);
    };
    TouZiFrame.prototype.checkJiHua = function () {
        // return true
        return ActivitySystem.getInstance().checkActivityIsOpen(PayActivityIndex.LEVEL_FUNDS);
    };
    TouZiFrame.prototype.checkZiJin = function () {
        // return true
        return ActivitySystem.getInstance().checkActivityIsOpen(PayActivityIndex.INVEST_PLAN);
    };
    TouZiFrame.prototype.checkLeiChong = function () {
        // return true 
        return ActivitySystem.getInstance().checkActivityIsOpen(PayActivityIndex.ACCUM_PAY_PRIZE);
    };
    ////接口
    TouZiFrame.prototype.showWithIndex = function (index) {
        this.disposeData();
        for (var i = 0; i < size_t(this.activityList); i++) {
            var info = this.activityList[i];
            if (info.index == index) {
                this.tabIndex = i;
            }
        }
        this.showWnd();
    };
    ///-----检查是否开启
    TouZiFrame.prototype.onTab0Click = function () {
        //this.showWithIndex(1)
        return true;
        // ExecuteMainFrameFunction("shouchong")
        // this.hideWnd()
        // return false
    };
    TouZiFrame.prototype.onTab1Click = function () {
        //this.showWithIndex(2)
        return true;
    };
    TouZiFrame.prototype.onTab2Click = function () {
        //this.showWithIndex(3)
        return false;
    };
    TouZiFrame.prototype.onTab3Click = function () {
        //this.showWithIndex(3)
        return true;
    };
    return TouZiFrame;
}(BaseWnd));
__reflect(TouZiFrame.prototype, "TouZiFrame");
//# sourceMappingURL=TouZiFrame.js.map
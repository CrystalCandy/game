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
var LuckyFrame = (function (_super) {
    __extends(LuckyFrame, _super);
    function LuckyFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LuckyFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/lucky/LuckyLayout.exml"];
    };
    LuckyFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.mLayoutNode.setDoModal(true);
        this.mElemList["group_tab1"].visible = false;
        this.mElemList["group_tab2"].visible = false;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "lucky_btn1", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClick, _c),
            (_d = {}, _d["name"] = "lucky_btn2", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClick, _d),
            (_e = {}, _e["name"] = "lucky_btn3", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClick, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "radio1", wnd: XunbaoWindow.newObj(this.mLayoutNode, this) },
            { name: "radio2", wnd: LuckyWindow.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        for (var i = 1; i < 4; i++) {
            var rd = this.mElemList["lucky_rd" + i];
            rd.setAlignFlag(gui.Flag.H_CENTER);
        }
        this.tabWndList.setSelectedCallback(this.test, this);
        var _a, _b, _c, _d, _e;
    };
    LuckyFrame.prototype.test = function () {
    };
    LuckyFrame.prototype.onUnLoad = function () {
    };
    LuckyFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = true;
        this.onRefresh();
        this.tabWndList.setWndVisible(true);
    };
    LuckyFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    LuckyFrame.prototype.onRefresh = function () {
    };
    LuckyFrame.prototype.initItemWindow = function (window, data) {
    };
    LuckyFrame.prototype.refreshItemWindow = function (window, data) {
    };
    LuckyFrame.prototype.onClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, ""); //选择的是第几个按钮
        index = tonumber(index);
        var info = this.radioConfig[index - 1] || null;
        if (info == null) {
            return;
        }
        var bindGold = GetHeroProperty("bindGold");
        var curGold = GetHeroProperty("gold");
        // let config = info.config[index]
        var typeS = info[1];
        var needNum = info[2];
        if (typeS == opItemUnit.BIND_CURRENCY) {
            if (needNum > bindGold) {
                MsgSystem.addTagTips(Localize_cns("LUCKY_TXT3"));
                return;
            }
        }
        else if (typeS == opItemUnit.CURRENCY) {
            if (needNum > curGold) {
                MsgSystem.addTagTips(Localize_cns("LUCKY_TXT4"));
                return;
            }
        }
        RpcProxy.call("C2G_DoOperateActivity", this.activityIndex, [index]); //抽奖
    };
    return LuckyFrame;
}(BaseWnd));
__reflect(LuckyFrame.prototype, "LuckyFrame");
//# sourceMappingURL=LuckyFrame.js.map
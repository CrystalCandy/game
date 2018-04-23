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
var SanShengSanShiFrame = (function (_super) {
    __extends(SanShengSanShiFrame, _super);
    function SanShengSanShiFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SanShengSanShiFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/sanshengsanshi/SanShengLayout.exml"];
    };
    SanShengSanShiFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.mLayoutNode.setDoModal(true);
        this.mElemList["group1"].visible = false;
        this.mElemList["group2"].visible = false;
        this.mElemList["group3"].visible = false;
        this.mElemList["btn_rule"].visible = false;
        this.mElemList["weiwang_shop"].visible = false;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "radio1", wnd: MarryWindow.newObj(this.mLayoutNode, this) },
            { name: "radio2", wnd: HouseWindow.newObj(this.mLayoutNode, this) },
            { name: "radio3", wnd: MasterWindow.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        // for (let i = 1; i<4; i++) {
        // 	let rd = this.mElemList["lucky_rd"+i]
        // 	rd.setAlignFlag(gui.Flag.H_CENTER)
        // }
        this.tabWndList.setSelectedCallback(this.test, this);
        var _a, _b;
    };
    SanShengSanShiFrame.prototype.test = function () {
    };
    SanShengSanShiFrame.prototype.onUnLoad = function () {
    };
    SanShengSanShiFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = true;
        // this.onRefresh()
        this.tabWndList.setWndVisible(true);
    };
    SanShengSanShiFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    SanShengSanShiFrame.prototype.onRefresh = function () {
    };
    SanShengSanShiFrame.prototype.initItemWindow = function (window, data) {
    };
    SanShengSanShiFrame.prototype.refreshItemWindow = function (window, data) {
    };
    SanShengSanShiFrame.prototype.onClick = function (args) {
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
    return SanShengSanShiFrame;
}(BaseWnd));
__reflect(SanShengSanShiFrame.prototype, "SanShengSanShiFrame");
//# sourceMappingURL=SanShengSanShiFrame.js.map
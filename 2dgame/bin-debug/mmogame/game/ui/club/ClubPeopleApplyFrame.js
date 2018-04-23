// TypeScript file
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
var ClubPeopleApplyFrame = (function (_super) {
    __extends(ClubPeopleApplyFrame, _super);
    function ClubPeopleApplyFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubPeopleApplyFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubPeopleApplyLayout.exml"];
    };
    ClubPeopleApplyFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_change", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickForceLimit, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var checkBox = this.mElemList["select_check"];
        checkBox.addEventListener(egret.TouchEvent.CHANGE, this.onClickCheckBox, this);
        var group = this.mElemList["apply_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 5, group.width, group.height - 10, group);
        var _a, _b, _c;
    };
    ClubPeopleApplyFrame.prototype.onUnLoad = function () {
    };
    ClubPeopleApplyFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        RegisterEvent(EventDefine.GET_CLUB_APPLY_LIST, this.refreshFrame, this);
        //--刷新帮派申请列表
        RpcProxy.call("C2G_FactionApplyRefresh");
        this.refreshFrame();
    };
    ClubPeopleApplyFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.GET_CLUB_APPLY_LIST, this.refreshFrame, this);
    };
    ClubPeopleApplyFrame.prototype.refreshFrame = function () {
        var list = ClubSystem.getInstance().getApplyList();
        this.list = list;
        this.scroll.clearItemList();
        var group = this.mElemList["apply_wnd"];
        for (var i = 0; i < size_t(list); i++) {
            var v = list[i];
            var window_1 = this.scroll.getItemWindow(i, group.width, 130);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        this.scroll.refreshScroll();
        // console.log("========applyList=======")
        // table_print(list)
        //获取是否设置自动加入
        var canJoin = ClubSystem.getInstance().getClubEnterForce();
        var checkBox = this.mElemList["select_check"];
        if (canJoin == 0) {
            checkBox.selected = false;
        }
        else {
            checkBox.selected = true;
        }
        this.mElemList["edit_input"].text = canJoin;
    };
    ClubPeopleApplyFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var w = window.width;
        var h = window.height;
        var Info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["color"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = w, _a["h"] = h, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "_icon_bg", _b["parent"] = name + "bg", _b["image"] = "ty_renWuKuang01", _b["x"] = 0, _b["y"] = h - 128, _b["w"] = 140, _b["h"] = 140, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "_icon", _c["parent"] = name + "_icon_bg", _c["image"] = "zctx_90001", _c["x"] = 4, _c["y"] = 0, _c["w"] = 140, _c["h"] = 140, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = name + "_name_rd", _d["parent"] = name + "_group", _d["x"] = 135, _d["y"] = 35, _d["w"] = 250, _d["h"] = 60, _d["event_name"] = null, _d["fun_index"] = null, _d),
            (_e = {}, _e["index_type"] = gui.Button, _e["name"] = name + "okBtn", _e["title"] = Localize_cns("CLUB_TXT43"), _e["font"] = "ht_20_cc_stroke", _e["image"] = "ty_tongYongBt3", _e["color"] = gui.Color.white, _e["x"] = 310, _e["y"] = 40, _e["w"] = 117, _e["h"] = 51, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onConsentClick, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = name + "not_ok_btn", _f["title"] = Localize_cns("CLUB_TXT44"), _f["font"] = "ht_20_cc_stroke", _f["image"] = "ty_tongYongBt3", _f["color"] = gui.Color.white, _f["x"] = 430, _f["y"] = 40, _f["w"] = 117, _f["h"] = 51, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onRejectClick, _f),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c, _d, _e, _f;
    };
    ClubPeopleApplyFrame.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        this.mElemList[name + "_icon"].source = GetProfessionIcon(data.vocation, data.sexId);
        var str = "#saddlebrown" + data.name + "#space_10Lv." + data.level + "#br#ublack" + String.format(Localize_cns("CLUB_TXT61"), (data.force || 0));
        AddRdContent(this.mElemList[name + "_name_rd"], str, "ht_24_cc", "ublack", 5);
    };
    ClubPeopleApplyFrame.prototype.onClickCheckBox = function (event) {
        var select = event.target.selected;
        if (select) {
            var input = this.mElemList["edit_input"];
            RpcProxy.call("C2G_FactionEnterForceOpen", tonumber(input.text) || 0);
        }
        else {
            RpcProxy.call("C2G_FactionEnterForceOpen", 0);
        }
    };
    ClubPeopleApplyFrame.prototype.onConsentClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var data = this.list[index];
        var roleId = data.id;
        RpcProxy.call("C2G_FactionCheck", roleId, 1);
    };
    ClubPeopleApplyFrame.prototype.onRejectClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var data = this.list[index];
        var roleId = data.id;
        RpcProxy.call("C2G_FactionCheck", roleId, 0);
    };
    //刷新战力
    ClubPeopleApplyFrame.prototype.onClickForceLimit = function () {
        this.mElemList["select_check"].selected = true;
        var input = this.mElemList["edit_input"];
        RpcProxy.call("C2G_FactionEnterForce", tonumber(input.text) || 0);
    };
    return ClubPeopleApplyFrame;
}(BaseWnd));
__reflect(ClubPeopleApplyFrame.prototype, "ClubPeopleApplyFrame");
//# sourceMappingURL=ClubPeopleApplyFrame.js.map
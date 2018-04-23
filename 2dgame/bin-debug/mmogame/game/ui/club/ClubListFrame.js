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
var ClubListFrame = (function (_super) {
    __extends(ClubListFrame, _super);
    function ClubListFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubListFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubListLayout.exml"];
        this.list = [];
    };
    ClubListFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_creat", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.creatClick, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 10, 5, group.width - 20, group.height - 10, group);
        var _a, _b, _c;
    };
    ClubListFrame.prototype.onUnLoad = function () {
    };
    ClubListFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ALL_CLUB_LIST, this.refreshFrame, this);
        RegisterEvent(EventDefine.GET_CLUB_MYAPPLY_LIST, this.refreshFrame, this);
        //所有帮派信息
        RpcProxy.call("C2G_FactionInfoList");
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    ClubListFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ALL_CLUB_LIST, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.GET_CLUB_MYAPPLY_LIST, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
    };
    ClubListFrame.prototype.refreshFrame = function () {
        var heroInfo = GetHeroPropertyInfo();
        this.isHaveClub = true;
        if (heroInfo == null || heroInfo["faction"] == 0) {
            this.isHaveClub = false;
        }
        this.mElemList["btn_creat"].visible = !this.isHaveClub;
        var list = ClubSystem.getInstance().getClubInfoList();
        this.list = list;
        this.scroll.clearItemList();
        var group = this.mElemList["scroll_wnd"];
        for (var i = 0; i < size_t(list); i++) {
            var v = list[i];
            var window_1 = this.scroll.getItemWindow(i, group.width - 20, 110, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, i);
        }
        this.scroll.refreshScroll();
    };
    ClubListFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var width = window.width;
        var height = window.height;
        var Info = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "bg", _a["title"] = null, _a["font"] = null, _a["image"] = "ty_uiDi03", _a["color"] = null, _a["x"] = 0, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "num_bg", _b["title"] = null, _b["font"] = null, _b["image"] = "bh_textDi01", _b["color"] = null, _b["x"] = 15, _b["y"] = 30, _b["w"] = 45, _b["h"] = 46, _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "num", _c["parent"] = name + "num_bg", _c["title"] = "1", _c["font"] = "ht_26_cc", _c["color"] = gui.Color.white, _c["x"] = 13, _c["y"] = 8, _c["w"] = 45, _c["h"] = 46, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "nameAndLevel", _d["parent"] = name + "bg", _d["title"] = "", _d["font"] = "ht_26_lc", _d["color"] = gui.Color.saddlebrown, _d["x"] = 80, _d["y"] = 20, _d["w"] = 300, _d["h"] = 25, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = name + "bossName", _e["parent"] = name + "bg", _e["title"] = "", _e["font"] = "ht_22_lc", _e["color"] = gui.Color.saddlebrown, _e["x"] = 80, _e["y"] = 60, _e["w"] = 300, _e["h"] = 25, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = eui.Label, _f["name"] = name + "curCount", _f["parent"] = name + "bg", _f["title"] = "", _f["font"] = "ht_22_lc", _f["color"] = gui.Color.saddlebrown, _f["x"] = 270, _f["y"] = 60, _f["w"] = 150, _f["h"] = 25, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = eui.Label, _g["name"] = name + "enterForce", _g["title"] = "", _g["font"] = "ht_22_cc", _g["color"] = gui.Color.saddlebrown, _g["x"] = 375, _g["y"] = 13, _g["w"] = 194, _g["h"] = 30, _g["messageFlag"] = true, _g),
            (_h = {}, _h["index_type"] = gui.Button, _h["name"] = name + "btn", _h["title"] = Localize_cns("CLUB_TXT55"), _h["font"] = "ht_22_cc_stroke", _h["image"] = "ty_tongYongBt2", _h["color"] = gui.Color.white, _h["x"] = 425, _h["y"] = 42, _h["w"] = 94, _h["h"] = 49, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onApplyClick, _h),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    ClubListFrame.prototype.refreshItemWindow = function (window, data, index) {
        var name = window.name;
        var myApplyList = ClubSystem.getInstance().getLegionApplyList();
        //到时候在这里获取是否拥有俱乐部而现实按钮
        if (data == null || data.level == null) {
            return;
        }
        var id = data.id;
        var level = data.level;
        var leaderName = data.leader;
        var clubName = data.name;
        var memberNum = data.menberCount;
        var maxmenberCount = data.maxmenberCount;
        var logo = data.logo;
        this.mElemList[name + "num"].text = index + 1;
        var nameAndLevelText = String.format(Localize_cns("CLUB_TXT58"), clubName, level);
        this.mElemList[name + "nameAndLevel"].text = nameAndLevelText;
        var bossName = String.format(Localize_cns("CLUB_TXT59"), leaderName);
        this.mElemList[name + "bossName"].text = bossName;
        var menberText = memberNum + "/" + maxmenberCount;
        var curCountText = String.format(Localize_cns("CLUB_TXT99"), menberText);
        this.mElemList[name + "curCount"].text = curCountText;
        var forceElem = this.mElemList[name + "enterForce"];
        var needForce = data.force || 0;
        var myForce = GetHeroProperty("force") || 0;
        var applyText = "";
        if (myApplyList != null && myApplyList[id]) {
            this.mElemList[name + "btn"].source = "ty_tongYongBt6";
            applyText = Localize_cns("RENAME_TXT5");
            forceElem.text = Localize_cns("CLUB_TXT75");
        }
        else {
            this.mElemList[name + "btn"].source = "ty_tongYongBt2";
            applyText = Localize_cns("CLUB_TXT55");
            forceElem.text = Localize_cns("CLUB_TXT74") + needForce;
        }
        this.mElemList[name + "btn"].text = applyText;
        forceElem.textColor = myForce >= needForce ? gui.Color.saddlebrown : gui.Color.red;
        var heroInfo = GetHeroPropertyInfo();
        if (heroInfo == null || heroInfo["faction"] == 0) {
            this.mElemList[name + "btn"].visible = true;
            forceElem.visible = true;
        }
        else {
            this.mElemList[name + "btn"].visible = false;
            forceElem.visible = false;
        }
    };
    /////////////////////////////////////////////////////////////
    ClubListFrame.prototype.onApplyClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var data = this.list[index];
        var clubId = data.id;
        var applyReason = ""; //申请描述
        //首先判断是否能够申请
        var myApplyList = ClubSystem.getInstance().getLegionApplyList();
        if (myApplyList != null && myApplyList[clubId]) {
            RpcProxy.call("C2G_FactionCancelApply", clubId);
        }
        else {
            RpcProxy.call("C2G_FactionApply", clubId, applyReason);
        }
    };
    ClubListFrame.prototype.creatClick = function () {
        WngMrg.getInstance().showWindow("ClubCreatFrame");
    };
    ////////////////////////////////////////////////////////////
    ClubListFrame.prototype.showAndSetData = function () {
        this.showWnd();
    };
    return ClubListFrame;
}(BaseWnd));
__reflect(ClubListFrame.prototype, "ClubListFrame");
//# sourceMappingURL=ClubListFrame.js.map
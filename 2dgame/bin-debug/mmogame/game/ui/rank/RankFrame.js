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
var RankFrame = (function (_super) {
    __extends(RankFrame, _super);
    function RankFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/RankLayout.exml"];
        this.tabIndex = -1;
    };
    RankFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setFullScreen(true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        // 
        var group = this.mElemList["group_tab"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL);
        var tabInfoList = [
            { index: 0, wnd: RankPlrForcelWnd.newObj(this.mLayoutNode, this, configRankType.RANK_PLR_FORCE), titleText: Localize_cns("RANK_TXT6"), },
            { index: 1, wnd: RankPlrLevelWnd.newObj(this.mLayoutNode, this, configRankType.RANK_PLR_LEVEL), titleText: Localize_cns("RANK_TXT7"), },
            { index: 2, wnd: RankPetWnd.newObj(this.mLayoutNode, this, configRankType.RANK_PET_FORCE), titleText: Localize_cns("RANK_TXT8"), },
            { index: 3, wnd: RankXianlvlWnd.newObj(this.mLayoutNode, this, configRankType.RANK_XIAN_LV), titleText: Localize_cns("RANK_TXT9"), },
            { index: 4, wnd: RankRidelWnd.newObj(this.mLayoutNode, this, configRankType.RANK_RIDE), titleText: Localize_cns("RANK_TXT10"), },
            { index: 5, wnd: RankWingWnd.newObj(this.mLayoutNode, this, configRankType.RANK_WING), titleText: Localize_cns("RANK_TXT11"), },
            { index: 6, wnd: RankTianxianWnd.newObj(this.mLayoutNode, this, configRankType.RANK_TIAN_XIAN), titleText: Localize_cns("RANK_TXT12"), },
            { index: 7, wnd: RankImmortalsWnd.newObj(this.mLayoutNode, this, configRankType.RANK_PLR_IMMORTALS), titleText: Localize_cns("RANK_TXT13"), },
            //法阵、仙位、通灵、兽魂、天女、仙器、花辇、灵气排行
            { index: 8, wnd: RankFaZhenWnd.newObj(this.mLayoutNode, this, configRankType.RANK_FA_ZHEN), titleText: Localize_cns("RANK_TXT14"), },
            { index: 9, wnd: RankXianWeiWnd.newObj(this.mLayoutNode, this, configRankType.RANK_XIAN_WEI), titleText: Localize_cns("RANK_TXT15"), },
            { index: 10, wnd: RankTongLingWnd.newObj(this.mLayoutNode, this, configRankType.RANK_TONG_LING), titleText: Localize_cns("RANK_TXT16"), },
            { index: 11, wnd: RankShouHunWnd.newObj(this.mLayoutNode, this, configRankType.RANK_SHOU_HUN), titleText: Localize_cns("RANK_TXT17"), },
            { index: 12, wnd: RankTianNvWnd.newObj(this.mLayoutNode, this, configRankType.RANK_TIAN_NV), titleText: Localize_cns("RANK_TXT18"), },
            { index: 13, wnd: RankXianQiWnd.newObj(this.mLayoutNode, this, configRankType.RANK_XIAN_QI), titleText: Localize_cns("RANK_TXT19"), },
            { index: 14, wnd: RankHuaNianWnd.newObj(this.mLayoutNode, this, configRankType.RANK_HUAN_NIAN), titleText: Localize_cns("RANK_TXT20"), },
            { index: 15, wnd: RankLingQigWnd.newObj(this.mLayoutNode, this, configRankType.RANK_LING_QI), titleText: Localize_cns("RANK_TXT21"), },
        ];
        this.radio_data = [];
        for (var i = 0; i < size_t(tabInfoList); i++) {
            var v = tabInfoList[i];
            var window_1 = this.scroll.getItemWindow(v.index, 155, 71, 0, 0, 0);
            this.initItemWindow(window_1, v);
            this.refreshItemWindow(window_1, v);
        }
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, this.radio_data);
        //this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList)
        this.mElemList["actorview"] = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["group_actorview"]);
        this.mElemList["actorview2"] = UIActorView.newObj(this.mLayoutNode, "actorview", 0, 0, this.mElemList["group_actorview"]);
        //this.mElemList["actorview"].updateByPlayer(20001)
        var list = this.mElemList["list_rank"];
        list.itemRenderer = itemRender.RankItem;
        var _a, _b;
    };
    RankFrame.prototype.onUnLoad = function () {
    };
    RankFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    RankFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    RankFrame.prototype.initItemWindow = function (window, data) {
        var name = window.name;
        var imageName = "sd_biaoQian02";
        var imageDownName = "sd_biaoQian01";
        var width = 155, height = 71;
        var Info = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "bg", _a["image"] = "", _a["x"] = 0, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = eui.RadioButton, _b["name"] = name, _b["image"] = imageName, _b["font"] = "ht_20_cc_stroke", _b["image_down"] = imageDownName, _b["x"] = 0, _b["y"] = 0, _b["w"] = width, _b["h"] = height, _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "text", _c["parent"] = name, _c["title"] = "", _c["font"] = "ht_24_cc_stroke", _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = width, _c["h"] = height, _c["messageFlag"] = true, _c),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c;
    };
    RankFrame.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        data.name = name;
        this.mElemList[name + "text"].text = data.titleText;
        table_insert(this.radio_data, data);
    };
    ////////////////////////////////////////////////////////////////////////////////////
    //以0开头，0是第一个标签
    RankFrame.prototype.showWithIndex = function (index) {
        if (index == null) {
            index = 0;
        }
        this.tabIndex = index;
        this.showWnd();
    };
    return RankFrame;
}(BaseWnd));
__reflect(RankFrame.prototype, "RankFrame");
//# sourceMappingURL=RankFrame.js.map
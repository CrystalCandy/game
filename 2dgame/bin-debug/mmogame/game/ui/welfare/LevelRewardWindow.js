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
var LevelRewardWindow = (function (_super) {
    __extends(LevelRewardWindow, _super);
    function LevelRewardWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelRewardWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    LevelRewardWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var group = this.mElemList["level_list"];
        this.levelScroll = UIScrollList.newObj(this.mLayoutNode, "levelScroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL);
    };
    LevelRewardWindow.prototype.onUnLoad = function () {
    };
    LevelRewardWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab2"].visible = true;
        // RpcProxy.call("C2G_SendOperatePlayerData",PayActivityIndex.INVEST_PLAN)
        this.onRefresh();
    };
    LevelRewardWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab2"].visible = false;
    };
    LevelRewardWindow.prototype.onRefresh = function () {
        var levelInfo = getSaveRecord(opSaveRecordKey.levelReward);
        this.levelInfo = levelInfo;
        var list = [];
        for (var _ in GameConfig.LevelRewardConfig) {
            var v = GameConfig.LevelRewardConfig[_];
            table_insert(list, v);
        }
        this.nameToIndex = [];
        var scroll = this.levelScroll;
        scroll.clearItemList();
        for (var i = 0; i < size_t(list); i++) {
            var v = list[i];
            var window_1 = this.levelScroll.getItemWindow(i, 565, 135, 0, 0, 5);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        // this.levelScroll.refreshScroll()
        // this.levelScroll.restoreViewXY() 
    };
    LevelRewardWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var width = 555, height = 135;
        var Info = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "bg", _a["image"] = "", _a["x"] = 5, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "bg1", _b["parent"] = name + "bg", _b["title"] = null, _b["font"] = null, _b["image"] = "ty_uiDi03", _b["color"] = null, _b["x"] = 0, _b["y"] = 0, _b["w"] = width, _b["h"] = height, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "tip_bg", _c["parent"] = name + "bg", _c["title"] = null, _c["font"] = null, _c["image"] = "fldt_biaoTiDi01", _c["color"] = null, _c["x"] = 10, _c["y"] = 10, _c["w"] = 336, _c["h"] = 32, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "tip", _d["parent"] = name + "tip_bg", _d["title"] = "", _d["font"] = "ht_24_cc", _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = 0, _d["w"] = 336, _d["h"] = 32, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = gui.RichDisplayer, _e["name"] = name + "level_rd", _e["title"] = "", _e["font"] = "ht_24_cc", _e["color"] = gui.Color.white, _e["x"] = 395, _e["y"] = 25, _e["w"] = 117, _e["h"] = 25, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = name + "getBtn", _f["title"] = "", _f["font"] = "ht_20_cc_stroke", _f["image"] = "ty_tongYongBt3", _f["color"] = gui.Color.white, _f["x"] = 395, _f["y"] = 60, _f["w"] = 117, _f["h"] = 51, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onClick, _f),
            (_g = {}, _g["index_type"] = eui.Image, _g["name"] = name + "btnTips", _g["parent"] = name + "getBtn", _g["title"] = "", _g["font"] = "ht_20_lc", _g["image"] = "zjm_hongDian01", _g["color"] = gui.Color.white, _g["x"] = 77, _g["y"] = 0, _g["w"] = 40, _g["h"] = 40, _g["event_name"] = null, _g["fun_index"] = null, _g["messageFlag"] = true, _g),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList[name + "level_rd"].setAlignFlag(gui.Flag.H_CENTER);
        for (var i = 0; i < 4; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mElemList, name + "itemBox" + i, i * 85 + 15, 50, this.mElemList[name + "bg"], 0.9);
        }
        var _a, _b, _c, _d, _e, _f, _g;
    };
    LevelRewardWindow.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        var curLevel = GetHeroProperty("level") || 0;
        var needLevel = data.leve;
        var prizeList = data.prize;
        var itemList = AnalyPrizeFormat(prizeList);
        for (var i = 0; i < 4; i++) {
            var itemInfo = itemList[i];
            if (itemInfo) {
                this.mElemList[name + "itemBox" + i].updateByEntry(itemInfo[0], itemInfo[1]);
            }
            else {
                this.mElemList[name + "itemBox" + i].updateByEntry(-1);
            }
        }
        var canGet = false;
        if (curLevel >= needLevel) {
            canGet = true;
        }
        var isGet = false;
        if (this.levelInfo && this.levelInfo[needLevel]) {
            isGet = true;
        }
        this.mElemList[name + "getBtn"].enabled = false;
        this.mElemList[name + "btnTips"].visible = false;
        if (isGet) {
            this.mElemList[name + "getBtn"].text = Localize_cns("WELFARE_TXT5");
        }
        else {
            this.mElemList[name + "getBtn"].text = Localize_cns("WELFARE_TXT4");
            if (canGet) {
                this.mElemList[name + "getBtn"].enabled = true;
                this.mElemList[name + "btnTips"].visible = true;
            }
        }
        var colorStr = "#black";
        if (needLevel > curLevel) {
            colorStr = "#red";
        }
        var rdStr = colorStr + curLevel + "#rf/" + needLevel;
        AddRdContent(this.mElemList[name + "level_rd"], rdStr, "ht_24_cc", "black");
        this.mElemList[name + "tip"].text = String.format(Localize_cns("WELFARE_TXT22"), needLevel);
        this.nameToIndex[name + "getBtn"] = needLevel;
    };
    LevelRewardWindow.prototype.onClick = function (args) {
        var name = args.target.name;
        if (this.nameToIndex[name] == null) {
            return;
        }
        var index = this.nameToIndex[name];
        var num = tonumber(index);
        RpcProxy.call("C2G_LevelPrize", num);
    };
    return LevelRewardWindow;
}(BaseCtrlWnd));
__reflect(LevelRewardWindow.prototype, "LevelRewardWindow");
//# sourceMappingURL=LevelRewardWindow.js.map
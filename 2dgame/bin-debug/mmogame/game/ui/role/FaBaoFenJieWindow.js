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
var FaBaoFenJieWindow = (function (_super) {
    __extends(FaBaoFenJieWindow, _super);
    function FaBaoFenJieWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaBaoFenJieWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    FaBaoFenJieWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_fenjie", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onFenJieClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["fenjie_scroll"];
        this.fenjieScroll = UIScrollList.newObj(this.mLayoutNode, "fenjieScroll", 0, 0, group.width, group.height, group);
        for (var k = 1; k <= 6; k++) {
            var cBox = this.mElemList["cBox_fenjie_" + k];
            cBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cBoxClick, this);
            if (k <= 4) {
                cBox.selected = true;
            }
        }
        var _a;
    };
    FaBaoFenJieWindow.prototype.onUnLoad = function () {
    };
    FaBaoFenJieWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTOR_ROLE_FABAO_UPDATE, this.onRefresh, this);
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mElemList["group_fenjie"].visible = true;
        this.mElemList["title"].text = Localize_cns("FABAO_TITLE_TXT4");
        this.mElemList["btn_quality"].visible = false;
        this.onRefresh();
    };
    FaBaoFenJieWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTOR_ROLE_FABAO_UPDATE, this.onRefresh, this);
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mElemList["group_fenjie"].visible = false;
        this.mElemList["btn_quality"].visible = true;
    };
    FaBaoFenJieWindow.prototype.onRefresh = function () {
        //huode 
        var itemType = opItemType.ROLE_ALLSMAN;
        var list = ItemSystem.getInstance().getItemLogicInfoByType(itemType);
        var count = 0;
        var meltConfig = GameConfig.TalismanEquipMeltConfig;
        for (var k in list) {
            var item = list[k];
            if (item.getProperty("talisman_lock") != 0)
                continue;
            var quality = item.getProperty("quality");
            var tempConfig = meltConfig[quality];
            count += tempConfig.wardNum;
        }
        this.mElemList["label_count"].text = tostring(count);
        this.refreshScroll();
    };
    FaBaoFenJieWindow.prototype.refreshScroll = function () {
        var typeList = [];
        this.controlData = {};
        for (var k = 1; k <= 6; k++) {
            var cBox = this.mElemList["cBox_fenjie_" + k];
            if (cBox.selected) {
                table_insert(typeList, k);
            }
        }
        var scroll = this.fenjieScroll;
        scroll.clearItemList();
        var itemType = opItemType.ROLE_ALLSMAN;
        var list = ItemSystem.getInstance().getItemLogicInfoByType(itemType);
        var handlelist = [];
        for (var k in list) {
            var item = list[k];
            var quality = item.getProperty("quality");
            var cBox = this.mElemList["cBox_fenjie_" + quality];
            if (cBox && cBox.selected == true) {
                table_insert(handlelist, item);
            }
        }
        var showList = splitListByCount(handlelist, 5);
        for (var k = 0; k < size_t(showList); k++) {
            var v = showList[k];
            var window_1 = scroll.getItemWindow(k, 550, 100, 0, 0);
            this.onInitWindow(window_1);
            this.refreshWidow(window_1, v, k);
        }
        scroll.refreshScroll(true, true);
        scroll.restoreViewXY();
    };
    FaBaoFenJieWindow.prototype.onInitWindow = function (window) {
        var name = window.name;
        var w = 100;
        var height = window.height;
        for (var k = 1; k <= 5; k++) {
            var x = 110 * (k - 1);
            var windName = "_fenjie" + k;
            var mElemInfo = [
                (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + windName + "_group", _a["title"] = "", _a["x"] = x, _a["y"] = 0, _a["w"] = w, _a["h"] = height, _a),
                (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + windName + "_bg", _b["parent"] = name + windName + "_group", _b["image"] = "ty_jiNengDi03", _b["x"] = 0, _b["y"] = 0, _b["w"] = w, _b["h"] = height, _b),
                (_c = {}, _c["index_type"] = eui.Image, _c["name"] = name + windName + "_item", _c["parent"] = name + windName + "_group", _c["title"] = "", _c["font"] = "", _c["image"] = "", _c["color"] = null, _c["x"] = 11, _c["y"] = 11, _c["w"] = 80, _c["h"] = 80, _c),
                (_d = {}, _d["index_type"] = gui.Button, _d["name"] = name + windName + "_suo", _d["parent"] = name + windName + "_group", _d["title"] = "", _d["font"] = "", _d["image"] = "cw_jiNengSuo02", _d["x"] = 70, _d["y"] = 0, _d["w"] = 32, _d["h"] = 41, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onSuoClick, _d),
                (_e = {}, _e["index_type"] = eui.Image, _e["name"] = name + windName + "_name_bg", _e["parent"] = name + windName + "_group", _e["title"] = "", _e["font"] = "", _e["image"] = "fb_faBaoTextDi01", _e["color"] = null, _e["x"] = 4, _e["y"] = 75, _e["w"] = 94, _e["h"] = 34, _e["messageFlag"] = true, _e),
                (_f = {}, _f["index_type"] = eui.Label, _f["name"] = name + windName + "_name", _f["parent"] = name + windName + "_group", _f["title"] = "", _f["font"] = "ht_20_cc", _f["image"] = "", _f["color"] = gui.Color.white, _f["x"] = 0, _f["y"] = 82, _f["w"] = w, _f["h"] = 20, _f["messageFlag"] = true, _f),
            ];
            UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
            var group = this.mElemList[name + windName + "_item"];
            group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenTipsClick, this);
        }
        var _a, _b, _c, _d, _e, _f;
    };
    FaBaoFenJieWindow.prototype.refreshWidow = function (window, config, index) {
        var name = window.name;
        for (var k = 1; k <= 5; k++) {
            var windName = "_fenjie" + k;
            var item = config[k - 1];
            if (item) {
                var dataKey = tostring(index) + k;
                this.controlData[dataKey] = item;
                this.mElemList[name + windName + "_group"].visible = true;
                var itemName = item.getRefProperty("name");
                var icon = GetItemIcon(item.entryId);
                var image = item.getProperty("talisman_lock") == 0 ? "cw_jiNengSuo02" : "cw_jiNengSuo03";
                var fontColor = GetItemFontGUIColor(item.entryId);
                this.mElemList[name + windName + "_item"].source = icon;
                this.mElemList[name + windName + "_name"].textColor = fontColor;
                this.mElemList[name + windName + "_name"].text = itemName;
                this.mElemList[name + windName + "_suo"].source = image;
            }
            else {
                this.mElemList[name + windName + "_group"].visible = false;
            }
        }
    };
    ///------------响应
    FaBaoFenJieWindow.prototype.cBoxClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        this.refreshScroll();
    };
    FaBaoFenJieWindow.prototype.onFenJieClick = function () {
        //"C2G_EquipTalismanResolve":"table",
        var itemType = opItemType.ROLE_ALLSMAN;
        var list = ItemSystem.getInstance().getItemLogicInfoByType(itemType);
        var gIdList = [];
        for (var k in list) {
            var item = list[k];
            if (item.getProperty("talisman_lock") == 0) {
                table_insert(gIdList, item.id);
            }
        }
        RpcProxy.call("C2G_EquipTalismanResolve", gIdList);
    };
    FaBaoFenJieWindow.prototype.onSuoClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var item = this.controlData[index];
        var sendNumber = this.mElemList[name].source == "cw_jiNengSuo02" ? 1 : 0;
        RpcProxy.call("C2G_EquipTalismanLock", item.id, sendNumber);
    };
    FaBaoFenJieWindow.prototype.onOpenTipsClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var item = this.controlData[index];
        var wnd = WngMrg.getInstance().getWindow("FaBaoItemTipsFrame");
        wnd.onShowWnd(item, true);
    };
    return FaBaoFenJieWindow;
}(BaseCtrlWnd));
__reflect(FaBaoFenJieWindow.prototype, "FaBaoFenJieWindow");
//# sourceMappingURL=FaBaoFenJieWindow.js.map
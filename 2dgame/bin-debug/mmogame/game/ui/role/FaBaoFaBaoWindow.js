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
var FaBaoFaBaoWindow = (function (_super) {
    __extends(FaBaoFaBaoWindow, _super);
    function FaBaoFaBaoWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FaBaoFaBaoWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    FaBaoFaBaoWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.actor = this.mParentWnd.actor;
        var group = this.mElemList["fabao"];
        this.fabaoScroll = UIScrollList.newObj(this.mLayoutNode, "fabaoScroll", 0, 0, group.width, group.height, group);
    };
    FaBaoFaBaoWindow.prototype.onUnLoad = function () {
    };
    FaBaoFaBaoWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mElemList["group_fabao"].visible = true;
        this.mElemList["fabao"].visible = true;
        this.mElemList["title"].text = Localize_cns("FABAO_TITLE_TXT1");
        this.onRefresh();
    };
    FaBaoFaBaoWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mElemList["group_fabao"].visible = false;
        this.mElemList["fabao"].visible = false;
        this.mParentWnd.selectIndex = this.select;
    };
    FaBaoFaBaoWindow.prototype.onRefresh = function () {
        this.mParentWnd.refreshFaBaoItem();
        var fabaoInfo = RoleSystem.getInstance().getFaBaoInfo();
        if (fabaoInfo == null)
            return;
        var force = fabaoInfo["force"];
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3);
        this.select = this.mParentWnd.selectIndex || 2;
        this.mElemList["btn_quality"].visible = true;
        var playerInfo = GetHeroPropertyInfo();
        var actorView = this.actor;
        actorView.updateByPlayerAppearInfo(playerInfo);
        for (var k = 1; k <= 4; k++) {
            this.mElemList["image_select_" + k].visible = false;
        }
        this.mElemList["image_select_" + this.select].visible = true;
        //滑动区域
        var scroll = this.fabaoScroll;
        this.controlData = {};
        scroll.clearItemList();
        var itemType = opItemType.ROLE_ALLSMAN;
        var list = ItemSystem.getInstance().getItemLogicInfoByType(itemType);
        var showList = splitListByCount(list, 4);
        for (var k = 0; k < size_t(showList); k++) {
            var v = showList[k];
            var window_1 = scroll.getItemWindow(k, 440, 102, 0, 0);
            this.onInitWindow(window_1);
            this.refreshWidow(window_1, v, k);
        }
        scroll.refreshScroll(true, true);
        scroll.restoreViewXY();
    };
    FaBaoFaBaoWindow.prototype.onInitWindow = function (window) {
        var name = window.name;
        var w = 102;
        var height = window.height;
        for (var k = 1; k <= 4; k++) {
            var x = 112 * (k - 1);
            var windName = "_fabao" + k;
            var mElemInfo = [
                (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + windName + "_group", _a["title"] = "", _a["x"] = x, _a["y"] = 0, _a["w"] = w, _a["h"] = height, _a),
                (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + windName + "_bg", _b["parent"] = name + windName + "_group", _b["image"] = "fb_faBaoDi01", _b["x"] = 0, _b["y"] = 0, _b["w"] = w, _b["h"] = height, _b["messageFlag"] = true, _b),
                (_c = {}, _c["index_type"] = eui.Image, _c["name"] = name + windName + "_item", _c["parent"] = name + windName + "_group", _c["title"] = "", _c["font"] = "", _c["image"] = "ty_zhuangBeiBg03", _c["color"] = null, _c["x"] = 11, _c["y"] = 11, _c["w"] = 80, _c["h"] = 80, _c),
                (_d = {}, _d["index_type"] = gui.Button, _d["name"] = name + windName + "_suo", _d["parent"] = name + windName + "_group", _d["title"] = "", _d["font"] = "", _d["image"] = "cw_jiNengSuo02", _d["x"] = 70, _d["y"] = 0, _d["w"] = 32, _d["h"] = 41, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onSuoClick, _d),
                (_e = {}, _e["index_type"] = eui.Image, _e["name"] = name + windName + "_name_bg", _e["parent"] = name + windName + "_group", _e["title"] = "", _e["font"] = "", _e["image"] = "fb_faBaoTextDi01", _e["color"] = null, _e["x"] = 4, _e["y"] = 75, _e["w"] = 94, _e["h"] = 34, _e["messageFlag"] = true, _e),
                (_f = {}, _f["index_type"] = eui.Label, _f["name"] = name + windName + "_name", _f["parent"] = name + windName + "_group", _f["title"] = "", _f["font"] = "ht_20_cc", _f["image"] = "", _f["color"] = gui.Color.white, _f["x"] = 0, _f["y"] = 82, _f["w"] = w, _f["h"] = 20, _f["messageFlag"] = true, _f),
            ];
            UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
            var group = this.mElemList[name + windName + "_item"];
            group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaBaoWear, this);
        }
        var _a, _b, _c, _d, _e, _f;
    };
    FaBaoFaBaoWindow.prototype.refreshWidow = function (window, config, index) {
        var name = window.name;
        for (var k = 1; k <= 4; k++) {
            var windName = "_fabao" + k;
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
    ////////------------响应事件
    FaBaoFaBaoWindow.prototype.onFaBaoClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        this.select = tonumber(index);
        this.mParentWnd.selectIndex = this.select;
        for (var k = 1; k <= 4; k++) {
            this.mElemList["image_select_" + k].visible = false;
        }
        this.mElemList["image_select_" + this.select].visible = true;
    };
    FaBaoFaBaoWindow.prototype.onFaBaoWear = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var item = this.controlData[index];
        if (item == null)
            return;
        var osTime = GetServerTime();
        if (this.mElemList[name].touchTime == null) {
            this.mElemList[name].touchTime = osTime;
        }
        var diffTime = osTime - this.mElemList[name].touchTime;
        if (diffTime != 0 && diffTime <= 1) {
            MsgSystem.addTagTips("shuangji");
            this.mElemList[name].touchTime == null;
        }
        else {
            var wnd = WngMrg.getInstance().getWindow("FaBaoItemTipsFrame");
            wnd.onShowWnd(item, true, this.select);
        }
    };
    FaBaoFaBaoWindow.prototype.onSuoClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var item = this.controlData[index];
        var sendNumber = this.mElemList[name].source == "cw_jiNengSuo02" ? 1 : 0;
        RpcProxy.call("C2G_EquipTalismanLock", item.id, sendNumber);
    };
    return FaBaoFaBaoWindow;
}(BaseCtrlWnd));
__reflect(FaBaoFaBaoWindow.prototype, "FaBaoFaBaoWindow");
//# sourceMappingURL=FaBaoFaBaoWindow.js.map
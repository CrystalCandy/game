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
var ForgeFrame = (function (_super) {
    __extends(ForgeFrame, _super);
    function ForgeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForgeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ForgeLayout.exml"];
        this.tabIndex = -1;
        this.select = -1;
    };
    ForgeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.onInitEquip();
        this.mElemList["rd_1"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_baoshi"].setAlignFlag(gui.Flag.LEFT_TOP);
        this.mElemList["rd_shuLianDu"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_cost"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_access"].setAlignFlag(gui.Flag.RIGHT_CENTER);
        this.mElemList["label_jie"].textColor = gui.Color.orange;
        var elem = this.mElemList["rd_access"];
        elem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAccessClick, this);
        var group = this.mElemList["dashi_icon"];
        group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDaShi, this);
        var tabInfoList = [
            { name: "strengthen", wnd: ForgeStrengthenWindow.newObj(this.mLayoutNode, this) },
            { name: "refine", wnd: ForgeRefineWindow.newObj(this.mLayoutNode, this) },
            { name: "duanZao", wnd: ForgeDuanZaoWindow.newObj(this.mLayoutNode, this) },
            { name: "baoShi", wnd: ForgeBaoShiWindow.newObj(this.mLayoutNode, this) },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        var _a, _b;
    };
    ForgeFrame.prototype.onUnLoad = function () {
    };
    ForgeFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        this.onRefresh();
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    ForgeFrame.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.FORGE_UPDATE, this.onRefresh, this)
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    ForgeFrame.prototype.onInitEquip = function () {
        var equipList = [300001, 300002, 300003, 300004, 300005, 300006, 300007, 300008, 300009, 300010];
        var arr = GameConfig.Legendequip;
        var name = "equipItem";
        for (var i = 1; i <= 10; i++) {
            if (this.mElemList[name + "_name" + i])
                return;
            var id = equipList[i - 1];
            var mElemInfo = [
                (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "_group" + i, _a["title"] = "", _a["font"] = "", _a["image"] = null, _a["color"] = gui.Color.white, _a["x"] = 17, _a["y"] = 17, _a["w"] = 80, _a["h"] = 80, _a["messageFlag"] = true, _a),
                (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name + "_select" + i, _b["image"] = "ty_xuanZhongKuang01", _b["x"] = 0, _b["y"] = 0, _b["w"] = 0, _b["h"] = 0, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
                (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_name" + i, _c["title"] = arr[id].name, _c["font"] = "ht_20_cc_stroke", _c["image"] = null, _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 67, _c["w"] = 113, _c["h"] = 20, _c["messageFlag"] = true, _c),
                (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "_lv" + i, _d["parent"] = name + "_select" + i, _d["title"] = "", _d["font"] = "ht_18_rc_stroke", _d["image"] = null, _d["color"] = gui.Color.yellow, _d["x"] = 0, _d["y"] = 20, _d["w"] = 94, _d["h"] = 18, _d["messageFlag"] = true, _d),
            ];
            UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, this.mElemList["group_" + i]);
            this.mElemList[name + "_select" + i].visible = false;
            if (!this.mElemList[name + "itemBox" + i]) {
                this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 0, 0, this.mElemList[name + "_group" + i]);
            }
            this.mElemList[name + "_group" + i].visible = false;
        }
        var _a, _b, _c, _d;
    };
    ForgeFrame.prototype.onRefresh = function () {
        //RoleSystem.getInstance().getRecvInfo("RoleEquip")
        var equipList = RoleSystem.getInstance().getRoleEquipItemList();
        if (size_t(equipList) == 0)
            return;
        var name = "equipItem";
        var subtypeList = GameConfig.FunEquipCaseConfig["Hero"].subtype;
        for (var k in equipList) {
            var item = equipList[k];
            var index = 1;
            for (var key in subtypeList) {
                if (subtypeList[key] == item.getRefProperty("subtype")) {
                    index = tonumber(key) + 1;
                }
            }
            this.mElemList[name + "_group" + index].visible = true;
            this.mElemList[name + "itemBox" + index].updateByItem(item);
            this.mElemList[name + "_group" + index].visible = true;
        }
    };
    //////////////////////////////btn响应事件
    ForgeFrame.prototype.onClickDaShi = function () {
        var index = this.tabWndList.getTabIndex();
        var wnd = WngMrg.getInstance().getWindow("ForgeLevelFrame");
        wnd.onShowWnd(index);
    };
    ForgeFrame.prototype.onAccessClick = function () {
        var str = ["MoneyChargeFrame", "GoodsAsseceFrame", "GoodsAsseceFrame", "GoodsAsseceFrame"];
        var index = this.tabWndList.getTabIndex();
        var wnd = WngMrg.getInstance().getWindow(str[index]);
        if (index == 0) {
            wnd.showWnd();
        }
        else {
            var typeName = elemForgeNames[index];
            var level = ForgeSystem.getInstance().getForgeTypeLevel(typeName);
            var itemid = GameConfig.FunForgeConfig[typeName][level + 1].itemid;
            var had = ItemSystem.getInstance().getItemCount(itemid);
            var maxCost = GameConfig.FunForgeConfig[typeName][level + 1].itemnum;
            wnd.onShowWnd(itemid, maxCost - had);
        }
    };
    ForgeFrame.prototype.showWithIndex = function (index) {
        this.tabIndex = index;
        this.showWnd();
    };
    return ForgeFrame;
}(BaseWnd));
__reflect(ForgeFrame.prototype, "ForgeFrame");
//# sourceMappingURL=ForgeFrame.js.map
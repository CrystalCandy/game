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
var ShopEquipWindow = (function (_super) {
    __extends(ShopEquipWindow, _super);
    function ShopEquipWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShopEquipWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ShopEquipWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var group = this.mElemList["equip_shop"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "equipScroll", 0, 0, group.width, group.height, group);
        var equipGroup = this.mElemList["equip_shop_scroll"];
        this.equipScroll = UIScrollList.newObj(this.mLayoutNode, "equipScroll", 0, 0, equipGroup.width, equipGroup.height, equipGroup);
        this.select = -1;
    };
    ShopEquipWindow.prototype.onUnLoad = function () {
    };
    ShopEquipWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this);
        this.mElemList["group_tempcell"].visible = false;
        this.mElemList["group_equip"].visible = true;
        this.onRefresh();
        //   this.onRefreshItemShow()
    };
    ShopEquipWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.SHOP_FUN_UPDATE, this.onRefresh, this);
        this.mElemList["group_equip"].visible = false;
    };
    ShopEquipWindow.prototype.onRefresh = function () {
        var groupName = ShopSystem.SHOP_ZHUANGBEI;
        this.mElemList["group_richang"].visible = false;
        this.mElemList["rd_access"].visible = true;
        var hadLimit = ShopSystem.getInstance().getHeroJudge(opJudgeJieSuo.GAMECASENUM);
        var limitStr = "#white" + Localize_cns("SHOP_HAD_TXT1") + "#lime" + hadLimit;
        AddRdContent(this.mElemList["rd_limit"], limitStr, "ht_20_cc");
        AddRdContent(this.mElemList["rd_access"], "#lime" + Localize_cns("ACCESS_TXT2"), "ht_20_cc");
        this.mElemList["rd_access"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAccessClick, this);
        var equipEntry = ShopSystem.getInstance().getShopEntryByGroupName(groupName);
        this.mElemList["title"].text = ShopSystem.getInstance().getShopNameByEntry(equipEntry);
        var showlist = ShopSystem.getInstance().getShopEquipItemList();
        var scroll = this.scroll;
        scroll.clearItemList();
        for (var k = 0; k < size_t(showlist); k++) {
            var entry = showlist[k];
            var window_1 = scroll.getItemWindow(k, 155, 71, 0, 0);
            this.initBtnItemWindow(window_1);
            this.refreshBtnItemWindow(window_1, entry);
        }
        scroll.refreshScroll(true, true);
        scroll.restoreViewXY();
        //频道单选
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onBtnClick, this);
        for (var i = 0; i < size_t(showlist); i++) {
            var radioBtn_1 = this.mElemList["group" + i + "_radio"];
            radioBtn_1.group = radioGroup;
            radioBtn_1.value = i;
        }
        if (this.select == -1) {
            this.select = 0;
        }
        var radioBtn = this.mElemList["group" + this.select + "_radio"];
        radioBtn.selected = true;
        this.type = showlist[this.select];
        this.onRefreshItemShow();
    };
    ShopEquipWindow.prototype.initBtnItemWindow = function (window) {
        var name = window.name;
        var elemInfo = [
            (_a = {}, _a["index_type"] = eui.RadioButton, _a["name"] = name + "_radio", _a["image"] = "sd_biaoQian02", _a["font"] = "ht_22_cc", _a["image_down"] = "sd_biaoQian01", _a["x"] = -8, _a["y"] = 0, _a["w"] = 155, _a["h"] = 71, _a["event_name"] = null, _a["fun_index"] = null, _a),
        ];
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, window);
        var _a;
    };
    ShopEquipWindow.prototype.refreshBtnItemWindow = function (window, entry) {
        var name = window.name;
        this.mElemList[name + "_radio"].label = ShopSystem.getInstance().getShopNameByEntry(entry);
    };
    ShopEquipWindow.prototype.onRefreshItemShow = function () {
        var list = ShopSystem.getInstance().getShopItemList(this.type);
        var scroll = this.equipScroll;
        scroll.clearItemList();
        for (var k = 0; k < size_t(list); k++) {
            var config = list[k];
            var window_2 = scroll.getItemWindow(k, 393, 130, 0, 0);
            this.initEquipItemWindow(window_2);
            this.refreshEquipItemWindow(window_2, config);
        }
        scroll.refreshScroll(true, true);
        scroll.restoreViewXY();
    };
    ShopEquipWindow.prototype.initEquipItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_equip_bg", _a["title"] = "", _a["font"] = "ht_20_cc", _a["image"] = "ty_uiDi03", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 393, _a["h"] = 130, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "_equip_name", _b["titile"] = "", _b["font"] = "ht_20_lc", _b["image"] = "", _b["color"] = gui.Color.black, _b["x"] = 109, _b["y"] = 29, _b["w"] = 200, _b["h"] = 20, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "_cost_bg", _c["title"] = "", _c["font"] = "ht_20_cc", _c["image"] = "ty_textDi01", _c["color"] = gui.Color.white, _c["x"] = 109, _c["y"] = 65, _c["w"] = 100, _c["h"] = 26, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Group, _d["name"] = name + "_equip_item", _d["title"] = "", _d["font"] = "ht_20_cc", _d["color"] = gui.Color.white, _d["x"] = 20, _d["y"] = 20, _d["w"] = 80, _d["h"] = 80, _d),
            (_e = {}, _e["index_type"] = gui.RichDisplayer, _e["name"] = name + "_equip_cost", _e["parent"] = name + "_cost_bg", _e["titile"] = "", _e["font"] = "ht_20_cc", _e["image"] = "", _e["color"] = gui.Color.white, _e["x"] = 0, _e["y"] = 3, _e["w"] = 90, _e["h"] = 20, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = gui.RichDisplayer, _f["name"] = name + "_equip_limit", _f["title"] = "", _f["font"] = "ht_20_cc", _f["image"] = "", _f["color"] = gui.Color.white, _f["x"] = 281, _f["y"] = 29, _f["w"] = 200, _f["h"] = 20, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = gui.Button, _g["name"] = name + "_btn_buy", _g["title"] = Localize_cns("SHOP_TXT5"), _g["font"] = "ht_20_cc_stroke", _g["image"] = "ty_tongYongBt2", _g["color"] = gui.Color.white, _g["x"] = 281, _g["y"] = 54, _g["w"] = 94, _g["h"] = 49, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onBuyClick, _g),
            (_h = {}, _h["index_type"] = gui.RichDisplayer, _h["name"] = name + "_equip_force", _h["title"] = "", _h["font"] = "ht_16_cc", _h["image"] = "", _h["color"] = gui.Color.white, _h["x"] = 20, _h["y"] = 100, _h["w"] = 200, _h["h"] = 20, _h["messageFlag"] = true, _h),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList[name + "_equipBox"] = UIItemBox.newObj(this.mLayoutNode, name + "_equipBox", 0, 0, this.mElemList[name + "_equip_item"]);
        this.mElemList[name + "_equip_limit"].visible = false;
        this.mElemList[name + "_equip_force"].visible = false;
        this.mElemList[name + "_equip_cost"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    ShopEquipWindow.prototype.refreshEquipItemWindow = function (window, config) {
        var name = window.name;
        var id = config.itemEntry;
        var item = GameConfig.itemConfig[id];
        var equipName = "";
        //是否装备
        if (config.shopEntry == 5) {
            equipName = item.name;
        }
        else {
            var itemInfo = {};
            itemInfo.entry = id;
            itemInfo.quality = config.quality;
            var this_item = Item.newObj(itemInfo);
            var subtype = this_item.getRefProperty("subtype");
            var roleEquip = RoleSystem.getInstance().getRoleEquipItem(subtype);
            equipName = item.name + String.format("(Lv.%d)", this_item.getRefProperty("level"));
            var itemPro = GetRoleEquipBaseProperty(this_item.entryId, this_item.getProperty("quality"));
            var itemForce = GetForceMath(itemPro);
            if (roleEquip != null) {
                var ePro = GetRoleEquipBaseProperty(roleEquip.entryId, roleEquip.getProperty("quality"));
                var eForce = GetForceMath(ePro);
                if (itemForce < eForce) {
                    this.mElemList[name + "_equip_force"].visible = false;
                }
                else {
                    this.mElemList[name + "_equip_force"].visible = true;
                    var addStr = String.format(Localize_cns("SHOP_TXT6"), itemForce - eForce);
                    AddRdContent(this.mElemList[name + "_equip_force"], addStr, "ht_16_cc");
                }
            }
            else {
                this.mElemList[name + "_equip_force"].visible = true;
                var addStr = String.format(Localize_cns("SHOP_TXT6"), itemForce);
                AddRdContent(this.mElemList[name + "_equip_force"], addStr, "ht_16_cc");
            }
            //如果该装备大于人物装备那么显示
        }
        this.mElemList[name + "_equip_name"].text = equipName;
        this.mElemList[name + "_equipBox"].updateByEntry(id);
        var limit = ShopSystem.getInstance().getLimitTwice(config.shopEntry, config.Index);
        if (limit != 0) {
            var hadBuy = ShopSystem.getInstance().getShopInfo(config.shopEntry) || 0;
            var limitStr = String.format(Localize_cns("SHOP_TXT2"), hadBuy, limit);
            AddRdContent(this.mElemList[name + "_equip_limit"], limitStr, "ht_20_cc");
            this.mElemList[name + "_equip_limit"].visible = true;
        }
        var str = "#orange" + config.price;
        AddRdContent(this.mElemList[name + "_equip_cost"], str, "ht_20_cc");
    };
    /////响应事件
    ShopEquipWindow.prototype.onBtnClick = function (event) {
        var radioGroup = event.target;
        var radiobtn = radioGroup.selection;
        var showlist = ShopSystem.getInstance().getShopEquipItemList();
        this.select = radiobtn.value;
        this.type = showlist[this.select];
        this.onRefreshItemShow();
    };
    ShopEquipWindow.prototype.onBuyClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        this.index = tonumber(index) + 1;
        var wnd = WngMrg.getInstance().getWindow("ShopItemBuyFrame");
        wnd.onShowWnd(this.type, this.index);
    };
    ShopEquipWindow.prototype.onAccessClick = function () {
    };
    return ShopEquipWindow;
}(BaseCtrlWnd));
__reflect(ShopEquipWindow.prototype, "ShopEquipWindow");
//# sourceMappingURL=ShopEquipWindow.js.map
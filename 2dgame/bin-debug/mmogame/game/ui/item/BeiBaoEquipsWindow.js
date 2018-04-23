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
// TypeScript file
var BeiBaoEquipsWindow = (function (_super) {
    __extends(BeiBaoEquipsWindow, _super);
    function BeiBaoEquipsWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeiBaoEquipsWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    BeiBaoEquipsWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.mLayoutNode = this.mParentWnd.mLayoutNode;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_add", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onAddClick, _a),
            (_b = {}, _b["name"] = "btn_smelte", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onSmelteClick, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_Equip"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "EquipScroll", 0, 0, group.width, group.height, group);
        var _a, _b;
    };
    BeiBaoEquipsWindow.prototype.onUnLoad = function () {
    };
    BeiBaoEquipsWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_equip"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("BEIBAO_EQUIP");
        this.onRefresh();
    };
    BeiBaoEquipsWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_equip"].visible = false;
    };
    BeiBaoEquipsWindow.prototype.onAddClick = function () {
        var wnd = WngMrg.getInstance().getWindow("BeiBaoAddCapacityFrame");
        wnd.showWnd();
    };
    BeiBaoEquipsWindow.prototype.onSmelteClick = function () {
        var wnd = WngMrg.getInstance().getWindow("BeiBaoSmelteFrame");
        wnd.showWnd();
    };
    BeiBaoEquipsWindow.prototype.onRefresh = function () {
        var itemType1 = opItemType.ROLE_EQUIP; //角色装备
        var equipItemList = ItemSystem.getInstance().getItemLogicInfoByType(itemType1);
        table_sort(equipItemList, function (a, b) {
            var aLevel = a.getRefProperty("level");
            var bLevel = b.getRefProperty("level");
            return aLevel - bLevel;
        });
        //let level = RoleSystem.getInstance().getRoleInfo("stage")
        //equipItemList = ItemSystem.getInstance().getSortEquipList(equipItemList,level )
        var itemType2 = opItemType.COMMON_EQUIP; //通用装备
        var equipItemList2 = ItemSystem.getInstance().getItemLogicInfoByType(itemType2);
        table_sort(equipItemList2, function (a, b) {
            var aLevel = a.getRefProperty("level");
            var bLevel = b.getRefProperty("level");
            return aLevel - bLevel;
        });
        for (var i in equipItemList2) {
            var item = equipItemList2[i];
            JsUtil.arrayInstert(equipItemList, item);
        }
        var list = splitListByCount(equipItemList, 5);
        var scroll = this.scroll;
        scroll.clearItemList();
        for (var k = 0; k < size_t(list); k++) {
            var item = list[k];
            var window_1 = scroll.getItemWindow(k, 500, 110, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, item);
        }
        scroll.refreshScroll(true, true);
        var had = size_t(equipItemList);
        var maxCapacity = GetHeroProperty("equipMax");
        this.mElemList["lable_capacity"].text = had + "/" + maxCapacity;
        //lable_capacity
    };
    BeiBaoEquipsWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        for (var i = 1; i <= 5; i++) {
            var x = 107 * (i - 1);
            var y = 2;
            var mElemInfo = [
                (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "_equip_bg" + i, _a["image"] = "", _a["x"] = x, _a["y"] = y, _a["w"] = 100, _a["h"] = 110, _a),
                (_b = {}, _b["index_type"] = eui.Group, _b["name"] = name + "_equip" + i, _b["parent"] = name + "_equip_bg" + i, _b["image"] = "", _b["x"] = 10, _b["y"] = 0, _b["w"] = 80, _b["h"] = 80, _b),
                (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_equip_lv" + i, _c["parent"] = name + "_equip_bg" + i, _c["title"] = "", _c["font"] = "ht_18_cc", _c["image"] = null, _c["color"] = "ublack", _c["x"] = 0, _c["y"] = 85, _c["w"] = 100, _c["h"] = 20, _c["messageFlag"] = true, _c),
            ];
            UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
            this.mElemList[name + "equipBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "equipBox" + i, 0, 0, this.mElemList[name + "_equip" + i]);
        }
        var _a, _b, _c;
    };
    BeiBaoEquipsWindow.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        for (var i = 1; i <= 5; i++) {
            var item = config[i - 1];
            if (item) {
                var entryId = item.entryId;
                var type_1 = item.getRefProperty("type");
                var level = item.getRefProperty("level");
                if (type_1 == opItemType.ROLE_EQUIP) {
                    this.mElemList[name + "_equip_lv" + i].text = "LV." + level;
                }
                else if (type_1 == opItemType.COMMON_EQUIP) {
                    this.mElemList[name + "_equip_lv" + i].text = level + "阶";
                }
                this.mElemList[name + "equipBox" + i].updateByItem(item);
            }
            else {
                this.mElemList[name + "_equip_bg" + i].visible = false;
            }
        }
    };
    return BeiBaoEquipsWindow;
}(BaseCtrlWnd));
__reflect(BeiBaoEquipsWindow.prototype, "BeiBaoEquipsWindow");
//# sourceMappingURL=BeiBaoEquipsWindow.js.map
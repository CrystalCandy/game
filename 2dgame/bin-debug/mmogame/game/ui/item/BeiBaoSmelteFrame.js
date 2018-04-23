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
var BeiBaoSmelteFrame = (function (_super) {
    __extends(BeiBaoSmelteFrame, _super);
    function BeiBaoSmelteFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeiBaoSmelteFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/item/BeiBaoSmelteLayout.exml"];
    };
    BeiBaoSmelteFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_smelte", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onSmelteClick, _c),
            (_d = {}, _d["name"] = "btn_smelte50", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onSmelteClick, _d),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["group_scroll"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, 485, 396, group);
        this.mElemList["rd_tips"].setAlignFlag(gui.Flag.LEFT_TOP);
        var _a, _b, _c, _d;
    };
    BeiBaoSmelteFrame.prototype.onUnLoad = function () {
    };
    BeiBaoSmelteFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    BeiBaoSmelteFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ITEM_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    BeiBaoSmelteFrame.prototype.onRefresh = function () {
        //let level = RoleSystem.getInstance().getRoleInfo("stage")//GetHeroProperty("level")
        var itemType1 = opItemType.ROLE_EQUIP; //角色装备
        var smeltList = ItemSystem.getInstance().getItemLogicInfoByType(itemType1); //ItemSystem.getInstance().getBeiBaoSmeltList(level)
        table_sort(smeltList, function (a, b) {
            var aLevel = a.getRefProperty("level");
            var bLevel = b.getRefProperty("level");
            return aLevel - bLevel;
        });
        //let smeltList = ItemSystem.getInstance().getResolveList()
        var showlist = [];
        for (var i = 0; i < 9; i++) {
            if (smeltList[i]) {
                JsUtil.arrayInstert(showlist, smeltList[i]);
            }
        }
        var list = splitListByCount(showlist, 3);
        var scroll = this.scroll;
        scroll.clearItemList();
        for (var k = 0; k < 3; k++) {
            var itemlist = list[k];
            var window_1 = scroll.getItemWindow(k, 485, 110, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, itemlist);
        }
        scroll.refreshScroll(true, true);
        //rd_tips
        var str = Localize_cns("BEIBAO_SMELT_DES");
        AddRdContent(this.mElemList["rd_tips"], str, "ht_24_cc", "black");
    };
    BeiBaoSmelteFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        for (var i = 1; i <= 3; i++) {
            var x = 50 + 160 * (i - 1);
            var y = 12;
            var mElemInfo = [
                (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "_equip_bg" + i, _a["image"] = "", _a["x"] = x, _a["y"] = y, _a["w"] = 100, _a["h"] = 110, _a["messageFlag"] = true, _a),
                (_b = {}, _b["index_type"] = eui.Group, _b["name"] = name + "_equip" + i, _b["parent"] = name + "_equip_bg" + i, _b["image"] = "", _b["x"] = 10, _b["y"] = 0, _b["w"] = 80, _b["h"] = 80, _b["messageFlag"] = true, _b),
                (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_equip_lv" + i, _c["parent"] = name + "_equip_bg" + i, _c["title"] = "", _c["font"] = "ht_18_cc", _c["image"] = null, _c["color"] = "ublack", _c["x"] = 0, _c["y"] = 85, _c["w"] = 100, _c["h"] = 20, _c["messageFlag"] = true, _c),
            ];
            UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 1, 0, this.mElemList[name + "_equip_bg" + i]);
        }
        var _a, _b, _c;
    };
    BeiBaoSmelteFrame.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        if (config == null) {
            for (var i = 1; i <= 3; i++) {
                this.mElemList[name + "_equip_lv" + i].visible = false;
            }
            return;
        }
        for (var i = 1; i <= 3; i++) {
            var item = config[i - 1];
            if (item) {
                var entryId = item.entryId;
                var level = item.getRefProperty("level");
                this.mElemList[name + "_equip_lv" + i].text = "LV." + level;
                this.mElemList[name + "itemBox" + i].updateByItem(item);
            }
            else {
                this.mElemList[name + "_equip_lv" + i].visible = false;
            }
        }
    };
    /////////////////btn响应事件
    BeiBaoSmelteFrame.prototype.onSmelteClick = function (event) {
        var name = event.target.name;
        if (name == "btn_smelte") {
            RpcProxy.call("C2G_EquipMelt", 9);
        }
        else if (name = "btn_smelte50") {
            RpcProxy.call("C2G_EquipMelt", 50);
        }
    };
    return BeiBaoSmelteFrame;
}(BaseWnd));
__reflect(BeiBaoSmelteFrame.prototype, "BeiBaoSmelteFrame");
//# sourceMappingURL=BeiBaoSmelteFrame.js.map
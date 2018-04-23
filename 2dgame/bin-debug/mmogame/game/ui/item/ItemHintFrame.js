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
var ItemHintFrame = (function (_super) {
    __extends(ItemHintFrame, _super);
    function ItemHintFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemHintFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/item/ItemHintLayout.exml"];
    };
    ItemHintFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        this.mElemList["equip_box"] = UIItemBox.newObj(this.mLayoutNode, "equip_box", 0, 0, this.mElemList["e_box"]);
        this.mElemList["equip_box"].setItemHintEnable(false);
        this.mElemList["item_box"] = UIItemBox.newObj(this.mLayoutNode, "item_box", 0, 0, this.mElemList["i_box"]);
        this.mElemList["item_box"].setItemHintEnable(false);
        this.mElemList["com_wnd"].visible = false;
        this.mElemList["role_wnd"].visible = false;
    };
    ItemHintFrame.prototype.onUnLoad = function () {
    };
    ItemHintFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.refreshFrame();
    };
    ItemHintFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    ItemHintFrame.prototype.refreshFrame = function () {
        var itemType = this.logicItem.getRefProperty("type");
        if (itemType == opItemType.ITEM_TYPE_GOODS) {
            this.mElemList["equip_wnd"].visible = false;
            this.mElemList["item_wnd"].visible = true;
            this.updateNormalItem();
        }
        else {
            this.mElemList["equip_wnd"].visible = true;
            this.mElemList["item_wnd"].visible = false;
            this.updateEquipItem();
        }
    };
    ItemHintFrame.prototype.updateNormalItem = function () {
        this.mElemList["item_box"].updateByItem(this.logicItem);
        var name = this.logicItem.getRefProperty("name");
        var count = ItemSystem.getInstance().getItemCount(this.logicItem.entryId);
        var describ = this.logicItem.getRefProperty("description");
        var quality = this.logicItem.getRefProperty("quality") || 1;
        var color = opItemColorStr[quality - 1];
        var str = "#" + color + name + "#br#yellow" + Localize_cns("ITEM_TXT30") + count;
        AddRdContent(this.mElemList["i_des"], str, "ht_24_cc_stroke", "white", 15);
        AddRdContent(this.mElemList["i_explain"], describ, "ht_24_cc_stroke", "navajowhite", 8);
    };
    ItemHintFrame.prototype.updateEquipItem = function () {
        this.mElemList["equip_box"].updateByItem(this.logicItem);
        var name = this.logicItem.getRefProperty("name");
        //部位//类型
        var subtype = this.logicItem.getRefProperty("subtype");
        //等级//需求
        var uselevel = this.logicItem.getRefProperty("uselevel");
        //职业只有通用
        var itemType = this.logicItem.getRefProperty("type");
        if (itemType == opItemType.COMMON_EQUIP) {
            var stageStr = this.logicItem.getRefProperty("title");
            var level = this.logicItem.getProperty("add_num") || 1;
            var quality = this.logicItem.getProperty("quality") || opEquipQuality.gray;
            var color = opItemColorStr[quality - 1];
            //名称
            var str = "#" + color + stageStr + "#yellow+" + level;
            AddRdContent(this.mElemList["e_name"], str, "ht_24_cc_stroke", "white");
            //需求和类型
            str = "#yellow" + Localize_cns("ITEM_TXT31") + "#navajowhite" + uselevel + Localize_cns("PET_TXT10") + "#br";
            str = str + "#yellow" + Localize_cns("ITEM_TXT32") + "#navajowhite" + (GameConfig.FunEquipCaseList[subtype] || "");
            AddRdContent(this.mElemList["e_des"], str, "ht_24_cc_stroke", "white", 15);
            var force = this.updateCommonEquipProperty() || 0;
            //战力
            this.mElemList["e_batch"].beginDraw();
            this.mElemList["e_batch"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3);
            this.mElemList["e_batch"].endDraw();
            //更新评分
            var forceLab = this.mElemList["e_force"];
            forceLab.textColor = gui.Color.yellow;
            forceLab.text = Localize_cns("ITEM_TXT37") + force;
        }
        else {
            var quality = this.logicItem.getProperty("quality") || opEquipQuality.gray;
            var color = opItemColorStr[quality - 1];
            //名称
            var str = "#" + color + name;
            AddRdContent(this.mElemList["e_name"], str, "ht_24_cc_stroke", "white");
            //部位等级职业
            str = "#yellow" + Localize_cns("ITEM_TXT33") + "#navajowhite" + GetRoleEquipTypeName(subtype) + "#br";
            str = str + "#yellow" + Localize_cns("ITEM_TXT34") + "#navajowhite" + uselevel + "#br";
            str = str + "#yellow" + Localize_cns("ITEM_TXT35") + "#navajowhite" + Localize_cns("ITEM_TXT36");
            AddRdContent(this.mElemList["e_des"], str, "ht_24_cc_stroke", "white", 3);
            var force = this.updateRoleEquipProperty() || 0;
            //战力
            this.mElemList["e_batch"].beginDraw();
            this.mElemList["e_batch"].drawNumberString("zhanLi_", "z" + force, 0, 0, -3);
            this.mElemList["e_batch"].endDraw();
            //更新评分
            var forceLab = this.mElemList["e_force"];
            forceLab.textColor = gui.Color.yellow;
            forceLab.text = Localize_cns("ITEM_TXT37") + force;
        }
    };
    ItemHintFrame.prototype.updateCommonEquipProperty = function () {
        this.mElemList["com_wnd"].visible = true;
        this.mElemList["role_wnd"].visible = false;
        var quality = this.logicItem.getProperty("quality") || opEquipQuality.purple; //最低紫色
        var add_num = this.logicItem.getProperty("add_num") || 1;
        this.updateFrameSize(add_num);
        //更新基础属性
        var effects = GetFunEquipBaseProperty(this.logicItem.entryId, quality);
        var baseStr = "#yellow" + Localize_cns("ITEM_BASE_ATTR");
        for (var k in effects) {
            var proName = GetPropertyName(abilityNameToIndex[k]);
            var proValue = effects[k];
            baseStr = baseStr + "#br" + "#navajowhite" + proName + proValue;
        }
        AddRdContent(this.mElemList["com_base"], baseStr, "ht_24_cc_stroke", "white", 7);
        //更新附加属性
        var effects = GetFunEquipAddProperty(this.logicItem.entryId, quality);
        var addStr = "#yellow" + Localize_cns("ITEM_ADD_ATTR");
        for (var i = 0; i < add_num; i++) {
            for (var k in effects) {
                var proName = GetPropertyName(abilityNameToIndex[k]);
                var proValue = effects[k];
                addStr = addStr + "#br" + "#navajowhite" + proName + proValue;
            }
        }
        AddRdContent(this.mElemList["com_add"], addStr, "ht_24_cc_stroke", "white", 7);
        return GetForceMath(GetFunEquipProperty(this.logicItem.entryId, quality, add_num));
    };
    ItemHintFrame.prototype.updateRoleEquipProperty = function () {
        this.mElemList["com_wnd"].visible = false;
        this.mElemList["role_wnd"].visible = true;
        var quality = this.logicItem.getProperty("quality") || opEquipQuality.gray;
        //更新基础属性
        var baseStr = "#yellow" + Localize_cns("ITEM_BASE_ATTR");
        var effects = GetRoleEquipBaseProperty(this.logicItem.entryId, quality);
        for (var k in effects) {
            var proName = GetPropertyName(abilityNameToIndex[k]);
            var proValue = effects[k];
            baseStr = baseStr + "#br" + "#navajowhite" + proName + proValue;
        }
        AddRdContent(this.mElemList["role_base"], baseStr, "ht_24_cc_stroke", "white", 7);
        return GetForceMath(effects);
    };
    ItemHintFrame.prototype.updateFrameSize = function (num) {
        var addH = 32;
        this.mLayoutNode.height = this.mLayoutNode.height + 60 + (num - 1) * addH;
        var addRd = this.mElemList["com_add"];
        addRd.height = addRd.height + (num - 1) * addH;
    };
    //////////////////////////////////////////////////////////////
    ItemHintFrame.prototype.showItemHint = function (logicItem) {
        this.logicItem = logicItem;
        this.showWnd();
    };
    return ItemHintFrame;
}(BaseWnd));
__reflect(ItemHintFrame.prototype, "ItemHintFrame");
//# sourceMappingURL=ItemHintFrame.js.map
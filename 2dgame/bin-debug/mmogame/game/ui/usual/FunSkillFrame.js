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
var FunSkillFrame = (function (_super) {
    __extends(FunSkillFrame, _super);
    function FunSkillFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunSkillFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/usual/FunSkillLayout.exml"];
    };
    FunSkillFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_upgrade", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickUpgrade, _c)
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 162, 490);
        this.mElemList["itemBox"].setVisible(false);
        this.mElemList["name_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b, _c;
    };
    FunSkillFrame.prototype.onUnLoad = function () {
    };
    FunSkillFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        if (this.typeList == null) {
            this.refreshFrame();
        }
        else {
            this.refreshListFrame();
        }
    };
    FunSkillFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(true);
        this.typeList = null;
        this.funType = null;
        this.index = null;
    };
    FunSkillFrame.prototype.refreshFrame = function () {
        for (var i = 0; i < 4; i++) {
            if (this.mElemList["skillBox_" + i] == null) {
                this.mElemList["skillBox_" + i] = UIFunSkillBox.newObj(this.mLayoutNode, "skillBox_" + i, 0, 0, this.mElemList["skill_group"], 0.9);
                this.mElemList["skillBox_" + i].setClickCallBack(this.updateSelet, this, i);
            }
            this.mElemList["skillBox_" + i].updateFunSkill(this.funType, i);
        }
        this.updateSelet();
    };
    FunSkillFrame.prototype.refreshListFrame = function () {
        for (var i = 0; i < size_t(this.typeList); i++) {
            if (this.mElemList["skillBox_" + i] == null) {
                this.mElemList["skillBox_" + i] = UIFunSkillBox.newObj(this.mLayoutNode, "skillBox_" + i, 0, 0, this.mElemList["skill_group"], 0.9);
                this.mElemList["skillBox_" + i].setClickCallBack(this.updateSelet, this, i);
            }
            this.mElemList["skillBox_" + i].updateFunSkill(this.typeList[i], 0);
        }
        this.updateSelet();
    };
    FunSkillFrame.prototype.updateSelet = function (index) {
        if (index != null) {
            this.index = index;
        }
        if (this.typeList != null) {
            this.funType = this.typeList[this.index];
        }
        for (var i = 0; i < 4; i++) {
            this.mElemList["skillBox_" + i].select(false);
        }
        this.mElemList["skillBox_" + this.index].select(true);
        var skillConfigInfo;
        if (this.typeList == null) {
            skillConfigInfo = FunSystem.getInstance().getFunSkillConfigWithPos(this.funType, this.index + 1);
        }
        else {
            skillConfigInfo = FunSystem.getInstance().getFunSkillConfigWithPos(this.funType, 1);
        }
        var funInfo = FunSystem.getInstance().getFunInfoWithType(this.funType) || {};
        var skillList = funInfo.skilllevellist || [];
        var skillLevel;
        if (this.typeList != null) {
            skillLevel = skillList[0] || 0;
        }
        else {
            skillLevel = skillList[this.index] || 0;
        }
        var skillname = skillConfigInfo.skillName;
        if (skillLevel == 0) {
            AddRdContent(this.mElemList["name_rd"], skillname, "ht_24_cc", "white");
            this.mElemList["up_title"].text = Localize_cns("PET_TXT14");
            this.mElemList["down_title"].text = Localize_cns("PET_TXT15");
            //激活效果
            var effects = table_effect(skillConfigInfo.effects);
            var str = "";
            for (var k in effects) {
                var proName = GetPropertyName(abilityNameToIndex[k]);
                var proValue = effects[k];
                str += Localize_cns("SKILL_TXT6") + proName + proValue + "#space_40";
            }
            AddRdContent(this.mElemList["cur_attr_rd"], str, "ht_24_cc", "gray");
            //解锁条件
            var unlock = skillConfigInfo.UnlockLevel;
            var str = "#red" + Localize_cns(cellOptionsName[this.funType - 1]) + String.format(Localize_cns("PET_TXT16"), unlock);
            AddRdContent(this.mElemList["next_attr_rd"], str, "ht_24_cc", "ublack");
            this.mElemList["itemBox"].setVisible(false);
            this.mElemList["material_rd"].visible = (false);
            this.mElemList["btn_upgrade"].visible = (false);
            this.mElemList["lock_icon"].visible = (true);
        }
        else {
            AddRdContent(this.mElemList["name_rd"], skillname + "#space#lime" + skillLevel + Localize_cns("PET_TXT9"), "ht_24_cc", "white");
            this.mElemList["up_title"].text = Localize_cns("PET_TXT13");
            this.mElemList["down_title"].text = Localize_cns("PET_TXT14");
            var baseeffects = table_effect(skillConfigInfo.effects);
            var addeffects = table_effect(skillConfigInfo.addeffects);
            //当前效果
            for (var i = 0; i < skillLevel; i++) {
                for (var k in baseeffects) {
                    if (addeffects[k]) {
                        baseeffects[k] += addeffects[k];
                    }
                }
            }
            var str = "";
            for (var k in baseeffects) {
                var proName = GetPropertyName(abilityNameToIndex[k]);
                var proValue = baseeffects[k];
                str += "#ublack" + Localize_cns("SKILL_TXT6") + proName + "#lime" + proValue + "#space_40";
            }
            AddRdContent(this.mElemList["cur_attr_rd"], str, "ht_24_cc", "ublack");
            //下一级激活效果
            for (var k in baseeffects) {
                if (addeffects[k]) {
                    baseeffects[k] += addeffects[k];
                }
            }
            var str = "";
            for (var k in baseeffects) {
                var proName = GetPropertyName(abilityNameToIndex[k]);
                var proValue = baseeffects[k];
                str += Localize_cns("SKILL_TXT6") + proName + proValue + "#space_40";
            }
            AddRdContent(this.mElemList["next_attr_rd"], str, "ht_24_cc", "gray");
            this.mElemList["itemBox"].setVisible(true);
            this.mElemList["material_rd"].visible = (true);
            this.mElemList["btn_upgrade"].visible = (true);
            this.mElemList["lock_icon"].visible = (false);
            var itemId = skillConfigInfo.itemid;
            var info = FunSystem.getInstance().getFunSkillMaterialWithLv(this.funType, skillLevel);
            var itemNum = info.num;
            var itemName = ItemSystem.getInstance().getItemName(itemId);
            var itemCount = ItemSystem.getInstance().getItemCount(itemId) || 0;
            var color = itemCount > itemNum ? "#lime" : "#red";
            var str = itemName + "#rf#lime*" + itemNum + "#br#ublack" + Localize_cns("ITEM_TXT30") + color + itemCount;
            AddRdContent(this.mElemList["material_rd"], str, "ht_24_cc", "ublack", 3);
            this.mElemList["itemBox"].updateByEntry(itemId);
        }
    };
    FunSkillFrame.prototype.onClickUpgrade = function (args) {
        var skillConfigInfo;
        if (this.typeList == null) {
            skillConfigInfo = FunSystem.getInstance().getFunSkillConfigWithPos(this.funType, this.index + 1);
        }
        else {
            skillConfigInfo = FunSystem.getInstance().getFunSkillConfigWithPos(this.funType, 1);
        }
        var itemId = skillConfigInfo.itemid;
        var itemNum = skillConfigInfo.itemnum;
        var itemCount = ItemSystem.getInstance().getItemCount(itemId);
        if (itemCount >= itemNum) {
            RpcProxy.call("C2G_TEMPCELLFUN_SKILL_UP", this.funType, this.index + 1);
        }
        else {
            MsgSystem.addTagTips(Localize_cns("MATRIAL_NOENGOUGH"));
        }
    };
    ///////////////////////////////////////////////////////
    FunSkillFrame.prototype.showWithTypeAndIndex = function (_type, _index) {
        this.funType = _type;
        this.index = _index;
        this.showWnd();
    };
    FunSkillFrame.prototype.showWithTypeListAndIndex = function (_type, _index) {
        this.typeList = _type;
        this.index = _index;
        this.showWnd();
    };
    return FunSkillFrame;
}(BaseWnd));
__reflect(FunSkillFrame.prototype, "FunSkillFrame");
//# sourceMappingURL=FunSkillFrame.js.map
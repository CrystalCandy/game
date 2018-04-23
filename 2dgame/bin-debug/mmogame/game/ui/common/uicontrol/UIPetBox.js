/*
作者:
    yangguiming
    
创建时间：
   2017.02.16(周四)

意图：
   物品框通用控件
   
公共接口：
   
*/
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
var UIPetBox = (function (_super) {
    __extends(UIPetBox, _super);
    function UIPetBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIPetBox.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mParentNode = args[0];
        this.name = args[1];
        var x = args[2];
        var y = args[3];
        var parentWnd = args[4];
        var scale = 1;
        if (args[5] != null) {
            scale = args[5];
        }
        this.rootWnd = null;
        var w = 80 * scale;
        var h = 80 * scale;
        this.mElemList = {};
        var itemBoxName = this.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = this.name, _a["x"] = x, _a["y"] = y, _a["w"] = w, _a["h"] = h, _a["event_name"] = gui.TouchEvent.TOUCH_SHORT, _a["fun_index"] = this.onOpenTips, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = this.name + "rolebg", _b["parent"] = this.name, _b["image"] = "ty_renWuKuang01", _b["x"] = 0, _b["y"] = 0, _b["w"] = 140 * scale, _b["h"] = 140 * scale, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = eui.Image, _c["name"] = this.name + "roleicon", _c["parent"] = this.name + "rolebg", _c["image"] = "zctx_90001", _c["x"] = 0, _c["y"] = 0, _c["w"] = 140 * scale, _c["h"] = 140 * scale, _c["event_name"] = null, _c["fun_index"] = null, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Image, _d["name"] = this.name + "iconbg", _d["parent"] = this.name, _d["image"] = "ty_zhuangBeiBg01", _d["x"] = 0, _d["y"] = 0, _d["w"] = w, _d["h"] = h, _d["event_name"] = null, _d["fun_index"] = null, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = eui.Image, _e["name"] = this.name + "icon", _e["parent"] = this.name, _e["image"] = "", _e["x"] = 0, _e["y"] = 0, _e["w"] = w, _e["h"] = h, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = eui.Image, _f["name"] = this.name + "select", _f["parent"] = this.name + "iconbg", _f["image"] = "ty_xuanZhongKuang01", _f["x"] = -16 * scale, _f["y"] = -16 * scale, _f["w"] = 113 * scale, _f["h"] = 113 * scale, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = eui.Image, _g["name"] = this.name + "statepos", _g["parent"] = this.name + "iconbg", _g["image"] = "ty_text03", _g["x"] = 2, _g["y"] = 2, _g["w"] = 46 * scale, _g["h"] = 26 * scale, _g["messageFlag"] = true, _g),
            (_h = {}, _h["index_type"] = eui.Image, _h["name"] = this.name + "god", _h["parent"] = this.name + "iconbg", _h["image"] = "ty_shenIcon01", _h["x"] = 49 * scale, _h["y"] = 2, _h["w"] = 29 * scale, _h["h"] = 28 * scale, _h["messageFlag"] = true, _h),
            (_j = {}, _j["index_type"] = gui.RichDisplayer, _j["name"] = this.name + "star_rd", _j["parent"] = this.name + "iconbg", _j["x"] = 0, _j["y"] = 60, _j["w"] = 80, _j["h"] = 26, _j["messageFlag"] = true, _j),
        ];
        UiUtil.createElem(mElemInfo, this.mParentNode, this.mElemList, this, parentWnd);
        this.rootWnd = this.mElemList[this.name];
        this.mElemList[this.name + "select"].visible = false;
        this.mElemList[this.name + "statepos"].visible = false;
        this.mElemList[this.name + "god"].visible = false;
        this.mElemList[this.name + "star_rd"].visible = false;
        this.mElemList[this.name + "star_rd"].setAlignFlag(gui.Flag.H_CENTER);
        this.bEnable = true;
        this.bClickEnable = true;
        this.entryId = null;
        this.starLv = 0;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    UIPetBox.prototype.clear = function () {
        this.select();
        this.mElemList[this.name + "god"].visible = false;
        this.mElemList[this.name + "statepos"].visible = false;
        this.mElemList[this.name + "star_rd"].visible = false;
    };
    UIPetBox.prototype.select = function (b) {
        this.mElemList[this.name + "select"].visible = b;
    };
    UIPetBox.prototype.setVisible = function (b) {
        this.rootWnd.visible = (b);
    };
    UIPetBox.prototype.setEnable = function (b) {
        this.bEnable = b;
        //let bgIcon = this.mElemList[this.name + "iconbg"] //显示品质
        var icon = this.mElemList[this.name + "icon"]; //显示图标
        //UiUtil.grayComponent(bgIcon, b)
        UiUtil.grayComponent(icon, !b);
    };
    UIPetBox.prototype.setFightFlag = function () {
        this.mElemList[this.name + "statepos"].visible = true;
    };
    UIPetBox.prototype.createElem = function (mElemInfo, mElemList, obj) {
        var list = mElemList;
        if (list == null) {
            list = this.mElemList;
        }
        UiUtil.createElem(mElemInfo, this.mParentNode, list, obj, this.rootWnd);
    };
    UIPetBox.prototype.updateRoleInfo = function (vocation, sexId, plrId) {
        this.entryId = vocation;
        this.sexId = checkNull(sexId, genderOptions.MALE);
        this.roleId = plrId;
        this._updateInfo();
    };
    UIPetBox.prototype.updateByEntry = function (entryId, starLv) {
        this.entryId = entryId;
        this.starLv = starLv || -1;
        this.sexId = null;
        this._updateInfo();
    };
    UIPetBox.prototype._updateInfo = function () {
        if (this.sexId != null) {
            this._switchRoleIcon(true);
            this._updateRoleIconInfo();
            return;
        }
        this._switchRoleIcon(false);
        if (this.entryId >= opPetRange.XianLv && this.entryId < opPetRange.Pet) {
            //仙侣
            this._updateXianLvIconInfo();
        }
        else {
            //宠物 
            this._updatePetIconInfo();
        }
    };
    UIPetBox.prototype._switchRoleIcon = function (visible) {
        this.mElemList[this.name + "rolebg"].visible = visible;
        this.mElemList[this.name + "roleicon"].visible = visible;
        this.mElemList[this.name + "iconbg"].visible = !visible;
        this.mElemList[this.name + "icon"].visible = !visible;
    };
    UIPetBox.prototype._updateRoleIconInfo = function () {
        var icon = GetProfessionIcon(this.entryId, this.sexId);
        this.mElemList[this.name + "roleicon"].source = icon;
    };
    UIPetBox.prototype._updateXianLvIconInfo = function () {
        this.setEnable(this.bEnable);
        var fightList = XianLvSystem.getInstance().getFightList();
        var bgIcon = GetPetQualityIconIamge(this.entryId);
        var icon = GetXianlvIconImage(this.entryId);
        this.mElemList[this.name + "iconbg"].source = bgIcon;
        this.mElemList[this.name + "icon"].source = icon;
        if (this.starLv != -1) {
            var xingStr = "";
            if (this.starLv > 3) {
                xingStr += "#yellow" + this.starLv + "#STAR";
            }
            else {
                for (var i = 0; i < this.starLv; i++) {
                    xingStr += "#STAR";
                }
            }
            this.mElemList[this.name + "star_rd"].visible = true;
            AddRdContent(this.mElemList[this.name + "star_rd"], xingStr, "ht_20_cc_stroke");
        }
    };
    UIPetBox.prototype._updatePetIconInfo = function () {
        var petConfigInfo = PetSystem.getInstance().getPetEntryInfo(this.entryId);
        if (petConfigInfo == null)
            return;
        this.setEnable(this.bEnable);
        var petNetInfo = PetSystem.getInstance().getPetInfo(this.entryId);
        var bgIcon = GetPetQualityIconIamge(this.entryId);
        var icon = GetPetIconImage(this.entryId);
        var statePos = "";
        var isGod = (petConfigInfo.quality >= opPetQuality.gold);
        if (petNetInfo) {
            statePos = GetPetCombatPosIcon(petNetInfo.combatpos);
        }
        this.mElemList[this.name + "iconbg"].source = bgIcon;
        this.mElemList[this.name + "icon"].source = icon;
        this.mElemList[this.name + "statepos"].source = statePos;
        this.mElemList[this.name + "statepos"].visible = true;
        this.mElemList[this.name + "god"].visible = isGod;
    };
    UIPetBox.prototype.setClickListner = function (func, obj, userData) {
        this.petTipsFunc = func;
        this.petTipsObj = obj;
        this.userData = userData;
    };
    UIPetBox.prototype.setClickEnable = function (b) {
        this.bClickEnable = b;
    };
    UIPetBox.prototype.setStarVisible = function (b) {
        this.mElemList[this.name + "star_rd"].visible = b;
    };
    ////////////////////////////////////////////////////////////////////////
    //物品提示
    UIPetBox.prototype.onOpenTips = function (args) {
        if (!this.bClickEnable) {
            return;
        }
        if (this.sexId != null)
            return;
        if (this.petTipsFunc) {
            //返回true，表示拦截不查看默认信息
            if (this.petTipsFunc.call(this.petTipsObj, this.entryId, this.userData, args)) {
                return;
            }
        }
        TLog.Debug("UIPetBox.onOpenTips", this.entryId);
        PetSystem.getInstance().showPetTipsByEntry(this.entryId);
    };
    UIPetBox.prototype.setXY = function (x, y) {
        this.rootWnd.x = x;
        this.rootWnd.y = y;
    };
    return UIPetBox;
}(TClass));
__reflect(UIPetBox.prototype, "UIPetBox");
//# sourceMappingURL=UIPetBox.js.map
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
var UIPetListBox = (function (_super) {
    __extends(UIPetListBox, _super);
    function UIPetListBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIPetListBox.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mParentNode = args[0];
        var name = args[1];
        var x = args[2];
        var y = args[3];
        var w = args[4];
        var h = args[5];
        this.parentWnd = args[6];
        this.mElemList = {};
        this.select = 0; //默认
        this.scroll = UIScrollList.newObj(this.mParentNode, "scroll" + name, x, y, w, h, this.parentWnd, UIScrollList.DIR_HORIZON);
        RegisterEvent(EventDefine.PET_UPDATE, this.setPetList, this);
        RegisterEvent(EventDefine.PET_LIST_UPDATE, this.setPetList, this);
    };
    UIPetListBox.prototype._initItemWindow = function (window, k) {
        var name = window.name;
        var ElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "group_" + name, _a["x"] = 0, _a["y"] = 0, _a["w"] = 100, _a["h"] = 150, _a),
            (_b = {}, _b["index_type"] = eui.Group, _b["name"] = "petwnd_" + name, _b["x"] = 0, _b["y"] = 0, _b["w"] = 100, _b["h"] = 150, _b),
            (_c = {}, _c["index_type"] = gui.RichDisplayer, _c["name"] = "nameRd_" + name, _c["parent"] = "group_" + name, _c["x"] = 0, _c["y"] = 90, _c["w"] = 100, _c["h"] = 25, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = "lv_" + name, _d["parent"] = "group_" + name, _d["title"] = "", _d["font"] = "ht_20_cc_stroke", _d["color"] = gui.Color.yellow, _d["x"] = 0, _d["y"] = 115, _d["w"] = 100, _d["h"] = 25, _d["messageFlag"] = true, _d),
        ];
        UiUtil.createElem(ElemInfo, this.mParentNode, this.mElemList, this, window);
        this.mElemList["petBox_" + name] = UIPetBox.newObj(this.mParentNode, "petBox_" + name, 0, 0, this.mElemList["petwnd_" + name]);
        this.mElemList["petBox_" + name].setClickListner(this.onPetCallBack, this, k);
        var _a, _b, _c, _d;
    };
    UIPetListBox.prototype._refreshItemWindow = function (window, entry, index) {
        var name = window.name;
        var data = PetSystem.getInstance().getPetEntryInfo(entry);
        var netData = PetSystem.getInstance().getPetInfo(entry);
        var petId = data.Id;
        var petName = data.name;
        var quality = data.quality;
        //更新
        this.mElemList["petBox_" + name].updateByEntry(entry);
        if (this.select == index) {
            this.mElemList["petBox_" + name].select(true);
        }
        this.mElemList["nameRd_" + name].setAlignFlag(gui.Flag.H_CENTER);
        var color = GetQualityColorStr(quality);
        AddRdContent(this.mElemList["nameRd_" + name], petName, "ht_20_cc_stroke", color);
        this.mElemList["lv_" + name].text = "";
        //更新网络
        this.mElemList["petBox_" + name].setEnable(false);
        if (netData) {
            //激活
            this.mElemList["petBox_" + name].setEnable(true);
            var petLevel = netData.stage;
            this.mElemList["lv_" + name].text = "Lv." + petLevel;
            if (netData.name != null && netData.name != "") {
                petName = netData.name;
                AddRdContent(this.mElemList["nameRd_" + name], petName, "ht_20_cc_stroke", color);
            }
        }
    };
    UIPetListBox.prototype.onPetCallBack = function (entryId, index) {
        if (this.select == index)
            return true;
        this.select = index;
        var max = size_t(this.petlist);
        for (var i = 0; i < max; i++) {
            var window_1 = this.scroll.getItemWindow(i, 100, 150, 0, 0, 0);
            var name_1 = window_1.name;
            this.mElemList["petBox_" + name_1].select(false);
            if (this.select == i) {
                this.mElemList["petBox_" + name_1].select(true);
            }
        }
        if (this.mCallbackFunc && this.mCallbackObj) {
            this.mCallbackFunc.call(this.mCallbackObj, this.petlist[this.select]);
        }
        return true;
    };
    UIPetListBox.prototype.getSelectPetId = function () {
        return this.petlist[this.select];
    };
    /////////////////////////////////////////////////////////////////////////////
    UIPetListBox.prototype.setPetList = function () {
        this.petlist = [];
        var list = [];
        var activeList = PetSystem.getInstance().getPetActiveList();
        var tiredlist = PetSystem.getInstance().getPetTiredList();
        table_merge(list, activeList);
        table_merge(list, tiredlist);
        this.petlist = list;
        for (var i in activeList) {
            var petId = activeList[i];
            var petInfo = PetSystem.getInstance().getPetInfo(petId);
            if (petInfo && (petInfo.combatpos == opPetCombatPos.Battle)) {
                this.select = tonumber(i);
            }
        }
        return this.updateBoxWithList();
    };
    //获取神宠
    UIPetListBox.prototype.setGodPetList = function () {
        this.petlist = [];
        var list = PetSystem.getInstance().getPetGodList();
        this.petlist = list;
        return this.updateBoxWithList();
    };
    UIPetListBox.prototype.updateBoxWithList = function () {
        this.scroll.clearItemList();
        //更新拥有
        var max = size_t(this.petlist);
        for (var i = 0; i < max; i++) {
            var v = this.petlist[i];
            var window_2 = this.scroll.getItemWindow(i, 100, 150, 0, 0, 0);
            this._initItemWindow(window_2, i);
            this._refreshItemWindow(window_2, v, i);
        }
        this.scroll.refreshScroll();
        this.scroll.restoreViewXY();
        return this.petlist[this.select];
    };
    UIPetListBox.prototype.setClickListner = function (func, obj) {
        this.mCallbackFunc = func;
        this.mCallbackObj = obj;
    };
    UIPetListBox.prototype.rightMove = function () {
        var elem = this.scroll.scroller;
        var moveDis = elem.viewport.scrollH;
        var index = Math.floor(moveDis / 100);
        var limit = size_t(this.petlist);
        var moveTo = ((index + 6) > limit) ? (limit - 5) : (index + 5);
        this.scroll.moveToScrollIndex(moveTo, true);
    };
    UIPetListBox.prototype.leftMove = function () {
        var elem = this.scroll.scroller;
        var moveDis = elem.viewport.scrollH;
        var index = Math.floor(moveDis / 80);
        var moveTo = (index - 5) < 0 ? 0 : (index - 5);
        this.scroll.moveToScrollIndex(moveTo, true);
    };
    UIPetListBox.prototype.refreshPetDotTips = function (wnd, index) {
        this.callbackIndex = index;
        for (var i in this.petlist) {
            var petId = this.petlist[i];
            var check = false;
            if (index == 0) {
                check = GuideFuncSystem.getInstance().checkPetUpgradeWnd(petId);
            }
            else if (index == 1) {
                check = GuideFuncSystem.getInstance().checkPetSkillWnd(petId);
            }
            if (check) {
                var window_3 = this.scroll.getItemWindow(tonumber(i), 100, 150, 0, 0, 0);
                wnd.createDotTipsUI(this.mElemList["petBox_" + window_3.name].rootWnd);
            }
        }
    };
    return UIPetListBox;
}(TClass));
__reflect(UIPetListBox.prototype, "UIPetListBox");
//# sourceMappingURL=UIPetListBox.js.map
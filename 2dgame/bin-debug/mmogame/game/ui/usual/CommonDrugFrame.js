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
var CommonDrugFrame = (function (_super) {
    __extends(CommonDrugFrame, _super);
    function CommonDrugFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonDrugFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/usual/CommonDrugLayout.exml"];
    };
    CommonDrugFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 560;
        this.mLayoutNode.height = 660;
        this.setAlignCenter(true, true);
        //UiUtil.setFrameSize(this.mLayoutNode, 560, 660, 40, 120)
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_use", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onUseClick, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_plus", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onPlusClick, _c),
            (_d = {}, _d["name"] = "btn_plus10", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onPlus10Click, _d),
            (_e = {}, _e["name"] = "btn_cut", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onCutClick, _e),
            (_f = {}, _f["name"] = "btn_cut10", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onCut10Click, _f),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["itemBox"] = UIItemBox.newObj(this.mLayoutNode, "itemBox", 8, 7, this.mElemList["group_top"]);
        this.mElemList["rd_1"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_3"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["rd_4"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b, _c, _d, _e, _f;
    };
    CommonDrugFrame.prototype.onUnLoad = function () {
    };
    CommonDrugFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    CommonDrugFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PET_FUN_INFO_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
        this.type = null;
        this.num = -1;
    };
    CommonDrugFrame.prototype.onRefresh = function () {
        if (this.num = 0 || this.num == -1) {
            this.num = 1;
        }
        var drugName = cellOptionsName[this.type - 1];
        var drugConfig = GameConfig.FunAbilityDrugConfig[drugName];
        var id = drugConfig["itemid"];
        this.mElemList["itemBox"].updateByEntry(id, 1);
        var name = GameConfig.itemConfig[id].name;
        this.mElemList["label_wndName"].text = name;
        var funInfo = FunSystem.getInstance().getFunInfoWithType(this.type);
        this.used = funInfo.drugnum;
        var str = String.format(Localize_cns("ROLE_MOUNT_DAN_TXT1"), this.used);
        var text = name + "#br#br" + str;
        AddRdContent(this.mElemList["rd_1"], text, "ht_22_lc", "ublack");
        var attrList = GetDrugProperty(this.type);
        var text2 = "";
        for (var k in attrList) {
            text2 += GetPropertyName(lastAbilityNameToIdOptions[k]) + "#green" + attrList[k] + "#rf#space";
        }
        AddRdContent(this.mElemList["rd_2"], text2, "ht_22_lc", "ublack");
        this.had = ItemSystem.getInstance().getItemCount(id); //检查背包
        var text3 = String.format(Localize_cns("ROLE_MOUNT_DAN_TXT3"), this.had);
        AddRdContent(this.mElemList["rd_3"], text3, "ht_24_lc_stroke", "white");
        AddRdContent(this.mElemList["rd_4"], Localize_cns("ROLE_MOUNT_DAN_TXT5"), "ht_24_lc", "white");
        //label_num
        this.num = this.had;
        if (this.num == 0) {
            this.num = 1;
        }
        this.mElemList["label_num"].text = this.num;
    };
    CommonDrugFrame.prototype.onShowWnd = function (type) {
        this.type = type;
        this.showWnd();
    };
    CommonDrugFrame.prototype.onUseClick = function () {
        if (this.had == 0) {
            MsgSystem.addTagTips(Localize_cns("ROLE_ADD_tips_4"));
        }
        RpcProxy.call("C2G_TEMPCELLFUN_DRUG_USE", this.type, this.num);
        //	"C2G_TEMPCELLFUN_DRUG_USE":"uint16,uint16 ",--entryid 哪个玩法使用属性丹 num 使用多少个
    };
    CommonDrugFrame.prototype.onPlusClick = function () {
        if (this.had == 0)
            return;
        this.num = this.num + 1;
        if (this.num > this.had)
            this.num = this.had;
        this.mElemList["label_num"].text = this.num;
    };
    CommonDrugFrame.prototype.onPlus10Click = function () {
        if (this.had == 0)
            return;
        this.num = this.num + 10;
        if (this.num > this.had)
            this.num = this.had;
        this.mElemList["label_num"].text = this.num;
    };
    CommonDrugFrame.prototype.onCutClick = function () {
        if (this.had == 0)
            return;
        this.num = this.num - 1;
        if (this.num <= 0)
            this.num = 0;
        this.mElemList["label_num"].text = this.num;
    };
    CommonDrugFrame.prototype.onCut10Click = function () {
        if (this.had == 0)
            return;
        this.num = this.num - 10;
        if (this.num <= 0)
            this.num = 0;
        this.mElemList["label_num"].text = this.num;
    };
    return CommonDrugFrame;
}(BaseWnd));
__reflect(CommonDrugFrame.prototype, "CommonDrugFrame");
//# sourceMappingURL=CommonDrugFrame.js.map
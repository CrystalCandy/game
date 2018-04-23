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
var TianXian_MeridianWnd = (function (_super) {
    __extends(TianXian_MeridianWnd, _super);
    function TianXian_MeridianWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TianXian_MeridianWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.type = cellOptionsIndex.TianXianJingMai;
    };
    TianXian_MeridianWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_tupo", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onTupoClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["meridianBox"] = UIItemBox.newObj(this.mLayoutNode, "meridianBox", 80, 5, this.mElemList["group_btom"]);
        this.mElemList["rd_top"].setAlignFlag(gui.Flag.LEFT_TOP);
        this.mElemList["rd_bottom"].setAlignFlag(gui.Flag.LEFT_TOP);
        this.mElemList["rd_this_num"].setAlignFlag(gui.Flag.LEFT_TOP);
        this.mElemList["rd_total_num"].setAlignFlag(gui.Flag.LEFT_TOP);
        var _a;
    };
    TianXian_MeridianWnd.prototype.onUnLoad = function () {
    };
    TianXian_MeridianWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.TIANXIAN_UPDATE, this.refreshFrame, this);
        this.mElemList["meridian_group"].visible = true;
        this.mElemList["title"].text = Localize_cns("TianXianJingMai");
        this.refreshFrame();
    };
    TianXian_MeridianWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.TIANXIAN_UPDATE, this.refreshFrame, this);
        this.mElemList["meridian_group"].visible = false;
    };
    TianXian_MeridianWnd.prototype.refreshFrame = function () {
        var recvInfo = TianXianSystem.getInstance().getTianXianInfo(this.type);
        var recvlist = recvInfo["jingmaidatalist"];
        if (size_t(recvlist) == 0) {
            recvlist = [0, 1];
        }
        var jie = recvlist[1];
        var index = recvlist[0];
        this.select = index + 1;
        this.jie = jie;
        var typeConfig = GameConfig.FunTianXianJingMaiTypeConfig["TianXianJingMai"][jie];
        var jieStr = typeConfig.Typename;
        for (var i = 1; i <= 11; i++) {
            this.mElemList["name_" + i].source = "tx_jingMaiText08";
            this.mElemList["image_" + i].source = "tx_jingMaiDian01";
        }
        //更新等级 label_chong 
        this.mElemList["label_chong"].text = jieStr;
        for (var i = 1; i <= index; i++) {
            this.mElemList["name_" + i].source = "tx_jingMaiText08";
            this.mElemList["image_" + i].source = "tx_jingMaiDian02";
        }
        //更新属性
        var jingmaiConfig = GameConfig.FunTianXianJingMaiConfig["TianXianJingMai"][this.select];
        var maiConfig = table_effect(jingmaiConfig.effects);
        var singleStr = "";
        for (var k in maiConfig) {
            singleStr += "#br#rf" + GetPropertyName(lastAbilityNameToIdOptions[k]) + "#green" + maiConfig[k];
        }
        AddRdContent(this.mElemList["rd_bottom"], singleStr, "ht_20_cc", "black");
        var totalStr = "";
        var totalConfig = TianXianSystem.getInstance().getToTalConfig(jie, index);
        for (var k in totalConfig) {
            totalStr += "#br#rf" + GetPropertyName(lastAbilityNameToIdOptions[k]) + "#green" + totalConfig[k];
        }
        AddRdContent(this.mElemList["rd_top"], totalStr, "ht_20_cc", "black");
        //更新战斗力
        var force = recvInfo["force"]; //GetForceMath(totalConfig)
        DrawNumberStringImage(this.mElemList["force_num"], "zhanLi_", "z" + force, 0, 0, -3);
        //更新消耗材料
        var itemid = jingmaiConfig.itemid;
        this.mElemList["meridianBox"].updateByEntry(itemid);
        var name = ItemSystem.getInstance().getItemName(itemid);
        var nameColor = "blue";
        var had = ItemSystem.getInstance().getItemCount(itemid);
        var need = typeConfig.itemnum;
        var hadStr = (had >= need) ? "#rf#green" : "#rf#red";
        name = "#" + nameColor + name + "x" + need + "#br#br" + Localize_cns("ITEM_TXT30") + hadStr + had;
        AddRdContent(this.mElemList["rd_4_had"], name, "ht_20_cc", "black");
        //经脉丹
        var totalid = 60017;
        var count = ItemSystem.getInstance().getItemCount(totalid);
        var totalHadStr = "#JINGMAI_WHOLE" + Localize_cns("ITEM_TXT30") + "#green" + count;
        AddRdContent(this.mElemList["rd_total_num"], totalHadStr, "ht_20_cc", "black");
        //突破丹
        var this_itemid = 60018;
        var this_had = ItemSystem.getInstance().getItemCount(this_itemid);
        var thisHadStr = "#JINGMAI_SONE" + Localize_cns("ITEM_TXT30") + "#green" + this_had;
        AddRdContent(this.mElemList["rd_this_num"], thisHadStr, "ht_20_cc", "black");
    };
    TianXian_MeridianWnd.prototype.onTupoClick = function () {
        var typeConfig = GameConfig.FunTianXianJingMaiTypeConfig["TianXianJingMai"][this.jie];
        var jingmaiConfig = GameConfig.FunTianXianJingMaiConfig["TianXianJingMai"][this.select];
        var itemid = jingmaiConfig.itemid;
        var had = ItemSystem.getInstance().getItemCount(itemid);
        var need = typeConfig.itemnum;
        if (need == null) {
            MsgSystem.addTagTips(Localize_cns("TIANXIAN_MAXLEVEL"));
        }
        if (had < need)
            return;
        RpcProxy.call("C2G_SIMPLECELLFUN_JINGMAIUP", this.type, this.select, this.jie); //"C2G_SIMPLECELLFUN_JINGMAIUP":"uint16;uint16;uint16"   --entryid 玩法筋脉  index --升级第几个经脉  indextype经脉多少重
    };
    return TianXian_MeridianWnd;
}(BaseCtrlWnd));
__reflect(TianXian_MeridianWnd.prototype, "TianXian_MeridianWnd");
//# sourceMappingURL=TianXian_MeridianWnd.js.map
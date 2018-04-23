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
var TianXian_PelletWnd = (function (_super) {
    __extends(TianXian_PelletWnd, _super);
    function TianXian_PelletWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TianXian_PelletWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.select = -1;
        this.type = cellOptionsIndex.TianXianDanYao;
    };
    TianXian_PelletWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_use", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onUseClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.onInitWindow();
        this.mElemList["petlletBox"] = UIItemBox.newObj(this.mLayoutNode, "petlletBox", 80, 5, this.mElemList["group_bottom"]);
        this.mElemList["rd_1"].setAlignFlag(gui.Flag.LEFT_TOP);
        this.mElemList["rd_2"].setAlignFlag(gui.Flag.LEFT_TOP);
        this.mElemList["rd_3"].setAlignFlag(gui.Flag.LEFT_TOP);
        this.mElemList["rd_4"].setAlignFlag(gui.Flag.LEFT_TOP);
        //  this.mElemList["rd_des"].setAlignFlag(gui.Flag.CENTER_TOP)
        this.mElemList["rd_des"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["rd_used"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a;
    };
    TianXian_PelletWnd.prototype.onUnLoad = function () {
    };
    TianXian_PelletWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.TIANXIAN_UPDATE, this.onRefresh, this);
        this.mElemList["pellet_group"].visible = true;
        this.mElemList["title"].text = Localize_cns("TianXianDanYao");
        this.onRefresh();
    };
    TianXian_PelletWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.TIANXIAN_UPDATE, this.onRefresh, this);
        this.mElemList["pellet_group"].visible = false;
    };
    //初始界面
    TianXian_PelletWnd.prototype.onInitWindow = function () {
        for (var i = 1; i <= 8; i++) {
            var danConfig = GameConfig.FunTianXianDanYaoConfig["TianXianDanYao"][i];
            var icon = GetItemIcon(danConfig.itemid);
            var danName = danConfig.itemname;
            var name_1 = "pellet";
            if (!this.mElemList[name_1 + "_sprite" + i]) {
                //   this.mElemList[name + "skillBox" + i] = UISkillBox.newObj(this.mLayoutNode, name + "skillBox" + i, 17, 17, this.mElemList["skill" + i])
                var mElemInfo = [
                    (_a = {}, _a["index_type"] = eui.Image, _a["name"] = name_1 + "_sprite" + i, _a["image"] = icon, _a["x"] = 10, _a["y"] = 10, _a["w"] = 0, _a["h"] = 0, _a),
                    (_b = {}, _b["index_type"] = eui.Image, _b["name"] = name_1 + "_select" + i, _b["image"] = "hb_jiNengXuanZhong", _b["x"] = -16, _b["y"] = -17, _b["w"] = 133, _b["h"] = 133, _b),
                    (_c = {}, _c["index_type"] = eui.Image, _c["name"] = name_1 + "name_bg" + i, _c["image"] = "ty_textDi05", _c["x"] = -13, _c["y"] = 69, _c["w"] = 127, _c["h"] = 40, _c),
                    (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name_1 + "_name" + i, _d["parent"] = name_1 + "name_bg" + i, _d["title"] = danName, _d["font"] = "ht_24_cc", _d["image"] = null, _d["color"] = "black", _d["x"] = 0, _d["y"] = 0, _d["w"] = 127, _d["h"] = 40, _d),
                ];
                UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, this.mElemList["group_" + i]);
                this.mElemList[name_1 + "_select" + i].visible = false;
                var image = this.mElemList[name_1 + "_sprite" + i];
                image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickOne, this);
            }
        }
        var _a, _b, _c, _d;
    };
    TianXian_PelletWnd.prototype.onRefresh = function () {
        if (this.select = -1) {
            this.select = 1;
        }
        this.showWithSelect();
        var recvinfo = TianXianSystem.getInstance().getTianXianInfo(this.type);
        var usedlist = recvinfo["danyaodatalist"];
        if (size_t(usedlist) == 0)
            return;
        //common rd_1~4
        var totalConfig = {};
        for (var i = 0; i < size_t(usedlist); i++) {
            var danConfig = GameConfig.FunTianXianDanYaoConfig["TianXianDanYao"][i + 1];
            var config = table_effect(danConfig.effects);
            config = table_effect_mul(config, usedlist[i]);
            if (size_t(totalConfig) == 0) {
                totalConfig = config;
            }
            else {
                totalConfig = table_effect_add(totalConfig, config);
            }
        }
        var force = recvinfo["force"];
        DrawNumberStringImage(this.mElemList["bImage"], "zhanLi_", "z" + force, 0, 0, -3);
        var str1 = "";
        var str2 = "";
        var str3 = "";
        var str4 = "";
        var str5 = "";
        var str6 = "";
        var str7 = "";
        var str8 = "";
        for (var k in totalConfig) {
            var v = "#green" + tostring(totalConfig[k]) + "#rf";
            if (k == IndexToabilityName[objectField.UNIT_FIELD_MAX_HP]) {
                str1 += GetPropertyName(objectField.UNIT_FIELD_MAX_HP) + v;
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_DODGE]) {
                str2 += GetPropertyName(objectField.UNIT_FIELD_DODGE) + v;
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_ATTACK]) {
                str3 += GetPropertyName(objectField.UNIT_FIELD_ATTACK) + v;
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_CRITICAL]) {
                str4 += GetPropertyName(objectField.UNIT_FIELD_CRITICAL) + v;
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_DEFENCE]) {
                str5 += GetPropertyName(objectField.UNIT_FIELD_DEFENCE) + v;
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_CRITICAL_DEC]) {
                str6 += GetPropertyName(objectField.UNIT_FIELD_CRITICAL_DEC) + v;
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_HITRATE]) {
                str7 += GetPropertyName(objectField.UNIT_FIELD_HITRATE) + v;
            }
            else if (k == IndexToabilityName[objectField.UNIT_FIELD_SPEED]) {
                str8 += GetPropertyName(objectField.UNIT_FIELD_SPEED) + v;
            }
        }
        AddRdContent(this.mElemList["rd_1"], str1 + "#br#br" + str2, "ht_20_cc", "black");
        AddRdContent(this.mElemList["rd_2"], str3 + "#br#br" + str4, "ht_20_cc", "black");
        AddRdContent(this.mElemList["rd_3"], str5 + "#br#br" + str6, "ht_20_cc", "black");
        AddRdContent(this.mElemList["rd_4"], str7 + "#br#br" + str8, "ht_20_cc", "black");
    };
    TianXian_PelletWnd.prototype.showWithSelect = function () {
        for (var i = 1; i <= 8; i++) {
            this.mElemList["pellet_select" + i].visible = false;
        }
        this.mElemList["pellet_select" + this.select].visible = true;
        var danConfig = GameConfig.FunTianXianDanYaoConfig["TianXianDanYao"][this.select];
        var config = table_effect(danConfig.effects);
        var desStr = Localize_cns("TIANXIAN_SHUXING");
        for (var k in config) {
            desStr += "#br" + GetPropertyName(lastAbilityNameToIdOptions[k]) + config[k];
        }
        var forceStr = Localize_cns("TIANXIAN_ZHANLI") + GetForceMath(config);
        AddRdContent(this.mElemList["rd_des"], desStr, "ht_20_cc", "black");
        AddRdContent(this.mElemList["rd_zhanli"], forceStr, "ht_20_cc");
        //bottom
        this.mElemList["petlletBox"].updateByEntry(danConfig.itemid);
        //字体颜色
        var name = danConfig.itemname;
        this.mElemList["label_name"].text = name;
        var itemid = danConfig.itemid;
        var need = danConfig.itemnum;
        // let item = ItemSystem.getInstance().getItemLogicInfoByID(itemid)
        // let quality = item.getProperty("quality")
        var nameColor = "blue";
        var had = ItemSystem.getInstance().getItemCount(itemid);
        var hadStr = (had >= need) ? "#rf#green" : "#rf#red";
        name = "#" + nameColor + name + "x" + need + "#br#br" + Localize_cns("ITEM_TXT30") + hadStr + had;
        AddRdContent(this.mElemList["rd_had"], name, "ht_20_cc", "black");
        var recvInfo = TianXianSystem.getInstance().getTianXianInfo(this.type);
        var usedlist = recvInfo["danyaodatalist"];
        var used = usedlist[this.select - 1];
        var usedStr = String.format(Localize_cns("ROLE_MOUNT_DAN_TXT1"), used);
        AddRdContent(this.mElemList["rd_used"], usedStr, "ht_20_cc", "black");
    };
    ///------------------响应
    TianXian_PelletWnd.prototype.onClickOne = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        this.select = tonumber(index);
        this.showWithSelect();
    };
    TianXian_PelletWnd.prototype.onUseClick = function () {
        var danConfig = GameConfig.FunTianXianDanYaoConfig["TianXianDanYao"][this.select];
        var itemid = danConfig.itemid;
        var need = danConfig.itemnum;
        var had = ItemSystem.getInstance().getItemCount(itemid);
        if (had < need)
            return;
        RpcProxy.call("C2G_SIMPLECELLFUN_DANYAOUP", this.type, this.select); //entryid 玩法丹药  index --升级第几个丹药
    };
    return TianXian_PelletWnd;
}(BaseCtrlWnd));
__reflect(TianXian_PelletWnd.prototype, "TianXian_PelletWnd");
//# sourceMappingURL=TianXian_PelletWnd.js.map
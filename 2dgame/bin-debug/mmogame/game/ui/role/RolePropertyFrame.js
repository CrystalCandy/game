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
var RolePropertyFrame = (function (_super) {
    __extends(RolePropertyFrame, _super);
    function RolePropertyFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RolePropertyFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    RolePropertyFrame.prototype.onLoad = function () {
        this.mLayoutNode.width = 500;
        this.mLayoutNode.height = 660;
        this.setAlignCenter(true, true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = "group_", _a["title"] = null, _a["font"] = null, _a["image"] = "", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = 500, _a["h"] = 660, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = "bg", _b["title"] = null, _b["font"] = null, _b["image"] = "ty_tipsDi", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 0, _b["w"] = 500, _b["h"] = 660, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = "label_bg", _c["title"] = null, _c["font"] = null, _c["image"] = "hb_textDi02", _c["color"] = gui.Color.white, _c["x"] = 142, _c["y"] = 25, _c["w"] = 217, _c["h"] = 50, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = "label_des", _d["title"] = Localize_cns("ROLE_PROPERTY"), _d["font"] = "ht_24_cc", _d["image"] = "", _d["color"] = gui.Color.black, _d["x"] = 142, _d["y"] = 35, _d["w"] = 217, _d["h"] = 24, _d),
            (_e = {}, _e["index_type"] = gui.RichDisplayer, _e["name"] = "rd_1", _e["title"] = null, _e["font"] = "ht_24_lc", _e["image"] = "", _e["color"] = gui.Color.white, _e["x"] = 60, _e["y"] = 100, _e["w"] = 200, _e["h"] = 508, _e["event_name"] = null, _e["fun_index"] = null, _e),
            (_f = {}, _f["index_type"] = gui.RichDisplayer, _f["name"] = "rd_2", _f["title"] = null, _f["font"] = "ht_24_lc", _f["image"] = "", _f["color"] = gui.Color.white, _f["x"] = 280, _f["y"] = 100, _f["w"] = 200, _f["h"] = 508, _f["event_name"] = null, _f["fun_index"] = null, _f),
            (_g = {}, _g["index_type"] = gui.Button, _g["name"] = "btn_close", _g["title"] = null, _g["image"] = "ty_bt_back01", _g["color"] = gui.Color.white, _g["x"] = 417, _g["y"] = 576, _g["w"] = 83, _g["h"] = 84, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.hideWnd, _g),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d, _e, _f, _g;
    };
    RolePropertyFrame.prototype.onUnLoad = function () {
    };
    RolePropertyFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this);
        this.mLayoutNode.visible = true;
        this.onRefresh();
        RpcProxy.call("C2G_ACTOR_ROLE_PlayerAbility");
    };
    RolePropertyFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTOR_ROLE_UPDATE, this.onRefresh, this);
        UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_UP, this.hideWnd, this);
        this.mLayoutNode.visible = false;
    };
    RolePropertyFrame.prototype.onRefresh = function () {
        var info = RoleSystem.getInstance().getRoleProperty();
        if (size_t(info) == 0)
            return;
        var rd_1_str = "";
        var rd_2_str = "";
        var count = 0;
        for (var k in info) {
            count += 1;
            var v = info[k];
            var vStr = tostring(v);
            if (abilityNameToIndex[k] >= objectField.UNIT_FIELD_ATT_INC) {
                var temp = parseFloat(v);
                vStr = FormatNumber2f(temp) + "%";
            }
            var name_1 = GetPropertyName(k) + vStr + "#br#br#br";
            if (count % 2 == 0) {
                rd_2_str += name_1;
            }
            else {
                rd_1_str += name_1;
            }
        }
        AddRdContent(this.mElemList["rd_1"], rd_1_str, "ht_22_lc");
        AddRdContent(this.mElemList["rd_2"], rd_2_str, "ht_22_lc");
    };
    return RolePropertyFrame;
}(BaseWnd));
__reflect(RolePropertyFrame.prototype, "RolePropertyFrame");
//# sourceMappingURL=RolePropertyFrame.js.map
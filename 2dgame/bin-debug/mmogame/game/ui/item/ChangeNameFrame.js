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
var ChangeNameFrame = (function (_super) {
    __extends(ChangeNameFrame, _super);
    function ChangeNameFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeNameFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    ChangeNameFrame.prototype.onLoad = function () {
        var w = 500;
        var h = 360;
        UiUtil.setWH(this.mLayoutNode, w, h);
        this.setAlignCenter(true, true);
        var ElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "_bg", _a["image"] = "zb_uiDaoJuDi01", _a["x"] = 0, _a["y"] = 0, _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = null, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = "tips1", _b["title"] = Localize_cns("CHANGE_NAME_1"), _b["font"] = "ht_28_cc_stroke", _b["image"] = "", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 40, _b["w"] = w, _b["h"] = 30, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = "line", _c["title"] = null, _c["font"] = null, _c["image"] = "cz_uiLine01", _c["color"] = gui.Color.white, _c["x"] = 75, _c["y"] = 85, _c["w"] = 350, _c["h"] = 3, _c["event_name"] = null, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = "tips2", _d["title"] = Localize_cns("CHANGE_NAME_2"), _d["font"] = "ht_28_cc_stroke", _d["image"] = "", _d["color"] = gui.Color.yellow, _d["x"] = 0, _d["y"] = 100, _d["w"] = w, _d["h"] = 30, _d),
            (_e = {}, _e["index_type"] = gui.Grid9Image, _e["name"] = "new_name_bg", _e["title"] = "", _e["font"] = "ht_28_lc_stroke_2_ublack", _e["image"] = "ty_UIBg02", _e["color"] = gui.Color.darksalmon, _e["x"] = 75, _e["y"] = 150, _e["w"] = 350, _e["h"] = 50, _e["event_name"] = null, _e["fun_index"] = null, _e),
            (_f = {}, _f["index_type"] = eui.EditableText, _f["name"] = "new_name", _f["title"] = "", _f["font"] = "ht_28_cc", _f["prompt"] = Localize_cns("CHANGE_NAME_3"), _f["color"] = gui.Color.white, _f["x"] = 85, _f["y"] = 160, _f["w"] = 330, _f["h"] = 30, _f),
            (_g = {}, _g["index_type"] = gui.Button, _g["name"] = "sure_btn", _g["title"] = Localize_cns("CONFIRM_INFO"), _g["font"] = "ht_24_cc_stroke_saddlebrown", _g["image"] = "ty_tongYongBt01", _g["color"] = gui.Color.white, _g["x"] = (w - 162) / 2 + 15, _g["y"] = 240, _g["w"] = 162, _g["h"] = 82, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onClickSureBtn, _g),
            (_h = {}, _h["index_type"] = gui.Button, _h["name"] = "btn_close_top", _h["title"] = null, _h["font"] = null, _h["image"] = "ty_bt_back02", _h["color"] = gui.Color.white, _h["right"] = 0, _h["top"] = 0, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.hideWnd, _h),
            (_j = {}, _j["index_type"] = gui.Button, _j["name"] = "btn_close", _j["title"] = null, _j["font"] = null, _j["image"] = "ty_bt_back04", _j["color"] = gui.Color.white, _j["right"] = 0, _j["bottom"] = 0, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.hideWnd, _j),
        ];
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this);
        this.edit = this.mElemList["new_name"];
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    ChangeNameFrame.prototype.onUnLoad = function () {
    };
    ChangeNameFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ROLE_CHANGE_NAME, this.hideWnd, this);
        this.mLayoutNode.visible = true;
    };
    ChangeNameFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ROLE_CHANGE_NAME, this.hideWnd, this);
        this.mLayoutNode.visible = false;
    };
    ChangeNameFrame.prototype.onClickSureBtn = function (args) {
        var newName = this.edit.text;
        if (StringUtil.isEmpty(newName)) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_NAME_CFM1"));
            return;
        }
        //不可使用标点符号，不可使用纯数字，不可使用敏感字
        //if(string.match(name, "[%p]+") != null ||
        if (StringUtil.isNumber(newName)) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_NAME_CFM2"));
            return;
        }
        if (WordFilter.checkword(newName) == false) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_NAME_CFM4"));
            return false;
        }
        if (newName.length > NAME_LENGTH_LIMIT) {
            MsgSystem.confirmDialog_YES(String.format(Localize_cns("LOGIN_NAME_CFM3"), NAME_LENGTH_LIMIT));
            return;
        }
        if (this.saveItemID) {
            var message = GetMessage(opCodes.C2G_ROLE_CHANGE_NAME);
            message.itemID = this.saveItemID;
            message.newName = newName;
            SendGameMessage(message);
        }
        //
    };
    ChangeNameFrame.prototype.showWithItemId = function (itemID) {
        this.saveItemID = itemID;
        this.showWnd();
    };
    return ChangeNameFrame;
}(BaseWnd));
__reflect(ChangeNameFrame.prototype, "ChangeNameFrame");
//# sourceMappingURL=ChangeNameFrame.js.map
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
var FindFriendFrame = (function (_super) {
    __extends(FindFriendFrame, _super);
    function FindFriendFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ID_CURRENT_PROPERTY = 1;
        _this.ID_NEXT_PROPERTY = 2;
        return _this;
    }
    FindFriendFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    FindFriendFrame.prototype.onLoad = function () {
        UiUtil.setWH(this.mLayoutNode, 560, 400);
        this.setAlignCenter(true, true);
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "_bg", _a["image"] = "ty_uiDi01", _a["title"] = null, _a["percentWidth"] = 100, _a["percentHeight"] = 100, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = eui.Image, _b["name"] = "bgtitle", _b["title"] = null, _b["font"] = null, _b["image"] = "ty_biaoTiHuaWen01", _b["color"] = gui.Color.white, _b["horizontalCenter"] = 0, _b["y"] = 30, _b["event_name"] = null, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "title", _c["parent"] = "bgtitle", _c["title"] = Localize_cns("CHAT_TXT5"), _c["font"] = "ht_28_cc_stroke", _c["color"] = gui.Color.white, _c["horizontalCenter"] = 0, _c["y"] = 16, _c["event_name"] = null, _c["fun_index"] = null, _c),
            (_d = {}, _d["index_type"] = gui.Grid9Image, _d["name"] = "searchTool", _d["image"] = "ty_uiDi03", _d["x"] = 30, _d["y"] = 110, _d["w"] = 500, _d["h"] = 130, _d["event_name"] = null, _d["fun_index"] = null, _d),
            (_e = {}, _e["index_type"] = gui.Grid9Image, _e["name"] = "input_bg", _e["parent"] = "searchTool", _e["image"] = "ty_uiDi02", _e["x"] = 20, _e["y"] = 40, _e["w"] = 360, _e["h"] = 50, _e["event_name"] = null, _e["fun_index"] = null, _e),
            (_f = {}, _f["index_type"] = eui.EditableText, _f["name"] = "input_edit", _f["parent"] = "input_bg", _f["prompt"] = Localize_cns("INPUT_FRIEND_NAME_OR_ID"), _f["font"] = "ht_22_lc", _f["color"] = gui.Color.white, _f["x"] = 10, _f["y"] = 5, _f["w"] = 340, _f["h"] = 50, _f["event_name"] = null, _f["fun_index"] = null, _f),
            (_g = {}, _g["index_type"] = gui.Button, _g["name"] = "searchBtn", _g["parent"] = "searchTool", _g["image"] = "lt_bt_shuRu01", _g["x"] = 390, _g["y"] = 40, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onClickSearchFriend, _g),
            (_h = {}, _h["index_type"] = gui.Button, _h["name"] = "btn_close", _h["title"] = null, _h["font"] = null, _h["image"] = "ty_bt_back01", _h["color"] = gui.Color.white, _h["right"] = 0, _h["bottom"] = 0, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.hideWnd, _h),
            (_j = {}, _j["index_type"] = gui.Button, _j["name"] = "btn_close_top", _j["title"] = null, _j["font"] = null, _j["image"] = "ty_bt_back02", _j["color"] = gui.Color.white, _j["right"] = 0, _j["top"] = 0, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.hideWnd, _j),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this);
        var edit = this.mElemList["input_edit"];
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    FindFriendFrame.prototype.onUnLoad = function () {
    };
    FindFriendFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.SEARCH_PLAYER_RESULT, this.hideWnd, this);
        this.mLayoutNode.visible = true;
        this.mElemList["input_edit"].text = ("");
    };
    FindFriendFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = (false);
        UnRegisterEvent(EventDefine.SEARCH_PLAYER_RESULT, this.hideWnd, this);
    };
    FindFriendFrame.prototype.onClickSearchFriend = function (args) {
        var edit = this.mElemList["input_edit"];
        var content = edit.text;
        if (StringUtil.isEmpty(content)) {
            return;
        }
        else {
            FriendSystem.getInstance().searchPlayerByName(content);
        }
    };
    return FindFriendFrame;
}(BaseWnd));
__reflect(FindFriendFrame.prototype, "FindFriendFrame");
//# sourceMappingURL=FindFriendFrame.js.map
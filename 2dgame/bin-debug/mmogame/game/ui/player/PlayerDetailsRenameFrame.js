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
var PlayerDetailsRenameFrame = (function (_super) {
    __extends(PlayerDetailsRenameFrame, _super);
    function PlayerDetailsRenameFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerDetailsRenameFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/role/PlayerDetailsReNameLayout.exml"];
    };
    PlayerDetailsRenameFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 500;
        this.mLayoutNode.height = 300;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_sure", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onSureClick, _b),
            (_c = {}, _c["name"] = "btn_cancel", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onCancelClick, _c),
            (_d = {}, _d["name"] = "input_name", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = null, _d),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d;
    };
    PlayerDetailsRenameFrame.prototype.onUnLoad = function () {
    };
    PlayerDetailsRenameFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        //  this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    PlayerDetailsRenameFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        //	this.mLayoutNode.setDoModal(false);
    };
    PlayerDetailsRenameFrame.prototype.onRefresh = function () {
        var name = GetHeroProperty("name");
        this.mElemList["input_name"].text = name;
        var oldName = getSaveRecord(opSaveRecordKey.oldName);
        var costStr = Localize_cns("RENAME_TXT1");
        if (oldName != "" && oldName != null) {
            costStr = GetMoneyIcon(2) + "X200";
        }
        AddRdContent(this.mElemList["rd_cost"], costStr, "ht_24_lc", "black");
    };
    PlayerDetailsRenameFrame.prototype.onSureClick = function () {
        var name = GetHeroProperty("name");
        var textName = this.mElemList["input_name"].text;
        if (WordFilter.checkword(textName) == false) {
            MsgSystem.addTagTips(Localize_cns("PLAYER_DETAILS_TXT10"));
            this.mElemList["input_name"].text = name;
            return;
        }
        if (name == textName) {
            MsgSystem.addTagTips(Localize_cns("PLAYER_DETAILS_TXT8"));
            return;
        }
        if (textName.length > 6) {
            MsgSystem.addTagTips(Localize_cns("PLAYER_DETAILS_NAME_LIMIT"));
            this.mElemList["input_name"].text = name;
            return;
        }
        var oldName = getSaveRecord(opSaveRecordKey.oldName) || "";
        if (oldName != "") {
            var unit = 2;
            var money = GetHeroMoney(unit);
            if (money < 200) {
                MsgSystem.addTagTips("LUCKY_TXT3");
                return;
            }
        }
        var id = GetHeroProperty("id");
        var message = GetMessage(opCodes.C2G_ROLE_CHANGE_NAME);
        message.itemID = id;
        message.newName = textName;
        SendGameMessage(message);
        this.hideWnd();
    };
    PlayerDetailsRenameFrame.prototype.onCancelClick = function () {
        this.hideWnd();
    };
    return PlayerDetailsRenameFrame;
}(BaseWnd));
__reflect(PlayerDetailsRenameFrame.prototype, "PlayerDetailsRenameFrame");
//# sourceMappingURL=PlayerDetailsRenameFrame.js.map
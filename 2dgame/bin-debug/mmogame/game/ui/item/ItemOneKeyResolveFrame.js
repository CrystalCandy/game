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
var ItemOneKeyResolveFrame = (function (_super) {
    __extends(ItemOneKeyResolveFrame, _super);
    function ItemOneKeyResolveFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemOneKeyResolveFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ItemOneKeyResolveLayout.exml"];
        this.resolveTable = [];
        this.resolveItemTable = [];
        this.resolveItemPoint = [];
    };
    ItemOneKeyResolveFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setFullScreen(true)
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "resolveBtn", _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickResolve, _c),
        ];
        var colorList = [gui.Color.white, gui.Color.lime, gui.Color.cyan, gui.Color.magenta, gui.Color.orange];
        for (var i = 0; i < 5; i++) {
            JsUtil.arrayInstert(elemInfo, (_d = {}, _d["name"] = "text" + i, _d["font"] = "ht_24_cc_stroke", _d["color"] = colorList[i], _d));
            JsUtil.arrayInstert(elemInfo, (_e = {}, _e["name"] = "check" + i, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onClickCheck, _e));
            this.mElemList["check" + i].selected = false;
        }
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["reward_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var str = String.format(Localize_cns("ITEM_RESOLVE_TXT21"), 0);
        AddRdContent(this.mElemList["reward_rd"], str, "ht_24_cc_stroke", "lime");
        AddRdContent(this.mElemList["tips_rd"], Localize_cns("ITEM_RESOLVE_TXT19") + "#br" + Localize_cns("ITEM_RESOLVE_TXT20"), "ht_22_cc", "navajowhite");
        var _a, _b, _c, _d, _e;
    };
    ItemOneKeyResolveFrame.prototype.onUnLoad = function () {
    };
    ItemOneKeyResolveFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        for (var i = 0; i < 5; i++) {
            this.mElemList["check" + i].selected = false;
        }
    };
    ItemOneKeyResolveFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    //确定溶解
    ItemOneKeyResolveFrame.prototype.onClickResolve = function (args) {
        var self = this;
        var callback = {
            onDialogCallback: function (result, userData) {
                if (result == true) {
                    var list = self.resolveTable;
                    var message = GetMessage(opCodes.C2G_ITEM_EQUIP_SPLIT);
                    message.list = list;
                    SendGameMessage(message);
                    self.hideWnd();
                }
            }
        };
        MsgSystem.confirmDialog(Localize_cns("ITEM_RESOLVE_TXT22"), callback, null);
    };
    ItemOneKeyResolveFrame.prototype.onClickCheck = function (args) {
        var name = args.target.name;
        this.updateResolveEquipInfo();
    };
    ItemOneKeyResolveFrame.prototype.updateResolveEquipInfo = function () {
        var sum = 0;
        this.resolveTable = [];
        for (var i = 0; i < 5; i++) {
            if (this.mElemList["check" + i].selected) {
                for (var _ in this.resolveItemTable[i]) {
                    var v = this.resolveItemTable[i][_];
                    JsUtil.arrayInstert(this.resolveTable, v);
                    sum = sum + this.resolveItemPoint[i];
                }
            }
        }
        var str = String.format(Localize_cns("ITEM_RESOLVE_TXT21"), sum);
        AddRdContent(this.mElemList["reward_rd"], str, "ht_24_cc_stroke", "lime");
    };
    ItemOneKeyResolveFrame.prototype.showItemOneKeyResolveFrame = function (data) {
        this.resolveItemTable = [];
        this.resolveItemPoint = [];
        JsUtil.arrayInstert(this.resolveItemTable, data.resolveWhiteItemTable);
        JsUtil.arrayInstert(this.resolveItemTable, data.resolveGreenItemTable);
        JsUtil.arrayInstert(this.resolveItemTable, data.resolveBlueItemTable);
        JsUtil.arrayInstert(this.resolveItemTable, data.resolveGoldItemTable);
        JsUtil.arrayInstert(this.resolveItemTable, data.resolveOrangeItemTable);
        JsUtil.arrayInstert(this.resolveItemPoint, data.resolveWhiteItemPoint);
        JsUtil.arrayInstert(this.resolveItemPoint, data.resolveGreenItemPoint);
        JsUtil.arrayInstert(this.resolveItemPoint, data.resolveBlueItemPoint);
        JsUtil.arrayInstert(this.resolveItemPoint, data.resolveGoldItemPoint);
        JsUtil.arrayInstert(this.resolveItemPoint, data.resolveOrangeItemPoint);
        return this.showWnd();
    };
    return ItemOneKeyResolveFrame;
}(BaseWnd));
__reflect(ItemOneKeyResolveFrame.prototype, "ItemOneKeyResolveFrame");
//# sourceMappingURL=ItemOneKeyResolveFrame.js.map
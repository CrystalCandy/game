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
// TypeScript file
var BeiBaoAddCapacityFrame = (function (_super) {
    __extends(BeiBaoAddCapacityFrame, _super);
    function BeiBaoAddCapacityFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeiBaoAddCapacityFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/item/BeiBaoAddCapacityLayout.exml"];
    };
    BeiBaoAddCapacityFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_sure", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onSureClick, _b),
            (_c = {}, _c["name"] = "btn_cancel", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.hideWnd, _c),
            (_d = {}, _d["name"] = "btn_add", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onAddClick, _d),
            (_e = {}, _e["name"] = "btn_reduce", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onReduceClick, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.count = 5;
        var _a, _b, _c, _d, _e;
    };
    BeiBaoAddCapacityFrame.prototype.onUnLoad = function () {
    };
    BeiBaoAddCapacityFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    BeiBaoAddCapacityFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    ///
    BeiBaoAddCapacityFrame.prototype.onRefresh = function () {
        //rd_cost
        var ratio = 10;
        var costStr = GetMoneyIcon(opItemUnit.CURRENCY) + "#space" + ratio * this.count;
        AddRdContent(this.mElemList["rd_cost"], costStr, "ht_22_cc");
        //label_num
        this.mElemList["label_num"].text = this.count;
    };
    /////btn响应事件
    BeiBaoAddCapacityFrame.prototype.onSureClick = function () {
        var unittype = 3; //哪一种
        var money = GetHeroMoney(unittype);
        if (money > this.count) {
            RpcProxy.call("C2G_PacketUpstep", this.count / 5);
        }
        else {
            MsgSystem.addTagTips(Localize_cns("元宝不足"));
        }
    };
    BeiBaoAddCapacityFrame.prototype.onAddClick = function () {
        this.count += 5;
        this.onRefresh();
    };
    BeiBaoAddCapacityFrame.prototype.onReduceClick = function () {
        if (this.count == 5)
            return;
        this.count -= 5;
        this.onRefresh;
    };
    return BeiBaoAddCapacityFrame;
}(BaseWnd));
__reflect(BeiBaoAddCapacityFrame.prototype, "BeiBaoAddCapacityFrame");
//# sourceMappingURL=BeiBaoAddCapacityFrame.js.map
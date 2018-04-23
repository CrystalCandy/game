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
var DailyFindBackTipsFrame = (function (_super) {
    __extends(DailyFindBackTipsFrame, _super);
    function DailyFindBackTipsFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyFindBackTipsFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/DailyFindBackTipsLayout.exml"];
        this.index = -1;
    };
    DailyFindBackTipsFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.width = 640;
        this.mLayoutNode.height = 400;
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_sure", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onSureClick, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_cancel", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.hideWnd, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c;
        //this.index = -1  
    };
    DailyFindBackTipsFrame.prototype.onUnLoad = function () {
    };
    DailyFindBackTipsFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.onRefresh();
    };
    DailyFindBackTipsFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
        if (this.index != -1) {
            this.index = -1;
        }
    };
    DailyFindBackTipsFrame.prototype.onRefresh = function () {
        var actInfo = GetActivity(ActivityDefine.Boss).getFindBackInfo();
        if (actInfo == null)
            return;
        var money = 0;
        var had = GetHeroMoney(2);
        var num = 0;
        if (this.index == -1) {
            this.sendList = [];
            for (var k in actInfo) {
                var config = actInfo[k];
                money += config.needMoney * config.backNum;
                num += config.backNum;
                table_insert(this.sendList, config.ID);
            }
        }
        else {
            var config = actInfo[this.index - 1];
            if (config == null)
                return;
            this.sendId = config.ID;
            money = config.needMoney * config.backNum;
            num = config.backNum;
        }
        this.isEnough = had < money ? false : true;
        var str = String.format(Localize_cns("DAILY_TIPS_COST"), money, num);
        this.mElemList["label_des"].text = str;
    };
    ////////----------x响应事件
    DailyFindBackTipsFrame.prototype.onSureClick = function () {
        if (this.isEnough == false) {
            MsgSystem.addTagTips(Localize_cns("LUCKY_TXT3"));
            return;
        }
        //发送协议
        if (this.index == -1) {
            if (this.sendList == null)
                return;
            for (var k in this.sendList) {
                RpcProxy.call("C2G_XiyouLilian_FindBack", this.sendList[k]);
            }
        }
        else {
            if (this.sendId == null)
                return;
            RpcProxy.call("C2G_XiyouLilian_FindBack", this.sendId);
        }
        this.hideWnd();
    };
    ///-------
    DailyFindBackTipsFrame.prototype.onShowWnd = function (index) {
        this.index = index;
        this.showWnd();
    };
    return DailyFindBackTipsFrame;
}(BaseWnd));
__reflect(DailyFindBackTipsFrame.prototype, "DailyFindBackTipsFrame");
//# sourceMappingURL=DailyFindBackTipsFrame.js.map
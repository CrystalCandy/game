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
//登录送元宝
var DailyLoginFrame = (function (_super) {
    __extends(DailyLoginFrame, _super);
    function DailyLoginFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyLoginFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/payActivity/DailyLoginLayout.exml"];
    };
    DailyLoginFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["group_list"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "prize_scroll", 0, 0, group.width, group.height, group);
        var _a, _b;
    };
    DailyLoginFrame.prototype.onUnLoad = function () {
    };
    DailyLoginFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.refreshFrame();
        RpcProxy.call("C2G_SendOperatePlayerData", PayActivityIndex.DAILY_LOGIN);
    };
    DailyLoginFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this);
    };
    DailyLoginFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        var mElemInfo = [
            (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = name + "_bg", _a["image"] = "ty_uiDi03", _a["color"] = gui.Color.white, _a["x"] = 0, _a["y"] = 0, _a["w"] = window.width, _a["h"] = window.height, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "_daybg", _b["image"] = "sc_biaoTiDi01", _b["color"] = gui.Color.white, _b["x"] = 385, _b["y"] = 5, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = null, _b),
            (_c = {}, _c["index_type"] = eui.Label, _c["name"] = name + "_day", _c["title"] = "", _c["font"] = "ht_22_cc", _c["color"] = gui.Color.black, _c["x"] = 385, _c["y"] = 10, _c["w"] = 160, _c["h"] = 25, _c["fun_index"] = null, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.Button, _d["name"] = name + "_btn", _d["title"] = Localize_cns("ACTIVITY_PAY_TXT6"), _d["font"] = "ht_20_cc_stroke", _d["image"] = "ty_tongYongBt3", _d["autoScale"] = true, _d["color"] = gui.Color.white, _d["x"] = 405, _d["y"] = 50, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickGetPrize, _d),
            (_e = {}, _e["index_type"] = eui.Label, _e["name"] = name + "_status", _e["title"] = "", _e["font"] = "ht_22_cc", _e["color"] = gui.Color.black, _e["x"] = 405, _e["y"] = 50, _e["w"] = 120, _e["h"] = 50, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
        ];
        UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window);
        for (var i = 0; i < 4; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mElemList, name + "itemBox" + i, 20 + 86 * i, 20, window);
            //this.mElemList[name + "itemBox" + i].updateByEntry(SpecailItemId.FUNDS, 1000)
        }
        var _a, _b, _c, _d, _e;
    };
    DailyLoginFrame.prototype.refreshItemWindow = function (window, config, playerInfo) {
        var day = config.day - 1; //playerInfo是数组，从0开始
        //let loginDays = size_t(playerInfo)
        var prize_list = AnalyPrizeFormat(config.prize);
        var name = window.name;
        for (var i = 0; i < 4; i++) {
            var itemBox = this.mElemList[name + "itemBox" + i];
            var prize = prize_list[i];
            if (prize) {
                itemBox.setVisible(true);
                itemBox.updateByEntry(prize[0], prize[1]);
            }
            else {
                itemBox.setVisible(false);
            }
        }
        if (playerInfo[day] == null) {
            this.mElemList[name + "_btn"].visible = false;
            this.mElemList[name + "_status"].visible = true;
            this.mElemList[name + "_status"].text = Localize_cns("ACTIVITY_PAY_TXT70");
            this.mElemList[name + "_status"].textColor = gui.Color.ublack;
        }
        else if (playerInfo[day] == 0) {
            this.mElemList[name + "_btn"].visible = true;
            this.mElemList[name + "_status"].visible = false;
        }
        else if (playerInfo[day] == 1) {
            this.mElemList[name + "_btn"].visible = false;
            this.mElemList[name + "_status"].visible = true;
            this.mElemList[name + "_status"].text = Localize_cns("ACTIVITY_PAY_TXT7");
            this.mElemList[name + "_status"].textColor = gui.Color.green;
        }
        this.mElemList[name + "_day"].text = String.format(Localize_cns("ACTIVITY_PAY_TXT4"), config.day);
        this.controlDataTable[name + "_btn"] = config;
    };
    DailyLoginFrame.prototype.refreshFrame = function () {
        var playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.DAILY_LOGIN);
        if (playerInfo == null)
            return;
        var list = []; //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1 ]
        var count = size_t(GameConfig.DailyLoginConfig);
        for (var i = 1; i <= count; i++) {
            var config = GameConfig.DailyLoginConfig[i];
            list.push(config);
        }
        var group = this.mElemList["group_list"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        var hasNum = list.length;
        for (var k = 0; k < list.length; k++) {
            var v = list[k];
            var window_1 = scroll.getItemWindow(k, 550, 120, 0, 0, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, playerInfo);
        }
    };
    DailyLoginFrame.prototype.onClickGetPrize = function (args) {
        var name = args.target.name;
        var config = this.controlDataTable[name];
        var rpcArgs = {};
        rpcArgs[1] = config.day;
        RpcProxy.call("C2G_GetOperateActivityPrize", PayActivityIndex.DAILY_LOGIN, rpcArgs);
    };
    return DailyLoginFrame;
}(BaseWnd));
__reflect(DailyLoginFrame.prototype, "DailyLoginFrame");
//# sourceMappingURL=DailyLoginFrame.js.map
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
//每日充值
var DailyPayFrame = (function (_super) {
    __extends(DailyPayFrame, _super);
    function DailyPayFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyPayFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/payActivity/DailyPayLayout.exml"];
        this.mActivityIndex = PayActivityIndex.DAY_ACCUM_PAY_PRIZE;
        this.mTabIndex = 1;
    };
    DailyPayFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onTabSelected, this);
        var radioBtn = this.mElemList["tab_payany"];
        radioBtn.group = radioGroup;
        radioBtn.value = 1;
        radioBtn = this.mElemList["tab_payValue"];
        radioBtn.group = radioGroup;
        radioBtn.value = 2;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_pay", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClickGetPrize, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 0; i < 6; i++) {
            var parent_1 = this.mElemList["group_prize" + i];
            this.mElemList["itemBox" + i] = UIItemBox.newObj(this.mElemList, "itemBox" + i, 40, 30, parent_1);
            //this.mElemList[name + "itemBox" + i].updateByEntry(SpecailItemId.FUNDS, 1000)
        }
        var rd = this.mElemList["rd_payinfo"];
        rd.setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b;
    };
    DailyPayFrame.prototype.onUnLoad = function () {
    };
    DailyPayFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.refreshFrame();
        RpcProxy.call("C2G_SendOperateAndPlayerData", this.mActivityIndex);
    };
    DailyPayFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
    };
    DailyPayFrame.prototype.refreshFrame = function () {
        //{oldValue:0, reachList:[0,1,2,0]}--[1]=0没达成 [1]=1,可领取 [1]=2领取了
        var playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(this.mActivityIndex);
        //{stime:xx, etime:xx, prizeList:[]}
        var activityInfo = ActivitySystem.getInstance().getOperateActivityInfo(this.mActivityIndex);
        if (playerInfo == null || activityInfo == null)
            return;
        //必须只能两个档位
        var prizeList = activityInfo.prizeList;
        if (prizeList.length != 2)
            return;
        var minConfig = prizeList[0];
        var maxConfig = prizeList[1];
        if (minConfig.point > maxConfig.point) {
            var temp = maxConfig;
            maxConfig = minConfig;
            minConfig = temp;
        }
        //设置标签页
        var maxTab = this.mElemList["tab_payValue"];
        maxTab.label = String.format(Localize_cns("ACTIVITY_PAY_TXT18"), GetRmbFromGold(maxConfig.point));
        //显示当前奖励
        var showPrize = null;
        if (this.mTabIndex == 1) {
            showPrize = minConfig;
        }
        else {
            showPrize = maxConfig;
        }
        var prize_list = showPrize.prize;
        for (var i = 0; i < 6; i++) {
            var itemBox = this.mElemList["itemBox" + i];
            var prize = prize_list[i];
            if (prize) {
                //itemBox.setVisible(true)
                itemBox.updateByEntry(prize[0], prize[1]);
                this.mElemList["group_prize" + i].visible = true;
            }
            else {
                //itemBox.setVisible(false)
                this.mElemList["group_prize" + i].visible = false;
            }
        }
        //今日充值
        var rmb = GetRmbFromGold(playerInfo.oldValue);
        AddRdContent(this.mElemList["rd_payinfo"], String.format(Localize_cns("ACTIVITY_PAY_TXT14"), rmb), "ht_24_cc_stroke", "white");
        //刷新按钮
        var allGet = true;
        var canGet = false;
        for (var _i = 0, _a = playerInfo.reachList; _i < _a.length; _i++) {
            var val = _a[_i];
            if (val != 2) {
                allGet = false;
            }
            if (val == 1) {
                canGet = true;
            }
        }
        var btn = this.mElemList["btn_pay"];
        btn.enabled = true;
        if (allGet) {
            btn.enabled = false;
            btn.text = Localize_cns("ACTIVITY_PAY_TXT7");
        }
        else if (canGet) {
            btn.text = Localize_cns("ACTIVITY_PAY_TXT17");
        }
        else {
            btn.text = Localize_cns("ACTIVITY_PAY_TXT16");
        }
    };
    DailyPayFrame.prototype.onClickGetPrize = function (args) {
        var playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(this.mActivityIndex);
        if (playerInfo == null)
            return;
        for (var index = 1; index <= playerInfo.reachList.length; index++) {
            var val = playerInfo.reachList[index - 1]; //服务器lua，从1开始
            if (val == 1) {
                RpcProxy.call("C2G_GetOperateActivityPrize", this.mActivityIndex, [index]);
                return;
            }
        }
        //打开充值
        ExecuteMainFrameFunction("chongzhi");
    };
    DailyPayFrame.prototype.onTabSelected = function (event) {
        var radioGroup = event.target;
        var radiobtn = radioGroup.selection;
        this.mTabIndex = radiobtn.value;
        this.refreshFrame();
    };
    return DailyPayFrame;
}(BaseWnd));
__reflect(DailyPayFrame.prototype, "DailyPayFrame");
//# sourceMappingURL=DailyPayFrame.js.map
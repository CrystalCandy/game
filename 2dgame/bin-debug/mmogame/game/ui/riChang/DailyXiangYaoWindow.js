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
var DailyXiangYaoWindow = (function (_super) {
    __extends(DailyXiangYaoWindow, _super);
    function DailyXiangYaoWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyXiangYaoWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    DailyXiangYaoWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        this.timer = null;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_oneKey", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onOneKeyClick, _a),
            (_b = {}, _b["name"] = "btn_kill", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onKillClick, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["rd_1_twice"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_1_time"].setAlignFlag(gui.Flag.RIGHT_CENTER);
        var _a, _b;
    };
    DailyXiangYaoWindow.prototype.onUnLoad = function () {
        if (this.timer != null) {
            KillTimer(this.timer);
            this.timer = null;
        }
    };
    DailyXiangYaoWindow.prototype.onShow = function () {
        this.mElemList["group_xiangYao"].visible = true;
        this.mElemList["title"].text = Localize_cns("DAILY_TXT1");
        this.onRefresh();
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.ZhongKuiDemon);
    };
    DailyXiangYaoWindow.prototype.onHide = function () {
        this.mElemList["group_xiangYao"].visible = false;
    };
    DailyXiangYaoWindow.prototype.updateWnd = function () {
        this.onRefresh();
    };
    DailyXiangYaoWindow.prototype.onRefresh = function () {
        var index = this.mParentWnd.tabWndList.getTabIndex();
        var image = "rc_ztBg01";
        this.mElemList["image_bg"].source = image;
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.ZhongKuiDemon);
        //  this.mElemList["group_xiangYao"].visible = true;
        if (size_t(actInfo) == 0) {
            return;
        }
        for (var i = 1; i <= 3; i++) {
            if (i != (index + 1)) {
                this.mElemList["group_" + i + "_prize"].visible = false;
                this.mElemList["group_rd_" + i].visible = false;
            }
            else {
                this.mElemList["group_" + i + "_prize"].visible = true;
                this.mElemList["group_rd_" + i].visible = true;
            }
        }
        var activeList = {};
        var unActiveList = {};
        var npcList = actInfo.npcList;
        for (var k in npcList) {
            var v = npcList[k];
            var osTime = GetServerTime();
            if ((v <= osTime)) {
                activeList[k] = v;
            }
            else {
                unActiveList[k] = v;
            }
        }
        for (var k in unActiveList) {
            var tempTime = unActiveList[k];
            if (this.refreshTime == null) {
                this.refreshTime = tempTime;
                this.npcIndex = tonumber(k);
            }
            if (this.refreshTime > tempTime) {
                this.refreshTime = tempTime;
                this.npcIndex = tonumber(k);
            }
        }
        this.mParentWnd.npcIndx = this.npcIndex;
        if (this.refreshTime == null || this.refreshTime - GetServerTime() <= 0) {
            this.refreshTime = GetServerTime() + 1800;
        }
        //
        var had = size_t(activeList);
        var twiceStr = String.format(Localize_cns("DAILY_TXT8"), had);
        AddRdContent(this.mElemList["rd_1_twice"], twiceStr, "ht_20_cc");
        //奖励
        var config = opBossActivityConfig[OrdinaryActivityIndex.ZhongKuiDemon].stagePrize;
        var list = AnalyPrizeFormat(config);
        var prizeName = "xiangYao";
        for (var i = 1; i <= size_t(list); i++) {
            var v = list[i - 1];
            if (!this.mElemList[prizeName + "prizeBox" + i]) {
                this.mElemList[prizeName + "prizeBox" + i] = UIItemBox.newObj(this.mLayoutNode, prizeName + "prizeBox" + i, 0, 0, this.mElemList["group_1_prize"]);
            }
            this.mElemList[prizeName + "prizeBox" + i].updateByEntry(v[0], v[1]);
        }
        var value = actInfo.killCount;
        var maxvalue = 10;
        UiUtil.updateProgress(this.mElemList["progress"], value, maxvalue);
        var proStr = String.format(Localize_cns("ESCORT_TXT5"), value, maxvalue);
        this.mElemList["label_pro"].text = proStr;
        var isget = actInfo.prizeFlag == 1 ? true : false;
        var state1 = true;
        var state2 = true;
        var name1 = Localize_cns("DAILY_TXT9"); //"一键完成"
        var name2 = Localize_cns("DAILY_TXT10"); //"前往击杀"
        if (had == 0) {
            state2 = false;
        }
        if (isget) {
            name1 = Localize_cns("DAILY_TXT11"); //"已领取"
            state1 = false;
        }
        else if (had >= 10) {
            name1 = Localize_cns("DAILY_TXT13");
        }
        this.mElemList["btn_oneKey"].text = name1;
        this.mElemList["btn_kill"].text = name2;
        this.mElemList["btn_oneKey"].enabled = state1;
        this.mElemList["btn_kill"].enabled = state2;
        //双倍奖励
        /*if(actInfo.prizeRatio == 2){
            this.mElemList["double_prize"].visible = true
        }else{
            this.mElemList["double_prize"].visible = false
        }
        */
        if (this.timer == null) {
            this.timer = SetTimer(this.onRefreshTime, this, 1000, true);
        }
    };
    DailyXiangYaoWindow.prototype.onRefreshTime = function () {
        //
        var time = this.refreshTime;
        if (time == null) {
            return;
        }
        var refreshTime = time - GetServerTime();
        if (refreshTime == 0) {
        }
        var str = getFormatDiffTime(refreshTime);
        var timeStr = String.format(Localize_cns("DAILY_TXT12"), str);
        AddRdContent(this.mElemList["rd_1_time"], timeStr, "ht_20_cc");
    };
    /////btn响应事件
    DailyXiangYaoWindow.prototype.onKillClick = function (args) {
        var index = this.mParentWnd.tabWndList.getTabIndex();
        if (index != 0)
            return;
        var wnd = WngMrg.getInstance().getWindow("DailyGhostFrame");
        wnd.showWnd();
    };
    DailyXiangYaoWindow.prototype.onOneKeyClick = function (args) {
        var index = this.mParentWnd.tabWndList.getTabIndex();
        if (index != 0)
            return;
        var name = args.target.name;
        var btnName = this.mElemList[name].text;
        if (btnName == Localize_cns("DAILY_TXT9")) {
            var vip = GetHeroProperty("VIP_level");
            if (vip < 6) {
                MsgSystem.addTagTips(String.format(Localize_cns("DAILY_TXT14"), 6));
            }
            RpcProxy.call("C2G_SweepBossActivity", OrdinaryActivityIndex.ZhongKuiDemon, 1);
        }
        else if (btnName == Localize_cns("DAILY_TXT13")) {
            RpcProxy.call("C2G_GetActivityStagePrize", OrdinaryActivityIndex.ZhongKuiDemon);
        }
    };
    return DailyXiangYaoWindow;
}(BaseCtrlWnd)); // TypeScript file
__reflect(DailyXiangYaoWindow.prototype, "DailyXiangYaoWindow");
//# sourceMappingURL=DailyXiangYaoWindow.js.map
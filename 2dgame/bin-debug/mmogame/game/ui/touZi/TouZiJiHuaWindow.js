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
var TouZiJiHuaWindow = (function (_super) {
    __extends(TouZiJiHuaWindow, _super);
    function TouZiJiHuaWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouZiJiHuaWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    TouZiJiHuaWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_touzi", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.touziClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_touzi"];
        this.scroll3 = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL);
        this.mElemList["rd_jihua_time"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.timer = null;
        var _a;
    };
    TouZiJiHuaWindow.prototype.onUnLoad = function () {
        if (this.timer != null) {
            KillTimer(this.timer);
            this.timer = null;
        }
    };
    TouZiJiHuaWindow.prototype.onShow = function () {
        //RegisterEvent(EventDefine.PAY_TOUZI_JIHUA, this.onRefresh, this)
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this);
        this.mElemList["group_tab_3"].visible = true;
        //RpcProxy.call("C2G_GetOperateData",24)
        RpcProxy.call("C2G_SendOperatePlayerData", PayActivityIndex.INVEST_PLAN);
        // if(this.timer == null){
        //     this.timer = SetTimer(this.onRefreshTime , this, 1000)
        // }
        this.onRefresh();
    };
    TouZiJiHuaWindow.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.PAY_TOUZI_JIHUA, this.onRefresh, this)
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this);
        this.mElemList["group_tab_3"].visible = false;
    };
    TouZiJiHuaWindow.prototype.onRefreshTime = function () {
        //rd_jihua_time
        //let time = getFormatDiffTime(1522166400)
        var openTime = ActivitySystem.getInstance().getOpenTime();
        //let openTime = 1522289110
        var serverTime = GetServerTime();
        var time = openTime + 8 * 86400;
        var shengyuTime = time - serverTime;
        if (shengyuTime < 0) {
            shengyuTime = 0;
        }
        var timeRd = String.format(Localize_cns("INVEST_TXT14"), getFormatDiffTime(shengyuTime));
        AddRdContent(this.mElemList["rd_jihua_time"], timeRd, "ht_20_cc_stroke", "blue");
        if (serverTime >= time) {
            if (this.timer) {
                KillTimer(this.timer);
                this.timer = null;
            }
        }
        else {
            if (this.timer == null) {
                this.timer = SetTimer(this.onRefreshTime, this, 1000);
            }
        }
    };
    TouZiJiHuaWindow.prototype.onRefresh = function () {
        // let time = getFormatDiffTime(1522166400)
        // AddRdContent(this.mElemList["rd_time"], time, "ht_20_cc_stroke", "blue")
        //let planInfo = PaySystem.getInstance().getTouziJihuaInfo();	//计划信息
        var planInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.INVEST_PLAN);
        this.planInfo = planInfo;
        if (planInfo == -1) {
            this.isBuy = false;
            //this.mElemList["btn_touzi"].text = Localize_cns("INVEST_TXT9")
        }
        else {
            this.isBuy = true;
            //this.mElemList["btn_touzi"].text = Localize_cns("INVEST_TXT8")
        }
        //this.isBuy = true
        var day = 0; //day = 当前已经领取的天数+1
        if (this.isBuy) {
            //this.mElemList["btn_touzi"].enabled = false
            day = size_t(planInfo) + 1;
            this.mElemList["btn_touzi"].text = String.format(Localize_cns("INVEST_TXT11"), day);
        }
        else {
            //this.mElemList["btn_touzi"].enabled = true
            this.mElemList["btn_touzi"].text = Localize_cns("INVEST_TXT12");
        }
        this.day = day;
        var openTime = ActivitySystem.getInstance().getOpenTime();
        //let openTime = 1522289110
        var time = GetTodayTime(openTime); //1522252800 开服当天0点 
        var serverTime = GetServerTime(); //
        this.canGetDay = Math.floor((serverTime - time) / 86400) + 1;
        this.scroll3.clearItemList();
        var list = GameConfig.InvestPlanConfig;
        var disposeList = [];
        var ro = 0;
        var t = [];
        for (var k in list) {
            var info = list[k];
            if (ro == 2) {
                table_insert(disposeList, t);
                t = [];
                ro = 0;
            }
            ro = ro + 1;
            table_insert(t, info);
        }
        var arrayLength = t.length;
        if (arrayLength > 0) {
            table_insert(disposeList, t);
        }
        this.list = disposeList;
        var height = 125;
        for (var i = 0; i < size_t(disposeList); i++) {
            var v = disposeList[i];
            var window_1 = this.scroll3.getItemWindow(i, 550, height, 5, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        this.scroll3.refreshScroll();
        this.scroll3.restoreViewXY();
    };
    TouZiJiHuaWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        // let w = window.width
        // let h = window.height
        var width = 270, height = 125;
        for (var i = 0; i < 2; i++) {
            var x = i * 278 + 2;
            var y = 0;
            var Info = [
                (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "bg" + i, _a["image"] = "", _a["x"] = x, _a["y"] = y, _a["w"] = width, _a["h"] = height, _a),
                (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "bg1" + i, _b["parent"] = name + "bg" + i, _b["title"] = null, _b["font"] = null, _b["image"] = "ty_uiDi03", _b["color"] = null, _b["x"] = 0, _b["y"] = 0, _b["w"] = width, _b["h"] = height, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onBuyClick, _b),
                (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "daybg" + i, _c["parent"] = name + "bg" + i, _c["title"] = null, _c["font"] = null, _c["image"] = "sc_biaoTiDi01", _c["color"] = null, _c["x"] = 55, _c["y"] = 2, _c["w"] = 159, _c["h"] = 32, _c),
                (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "day" + i, _d["parent"] = name + "daybg" + i, _d["title"] = "", _d["font"] = "ht_24_cc", _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = 0, _d["w"] = 159, _d["h"] = 32, _d["messageFlag"] = true, _d),
                (_e = {}, _e["index_type"] = gui.Grid9Image, _e["name"] = name + "yilingqu" + i, _e["title"] = null, _e["font"] = null, _e["image"] = "bh_text02", _e["color"] = null, _e["x"] = x + 80, _e["y"] = 55, _e["w"] = 120, _e["h"] = 39, _e["event_name"] = null, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            ];
            UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
            for (var j = 0; j < 3; j++) {
                this.mElemList[name + "itemBox" + j + i] = UIItemBox.newObj(this.mElemList, name + "itemBox" + j + i, 85 * j + 10, 35, this.mElemList[name + "bg1" + i]);
            }
        }
        var _a, _b, _c, _d, _e;
    };
    TouZiJiHuaWindow.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        for (var i = 0; i < 2; i++) {
            var info = data[i];
            var prize = info.prize;
            var day = info.day;
            this.mElemList[name + "yilingqu" + i].visible = false;
            if (this.isBuy) {
                if ((this.day - 1) >= day) {
                    this.mElemList[name + "yilingqu" + i].visible = true;
                }
            }
            for (var j = 0; j < 3; j++) {
                //let prizeInfo = prize[j]
                var itemList = AnalyPrizeFormat(prize);
                var v = itemList[j];
                if (v) {
                    this.mElemList[name + "itemBox" + j + i].updateByEntry(v[0], v[1]);
                }
                else {
                    this.mElemList[name + "itemBox" + j + i].updateByEntry(-1);
                }
            }
            this.mElemList[name + "day" + i].text = String.format(Localize_cns("INVEST_TXT10"), day);
        }
    };
    ///-------------响应事件
    TouZiJiHuaWindow.prototype.touziClick = function () {
        if (this.isBuy) {
            //this.mElemList["btn_touzi"].enabled = false
            //let openTime =  ActivitySystem.getInstance().getOpenTime()
            if (this.canGetDay >= this.day) {
                RpcProxy.call("C2G_GetOperateActivityPrize", PayActivityIndex.INVEST_PLAN, [this.day]); //拿1-9
            }
            else {
                MsgSystem.addTagTips(Localize_cns("INVEST_TXT18"));
            }
        }
        else {
            var needGold = opLimitTimeActive.investPlan;
            var curGold = GetHeroProperty("gold");
            if (curGold >= needGold) {
                //是否购买
                var t = {
                    onDialogCallback: function (result, userData) {
                        if (result) {
                            RpcProxy.call("C2G_DoOperateActivity", PayActivityIndex.INVEST_PLAN, []);
                        }
                    }
                };
                MsgSystem.confirmDialog(Localize_cns("INVEST_TXT16"), t, null);
            }
            else {
                MsgSystem.addTagTips(Localize_cns("INVEST_TXT15"));
            }
            PayActivityIndex;
        }
    };
    TouZiJiHuaWindow.prototype.onBuyClick = function () {
    };
    return TouZiJiHuaWindow;
}(BaseCtrlWnd));
__reflect(TouZiJiHuaWindow.prototype, "TouZiJiHuaWindow");
//# sourceMappingURL=TouZiJiHuaWindow.js.map
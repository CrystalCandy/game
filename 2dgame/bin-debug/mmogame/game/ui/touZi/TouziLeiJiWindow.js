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
var TouziLeiJiWindow = (function (_super) {
    __extends(TouziLeiJiWindow, _super);
    function TouziLeiJiWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouziLeiJiWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    TouziLeiJiWindow.prototype.onLoad = function () {
        this.index = 0;
        this.mElemList = this.mParentWnd.mElemList;
        var group = this.mElemList["leichong_scroll"];
        this.scroll4 = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_HORIZON);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_left", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onLeftClick, _a),
            (_b = {}, _b["name"] = "btn_right", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onRightClick, _b),
            (_c = {}, _c["name"] = "btn_leiji_charge", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onChargeClick, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        //奖励
        for (var i = 0; i < 6; i++) {
            var x = 72 * (i % 3) + 10;
            var y = 5;
            if (i >= 3) {
                y = 72 + 5;
            }
            this.mElemList["itemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox_" + i, x, y, this.mElemList["group_leiji_prize"], 0.9);
            //this.mElemList["itemBox_" + i].updateByEntry(20001)
        }
        //  this.setCountDown(5800)
        this.mElemList["countdown_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b, _c;
    };
    TouziLeiJiWindow.prototype.onUnLoad = function () {
    };
    TouziLeiJiWindow.prototype.onShow = function () {
        this.mElemList["group_tab_4"].visible = true;
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        RpcProxy.call("C2G_SendOperateAndPlayerData", PayActivityIndex.ACCUM_PAY_PRIZE); //获取活动信息和玩家数据
        this.onRefresh();
    };
    TouziLeiJiWindow.prototype.onHide = function () {
        this.mElemList["group_tab_4"].visible = false;
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
    };
    TouziLeiJiWindow.prototype.onRefresh = function () {
        var playerInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.ACCUM_PAY_PRIZE);
        var activityInfo = ActivitySystem.getInstance().getOperateActivityInfo(PayActivityIndex.ACCUM_PAY_PRIZE);
        if (playerInfo == undefined || activityInfo == undefined) {
            return;
        }
        var prizeList = activityInfo.prizeList;
        this.prizeList = prizeList;
        this.nameToIndex = [];
        for (var i = 0; i < size_t(prizeList); i++) {
            var v = prizeList[i];
            var window_1 = this.scroll4.getItemWindow(i, 117, 51, 5, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, i);
        }
        this.scroll4.refreshScroll();
        //this.scroll4.restoreViewXY()   
        var curShowReward = prizeList[this.index].prize;
        for (var i = 0; i < 6; i++) {
            var item = curShowReward[i];
            if (item) {
                this.mElemList["itemBox_" + i].updateByEntry(item[0], item[1]);
            }
            else {
                this.mElemList["itemBox_" + i].updateByEntry(-1);
            }
        }
        this.state = 0;
        var reachList = playerInfo.reachList;
        if (reachList[this.index]) {
            if (reachList[this.index] == 1) {
                this.state = 1;
            }
            else if (reachList[this.index] == 2) {
                this.state = 2;
            }
        }
        if (this.state == 0) {
            this.mElemList["btn_leiji_charge"].text = Localize_cns("INVEST_TXT19");
        }
        else if (this.state == 1) {
            this.mElemList["btn_leiji_charge"].text = Localize_cns("INVEST_TXT20");
        }
        else {
            this.mElemList["btn_leiji_charge"].text = Localize_cns("INVEST_TXT21");
        }
        //  let heroInfo = GetHeroPropertyInfo()
        //  let exp = heroInfo.VIP_exp
        //  let vip = VipSystem.getInstance().GetVipLevel()
        //  let curVipExp = VipSystem.getInstance().getVipSum(vip)
        //  let sum = curVipExp + exp
        var sum = playerInfo.oldValue;
        var rdStr = String.format(Localize_cns("INVEST_TXT13"), sum);
        AddRdContent(this.mElemList["rd_leiji_charge"], rdStr, "ht_20_cc", "white");
        //let curCount = this.prizeList[this.index].potin?
        var curCount = 8888;
        this.setCountDown(curCount);
    };
    TouziLeiJiWindow.prototype.setCountDown = function (num) {
        // if(this.index==1){
        //     num = 1
        // }else if(this.index==2){
        //     num = 88
        // }else if(this.index==3){
        //     num = 888
        // }else if(this.index==4){
        //     num = 8888
        // }else if(this.index==5){
        //     num = 88888
        // }
        // let offx = (num.toString().length - 1)*10 + 165
        // let imageBox:gui.BatchImage = this.mElemList["countdown"]
        // imageBox.beginDraw();
        // imageBox.drawNumberString("yuanBao_", num,offx,0)
        // imageBox.endDraw();
        AddRdContent(this.mElemList["countdown_rd"], tostring(num), "ht_24_cc_stroke", "white");
        // if(num>=0&&num<10){
        //     imageBox.x = 165
        // }else if(num>=10&&num<100){
        //     imageBox.x = 155
        // }else if(num>=100&&num<1000){
        //     imageBox.x = 145
        // }else if(num>=1000&&num<10000){
        //     imageBox.x = 135
        // }else if(num>=1000){
        //     imageBox.x = 125
        // }
    };
    TouziLeiJiWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var width = 117, height = 51;
        var Info = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "bg", _a["image"] = "", _a["x"] = 0, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "btn_bg", _b["title"] = null, _b["font"] = null, _b["image"] = "", _b["color"] = null, _b["x"] = 0, _b["y"] = 0, _b["w"] = 117, _b["h"] = 51, _b),
            (_c = {}, _c["index_type"] = gui.Button, _c["name"] = name + "btn", _c["title"] = "", _c["font"] = "ht_20_cc_stroke", _c["image"] = "", _c["color"] = gui.Color.white, _c["x"] = 0, _c["y"] = 0, _c["w"] = 117, _c["h"] = 51, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClick, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "text", _d["parent"] = name + "btn", _d["title"] = "", _d["font"] = "ht_18_cc_stroke", _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = 0, _d["w"] = 117, _d["h"] = 51, _d["messageFlag"] = true, _d),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c, _d;
    };
    TouziLeiJiWindow.prototype.refreshItemWindow = function (window, data, i) {
        var name = window.name;
        this.mElemList[name + "btn_bg"].source = "ty_tongYongBt3";
        if (this.index == i) {
            this.mElemList[name + "btn_bg"].source = "ty_tongYongBt4";
        }
        this.mElemList[name + "text"].text = String.format(Localize_cns("INVEST_TXT22"), data.point);
        this.nameToIndex[name + "btn"] = i;
    };
    TouziLeiJiWindow.prototype.onClick = function (args) {
        var name = args.target.name;
        if (this.nameToIndex[name] == null) {
            return;
        }
        var index = this.nameToIndex[name];
        this.index = index;
        this.onRefresh();
    };
    TouziLeiJiWindow.prototype.onLeftClick = function (args) {
        this.index = 0;
        this.onRefresh();
        this.scroll4.moveToScrollIndex(this.index, true);
    };
    TouziLeiJiWindow.prototype.onRightClick = function (args) {
        this.index = size_t(this.prizeList) - 1;
        this.onRefresh();
        this.scroll4.moveToScrollIndex(this.index, true);
    };
    TouziLeiJiWindow.prototype.onChargeClick = function (args) {
        var index = this.index;
        if (this.state == 0) {
            ExecuteMainFrameFunction("chongzhi");
        }
        else if (this.state == 1) {
            RpcProxy.call("C2G_GetOperateActivityPrize", PayActivityIndex.ACCUM_PAY_PRIZE, [index + 1]);
        }
        else {
            MsgSystem.addTagTips(Localize_cns("INVEST_TXT21"));
        }
    };
    return TouziLeiJiWindow;
}(BaseCtrlWnd));
__reflect(TouziLeiJiWindow.prototype, "TouziLeiJiWindow");
//# sourceMappingURL=TouziLeiJiWindow.js.map
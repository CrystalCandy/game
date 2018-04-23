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
var TouZiChengzhangWindow = (function (_super) {
    __extends(TouZiChengzhangWindow, _super);
    function TouZiChengzhangWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouZiChengzhangWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    TouZiChengzhangWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_chengzhang", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onTouziClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_chengzhang"];
        this.scroll2 = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL);
        this.mElemList["chengzhang_rd_time"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.timer = null;
        var _a;
    };
    TouZiChengzhangWindow.prototype.onUnLoad = function () {
        if (this.timer != null) {
            KillTimer(this.timer);
            this.timer = null;
        }
    };
    TouZiChengzhangWindow.prototype.onShow = function () {
        //RegisterEvent(EventDefine.PAY_TOUZI_CHENGZHANG, this.onRefresh, this)
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this);
        this.mElemList["group_tab_2"].visible = true;
        RpcProxy.call("C2G_SendOperatePlayerData", PayActivityIndex.LEVEL_FUNDS);
        // if(this.timer == null){
        //     this.timer = SetTimer(this.onRefreshTime , this, 1000)
        // }
        this.onRefresh();
    };
    TouZiChengzhangWindow.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.PAY_TOUZI_CHENGZHANG, this.onRefresh, this)
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this);
        this.mElemList["group_tab_2"].visible = false;
    };
    TouZiChengzhangWindow.prototype.onRefreshTime = function () {
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
        AddRdContent(this.mElemList["chengzhang_rd_time"], timeRd, "ht_20_cc_stroke", "blue");
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
    TouZiChengzhangWindow.prototype.onRefresh = function () {
        //this.onRefreshTime()
        var heroLevel = GetHeroProperty("level");
        this.heroLevel = heroLevel;
        // let chengZhangInfo = PaySystem.getInstance().getPayChengZhangInfo();
        var chengZhangInfo = ActivitySystem.getInstance().getOperatePlayerInfo(PayActivityIndex.LEVEL_FUNDS);
        this.chengZhangInfo = chengZhangInfo;
        //if(chengZhangInfo == null){
        if (chengZhangInfo == -1) {
            this.isBuy = false;
            this.mElemList["btn_chengzhang"].text = Localize_cns("INVEST_TXT9");
        }
        else {
            this.isBuy = true;
            this.mElemList["btn_chengzhang"].text = Localize_cns("INVEST_TXT8");
        }
        this.mElemList["btn_chengzhang"].enabled = (this.isBuy == false);
        var config = GameConfig.LevelFundsConfig;
        this.nameToIndex = [];
        var height = 70;
        for (var i = 0; i < size_t(config); i++) {
            var v = config[i + 100];
            var window_1 = this.scroll2.getItemWindow(i, 550, height, 5, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v, i);
        }
        this.scroll2.refreshScroll();
        this.scroll2.restoreViewXY();
    };
    TouZiChengzhangWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var width = 550, height = 70;
        var Info = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "bg", _a["image"] = "", _a["x"] = 0, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a["messageFlag"] = true, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "bg1", _b["parent"] = name + "bg", _b["title"] = null, _b["font"] = null, _b["image"] = "ty_uiDi03", _b["color"] = null, _b["x"] = 0, _b["y"] = 0, _b["w"] = width, _b["h"] = height, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "levelbg", _c["parent"] = name + "bg", _c["title"] = null, _c["font"] = null, _c["image"] = "sc_biaoTiDi01", _c["color"] = null, _c["x"] = 10, _c["y"] = 20, _c["w"] = 159, _c["h"] = 32, _c),
            (_d = {}, _d["index_type"] = eui.Label, _d["name"] = name + "level", _d["parent"] = name + "levelbg", _d["title"] = "", _d["font"] = "ht_24_cc", _d["color"] = gui.Color.white, _d["x"] = 0, _d["y"] = 0, _d["w"] = 159, _d["h"] = 32, _d["messageFlag"] = true, _d),
            (_e = {}, _e["index_type"] = gui.RichDisplayer, _e["name"] = name + "reward_rd", _e["parent"] = name + "_group", _e["x"] = 185, _e["y"] = 20, _e["w"] = 200, _e["h"] = 30, _e["event_name"] = null, _e["fun_index"] = null, _e),
            (_f = {}, _f["index_type"] = gui.Button, _f["name"] = name + "getBtn", _f["title"] = "", _f["font"] = "ht_20_cc_stroke", _f["image"] = "ty_tongYongBt3", _f["color"] = gui.Color.white, _f["x"] = 420, _f["y"] = 10, _f["w"] = 117, _f["h"] = 51, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onClick, _f),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b, _c, _d, _e, _f;
    };
    TouZiChengzhangWindow.prototype.refreshItemWindow = function (window, data, i) {
        var name = window.name;
        this.mElemList[name + "level"].text = String.format(Localize_cns("INVEST_TXT4"), data.level);
        var rmbNum = data.prize[0][1];
        var bindNum = data.prize[1][1];
        var str = String.format(Localize_cns("INVEST_TXT3"), rmbNum, bindNum);
        AddRdContent(this.mElemList[name + "reward_rd"], str, "ht_20_cc_stroke", "white");
        //   if(this.isBuy){
        //       if(this.chengZhangInfo && this.chengZhangInfo[i+100]){
        //           //领取了
        //           this.mElemList[name+"getBtn"].text = Localize_cns("INVEST_TXT7") 
        //       }else{
        //           if(this.heroLevel >=data.level){
        //               this.mElemList[name+"getBtn"].text = Localize_cns("INVEST_TXT6") 
        //               this.mElemList[name+"getBtn"].enabled = true
        //           }else{
        //               this.mElemList[name+"getBtn"].text = Localize_cns("INVEST_TXT5") 
        //           }
        //       }
        //   }else{
        //       this.mElemList[name+"getBtn"].text = Localize_cns("INVEST_TXT5") 
        //   }
        this.mElemList[name + "getBtn"].enabled = true;
        if (this.heroLevel >= data.level) {
            this.mElemList[name + "getBtn"].text = Localize_cns("INVEST_TXT6");
        }
        else {
            this.mElemList[name + "getBtn"].text = Localize_cns("INVEST_TXT5");
            this.mElemList[name + "getBtn"].enabled = false;
        }
        if (this.chengZhangInfo && this.chengZhangInfo[i + 100]) {
            this.mElemList[name + "getBtn"].text = Localize_cns("INVEST_TXT7");
            this.mElemList[name + "getBtn"].enabled = false;
        }
        this.nameToIndex[name + "getBtn"] = i + 100;
    };
    ///-------------响应事件
    TouZiChengzhangWindow.prototype.onTouziClick = function () {
        //记得判断元宝
        var needGold = opLimitTimeActive.levelFunds;
        var curGold = GetHeroProperty("gold");
        if (curGold >= needGold) {
            //是否购买
            var t = {
                onDialogCallback: function (result, userData) {
                    if (result) {
                        RpcProxy.call("C2G_DoOperateActivity", PayActivityIndex.LEVEL_FUNDS, []);
                    }
                }
            };
            MsgSystem.confirmDialog(Localize_cns("INVEST_TXT17"), t, null);
        }
        else {
            MsgSystem.addTagTips(Localize_cns("INVEST_TXT15"));
        }
    };
    TouZiChengzhangWindow.prototype.onClick = function (args) {
        var name = args.target.name;
        if (this.nameToIndex[name] == null) {
            return;
        }
        if (this.isBuy == false) {
            MsgSystem.addTagTips(Localize_cns("INVEST_TXT27"));
            return;
        }
        var index = this.nameToIndex[name];
        RpcProxy.call("C2G_GetOperateActivityPrize", PayActivityIndex.LEVEL_FUNDS, [index]);
        //PayActivityIndex
    };
    return TouZiChengzhangWindow;
}(BaseCtrlWnd));
__reflect(TouZiChengzhangWindow.prototype, "TouZiChengzhangWindow");
//# sourceMappingURL=TouZiChengzhangWindow.js.map
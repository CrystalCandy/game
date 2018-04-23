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
var PayFrame = (function (_super) {
    __extends(PayFrame, _super);
    function PayFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PayFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/pay/PayLayout.exml"];
    };
    PayFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_power", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickVipPower, _c),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_wnd"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        var _a, _b, _c;
    };
    PayFrame.prototype.onUnLoad = function () {
    };
    PayFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this);
        RegisterEvent(EventDefine.PAY_ACTIVITY_SELLPET, this.refreshFrame, this);
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    PayFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_SELLPET, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
    };
    PayFrame.prototype.refreshVipWnd = function () {
        var vip = GetHeroProperty("VIP_level") || 0;
        this.mElemList["vip_icon"].source = ("cz_vip" + String.format("%02d", vip));
        var remand = VipSystem.getInstance().GetVipFeed();
        var needDia = VipSystem.getInstance().getVipSumDia(vip);
        var tips = "";
        if (vip >= defaultValue.DEFALUT_VIP_MAX_LEVEL) {
            tips = Localize_cns("PAY_TXT3");
        }
        else {
            tips = String.format(Localize_cns("PAY_TXT4"), remand, (vip + 1));
        }
        AddRdContent(this.mElemList["rd_des"], tips, "ht_22_cc", "ublack");
        UiUtil.updateProgress(this.mElemList["exp_imb"], needDia - remand, needDia);
    };
    PayFrame.prototype.refreshFrame = function () {
        this.refreshVipWnd();
        this.onRefresh();
    };
    PayFrame.prototype.onRefresh = function () {
        var list = [];
        var chargelist = [];
        for (var k in GameConfig.RechargeConfig) {
            var v = GameConfig.RechargeConfig[k];
            if (v.Type == 1) {
                JsUtil.arrayInstert(chargelist, v);
            }
            if (v.Type == 2) {
                JsUtil.arrayInstert(list, v);
            }
        }
        table_sort(chargelist, function (a, b) {
            return a.RechargeId - b.RechargeId;
        });
        for (var i in chargelist) {
            JsUtil.arrayInstert(list, chargelist[i]);
        }
        //this.list = list
        this.scroll.clearItemList();
        this.controlData = {};
        //for (let i in list) {
        for (var i = 0; i < list.length; i++) {
            var index = Math.ceil((i + 1) / 2);
            var window_1 = this.scroll.getItemWindow(index, 550, 158, 0, 0, 0);
            this.initItemWindow(window_1, i);
            this.refreshItemWindow(window_1, list[i], i);
        }
        this.scroll.refreshScroll();
    };
    PayFrame.prototype.initItemWindow = function (window, i) {
        var name = window.name;
        var ElemInfo = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "_group", _a["x"] = i % 2 * 278, _a["y"] = 0, _a["w"] = 272, _a["h"] = 158, _a),
            (_b = {}, _b["index_type"] = gui.Grid9Image, _b["name"] = name + "_bg", _b["parent"] = name + "_group", _b["image"] = "cz_chongZhiDi02", _b["x"] = 0, _b["y"] = 0, _b["w"] = 272, _b["h"] = 158, _b["messageFlag"] = true, _b),
            (_c = {}, _c["index_type"] = gui.Grid9Image, _c["name"] = name + "_tag", _c["parent"] = name + "_group", _c["image"] = "cz_text02", _c["x"] = 0, _c["y"] = 0, _c["w"] = 65, _c["h"] = 61, _c["messageFlag"] = true, _c),
            (_d = {}, _d["index_type"] = gui.RichDisplayer, _d["name"] = name + "_yuanbao", _d["parent"] = name + "_group", _d["x"] = 0, _d["y"] = 11, _d["w"] = 272, _d["h"] = 30, _d),
            (_e = {}, _e["index_type"] = gui.Grid9Image, _e["name"] = name + "_icon", _e["parent"] = name + "_group", _e["image"] = "cz_yuanBaoIcon01", _e["x"] = -5, _e["y"] = 40, _e["w"] = 152, _e["h"] = 133, _e["messageFlag"] = true, _e),
            (_f = {}, _f["index_type"] = eui.Group, _f["name"] = name + "_sp_group", _f["parent"] = name + "_group", _f["x"] = 99, _f["y"] = 47, _f["w"] = 173, _f["h"] = 32, _f["messageFlag"] = true, _f),
            (_g = {}, _g["index_type"] = gui.Grid9Image, _g["name"] = name + "_sp_bg", _g["parent"] = name + "_sp_group", _g["image"] = "cz_textDi01", _g["x"] = 0, _g["y"] = 0, _g["w"] = 173, _g["h"] = 32, _g["messageFlag"] = true, _g),
            (_h = {}, _h["index_type"] = gui.RichDisplayer, _h["name"] = name + "_sp_rd", _h["parent"] = name + "_sp_group", _h["x"] = 0, _h["y"] = 5, _h["w"] = 173, _h["h"] = 30, _h["messageFlag"] = true, _h),
            (_j = {}, _j["index_type"] = gui.Button, _j["name"] = name + "_btn", _j["parent"] = name + "_group", _j["title"] = "", _j["font"] = "ht_24_cc_stroke", _j["image"] = "ty_tongYongBt2", _j["color"] = gui.Color.white, _j["x"] = 165, _j["y"] = 90, _j["w"] = 94, _j["h"] = 49, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onClickRecharge, _j),
        ];
        UiUtil.createElem(ElemInfo, this.mLayoutNode, this.mElemList, this, window);
        this.mElemList[name + "_tag"].visible = false;
        this.mElemList[name + "_sp_group"].visible = false;
        this.mElemList[name + "_yuanbao"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList[name + "_sp_rd"].setAlignFlag(gui.Flag.H_CENTER);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    };
    PayFrame.prototype.refreshItemWindow = function (window, data, index) {
        var name = window.name;
        this.controlData[name + "_btn"] = data;
        var yuanbao = data.Rebate + data.Gain;
        AddRdContent(this.mElemList[name + "_yuanbao"], yuanbao + data.title, "ht_24_cc_stroke", "white");
        this.mElemList[name + "_tag"].source = "cz_text0" + (3 - data.Type);
        this.mElemList[name + "_btn"].text = data.Tips;
        //月卡
        if (data.Type == 2) {
            this.mElemList[name + "_icon"].source = "cz_yueKaIcon01";
            this.mElemList[name + "_sp_group"].visible = true;
            this.mElemList[name + "_tag"].visible = true;
            var monthEndTime = getSaveRecord(opSaveRecordKey.monthCardRecruitCD) || 0;
            if (monthEndTime > GetServerTime()) {
                var times = monthEndTime - GetServerTime();
                var str = String.format(Localize_cns("MONTH_ACTIVITY_TIME"), Math.ceil(times / (24 * 3600)));
                AddRdContent(this.mElemList[name + "_sp_rd"], str, "ht_20_cc_stroke", "white");
            }
            else {
                var str = String.format(Localize_cns("PAY_TXT5"), 1000);
                AddRdContent(this.mElemList[name + "_sp_rd"], str, "ht_20_cc_stroke", "white");
            }
        }
        else {
            this.mElemList[name + "_icon"].source = "cz_yuanBaoIcon" + String.format("%02d", index);
            this.mElemList[name + "_sp_group"].visible = true;
            this.mElemList[name + "_tag"].visible = true;
            var str = String.format(Localize_cns("PAY_TXT6"), data.First);
            AddRdContent(this.mElemList[name + "_sp_rd"], str, "ht_20_cc_stroke", "white");
        }
    };
    PayFrame.prototype.onClickRecharge = function (event) {
        var name = event.target.name;
        //let index = name.replace(/[^0-9]/ig, "");
        var data = this.controlData[name];
        // if (this.list[index]) {
        //     let data = this.list[index]
        PaySystem.getInstance().payFromId(data.RechargeId);
        //}
    };
    PayFrame.prototype.onClickVipPower = function () {
        ExecuteMainFrameFunction("VIP");
    };
    return PayFrame;
}(BaseWnd));
__reflect(PayFrame.prototype, "PayFrame");
//# sourceMappingURL=PayFrame.js.map
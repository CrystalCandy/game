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
var Club_HallWnd = (function (_super) {
    __extends(Club_HallWnd, _super);
    function Club_HallWnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Club_HallWnd.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    Club_HallWnd.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "notice_change_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.changeNotice, _a),
            (_b = {}, _b["name"] = "event_record_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.eventRecord, _b),
            (_c = {}, _c["name"] = "apply_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.applyClcked, _c),
            (_d = {}, _d["name"] = "juanxian_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.juanxianClicked, _d),
            (_e = {}, _e["name"] = "people_info_btn", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.peopleInfoClicked, _e),
            (_f = {}, _f["name"] = "club_list_btn", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.clubListClicked, _f),
            (_g = {}, _g["name"] = "activity_btn", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.activityClicked, _g),
            (_h = {}, _h["name"] = "shop_btn", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.shopClicked, _h),
            (_j = {}, _j["name"] = "map_btn", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.mapClicked, _j),
            (_k = {}, _k["name"] = "club_war_btn", _k["title"] = null, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.clubWarClicked, _k),
            (_l = {}, _l["name"] = "btn_change", _l["title"] = null, _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = this.clubChangeClicked, _l),
            (_m = {}, _m["name"] = "btn_zhao", _m["title"] = null, _m["event_name"] = egret.TouchEvent.TOUCH_TAP, _m["fun_index"] = this.clubZhaoClicked, _m),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["notice_change_btn"].visible = false;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    };
    Club_HallWnd.prototype.onUnLoad = function () {
    };
    Club_HallWnd.prototype.onShow = function () {
        RegisterEvent(EventDefine.GET_CLUB_INFO, this.refreshFrame, this);
        RegisterEvent(EventDefine.UPDATE_CLUB_NOTICE, this.refreshNotice, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        RegisterEvent(EventDefine.CLUB_RENQI_INFO, this.refreshFrame, this);
        this.mElemList["group1"].visible = true;
        this.mElemList["title"].text = Localize_cns("CLUB_TXT4");
        //帮派信息
        RpcProxy.call("C2G_FactionMemberRefresh");
        RpcProxy.call("C2G_FactionInfoRefresh");
        this.refreshFrame();
    };
    Club_HallWnd.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.GET_CLUB_INFO, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.UPDATE_CLUB_NOTICE, this.refreshNotice, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.CLUB_RENQI_INFO, this.refreshFrame, this);
        this.mElemList["group1"].visible = false;
    };
    Club_HallWnd.prototype.refreshFrame = function () {
        var clubInfo = ClubSystem.getInstance().getCurClubInfo();
        if (clubInfo == null) {
            return;
        }
        var power = ClubSystem.getInstance().isHaveClubJurisdiction();
        this.mElemList["notice_change_btn"].visible = power;
        var bangzhu_name = clubInfo.leader;
        this.mElemList["bangzhu_name"].text = String.format(Localize_cns("CLUB_TXT14"), bangzhu_name);
        var zijinNum = clubInfo.exp; //资金
        this.mElemList["zijin"].text = String.format(Localize_cns("CLUB_TXT16"), zijinNum);
        var clubLevle = clubInfo.level;
        this.mElemList["level"].text = String.format(Localize_cns("CLUB_TXT17"), clubLevle);
        var mingzi_text = clubInfo.name;
        this.mElemList["mingci_text"].text = mingzi_text;
        var renshu_num = clubInfo.menberCount;
        this.mElemList["renshu_num_text"].text = renshu_num;
        var notice_text = clubInfo.notice;
        AddRdContent(this.mElemList["notice_rd"], notice_text, "ht_24_cc", "saddlebrown", 3);
    };
    //更新公告用
    Club_HallWnd.prototype.refreshNotice = function () {
        var notice_text = ClubSystem.getInstance().getNotice();
        AddRdContent(this.mElemList["notice_rd"], notice_text, "ht_24_cc", "saddlebrown", 3);
    };
    Club_HallWnd.prototype.changeNotice = function () {
        WngMrg.getInstance().showWindow("ClubChangeNoticeFrame");
    };
    Club_HallWnd.prototype.eventRecord = function () {
        WngMrg.getInstance().showWindow("ClubEventRecordFrame");
    };
    Club_HallWnd.prototype.applyClcked = function () {
        var power = ClubSystem.getInstance().isHaveClubJurisdiction();
        if (power) {
            WngMrg.getInstance().showWindow("ClubPeopleApplyFrame");
        }
        else {
            MsgSystem.addTagTips(Localize_cns("CLUB_TXT42"));
        }
    };
    Club_HallWnd.prototype.juanxianClicked = function () {
        WngMrg.getInstance().showWindow("ClubDonateFrame");
    };
    Club_HallWnd.prototype.peopleInfoClicked = function () {
        WngMrg.getInstance().showWindow("ClubPeopleInfoFrame");
    };
    Club_HallWnd.prototype.clubListClicked = function () {
        var wnd = WngMrg.getInstance().getWindow("ClubListFrame");
        wnd.showAndSetData();
    };
    Club_HallWnd.prototype.activityClicked = function () {
        WngMrg.getInstance().showWindow("ClubActiveFrame");
    };
    Club_HallWnd.prototype.shopClicked = function () {
        WngMrg.getInstance().showWindow("ClubShopFrame");
    };
    Club_HallWnd.prototype.mapClicked = function () {
        // WngMrg.getInstance().showWindow("ClubMapFrame");
        var a = GetActivity(ActivityDefine.ClubMap);
        a.requestStart();
    };
    Club_HallWnd.prototype.clubWarClicked = function () {
        MsgSystem.addTagTips(Localize_cns("CLUB_TXT57"));
        //WngMrg.getInstance().showWindow("ClubWarFrame");
    };
    //帮派改名
    Club_HallWnd.prototype.clubChangeClicked = function () {
        var power = ClubSystem.getInstance().isHaveClubJurisdiction();
        if (power) {
            WngMrg.getInstance().showWindow("ClubChangeNameFrame");
        }
        else {
            MsgSystem.addTagTips(Localize_cns("CLUB_TXT42"));
        }
    };
    //招人
    Club_HallWnd.prototype.clubZhaoClicked = function () {
        var power = ClubSystem.getInstance().isHaveClubJurisdiction();
        if (power) {
            var channelId = 7;
            var clubInfo = ClubSystem.getInstance().getCurClubInfo();
            var str = String.format(Localize_cns("CLUB_TXT100"), clubInfo.name);
            MsgSystem.selectShowHandle(channelId, str);
        }
        else {
            MsgSystem.addTagTips(Localize_cns("CLUB_TXT42"));
        }
    };
    return Club_HallWnd;
}(BaseCtrlWnd));
__reflect(Club_HallWnd.prototype, "Club_HallWnd");
//# sourceMappingURL=Club_HallWnd.js.map
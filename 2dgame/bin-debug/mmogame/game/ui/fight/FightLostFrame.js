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
var FightLostFrame = (function (_super) {
    __extends(FightLostFrame, _super);
    function FightLostFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightLostFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/fight/FightLostLayout.exml"];
    };
    FightLostFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "exit_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onReturn, _a),
            (_b = {}, _b["name"] = "shouchong_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onFirstPayClick, _b),
            (_c = {}, _c["name"] = "chongwu_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onPetClick, _c),
            (_d = {}, _d["name"] = "zhuangbei_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onEquipClick, _d),
            (_e = {}, _e["name"] = "skill_btn", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onSkillClick, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a, _b, _c, _d, _e;
    };
    FightLostFrame.prototype.onUnLoad = function () {
    };
    FightLostFrame.prototype.onShow = function () {
        // RegisterEvent(EventDefine.TEAM_MEMBER_NOTICE, this.onTeamMemNotice, this)
        _super.prototype.onShow.call(this);
        this.mLayoutNode.visible = true;
        GameSound.getInstance().playEffect(SystemSound.effect_fail);
        this.refreshFrame();
    };
    FightLostFrame.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        // UnRegisterEvent(EventDefine.TEAM_MEMBER_NOTICE, this.onTeamMemNotice, this)
        this.mLayoutNode.visible = false;
    };
    FightLostFrame.prototype.refreshFrame = function () {
        var firstPayIsOpen = ActivitySystem.getInstance().checkActivityIsOpen(PayActivityIndex.FIRST_PAY);
        this.mElemList["shouchong_btn"].visible = (firstPayIsOpen == true);
        this.mLayoutNode["btn_group"].x = 20;
        if (firstPayIsOpen) {
            this.mLayoutNode["btn_group"].x = 80;
        }
    };
    ////////////////////////////////////////////////////////////公共接口///////////////////////////////////////////
    FightLostFrame.prototype.getCurFightType = function () {
        if (this.param) {
            return this.param.fightType;
        }
        else {
            return null;
        }
    };
    FightLostFrame.prototype.addReCallHandler = function (obj, callBack, param) {
        //this.specHandler = { obj, callBack, param }
    };
    ////////////////////////////////////////////////////////////-响应函数//////////////////////////////////////////////////////////////////////
    FightLostFrame.prototype.onReturn = function (args) {
        // if (HeroIsInTeam() == true) {
        // 	if (HeroIsCaptain() == false) {
        // 		return MsgSystem.addTagTips(Localize_cns("TEAM_TXT34"))
        // 	} else {
        // 		CaptainSendNotice(0, TeamNoticeTag.HideFightResult)
        // 	}
        // }
        var fightType = this.param.fightType;
        this.endShowCombatEnd();
        // if (fightType == opFightType.FIGHT_TYPE_DAILY) {
        //     // let wnd = WngMrg.getInstance().getWindow("SkyTowerFrame")
        //     // if (wnd.isVisible()) {
        //     //     wnd.showAllMenu()
        //     // }
        // }
    };
    FightLostFrame.prototype.starShowCombatEnd = function () {
        return this.showWnd();
    };
    // onTeamMemNotice(args) {
    // 	if(TeamIsFollowState() == false ){
    // 		return
    // 	}
    // 	let fightType = this.param.fightType
    // 	//if(args.key != OrdinaryActivityIndex.NULL ){
    // 	if(args.value ==  TeamNoticeTag.HideFightResult ){							//不填也可以，先作标识
    // 		this.endShowCombatEnd()
    //         let wnd = WngMrg.getInstance().getWindow("SkyTowerFrame")
    //         if (wnd.isVisible()) {
    //             wnd.showAllMenu()
    //         }	
    // 		return
    // 	}
    // 	//}
    // }
    FightLostFrame.prototype.onClickFightRecord = function (args) {
        WngMrg.getInstance().showWindow("FightRecordFrame");
    };
    FightLostFrame.prototype.onFirstPayClick = function () {
        this.hideWnd();
        //判断有没有充值>1000
        //>就不显示这个按钮
        var wnd = WngMrg.getInstance().getWindow("TouZiFrame");
        wnd.showWithIndex(PayActivityIndex.FIRST_PAY);
    };
    FightLostFrame.prototype.onPetClick = function () {
        this.hideWnd();
        ExecuteMainFrameFunction("chongwu");
    };
    FightLostFrame.prototype.onEquipClick = function () {
        this.hideWnd();
        ExecuteMainFrameFunction("zhuangbeishangdian");
    };
    FightLostFrame.prototype.onSkillClick = function () {
        this.hideWnd();
        var info = RoleSystem.getInstance().getRecvList();
        if (size_t(info) == 0)
            return;
        var levelList = info["skilllevellist"];
        var wnd = WngMrg.getInstance().getWindow("RoleSkillsSettingFrame");
        wnd.onShowWnd(levelList);
    };
    return FightLostFrame;
}(FightEndBaseFrame));
__reflect(FightLostFrame.prototype, "FightLostFrame");
//# sourceMappingURL=FightLostFrame.js.map
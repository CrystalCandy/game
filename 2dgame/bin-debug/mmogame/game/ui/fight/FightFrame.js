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
var FightFrame = (function (_super) {
    __extends(FightFrame, _super);
    function FightFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/FightLayout.exml"];
        this.wndList = {};
        this.timerList = {};
    };
    FightFrame.prototype.onLoad = function () {
        //this.mElemList = this.mParentWnd.mElemList
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.initSkinElemList();
        this.setFullScreenRaw(true);
        this.mLayoutNode.setLayer(0 /* Bottom */);
        var elemInfo = [
            (_a = {}, _a["name"] = "fight_forceend", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickForceend, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        // this.mElemList["task_wnd"].visible = false
        // this.mElemList["auto_wnd"].visible = false
        // this.mElemList["preview_wnd"].visible = false
        //this.mElemList["msg_wnd"].visible = false
        this.wndList = (_b = {},
            // [opFightResultType.CAMPAGIN]: FightCampaignWindow.newObj(this.mLayoutNode, this),
            _b[opFightResultType.DRAGON] = FightCopyDragonWindow.newObj(this.mLayoutNode, this),
            _b[opFightResultType.CAPTURE] = FightCapttureWindow.newObj(this.mLayoutNode, this),
            _b);
        RegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this);
        RegisterEvent(EventDefine.COMBAT_END, this.onCombatEnd, this);
        var _a, _b;
    };
    FightFrame.prototype.onUnLoad = function () {
        UnRegisterEvent(EventDefine.COMBAT_BEGIN, this.onCombatBegin, this);
        UnRegisterEvent(EventDefine.COMBAT_END, this.onCombatEnd, this);
    };
    FightFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.COMBAT_FIGHT_ROUND_UPDATE, this.onFightRoundUpdate, this);
        // this.mElemList["combat_group"].visible = true
        // this.mElemList["chat_wnd"].visible = true
        this.mLayoutNode.visible = true;
        this.mLayoutNode.moveToBack();
        this.refresh();
        this.checkForceEnd();
        // let tick = function(delay) {
        // 	this.mElemList["fight_forceend"].visible = true
        // }
        // this.timerList["forceend"] = SetTimer(tick, this, 2000, false)
    };
    FightFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.COMBAT_FIGHT_ROUND_UPDATE, this.onFightRoundUpdate, this);
        this.mLayoutNode.visible = false;
        // this.mElemList["combat_group"].visible = false
        // this.mElemList["chat_wnd"].visible = false
        for (var _ in this.timerList) {
            var timer = this.timerList[_];
            KillTimer(timer);
        }
        this.timerList = {};
    };
    FightFrame.prototype.onCombatBegin = function () {
        this.showWnd();
    };
    FightFrame.prototype.onCombatEnd = function () {
        this.hideWnd();
    };
    FightFrame.prototype.refresh = function () {
        this.onFightRoundUpdate(null);
        if (FightSystem.getInstance().isFight() == true) {
            var _a = FightSystem.getInstance().getCurFightType(), fightType = _a[0], _ = _a[1];
            var flag = -1;
            for (var _1 in this.wndList) {
                var fType = tonumber(_1);
                var v = this.wndList[_1];
                if (fType == fightType) {
                    flag = fType; //有战斗中的特殊界面显示
                }
                else {
                    v.hideWnd();
                }
            }
            if (flag != -1) {
                var wnd = this.wndList[flag];
                wnd.showWnd();
            }
            // if (flag < 0) {
            // 	this.refreshNormal(true)
            // } else {
            // 	this.refreshNormal(false)
            // 	let wnd = this.wndList[flag]
            // 	wnd.showWnd()
            // }
        }
        else {
            //this.refreshNormal(true)
        }
    };
    FightFrame.prototype.onFightRoundUpdate = function (args) {
        var _a = FightSystem.getInstance().getCurFightRound(), curRound = _a[0], maxRound = _a[1];
        //捕捉只有一回合
        var _b = FightSystem.getInstance().getCurFightType(), fightType = _b[0], _ = _b[1];
        if (fightType == opFightResultType.CAPTURE) {
            curRound = 1;
            maxRound = 1;
        }
        var batchImage = this.mElemList["fight_round_bam"];
        DrawNumberStringImage(batchImage, "zhanLi_", curRound + "f" + maxRound);
        // batchImage.beginDraw();
        // batchImage.drawNumberString("zhanLi_", curRound + "z" + maxRound);
        // batchImage.endDraw();
        this.checkForceEnd();
    };
    FightFrame.prototype.checkForceEnd = function () {
        //先简单检查跳过规则，具体看禅道
        var _a = FightSystem.getInstance().getCurFightRound(), curRound = _a[0], maxRound = _a[1];
        var _b = FightSystem.getInstance().getCurFightType(), fightType = _b[0], _ = _b[1];
        var check = curRound > 3;
        if (fightType == opFightResultType.PATROL) {
            check = false;
        }
        else if (fightType == opFightResultType.DRAGON) {
        }
        this.mElemList["fight_forceend"].visible = check;
    };
    //////////////////////////////////////////////////////
    FightFrame.prototype.onClickForceend = function (args) {
        FightSystem.getInstance().forceEndFight();
    };
    return FightFrame;
}(BaseWnd));
__reflect(FightFrame.prototype, "FightFrame");
//# sourceMappingURL=FightFrame.js.map
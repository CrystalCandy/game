/*
作者:
    LiRong
    
创建时间：
    2014.01.28(星期三)

意图：
    贵族考试

公共接口：
    
*/
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
var Activity_AnswerQuestion = (function (_super) {
    __extends(Activity_AnswerQuestion, _super);
    function Activity_AnswerQuestion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Activity_AnswerQuestion.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //this.TimeLimit = true
        //RegisterEvent(EventDefine.ACTIVITY_QUESTION_ENTER, this.start, this)
        //RegisterEvent(EventDefine.ACTIVITY_QUESTION_LEAVE, this.stop,this)
        //RegisterEvent(EventDefine.ACTIVITY_QUESTION_STATE, this.onRecvActivityState,this)
    };
    Activity_AnswerQuestion.prototype.onClear = function () {
    };
    Activity_AnswerQuestion.prototype.destory = function () {
        //UnRegisterEvent(EventDefine.ACTIVITY_QUESTION_ENTER, this.start, this)
        //UnRegisterEvent(EventDefine.ACTIVITY_QUESTION_LEAVE, this.stop,this)
    };
    Activity_AnswerQuestion.prototype.onPrepareResource = function () {
    };
    Activity_AnswerQuestion.prototype.requestStart = function () {
        var heroInfo = GetHeroPropertyInfo();
        //if(heroInfo["level"]<20 ){
        //		MsgSystem.AddTagTips(String.format(Localize_cns("FINAL_BOSS_TIPS23"),20))			
        //		return					
        //}
        var message = GetMessage(opCodes.C2G_WORLDQUESTION_ENTER);
        SendGameMessage(message);
    };
    Activity_AnswerQuestion.prototype.requestStop = function () {
        var message = GetMessage(opCodes.C2G_WORLDQUESTION_LEAVE);
        SendGameMessage(message);
    };
    Activity_AnswerQuestion.prototype.onStart = function () {
        //UnRegisterEvent(EventDefine.ACTIVITY_QUESTION_STATE,this.onRecvActivityState,this)
        RegisterEvent(EventDefine.HERO_ENTER_MAP, this.onHeroEnterMap, this);
        PushUIShow(null, ["MainFrame"]);
        StateManager.getInstance().ActiveSubState(state_type.LIVE_ACTIVITY_STATE);
        var wnd = WngMrg.getInstance().getWindow("AnswerQuestionFrame");
        wnd.showWnd();
        wnd = WngMrg.getInstance().getWindow("MainFrame");
        wnd.doCommand("setHeadGroupVisible", false);
    };
    Activity_AnswerQuestion.prototype.onStop = function () {
        if (FightSystem.getInstance().isFight() == true) {
            FightSystem.getInstance().addEndFightHandler(this._Stop, this, null);
        }
        else {
            this._Stop();
        }
    };
    Activity_AnswerQuestion.prototype._Stop = function () {
        UnRegisterEvent(EventDefine.HERO_ENTER_MAP, this.onHeroEnterMap, this);
        //UnRegisterEvent(EventDefine.ACTIVITY_QUESTION_STATE,this.onRecvActivityState,this)
        //this.removeNpc()
        //SceneManager.getInstance().cameraLinkActor(GetHero())
        //SceneManager.getInstance().lookAtCenter( GetHero().getMapXY() )
        PopUIShow();
        StateManager.getInstance().DeactiveSubState(state_type.LIVE_ACTIVITY_STATE);
        var wnd = WngMrg.getInstance().getWindow("MainFrame");
        wnd.doCommand("setHeadGroupVisible", true);
        //WngMrg.getInstance().hideWindow("AnswerQuestionEntryFrame")
    };
    ////////////////////////////////////////////////////////////////////////
    //-进入活动关闭窗口
    Activity_AnswerQuestion.prototype.onHeroEnterMap = function (index) {
        var mapId = MapSystem.getInstance().getMapId();
        if (mapId != 50035) {
            return;
        }
        //this.createNpc()
        GetHero().setCellXY(20, 24);
    };
    return Activity_AnswerQuestion;
}(ActivityBase));
__reflect(Activity_AnswerQuestion.prototype, "Activity_AnswerQuestion");
//# sourceMappingURL=Activity_AnswerQuestion.js.map
// TypeScript file
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
var AnswerQuestionFrame = (function (_super) {
    __extends(AnswerQuestionFrame, _super);
    function AnswerQuestionFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //mChatViewr: UIChatViewer
    AnswerQuestionFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/AnswerQuestionLayout.exml"];
        this.clearQuestion();
        //因为进入活动时候，消息就发来了，有可能窗口还没床架
        RegisterEvent(EventDefine.ACTIVITY_QUESTION, this.onRecvQuestion, this);
        RegisterEvent(EventDefine.ACTIVITY_QUESTION_INFO, this.onRecvPlayerInfo, this);
    };
    AnswerQuestionFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreenRaw(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onLeave, _a),
            (_b = {}, _b["name"] = "btn_double", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onUseDoubleScore, _b),
            (_c = {}, _c["name"] = "btn_helpme", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onUseFollow, _c),
            (_d = {}, _d["name"] = "btn_help", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickHelp, _d),
            (_e = {}, _e["name"] = "chooseATitle", _e["title"] = Localize_cns("CHAT_VOICE_TIPS8"), _e["font"] = "ht_24_lc", _e["scale_image"] = null, _e["color"] = gui.Color.saddlebrown, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = null, _e["messageFlag"] = true, _e),
            (_f = {}, _f["name"] = "chooseBTitle", _f["title"] = Localize_cns("CHAT_VOICE_TIPS8"), _f["font"] = "ht_24_lc", _f["scale_image"] = null, _f["color"] = gui.Color.saddlebrown, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = null, _f["messageFlag"] = true, _f),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["myInfo"].setAlignFlag(gui.Flag.CENTER_CENTER);
        this.mElemList["activityinfo"].setAlignFlag(gui.Flag.CENTER_CENTER);
        //this.mElemList["rdtips"].setAlignFlag(gui.Flag.H_CENTER)
        //this.mChatViewr = UIChatViewer.newObj(this, this.mLayoutNode, "chatviewer", 0, 0, this.mElemList["group_chat"]);
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.onTabSelected, this);
        this.mElemList["checkA"].group = radioGroup;
        this.mElemList["checkA"].value = "A";
        this.mElemList["checkB"].group = radioGroup;
        this.mElemList["checkB"].value = "B";
        this.mLayoutNode.setLayer(0 /* Bottom */);
        this.setCountDown(20);
        var _a, _b, _c, _d, _e, _f;
    };
    AnswerQuestionFrame.prototype.onUnLoad = function () {
    };
    AnswerQuestionFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTIVITY_QUESTION_RESULT, this.onRecvAnswer, this);
        RegisterEvent(EventDefine.ACTIVITY_STATE_LIST, this.onActivityChange, this);
        this.mLayoutNode.visible = true;
        //this.mChatViewr.setVisible(true)
        this.refreshFrame();
        this.updateState();
    };
    AnswerQuestionFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTIVITY_QUESTION_RESULT, this.onRecvAnswer, this);
        UnRegisterEvent(EventDefine.ACTIVITY_STATE_LIST, this.onActivityChange, this);
        this.mLayoutNode.visible = false;
        //this.mChatViewr.setVisible(false)
        this.bStart = false;
        this.clearQuestion();
    };
    ////////////////////////////////////////////////////////////////////////////////////-
    AnswerQuestionFrame.prototype.clearQuestion = function () {
        this.questionIndex = 0; //剩余题目
        this.questionTime = 0;
        this.index = -1; //题目索引
        this.leftAnswer = "";
        this.rightAnswer = "";
        this.correctAnswer = "";
        this.score = 0;
        this.rank = 0;
        this.followTimes = 0;
        this.doubleScoreTimes = 0;
        this.lastIndex = -1; //上次的题目
        this.currentSide = -1; //左边0 右边1
        this.useDoubleScore = false;
        this.useHelpme = false;
        this.killTimer();
    };
    AnswerQuestionFrame.prototype.setCountDown = function (num) {
        var imageBox = this.mElemList["countdown"];
        imageBox.beginDraw();
        imageBox.drawNumberString("dt_daoJiShi", num, 0, 0);
        imageBox.endDraw();
    };
    AnswerQuestionFrame.prototype.startTimer = function () {
        function timeOut(dt) {
            var curTime = GetServerTime();
            var interval = this.questionTime - curTime;
            if (interval < 0) {
                interval = 0;
            }
            this.setCountDown(interval);
            if (interval <= 0) {
                this.killTimer();
            }
        }
        if (!this.timer) {
            this.timer = SetTimer(timeOut, this, 1000, true);
        }
    };
    AnswerQuestionFrame.prototype.killTimer = function () {
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
    };
    AnswerQuestionFrame.prototype.heroRandomMove = function (targetX, targetY) {
        var randomX = MathUtil.random(5) - 3;
        var randomY = MathUtil.random(5) - 3;
        GetHero().wantToGoByCell(targetX + randomX, targetY + randomY); //主角移动
    };
    AnswerQuestionFrame.prototype.setChooseA = function () {
        if (this.currentSide == 0) {
            return;
        }
        this.currentSide = 0;
        this.heroRandomMove(6, 37);
        var message = GetMessage(opCodes.C2G_WORLDQUESTION_ANSWER);
        message.side = this.currentSide;
        SendGameMessage(message); //选择左侧
    };
    AnswerQuestionFrame.prototype.setChooseB = function () {
        if (this.currentSide == 1) {
            return;
        }
        this.currentSide = 1;
        this.heroRandomMove(33, 37);
        var message = GetMessage(opCodes.C2G_WORLDQUESTION_ANSWER);
        message.side = this.currentSide;
        SendGameMessage(message); //选择左侧
    };
    AnswerQuestionFrame.prototype.onNewQuestion = function () {
        this.mElemList["checkA"].selected = (false);
        this.mElemList["checkB"].selected = (false);
        this.startTimer();
        if (this.currentSide != -1) {
            this.heroRandomMove(20, 28);
            this.currentSide = -1;
        }
        this.useDoubleScore = false;
        this.useHelpme = false;
    };
    AnswerQuestionFrame.prototype.refreshFrame = function () {
        this.mElemList["group_question"].visible = (this.index != -1);
        this.mElemList["group_activityinfo"].visible = (this.index == -1);
        //this.mElemList["group_tips"].visible = (this.index == -1)
        this.mElemList["btn_double"].enabled = (this.index != -1);
        this.mElemList["btn_helpme"].enabled = (this.index != -1);
        this.mElemList["checkA"].enabled = (this.index != -1);
        this.mElemList["checkB"].enabled = (this.index != -1);
        if (this.index == -1) {
            this.mElemList["btn_close"].bottom = 235;
            AddRdContent(this.mElemList["activityinfo"], "#HONGDIAN" + Localize_cns("ACTIVITY_TXT1"), "ht_24_cc_stroke", "white");
            this.setCountDown(0);
            return;
        }
        this.mElemList["btn_close"].bottom = 420;
        //题目不一样，刷新
        if (this.lastIndex == -1 || this.lastIndex != this.index) {
            this.onNewQuestion();
        }
        this.lastIndex = this.index;
        var questionConfig = GameConfig.WorldQuestionConfig[this.index];
        var question = "";
        if (questionConfig) {
            question = questionConfig.readme;
        }
        var questr = String.format(Localize_cns("ACTIVITY_QUESTION_TXT10"), this.questionIndex) + "#br" + question;
        AddRdContent(this.mElemList["content"], questr, "ht_24_cc", "ublack");
        this.mElemList["chooseATitle"].text = ("A. " + this.leftAnswer);
        this.mElemList["chooseBTitle"].text = ("B. " + this.rightAnswer);
        //剩余题目
        AddRdContent(this.mElemList["myInfo"], String.format(Localize_cns("ACTIVITY_QUESTION_TXT2"), this.score), "ht_24_cc_stroke", "white");
        this.mElemList["btn_double"].enabled = (this.doubleScoreTimes > 0 && this.useDoubleScore == false);
        this.mElemList["doubleNum"].text = (this.doubleScoreTimes);
        this.mElemList["btn_helpme"].enabled = (this.followTimes > 0 && this.useHelpme == false);
        this.mElemList["helpmeNum"].text = (this.followTimes);
        //if(this.useHelpme ){
        //	this.mElemList["checkA"].enabled = (false)
        //	this.mElemList["checkB"].enabled = (false)
        //}
    };
    ////////////////////////////////////////////////////////////////////////////////////////
    AnswerQuestionFrame.prototype.onTabSelected = function (event) {
        var radioGroup = event.target;
        var radiobtn = radioGroup.selection;
        if (radiobtn.value == "A") {
            this.setChooseA();
        }
        else {
            this.setChooseB();
        }
    };
    AnswerQuestionFrame.prototype.onUseDoubleScore = function (args) {
        var message = GetMessage(opCodes.C2G_WORLDQUESTION_SKILL);
        message.skillToUse = "double";
        SendGameMessage(message); //选择左侧
        MsgSystem.addTagTips(Localize_cns("ACTIVITY_QUESTION_TXT7"));
        this.useDoubleScore = true;
        this.refreshFrame();
    };
    AnswerQuestionFrame.prototype.onUseFollow = function (args) {
        var message = GetMessage(opCodes.C2G_WORLDQUESTION_SKILL);
        message.skillToUse = "follow";
        SendGameMessage(message); //选择左侧
        this.useHelpme = true;
        MsgSystem.addTagTips(Localize_cns("ACTIVITY_QUESTION_TXT8"));
        this.refreshFrame();
        if (this.leftAnswer == this.correctAnswer) {
            this.setChooseA();
        }
        else {
            this.setChooseB();
        }
    };
    ////-退出活动
    AnswerQuestionFrame.prototype.onLeave = function () {
        var t = {
            onDialogCallback: function (result, userData) {
                if (result == true) {
                    var a = GetActivity(ActivityDefine.AnswerQuestion);
                    a.requestStop();
                }
            }
        };
        MsgSystem.confirmDialog(Localize_cns("ACTIVITY_QUESTION_TXT9"), t, null);
    };
    ////////////////////////////////////////////////////////////////////////////////////////
    AnswerQuestionFrame.prototype.onRecvPlayerInfo = function (event) {
        var args = event.msg;
        this.score = args.score;
        this.rank = args.rank;
        this.followTimes = args.followTimes;
        this.doubleScoreTimes = args.doubleScoreTimes;
        this.doCommand("refreshFrame");
    };
    AnswerQuestionFrame.prototype.onRecvQuestion = function (event) {
        var args = event.msg;
        this.questionIndex = args.questionIndex; //剩余题目
        this.questionTime = args.questionTime;
        this.index = args.index;
        this.leftAnswer = args.leftAnswer;
        this.rightAnswer = args.rightAnswer;
        this.correctAnswer = args.correctAnswer;
        this.useDoubleScore = false;
        //this.loopTime = this.loopTime + 1
        this.doCommand("refreshFrame");
    };
    AnswerQuestionFrame.prototype.onRecvAnswer = function (args) {
        var isCorrect = args.msg.isCorrect;
        //0:fail 1:success
        var tips = "";
        if (isCorrect == 0) {
            tips = Localize_cns("ACTIVITY_QUESTION_TXT6") + "+1";
        }
        else {
            var scroeStr = this.useDoubleScore && "+6" || "+3";
            tips = Localize_cns("ACTIVITY_QUESTION_TXT5") + scroeStr;
        }
        MsgSystem.addTagTips(tips);
    };
    AnswerQuestionFrame.prototype.onClickHelp = function (args) {
        var wnd = WngMrg.getInstance().getWindow("RuleDescribeFrame");
        wnd.showWithActivity("AnswerQusetionRule");
    };
    AnswerQuestionFrame.prototype.updateState = function () {
        var timeState = GetActivityTimeState(OrdinaryActivityIndex.DATI);
        if (timeState.state != ActivityTimeState.ONGOING) {
            //this.mRootFrame.SetMessagePass(true)
            this.mElemList["group_block"].touchEnabled = false;
            //this.mElemList["bgTips"].visible = (true)
            this.clearQuestion();
        }
        else {
            this.mElemList["group_block"].touchEnabled = true;
            this.heroRandomMove(20, 28);
            //this.mElemList["bgTips"].visible = (false)
        }
        this.refreshFrame();
        this.bStart = timeState.state == ActivityTimeState.ONGOING;
    };
    AnswerQuestionFrame.prototype.onActivityChange = function (args) {
        var timeState = GetActivityTimeState(OrdinaryActivityIndex.DATI);
        if (timeState.state == ActivityTimeState.FINISHED) {
            if (this.bStart) {
                var t = {
                    onDialogCallback: function (result, userData) {
                        if (result == true) {
                            var a = GetActivity(ActivityDefine.AnswerQuestion);
                            a.requestStop();
                        }
                    }
                };
                MsgSystem.confirmDialog(Localize_cns("ACTIVITY_TXT7"), t, null);
            }
        }
        else if (timeState.state == ActivityTimeState.ONGOING) {
        }
        this.updateState();
    };
    return AnswerQuestionFrame;
}(BaseWnd));
__reflect(AnswerQuestionFrame.prototype, "AnswerQuestionFrame");
//# sourceMappingURL=AnswerQuestionFrame.js.map
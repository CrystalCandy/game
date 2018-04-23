////通用的事件参数定义
//流程参数
////////////////////////////////////////////////////////-
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
var EventArgs = core.EventArgs;
var GameTouchEvent = (function (_super) {
    __extends(GameTouchEvent, _super);
    function GameTouchEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameTouchEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    GameTouchEvent.prototype.init = function (touchEvent) {
        this.touchEvent = touchEvent;
        return this;
    };
    return GameTouchEvent;
}(EventArgs));
__reflect(GameTouchEvent.prototype, "GameTouchEvent");
var PrecedureEvent = (function (_super) {
    __extends(PrecedureEvent, _super);
    function PrecedureEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrecedureEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.state = args[0];
    };
    return PrecedureEvent;
}(EventArgs));
__reflect(PrecedureEvent.prototype, "PrecedureEvent");
//连接事件
var TcpNetEvent = (function (_super) {
    __extends(TcpNetEvent, _super);
    function TcpNetEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TcpNetEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.code = args[0];
        this.dispatcher = args[1];
    };
    return TcpNetEvent;
}(EventArgs));
__reflect(TcpNetEvent.prototype, "TcpNetEvent");
var GameServerTime = (function (_super) {
    __extends(GameServerTime, _super);
    function GameServerTime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameServerTime.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.startTime = args[0];
    };
    return GameServerTime;
}(EventArgs));
__reflect(GameServerTime.prototype, "GameServerTime");
//加载事件
var LoadingEvent = (function (_super) {
    __extends(LoadingEvent, _super);
    function LoadingEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.workQueue = args[0]; //工作队列
    };
    return LoadingEvent;
}(EventArgs));
__reflect(LoadingEvent.prototype, "LoadingEvent");
var LoadingUpdateEvent = (function (_super) {
    __extends(LoadingUpdateEvent, _super);
    function LoadingUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.cur = args[0]; //当前加载数目
        this.all = args[1]; //所有的加载数目
    };
    return LoadingUpdateEvent;
}(EventArgs));
__reflect(LoadingUpdateEvent.prototype, "LoadingUpdateEvent");
var StateEvent = (function (_super) {
    __extends(StateEvent, _super);
    function StateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.stateType = args[0];
    };
    return StateEvent;
}(EventArgs));
__reflect(StateEvent.prototype, "StateEvent");
var GameResultEvent = (function (_super) {
    __extends(GameResultEvent, _super);
    function GameResultEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameResultEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.op = args[0];
        this.result = args[1];
        this.args = args[2];
    };
    return GameResultEvent;
}(EventArgs));
__reflect(GameResultEvent.prototype, "GameResultEvent");
// class IMEEvent extends EventArgs {
//     public initObj(...args: any[]): void {
//         this.left = args[1]
//         this.top = args[2]
//         this.right = args[3]
//         this.bottom = args[4]
//     }
//     //客户端等待（待机）事件
// }
var ClientWaitEvent = (function (_super) {
    __extends(ClientWaitEvent, _super);
    function ClientWaitEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientWaitEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.lockInput = args[0] || false;
        this.text = args[1];
        this.bAlways = args[2] || false;
    };
    return ClientWaitEvent;
}(EventArgs));
__reflect(ClientWaitEvent.prototype, "ClientWaitEvent");
var ActorEvent = (function (_super) {
    __extends(ActorEvent, _super);
    function ActorEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actor = args[0]; //actor
    };
    return ActorEvent;
}(EventArgs));
__reflect(ActorEvent.prototype, "ActorEvent");
var ActorFocusEvent = (function (_super) {
    __extends(ActorFocusEvent, _super);
    function ActorFocusEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorFocusEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actor = args[0]; //actor
        this.times = args[1]; //被点击了几次
    };
    return ActorFocusEvent;
}(ActorEvent));
__reflect(ActorFocusEvent.prototype, "ActorFocusEvent");
var ActorClickListEvent = (function (_super) {
    __extends(ActorClickListEvent, _super);
    function ActorClickListEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorClickListEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actorList = args[0]; //actorList
    };
    return ActorClickListEvent;
}(ActorEvent));
__reflect(ActorClickListEvent.prototype, "ActorClickListEvent");
var ActorUpdateEvent = (function (_super) {
    __extends(ActorUpdateEvent, _super);
    function ActorUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actor = args[0]; //actor
        this.oldProperty = args[1]; //原来的属性
        this.newProperty = args[2]; //新的属性
    };
    return ActorUpdateEvent;
}(ActorEvent));
__reflect(ActorUpdateEvent.prototype, "ActorUpdateEvent");
var ChatRecvChannelMsgEvent = (function (_super) {
    __extends(ChatRecvChannelMsgEvent, _super);
    function ChatRecvChannelMsgEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatRecvChannelMsgEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.packet = args[0];
    };
    return ChatRecvChannelMsgEvent;
}(EventArgs));
__reflect(ChatRecvChannelMsgEvent.prototype, "ChatRecvChannelMsgEvent");
var ChatPreviewMsgUpdateEvent = (function (_super) {
    __extends(ChatPreviewMsgUpdateEvent, _super);
    function ChatPreviewMsgUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatPreviewMsgUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.questionIndex = args[0];
    };
    return ChatPreviewMsgUpdateEvent;
}(EventArgs));
__reflect(ChatPreviewMsgUpdateEvent.prototype, "ChatPreviewMsgUpdateEvent");
var QuestionContent = (function (_super) {
    __extends(QuestionContent, _super);
    function QuestionContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuestionContent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.questionIndex = args[0];
    };
    return QuestionContent;
}(EventArgs));
__reflect(QuestionContent.prototype, "QuestionContent");
//所有魔导仪等级
var AllMagicStoneLevel = (function (_super) {
    __extends(AllMagicStoneLevel, _super);
    function AllMagicStoneLevel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllMagicStoneLevel.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.allLevel = args[0];
    };
    return AllMagicStoneLevel;
}(EventArgs));
__reflect(AllMagicStoneLevel.prototype, "AllMagicStoneLevel");
var CurrentMagicStoneLevel = (function (_super) {
    __extends(CurrentMagicStoneLevel, _super);
    function CurrentMagicStoneLevel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CurrentMagicStoneLevel.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.currentLevel = args[0];
    };
    return CurrentMagicStoneLevel;
}(EventArgs));
__reflect(CurrentMagicStoneLevel.prototype, "CurrentMagicStoneLevel");
//登陆事件
////////////////////////////////////////////////////-
//连接登陆服务器事件
var LoginConnectEvent = (function (_super) {
    __extends(LoginConnectEvent, _super);
    function LoginConnectEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginConnectEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.result = args[0];
        this.dispatcher = args[1];
    };
    return LoginConnectEvent;
}(EventArgs));
__reflect(LoginConnectEvent.prototype, "LoginConnectEvent");
var LoginConnectStateEvent = (function (_super) {
    __extends(LoginConnectStateEvent, _super);
    function LoginConnectStateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginConnectStateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.state = args[0];
        this.dispatcher = args[1];
    };
    return LoginConnectStateEvent;
}(EventArgs));
__reflect(LoginConnectStateEvent.prototype, "LoginConnectStateEvent");
//连接服务器版本号参数
var LoginConnectVersionEvent = (function (_super) {
    __extends(LoginConnectVersionEvent, _super);
    function LoginConnectVersionEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginConnectVersionEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.version = args[0];
        this.dispatcher = args[1];
    };
    return LoginConnectVersionEvent;
}(EventArgs));
__reflect(LoginConnectVersionEvent.prototype, "LoginConnectVersionEvent");
//创建角色事件
var LoginCreateRoleEvent = (function (_super) {
    __extends(LoginCreateRoleEvent, _super);
    function LoginCreateRoleEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginCreateRoleEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.RoleInfo = args[0];
    };
    return LoginCreateRoleEvent;
}(EventArgs));
__reflect(LoginCreateRoleEvent.prototype, "LoginCreateRoleEvent");
//登陆验证码
var LoginVerifyEvent = (function (_super) {
    __extends(LoginVerifyEvent, _super);
    function LoginVerifyEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginVerifyEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.verifyImage = args[0];
    };
    return LoginVerifyEvent;
}(EventArgs));
__reflect(LoginVerifyEvent.prototype, "LoginVerifyEvent");
//系统公告
var MSG_BROADCAST_EVENT = (function (_super) {
    __extends(MSG_BROADCAST_EVENT, _super);
    function MSG_BROADCAST_EVENT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MSG_BROADCAST_EVENT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isborad = args[0];
        this.sysType = args[1];
        this.content = args[2];
    };
    return MSG_BROADCAST_EVENT;
}(EventArgs));
__reflect(MSG_BROADCAST_EVENT.prototype, "MSG_BROADCAST_EVENT");
//任务事件
////////////////////////////////////////////////////-
var TaskEvent = (function (_super) {
    __extends(TaskEvent, _super);
    function TaskEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = args[0];
    };
    return TaskEvent;
}(EventArgs));
__reflect(TaskEvent.prototype, "TaskEvent");
var TaskOptionEvent = (function (_super) {
    __extends(TaskOptionEvent, _super);
    function TaskOptionEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskOptionEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.optionlist = args[0];
        this.npcEntryId = args[1];
        this.optionType = args[2];
    };
    return TaskOptionEvent;
}(EventArgs));
__reflect(TaskOptionEvent.prototype, "TaskOptionEvent");
var TaskUpdateEvent = (function (_super) {
    __extends(TaskUpdateEvent, _super);
    function TaskUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.oldTask = args[0];
        this.newObjTask = args[1];
    };
    return TaskUpdateEvent;
}(EventArgs));
__reflect(TaskUpdateEvent.prototype, "TaskUpdateEvent");
var TaskOpEvent = (function (_super) {
    __extends(TaskOpEvent, _super);
    function TaskOpEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskOpEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = args[0];
        this.op = args[1];
        this.nodeId = args[2];
    };
    return TaskOpEvent;
}(EventArgs));
__reflect(TaskOpEvent.prototype, "TaskOpEvent");
var TaskFightEvent = (function (_super) {
    __extends(TaskFightEvent, _super);
    function TaskFightEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskFightEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = args[0];
        this.npcId = args[1];
        //this.result = args[2]
    };
    return TaskFightEvent;
}(EventArgs));
__reflect(TaskFightEvent.prototype, "TaskFightEvent");
var TaskGuideEvent = (function (_super) {
    __extends(TaskGuideEvent, _super);
    function TaskGuideEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskGuideEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.linkStr = args[0];
    };
    return TaskGuideEvent;
}(EventArgs));
__reflect(TaskGuideEvent.prototype, "TaskGuideEvent");
var TaskDialogEvent = (function (_super) {
    __extends(TaskDialogEvent, _super);
    function TaskDialogEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskDialogEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = args[0];
    };
    return TaskDialogEvent;
}(EventArgs));
__reflect(TaskDialogEvent.prototype, "TaskDialogEvent");
//战斗事件
////////////////////////////////////////////////////
//战斗成员
var CombatFighterEvent = (function (_super) {
    __extends(CombatFighterEvent, _super);
    function CombatFighterEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatFighterEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = args[0];
    };
    return CombatFighterEvent;
}(EventArgs));
__reflect(CombatFighterEvent.prototype, "CombatFighterEvent");
//战斗成员列表
var CombatFighterAddEvent = (function (_super) {
    __extends(CombatFighterAddEvent, _super);
    function CombatFighterAddEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatFighterAddEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fighterList = args[0];
    };
    return CombatFighterAddEvent;
}(EventArgs));
__reflect(CombatFighterAddEvent.prototype, "CombatFighterAddEvent");
//战斗成员创建
var CombatFighterCreateEvent = (function (_super) {
    __extends(CombatFighterCreateEvent, _super);
    function CombatFighterCreateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatFighterCreateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = args[0];
        this.bout = args[1];
    };
    return CombatFighterCreateEvent;
}(EventArgs));
__reflect(CombatFighterCreateEvent.prototype, "CombatFighterCreateEvent");
//战斗表演结果
var CombatResultEvent = (function (_super) {
    __extends(CombatResultEvent, _super);
    function CombatResultEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatResultEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.result = args[0];
        //this.resultId		= args[0]
    };
    return CombatResultEvent;
}(EventArgs));
__reflect(CombatResultEvent.prototype, "CombatResultEvent");
//战斗倒计时
var CombatClockEvent = (function (_super) {
    __extends(CombatClockEvent, _super);
    function CombatClockEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatClockEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clockTime = args[0];
    };
    return CombatClockEvent;
}(EventArgs));
__reflect(CombatClockEvent.prototype, "CombatClockEvent");
//战斗hp, mp更新
var CombatHPMPUpdateEvent = (function (_super) {
    __extends(CombatHPMPUpdateEvent, _super);
    function CombatHPMPUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatHPMPUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.combatId = args[0];
        this.cur_hp = args[1];
        this.total_hp = args[2];
        this.cur_mp = args[3];
        this.total_mp = args[4];
        this.cur_rp = args[5];
        this.total_rp = args[6];
    };
    return CombatHPMPUpdateEvent;
}(EventArgs));
__reflect(CombatHPMPUpdateEvent.prototype, "CombatHPMPUpdateEvent");
var CombatRoleInfoEvent = (function (_super) {
    __extends(CombatRoleInfoEvent, _super);
    function CombatRoleInfoEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatRoleInfoEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.roleId = args[0];
        this.updateIndex = args[1]; //"mp"
    };
    return CombatRoleInfoEvent;
}(EventArgs));
__reflect(CombatRoleInfoEvent.prototype, "CombatRoleInfoEvent");
var CombatFightInstructEvent = (function (_super) {
    __extends(CombatFightInstructEvent, _super);
    function CombatFightInstructEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatFightInstructEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.instructList = args[0];
    };
    return CombatFightInstructEvent;
}(EventArgs));
__reflect(CombatFightInstructEvent.prototype, "CombatFightInstructEvent");
var CombatEndEvent = (function (_super) {
    __extends(CombatEndEvent, _super);
    function CombatEndEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatEndEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.param = args[0] || null;
        this.callBack = args[1] || null;
        this.obj = args[2] || null;
    };
    return CombatEndEvent;
}(EventArgs));
__reflect(CombatEndEvent.prototype, "CombatEndEvent");
var CombatEvent = (function (_super) {
    __extends(CombatEvent, _super);
    function CombatEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightType = args[0];
        this.winResult = args[1];
    };
    return CombatEvent;
}(EventArgs));
__reflect(CombatEvent.prototype, "CombatEvent");
var CombatFightSkillEvent = (function (_super) {
    __extends(CombatFightSkillEvent, _super);
    function CombatFightSkillEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatFightSkillEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillId = args[0];
        this.fightActor = args[1];
    };
    return CombatFightSkillEvent;
}(EventArgs));
__reflect(CombatFightSkillEvent.prototype, "CombatFightSkillEvent");
var CombatFreezeEvent = (function (_super) {
    __extends(CombatFreezeEvent, _super);
    function CombatFreezeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatFreezeEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isFreeze = args[0];
        this.windowIndex = args[1] || 0;
    };
    return CombatFreezeEvent;
}(EventArgs));
__reflect(CombatFreezeEvent.prototype, "CombatFreezeEvent");
var CombatFightRpEvent = (function (_super) {
    __extends(CombatFightRpEvent, _super);
    function CombatFightRpEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatFightRpEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.button = args[0]; //指定按钮
        this.skillId = args[1]; //技能ID
    };
    return CombatFightRpEvent;
}(EventArgs));
__reflect(CombatFightRpEvent.prototype, "CombatFightRpEvent");
var FighterBuffEvent = (function (_super) {
    __extends(FighterBuffEvent, _super);
    function FighterBuffEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FighterBuffEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actorId = args[0];
    };
    return FighterBuffEvent;
}(EventArgs));
__reflect(FighterBuffEvent.prototype, "FighterBuffEvent");
var FunnalPointEvent = (function (_super) {
    __extends(FunnalPointEvent, _super);
    function FunnalPointEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunnalPointEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillId = args[0];
        this.leftPoint = args[1];
        this.cooldownTime = args[2];
    };
    return FunnalPointEvent;
}(EventArgs));
__reflect(FunnalPointEvent.prototype, "FunnalPointEvent");
var FunnalCDEvent = (function (_super) {
    __extends(FunnalCDEvent, _super);
    function FunnalCDEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunnalCDEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.side = args[0];
        this.cdTime = args[1]; //战斗中的时间戳（增加的CD，包括技能和公共时间）
    };
    return FunnalCDEvent;
}(EventArgs));
__reflect(FunnalCDEvent.prototype, "FunnalCDEvent");
// class AssSkillEvent extends EventArgs {
//     cdTime
//     public initObj(...args: any[]): void {
//         this.cdTime = args[0]				//战斗中的援助技能时间戳（增加的公共CD时间）
//     }
// }
var CombinedSkillEvent = (function (_super) {
    __extends(CombinedSkillEvent, _super);
    function CombinedSkillEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombinedSkillEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.queueType = args[0];
    };
    return CombinedSkillEvent;
}(EventArgs));
__reflect(CombinedSkillEvent.prototype, "CombinedSkillEvent");
var FightSequenceEvent = (function (_super) {
    __extends(FightSequenceEvent, _super);
    function FightSequenceEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightSequenceEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.sequence = args[0];
    };
    return FightSequenceEvent;
}(EventArgs));
__reflect(FightSequenceEvent.prototype, "FightSequenceEvent");
//关卡事件
var CampaignEvent = (function (_super) {
    __extends(CampaignEvent, _super);
    function CampaignEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CampaignEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.campaignId = args[0];
    };
    return CampaignEvent;
}(EventArgs));
__reflect(CampaignEvent.prototype, "CampaignEvent");
var CampaignFirstPassEvent = (function (_super) {
    __extends(CampaignFirstPassEvent, _super);
    function CampaignFirstPassEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CampaignFirstPassEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.campaignId = args[0];
        this.name = args[1];
        this.videoId = args[2];
        this.roleId = args[3];
    };
    return CampaignFirstPassEvent;
}(EventArgs));
__reflect(CampaignFirstPassEvent.prototype, "CampaignFirstPassEvent");
// UI 显示事件
var UIShowEvent = (function (_super) {
    __extends(UIShowEvent, _super);
    function UIShowEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIShowEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.window = args[0];
    };
    return UIShowEvent;
}(EventArgs));
__reflect(UIShowEvent.prototype, "UIShowEvent");
// UI 隐藏事件
var UIHideEvent = (function (_super) {
    __extends(UIHideEvent, _super);
    function UIHideEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIHideEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.window = args[0];
    };
    return UIHideEvent;
}(EventArgs));
__reflect(UIHideEvent.prototype, "UIHideEvent");
// 点击地图事件
var MapClickEvent = (function (_super) {
    __extends(MapClickEvent, _super);
    function MapClickEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapClickEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.x = args[0];
        this.y = args[1];
    };
    return MapClickEvent;
}(EventArgs));
__reflect(MapClickEvent.prototype, "MapClickEvent");
// buff事件
var BuffUpdateEvent = (function (_super) {
    __extends(BuffUpdateEvent, _super);
    function BuffUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuffUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.actor = args[0]; //buff对象
        this.buff = args[1];
    };
    return BuffUpdateEvent;
}(EventArgs));
__reflect(BuffUpdateEvent.prototype, "BuffUpdateEvent");
//宠物事件
var PetUpdateEvent = (function (_super) {
    __extends(PetUpdateEvent, _super);
    function PetUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petId = args[0];
        this.newInfo = args[1];
        this.oldInfo = args[2];
    };
    return PetUpdateEvent;
}(EventArgs));
__reflect(PetUpdateEvent.prototype, "PetUpdateEvent");
//宠物互动次数事件
var PetInteractCountEvent = (function (_super) {
    __extends(PetInteractCountEvent, _super);
    function PetInteractCountEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetInteractCountEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.interactCount = args[0];
        this.interval = args[1];
        this.interactEvent = args[2];
    };
    return PetInteractCountEvent;
}(EventArgs));
__reflect(PetInteractCountEvent.prototype, "PetInteractCountEvent");
var PetPushEvent = (function (_super) {
    __extends(PetPushEvent, _super);
    function PetPushEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetPushEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petEntry = args[0];
        this.eventId = args[1];
    };
    return PetPushEvent;
}(EventArgs));
__reflect(PetPushEvent.prototype, "PetPushEvent");
var InteractionCost = (function (_super) {
    __extends(InteractionCost, _super);
    function InteractionCost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InteractionCost.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.cost = args[0];
    };
    return InteractionCost;
}(EventArgs));
__reflect(InteractionCost.prototype, "InteractionCost");
var PetActiveInfo = (function (_super) {
    __extends(PetActiveInfo, _super);
    function PetActiveInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetActiveInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petActiveInfo = args[0];
    };
    return PetActiveInfo;
}(EventArgs));
__reflect(PetActiveInfo.prototype, "PetActiveInfo");
var PetAwakeSuccess = (function (_super) {
    __extends(PetAwakeSuccess, _super);
    function PetAwakeSuccess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetAwakeSuccess.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petEntry = args[0];
    };
    return PetAwakeSuccess;
}(EventArgs));
__reflect(PetAwakeSuccess.prototype, "PetAwakeSuccess");
var PetCombatForceToShow = (function (_super) {
    __extends(PetCombatForceToShow, _super);
    function PetCombatForceToShow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetCombatForceToShow.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petEntry = args[0];
        this.delta = args[1];
    };
    return PetCombatForceToShow;
}(EventArgs));
__reflect(PetCombatForceToShow.prototype, "PetCombatForceToShow");
//限时召集部下
var CallPetInTimeInfo = (function (_super) {
    __extends(CallPetInTimeInfo, _super);
    function CallPetInTimeInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CallPetInTimeInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petList = args[0];
    };
    return CallPetInTimeInfo;
}(EventArgs));
__reflect(CallPetInTimeInfo.prototype, "CallPetInTimeInfo");
//宠物互动事件id
var PetInteractEventIdEvent = (function (_super) {
    __extends(PetInteractEventIdEvent, _super);
    function PetInteractEventIdEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetInteractEventIdEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.eventId = args[0];
        this.itemEntryId = args[1];
    };
    return PetInteractEventIdEvent;
}(EventArgs));
__reflect(PetInteractEventIdEvent.prototype, "PetInteractEventIdEvent");
var PetIntimateEventIdEvent = (function (_super) {
    __extends(PetIntimateEventIdEvent, _super);
    function PetIntimateEventIdEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetIntimateEventIdEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.eventId = args[0];
    };
    return PetIntimateEventIdEvent;
}(EventArgs));
__reflect(PetIntimateEventIdEvent.prototype, "PetIntimateEventIdEvent");
//宠物惊喜奖励
var PetSurpriseEvent = (function (_super) {
    __extends(PetSurpriseEvent, _super);
    function PetSurpriseEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetSurpriseEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petEntry = args[0];
    };
    return PetSurpriseEvent;
}(EventArgs));
__reflect(PetSurpriseEvent.prototype, "PetSurpriseEvent");
//装备变换事件
var PetEquipChangedEvent = (function (_super) {
    __extends(PetEquipChangedEvent, _super);
    function PetEquipChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetEquipChangedEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petEntry = args[0];
    };
    return PetEquipChangedEvent;
}(EventArgs));
__reflect(PetEquipChangedEvent.prototype, "PetEquipChangedEvent");
//获取到可邀请宠物列表事件
var PetInviteListEvent = (function (_super) {
    __extends(PetInviteListEvent, _super);
    function PetInviteListEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetInviteListEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inviteList = args[0];
    };
    return PetInviteListEvent;
}(EventArgs));
__reflect(PetInviteListEvent.prototype, "PetInviteListEvent");
//突发事件
var PetBreakOutEvent = (function (_super) {
    __extends(PetBreakOutEvent, _super);
    function PetBreakOutEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetBreakOutEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petEntry = args[0];
        this.eventData = args[1];
    };
    return PetBreakOutEvent;
}(EventArgs));
__reflect(PetBreakOutEvent.prototype, "PetBreakOutEvent");
var PetCollectPrizeInfo = (function (_super) {
    __extends(PetCollectPrizeInfo, _super);
    function PetCollectPrizeInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetCollectPrizeInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.prize = args[0];
    };
    return PetCollectPrizeInfo;
}(EventArgs));
__reflect(PetCollectPrizeInfo.prototype, "PetCollectPrizeInfo");
var PetHoop = (function (_super) {
    __extends(PetHoop, _super);
    function PetHoop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetHoop.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.prizeList = args[0];
        this.discount = args[1];
        this.breakLevel = args[2];
    };
    return PetHoop;
}(EventArgs));
__reflect(PetHoop.prototype, "PetHoop");
//获取抽奖结果
var PetQuickRecruitPrizeEvent = (function (_super) {
    __extends(PetQuickRecruitPrizeEvent, _super);
    function PetQuickRecruitPrizeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetQuickRecruitPrizeEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.prizeList = args[0];
    };
    return PetQuickRecruitPrizeEvent;
}(EventArgs));
__reflect(PetQuickRecruitPrizeEvent.prototype, "PetQuickRecruitPrizeEvent");
//竞技场第一名查询结果
var CHAMPION_FIRST_RESULT = (function (_super) {
    __extends(CHAMPION_FIRST_RESULT, _super);
    function CHAMPION_FIRST_RESULT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHAMPION_FIRST_RESULT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isFirst = args[0];
    };
    return CHAMPION_FIRST_RESULT;
}(EventArgs));
__reflect(CHAMPION_FIRST_RESULT.prototype, "CHAMPION_FIRST_RESULT");
//比武第一名查询结果
var WUDOU_FIRST_RESULT = (function (_super) {
    __extends(WUDOU_FIRST_RESULT, _super);
    function WUDOU_FIRST_RESULT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WUDOU_FIRST_RESULT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isFirst = args[0];
    };
    return WUDOU_FIRST_RESULT;
}(EventArgs));
__reflect(WUDOU_FIRST_RESULT.prototype, "WUDOU_FIRST_RESULT");
//指引事件
var GuideActivateButtonEvent = (function (_super) {
    __extends(GuideActivateButtonEvent, _super);
    function GuideActivateButtonEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideActivateButtonEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.funcIndex = args[0];
    };
    return GuideActivateButtonEvent;
}(EventArgs));
__reflect(GuideActivateButtonEvent.prototype, "GuideActivateButtonEvent");
var GuideFuncFinishEvent = (function (_super) {
    __extends(GuideFuncFinishEvent, _super);
    function GuideFuncFinishEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuideFuncFinishEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.funcList = args[0];
    };
    return GuideFuncFinishEvent;
}(EventArgs));
__reflect(GuideFuncFinishEvent.prototype, "GuideFuncFinishEvent");
//自动行动事
var AutoFindWayEvent = (function (_super) {
    __extends(AutoFindWayEvent, _super);
    function AutoFindWayEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoFindWayEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var param = args[0];
        this.actionType = param[1];
        this.target = param[2];
        this.taskId = param[3];
    };
    return AutoFindWayEvent;
}(EventArgs));
__reflect(AutoFindWayEvent.prototype, "AutoFindWayEvent");
// 金钱更新
var TradeEvent = (function (_super) {
    __extends(TradeEvent, _super);
    function TradeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TradeEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.status = args[0];
        this.targetId = args[1];
        this.money = args[2];
        this.name = args[3];
        this.level = args[4];
    };
    return TradeEvent;
}(EventArgs));
__reflect(TradeEvent.prototype, "TradeEvent");
var MessageMoveEvent = (function (_super) {
    __extends(MessageMoveEvent, _super);
    function MessageMoveEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageMoveEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.Id = args[0]; //id
        this.Type = args[1]; //类型
        this.CellX = args[2]; //类型
        this.CellY = args[3]; //类型
    };
    return MessageMoveEvent;
}(EventArgs));
__reflect(MessageMoveEvent.prototype, "MessageMoveEvent");
// class MouseEvent extends EventArgs {
//     x
//     y
//     public initObj(...args: any[]): void {
//         this.x = args[0]
//         this.y = args[1]
//     }
// }
//////////////////-Friend//////////////////////////////////////////
var RecieveMessageEvent = (function (_super) {
    __extends(RecieveMessageEvent, _super);
    function RecieveMessageEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecieveMessageEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friendId = args[0];
    };
    return RecieveMessageEvent;
}(EventArgs));
__reflect(RecieveMessageEvent.prototype, "RecieveMessageEvent");
var FriendOnOffLineEvent = (function (_super) {
    __extends(FriendOnOffLineEvent, _super);
    function FriendOnOffLineEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FriendOnOffLineEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.friendId = args[0];
        this.online = args[1];
    };
    return FriendOnOffLineEvent;
}(EventArgs));
__reflect(FriendOnOffLineEvent.prototype, "FriendOnOffLineEvent");
var MessageComeEvent = (function (_super) {
    __extends(MessageComeEvent, _super);
    function MessageComeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageComeEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.messageInfo = args[0];
    };
    return MessageComeEvent;
}(EventArgs));
__reflect(MessageComeEvent.prototype, "MessageComeEvent");
var SearchPlayerInfoEvent = (function (_super) {
    __extends(SearchPlayerInfoEvent, _super);
    function SearchPlayerInfoEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchPlayerInfoEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerInfo = args[0];
        this.sendType = args[1];
    };
    return SearchPlayerInfoEvent;
}(EventArgs));
__reflect(SearchPlayerInfoEvent.prototype, "SearchPlayerInfoEvent");
var ApplyToFriendInfoEvent = (function (_super) {
    __extends(ApplyToFriendInfoEvent, _super);
    function ApplyToFriendInfoEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplyToFriendInfoEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerInfo = args[0];
    };
    return ApplyToFriendInfoEvent;
}(EventArgs));
__reflect(ApplyToFriendInfoEvent.prototype, "ApplyToFriendInfoEvent");
//好友推荐
var RecommendFriendEvent = (function (_super) {
    __extends(RecommendFriendEvent, _super);
    function RecommendFriendEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecommendFriendEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.recommendList = args[0];
    };
    return RecommendFriendEvent;
}(EventArgs));
__reflect(RecommendFriendEvent.prototype, "RecommendFriendEvent");
var SkillResultEvent = (function (_super) {
    __extends(SkillResultEvent, _super);
    function SkillResultEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkillResultEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillId = args[0];
        this.result = args[1];
    };
    return SkillResultEvent;
}(EventArgs));
__reflect(SkillResultEvent.prototype, "SkillResultEvent");
var SkillListInfo = (function (_super) {
    __extends(SkillListInfo, _super);
    function SkillListInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkillListInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillList = args[0];
    };
    return SkillListInfo;
}(EventArgs));
__reflect(SkillListInfo.prototype, "SkillListInfo");
//播放电影
var MovieEvent = (function (_super) {
    __extends(MovieEvent, _super);
    function MovieEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MovieEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.movieName = args[0];
    };
    return MovieEvent;
}(EventArgs));
__reflect(MovieEvent.prototype, "MovieEvent");
//竞技场 最高排名
var ChampionTopRankEvent = (function (_super) {
    __extends(ChampionTopRankEvent, _super);
    function ChampionTopRankEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionTopRankEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.enemyList = args[0];
    };
    return ChampionTopRankEvent;
}(EventArgs));
__reflect(ChampionTopRankEvent.prototype, "ChampionTopRankEvent");
//竞技场 刷新信息
var ChampionRefreshEvent = (function (_super) {
    __extends(ChampionRefreshEvent, _super);
    function ChampionRefreshEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionRefreshEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.force = args[0]; //战力
        this.rank = args[1]; //名次
        this.times = args[2]; //剩下多少次
        this.maxTimes = args[3]; //最多多少次
        this.time = args[4]; //多长时间后可以再挑战
        this.enemyList = args[5]; //几个对手
        this.topList = args[6]; //几个对手
    };
    return ChampionRefreshEvent;
}(EventArgs));
__reflect(ChampionRefreshEvent.prototype, "ChampionRefreshEvent");
//竞技场 晶石 刷新信息
var ChampionRefreshExEvent = (function (_super) {
    __extends(ChampionRefreshExEvent, _super);
    function ChampionRefreshExEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionRefreshExEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.times = args[0]; //剩下多少次
        this.maxTimes = args[1]; //最多多少次
        this.time = args[2]; //多长时间后可以再挑战
    };
    return ChampionRefreshExEvent;
}(EventArgs));
__reflect(ChampionRefreshExEvent.prototype, "ChampionRefreshExEvent");
//竞技场对战记录
var ChampionRecordEvent = (function (_super) {
    __extends(ChampionRecordEvent, _super);
    function ChampionRecordEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionRecordEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.championRecordList = args;
    };
    return ChampionRecordEvent;
}(EventArgs));
__reflect(ChampionRecordEvent.prototype, "ChampionRecordEvent");
//出战队列
var BattleQueueEvent = (function (_super) {
    __extends(BattleQueueEvent, _super);
    function BattleQueueEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BattleQueueEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.queueType = args[0]; //战力
        //BattleQueueType =
        //{
        //	Campaign : 1, 				//关卡战斗
        //	Champion : 2, 				//竞技场进攻阵型
        //	ChampionDefence : 3, 	//竞技场防守阵型
        //	DailyOne 		: 4, 			//日常一玩法
        //	DailyTwo 		: 5,			//日常二玩法	
        //	DailyThree 	: 6,			//日常三玩法
        //	DailyFour 	: 7,			//日常四玩法
        //}	
        this.queue = args[1]; //队列{1,1,1,1,1,1}
    };
    return BattleQueueEvent;
}(EventArgs));
__reflect(BattleQueueEvent.prototype, "BattleQueueEvent");
//关卡挑战胜利
// class BattleCampaignWinEvent extends EventArgs {
//     fightType
//     campaignId
//     starLevel
//     exp
//     money
//     petExp
//     itemList
//     public initObj(...args: any[]): void {
//         this.fightType = opFightType.FIGHT_TYPE_COMMON
//         this.campaignId = args[0]						//关卡ID
//         this.starLevel = args[1]						//星级
//         this.exp = args[2]									//经验
//         this.money = args[3]                //金钱
//         this.petExp = args[4]               //宠物经验
//         let itemList = args[5] //物品列表	{[entryId] : itemCount}	
//         this.itemList = {}
//         for (let i in itemList) {
//             let v = itemList[i]
//             this.itemList[i] = v
//         }
//     }
// }
// //关卡场挑战失败
// class BattleCampaignLostEvent extends EventArgs {
//     fightType
//     public initObj(...args: any[]): void {
//         //this.fightType	=	args[0]
//         this.fightType = opFightType.FIGHT_TYPE_COMMON
//     }
// }
//竞技场挑战胜利
// class BattleChampionWinEvent extends EventArgs {
//     fightType
//     public initObj(...args: any[]): void {
//         //this.fightType	=	args[0]
//         this.fightType = opFightType.FIGHT_TYPE_CHAMPION
//     }
// }
// //竞技场挑战失败
// class BattleChampionLostEvent extends EventArgs {
//     fightType
//     public initObj(...args: any[]): void {
//         //this.fightType	=	args[0]
//         this.fightType = opFightType.FIGHT_TYPE_CHAMPION
//     }
// }
//排行榜
var RankListEvent = (function (_super) {
    __extends(RankListEvent, _super);
    function RankListEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankListEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.ranktype = args[0];
        this.ranklist = args[1];
        this.firstAppearData = args[2];
    };
    return RankListEvent;
}(EventArgs));
__reflect(RankListEvent.prototype, "RankListEvent");
//混沌世界副本列表
// class RobberUpdateRoomListEvent extends EventArgs {
//      roomNum
//     roomList
//     public initObj(...args: any[]): void {
//         this.roomNum = args[0]
//         this.roomList = args[1]
//     }
// }
//混沌世界BOSS时间刷新
var RobberStatueUpdateBossRefreshTimeEvent = (function (_super) {
    __extends(RobberStatueUpdateBossRefreshTimeEvent, _super);
    function RobberStatueUpdateBossRefreshTimeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RobberStatueUpdateBossRefreshTimeEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.hardRefreshTime = args[0];
        this.bossRefreshTime = args[1];
    };
    return RobberStatueUpdateBossRefreshTimeEvent;
}(EventArgs));
__reflect(RobberStatueUpdateBossRefreshTimeEvent.prototype, "RobberStatueUpdateBossRefreshTimeEvent");
//混沌世界更新BUFF
var RobberStatueUpdateStatusEvent = (function (_super) {
    __extends(RobberStatueUpdateStatusEvent, _super);
    function RobberStatueUpdateStatusEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RobberStatueUpdateStatusEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.buffName = args[0];
        this.buffLeftTime = args[1];
    };
    return RobberStatueUpdateStatusEvent;
}(EventArgs));
__reflect(RobberStatueUpdateStatusEvent.prototype, "RobberStatueUpdateStatusEvent");
//混沌世界移除BUFF
var RobberStatueRemoveStatusEvent = (function (_super) {
    __extends(RobberStatueRemoveStatusEvent, _super);
    function RobberStatueRemoveStatusEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RobberStatueRemoveStatusEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.buffName = args[0];
    };
    return RobberStatueRemoveStatusEvent;
}(EventArgs));
__reflect(RobberStatueRemoveStatusEvent.prototype, "RobberStatueRemoveStatusEvent");
//全服首通关卡名单
var FirstPassListEvent = (function (_super) {
    __extends(FirstPassListEvent, _super);
    function FirstPassListEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirstPassListEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.firstPasslist = args[0];
    };
    return FirstPassListEvent;
}(EventArgs));
__reflect(FirstPassListEvent.prototype, "FirstPassListEvent");
// class RootWindowDriveEvent extends EventArgs {
//     public initObj(...args: any[]): void {
//         this.args = args[0]
//     }
// }
// //拖动结束
// class SliderEventEnd extends EventArgs {
//     public initObj(...args: any[]): void {
//         this.windowName = args[0]
//         this.percent = args[1]
//     }
// }
//收到申请入队 
var TeamAppleUpdateEvent = (function (_super) {
    __extends(TeamAppleUpdateEvent, _super);
    function TeamAppleUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamAppleUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.applyInfo = args[0];
        //TLog.Debug("TeamAppleUpdateEvent.init")
        //TLog.Debug_r(args[0])
    };
    return TeamAppleUpdateEvent;
}(EventArgs));
__reflect(TeamAppleUpdateEvent.prototype, "TeamAppleUpdateEvent");
// class PetIconButtonEvent extends EventArgs {
//     public initObj(...args: any[]): void {
//         this.visible = args[0]
//     }
// }
// class GetMessageEvent extends EventArgs {
//     args
//     public initObj(...args: any[]): void {
//         this.args = args[0]
//     }
// }
// class wndUpdateBtnTipsEvent extends EventArgs {
//     public initObj(...args: any[]): void {
//         this.args = args[0]
//     }
// }
var IdAndInfoEvent = (function (_super) {
    __extends(IdAndInfoEvent, _super);
    function IdAndInfoEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdAndInfoEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = args[0];
        this.info = args[1];
    };
    return IdAndInfoEvent;
}(EventArgs));
__reflect(IdAndInfoEvent.prototype, "IdAndInfoEvent");
// }
//刺激点信息
var ExciteDateEvent = (function (_super) {
    __extends(ExciteDateEvent, _super);
    function ExciteDateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExciteDateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.exciteType = args[0];
        this.exciteData = args[1];
    };
    return ExciteDateEvent;
}(EventArgs));
__reflect(ExciteDateEvent.prototype, "ExciteDateEvent");
//宠物上下阵
var PetEmbattleStateEvent = (function (_super) {
    __extends(PetEmbattleStateEvent, _super);
    function PetEmbattleStateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetEmbattleStateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.petEntry = args[0];
        this.petState = args[1];
    };
    return PetEmbattleStateEvent;
}(EventArgs));
__reflect(PetEmbattleStateEvent.prototype, "PetEmbattleStateEvent");
//队伍更新信息
var TeamInfoUpdateEvent = (function (_super) {
    __extends(TeamInfoUpdateEvent, _super);
    function TeamInfoUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamInfoUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.teamInfo = args[0];
    };
    return TeamInfoUpdateEvent;
}(EventArgs));
__reflect(TeamInfoUpdateEvent.prototype, "TeamInfoUpdateEvent");
//队伍邀请提示红点信息，用以信息的特殊化处理，以handler为标识
var TeamInviteInfo = (function (_super) {
    __extends(TeamInviteInfo, _super);
    function TeamInviteInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamInviteInfo.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.cbObj = args[0];
        this.inviteInfo = args[1];
    };
    return TeamInviteInfo;
}(EventArgs));
__reflect(TeamInviteInfo.prototype, "TeamInviteInfo");
//新手部下上阵
var TeamMemberNoticeEvent = (function (_super) {
    __extends(TeamMemberNoticeEvent, _super);
    function TeamMemberNoticeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamMemberNoticeEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.key = args[0];
        this.value = args[1];
    };
    return TeamMemberNoticeEvent;
}(EventArgs));
__reflect(TeamMemberNoticeEvent.prototype, "TeamMemberNoticeEvent");
var TeamMemberLeaveEvent = (function (_super) {
    __extends(TeamMemberLeaveEvent, _super);
    function TeamMemberLeaveEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamMemberLeaveEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerID = args[0];
    };
    return TeamMemberLeaveEvent;
}(EventArgs));
__reflect(TeamMemberLeaveEvent.prototype, "TeamMemberLeaveEvent");
//关卡首通消息EXCITE_SERVER_FIRST_CAMPAIGN
var ExciteServerFirstCampaignEvent = (function (_super) {
    __extends(ExciteServerFirstCampaignEvent, _super);
    function ExciteServerFirstCampaignEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExciteServerFirstCampaignEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.recordStr = args[0];
    };
    return ExciteServerFirstCampaignEvent;
}(EventArgs));
__reflect(ExciteServerFirstCampaignEvent.prototype, "ExciteServerFirstCampaignEvent");
//招募动画事件  true 开始  false 结束
var GetPetAnimationEvent = (function (_super) {
    __extends(GetPetAnimationEvent, _super);
    function GetPetAnimationEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetPetAnimationEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.animationState = args[0];
    };
    return GetPetAnimationEvent;
}(EventArgs));
__reflect(GetPetAnimationEvent.prototype, "GetPetAnimationEvent");
////仇人所在位置
// class RobberKillPosEvent extends EventArgs {
//     mapId
//     index
//     public initObj(...args: any[]): void {
//         this.mapId = args[0]
//         this.index = args[1]
//     }
// }
////是否可以进入
// class RobberTestEnter extends EventArgs {
//     public initObj(...args: any[]): void {
//         this.isTeam = args[0]
//     }
// }
// ////进入模拟玩法
// class RoleEnterSpace extends EventArgs {
//     public initObj(...args: any[]): void {
//         this.space = args[0]
//     }
// }
////窗口动画事件
var WindowAnimationStateEvent = (function (_super) {
    __extends(WindowAnimationStateEvent, _super);
    function WindowAnimationStateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowAnimationStateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.windowName = args[0];
        this.animationState = args[1];
    };
    return WindowAnimationStateEvent;
}(EventArgs));
__reflect(WindowAnimationStateEvent.prototype, "WindowAnimationStateEvent");
////天空之塔邀请列表返回事件
var SkytowerInviteListEvent = (function (_super) {
    __extends(SkytowerInviteListEvent, _super);
    function SkytowerInviteListEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkytowerInviteListEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inviteList = args[0];
        this.actStatus = args[1] || ConfigTeamStatus.ACTIVITY_1; //默认为天空之塔的邀请列表
    };
    return SkytowerInviteListEvent;
}(EventArgs));
__reflect(SkytowerInviteListEvent.prototype, "SkytowerInviteListEvent");
////天空之塔奖励选择事件
var SkytowerPrizeChooseEvent = (function (_super) {
    __extends(SkytowerPrizeChooseEvent, _super);
    function SkytowerPrizeChooseEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkytowerPrizeChooseEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.saveChooseType = args[0];
    };
    return SkytowerPrizeChooseEvent;
}(EventArgs));
__reflect(SkytowerPrizeChooseEvent.prototype, "SkytowerPrizeChooseEvent");
//- 语音包事件 ////-
var ChatVoiceRecordEvent = (function (_super) {
    __extends(ChatVoiceRecordEvent, _super);
    function ChatVoiceRecordEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatVoiceRecordEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.channel = args[0];
        this.id = args[1];
        this.name = args[2];
        this.body = args[3];
        this.size = args[4];
        this.buf = args[5];
        this.recordTime = args[6];
        this.VipLevel = args[7];
        this.factionID = args[8];
    };
    return ChatVoiceRecordEvent;
}(EventArgs));
__reflect(ChatVoiceRecordEvent.prototype, "ChatVoiceRecordEvent");
//- 语音ID事件 ////-
var ChatVoiceIDRecordEvent = (function (_super) {
    __extends(ChatVoiceIDRecordEvent, _super);
    function ChatVoiceIDRecordEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatVoiceIDRecordEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.channel = args[0];
        this.id = args[1];
        this.name = args[2];
        this.body = args[3];
        this.voiceID = args[4];
        this.recordTime = args[5];
        this.VipLevel = args[6];
    };
    return ChatVoiceIDRecordEvent;
}(EventArgs));
__reflect(ChatVoiceIDRecordEvent.prototype, "ChatVoiceIDRecordEvent");
//打开某个矿洞
var OpenOneRelicEvent = (function (_super) {
    __extends(OpenOneRelicEvent, _super);
    function OpenOneRelicEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpenOneRelicEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.relicAreaID = args[0];
        this.relicID = args[1];
    };
    return OpenOneRelicEvent;
}(EventArgs));
__reflect(OpenOneRelicEvent.prototype, "OpenOneRelicEvent");
//矿洞锁定
var RelicLockEvent = (function (_super) {
    __extends(RelicLockEvent, _super);
    function RelicLockEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelicLockEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.relicAreaID = args[0];
        this.relicID = args[1];
    };
    return RelicLockEvent;
}(EventArgs));
__reflect(RelicLockEvent.prototype, "RelicLockEvent");
//矿洞锁定
var RelicAreaUpdateEvent = (function (_super) {
    __extends(RelicAreaUpdateEvent, _super);
    function RelicAreaUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelicAreaUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.relicAreaID = args[0];
    };
    return RelicAreaUpdateEvent;
}(EventArgs));
__reflect(RelicAreaUpdateEvent.prototype, "RelicAreaUpdateEvent");
//////////////////////////////////////角色其他相关////////////////////////////
var RoleInviteListEvent = (function (_super) {
    __extends(RoleInviteListEvent, _super);
    function RoleInviteListEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleInviteListEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inviteType = args[0];
        this.inviteList = args[1];
    };
    return RoleInviteListEvent;
}(EventArgs));
__reflect(RoleInviteListEvent.prototype, "RoleInviteListEvent");
//////////////-血盟(vip小战队)//////////////////-
var PrizeStatusListData = (function (_super) {
    __extends(PrizeStatusListData, _super);
    function PrizeStatusListData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrizeStatusListData.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.prizeStatusList = args[0].prizeStatusList;
    };
    return PrizeStatusListData;
}(EventArgs));
__reflect(PrizeStatusListData.prototype, "PrizeStatusListData");
//战队列表
var QueryTeamListData = (function (_super) {
    __extends(QueryTeamListData, _super);
    function QueryTeamListData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryTeamListData.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.teamList = args[0];
    };
    return QueryTeamListData;
}(EventArgs));
__reflect(QueryTeamListData.prototype, "QueryTeamListData");
var QueryApplyListData = (function (_super) {
    __extends(QueryApplyListData, _super);
    function QueryApplyListData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryApplyListData.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.applyList = args[0];
    };
    return QueryApplyListData;
}(EventArgs));
__reflect(QueryApplyListData.prototype, "QueryApplyListData");
var QueryMemberListData = (function (_super) {
    __extends(QueryMemberListData, _super);
    function QueryMemberListData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryMemberListData.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.memberList = args[0];
        this.totalFetters = args[1];
        this.teamName = args[2];
    };
    return QueryMemberListData;
}(EventArgs));
__reflect(QueryMemberListData.prototype, "QueryMemberListData");
var VipTeamInfoUpdate = (function (_super) {
    __extends(VipTeamInfoUpdate, _super);
    function VipTeamInfoUpdate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VipTeamInfoUpdate.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.teamId = args[0];
        this.teamName = args[1];
        this.teamLeaderId = args[2];
        this.teamLeaderName = args[3];
        this.teamLeaderLevel = args[4];
        this.teamLeaderVipLevel = args[5];
        this.teamLeaderVocation = args[6];
        this.teamLeaderSex = args[7];
        this.teamMemberCount = args[8];
        this.teamLeaderForce = args[9];
    };
    return VipTeamInfoUpdate;
}(EventArgs));
__reflect(VipTeamInfoUpdate.prototype, "VipTeamInfoUpdate");
//玩家信息分类
var PlayerDetailedInfoEvent = (function (_super) {
    __extends(PlayerDetailedInfoEvent, _super);
    function PlayerDetailedInfoEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerDetailedInfoEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.checkType = args[0];
        this.info = args[1];
    };
    return PlayerDetailedInfoEvent;
}(EventArgs));
__reflect(PlayerDetailedInfoEvent.prototype, "PlayerDetailedInfoEvent");
var IconFlyEventArgs = (function (_super) {
    __extends(IconFlyEventArgs, _super);
    function IconFlyEventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconFlyEventArgs.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillId = args[0];
        this.endX = args[1];
        this.endY = args[2];
    };
    return IconFlyEventArgs;
}(EventArgs));
__reflect(IconFlyEventArgs.prototype, "IconFlyEventArgs");
//////////- 技能升级 ////////////
var PetReplaceSkillEvent = (function (_super) {
    __extends(PetReplaceSkillEvent, _super);
    function PetReplaceSkillEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetReplaceSkillEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.oldSkill = args[0];
        this.newObjSkill = args[1];
    };
    return PetReplaceSkillEvent;
}(EventArgs));
__reflect(PetReplaceSkillEvent.prototype, "PetReplaceSkillEvent");
var PetPointEvent = (function (_super) {
    __extends(PetPointEvent, _super);
    function PetPointEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetPointEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.values = args[0];
        this.point = args[1];
        this.exchange = args[2];
        this.ratio = args[3];
    };
    return PetPointEvent;
}(EventArgs));
__reflect(PetPointEvent.prototype, "PetPointEvent");
var HeroPerLevelUpEvent = (function (_super) {
    __extends(HeroPerLevelUpEvent, _super);
    function HeroPerLevelUpEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeroPerLevelUpEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.level = args[0];
    };
    return HeroPerLevelUpEvent;
}(EventArgs));
__reflect(HeroPerLevelUpEvent.prototype, "HeroPerLevelUpEvent");
////////////////////////////////////////-通用////////////////////////////////////////////-
var NetMessageEvent = (function (_super) {
    __extends(NetMessageEvent, _super);
    function NetMessageEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NetMessageEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.msg = args[0];
    };
    return NetMessageEvent;
}(EventArgs));
__reflect(NetMessageEvent.prototype, "NetMessageEvent");
var GameUserDataEvent = (function (_super) {
    __extends(GameUserDataEvent, _super);
    function GameUserDataEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameUserDataEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.userData = args[0];
    };
    return GameUserDataEvent;
}(EventArgs));
__reflect(GameUserDataEvent.prototype, "GameUserDataEvent");
////////////////////////////////////////-职业////////////////////////////////////////////-
var ProfessionInfoEvent = (function (_super) {
    __extends(ProfessionInfoEvent, _super);
    function ProfessionInfoEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProfessionInfoEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.professionInfo = args[0];
    };
    return ProfessionInfoEvent;
}(EventArgs));
__reflect(ProfessionInfoEvent.prototype, "ProfessionInfoEvent");
////////////////////////////////////////-公会////////////////////////////////////////////-
var ClubSelfUpdateEvent = (function (_super) {
    __extends(ClubSelfUpdateEvent, _super);
    function ClubSelfUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubSelfUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = args[0];
        this.name = args[1];
        this.post = args[2];
    };
    return ClubSelfUpdateEvent;
}(EventArgs));
__reflect(ClubSelfUpdateEvent.prototype, "ClubSelfUpdateEvent");
//军团成员信息
var ClubMemberInfoUpdateEvent = (function (_super) {
    __extends(ClubMemberInfoUpdateEvent, _super);
    function ClubMemberInfoUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubMemberInfoUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubRoleInfo = args[0];
    };
    return ClubMemberInfoUpdateEvent;
}(EventArgs));
__reflect(ClubMemberInfoUpdateEvent.prototype, "ClubMemberInfoUpdateEvent");
//更新军团公告
var UpdateLegionNoticeEvent = (function (_super) {
    __extends(UpdateLegionNoticeEvent, _super);
    function UpdateLegionNoticeEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateLegionNoticeEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.notice = args[0];
        this.id = args[1];
    };
    return UpdateLegionNoticeEvent;
}(EventArgs));
__reflect(UpdateLegionNoticeEvent.prototype, "UpdateLegionNoticeEvent");
//更新军团公告
var ClubListEvent = (function (_super) {
    __extends(ClubListEvent, _super);
    function ClubListEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubListEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.clubInfoList = args[0];
    };
    return ClubListEvent;
}(EventArgs));
__reflect(ClubListEvent.prototype, "ClubListEvent");
//个人申请的军团列表信息
var ClubMyApplyListEvent = (function (_super) {
    __extends(ClubMyApplyListEvent, _super);
    function ClubMyApplyListEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubMyApplyListEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.myApplyList = args[0];
    };
    return ClubMyApplyListEvent;
}(EventArgs));
__reflect(ClubMyApplyListEvent.prototype, "ClubMyApplyListEvent");
////////////////////////////////////////-物品////////////////////////////////////////////-
var ItemEvent = (function (_super) {
    __extends(ItemEvent, _super);
    function ItemEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = args[0];
    };
    return ItemEvent;
}(EventArgs));
__reflect(ItemEvent.prototype, "ItemEvent");
var ItemUpdateEvent = (function (_super) {
    __extends(ItemUpdateEvent, _super);
    function ItemUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.store = args[0]; //包裹1，包裹2，信箱，仓库等
        this.item = args[1];
    };
    return ItemUpdateEvent;
}(EventArgs));
__reflect(ItemUpdateEvent.prototype, "ItemUpdateEvent");
var ItemUpdateListEvent = (function (_super) {
    __extends(ItemUpdateListEvent, _super);
    function ItemUpdateListEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemUpdateListEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemList = args[0]; //
    };
    return ItemUpdateListEvent;
}(EventArgs));
__reflect(ItemUpdateListEvent.prototype, "ItemUpdateListEvent");
var ItemSellListEvent = (function (_super) {
    __extends(ItemSellListEvent, _super);
    function ItemSellListEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemSellListEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.sellId = args[0];
        this.itemList = args[1];
    };
    return ItemSellListEvent;
}(EventArgs));
__reflect(ItemSellListEvent.prototype, "ItemSellListEvent");
var ItemGainEvent = (function (_super) {
    __extends(ItemGainEvent, _super);
    function ItemGainEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemGainEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemEntryId = args[0];
        this.count = args[1];
        this.itemLogic = args[2];
    };
    return ItemGainEvent;
}(EventArgs));
__reflect(ItemGainEvent.prototype, "ItemGainEvent");
//////////////-溶解//////////////////////////
var ResolveResult = (function (_super) {
    __extends(ResolveResult, _super);
    function ResolveResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResolveResult.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.num = args[0];
        this.ItemList = args[1];
    };
    return ResolveResult;
}(EventArgs));
__reflect(ResolveResult.prototype, "ResolveResult");
var SoldierUpdateEvent = (function (_super) {
    __extends(SoldierUpdateEvent, _super);
    function SoldierUpdateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SoldierUpdateEvent.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.oldList = args[0];
        this.newList = args[1];
    };
    return SoldierUpdateEvent;
}(EventArgs));
__reflect(SoldierUpdateEvent.prototype, "SoldierUpdateEvent");
//////////////-神兽//////////////////////////////-
var AniamlLevel = (function (_super) {
    __extends(AniamlLevel, _super);
    function AniamlLevel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AniamlLevel.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.level = args[0];
        this.savelist = args[1];
    };
    return AniamlLevel;
}(EventArgs));
__reflect(AniamlLevel.prototype, "AniamlLevel");
var AniamlPower = (function (_super) {
    __extends(AniamlPower, _super);
    function AniamlPower() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AniamlPower.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.power = args[0];
    };
    return AniamlPower;
}(EventArgs));
__reflect(AniamlPower.prototype, "AniamlPower");
//# sourceMappingURL=EventArgsDefine.js.map
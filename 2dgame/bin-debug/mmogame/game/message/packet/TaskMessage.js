/*
作者:
    yangguiming
    
创建时间：
   2013.6.24(周一)

意图：
   任务消息

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
//////////////////////////////////////////////////////////////////-
//与NPC对话
var Message_C2G_NPC_TALK = (function (_super) {
    __extends(Message_C2G_NPC_TALK, _super);
    function Message_C2G_NPC_TALK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_NPC_TALK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.taskId = 0;
        this.param = 0;
        //this.nextNode = 0
    };
    Message_C2G_NPC_TALK.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
        //writer.writeUInt(this.taskId)
        writer.writeUInt(this.param);
    };
    Message_C2G_NPC_TALK.prototype.unpack = function (reader) {
    };
    return Message_C2G_NPC_TALK;
}(MessageBase));
__reflect(Message_C2G_NPC_TALK.prototype, "Message_C2G_NPC_TALK");
//与NPC对话(entryId)
var Message_C2G_NPC_ENTRYID_TALK = (function (_super) {
    __extends(Message_C2G_NPC_ENTRYID_TALK, _super);
    function Message_C2G_NPC_ENTRYID_TALK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_NPC_ENTRYID_TALK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.entryId = 0;
        this.param = 0;
    };
    Message_C2G_NPC_ENTRYID_TALK.prototype.pack = function (writer) {
        writer.writeUInt(this.entryId);
        writer.writeUInt(this.param);
    };
    Message_C2G_NPC_ENTRYID_TALK.prototype.unpack = function (reader) {
    };
    return Message_C2G_NPC_ENTRYID_TALK;
}(MessageBase));
__reflect(Message_C2G_NPC_ENTRYID_TALK.prototype, "Message_C2G_NPC_ENTRYID_TALK");
//////////////////////////////////////////////////////////////////-
//接受任务
var Message_G2C_TASK_ACCEPT = (function (_super) {
    __extends(Message_G2C_TASK_ACCEPT, _super);
    function Message_G2C_TASK_ACCEPT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TASK_ACCEPT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskInfo = null;
    };
    Message_G2C_TASK_ACCEPT.prototype.pack = function (writer) {
    };
    Message_G2C_TASK_ACCEPT.prototype.unpack = function (reader) {
        this.taskInfo = TaskInfo.newObj();
        this.taskInfo.read(reader);
    };
    return Message_G2C_TASK_ACCEPT;
}(MessageBase));
__reflect(Message_G2C_TASK_ACCEPT.prototype, "Message_G2C_TASK_ACCEPT");
//////////////////////////////////////////////////////////////////-
//更新任务信息
var Message_G2C_TASK_INFO = (function (_super) {
    __extends(Message_G2C_TASK_INFO, _super);
    function Message_G2C_TASK_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TASK_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskInfoList = [];
        //this.isdump = true
    };
    Message_G2C_TASK_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_TASK_INFO.prototype.unpack = function (reader) {
        this.taskInfoList = [];
        var count = reader.readUChar();
        for (var i = 1; i <= count; i++) {
            var taskInfo = TaskInfo.newObj();
            taskInfo.read(reader);
            JsUtil.arrayInstert(this.taskInfoList, taskInfo);
        }
    };
    return Message_G2C_TASK_INFO;
}(MessageBase));
__reflect(Message_G2C_TASK_INFO.prototype, "Message_G2C_TASK_INFO");
//////////////////////////////////////////////////////////////////-
//任务成功
var Message_G2C_TASK_SUCCEED = (function (_super) {
    __extends(Message_G2C_TASK_SUCCEED, _super);
    function Message_G2C_TASK_SUCCEED() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TASK_SUCCEED.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
    };
    Message_G2C_TASK_SUCCEED.prototype.pack = function (writer) {
    };
    Message_G2C_TASK_SUCCEED.prototype.unpack = function (reader) {
        this.taskId = reader.readUInt();
    };
    return Message_G2C_TASK_SUCCEED;
}(MessageBase));
__reflect(Message_G2C_TASK_SUCCEED.prototype, "Message_G2C_TASK_SUCCEED");
//////////////////////////////////////////////////////////////////-
//任务失败
var Message_G2C_TASK_FAIL = (function (_super) {
    __extends(Message_G2C_TASK_FAIL, _super);
    function Message_G2C_TASK_FAIL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TASK_FAIL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
    };
    Message_G2C_TASK_FAIL.prototype.pack = function (writer) {
    };
    Message_G2C_TASK_FAIL.prototype.unpack = function (reader) {
        this.taskId = reader.readUInt();
    };
    return Message_G2C_TASK_FAIL;
}(MessageBase));
__reflect(Message_G2C_TASK_FAIL.prototype, "Message_G2C_TASK_FAIL");
//////////////////////////////////////////////////////////////////-
//申请放弃任务
var Message_C2G_TASK_CANCEL = (function (_super) {
    __extends(Message_C2G_TASK_CANCEL, _super);
    function Message_C2G_TASK_CANCEL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_CANCEL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
    };
    Message_C2G_TASK_CANCEL.prototype.pack = function (writer) {
        writer.writeUInt(this.taskId);
    };
    Message_C2G_TASK_CANCEL.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_CANCEL;
}(MessageBase));
__reflect(Message_C2G_TASK_CANCEL.prototype, "Message_C2G_TASK_CANCEL");
//////////////////////////////////////////////////////////////////-
//放弃任务响应
var Message_G2C_TASK_CANCEL = (function (_super) {
    __extends(Message_G2C_TASK_CANCEL, _super);
    function Message_G2C_TASK_CANCEL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TASK_CANCEL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
    };
    Message_G2C_TASK_CANCEL.prototype.pack = function (writer) {
    };
    Message_G2C_TASK_CANCEL.prototype.unpack = function (reader) {
        this.taskId = reader.readUInt();
    };
    return Message_G2C_TASK_CANCEL;
}(MessageBase));
__reflect(Message_G2C_TASK_CANCEL.prototype, "Message_G2C_TASK_CANCEL");
////////////////////////////////////////////////////////////////////////
//完成任务列表（只在登陆是获取一次）
var Message_G2C_TASK_FINISH_LIST = (function (_super) {
    __extends(Message_G2C_TASK_FINISH_LIST, _super);
    function Message_G2C_TASK_FINISH_LIST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TASK_FINISH_LIST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskList = [];
        //this.fireEvent=true
    };
    Message_G2C_TASK_FINISH_LIST.prototype.pack = function (writer) {
    };
    Message_G2C_TASK_FINISH_LIST.prototype.unpack = function (reader) {
        this.taskList = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var taskId = reader.readUInt();
            if (!table_isExsit(this.taskList, taskId)) {
                JsUtil.arrayInstert(this.taskList, taskId);
            }
        }
    };
    return Message_G2C_TASK_FINISH_LIST;
}(MessageBase));
__reflect(Message_G2C_TASK_FINISH_LIST.prototype, "Message_G2C_TASK_FINISH_LIST");
//////////////////////////////////////////////////////////////////-
//上交资源给npc(客户端)
var Message_C2G_TASK_GIVE_RES = (function (_super) {
    __extends(Message_C2G_TASK_GIVE_RES, _super);
    function Message_C2G_TASK_GIVE_RES() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_GIVE_RES.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.taskId = 0;
        this.money = 0;
        this.rmb = 0;
        this.itemList = {}; //{[id]:int, [count] : int}
    };
    Message_C2G_TASK_GIVE_RES.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
        writer.writeUInt(this.taskId);
        writer.writeUInt(this.money);
        writer.writeUInt(this.rmb);
        writer.writeUShort(this.itemList.length);
        for (var _ in this.itemList) {
            var v = this.itemList[_];
            writer.writeUInt(v.id);
            writer.writeUInt(v.count);
        }
    };
    Message_C2G_TASK_GIVE_RES.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_GIVE_RES;
}(MessageBase));
__reflect(Message_C2G_TASK_GIVE_RES.prototype, "Message_C2G_TASK_GIVE_RES");
//////////////////////////////////////////////////////////////////-
//提交任务(客户端)
var Message_C2G_TASK_COMMIT = (function (_super) {
    __extends(Message_C2G_TASK_COMMIT, _super);
    function Message_C2G_TASK_COMMIT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_COMMIT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.taskId = 0;
    };
    Message_C2G_TASK_COMMIT.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
        writer.writeUInt(this.taskId);
    };
    Message_C2G_TASK_COMMIT.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_COMMIT;
}(MessageBase));
__reflect(Message_C2G_TASK_COMMIT.prototype, "Message_C2G_TASK_COMMIT");
//////////////////////////////////////////////////////////////////////
//保存节点(客户端)    
var Message_C2G_TASK_NODE = (function (_super) {
    __extends(Message_C2G_TASK_NODE, _super);
    function Message_C2G_TASK_NODE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_NODE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.taskId = 0;
        this.nodeId = 0;
    };
    Message_C2G_TASK_NODE.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
        writer.writeUInt(this.taskId);
        writer.writeUInt(this.nodeId);
    };
    Message_C2G_TASK_NODE.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_NODE;
}(MessageBase));
__reflect(Message_C2G_TASK_NODE.prototype, "Message_C2G_TASK_NODE");
//////////////////////////////////////////////////////////////////-
//保存找到npc(客户端)
var Message_C2G_TASK_NPC = (function (_super) {
    __extends(Message_C2G_TASK_NPC, _super);
    function Message_C2G_TASK_NPC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_NPC.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.taskId = 0;
    };
    Message_C2G_TASK_NPC.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
        writer.writeUInt(this.taskId);
    };
    Message_C2G_TASK_NPC.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_NPC;
}(MessageBase));
__reflect(Message_C2G_TASK_NPC.prototype, "Message_C2G_TASK_NPC");
//////////////////////////////////////////////////////////////////-
//保存找到npc(客户端)
var Message_C2G_TASK_FIGHT = (function (_super) {
    __extends(Message_C2G_TASK_FIGHT, _super);
    function Message_C2G_TASK_FIGHT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_FIGHT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.taskId = 0;
    };
    Message_C2G_TASK_FIGHT.prototype.pack = function (writer) {
        writer.writeUInt(this.taskId);
        writer.writeUInt(this.npcId);
    };
    Message_C2G_TASK_FIGHT.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_FIGHT;
}(MessageBase));
__reflect(Message_C2G_TASK_FIGHT.prototype, "Message_C2G_TASK_FIGHT");
//////////////////////////////////////////////////////////////////-
//到达目标点(客户端)
var Message_C2G_TASK_ARRIVE = (function (_super) {
    __extends(Message_C2G_TASK_ARRIVE, _super);
    function Message_C2G_TASK_ARRIVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_ARRIVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
        this.index = 0;
    };
    Message_C2G_TASK_ARRIVE.prototype.pack = function (writer) {
        writer.writeUInt(this.taskId);
        writer.writeUInt(this.index);
    };
    Message_C2G_TASK_ARRIVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_ARRIVE;
}(MessageBase));
__reflect(Message_C2G_TASK_ARRIVE.prototype, "Message_C2G_TASK_ARRIVE");
//////////////////////////////////////////////////////////////////-
//NPC请求任务(客户端)
var Message_C2G_TASK_APPLY = (function (_super) {
    __extends(Message_C2G_TASK_APPLY, _super);
    function Message_C2G_TASK_APPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_APPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.taskType = 0;
    };
    Message_C2G_TASK_APPLY.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
        writer.writeUInt(this.taskType);
        //writer.writeUInt(0)
    };
    Message_C2G_TASK_APPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_APPLY;
}(MessageBase));
__reflect(Message_C2G_TASK_APPLY.prototype, "Message_C2G_TASK_APPLY");
//////////////////////////////////////////////////////////////////-
//NPC请求活动(客户端)
var Message_C2G_TASK_APPLY_ACTIVITY = (function (_super) {
    __extends(Message_C2G_TASK_APPLY_ACTIVITY, _super);
    function Message_C2G_TASK_APPLY_ACTIVITY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_APPLY_ACTIVITY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.activityType = 0;
        this.activityId = 0;
    };
    Message_C2G_TASK_APPLY_ACTIVITY.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
        writer.writeUInt(this.activityType);
        writer.writeUInt(this.activityId);
    };
    Message_C2G_TASK_APPLY_ACTIVITY.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_APPLY_ACTIVITY;
}(MessageBase));
__reflect(Message_C2G_TASK_APPLY_ACTIVITY.prototype, "Message_C2G_TASK_APPLY_ACTIVITY");
//////////////////////////////////////////////////////////////////-
//上交宠物给npc(客户端)
var Message_C2G_TASK_GIVE_PET = (function (_super) {
    __extends(Message_C2G_TASK_GIVE_PET, _super);
    function Message_C2G_TASK_GIVE_PET() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_GIVE_PET.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.taskId = 0;
        this.money = 0;
        this.petList = {}; //{[id]:int}
    };
    Message_C2G_TASK_GIVE_PET.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
        writer.writeUInt(this.taskId);
        writer.writeUInt(this.money);
        writer.writeUShort(this.petList.length);
        for (var _ in this.petList) {
            var v = this.petList[_];
            writer.writeUInt(v.id);
        }
    };
    Message_C2G_TASK_GIVE_PET.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_GIVE_PET;
}(MessageBase));
__reflect(Message_C2G_TASK_GIVE_PET.prototype, "Message_C2G_TASK_GIVE_PET");
//////////////////////////////////////////////////////////////////-
//物品请求任务(客户端)
var Message_C2G_TASK_ITEMAPPLY = (function (_super) {
    __extends(Message_C2G_TASK_ITEMAPPLY, _super);
    function Message_C2G_TASK_ITEMAPPLY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_ITEMAPPLY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
    };
    Message_C2G_TASK_ITEMAPPLY.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
    };
    Message_C2G_TASK_ITEMAPPLY.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_ITEMAPPLY;
}(MessageBase));
__reflect(Message_C2G_TASK_ITEMAPPLY.prototype, "Message_C2G_TASK_ITEMAPPLY");
//////////////////////////////////////////////////////////////////-
//物品保存节点(客户端)
var Message_C2G_TASK_ITEMNODE = (function (_super) {
    __extends(Message_C2G_TASK_ITEMNODE, _super);
    function Message_C2G_TASK_ITEMNODE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_ITEMNODE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
        this.taskId = 0;
        this.nodeId = 0;
    };
    Message_C2G_TASK_ITEMNODE.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
        writer.writeUInt(this.taskId);
        writer.writeUInt(this.nodeId);
    };
    Message_C2G_TASK_ITEMNODE.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_ITEMNODE;
}(MessageBase));
__reflect(Message_C2G_TASK_ITEMNODE.prototype, "Message_C2G_TASK_ITEMNODE");
//////////////////////////////////////////////////////////////////-
//物品提交任务(客户端)
var Message_C2G_TASK_ITEMCOMMIT = (function (_super) {
    __extends(Message_C2G_TASK_ITEMCOMMIT, _super);
    function Message_C2G_TASK_ITEMCOMMIT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_ITEMCOMMIT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.itemId = 0;
        this.taskId = 0;
    };
    Message_C2G_TASK_ITEMCOMMIT.prototype.pack = function (writer) {
        writer.writeUInt(this.itemId);
        writer.writeUInt(this.taskId);
    };
    Message_C2G_TASK_ITEMCOMMIT.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_ITEMCOMMIT;
}(MessageBase));
__reflect(Message_C2G_TASK_ITEMCOMMIT.prototype, "Message_C2G_TASK_ITEMCOMMIT");
////////////////////////////////////////////////////////////////////////
//物品提交任务(客户端)
var Message_C2G_TASK_ACCEPT = (function (_super) {
    __extends(Message_C2G_TASK_ACCEPT, _super);
    function Message_C2G_TASK_ACCEPT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_ACCEPT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.taskId = 0;
    };
    Message_C2G_TASK_ACCEPT.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
        writer.writeUInt(this.taskId);
    };
    Message_C2G_TASK_ACCEPT.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_ACCEPT;
}(MessageBase));
__reflect(Message_C2G_TASK_ACCEPT.prototype, "Message_C2G_TASK_ACCEPT");
////////////////////////////////////////////////////////////////////////-
//任务战斗失败
var Message_G2C_TASK_FIGHT_LOST = (function (_super) {
    __extends(Message_G2C_TASK_FIGHT_LOST, _super);
    function Message_G2C_TASK_FIGHT_LOST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TASK_FIGHT_LOST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
        this.npcId = 0;
    };
    Message_G2C_TASK_FIGHT_LOST.prototype.pack = function (writer) {
    };
    Message_G2C_TASK_FIGHT_LOST.prototype.unpack = function (reader) {
        this.taskId = reader.readUInt();
        this.npcId = reader.readUInt();
    };
    return Message_G2C_TASK_FIGHT_LOST;
}(MessageBase));
__reflect(Message_G2C_TASK_FIGHT_LOST.prototype, "Message_G2C_TASK_FIGHT_LOST");
////////////////////////////////////////////////////////////////////////
//任务相关跳地图
var Message_C2G_TASK_GUIDE_JUMP = (function (_super) {
    __extends(Message_C2G_TASK_GUIDE_JUMP, _super);
    function Message_C2G_TASK_GUIDE_JUMP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_GUIDE_JUMP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mapId = 0;
        this.cellX = 0;
        this.cellY = 0;
    };
    Message_C2G_TASK_GUIDE_JUMP.prototype.pack = function (writer) {
        writer.writeUInt(this.mapId);
        writer.writeUInt(this.cellX);
        writer.writeUInt(this.cellY);
    };
    Message_C2G_TASK_GUIDE_JUMP.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_GUIDE_JUMP;
}(MessageBase));
__reflect(Message_C2G_TASK_GUIDE_JUMP.prototype, "Message_C2G_TASK_GUIDE_JUMP");
////////////////-新手副本 
var Message_C2G_NEW_PALYER_TRANSCRIPT = (function (_super) {
    __extends(Message_C2G_NEW_PALYER_TRANSCRIPT, _super);
    function Message_C2G_NEW_PALYER_TRANSCRIPT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_NEW_PALYER_TRANSCRIPT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = null;
    };
    Message_C2G_NEW_PALYER_TRANSCRIPT.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
    };
    Message_C2G_NEW_PALYER_TRANSCRIPT.prototype.unpack = function (reader) {
    };
    return Message_C2G_NEW_PALYER_TRANSCRIPT;
}(MessageBase));
__reflect(Message_C2G_NEW_PALYER_TRANSCRIPT.prototype, "Message_C2G_NEW_PALYER_TRANSCRIPT");
////////////////-泡泡经验////////////////////////
var Message_C2G_CLICK_JINGYANPAOPAO = (function (_super) {
    __extends(Message_C2G_CLICK_JINGYANPAOPAO, _super);
    function Message_C2G_CLICK_JINGYANPAOPAO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CLICK_JINGYANPAOPAO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = null;
    };
    Message_C2G_CLICK_JINGYANPAOPAO.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
    };
    Message_C2G_CLICK_JINGYANPAOPAO.prototype.unpack = function (reader) {
    };
    return Message_C2G_CLICK_JINGYANPAOPAO;
}(MessageBase));
__reflect(Message_C2G_CLICK_JINGYANPAOPAO.prototype, "Message_C2G_CLICK_JINGYANPAOPAO");
//////////////////飞行棋任务////////////////////////////////-
var Message_C2G_TASK_FEIXINGQI_ANSWER = (function (_super) {
    __extends(Message_C2G_TASK_FEIXINGQI_ANSWER, _super);
    function Message_C2G_TASK_FEIXINGQI_ANSWER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_FEIXINGQI_ANSWER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = null;
        this.npcEntry = null;
    };
    Message_C2G_TASK_FEIXINGQI_ANSWER.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
        writer.writeUInt(this.npcEntry);
    };
    Message_C2G_TASK_FEIXINGQI_ANSWER.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_FEIXINGQI_ANSWER;
}(MessageBase));
__reflect(Message_C2G_TASK_FEIXINGQI_ANSWER.prototype, "Message_C2G_TASK_FEIXINGQI_ANSWER");
//////////////////-整队与NPC对话//////////////////////////////-
var Message_C2G_TASK_TEAM_TALK = (function (_super) {
    __extends(Message_C2G_TASK_TEAM_TALK, _super);
    function Message_C2G_TASK_TEAM_TALK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_TEAM_TALK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
    };
    Message_C2G_TASK_TEAM_TALK.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
    };
    Message_C2G_TASK_TEAM_TALK.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_TEAM_TALK;
}(MessageBase));
__reflect(Message_C2G_TASK_TEAM_TALK.prototype, "Message_C2G_TASK_TEAM_TALK");
//////////////////-整队与NPC对话反馈//////////////////////////////-
var Message_G2C_TASK_TEAM_TALK = (function (_super) {
    __extends(Message_G2C_TASK_TEAM_TALK, _super);
    function Message_G2C_TASK_TEAM_TALK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TASK_TEAM_TALK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
    };
    Message_G2C_TASK_TEAM_TALK.prototype.pack = function (writer) {
    };
    Message_G2C_TASK_TEAM_TALK.prototype.unpack = function (reader) {
        this.npcId = reader.readUInt();
    };
    return Message_G2C_TASK_TEAM_TALK;
}(MessageBase));
__reflect(Message_G2C_TASK_TEAM_TALK.prototype, "Message_G2C_TASK_TEAM_TALK");
//////////////////////任务中答题提交////////////////////////////-
var Message_C2G_TASK_ANSWER = (function (_super) {
    __extends(Message_C2G_TASK_ANSWER, _super);
    function Message_C2G_TASK_ANSWER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_ANSWER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
        this.answer = 0;
    };
    Message_C2G_TASK_ANSWER.prototype.pack = function (writer) {
        writer.writeUInt(this.taskId);
        writer.writeUInt(this.answer);
    };
    Message_C2G_TASK_ANSWER.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_ANSWER;
}(MessageBase));
__reflect(Message_C2G_TASK_ANSWER.prototype, "Message_C2G_TASK_ANSWER");
////////////////////亲密度任务提交选项////////////////////////////
var Message_C2G_TASK_PET_OPTION = (function (_super) {
    __extends(Message_C2G_TASK_PET_OPTION, _super);
    function Message_C2G_TASK_PET_OPTION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_PET_OPTION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
        this.option = 0;
    };
    Message_C2G_TASK_PET_OPTION.prototype.pack = function (writer) {
        writer.writeUInt(this.taskId);
        writer.writeUInt(this.option);
    };
    Message_C2G_TASK_PET_OPTION.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_PET_OPTION;
}(MessageBase));
__reflect(Message_C2G_TASK_PET_OPTION.prototype, "Message_C2G_TASK_PET_OPTION");
//////////////////-亲密度任务提交金钱/体力/物品//////////////////////////////-
var Message_C2G_TASK_GIVE_SOMETHING = (function (_super) {
    __extends(Message_C2G_TASK_GIVE_SOMETHING, _super);
    function Message_C2G_TASK_GIVE_SOMETHING() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_GIVE_SOMETHING.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
    };
    Message_C2G_TASK_GIVE_SOMETHING.prototype.pack = function (writer) {
        writer.writeUInt(this.taskId);
    };
    Message_C2G_TASK_GIVE_SOMETHING.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_GIVE_SOMETHING;
}(MessageBase));
__reflect(Message_C2G_TASK_GIVE_SOMETHING.prototype, "Message_C2G_TASK_GIVE_SOMETHING");
//////////////////-亲密度任务选择////////////////////////////////////////
var Message_G2C_TASK_PET_OPTION = (function (_super) {
    __extends(Message_G2C_TASK_PET_OPTION, _super);
    function Message_G2C_TASK_PET_OPTION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_TASK_PET_OPTION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.eventStr = null;
        this.eventData = null;
    };
    Message_G2C_TASK_PET_OPTION.prototype.pack = function (writer) {
    };
    Message_G2C_TASK_PET_OPTION.prototype.unpack = function (reader) {
        this.eventStr = reader.readString();
        this.eventData = table_load(reader.readString());
    };
    return Message_G2C_TASK_PET_OPTION;
}(MessageBase));
__reflect(Message_G2C_TASK_PET_OPTION.prototype, "Message_G2C_TASK_PET_OPTION");
////////////////-修行任务////////////////////////////////
var Message_C2G_TASK_SELECT_OPTION = (function (_super) {
    __extends(Message_C2G_TASK_SELECT_OPTION, _super);
    function Message_C2G_TASK_SELECT_OPTION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_SELECT_OPTION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
        this.option = 0;
    };
    Message_C2G_TASK_SELECT_OPTION.prototype.pack = function (writer) {
        writer.writeUInt(this.taskId);
        writer.writeUInt(this.option);
    };
    Message_C2G_TASK_SELECT_OPTION.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_SELECT_OPTION;
}(MessageBase));
__reflect(Message_C2G_TASK_SELECT_OPTION.prototype, "Message_C2G_TASK_SELECT_OPTION");
var Message_C2G_FACTION_TASK_REQUEST = (function (_super) {
    __extends(Message_C2G_FACTION_TASK_REQUEST, _super);
    function Message_C2G_FACTION_TASK_REQUEST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_TASK_REQUEST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_TASK_REQUEST.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_TASK_REQUEST.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_TASK_REQUEST;
}(MessageBase));
__reflect(Message_C2G_FACTION_TASK_REQUEST.prototype, "Message_C2G_FACTION_TASK_REQUEST");
//军团任务
var Message_G2C_FACTION_TASK_REQUEST = (function (_super) {
    __extends(Message_G2C_FACTION_TASK_REQUEST, _super);
    function Message_G2C_FACTION_TASK_REQUEST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_TASK_REQUEST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.coolDown = 0; //冻结时间
        this.cancelDiamond = 0; //取消任务所需晶石
    };
    Message_G2C_FACTION_TASK_REQUEST.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_TASK_REQUEST.prototype.unpack = function (reader) {
        this.coolDown = reader.readUInt();
        this.cancelDiamond = reader.readUInt();
    };
    return Message_G2C_FACTION_TASK_REQUEST;
}(MessageBase));
__reflect(Message_G2C_FACTION_TASK_REQUEST.prototype, "Message_G2C_FACTION_TASK_REQUEST");
//军团任务NPC战斗
var Message_C2G_TASK_FACTION_FIGHT_NPC = (function (_super) {
    __extends(Message_C2G_TASK_FACTION_FIGHT_NPC, _super);
    function Message_C2G_TASK_FACTION_FIGHT_NPC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_FACTION_FIGHT_NPC.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskId = 0;
    };
    Message_C2G_TASK_FACTION_FIGHT_NPC.prototype.pack = function (writer) {
        writer.writeUInt(this.taskId);
    };
    Message_C2G_TASK_FACTION_FIGHT_NPC.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_FACTION_FIGHT_NPC;
}(MessageBase));
__reflect(Message_C2G_TASK_FACTION_FIGHT_NPC.prototype, "Message_C2G_TASK_FACTION_FIGHT_NPC");
//军团任务上交物品
var Message_C2G_TASK_FACTION_COMMIT = (function (_super) {
    __extends(Message_C2G_TASK_FACTION_COMMIT, _super);
    function Message_C2G_TASK_FACTION_COMMIT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TASK_FACTION_COMMIT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.npcId = 0;
        this.taskId = 0;
        this.money = 0;
        this.rmb = 0;
        this.itemList = {}; //{[id]:int, [count] : int}
    };
    Message_C2G_TASK_FACTION_COMMIT.prototype.pack = function (writer) {
        writer.writeUInt(this.npcId);
        writer.writeUInt(this.taskId);
        writer.writeUInt(this.money);
        writer.writeUInt(this.rmb);
        writer.writeUShort(this.itemList.length);
        for (var _ in this.itemList) {
            var v = this.itemList[_];
            writer.writeUInt(v.id);
            writer.writeUInt(v.count);
        }
    };
    Message_C2G_TASK_FACTION_COMMIT.prototype.unpack = function (reader) {
    };
    return Message_C2G_TASK_FACTION_COMMIT;
}(MessageBase));
__reflect(Message_C2G_TASK_FACTION_COMMIT.prototype, "Message_C2G_TASK_FACTION_COMMIT");
//////////////////////////-军团发布任务////////////////////////
//军团自选任务列表申请
var Message_C2G_FACTION_PUB_POOL = (function (_super) {
    __extends(Message_C2G_FACTION_PUB_POOL, _super);
    function Message_C2G_FACTION_PUB_POOL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_PUB_POOL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_PUB_POOL.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_PUB_POOL.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_PUB_POOL;
}(MessageBase));
__reflect(Message_C2G_FACTION_PUB_POOL.prototype, "Message_C2G_FACTION_PUB_POOL");
//军团自选任务列表
var Message_G2C_FACTION_PUB_POOL = (function (_super) {
    __extends(Message_G2C_FACTION_PUB_POOL, _super);
    function Message_G2C_FACTION_PUB_POOL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_PUB_POOL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskInfoList = [];
    };
    Message_G2C_FACTION_PUB_POOL.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_PUB_POOL.prototype.unpack = function (reader) {
        var t = [];
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var e = {};
            e.id = reader.readString(); //任务信息ID
            e.playerId = reader.readUInt(); //发布者ID
            e.playerName = reader.readString(); //发布者名字
            e.sTime = reader.readUInt(); //发布时间
            e.eTime = reader.readUInt(); //有效时间戳
            e.received = reader.readUInt(); //是否已经被领取1表示已领取；0表示未领取
            JsUtil.arrayInstert(t, e);
        }
        this.taskInfoList = t;
    };
    return Message_G2C_FACTION_PUB_POOL;
}(MessageBase));
__reflect(Message_G2C_FACTION_PUB_POOL.prototype, "Message_G2C_FACTION_PUB_POOL");
var Message_C2G_FACTION_PUB_TASK_REQUEST = (function (_super) {
    __extends(Message_C2G_FACTION_PUB_TASK_REQUEST, _super);
    function Message_C2G_FACTION_PUB_TASK_REQUEST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_PUB_TASK_REQUEST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_PUB_TASK_REQUEST.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_PUB_TASK_REQUEST.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_PUB_TASK_REQUEST;
}(MessageBase));
__reflect(Message_C2G_FACTION_PUB_TASK_REQUEST.prototype, "Message_C2G_FACTION_PUB_TASK_REQUEST");
//军团发布任务
var Message_G2C_FACTION_PUB_TASK_REQUEST = (function (_super) {
    __extends(Message_G2C_FACTION_PUB_TASK_REQUEST, _super);
    function Message_G2C_FACTION_PUB_TASK_REQUEST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_PUB_TASK_REQUEST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.coolDown = 0; //冻结时间
        this.cancelDiamond = 0; //取消任务所需晶石
    };
    Message_G2C_FACTION_PUB_TASK_REQUEST.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_PUB_TASK_REQUEST.prototype.unpack = function (reader) {
        this.coolDown = reader.readUInt();
        this.cancelDiamond = reader.readUInt();
    };
    return Message_G2C_FACTION_PUB_TASK_REQUEST;
}(MessageBase));
__reflect(Message_G2C_FACTION_PUB_TASK_REQUEST.prototype, "Message_G2C_FACTION_PUB_TASK_REQUEST");
var Message_C2G_FACTION_PUB_TASK = (function (_super) {
    __extends(Message_C2G_FACTION_PUB_TASK, _super);
    function Message_C2G_FACTION_PUB_TASK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_PUB_TASK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_PUB_TASK.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_PUB_TASK.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_PUB_TASK;
}(MessageBase));
__reflect(Message_C2G_FACTION_PUB_TASK.prototype, "Message_C2G_FACTION_PUB_TASK");
//军团发布任务（领取）
var Message_C2G_TAKE_FACTION_PUB_TASK = (function (_super) {
    __extends(Message_C2G_TAKE_FACTION_PUB_TASK, _super);
    function Message_C2G_TAKE_FACTION_PUB_TASK() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_TAKE_FACTION_PUB_TASK.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.taskInfoId = "";
    };
    Message_C2G_TAKE_FACTION_PUB_TASK.prototype.pack = function (writer) {
        writer.writeString(this.taskInfoId);
    };
    Message_C2G_TAKE_FACTION_PUB_TASK.prototype.unpack = function (reader) {
    };
    return Message_C2G_TAKE_FACTION_PUB_TASK;
}(MessageBase));
__reflect(Message_C2G_TAKE_FACTION_PUB_TASK.prototype, "Message_C2G_TAKE_FACTION_PUB_TASK");
//申请可发布次数
var Message_C2G_FACTION_PUB_TASK_COUNT = (function (_super) {
    __extends(Message_C2G_FACTION_PUB_TASK_COUNT, _super);
    function Message_C2G_FACTION_PUB_TASK_COUNT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FACTION_PUB_TASK_COUNT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FACTION_PUB_TASK_COUNT.prototype.pack = function (writer) {
    };
    Message_C2G_FACTION_PUB_TASK_COUNT.prototype.unpack = function (reader) {
    };
    return Message_C2G_FACTION_PUB_TASK_COUNT;
}(MessageBase));
__reflect(Message_C2G_FACTION_PUB_TASK_COUNT.prototype, "Message_C2G_FACTION_PUB_TASK_COUNT");
//返回可发布次数
var Message_G2C_FACTION_PUB_TASK_COUNT = (function (_super) {
    __extends(Message_G2C_FACTION_PUB_TASK_COUNT, _super);
    function Message_G2C_FACTION_PUB_TASK_COUNT() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FACTION_PUB_TASK_COUNT.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.chargeCount = 0; //充值额度
        this.leftCount = 0; //总可发布任务次数
    };
    Message_G2C_FACTION_PUB_TASK_COUNT.prototype.pack = function (writer) {
    };
    Message_G2C_FACTION_PUB_TASK_COUNT.prototype.unpack = function (reader) {
        this.chargeCount = reader.readUInt();
        this.leftCount = reader.readUInt();
    };
    return Message_G2C_FACTION_PUB_TASK_COUNT;
}(MessageBase));
__reflect(Message_G2C_FACTION_PUB_TASK_COUNT.prototype, "Message_G2C_FACTION_PUB_TASK_COUNT");
//////////////////////////////////////////////////////////////- 
//# sourceMappingURL=TaskMessage.js.map
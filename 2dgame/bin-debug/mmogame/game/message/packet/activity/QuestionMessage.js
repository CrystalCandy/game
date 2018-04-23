/*
作者:
    yangguiming
    
创建时间：
   2017.03.02(周四)

意图：
   贵族答题
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
//查询当前答题状态
var Message_C2G_WORLDQUESTION_QUERY = (function (_super) {
    __extends(Message_C2G_WORLDQUESTION_QUERY, _super);
    function Message_C2G_WORLDQUESTION_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_WORLDQUESTION_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_WORLDQUESTION_QUERY.prototype.pack = function (writer) {
    };
    Message_C2G_WORLDQUESTION_QUERY.prototype.unpack = function (reader) {
    };
    return Message_C2G_WORLDQUESTION_QUERY;
}(MessageBase));
__reflect(Message_C2G_WORLDQUESTION_QUERY.prototype, "Message_C2G_WORLDQUESTION_QUERY");
var Message_G2C_WORLDQUESTION_QUERY = (function (_super) {
    __extends(Message_G2C_WORLDQUESTION_QUERY, _super);
    function Message_G2C_WORLDQUESTION_QUERY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_WORLDQUESTION_QUERY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.state = 0;
    };
    Message_G2C_WORLDQUESTION_QUERY.prototype.pack = function (writer) {
    };
    Message_G2C_WORLDQUESTION_QUERY.prototype.unpack = function (reader) {
        this.state = reader.readUInt();
        TLog.Debug("Message_G2C_WORLDQUESTION_QUERY", this.state);
    };
    return Message_G2C_WORLDQUESTION_QUERY;
}(MessageBase));
__reflect(Message_G2C_WORLDQUESTION_QUERY.prototype, "Message_G2C_WORLDQUESTION_QUERY");
var Message_G2C_WORLDQUESTION_INFO = (function (_super) {
    __extends(Message_G2C_WORLDQUESTION_INFO, _super);
    function Message_G2C_WORLDQUESTION_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_WORLDQUESTION_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.score = 0;
        this.rank = 0;
        this.followTimes = 0;
        this.doubleScoreTimes = 0;
    };
    Message_G2C_WORLDQUESTION_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_WORLDQUESTION_INFO.prototype.unpack = function (reader) {
        this.score = reader.readUInt();
        this.rank = reader.readUInt();
        this.followTimes = reader.readUInt();
        this.doubleScoreTimes = reader.readUInt();
    };
    return Message_G2C_WORLDQUESTION_INFO;
}(MessageBase));
__reflect(Message_G2C_WORLDQUESTION_INFO.prototype, "Message_G2C_WORLDQUESTION_INFO");
var Message_G2C_WORLDQUESTION_ENTER = (function (_super) {
    __extends(Message_G2C_WORLDQUESTION_ENTER, _super);
    function Message_G2C_WORLDQUESTION_ENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_WORLDQUESTION_ENTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_WORLDQUESTION_ENTER.prototype.pack = function (writer) {
    };
    Message_G2C_WORLDQUESTION_ENTER.prototype.unpack = function (reader) {
    };
    return Message_G2C_WORLDQUESTION_ENTER;
}(MessageBase));
__reflect(Message_G2C_WORLDQUESTION_ENTER.prototype, "Message_G2C_WORLDQUESTION_ENTER");
var Message_G2C_WORLDQUESTION_LEAVE = (function (_super) {
    __extends(Message_G2C_WORLDQUESTION_LEAVE, _super);
    function Message_G2C_WORLDQUESTION_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_WORLDQUESTION_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_G2C_WORLDQUESTION_LEAVE.prototype.pack = function (writer) {
    };
    Message_G2C_WORLDQUESTION_LEAVE.prototype.unpack = function (reader) {
    };
    return Message_G2C_WORLDQUESTION_LEAVE;
}(MessageBase));
__reflect(Message_G2C_WORLDQUESTION_LEAVE.prototype, "Message_G2C_WORLDQUESTION_LEAVE");
var Message_G2C_WORLDQUESTION_ANSWER = (function (_super) {
    __extends(Message_G2C_WORLDQUESTION_ANSWER, _super);
    function Message_G2C_WORLDQUESTION_ANSWER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //0:fail 1:success
    Message_G2C_WORLDQUESTION_ANSWER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.isCorrect = 0;
    };
    Message_G2C_WORLDQUESTION_ANSWER.prototype.pack = function (writer) {
    };
    Message_G2C_WORLDQUESTION_ANSWER.prototype.unpack = function (reader) {
        this.isCorrect = reader.readUInt();
    };
    return Message_G2C_WORLDQUESTION_ANSWER;
}(MessageBase));
__reflect(Message_G2C_WORLDQUESTION_ANSWER.prototype, "Message_G2C_WORLDQUESTION_ANSWER");
var Message_G2C_WORLDQUESTION_QUESTION = (function (_super) {
    __extends(Message_G2C_WORLDQUESTION_QUESTION, _super);
    function Message_G2C_WORLDQUESTION_QUESTION() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_WORLDQUESTION_QUESTION.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.questionIndex = 0; //当前第几题
        this.questionTime = 0; //开始时间
        this.index = 0; //题目索引号
        this.leftAnswer = ""; //选项A
        this.rightAnswer = ""; //选项B
        this.correctAnswer = ""; //正确答案
    };
    Message_G2C_WORLDQUESTION_QUESTION.prototype.pack = function (writer) {
    };
    Message_G2C_WORLDQUESTION_QUESTION.prototype.unpack = function (reader) {
        this.questionIndex = reader.readUInt();
        this.questionTime = reader.readUInt();
        this.index = reader.readUInt();
        this.leftAnswer = reader.readString();
        this.rightAnswer = reader.readString();
        this.correctAnswer = reader.readString();
    };
    return Message_G2C_WORLDQUESTION_QUESTION;
}(MessageBase));
__reflect(Message_G2C_WORLDQUESTION_QUESTION.prototype, "Message_G2C_WORLDQUESTION_QUESTION");
var Message_C2G_WORLDQUESTION_ENTER = (function (_super) {
    __extends(Message_C2G_WORLDQUESTION_ENTER, _super);
    function Message_C2G_WORLDQUESTION_ENTER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_WORLDQUESTION_ENTER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_WORLDQUESTION_ENTER.prototype.pack = function (writer) {
    };
    Message_C2G_WORLDQUESTION_ENTER.prototype.unpack = function (reader) {
    };
    return Message_C2G_WORLDQUESTION_ENTER;
}(MessageBase));
__reflect(Message_C2G_WORLDQUESTION_ENTER.prototype, "Message_C2G_WORLDQUESTION_ENTER");
var Message_C2G_WORLDQUESTION_LEAVE = (function (_super) {
    __extends(Message_C2G_WORLDQUESTION_LEAVE, _super);
    function Message_C2G_WORLDQUESTION_LEAVE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_WORLDQUESTION_LEAVE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_WORLDQUESTION_LEAVE.prototype.pack = function (writer) {
    };
    Message_C2G_WORLDQUESTION_LEAVE.prototype.unpack = function (reader) {
    };
    return Message_C2G_WORLDQUESTION_LEAVE;
}(MessageBase));
__reflect(Message_C2G_WORLDQUESTION_LEAVE.prototype, "Message_C2G_WORLDQUESTION_LEAVE");
var Message_C2G_WORLDQUESTION_ANSWER = (function (_super) {
    __extends(Message_C2G_WORLDQUESTION_ANSWER, _super);
    function Message_C2G_WORLDQUESTION_ANSWER() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_WORLDQUESTION_ANSWER.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.side = 0;
    };
    Message_C2G_WORLDQUESTION_ANSWER.prototype.pack = function (writer) {
        writer.writeUInt(this.side);
    };
    Message_C2G_WORLDQUESTION_ANSWER.prototype.unpack = function (reader) {
    };
    return Message_C2G_WORLDQUESTION_ANSWER;
}(MessageBase));
__reflect(Message_C2G_WORLDQUESTION_ANSWER.prototype, "Message_C2G_WORLDQUESTION_ANSWER");
var Message_C2G_WORLDQUESTION_SKILL = (function (_super) {
    __extends(Message_C2G_WORLDQUESTION_SKILL, _super);
    function Message_C2G_WORLDQUESTION_SKILL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_WORLDQUESTION_SKILL.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.skillToUse = "";
    };
    Message_C2G_WORLDQUESTION_SKILL.prototype.pack = function (writer) {
        writer.writeString(this.skillToUse);
    };
    Message_C2G_WORLDQUESTION_SKILL.prototype.unpack = function (reader) {
    };
    return Message_C2G_WORLDQUESTION_SKILL;
}(MessageBase));
__reflect(Message_C2G_WORLDQUESTION_SKILL.prototype, "Message_C2G_WORLDQUESTION_SKILL");
//# sourceMappingURL=QuestionMessage.js.map
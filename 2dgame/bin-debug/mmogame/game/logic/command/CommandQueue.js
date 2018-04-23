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
var CommandQueue = (function (_super) {
    __extends(CommandQueue, _super);
    function CommandQueue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    CommandQueue.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.queue = [];
        this.curState = 0;
    };
    //子类复写 析构函数
    CommandQueue.prototype.destory = function () {
        this.clear();
    };
    CommandQueue.prototype.start = function () {
        var newCommand = this.queue[0];
        if (newCommand) {
            newCommand.start();
        }
    };
    CommandQueue.prototype.clear = function () {
        this.curState = 1;
        do {
            var v = this.queue.pop();
            if (v == null)
                break;
            v.finish();
            v.deleteObj();
        } while (this.queue.length != 0);
        this.curState = 0;
    };
    CommandQueue.prototype.restartCurrentCommand = function () {
        var command = this.queue[0];
        if (command) {
            command.restart();
        }
    };
    CommandQueue.prototype.pushBack = function (command) {
        command.setOwnerQueue(this);
        this.queue.push(command);
    };
    CommandQueue.prototype.pushFront = function (command) {
        command.setOwnerQueue(this);
        this.queue.push(command[0]);
    };
    CommandQueue.prototype.onCommandFinish = function (command) {
        //如果在命令队列执行的过程中，新的命令从队头插入会造成错误
        var v = this.queue[0];
        if (v == null) {
            return;
        }
        else if (v != command) {
            TLog.Error("CommandQueue.onCommandFinish command is not then current command");
            return;
        }
        //当前命令出列
        this.queue.shift();
        this.start();
    };
    CommandQueue.prototype.isEmpty = function () {
        //命令队列为空（完成）的的条件：
        //1.当前不在队列清空过程；
        //2.如果队列为空；如果队列不为空且只为1，而此时的命令执行完毕。
        var flag = (this.curState == 0);
        var size = this.queue.length;
        if (size == 0) {
        }
        else if (size == 1) {
            var v = this.queue[0];
            flag = flag && v.isFinish();
        }
        else {
            flag = false;
        }
        return flag;
    };
    return CommandQueue;
}(TClass));
__reflect(CommandQueue.prototype, "CommandQueue");
//# sourceMappingURL=CommandQueue.js.map
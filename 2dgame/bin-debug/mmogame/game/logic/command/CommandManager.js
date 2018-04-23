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
var CommandManager = (function (_super) {
    __extends(CommandManager, _super);
    function CommandManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    CommandManager.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.commandQueue = CommandQueue.newObj();
        RegisterEvent(EventDefine.STATE_DEACTIVE, this.onStateDeActive, this);
        RegisterEvent(EventDefine.HERO_RESET_POSITION, this.onHeroResetPosition, this);
    };
    //子类复写 析构函数
    CommandManager.prototype.destory = function () {
        this.commandQueue.deleteObj();
    };
    CommandManager.prototype.start = function () {
        this.commandQueue.start();
    };
    CommandManager.prototype.clear = function () {
        this.commandQueue.clear();
    };
    CommandManager.prototype.insertCommandFront = function (command) {
        this.commandQueue.pushFront(command);
    };
    CommandManager.prototype.appendCommandTail = function (command) {
        if (command == null) {
            return;
        }
        this.commandQueue.pushBack(command);
    };
    CommandManager.prototype.onStateDeActive = function (args) {
        //因为战斗或者其他原因，导致主角停止了
        if (args.stateType == state_type.COMBAT_BASE_STATE) {
            this.commandQueue.restartCurrentCommand();
        }
    };
    CommandManager.prototype.onHeroResetPosition = function (args) {
        //this.commandQueue.restartCurrentCommand() //刷新当前队列
        if (StateManager.getInstance().GetCurrentStateType() == state_type.LIVE_BASE_STATE) {
            this.clear();
        }
    };
    CommandManager.prototype.isCommandQueueEmpty = function () {
        return this.commandQueue.isEmpty();
    };
    return CommandManager;
}(TClass));
__reflect(CommandManager.prototype, "CommandManager");
//# sourceMappingURL=CommandManager.js.map
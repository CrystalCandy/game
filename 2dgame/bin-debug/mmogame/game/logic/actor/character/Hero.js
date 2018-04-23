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
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hero.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.setMovingNotifyEnable(true);
        this.setTouchEnable(false);
        this.lastSendMoveTime = 0;
        this.bAlone = false;
        this.heroLevel = 0;
        this.moveable = false;
    };
    Hero.prototype.destory = function () {
    };
    Hero.prototype.setAloneMode = function (bAlone) {
        this.bAlone = bAlone;
    };
    Hero.prototype.isAloneMode = function () {
        return this.bAlone;
    };
    Hero.prototype.onMoveBegin = function (args) {
        _super.prototype.onMoveBegin.call(this, args);
        FireEvent(EventDefine.HERO_MOVE_BEGIN, args);
        this.updateMoveMessageByTime();
        //let now = Clock.getInstance().getCurCpuTimeByMilliSeconds()
        //if(now - this.lastSendMoveTime >= 400 ){
        //	this.sendMoveMessage()//发送跑步
        //	this.lastSendMoveTime = now
        //}
        //this.lastSendMoveTime = Clock.getInstance().getCurCpuTimeByMilliSeconds()
    };
    Hero.prototype.onMoving = function (args) {
        _super.prototype.onMoving.call(this, args);
        //GameSound.getInstance().playEffect(SystemSound.effect_walk)	
        //PROFILE_START("Hero.onMoving")
        FireEvent(EventDefine.HERO_MOVE, args);
        this.updateMoveMessageByTime();
        //如果是格子改变了的
        //if(args.CellChanged() ){
        //let now = Clock.getInstance().getCurCpuTimeByMilliSeconds()
        //if(now - this.lastSendMoveTime >= 400 ){
        //	this.sendMoveMessage()//发送跑步
        //	this.lastSendMoveTime = now
        //}
        //}
        //PROFILE_STOP("Hero.onMoving")
    };
    Hero.prototype.onMoveStop = function (args) {
        //TLog.Debug("Hero.onMoveStop")
        this.sendMoveMessage(); //发送跑步
        this.lastSendMoveTime = 0;
        _super.prototype.onMoveStop.call(this, args);
        FireEvent(EventDefine.HERO_MOVE_STOP, args);
    };
    Hero.prototype.updateMoveMessageByTime = function () {
        var now = GetCurMillSec();
        if (now - this.lastSendMoveTime >= 400) {
            this.sendMoveMessage(); //发送跑步
            this.lastSendMoveTime = now;
            //TLog.Debug("sendMoveMessage", msg)
        }
    };
    Hero.prototype.sendMoveMessage = function () {
        var _a = MovieSystem.getInstance().isPlayingMovie(), isMovie = _a[0], _ = _a[1];
        if (this.bAlone == false && isMovie == false) {
            var message = GetMessage(opCodes.C2G_MOVE);
            var pos = this.getCellXY();
            message.cellx = pos.x, message.celly = pos.y;
            SendGameMessage(message);
        }
    };
    Hero.prototype.setLevel = function (level) {
        this.heroLevel = level;
    };
    Hero.prototype.getLevel = function () {
        TLog.Debug("getLevel", this.heroLevel);
        return this.heroLevel;
    };
    Hero.prototype.setMoveable = function (moveable) {
        this.moveable = moveable;
    };
    Hero.prototype.isMoveable = function () {
        return this.moveable;
    };
    return Hero;
}(Player));
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=Hero.js.map
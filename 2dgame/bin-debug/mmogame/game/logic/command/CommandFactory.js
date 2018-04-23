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
var CommandFactory = (function (_super) {
    __extends(CommandFactory, _super);
    function CommandFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createCommandAutoRun = function () {
            return CommandAutoRun.newObj();
        };
        return _this;
    }
    CommandFactory.prototype.createCommandMove = function (mapId, cellx, celly, scope, args) {
        scope = scope || 0;
        return CommandMove.newObj(mapId, cellx, celly, scope, args);
    };
    CommandFactory.prototype.createCommandFindWay = function (mapId, cellx, celly, scope, args) {
        scope = scope || 0;
        args = args || {};
        return CommandFindWay.newObj(mapId, cellx, celly, scope, args);
    };
    CommandFactory.prototype.createCommandTalkNpc = function (npcEntryId, npcId) {
        return CommandTalkNpc.newObj(npcEntryId, npcId);
    };
    CommandFactory.prototype.createCommandJumpMap = function (mapId, x, y, op) {
        return CommandJumpMap.newObj(mapId, x, y, op);
    };
    CommandFactory.prototype.createCommandDelayTime = function (delayTime) {
        return CommandDelayTime.newObj(delayTime);
    };
    CommandFactory.prototype.createCommandCallBack = function (handle, obj, param) {
        return CommandCallBack.newObj(handle, obj, param);
    };
    return CommandFactory;
}(TClass));
__reflect(CommandFactory.prototype, "CommandFactory");
//# sourceMappingURL=CommandFactory.js.map
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
var Fight_BaseState = (function (_super) {
    __extends(Fight_BaseState, _super);
    function Fight_BaseState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    Fight_BaseState.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightResult = args[0];
        this.stateInfo = args[1];
        this.actorId = this.stateInfo.target;
    };
    return Fight_BaseState;
}(Fight_BaseElem));
__reflect(Fight_BaseState.prototype, "Fight_BaseState");
//# sourceMappingURL=Fight_BaseState.js.map
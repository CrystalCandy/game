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
var StoryState = (function (_super) {
    __extends(StoryState, _super);
    function StoryState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    StoryState.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mStateType = params[0];
    };
    //子类复写 析构函数
    StoryState.prototype.destory = function () {
    };
    return StoryState;
}(BaseState));
__reflect(StoryState.prototype, "StoryState");
//# sourceMappingURL=StoryState.js.map
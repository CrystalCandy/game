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
var tool;
(function (tool) {
    var ToolUnit = (function (_super) {
        __extends(ToolUnit, _super);
        function ToolUnit() {
            return _super.call(this) || this;
        }
        ToolUnit.prototype.onStart = function () {
        };
        ToolUnit.prototype.onExit = function () {
        };
        return ToolUnit;
    }(TClass));
    tool.ToolUnit = ToolUnit;
    __reflect(ToolUnit.prototype, "tool.ToolUnit");
    var GameToolDelegate = (function (_super) {
        __extends(GameToolDelegate, _super);
        function GameToolDelegate() {
            var _this = _super.call(this) || this;
            _this.mTestUnit = _this.selectToolUnit();
            return _this;
        }
        //游戏开始
        GameToolDelegate.prototype.onGameStart = function () {
            this.mTestUnit.onStart();
        };
        //游戏尝试关闭
        GameToolDelegate.prototype.onGameExit = function () {
            this.mTestUnit.onExit();
        };
        GameToolDelegate.prototype.selectToolUnit = function () {
            var tool_mode = IGlobal.config.getNumber("tool", 1);
            if (tool_mode == 1) {
                return new tool.FightEditor;
            }
            else if (tool_mode == 2) {
            }
            //return new TestUI;
            //return new TestEgret;
            //return new TestEnterMap;
        };
        return GameToolDelegate;
    }(GameModeDelegate));
    tool.GameToolDelegate = GameToolDelegate;
    __reflect(GameToolDelegate.prototype, "tool.GameToolDelegate");
})(tool || (tool = {}));
//# sourceMappingURL=ToolUnit.js.map
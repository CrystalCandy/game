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
var test;
(function (test) {
    var TestUnit = (function (_super) {
        __extends(TestUnit, _super);
        function TestUnit() {
            return _super.call(this) || this;
        }
        TestUnit.prototype.onStart = function () {
        };
        TestUnit.prototype.onExit = function () {
        };
        return TestUnit;
    }(TClass));
    test.TestUnit = TestUnit;
    __reflect(TestUnit.prototype, "test.TestUnit");
    var GameTestDelegate = (function (_super) {
        __extends(GameTestDelegate, _super);
        function GameTestDelegate() {
            var _this = _super.call(this) || this;
            _this.mTestUnit = _this.selectTestUnit();
            return _this;
        }
        //游戏开始
        GameTestDelegate.prototype.onGameStart = function () {
            this.mTestUnit.onStart();
        };
        //游戏尝试关闭
        GameTestDelegate.prototype.onGameExit = function () {
            this.mTestUnit.onExit();
        };
        GameTestDelegate.prototype.selectTestUnit = function () {
            return new test.TestUI;
            //return new TestComponent;
            //return new TestEgret;
            //return new TestEnterMap;
        };
        return GameTestDelegate;
    }(GameModeDelegate));
    test.GameTestDelegate = GameTestDelegate;
    __reflect(GameTestDelegate.prototype, "test.GameTestDelegate");
})(test || (test = {}));
//# sourceMappingURL=TestUnit.js.map
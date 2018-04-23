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
var LaunchHelper = (function (_super) {
    __extends(LaunchHelper, _super);
    function LaunchHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LaunchHelper.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.checkUpdate = IGlobal.config.getBoolean("checkUpdate", true);
        this.checkServerList = IGlobal.config.getBoolean("serverlist", true);
    };
    LaunchHelper.prototype.isCheckUpdate = function () {
        return this.checkUpdate;
    };
    LaunchHelper.prototype.isCheckServerList = function () {
        return this.checkServerList;
    };
    return LaunchHelper;
}(TClass));
__reflect(LaunchHelper.prototype, "LaunchHelper");
//# sourceMappingURL=LaunchHelper.js.map
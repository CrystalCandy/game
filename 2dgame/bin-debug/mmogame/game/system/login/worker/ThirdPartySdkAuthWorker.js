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
//@Author respawn<respawn0503@gmail.com>
//@Created On 2014-7-14 14.32PM(Monday)
//@Brief 第三方SDK验证WORKER
////////////////////////////////////////////////////////////////////////////////
var ThirdPartySdkAuthWorker = (function (_super) {
    __extends(ThirdPartySdkAuthWorker, _super);
    function ThirdPartySdkAuthWorker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ////////////////////////////////////////////////////////////////////////////////
    ThirdPartySdkAuthWorker.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.retCallBack = null; //回调
        this.Target = null; //回调target
        this.loginType = args[0]; //用户数据
    };
    ////////////////////////////////////////////////////////////////////////////////
    // 设置RET回调
    ThirdPartySdkAuthWorker.prototype.setRetCallBack = function (_target, callback) {
        this.retCallBack = callback;
        this.Target = _target;
    };
    ////////////////////////////////////////////////////////////////////////////////
    // 发送验证请求
    ThirdPartySdkAuthWorker.prototype.sendAuthRequest = function () {
        //function callback(code, infoParamList){
        //	//let infoParamList = args.loginInfoParamList
        //	this.retCallBack(this.Target, code, infoParamList)
        //}
        SdkHelper.getInstance().authToSdk(this.loginType, this.retCallBack, this.Target);
    };
    return ThirdPartySdkAuthWorker;
}(TClass));
__reflect(ThirdPartySdkAuthWorker.prototype, "ThirdPartySdkAuthWorker");
//# sourceMappingURL=ThirdPartySdkAuthWorker.js.map
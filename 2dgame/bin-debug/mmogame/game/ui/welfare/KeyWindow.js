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
var KeyWindow = (function (_super) {
    __extends(KeyWindow, _super);
    function KeyWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    KeyWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "key_get_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onKeyGetClick, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var edit = this.mElemList["edit_input"];
        edit.prompt = Localize_cns("WELFARE_TXT23");
        var _a;
    };
    KeyWindow.prototype.onUnLoad = function () {
    };
    KeyWindow.prototype.onShow = function () {
        //RegisterEvent(EventDefine.PAY_TOUZI_JIHUA, this.onRefresh, this)
        this.mElemList["group_tab5"].visible = true;
        // RpcProxy.call("C2G_SendOperatePlayerData",PayActivityIndex.INVEST_PLAN)
        this.onRefresh();
    };
    KeyWindow.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this)
        this.mElemList["group_tab5"].visible = false;
    };
    KeyWindow.prototype.onRefresh = function () {
    };
    KeyWindow.prototype.onKeyGetClick = function () {
        var text = this.mElemList["edit_input"].text;
        if (text == "") {
            MsgSystem.confirmDialog_YES(Localize_cns("WELFARE_TXT24"));
            return;
        }
        var reg1 = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (reg1.test(text)) {
            MsgSystem.confirmDialog_YES(Localize_cns("WELFARE_TXT25"));
            return;
        }
        // let reg = /(\d|[a-zA-Z])/g;
        // if (reg.test(text)) {
        // }
        var len = text.length;
        if (len != 20) {
            //return 
        }
        RpcProxy.call("C2G_PlatFormCode", text);
    };
    return KeyWindow;
}(BaseCtrlWnd));
__reflect(KeyWindow.prototype, "KeyWindow");
//# sourceMappingURL=KeyWindow.js.map
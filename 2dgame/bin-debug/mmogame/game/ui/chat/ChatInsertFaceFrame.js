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
var ChatInsertFaceFrame = (function (_super) {
    __extends(ChatInsertFaceFrame, _super);
    function ChatInsertFaceFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatInsertFaceFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/ChatInsertFaceLayout.exml"];
        this.faceNameInfo = {};
    };
    ChatInsertFaceFrame.prototype.initFaceList = function () {
        this.faceList = [];
        var tempConfig = GameConfig.xmlKeyWordConfig;
        for (var i in tempConfig) {
            var v = tempConfig[i];
            var numKey = tonumber(v.key, -1);
            if (numKey > 0 && numKey < 40 && v.value && v.value["type"] == 2) {
                JsUtil.arrayInstert(this.faceList, v);
            }
        }
    };
    ChatInsertFaceFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.mLayoutNode.setDoModal(true);
        this.initFaceList();
        this.mLayoutNode.addEventListener(egret.TouchEvent.TOUCH_END, this.hideWnd, this);
        this.mElemList = {};
        var elemInfo = [
            (_a = {}, _a["name"] = "group_face", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = null, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        elemInfo = [];
        for (var _i = 0, _b = this.faceList; _i < _b.length; _i++) {
            var vconfig = _b[_i];
            var key = vconfig.key;
            var v = vconfig.value;
            elemInfo.push((_c = {}, _c["index_type"] = eui.Image, _c["name"] = "face_" + key, _c["title"] = null, _c["image"] = v.name, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickAnim, _c));
            this.faceNameInfo["face_" + key] = key;
        }
        UiUtil.createElem(elemInfo, this.mLayoutNode, this.mElemList, this, this.mElemList["group_face"]);
        var _a, _c;
    };
    ChatInsertFaceFrame.prototype.onUnLoad = function () {
    };
    ChatInsertFaceFrame.prototype.onShow = function () {
        UiUtil.registerTouchOutsideEvent(this.onClickOutSide, this, [this.mLayoutNode]);
        this.mLayoutNode.visible = true;
        var showX = 0;
        var showY = 0;
        if (this.showY) {
            showY = this.showY - this.mLayoutNode.height - 10;
        }
        this.mLayoutNode.x = 0;
        this.mLayoutNode.y = showY;
    };
    ChatInsertFaceFrame.prototype.onHide = function () {
        UiUtil.unRegisterTouchOutsideEvent(this.onClickOutSide, this);
        this.mLayoutNode.visible = false;
    };
    ChatInsertFaceFrame.prototype.onClickAnim = function (args) {
        //let key = args.window.GetTitleUtf8()
        var name = args.target.name;
        var key = this.faceNameInfo[name];
        if (key != null && this.selectCallBack) {
            this.selectCallBack.call(this.selfObj, tonumber(key));
            this.hideWnd();
        }
    };
    ChatInsertFaceFrame.prototype.showFaceTable = function (selectCallBack, obj, event) {
        this.selectCallBack = selectCallBack;
        this.selfObj = obj;
        this.showX = null;
        this.showY = null;
        if (event) {
            var outPoint = new egret.Point;
            var obj_1 = event.target;
            var m = obj_1.$getConcatenatedMatrix();
            m.transformPoint(obj_1.x, obj_1.y, outPoint);
            this.showX = outPoint.x;
            this.showY = outPoint.y;
        }
        this.showWnd();
    };
    ChatInsertFaceFrame.prototype.onClickOutSide = function (event) {
        this.hideWnd();
    };
    return ChatInsertFaceFrame;
}(BaseWnd));
__reflect(ChatInsertFaceFrame.prototype, "ChatInsertFaceFrame");
//# sourceMappingURL=ChatInsertFaceFrame.js.map
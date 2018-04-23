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
var ClubAppointFrame = (function (_super) {
    __extends(ClubAppointFrame, _super);
    function ClubAppointFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubAppointFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubAppointLayout.exml"];
    };
    ClubAppointFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "appoint_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onAppointClick, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(egret.TouchEvent.CHANGE, this.changeCurIndex, this);
        for (var i = 0; i < 3; i++) {
            var radioBtn = this.mElemList["radio" + i];
            radioBtn.group = radioGroup;
            radioBtn.value = i;
            radioBtn.selected = false;
            var elem = this.mElemList["text" + i];
            elem.textColor = gui.Color.ublack;
        }
        var _a, _b;
    };
    ClubAppointFrame.prototype.onUnLoad = function () {
    };
    ClubAppointFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.mLayoutNode.setDoModal(true);
        this.refreshFrame();
    };
    ClubAppointFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        this.mLayoutNode.setDoModal(false);
    };
    ClubAppointFrame.prototype.refreshFrame = function () {
        var PosConfig = (_a = {},
            _a[opFactionOfficeOptions.LEADER] = 0,
            _a[opFactionOfficeOptions.SUB_LEADER] = 1,
            _a[opFactionOfficeOptions.MEMBER] = 2,
            _a);
        var radioBtn = this.mElemList["radio" + PosConfig[this.roleInfo.post]];
        radioBtn.selected = true;
        this.curIndex = PosConfig[this.roleInfo.post];
        var postName = ClubSystem.getInstance().getPosName(this.curIndex);
        var text = String.format(Localize_cns("CLUB_TXT66"), this.roleInfo.name, postName);
        this.mElemList["title"].text = text;
        var _a;
    };
    ClubAppointFrame.prototype.onAppointClick = function () {
        var PosConfig = [
            opFactionOfficeOptions.LEADER,
            opFactionOfficeOptions.SUB_LEADER,
            opFactionOfficeOptions.MEMBER,
        ];
        if (this.roleInfo) {
            if (this.roleInfo.post == PosConfig[this.curIndex]) {
                return;
            }
            // let postName = ClubSystem.getInstance().getPosName(this.curIndex)
            // let text = String.format(Localize_cns("CLUB_TXT66"), this.roleInfo.name, postName)
            // let _this = this
            // let t: IDialogCallback = {
            // 	onDialogCallback(result: boolean, userData): void {
            // 		if (result == true) {
            RpcProxy.call("C2G_FactionPost", this.roleInfo.id, PosConfig[this.curIndex]);
            if (this.isVisible()) {
                this.hideWnd();
            }
            // 		}
            // 	}
            // }
            // MsgSystem.confirmDialog(text, t, null)
        }
    };
    ClubAppointFrame.prototype.changeCurIndex = function (event) {
        var tabGroup = event.target;
        this.curIndex = tabGroup.selectedValue;
    };
    ClubAppointFrame.prototype.onShowAndSetData = function (info) {
        this.roleInfo = info;
        this.showWnd();
    };
    return ClubAppointFrame;
}(BaseWnd));
__reflect(ClubAppointFrame.prototype, "ClubAppointFrame");
//# sourceMappingURL=ClubAppointFrame.js.map
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
var LoginCreateRoleFrame = (function (_super) {
    __extends(LoginCreateRoleFrame, _super);
    function LoginCreateRoleFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginCreateRoleFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/login/LoginCreateRoleLayout.exml"];
        this.vocation = 10001;
        this.sex = genderOptions.MALE;
        //10001	人族
        //10002	仙族
        //10003	妖族
        this.vocationList = [10001, 10002, 10003];
        // this.imagePath = {
        // 	[10001]:{//人族
        // 		[genderOptions.MALE] : "dl_renTu01",
        // 		[genderOptions.FEMALE] : "dl_renTu02",
        // 	},
        // 	[10002]:{//仙族
        // 		[genderOptions.MALE] : "dl_xianTu01",
        // 		[genderOptions.FEMALE] : "dl_xianTu02",
        // 	},
        // 	[10003]:{//妖族
        // 		[genderOptions.MALE] : "dl_moTu01",
        // 		[genderOptions.FEMALE] : "dl_moTu02",
        // 	},
        // }
    };
    LoginCreateRoleFrame.prototype.onLoad = function () {
        //this.createLayerNode();
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        //this.setDoModal(true);
        this.initSkinElemList();
        this.setFullScreenRaw(true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_ensure", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onEnsureTap, _a),
            (_b = {}, _b["name"] = "btn_close", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_random", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onRandomNameTap, _c),
            (_d = {}, _d["name"] = "btn_next", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onVocNext, _d),
            (_e = {}, _e["name"] = "btn_pre", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onVocPre, _e),
            (_f = {}, _f["name"] = "edit_name", _f["title"] = null, _f["event_name"] = null, _f["fun_index"] = null, _f),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mLayoutNode.horizontalCenter = 0;
        this.mLayoutNode.verticalCenter = 0;
        this.vocGroup = new eui.RadioButtonGroup();
        //for (let i in GameConfig.ActorRoleConfig) {
        for (var _i = 0, _g = this.vocationList; _i < _g.length; _i++) {
            var id = _g[_i];
            //let id = GameConfig.ActorRoleConfig[i].Id
            var tab = this.mElemList["tab_voc_" + id];
            tab.group = this.vocGroup;
            tab.value = id;
            tab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectVoctation, this);
        }
        var sexGroup = new eui.RadioButtonGroup();
        for (var i in genderOptions) {
            var sex = genderOptions[i];
            var tab = this.mElemList["tab_sex_" + sex];
            tab.group = sexGroup;
            tab.value = sex;
            tab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectsex, this);
        }
        this.mElemList["tab_voc_" + this.vocation].selected = true;
        this.mElemList["tab_sex_" + this.sex].selected = true;
        var _a, _b, _c, _d, _e, _f;
        //this.mElemList["label_tips"].text = String.format(Localize_cns("LOGIN_INPUT_NAME_TIPS2"), NAME_LENGTH_LIMIT)
    };
    LoginCreateRoleFrame.prototype.onUnLoad = function () {
    };
    LoginCreateRoleFrame.prototype.onShow = function () {
        this.onRandomNameTap();
        this.refreshFrame();
        this.lastCreateTime = -1;
        this.mLayoutNode.visible = true;
    };
    LoginCreateRoleFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    LoginCreateRoleFrame.prototype.onSelectVoctation = function (event) {
        this.vocation = event.target.value;
        this.refreshFrame();
    };
    LoginCreateRoleFrame.prototype.onSelectsex = function (event) {
        this.sex = event.target.value;
        this.refreshFrame();
    };
    LoginCreateRoleFrame.prototype.refreshFrame = function () {
        this.mElemList["image_actor"].source = GetProfessionImage(this.vocation, this.sex);
        var tab = this.mElemList["tab_voc_" + this.vocation];
        this.vocGroup.selection = tab;
    };
    LoginCreateRoleFrame.prototype.onEnsureTap = function (event) {
        var name = this.mElemList["edit_name"].text;
        if (StringUtil.isEmpty(name)) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_NAME_CFM1"));
            return;
        }
        //不可使用标点符号，不可使用纯数字，不可使用敏感字
        //if(string.match(name, "[%p]+") != null ||
        if (StringUtil.isNumber(name)) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_NAME_CFM2"));
            return;
        }
        if (WordFilter.checkword(name) == false) {
            MsgSystem.confirmDialog_YES(Localize_cns("LOGIN_NAME_CFM4"));
            return;
        }
        if (name.length > NAME_LENGTH_LIMIT) {
            MsgSystem.confirmDialog_YES(String.format(Localize_cns("LOGIN_NAME_CFM3"), NAME_LENGTH_LIMIT));
            return;
        }
        if (this.lastCreateTime > 0) {
            var currentTime = core.getCpuTime();
            if (currentTime - this.lastCreateTime < 2000) {
                return;
            }
        }
        this.lastCreateTime = core.getCpuTime();
        //10001	人族
        //10002	仙族
        //10003	妖族
        //genderOptions = 
        //{
        //	MALE   = 1, -- 男
        //	FEMALE = 2, -- 女
        //}
        var message = GetMessage(LoginOpcodes.C2L_ROLE_CREATE);
        message.name = name;
        message.role = this.vocation;
        message.sex = this.sex;
        SendLoginMessage(message);
    };
    LoginCreateRoleFrame.prototype.onRandomNameTap = function () {
        var randomName = RandomRobotName();
        this.mElemList["edit_name"].text = randomName;
    };
    LoginCreateRoleFrame.prototype.onVocNext = function () {
        var index = this.vocationList.indexOf(this.vocation);
        index++;
        if (index > 2)
            index = 0;
        this.vocation = this.vocationList[index];
        this.refreshFrame();
    };
    LoginCreateRoleFrame.prototype.onVocPre = function () {
        var index = this.vocationList.indexOf(this.vocation);
        index--;
        if (index < 0) {
            index = 2;
        }
        this.vocation = this.vocationList[index];
        this.refreshFrame();
    };
    return LoginCreateRoleFrame;
}(BaseWnd));
__reflect(LoginCreateRoleFrame.prototype, "LoginCreateRoleFrame");
//# sourceMappingURL=LoginCreateRoleFrame.js.map
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
var ClubCreatFrame = (function (_super) {
    __extends(ClubCreatFrame, _super);
    function ClubCreatFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubCreatFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubCreatLayout.exml"];
    };
    ClubCreatFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.setAlignCenter(true, true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_close_top", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "btn_1", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onCreatSelectClick, _c),
            (_d = {}, _d["name"] = "btn_2", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onCreatSelectClick, _d),
            (_e = {}, _e["name"] = "creat_club_btn", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onCreatClubClick, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        this.mElemList["club_rd1"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["club_rd2"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["info_rd1"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["info_rd2"].setAlignFlag(gui.Flag.H_CENTER);
        var edit = this.mElemList["edit_input"];
        edit.text = "";
        var moneyList = [
            opCreateNeedMoney.POOR,
            opCreateNeedMoney.RICH,
        ];
        var vipList = [
            opCreateNeedVIP.POOR,
            opCreateNeedVIP.RICH,
        ];
        //创建信息
        var str = "";
        for (var i = 1; i <= 2; i++) {
            str = String.format(Localize_cns("CLUB_TXT76"), i, vipList[i - 1], GameConfig.FactionExpConfig[i].maxCount);
            AddRdContent(this.mElemList["info_rd" + i], str, "ht_22_cc", "ublack", 3);
            //消耗元宝
            AddRdContent(this.mElemList["club_rd" + i], String.format(Localize_cns("CLUB_TXT56"), moneyList[i - 1]), "ht_22_cc", "ublack");
        }
        var _a, _b, _c, _d, _e;
    };
    ClubCreatFrame.prototype.onUnLoad = function () {
    };
    ClubCreatFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        RegisterEvent(EventDefine.UPDATE_CLUB_MEINFO, this.isExitWnd, this);
        this.mLayoutNode.setDoModal(true);
        this.selectIndex = 1;
        this.refreshFrame();
    };
    ClubCreatFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
        UnRegisterEvent(EventDefine.UPDATE_CLUB_MEINFO, this.isExitWnd, this);
        this.mLayoutNode.setDoModal(false);
    };
    ClubCreatFrame.prototype.refreshFrame = function () {
        this.mElemList["btn_1"].source = "bh_textDi02";
        this.mElemList["btn_2"].source = "bh_textDi02";
        if (this.selectIndex == 1) {
            this.mElemList["btn_1"].source = "bh_textDi03";
        }
        else {
            this.mElemList["btn_2"].source = "bh_textDi03";
        }
    };
    ClubCreatFrame.prototype.onCreatSelectClick = function (args) {
        var name = args.target.name;
        if (name == "btn_2") {
            this.selectIndex = 2;
        }
        else {
            this.selectIndex = 1;
        }
        this.refreshFrame();
    };
    ClubCreatFrame.prototype.onCreatClubClick = function (args) {
        // let name = args.target.name
        // let content = this.mElemList["edit_input"].text
        // console.log("this.selectIndex=======================>"+this.selectIndex);
        // console.log("content=======================>"+content);
        // if (content.length == 0) {
        // 	MsgSystem.addTagTips(Localize_cns("CLUB_TXT53"))
        // }else if(content.length > 6)  {
        // 	MsgSystem.addTagTips(Localize_cns("CLUB_TXT54"))
        // }else{
        // 	//发协议
        // 	//检测消耗条件之后
        // 	let gold = GetHeroProperty("gold")
        // 	let isCanCreat = true
        // 	if(isCanCreat){
        // 		//facName, facIntroduction, logoFaction
        // 		let facName = content
        // 		let facIntroduction = ""
        // 		let logoFaction = "1"
        // 		RpcProxy.call("C2G_FactionCreate",facName,facIntroduction,logoFaction)
        // 	}
        // }
        this.testCreat();
    };
    ClubCreatFrame.prototype.isExitWnd = function (args) {
        var event = ClubSystem.getInstance().getRoleClubInfo();
        if (event.facId != 0) {
            //MsgSystem.addTagTips("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            var wnd = WngMrg.getInstance().getWindow("ClubListFrame");
            if (wnd.isVisible()) {
                wnd.hideWnd();
            }
            // daiyouhua
            var wnd1 = WngMrg.getInstance().getWindow("ClubCreatFrame");
            if (wnd1.isVisible()) {
                wnd1.hideWnd();
            }
            //特效
            //GameSound.getInstance().playEffect(SystemSound.effect_MakeLegion)
            //打开帮派界面
            WngMrg.getInstance().showWindow("ClubFrame");
        }
    };
    ClubCreatFrame.prototype.testCreat = function () {
        var name = this.mElemList["edit_input"].text;
        var heroInfo = GetHeroPropertyInfo();
        if (heroInfo["gold"] < opFactionBaseOptions.CREATE_GOLD) {
            // let wnd = WngMrg.getInstance().getWindow("QuickGainFrame")
            // let itemConfig: any = [["zuanshi", 0], ["ClubCreateFrame"]]
            // wnd.showQuickGainFrame(itemConfig)
            // MsgSystem.addTagTips(Localize_cns("GOLD_NOENGOUGH"))
            ExecuteMainFrameFunction("chongzhi");
            return;
        }
        if (heroInfo["faction"] != 0) {
            MsgSystem.addTagTips(Localize_cns("LEGIONHINT7"));
            return;
        }
        //是否为空
        if (name == "") {
            MsgSystem.confirmDialog_YES(Localize_cns("CLUB_TXT24"));
            return;
        }
        if (/^\d+$/.test(name)) {
            MsgSystem.confirmDialog_YES(Localize_cns("LEGIONHINT56"));
            return;
        }
        //TODO:敏感字检测
        if (WordFilter.checkword(name) == false) {
            MsgSystem.confirmDialog_YES(Localize_cns("LEGIONHINT57"));
            return false;
        }
        //长度
        var len = name.length;
        if (len > NAME_LENGTH_LIMIT) {
            MsgSystem.confirmDialog_YES(Localize_cns("CLUB_TXT54")); //String.format(Localize_cns("LEGIONHINT58"), NAME_LENGTH_LIMIT))
            return;
        }
        var facName = name;
        var facIntroduction = "";
        var logoFaction = 1;
        var level = this.selectIndex;
        RpcProxy.call("C2G_FactionCreate", facName, facIntroduction, logoFaction, level);
    };
    return ClubCreatFrame;
}(BaseWnd));
__reflect(ClubCreatFrame.prototype, "ClubCreatFrame");
//# sourceMappingURL=ClubCreatFrame.js.map
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
var XianLvFrame = (function (_super) {
    __extends(XianLvFrame, _super);
    function XianLvFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XianLvFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/xianlv/XianLvLayout.exml"];
        this.tabIndex = -1;
    };
    XianLvFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "btn_back", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.hideWnd, _b),
            (_c = {}, _c["name"] = "roman_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onRomanClick, _c),
            (_d = {}, _d["name"] = "state_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onStateClick, _d),
            (_e = {}, _e["name"] = "btn_look", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onLookClick, _e),
            (_f = {}, _f["name"] = "add_btn", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onAddClick, _f),
            (_g = {}, _g["name"] = "btn_up1", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onUpClick, _g),
            (_h = {}, _h["name"] = "btn_autoUp1", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onAutoClick, _h),
            (_j = {}, _j["name"] = "btn_jiHuo", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.onJiHuoClick, _j),
            (_k = {}, _k["name"] = "top_right_btn", _k["title"] = null, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.onRightClick, _k),
            (_l = {}, _l["name"] = "top_left_btn", _l["title"] = null, _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = this.onLeftClick, _l),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var tabInfoList = [
            { name: "xianLv", wnd: XianLvXianLvWindow.newObj(this.mLayoutNode, this), check: this.xianlvClick, obj: this },
            { name: "fazhen", wnd: XianLvZhenFaWindow.newObj(this.mLayoutNode, this), check: this.fazhenClick, obj: this },
            { name: "xianwei", wnd: XianLvXianWeiWindow.newObj(this.mLayoutNode, this), check: this.xianweiClick, obj: this },
            { name: "shengXing", wnd: XianLvShengXingWindow.newObj(this.mLayoutNode, this), check: this.shengxingClick, obj: this },
        ];
        this.tabWndList = UITabWndList.newObj(this.mLayoutNode, this.mElemList, tabInfoList);
        this.tabWndList.setSelectedCallback(this.refreshDotTips, this);
        this.mElemList["material_rd"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_starCost"].setAlignFlag(gui.Flag.LEFT_CENTER);
        this.mElemList["rd_access"].setAlignFlag(gui.Flag.CENTER_TOP);
        this.mElemList["rd_skill_star"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var group = this.mElemList["xianLv_group"];
        this.xianlvListBox = UIXianLvListBox.newObj(this.mLayoutNode, "xianLv", 0, 0, group.width, group.height, group);
        this.tabWndList.setSelectedCallback(this.refreshDotTips, this);
        this.selectId = this.xianlvListBox.setXianLvList();
        this.xianlvListBox.setClickListner(this.autoReceiveSelect, this);
        this.mElemList["skillBox3"] = UISkillBox.newObj(this.mLayoutNode, "skillBox3", 0, 0, this.mElemList["skill_image"]);
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    };
    XianLvFrame.prototype.onUnLoad = function () {
        if (this.Player) {
            var actorview = this.mElemList["actor_xianLv"];
            this.Player.leaveViewer(actorview);
            this.Player.deleteObj();
            this.Player = null;
        }
    };
    XianLvFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = true;
        this.tabWndList.setWndVisible(true);
        if (this.tabIndex != -1) {
            this.tabWndList.changeTabWithIndex(this.tabIndex);
        }
    };
    XianLvFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.ACTOR_XIANLV_UPDATE, this.onRefresh, this);
        this.mLayoutNode.visible = false;
        this.tabWndList.setWndVisible(false);
    };
    XianLvFrame.prototype.showWithIndex = function (index) {
        this.tabIndex = index;
        this.showWnd();
    };
    XianLvFrame.prototype.autoReceiveSelect = function (xianLv) {
        this.selectId = xianLv.Id;
        this.onRefresh();
    };
    ///////////////////////////
    XianLvFrame.prototype.onRefresh = function () {
        this.mElemList["up_star_wnd"].visible = false;
        this.mElemList["star_wnd"].visible = false;
        this.mElemList["upgrade_wnd"].visible = false;
        this.mElemList["wei_jiHuo"].visible = false;
        this.mElemList["unlock_wnd"].visible = false;
        this.mElemList["state_btn"].visible = false;
        this.mElemList["btn_jiHuo"].visible = false;
        this.mElemList["rd_access"].visible = false;
        this.mElemList["stage_wnd"].visible = false;
        this.mElemList["name_rd"].visible = false;
        //common
        //
        var level = 1;
        if (XianLvSystem.getInstance().isExit(this.selectId)) {
            level = XianLvSystem.getInstance().getLevel(this.selectId);
        }
        this.mElemList["stage_xianLv"].text = level + Localize_cns("ROLE_TXT39");
        //战力
        var star = XianLvSystem.getInstance().getStar(this.selectId) || 1;
        this.onRefreshStar(star);
        //rd_add
        var jiHuoList = XianLvSystem.getInstance().getJiHuoList();
        var zhanLiTotal = XianLvSystem.getInstance().getTotalForce();
        var fightList = XianLvSystem.getInstance().getFightList();
        var addStr = String.format(Localize_cns("XIANLV_TXT1"), zhanLiTotal, size_t(jiHuoList), size_t(fightList));
        AddRdContent(this.mElemList["add_rd"], addStr, "ht_20_cc", "black");
        var skillId = GameConfig.ActorXianLvConfig[this.selectId]["skilllist"];
        this.mElemList["skillBox3"].setTipsListner(this.onSkillClick, this, this.selectId);
        this.mElemList["skillBox3"].updateXianLvSkill(skillId, star);
        //	AddRdContent(this.mElemList["rd_skill_star"], xingStr, "ht_24_cc")
        //
        //判断是否激活
        if (XianLvSystem.getInstance().isExit(this.selectId)) {
            this.mElemList["star_wnd"].visible = true;
            this.mElemList["stage_wnd"].visible = true;
            this.zhanLi = XianLvSystem.getInstance().getForce(this.selectId);
            var jieStr = String.format(Localize_cns("ROLE_TXT39"), level);
            this.mElemList["stage_xianLv"].text = jieStr;
            //state_btn
            this.mElemList["state_btn"].visible = true;
            var isFight = false;
            for (var k in fightList) {
                if (tonumber(k) == this.selectId) {
                    isFight = true;
                }
            }
            if (isFight) {
                this.mElemList["state_btn"].source = "ty_tongYongBt8";
                this.mElemList["state_btn"].text = Localize_cns("XIANLV_TXT2");
            }
            else {
                this.mElemList["state_btn"].source = "ty_tongYongBt7";
                this.mElemList["state_btn"].text = Localize_cns("XIANLV_TXT3");
            }
            if (this.tabIndex == 0) {
                this.mElemList["upgrade_wnd"].visible = true;
                //经验条xianLv_progress
                var upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"][level];
                var curExp = XianLvSystem.getInstance().getExpById(this.selectId);
                var maxEXP = upgradeConfig.maxexp;
                UiUtil.updateProgress(this.mElemList["xianLv_progress"], curExp, maxEXP);
                //消耗,消耗。。%s#JINBI#rf%d,,
                var needItem = GameConfig.itemConfig[upgradeConfig.itemid]; //upgradeConfig.itemid
                var hadCount = ItemSystem.getInstance().getItemCount(upgradeConfig.itemid);
                var needCount = upgradeConfig.itemnum;
                var str = hadCount + "/" + needCount;
                if (hadCount >= needCount) {
                    str = "#lime" + str;
                }
                else {
                    str = "#red" + str;
                }
                //
                //if(upgradeConfig.moneyunit == 1){
                //	}
                var costStr = String.format(Localize_cns("ROLE_TXT10"), GetTagIcon(20002), str, upgradeConfig.money);
                AddRdContent(this.mElemList["rd_cost"], costStr, "ht_24_cc", "black");
            }
            else if (this.tabIndex == 3) {
                for (var i = 1; i <= 2; i++) {
                    if (!this.mElemList["skillBox" + i]) {
                        this.mElemList["skillBox" + i] = UISkillBox.newObj(this.mLayoutNode, "skillBox" + i, 0, 0, this.mElemList["upstar_skill" + i]);
                    }
                    this.mElemList["skillBox" + i].updateXianLvSkill(skillId, star + i - 1);
                    this.mElemList["skillBox" + i].setTipsListner(this.onSkillClick, this, this.selectId);
                }
                if (star >= 7) {
                    this.mElemList["upstar_skill2"].visible = false;
                    this.mElemList["image_jiantou"].visible = false;
                    this.mElemList["upstar_skill1"].x = 60;
                }
                else {
                    this.mElemList["upstar_skill2"].visible = true;
                    this.mElemList["image_jiantou"].visible = true;
                    this.mElemList["upstar_skill1"].x = 0;
                }
                this.mElemList["up_star_wnd"].visible = true;
                var itemid = GameConfig.FunUpStarConfig["XianLv"][this.selectId].itemid;
                var itemnum = GameConfig.FunLevelNumConfig["XianLv"][star].num;
                var had = ItemSystem.getInstance().getItemCount(itemid);
                var itemName = GameConfig.itemConfig[itemid].name;
                if (!this.mElemList["upStarItemBox"]) {
                    this.mElemList["upStarItemBox"] = UIItemBox.newObj(this.mLayoutNode, "upStarItemBox", 40, 45, this.mElemList["up_star_wnd"]);
                }
                this.mElemList["upStarItemBox"].updateByEntry(itemid);
                var hadStr = tostring(had);
                if (had >= itemnum) {
                    hadStr = "#lime" + hadStr;
                }
                else {
                    hadStr = "#red" + hadStr;
                }
                var quality = GameConfig.ActorXianLvConfig[this.selectId].quality;
                var nameColor = GetQualityColorStr(quality);
                itemName = "#" + nameColor + itemName;
                var costStr = String.format(Localize_cns("XIANLV_TXT4"), itemName, itemnum, hadStr);
                AddRdContent(this.mElemList["rd_upStarCost"], costStr, "ht_24_cc", "black");
                AddRdContent(this.mElemList["rd_way"], Localize_cns("XIANLV_TXT5"), "ht_24_cc", "lime");
            }
            else {
            }
        }
        else {
            this.mElemList["unlock_wnd"].visible = true;
            this.mElemList["wei_jiHuo"].visible = true;
            var costId = GameConfig.ActorXianLvConfig[this.selectId].itemid;
            var count = GameConfig.ActorXianLvConfig[this.selectId].itemnum;
            var name_1 = GameConfig.itemConfig[costId].name;
            //
            if (!this.mElemList["costItemBox"]) {
                this.mElemList["costItemBox"] = UIItemBox.newObj(this.mLayoutNode, "costItemBox", 0, 45, this.mElemList["group_unlock"]);
            }
            this.mElemList["costItemBox"].updateByEntry(costId);
            //rd_access rd_starCost
            var had = ItemSystem.getInstance().getItemCount(costId);
            var tempStr = String.format(Localize_cns("XIANLV_TXT7"), had, count);
            if (had >= count) {
                tempStr = "#lime" + tempStr;
                this.mElemList["btn_jiHuo"].visible = true;
            }
            else {
                tempStr = "#red" + tempStr;
                this.mElemList["rd_access"].visible = true;
            }
            var quality = GameConfig.ActorXianLvConfig[this.selectId].quality;
            var nameColor = GetQualityColorStr(quality);
            name_1 = "#" + nameColor + name_1;
            var starStr = String.format(Localize_cns("XIANLV_TXT6"), name_1, tempStr);
            AddRdContent(this.mElemList["rd_starCost"], starStr, "ht_24_cc", "ublack");
            AddRdContent(this.mElemList["rd_access"], Localize_cns("XIANLV_TXT5"), "ht_24_cc");
            var proList = GetXianLvProperty(this.selectId);
            this.zhanLi = GetForceMath(proList);
        }
        //actor
        if (this.Player == null) {
            this.Player = Player.newObj();
        }
        this.onRefreshActor(this.selectId);
        DrawNumberStringImage(this.mElemList["bImage_xianLv"], "zhanLi_", "z" + this.zhanLi, 0, 0, -3);
        this.checkAutoUpgrade(this.mElemList["btn_autoUp1"]);
    };
    ///--------------btn响应事件
    XianLvFrame.prototype.onStateClick = function () {
        var name = this.mElemList["state_btn"].text;
        if (name == Localize_cns("XIANLV_TXT3")) {
            var wnd = WngMrg.getInstance().getWindow("XianLvFightFrame");
            wnd.onShowWnd(this.selectId);
        }
        else if (name == Localize_cns("XIANLV_TXT2")) {
            //	let wnd = WngMrg.getInstance().getWindow("XianLvFightFrame")
            //	wnd.onShowWnd(this.selectId)
        }
    };
    XianLvFrame.prototype.onAddClick = function () {
        var name = GameConfig.ActorXianLvConfig[this.selectId].name;
        var wnd = WngMrg.getInstance().getWindow("XianLvPropertyFrame");
        wnd.onShowWnd(this.selectId);
    };
    XianLvFrame.prototype.onUpClick = function (event) {
        var level = XianLvSystem.getInstance().getLevel(this.selectId);
        var upgradeConfig = GameConfig.FunUpgradeStageConfig["XianLv"];
        var needItemid = upgradeConfig[level].itemid;
        var needItemNum = upgradeConfig[level].itemnum;
        var had = ItemSystem.getInstance().getItemCount(needItemid);
        //消耗货币
        var moneyUnit = upgradeConfig[level].moneyunit;
        var ownMoney = GetHeroMoney(moneyUnit);
        var costMoney = upgradeConfig[level].money;
        //判断货币是否足够
        if (ownMoney < costMoney) {
            //直接弹出对应的货币购买界面
            MsgSystem.addTagTips("NO_MONEY");
            this.mElemList["btn_autoUp1"].text = Localize_cns("AUTO_BUY");
            this.mElemList["btn_autoUp1"].selected = false;
            this.mElemList["btn_up1"].enabled = true;
            return;
        }
        if (had < needItemNum) {
            this.mElemList["btn_autoUp1"].text = Localize_cns("AUTO_BUY");
            this.mElemList["btn_autoUp1"].selected = false;
            this.mElemList["btn_up1"].enabled = true;
            var wnd = WngMrg.getInstance().getWindow("GoodsAsseceFrame");
            wnd.onShowWnd(needItemid, true);
            this.mElemList["btn_autoUp1"].text = Localize_cns("AUTO_BUY");
            this.mElemList["btn_autoUp1"].selected = false;
            this.mElemList["btn_up1"].enabled = true;
            return;
        }
        var autoBuy;
        autoBuy = (this.mElemList["cBox_auto"].selected == true) ? 1 : 0;
        RpcProxy.call("C2G_ACTOR_XIANLV_UPGRADE", this.selectId, autoBuy);
    };
    //自动更新
    XianLvFrame.prototype.onAutoClick = function (event) {
        var btn = event.target;
        btn.selected = !btn.selected;
        btn.level = XianLvSystem.getInstance().getLevel(this.selectId) || 0;
        if (btn.selected) {
            btn.text = Localize_cns("STOP");
            this.mElemList["btn_up1"].enabled = false;
        }
        else {
            btn.text = Localize_cns("AUTO_BUY");
            this.mElemList["btn_up1"].enabled = true;
        }
        this.checkAutoUpgrade(btn);
    };
    XianLvFrame.prototype.checkAutoUpgrade = function (btn) {
        if (btn.selected) {
            var curLv = XianLvSystem.getInstance().getLevel(this.selectId) || 0;
            var oldLv = btn.level || 0;
            if (curLv == oldLv) {
                this.onUpClick(null);
            }
            else {
                btn.text = Localize_cns("AUTO_BUY");
                this.mElemList["btn_up1"].enabled = true;
            }
        }
    };
    XianLvFrame.prototype.onJiHuoClick = function () {
        RpcProxy.call("C2G_ACTOR_XIANLV_UNLOCK", this.selectId);
    };
    XianLvFrame.prototype.onRomanClick = function () {
        //  let wnd = WngMrg.getInstance().getWindow("XianLvQiYuanFrame")
        //	wnd.showWnd()
    };
    XianLvFrame.prototype.onLeftClick = function () {
        this.xianlvListBox.leftMove();
    };
    XianLvFrame.prototype.onRightClick = function () {
        this.xianlvListBox.rightMove();
    };
    XianLvFrame.prototype.onLookClick = function () {
        var wnd = WngMrg.getInstance().getWindow("XianLvAttributeFrame");
        wnd.onShowWnd(this.selectId);
    };
    XianLvFrame.prototype.onSkillClick = function (id, level, userdata) {
        var wnd = WngMrg.getInstance().getWindow("XianLvSkillDesFrame");
        wnd.onShowWnd(id, level);
    };
    //////radiobutton
    XianLvFrame.prototype.xianlvClick = function () {
        return true;
    };
    XianLvFrame.prototype.fazhenClick = function () {
        return true;
    };
    XianLvFrame.prototype.xianweiClick = function () {
        //MsgSystem.addTagTips(Localize_cns("45级开启"))
        return true;
    };
    XianLvFrame.prototype.shengxingClick = function () {
        //MsgSystem.addTagTips(Localize_cns("45级开启"))
        return true;
    };
    //////刷新
    XianLvFrame.prototype.onRefreshStar = function (num) {
        for (var i = 1; i <= 7; i++) {
            if (!this.mElemList["star_" + i]) {
                var info = [
                    (_a = {}, _a["index_type"] = eui.Image, _a["name"] = "star_" + i, _a["image"] = "ty_starDi01", _a["x"] = 0, _a["y"] = 0, _a["w"] = 0, _a["h"] = 0, _a["messageFlag"] = true, _a),
                ];
                UiUtil.createElem(info, this.mLayoutNode, this.mElemList, this, this.mElemList["star_wnd"]);
            }
        }
        for (var i = 1; i <= num; i++) {
            this.mElemList["star_" + i].source = "ty_star01";
        }
        if (num < 7) {
            for (var i = num + 1; i <= 7; i++) {
                this.mElemList["star_" + i].source = "ty_starDi01";
            }
        }
        var _a;
    };
    XianLvFrame.prototype.onRefreshActor = function (id) {
        var actorview = this.mElemList["actor_xianLv"];
        var actor = this.Player;
        var modelId = id;
        actor.loadModel(modelId);
        actor.changeAction("idle", 1.0, true);
        actor.setPositionXY(0, 0);
        actor.enterViewer(actorview);
        //缩放
        actor.setScale(1.0);
        //方向
        actor.setDir(3);
    };
    ////////////////////红点提示/////////////////////
    //自定义红点继承实现
    XianLvFrame.prototype.refreshDotTipsImp = function () {
        FunUITools.refreshEquipDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
        FunUITools.refreshSkillDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
        FunUITools.refreshUpgradeDotTIps(this.tabWndList.getCurrentWnd().type, this.tabWndList.getCurrentWnd());
        this.refreshIconDot();
    };
    XianLvFrame.prototype.getDotTipsArgsImp = function (checkParam) {
        var args = {};
        args.index = this.tabWndList.getTabIndex();
        args.type = this.tabWndList.getCurrentWnd().type;
        args.xianlvId = this.selectId;
        return args;
    };
    XianLvFrame.prototype.refreshIconDot = function () {
        var index = this.tabWndList.getTabIndex();
        this.xianlvListBox.onRefreshDotTips(this, index);
    };
    return XianLvFrame;
}(BaseWnd));
__reflect(XianLvFrame.prototype, "XianLvFrame");
//# sourceMappingURL=XianLvFrame.js.map
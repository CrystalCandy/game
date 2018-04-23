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
var ClubMapFrame = (function (_super) {
    __extends(ClubMapFrame, _super);
    function ClubMapFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClubMapFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/club/ClubMapLayout.exml"];
        this.isHide = false;
    };
    ClubMapFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true, false);
        this.initSkinElemList();
        this.mLayoutNode.setLayer(0 /* Bottom */);
        this.mLayoutNode.touchEnabled = false;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.leaveClubMap, _a),
            (_b = {}, _b["name"] = "control_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.startMoveAction, _b),
            (_c = {}, _c["name"] = "convene_btn", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickConvene, _c),
            (_d = {}, _d["name"] = "purchase_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClickPurchase, _d),
            (_e = {}, _e["name"] = "colt_btn", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onekeyCollect, _e),
            (_f = {}, _f["name"] = "intr_btn", _f["title"] = null, _f["event_name"] = egret.TouchEvent.TOUCH_TAP, _f["fun_index"] = this.onekeyInstrusion, _f),
            (_g = {}, _g["name"] = "colt_get_btn", _g["title"] = null, _g["event_name"] = egret.TouchEvent.TOUCH_TAP, _g["fun_index"] = this.onGetCollectPrize, _g),
            (_h = {}, _h["name"] = "intr_get_btn", _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onGetInstrusionPrize, _h),
            (_j = {}, _j["name"] = "colt_reset_btn", _j["title"] = null, _j["event_name"] = egret.TouchEvent.TOUCH_TAP, _j["fun_index"] = this.resetCollectTask, _j),
            (_k = {}, _k["name"] = "intr_reset_btn", _k["title"] = null, _k["event_name"] = egret.TouchEvent.TOUCH_TAP, _k["fun_index"] = this.resetInstrusionTask, _k),
            (_l = {}, _l["name"] = "map_wnd", _l["title"] = null, _l["event_name"] = egret.TouchEvent.TOUCH_TAP, _l["fun_index"] = this.onClickMapWnd, _l)
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 0; i < 3; i++) {
            this.mElemList["colt_item" + i] = UIItemBox.newObj(this.mLayoutNode, "colt_item" + i, 0, 0, this.mElemList["colt_prize_wnd"], 0.75);
            this.mElemList["intr_item" + i] = UIItemBox.newObj(this.mLayoutNode, "intr_item" + i, 0, 0, this.mElemList["intr_prize_wnd"], 0.75);
        }
        var coltCheck = this.mElemList["colt_check"];
        var intrCheck = this.mElemList["intr_check"];
        coltCheck.addEventListener(egret.TouchEvent.CHANGE, this.changeColtCheck, this);
        intrCheck.addEventListener(egret.TouchEvent.CHANGE, this.chaneIntrCheck, this);
        var data = (_m = {}, _m["startX"] = 0, _m["startY"] = 66, _m["endX"] = -200, _m["endY"] = 66, _m["moveType"] = "inertional", _m);
        this.hideAction = MoveAction.newObj(this.mElemList["task_wnd"], 300, data, null, this);
        var data = (_o = {}, _o["startX"] = -200, _o["startY"] = 66, _o["endX"] = 0, _o["endY"] = 66, _o["moveType"] = "inertional", _o);
        this.showAction = MoveAction.newObj(this.mElemList["task_wnd"], 300, data, null, this);
        this.mElemList["colt_cost"].setAlignFlag(gui.Flag.RIGHT);
        this.mElemList["intr_cost"].setAlignFlag(gui.Flag.RIGHT);
        this.mElemList["map_name"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["map_xy"].setAlignFlag(gui.Flag.H_CENTER);
        this.mElemList["task_group"].touchEnabled = false;
        this.mElemList["colt_progress"].visible = false;
        this.mElemList["colt_ctrl_wnd"].visible = false;
        this.mElemList["colt_get_wnd"].visible = false;
        this.mElemList["colt_reset_wnd"].visible = false;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    };
    ClubMapFrame.prototype.onUnLoad = function () {
    };
    ClubMapFrame.prototype.onShow = function () {
        RegisterEvent(EventDefine.PLAYER_MOVE, this.refreshMapPos, this);
        RegisterEvent(EventDefine.CLUB_TASK_COMP_REFRESH, this.refreshFrame, this);
        RegisterEvent(EventDefine.HERO_ENTER_MAP, this.refreshMapPos, this);
        this.mLayoutNode.visible = true;
        this.refreshFrame();
    };
    ClubMapFrame.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.PLAYER_MOVE, this.refreshMapPos, this);
        UnRegisterEvent(EventDefine.CLUB_TASK_COMP_REFRESH, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.HERO_ENTER_MAP, this.refreshMapPos, this);
        this.mLayoutNode.visible = false;
        this.hideAction.deleteObj();
        this.showAction.deleteObj();
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
    };
    ClubMapFrame.prototype.refreshFrame = function () {
        var clubInfo = ClubSystem.getInstance().getCurClubInfo();
        var recordList = getSaveRecord(opSaveRecordKey.facMapTaskFinishCount) || [];
        var coltTime = recordList[0] || 0;
        var coltLimit = GameConfig.FactionMapTaskConfig[1][clubInfo.level].maxCount;
        var intrTime = recordList[1] || 0;
        var intrLimit = GameConfig.FactionMapTaskConfig[2][clubInfo.level].maxCount;
        var prizeList = getSaveRecord(opSaveRecordKey.facMapTaskPrizeGet) || [];
        var coltRecord = prizeList[0] || 0;
        var intrRecord = prizeList[1] || 0;
        this.mElemList["colt_title"].text = String.format(Localize_cns("CLUB_TXT32"), coltTime, coltLimit);
        this.mElemList["intr_title"].text = String.format(Localize_cns("CLUB_TXT33"), intrTime, intrLimit);
        var coltItem = AnalyPrizeFormat(GameConfig.FactionMapTaskConfig[1][clubInfo.level].prizeAll);
        var intrItem = AnalyPrizeFormat(GameConfig.FactionMapTaskConfig[2][clubInfo.level].prizeAll);
        for (var i = 0; i < 3; i++) {
            if (coltItem[i]) {
                this.mElemList["colt_item" + i].updateByEntry(coltItem[i][0], coltItem[i][1]);
                this.mElemList["colt_item" + i].setVisible(true);
            }
            else {
                this.mElemList["colt_item" + i].setVisible(false);
            }
            if (intrItem[i]) {
                this.mElemList["intr_item" + i].updateByEntry(intrItem[i][0], intrItem[i][1]);
                this.mElemList["intr_item" + i].setVisible(true);
            }
            else {
                this.mElemList["intr_item" + i].setVisible(false);
            }
        }
        if (coltTime == coltLimit) {
            this.mElemList["colt_ctrl_wnd"].visible = false;
            //领取记录判断
            if (coltRecord == 0) {
                this.mElemList["colt_get_wnd"].visible = true;
                this.mElemList["colt_reset_wnd"].visible = false;
                this.mElemList["colt_cost"].clear();
            }
            else {
                this.mElemList["colt_get_wnd"].visible = false;
                this.mElemList["colt_reset_wnd"].visible = true;
                this.mElemList["colt_cost"].setAlignFlag(gui.Flag.H_CENTER);
                AddRdContent(this.mElemList["colt_cost"], "#BIND_YUANBAO" + GameConfig.FactionMapTaskConfig[1][clubInfo.level].resetMoney, "ht_20_cc", "orange");
            }
            //移出npc位置
            GetActivity(ActivityDefine.ClubMap).removeCollectNpc();
        }
        else {
            this.mElemList["colt_ctrl_wnd"].visible = true;
            this.mElemList["colt_get_wnd"].visible = false;
            this.mElemList["colt_reset_wnd"].visible = false;
            this.mElemList["colt_cost"].setAlignFlag(gui.Flag.RIGHT);
            AddRdContent(this.mElemList["colt_cost"], "#YUANBAO" + GameConfig.FactionMapTaskConfig[1][clubInfo.level].finishMoney, "ht_20_cc", "orange");
            //刷新npc位置
            GetActivity(ActivityDefine.ClubMap).changeCollectNpc();
        }
        if (intrTime == intrLimit) {
            this.mElemList["intr_ctrl_wnd"].visible = false;
            //领取记录判断
            if (intrRecord == 0) {
                this.mElemList["intr_get_wnd"].visible = true;
                this.mElemList["intr_reset_wnd"].visible = false;
                this.mElemList["intr_cost"].clear();
            }
            else {
                this.mElemList["intr_get_wnd"].visible = false;
                this.mElemList["intr_reset_wnd"].visible = true;
                this.mElemList["intr_cost"].setAlignFlag(gui.Flag.H_CENTER);
                AddRdContent(this.mElemList["intr_cost"], "#BIND_YUANBAO" + GameConfig.FactionMapTaskConfig[2][clubInfo.level].resetMoney, "ht_20_cc", "orange");
            }
            //移出npc位置
            GetActivity(ActivityDefine.ClubMap).removeInstrusionNpc();
        }
        else {
            this.mElemList["intr_ctrl_wnd"].visible = true;
            this.mElemList["intr_get_wnd"].visible = false;
            this.mElemList["intr_reset_wnd"].visible = false;
            this.mElemList["intr_cost"].setAlignFlag(gui.Flag.RIGHT);
            AddRdContent(this.mElemList["intr_cost"], "#YUANBAO" + GameConfig.FactionMapTaskConfig[2][clubInfo.level].finishMoney, "ht_20_cc", "orange");
        }
        if (this.isHide) {
            UiUtil.setXY(this.mElemList["task_wnd"], -200, 66);
        }
        else {
            UiUtil.setXY(this.mElemList["task_wnd"], 0, 66);
        }
    };
    ClubMapFrame.prototype.leaveClubMap = function () {
        var a = GetActivity(ActivityDefine.ClubMap);
        a.requestStop();
    };
    ClubMapFrame.prototype.startMoveAction = function (event) {
        if (this.hideAction.isRunning() || this.showAction.isRunning()) {
            return;
        }
        this.isHide = !this.isHide;
        if (this.isHide) {
            this.hideAction.run();
        }
        else {
            this.showAction.run();
        }
    };
    ClubMapFrame.prototype.onClickConvene = function () {
        MsgSystem.confirmDialog_YES(Localize_cns("CLUB_TXT103"));
    };
    ClubMapFrame.prototype.onClickPurchase = function () {
        ExecuteMainFrameFunction("shougou");
    };
    ClubMapFrame.prototype.onekeyCollect = function (args) {
        var clubInfo = ClubSystem.getInstance().getCurClubInfo();
        var str = String.format(Localize_cns("CLUB_TXT102"), GameConfig.FactionMapTaskConfig[1][clubInfo.level].finishMoney);
        var t = {
            onDialogCallback: function (result, userData) {
                if (result) {
                    var myRmb = GetHeroProperty("gold");
                    if (myRmb < GameConfig.FactionMapTaskConfig[1][clubInfo.level].finishMoney) {
                        ExecuteMainFrameFunction("chongzhi");
                    }
                    else {
                        RpcProxy.call("C2G_FactionMapTaskOneKey", 1);
                    }
                }
            }
        };
        MsgSystem.confirmDialog(str, t, null);
    };
    ClubMapFrame.prototype.onekeyInstrusion = function (args) {
        var clubInfo = ClubSystem.getInstance().getCurClubInfo();
        var str = String.format(Localize_cns("CLUB_TXT102"), GameConfig.FactionMapTaskConfig[2][clubInfo.level].finishMoney);
        var t = {
            onDialogCallback: function (result, userData) {
                if (result) {
                    var myRmb = GetHeroProperty("gold");
                    if (myRmb < GameConfig.FactionMapTaskConfig[2][clubInfo.level].finishMoney) {
                        ExecuteMainFrameFunction("chongzhi");
                    }
                    else {
                        RpcProxy.call("C2G_FactionMapTaskOneKey", 2);
                    }
                }
            }
        };
        MsgSystem.confirmDialog(str, t, null);
    };
    ClubMapFrame.prototype.onClickMapWnd = function () {
        ExecuteMainFrameFunction("ditu");
    };
    ClubMapFrame.prototype.refreshMapPos = function (args) {
        var target = args.actor;
        var x = 0;
        var y = 0;
        if (target) {
            x = target.getCellX();
            y = target.getCellY();
        }
        else {
            var heroPoint = GetHero().getCellXY();
            x = heroPoint.x;
            y = heroPoint.y;
        }
        var mapId = MapSystem.getInstance().getMapId();
        AddRdContent(this.mElemList["map_name"], Localize_cns("CLUB_TXT10"), "ht_24_cc_stroke", "white");
        for (var _ in GameConfig.MapEnterList) {
            var config = GameConfig.MapEnterList[_];
            if (config.inMapId == mapId) {
                AddRdContent(this.mElemList["map_name"], config.inMapName, "ht_24_cc_stroke", "white");
            }
        }
        AddRdContent(this.mElemList["map_xy"], "[" + x + "," + y + "]", "ht_20_cc_stroke", "lime");
    };
    ClubMapFrame.prototype.changeColtCheck = function (event) {
    };
    ClubMapFrame.prototype.chaneIntrCheck = function (event) {
    };
    ClubMapFrame.prototype.onGetCollectPrize = function () {
        RpcProxy.call("C2G_FactionMapTaskPrize", 1);
    };
    ClubMapFrame.prototype.onGetInstrusionPrize = function () {
        RpcProxy.call("C2G_FactionMapTaskPrize", 2);
    };
    ClubMapFrame.prototype.resetCollectTask = function () {
        RpcProxy.call("C2G_FactionMapTaskReset", 1);
    };
    ClubMapFrame.prototype.resetInstrusionTask = function () {
        RpcProxy.call("C2G_FactionMapTaskReset", 2);
    };
    ///////////////////////////////////////////////////////////////////
    ClubMapFrame.prototype.startAnim = function () {
        this.mLayoutNode.setDoModal(true);
        this.mElemList["colt_progress"].visible = true;
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
        var count = 1;
        this.timer = SetTimer(function (delay) {
            UiUtil.updateProgress(this.mElemList["colt_progress"], count, 100);
            if (count < 100) {
                count += 1;
            }
            else {
                this.endAnim();
            }
        }, this, 100, false);
    };
    ClubMapFrame.prototype.endAnim = function () {
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
        this.mLayoutNode.setDoModal(false);
        this.mElemList["colt_progress"].visible = false;
        RpcProxy.call("C2G_FactionMapTaskFinishOnce", 1);
        UiUtil.updateProgress(this.mElemList["colt_progress"], 0, 100);
    };
    return ClubMapFrame;
}(BaseWnd));
__reflect(ClubMapFrame.prototype, "ClubMapFrame");
//# sourceMappingURL=ClubMapFrame.js.map
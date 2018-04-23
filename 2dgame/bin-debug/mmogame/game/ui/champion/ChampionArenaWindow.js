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
// TypeScript file
var ChampionArenaWindow = (function (_super) {
    __extends(ChampionArenaWindow, _super);
    function ChampionArenaWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChampionArenaWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.timer = null;
        this.record = 0;
    };
    ChampionArenaWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_rank", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onRankClick, _a),
            (_b = {}, _b["name"] = "btn_challenge", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onChallengeClick, _b),
            (_c = {}, _c["name"] = "btn_shop", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClickShop, _c),
            (_d = {}, _d["name"] = "buy_btn", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.hideWnd, _d),
            (_e = {}, _e["name"] = "ms_pic", _e["messageFlag"] = true, _e),
            (_f = {}, _f["name"] = "tips_txt", _f["color"] = gui.Color.lime, _f),
        ];
        for (var i = 0; i < 5; i++) {
            JsUtil.arrayInstert(elemInfo, (_g = {}, _g["name"] = "floor" + i, _g["title"] = null, _g["messageFlag"] = true, _g));
            JsUtil.arrayInstert(elemInfo, (_h = {}, _h["name"] = "group_" + i, _h["title"] = null, _h["event_name"] = egret.TouchEvent.TOUCH_TAP, _h["fun_index"] = this.onClickFighter, _h));
            this.mElemList["ui_actor_" + i] = UIActorView.newObj(this.mLayoutNode, "ui_actor_" + i, 50, 100, this.mElemList["actor_view" + i]);
        }
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 0; i < 2; i++) {
            this.mElemList["itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, "itemBox" + i, 0, 0, this.mElemList["prize_wnd" + i]);
        }
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    ChampionArenaWindow.prototype.onUnLoad = function () {
    };
    ChampionArenaWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.CHAMPION_REFRESH, this.refreshFrame, this);
        this.mElemList["arena_wnd"].visible = true;
        this.sendArenaRequest();
        //this.refreshFrame()
    };
    ChampionArenaWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.CHAMPION_REFRESH, this.refreshFrame, this);
        this.mElemList["arena_wnd"].visible = false;
        this.clearCoodTime();
    };
    ChampionArenaWindow.prototype.sendArenaRequest = function () {
        RpcProxy.call("C2G_GetChampionData");
    };
    ChampionArenaWindow.prototype.refreshFrame = function () {
        var a = GetActivity(ActivityDefine.Champion);
        var info = a.getChampionInfo();
        this.info = info;
        //更新挑战次数
        this.startChallengeCount(info.count || 0, info.time || 0);
        //更新玩家数据
        var list = info.list;
        table_sort(list, function (a, b) { return a.rank - b.rank; });
        for (var i in list) {
            this.updateActorWnd(list[i], i);
        }
        //更新自己排名
        var rank = info.rank;
        this.mElemList["batch_rank"].beginDraw();
        this.mElemList["batch_rank"].drawNumberString("vip_", rank, 0, 0, -3);
        this.mElemList["batch_rank"].endDraw();
        //更新自己战力
        var force = info.force;
        this.mElemList["batch_force"].beginDraw();
        this.mElemList["batch_force"].drawNumberString("zhanLi_", "l" + force, 0, 0, -3);
        this.mElemList["batch_force"].endDraw();
        //更新自己的奖励
        var prize = a.getDailyPrizeItemList();
        if (prize) {
            var point = prize.point(rank);
            var pointIcon = prize.pointIcon;
            var bind_1 = prize.bindCurrency(rank);
            var bindIcon = prize.bindIcon;
            this.mElemList["itemBox0"].updateByEntry(bindIcon, bind_1);
            this.mElemList["itemBox1"].updateByEntry(pointIcon, point);
        }
    };
    ChampionArenaWindow.prototype.startChallengeCount = function (_count, _time) {
        var count = _count;
        this.record = _time; //服务器记录的倒计时
        this.clearCoodTime();
        //是否满
        var str = "";
        if (count >= defaultValue.CHAMPION_CHALLENGE_COUNT) {
            str = String.format(Localize_cns("JJC_TXT5"), count);
        }
        else {
            this.timer = GameTimer.getInstance().setTimer(this.updateChallengeWnd, this, 200);
            str = String.format(Localize_cns("JJC_TXT5"), count);
            str = str + "#br#white" + getFormatDiffTime(this.record - GetServerTime());
        }
        AddRdContent(this.mElemList["count_rd"], str, "ht_24_cc_stroke", "white", 3);
    };
    ChampionArenaWindow.prototype.updateChallengeWnd = function (delay) {
        var a = GetActivity(ActivityDefine.Champion);
        var info = a.getChampionInfo();
        var count = info.count;
        var record = this.record - GetServerTime();
        var str = "";
        if (record <= 0) {
            this.clearCoodTime();
            str = String.format(Localize_cns("JJC_TXT5"), count);
        }
        else {
            str = String.format(Localize_cns("JJC_TXT5"), count);
            str = str + "#br#white" + getFormatDiffTime(record);
        }
        AddRdContent(this.mElemList["count_rd"], str, "ht_24_cc_stroke", "white", 3);
    };
    ChampionArenaWindow.prototype.clearCoodTime = function () {
        if (this.timer) {
            GameTimer.getInstance().killTimer(this.timer);
            this.timer = null;
        }
    };
    ChampionArenaWindow.prototype.updateActorWnd = function (info, index) {
        //更新排名
        this.mElemList["batch_rank" + index].beginDraw();
        this.mElemList["batch_rank" + index].drawNumberString("vip_", info.rank, 0, 0);
        this.mElemList["batch_rank" + index].endDraw();
        //更新战力
        this.mElemList["batch_force" + index].beginDraw();
        this.mElemList["batch_force" + index].drawNumberString("zhanLi_", "z" + info.force, 0, 0);
        this.mElemList["batch_force" + index].endDraw();
        //更新actor_view
        this.updateActorModel(info.role, info.sex, index);
        //更新名字
        this.mElemList["name" + index].text = info.name;
    };
    ChampionArenaWindow.prototype.updateActorModel = function (voc, sex, index) {
        var modeID = GetProfessionModel(voc, sex);
        this.mElemList["ui_actor_" + index].updateByPlayer(modeID);
    };
    ChampionArenaWindow.prototype.onClickFighter = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        var info = this.info.list[index];
        if (info) {
            if (info.id == GetHeroProperty("id")) {
                MsgSystem.addTagTips(Localize_cns("JJC_TXT7"));
            }
            else {
                RpcProxy.call("C2G_ChampionFight", info.rank, info.name, info.id);
            }
        }
    };
    ChampionArenaWindow.prototype.onRankClick = function () {
        WngMrg.getInstance().showWindow("ChampionRankFrame");
    };
    ChampionArenaWindow.prototype.onChallengeClick = function () {
        WngMrg.getInstance().showWindow("ChampionRecordFrame");
    };
    ChampionArenaWindow.prototype.onClickShop = function () {
        var wnd = WngMrg.getInstance().getWindow("ShopJingJiFrame");
        wnd.showWithIndex(0);
    };
    return ChampionArenaWindow;
}(BaseCtrlWnd));
__reflect(ChampionArenaWindow.prototype, "ChampionArenaWindow");
//# sourceMappingURL=ChampionArenaWindow.js.map
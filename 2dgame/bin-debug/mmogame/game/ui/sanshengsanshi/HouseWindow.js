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
var HouseWindow = (function (_super) {
    __extends(HouseWindow, _super);
    function HouseWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HouseWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
    };
    HouseWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "upgrade_btn", _a["title"] = null, _a["event_name"] = gui.ComboBox.onClick, _a["fun_index"] = this.onUpgradeClick, _a),
            (_b = {}, _b["name"] = "all_upgrade_btn", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onAllUpgradeClick, _b),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 1; i < 3; i++) {
            this.mElemList["actorview" + i] = UIActorView.newObj(this.mLayoutNode, "actorview" + i, 0, 0, this.mElemList["group_actorview" + i]);
        }
        this.setCountDown(0);
        var _a, _b;
    };
    HouseWindow.prototype.onUnLoad = function () {
    };
    HouseWindow.prototype.onShow = function () {
        this.mElemList["group2"].visible = true;
        this.mElemList["title"].text = Localize_cns("SANSHENG_TXT8");
        RegisterEvent(EventDefine.HOUSE_UPDATE, this.onRefresh, this);
        RpcProxy.call("C2G_UpdateHourse");
        this.onRefresh();
    };
    HouseWindow.prototype.onHide = function () {
        this.mElemList["group2"].visible = false;
        UnRegisterEvent(EventDefine.HOUSE_UPDATE, this.onRefresh, this);
        for (var i = 1; i < 3; i++) {
            var actorView = this.mElemList["actorview" + i];
            actorView.clearView();
        }
    };
    HouseWindow.prototype.onRefresh = function () {
        var houseInfo = ActivitySystem.getInstance().getHouseInfo();
        if (houseInfo == null) {
            return;
        }
        var _type = houseInfo.houseData.type || 100;
        var stage = houseInfo.houseData.stage || 0;
        this.houseLevel = stage;
        this.mElemList["house_text"].text = Localize_cns(("SANSHENG_TXT" + _type));
        this.mElemList["advance_text"].text = String.format(Localize_cns("SANSHENG_TXT6"), stage);
        var power = houseInfo.power;
        this.setCountDown(power);
        // this.onRefreshMyView(houseInfo.playerInfo.plrAppear)
        // this.onRefreshOtherView(houseInfo.playerInfo.spouseAppear)
        var myInfo = houseInfo.playerInfo.plrAppear;
        var otherInfo = houseInfo.playerInfo.spouseAppear;
        this.onRefreshView(myInfo, otherInfo);
        this.onRefreshNeedItem();
    };
    HouseWindow.prototype.onRefreshNeedItem = function () {
        //消耗材料
        var level = this.houseLevel;
        var config = GameConfig.FunUpgradeStageConfig;
        var houseConfig = config["Hourse"];
        if (level >= size_t(houseConfig)) {
            AddRdContent(this.mElemList["need_rd1"], "", "ht_20_cc", "white");
            AddRdContent(this.mElemList["need_rd2"], "", "ht_20_cc", "white");
            return;
        }
        var curInfo = houseConfig[level];
        //消耗材料
        var itemId = curInfo.itemid;
        var ownItemCount = ItemSystem.getInstance().getItemCount(itemId); //0
        var needItemCount = curInfo.itemnum; //2
        var str = "";
        var needColor = "#green";
        if (needItemCount > ownItemCount) {
            needColor = "#red";
        }
        str = String.format(Localize_cns("SANSHENG_TXT10"), needColor + ownItemCount + "/" + needItemCount);
        AddRdContent(this.mElemList["need_rd1"], str, "ht_20_cc", "white");
        needColor = "#green";
        //消耗货币
        var moneyUnit = curInfo.moneyunit;
        var ownMoney = GetHeroMoney(moneyUnit); //322164
        var costMoney = curInfo.money; //1300
        if (costMoney > ownMoney) {
            needColor = "#red";
        }
        str = String.format(Localize_cns("SANSHENG_TXT11"), needColor + costMoney);
        AddRdContent(this.mElemList["need_rd2"], str, "ht_20_cc", "white");
        // need_rd1
        // need_rd2
        var cur = 10;
        var max = 100;
        UiUtil.updateProgress(this.mElemList["exp_progress"], cur, max);
    };
    HouseWindow.prototype.setCountDown = function (num) {
        var imageBox = this.mElemList["countdown"];
        imageBox.beginDraw();
        imageBox.drawNumberString("zhanLi_", num, 0, 0);
        imageBox.endDraw();
    };
    HouseWindow.prototype.onRefreshView = function (myInfo, otherInfo) {
        for (var i = 1; i < 3; i++) {
            var roleGroup = this.mElemList["role" + i];
            roleGroup.visible = false;
            var info = null;
            if (i == 1) {
                info = myInfo;
            }
            else {
                info = otherInfo;
            }
            if (info) {
                roleGroup.visible = true;
                var model = GetProfessionModel(info.vocation, info.sexId);
                var actorView = this.mElemList["actorview" + i];
                actorView.updateByPlayerAppearInfo(info);
            }
        }
    };
    HouseWindow.prototype.onUpgradeClick = function () {
    };
    HouseWindow.prototype.onAllUpgradeClick = function () {
    };
    return HouseWindow;
}(BaseCtrlWnd));
__reflect(HouseWindow.prototype, "HouseWindow");
//# sourceMappingURL=HouseWindow.js.map
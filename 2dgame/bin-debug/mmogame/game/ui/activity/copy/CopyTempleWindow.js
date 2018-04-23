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
var CopyTempleWindow = (function (_super) {
    __extends(CopyTempleWindow, _super);
    function CopyTempleWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CopyTempleWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
        this.maxIndex = 11;
    };
    CopyTempleWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "leiyin_fight_btn", _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onClickFight, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var txt = "";
        var colorList = ["#orange", "#magenta", "#cyan"];
        //通关奖励
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 2; j++) {
                this.mElemList["leiyin_itemBox_" + i + "_" + j] = UIItemBox.newObj(this.mLayoutNode, "leiyin_itemBox_" + i + "_" + j, 10 + 82 * j, 105, this.mElemList["leiyin_copy_group" + i]);
            }
            this.mElemList["leiyin_icon" + i] = UIActorView.newObj(this.mLayoutNode, "leiyin_icon" + i, 71, 60, this.mElemList["leiyin_copy_mon_group" + i]);
            this.mElemList["leiyin_icon" + i].updateByPlayer(20001);
            txt = txt + colorList[i] + String.format(Localize_cns("COPY_TXT19"), Localize_cns("COPY_TXT18"), 199) + "#br";
        }
        AddRdContent(this.mElemList["leiyin_rank_rd"], txt, "ht_20_cc_stroke", "white", 5);
        var _a;
    };
    CopyTempleWindow.prototype.onUnLoad = function () {
    };
    CopyTempleWindow.prototype.onShow = function () {
        // RegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // RegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["leiyin_group"].visible = true;
        this.mElemList["label_wndName"].text = Localize_cns("COPY_TXT3");
        this.refreshFrame();
        this.applyActInfo();
    };
    CopyTempleWindow.prototype.onHide = function () {
        // UnRegisterEvent(EventDefine.PET_UPDATE, this.refreshFrame, this)
        // UnRegisterEvent(EventDefine.PET_LIST_UPDATE, this.refreshFrame, this)
        this.mElemList["leiyin_group"].visible = false;
    };
    CopyTempleWindow.prototype.refreshFrame = function () {
        var actInfo = GetActivity(ActivityDefine.Boss).getActInfo(OrdinaryActivityIndex.SmallThunderTemple);
        // {
        //         maxIndex: 最新通关关卡
        // }
        var maxIndex = 10;
        if (actInfo && actInfo.maxIndex != null && actInfo.maxIndex != 0) {
            maxIndex = actInfo.maxIndex;
        }
        this.maxIndex = maxIndex;
        var list = [];
        for (var _ in GameConfig.CopyTempleConfig) {
            var config = GameConfig.CopyTempleConfig[_];
            table_insert(list, config);
        }
        table_sort(list, function (a, b) { return a.index - b.index; });
        var flag = false;
        var t = [];
        for (var i = 0; i < list.length; i++) {
            table_insert(t, list[i]);
            if (list[i].index == maxIndex + 1) {
                flag = true;
            }
            if (t.length == 3) {
                if (flag == true) {
                    break;
                }
                t = [];
            }
        }
        if (flag == false) {
            this.maxIndex = -1;
            this.mElemList["leiyin_fight_btn"].visible = false;
        }
        else {
            this.mElemList["leiyin_fight_btn"].visible = true;
        }
        for (var i = 0; i < 3; i++) {
            if (t[i]) {
                this.mElemList["leiyin_copy_group" + i].visible = true;
                var config = t[i];
                var monsterModelId = GetMonsterModel(config.entryId);
                this.mElemList["leiyin_icon" + i].updateByPlayer(monsterModelId);
                var l = AnalyPrizeFormat(config.showItem);
                for (var j = 0; j < 2; j++) {
                    if (!l[j]) {
                        this.mElemList["leiyin_itemBox_" + i + "_" + j].setVisible(false);
                    }
                    else {
                        var _a = l[j], entryId = _a[0], count = _a[1];
                        this.mElemList["leiyin_itemBox_" + i + "_" + j].setVisible(true);
                        this.mElemList["leiyin_itemBox_" + i + "_" + j].updateByEntry(entryId, count);
                    }
                }
                this.mElemList["leiyin_copy_name" + i].text = config.copyName;
                this.mElemList["leiyin_copy_pass" + i].visible = config.index <= maxIndex;
            }
            else {
                this.mElemList["leiyin_copy_group" + i].visible = false;
            }
        }
    };
    CopyTempleWindow.prototype.updateWnd = function () {
        this.refreshFrame();
    };
    CopyTempleWindow.prototype.applyActInfo = function () {
        RpcProxy.call("C2G_GetBossActivityInfo", OrdinaryActivityIndex.SmallThunderTemple);
    };
    ///////////////////////////////////////////////////////////////////////
    CopyTempleWindow.prototype.onClickFight = function (args) {
        if (CheckFightState() == true) {
            return;
        }
        RpcProxy.call("C2G_CreateBossFight", OrdinaryActivityIndex.SmallThunderTemple, this.maxIndex + 1);
    };
    return CopyTempleWindow;
}(BaseCtrlWnd));
__reflect(CopyTempleWindow.prototype, "CopyTempleWindow");
//# sourceMappingURL=CopyTempleWindow.js.map
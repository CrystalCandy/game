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
var FightPrizeFrame = (function (_super) {
    __extends(FightPrizeFrame, _super);
    function FightPrizeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightPrizeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.actorList = {};
        this.mLayoutPaths = ["layouts/fight/FightPrizeLayout.exml"];
    };
    FightPrizeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setAlignCenter(true, true);
        this.initSkinElemList();
        // this.mLayoutNode.setLayer(gui.GuiLayer.Top)
        this.mLayoutNode.verticalCenter = -100;
        var elemInfo = [
            (_a = {}, _a["name"] = "gain_btn", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.onReturn, _a),
        ];
        // for (let i = 1; i <= 3; i++) {
        //     elemInfo.push({ ["name"]: "level" + i, ["title"]: null, ["event_name"]: null, ["fun_index"]: null })
        //     elemInfo.push({ ["name"]: "progress_exp" + i,  ["title"]: null, ["event_name"]: null, ["fun_index"]: null })
        //     elemInfo.push({ ["name"]: "actorview" + i, ["title"]: null, ["event_name"]: null, ["fun_index"]: null })
        //     elemInfo.push({ ["name"]: "expadd" + i, ["color"]: gui.Color.lime, ["title"]: null, ["event_name"]: null, ["fun_index"]: null })
        // }
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var group = this.mElemList["scroll_group"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group);
        var _a;
    };
    FightPrizeFrame.prototype.onUnLoad = function () {
    };
    FightPrizeFrame.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this.bAutoHide = true;
        this.maxDelayTime = 10 * 1000;
        this.mLayoutNode.visible = true;
        GameSound.getInstance().playEffect(SystemSound.effect_win);
        this.refreshFrame();
    };
    FightPrizeFrame.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        this.mLayoutNode.visible = false;
        var list = [];
        for (var name_1 in this.actorList) {
            var actor = this.actorList[name_1];
            JsUtil.arrayInstert(list, name_1);
        }
        // for (let _ in list) {
        //     let name = list[_]
        //     this.refreshActorView(name, null)
        // }
        // this.actorList = {}
    };
    FightPrizeFrame.prototype.initItemWindow = function (window) {
        var name = window.name;
        // let mElemInfo: any = [
        // 	{ ["index_type"]: gui.Grid9Image,   ["name"]: name + "_bg", ["title"]: null, ["font"]: null, ["image"]: "ty_uiDi03", ["autoScale"]:true, ["color"]: gui.Color.white, ["x"]: 0, ["y"]: 0, ["w"]: window.width, ["h"]: window.height, ["event_name"]: egret.TouchEvent.TOUCH_TAP, ["fun_index"]: null },
        // ]
        // UiUtil.createElem(mElemInfo, this.mLayoutNode, this.mElemList, this, window)
        //ui_util.CreateDrawRectPtr(this.mElemList[name +"_dec"], gui.Color32Half.green)
        //AddRdContent(this.mElemList[name + "_dec"], Localize_cns("CHAT_ERROE_JINYAN"), "ht_20_cc", "zongse")
        for (var i = 0; i < 4; i++) {
            this.mElemList[name + "itemBox" + i] = UIItemBox.newObj(this.mLayoutNode, name + "itemBox" + i, 40 + 110 * i, 15, window);
        }
    };
    FightPrizeFrame.prototype.refreshItemWindow = function (window, config) {
        var name = window.name;
        for (var i = 0; i < 4; i++) {
            if (config[i]) {
                var _a = config[i], entryId = _a[0], count = _a[1];
                this.mElemList[name + "itemBox" + i].setVisible(true);
                this.mElemList[name + "itemBox" + i].updateByEntry(entryId, count);
            }
            else {
                this.mElemList[name + "itemBox" + i].setVisible(false);
            }
        }
    };
    FightPrizeFrame.prototype.refreshFrame = function () {
        //param/commonPrize
        // local commonPrize = {}
        // commonPrize.funds = 0                        现银
        // commonPrize.bindCurrency = 0                 绑定元宝
        // commonPrize.currency = 0                     元宝
        // commonPrize.plrExp = 0                       经验
        // commonPrize.itemList = {}                    {entryId, count}
        // commonPrize.star = 0
        // commonPrize.campaignId = 0
        var list = [];
        if (this.param && this.param.commonPrize) {
            //金币
            if (this.param.commonPrize.funds && this.param.commonPrize.funds > 0) {
                table_insert(list, [SpecailItemId.FUNDS, this.param.commonPrize.funds]);
            }
            //绑定元宝
            if (this.param.commonPrize.bgold && this.param.commonPrize.bgold > 0) {
                table_insert(list, [SpecailItemId.B_GOLD, this.param.commonPrize.bgold]);
            }
            //元宝
            if (this.param.commonPrize.gold && this.param.commonPrize.gold > 0) {
                table_insert(list, [SpecailItemId.GOLD, this.param.commonPrize.gold]);
            }
            //经验
            if (this.param.commonPrize.exp && this.param.commonPrize.exp > 0) {
                table_insert(list, [SpecailItemId.EXP, this.param.commonPrize.exp]);
            }
            for (var _ in this.param.commonPrize.itemlist) {
                var v = this.param.commonPrize.itemlist[_];
                table_insert(list, v);
            }
        }
        var list1 = [];
        var t = [];
        list.forEach(function (v) {
            table_insert(t, v);
            if (size_t(t) == 4) {
                table_insert(list1, t);
                t = [];
            }
        });
        if (t.length > 0) {
            table_insert(list1, t);
        }
        // table_sort(list, function(a, b) {return a.level - b.level})
        var group = this.mElemList["scroll_group"];
        var scroll = this.scroll;
        scroll.clearItemList();
        this.controlDataTable = {};
        for (var k = 0; k < list1.length; k++) {
            var v = list1[k];
            var window_1 = scroll.getItemWindow(k, group.width - 3, 125, 3, 5, 0);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
    };
    FightPrizeFrame.prototype.starShowCombatEnd = function () {
        return this.showWnd();
    };
    FightPrizeFrame.prototype.autoHideTick = function (leftTime) {
        this.mElemList["gain_btn"].text = Localize_cns("FIGHT_TXT9") + "(" + Math.floor(leftTime / 1000) + ")";
    };
    FightPrizeFrame.prototype.onReturn = function (args) {
        this.endShowCombatEnd();
    };
    return FightPrizeFrame;
}(FightEndBaseFrame));
__reflect(FightPrizeFrame.prototype, "FightPrizeFrame");
//# sourceMappingURL=FightPrizeFrame.js.map
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
var MarryInformFrame = (function (_super) {
    __extends(MarryInformFrame, _super);
    function MarryInformFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarryInformFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/sanshengsanshi/MarryInformLayout.exml"];
    };
    MarryInformFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.mLayoutNode.setDoModal(true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "giveGiftBtn1", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClick, _b),
            (_c = {}, _c["name"] = "giveGiftBtn2", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClick, _c),
            (_d = {}, _d["name"] = "giveGiftBtn3", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClick, _d),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 1; i < 4; i++) {
            this.mElemList["item_Box" + i] = UIItemBox.newObj(this.mLayoutNode, "item_Box" + i, 0, 0, this.mElemList["item_group" + i], 0.9);
            this.mElemList["gits_rd" + i].setAlignFlag(gui.Flag.CENTER_CENTER);
        }
        this.mElemList["marry_rd"].setAlignFlag(gui.Flag.CENTER_CENTER);
        var _a, _b, _c, _d;
    };
    MarryInformFrame.prototype.onUnLoad = function () {
    };
    MarryInformFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.onRefresh();
    };
    MarryInformFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    MarryInformFrame.prototype.onRefresh = function () {
        var config = GameConfig.MarriageGiftConfig;
        for (var i = 1; i < 4; i++) {
            var info = config[i + 99];
            var count = info.giftCost;
            var prizeList = info.gift;
            var itemList = AnalyPrizeFormat(prizeList);
            if (itemList[0]) {
                this.mElemList["item_Box" + i].updateByEntry(itemList[0][0], itemList[0][1]);
            }
            else {
                this.mElemList["item_Box" + i].updateByEntry(-1);
            }
            var goldText = "#YUANBAO";
            if (i == 1) {
                goldText = "#BIND_YUANBAO";
            }
            var str = info.giftCost + goldText;
            AddRdContent(this.mElemList["gits_rd" + i], str, "ht_20_cc_stroke", "white");
        }
        var name1 = this.info["name1"];
        var name2 = this.info["name2"];
        var text = String.format(Localize_cns("SANSHENG_TXT5"), name1, name2);
        AddRdContent(this.mElemList["marry_rd"], text, "ht_20_cc", "white");
    };
    MarryInformFrame.prototype.onClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, ""); //选择的是第几个按钮
        index = tonumber(index);
        var id1 = this.info["id1"];
        var id2 = this.info["id2"];
        var _type = index + 99;
        //送礼前 先判断是否满足条件
        var config = GameConfig.MarriageGiftConfig;
        var info = config[_type];
        var needGold = info.giftCost;
        if (index == 1) {
            var curBindGold = GetHeroProperty("bindGold");
            if (curBindGold < needGold) {
                MsgSystem.addTagTips(Localize_cns("LUCKY_TXT3"));
                return;
            }
        }
        else {
            var curGold = GetHeroProperty("gold");
            if (curGold < needGold) {
                MsgSystem.addTagTips(Localize_cns("LUCKY_TXT4"));
                return;
            }
        }
        RpcProxy.call("C2G_MarryGift", id1, id2, _type);
        this.hideWnd(); //退出了
    };
    MarryInformFrame.prototype.showAndSetData = function (id1, id2, name1, name2) {
        this.info["id1"] = id1;
        this.info["id2"] = id2;
        this.info["name1"] = name1;
        this.info["name2"] = name2;
        this.showWnd();
    };
    return MarryInformFrame;
}(BaseWnd));
__reflect(MarryInformFrame.prototype, "MarryInformFrame");
//# sourceMappingURL=MarryInformFrame.js.map
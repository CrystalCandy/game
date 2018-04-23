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
var FightCopyDragonWindow = (function (_super) {
    __extends(FightCopyDragonWindow, _super);
    function FightCopyDragonWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightCopyDragonWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.controlDataTable = {};
    };
    FightCopyDragonWindow.prototype.onLoad = function () {
        this.mElemList = this.mParentWnd.mElemList;
        var elemInfo = [
            (_a = {}, _a["name"] = "round_pro", _a["image"] = "fb_loadingDi02", _a["thumbImage"] = "fb_loading02", _a)
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var _a;
        // let group = <eui.Group>this.mElemList["jie_scroll_group"]
        // this.scroll = UIScrollList.newObj(this.mLayoutNode, "jie_scroll", 0, 0, group.width, group.height, group)
    };
    FightCopyDragonWindow.prototype.onUnLoad = function () {
    };
    FightCopyDragonWindow.prototype.onShow = function () {
        RegisterEvent(EventDefine.COMBAT_FIGHT_ROUND_UPDATE, this.onFightRoundUpdate, this);
        this.mElemList["copy_longwang_group"].visible = true;
        this.refreshFrame();
    };
    FightCopyDragonWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.COMBAT_FIGHT_ROUND_UPDATE, this.onFightRoundUpdate, this);
        this.mElemList["copy_longwang_group"].visible = false;
    };
    FightCopyDragonWindow.prototype.refreshFrame = function () {
        var list = table_copy(opDragonBossBaseConfig.starConfig);
        table_sort(list, function (a, b) { return a[2] - b[2]; });
        var minStar = list[0][1] - 1;
        for (var i = 0; i < 3; i++) {
            var v = list[i];
            this.mElemList["starStage_group" + i].x = this.mElemList["round_pro"].width - this.mElemList["round_pro"].width / minStar * (v[1] - 1); // + this.mElemList["starStage_group" + i].width / 2
            this.mElemList["star_num" + i].text = v[1];
        }
        var _a = FightSystem.getInstance().getCurFightRound(), curRound = _a[0], maxRound = _a[1];
        var imb = this.mElemList["round_pro"];
        UiUtil.updateProgress(imb, minStar - curRound + 1, minStar);
        var _b = FightSystem.getInstance().getCurFightType(), _ = _b[0], index = _b[1];
        var config = GameConfig.CopyDragonConfig[index];
        if (!config) {
            this.mElemList["copy_name"].text = "";
        }
        else {
            var list_1 = [];
            for (var _1 in GameConfig.CopyDragonConfig) {
                var con = GameConfig.CopyDragonConfig[_1];
                if (con.chapter == config.chapter) {
                    table_insert(list_1, con);
                }
            }
            table_sort(list_1, function (a, b) { return a.index - b.index; });
            var j = 0;
            for (var i = 0; i < list_1.length; i++) {
                var v = list_1[i];
                if (v.index == index) {
                    j = i;
                    break;
                }
            }
            this.mElemList["copy_name"].text = String.format(Localize_cns("COPY_TXT22"), (config.chapter - 10) + "-" + (j + 1));
        }
    };
    FightCopyDragonWindow.prototype.onFightRoundUpdate = function (args) {
        this.refreshFrame();
    };
    return FightCopyDragonWindow;
}(BaseCtrlWnd));
__reflect(FightCopyDragonWindow.prototype, "FightCopyDragonWindow");
//# sourceMappingURL=FightCopyDragonWindow.js.map
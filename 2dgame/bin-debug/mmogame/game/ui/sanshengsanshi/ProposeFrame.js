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
var ProposeFrame = (function (_super) {
    __extends(ProposeFrame, _super);
    function ProposeFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProposeFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/sanshengsanshi/ProposeLayout.exml"];
        this.index = -1;
    };
    ProposeFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        this.setFullScreen(true);
        this.initSkinElemList();
        this.mLayoutNode.setDoModal(true);
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
            (_b = {}, _b["name"] = "select_btn1", _b["title"] = null, _b["event_name"] = egret.TouchEvent.TOUCH_TAP, _b["fun_index"] = this.onClick, _b),
            (_c = {}, _c["name"] = "select_btn2", _c["title"] = null, _c["event_name"] = egret.TouchEvent.TOUCH_TAP, _c["fun_index"] = this.onClick, _c),
            (_d = {}, _d["name"] = "select_btn3", _d["title"] = null, _d["event_name"] = egret.TouchEvent.TOUCH_TAP, _d["fun_index"] = this.onClick, _d),
            (_e = {}, _e["name"] = "marry_btn", _e["title"] = null, _e["event_name"] = egret.TouchEvent.TOUCH_TAP, _e["fun_index"] = this.onMarryClick, _e),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        for (var i = 1; i < 4; i++) {
            //setAlignFlag(gui.Flag.CENTER_CENTER)
            this.mElemList["select" + i].visible = false;
            this.mElemList["marry_rd" + i].setAlignFlag(gui.Flag.CENTER_CENTER);
            // let str = "#BIND_YUANBAO"+6666
            // AddRdContent(this.mElemList["marry_rd"+i], str, "ht_20_cc_stroke", "white")
            for (var j = 1; j < 5; j++) {
                this.mElemList["proposeItemBox_" + i + "_" + j] = UIItemBox.newObj(this.mLayoutNode, "proposeItemBox_" + i + "_" + j, 72 * (j - 1), 0, this.mElemList["proposeItem" + i], 0.9);
            }
        }
        var _a, _b, _c, _d, _e;
    };
    ProposeFrame.prototype.onUnLoad = function () {
    };
    ProposeFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        this.index = -1;
        this.onRefresh();
    };
    ProposeFrame.prototype.onHide = function () {
        this.mLayoutNode.visible = false;
    };
    ProposeFrame.prototype.onRefresh = function () {
        var config = GameConfig.MarriageConfig;
        for (var i = 1; i < 4; i++) {
            var goldText = "#YUANBAO";
            if (i == 1) {
                goldText = "#BIND_YUANBAO";
            }
            var info = config[i + 99];
            var prizeList = info.prize;
            var itemList = AnalyPrizeFormat(prizeList);
            for (var j = 1; j < 5; j++) {
                var v = itemList[j - 1];
                if (v) {
                    this.mElemList["proposeItemBox_" + i + "_" + j].updateByEntry(v[0], v[1]);
                }
                else {
                    this.mElemList["proposeItemBox_" + i + "_" + j].updateByEntry(-1);
                }
            }
            var str = info.cost + goldText;
            AddRdContent(this.mElemList["marry_rd" + i], str, "ht_20_cc_stroke", "white");
        }
        for (var i = 1; i < 4; i++) {
            this.mElemList["select" + i].visible = (this.index == i);
        }
        var name = this.name;
        AddRdContent(this.mElemList["name_rd"], name, "ht_24_cc", "lime");
    };
    ProposeFrame.prototype.onClick = function (args) {
        var name = args.target.name;
        var index = name.replace(/[^0-9]/ig, "");
        index = tonumber(index);
        this.index = index;
        this.onRefresh();
    };
    ProposeFrame.prototype.onMarryClick = function () {
        //call
        //"C2G_Proposal":"uint32;uint32;uint8",	--被求婚者Id, 求婚类型, 1丈夫 2妻子
        //判断是否够消耗先
        var config = GameConfig.MarriageConfig;
        var info = config[tonumber(this.index) + 99];
        if (info == null) {
            return;
        }
        var cost = info.cost;
        if (this.index == 1) {
            var bindGold = GetHeroProperty("bindGold");
            if (bindGold < cost) {
                MsgSystem.addTagTips(Localize_cns("LUCKY_TXT3"));
                return;
            }
        }
        else {
            var curGold = GetHeroProperty("gold");
            if (curGold < cost) {
                MsgSystem.addTagTips(Localize_cns("LUCKY_TXT4"));
                return;
            }
        }
        var roleId = this.roleId;
        var _type = this.index + 99; // this.index + 99? 100 101 102
        var roleSex = this.roleSex; //希望成为什么
        RpcProxy.call("C2G_Proposal", roleId, _type, roleSex);
    };
    ProposeFrame.prototype.onShowAndSetData = function (name, roleId, roleSex) {
        this.name = name;
        this.roleId = roleId;
        this.roleSex = roleSex;
        this.showWnd();
    };
    return ProposeFrame;
}(BaseWnd));
__reflect(ProposeFrame.prototype, "ProposeFrame");
//# sourceMappingURL=ProposeFrame.js.map
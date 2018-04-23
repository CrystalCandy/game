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
var PlayerListFrame = (function (_super) {
    __extends(PlayerListFrame, _super);
    function PlayerListFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerListFrame.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.mLayoutPaths = ["layouts/PlayerListLayout.exml"];
    };
    PlayerListFrame.prototype.onLoad = function () {
        this.mLayoutNode.skinName = this.mLayoutPaths[0];
        // this.setFullScreen(true)
        this.initSkinElemList();
        this.mLayoutNode.setLayer(0 /* Bottom */);
        this.mLayoutNode.left = 0;
        this.mLayoutNode.top = 350;
        var elemInfo = [
            (_a = {}, _a["name"] = "btn_close", _a["title"] = null, _a["event_name"] = egret.TouchEvent.TOUCH_TAP, _a["fun_index"] = this.hideWnd, _a),
        ];
        UiUtil.initElem(elemInfo, this.mLayoutNode, this.mElemList, this);
        var list = this.mElemList["list"];
        list.itemRenderer = itemRender.PlayerListItem;
        var _a;
    };
    PlayerListFrame.prototype.onUnLoad = function () {
    };
    PlayerListFrame.prototype.onShow = function () {
        this.mLayoutNode.visible = true;
        //RegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        RegisterEvent(EventDefine.PLAYER_ENTER_MAP, this.refreshFrame, this);
        RegisterEvent(EventDefine.PLAYER_LEAVE_MAP, this.refreshFrame, this);
        RegisterEvent(EventDefine.PLAYER_INFO_UPDATE, this.refreshFrame, this);
        RegisterEvent(EventDefine.ROBBER_TEMPLE_APPEAR, this.refreshFrame, this);
        //this.switchListGroup(false)
        this.refreshFrame();
    };
    PlayerListFrame.prototype.onHide = function () {
        //UnRegisterEvent(EventDefine.ROOTWINDOW_MOUSE_DOWN, this.onMouseDown, this)
        UnRegisterEvent(EventDefine.PLAYER_ENTER_MAP, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.PLAYER_LEAVE_MAP, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.PLAYER_INFO_UPDATE, this.refreshFrame, this);
        UnRegisterEvent(EventDefine.ROBBER_TEMPLE_APPEAR, this.refreshFrame, this);
        this.mLayoutNode.visible = false;
        //this.clickCallback = null;
        //this.clickObj = null;
    };
    // switchListGroup(b: boolean) {
    //     this.mElemList["btn_show"].selected = !!b;
    //     this.refreshFrame()
    // }
    PlayerListFrame.prototype.refreshFrame = function () {
        var count = 0;
        var show_list = [];
        var player_list = ActorManager.getInstance().getPlayerList();
        for (var _ in player_list) {
            var player = player_list[_];
            var info = player.getPropertyInfo();
            //if(bit.band(info.status, opStatusType.STATUS_ROBBER_DEAD) != opStatusType.STATUS_ROBBER_DEAD ){
            JsUtil.arrayInstert(show_list, player);
            //}
            count++;
            if (count >= 30)
                break;
        }
        //let count = size_t(show_list)
        // //let count = size_t(list)
        // let count = 0
        // let show_list = []
        // for (let _ in list) {
        //     let v = list[_]
        //     show_list.push(v)
        //     count++;
        //     if (count >= 30)
        //         break;
        // }
        show_list.sort(function (a, b) {
            return a.id - b.id;
        });
        var listbox = this.mElemList["list"];
        UiUtil.updateList(listbox, show_list);
        // let bSelected = this.mElemList["btn_show"].selected
        // this.mElemList["group_list"].visible = bSelected
    };
    // onClickShowBtn(event: egret.Event) {
    //     this.refreshFrame()
    // }
    // onMouseDown(args: GameTouchEvent) {
    //     let group = <eui.Group>this.mElemList["group_list"]
    //     if (group.visible == false)
    //         return;
    //     let target = args.touchEvent.target;
    //     let isExclude = UiUtil.isExcludeChild(target, [this.mLayoutNode])
    //     if (isExclude) {
    //         this.switchListGroup(false)
    //     }
    // }
    PlayerListFrame.prototype.showPlayerList = function (callback, obj) {
        this.clickCallback = callback;
        this.clickObj = obj;
        this.showWnd();
    };
    return PlayerListFrame;
}(BaseWnd));
__reflect(PlayerListFrame.prototype, "PlayerListFrame");
var itemRender;
(function (itemRender) {
    var PlayerListItem = (function (_super) {
        __extends(PlayerListItem, _super);
        function PlayerListItem() {
            var _this = _super.call(this) || this;
            _this.mElemList = {};
            var name = "item";
            var mElemInfo = [
                (_a = {}, _a["index_type"] = gui.Grid9Image, _a["name"] = "line", _a["image"] = "cz_uiLine01", _a["x"] = 0, _a["y"] = 3, _a["w"] = 200, _a["h"] = 2, _a["event_name"] = null, _a["fun_index"] = null, _a["messageFlag"] = true, _a),
                (_b = {}, _b["index_type"] = eui.Label, _b["name"] = "name", _b["title"] = Localize_cns("TYPE_ACC_INFO"), _b["font"] = "ht_16_lc_stroke", _b["color"] = gui.Color.white, _b["x"] = 80, _b["y"] = 16, _b["w"] = 120, _b["h"] = 25, _b["event_name"] = null, _b["fun_index"] = null, _b["messageFlag"] = true, _b),
                (_c = {}, _c["index_type"] = eui.Label, _c["name"] = "level", _c["title"] = "Lv 24", _c["font"] = "ht_16_lc_stroke", _c["color"] = gui.Color.white, _c["x"] = 80, _c["y"] = 45, _c["w"] = 70, _c["h"] = 25, _c["event_name"] = null, _c["fun_index"] = null, _c["messageFlag"] = true, _c),
                (_d = {}, _d["index_type"] = eui.Label, _d["name"] = "event", _d["title"] = null, _d["x"] = 0, _d["y"] = 0, _d["percentWidth"] = 100, _d["percentHeight"] = 100, _d["event_name"] = gui.TouchEvent.TOUCH_SHORT, _d["fun_index"] = _this.onClickPlayer, _d),
            ];
            //UiUtil.createElem(mElemInfo, this, this.mElemList, this)
            var iconSize = 20;
            for (var i = 1; i <= 3; i++) {
                var info = (_e = {}, _e["index_type"] = eui.Image, _e["name"] = name + "_statusicon" + i, _e["parent"] = null, _e["title"] = null, _e["font"] = "ht_24_cc_stroke", _e["image"] = "TB_duiZhang", _e["color"] = gui.Color.white, _e["bAdapteWindow"] = true, _e["x"] = 75 + iconSize * (i - 1), _e["y"] = 70, _e["w"] = iconSize, _e["h"] = iconSize, _e["event_name"] = null, _e["fun_index"] = null, _e["messageFlag"] = true, _e);
                JsUtil.arrayInstert(mElemInfo, info);
            }
            UiUtil.createElem(mElemInfo, _this, _this.mElemList, _this);
            _this.mElemList["petBox"] = UIPetBox.newObj(_this, "petBox", 0, 6, _this, 0.6);
            return _this;
            var _a, _b, _c, _d, _e;
            //this.mElemList["attack"].visible = false;
        }
        PlayerListItem.prototype.updateStatusIcon = function (name, index, imageName) {
            if (this.mElemList[name + "_statusicon" + index]) {
                this.mElemList[name + "_statusicon" + index].source = (imageName);
            }
        };
        PlayerListItem.prototype.dataChanged = function () {
            var player = this.data;
            var playerInfo = player.getPropertyInfo();
            this.mElemList["petBox"].updateByEntryAndSex(playerInfo.vocation, playerInfo.sexId, playerInfo.id);
            this.mElemList["name"].text = (playerInfo.name);
            this.mElemList["level"].text = ("Lv." + playerInfo.level);
            var name = "item";
            //this.mElemList["attack"].visible = configRobber.mapId == MapSystem.getInstance().getMapId();
            for (var i = 1; i <= 3; i++) {
                this.mElemList[name + "_statusicon" + i].source = ("");
            }
            //TLog.Debug("PlayerListFrame.refreshItemWindow", playerInfo.status)
            if (playerInfo.status) {
                var index = 1;
                if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_ROBBER_BBOX) == opStatusType.STATUS_TYPE_ROBBER_BBOX) {
                    this.updateStatusIcon(name, index, PlayerStatusToImage[opStatusType.STATUS_TYPE_ROBBER_BBOX]);
                    index = index + 1;
                }
                if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_TICKET) == opStatusType.STATUS_TYPE_TICKET) {
                    this.updateStatusIcon(name, index, PlayerStatusToImage[opStatusType.STATUS_TYPE_TICKET]);
                    index = index + 1;
                }
                if (bit.band(playerInfo.status, opStatusType.STATUS_TYPE_FACT_WAR) == opStatusType.STATUS_TYPE_FACT_WAR) {
                    this.updateStatusIcon(name, index, PlayerStatusToImage[opStatusType.STATUS_TYPE_FACT_WAR]);
                    index = index + 1;
                }
                var smallTempleCount = playerInfo.smallTempleCount || 0;
                if (smallTempleCount > 0) {
                    this.updateStatusIcon(name, index, "TB_shenXiang01");
                    index = index + 1;
                }
                var bigTempleCount = playerInfo.bigTempleCount || 0;
                if (bigTempleCount > 0) {
                    this.updateStatusIcon(name, index, "TB_shenXiang02");
                    index = index + 1;
                }
            }
        };
        PlayerListItem.prototype.onClickPlayer = function (args) {
            var player = this.data;
            var playerInfo = player.getPropertyInfo();
            var window = WngMrg.getInstance().getWindow("PlayerListFrame");
            if (window.clickCallback) {
                window.clickCallback.call(window.clickObj, playerInfo.id);
            }
        };
        return PlayerListItem;
    }(eui.ItemRenderer));
    itemRender.PlayerListItem = PlayerListItem;
    __reflect(PlayerListItem.prototype, "itemRender.PlayerListItem");
})(itemRender || (itemRender = {}));
//# sourceMappingURL=PlayerListFrame.js.map
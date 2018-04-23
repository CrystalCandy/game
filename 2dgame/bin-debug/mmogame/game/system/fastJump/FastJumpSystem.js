/*
作者:
    panjunhua
    
创建时间：
   2015.8.6(周四)

意图：
        快速跳转系统
   

公共接口：

*/
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
var FastJumpSystem = (function (_super) {
    __extends(FastJumpSystem, _super);
    function FastJumpSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FastJumpSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //RegisterEvent(EventDefine.UI_SHOW, this.showWndAndCheckFinish, this)
        this.onClear();
    };
    FastJumpSystem.prototype.destory = function () {
        //UnRegisterEvent(EventDefine.UI_SHOW, this.showWndAndCheckFinish, this)
    };
    FastJumpSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initFastJumpSystemCsv(workQueue);
    };
    FastJumpSystem.prototype.onClear = function () {
    };
    FastJumpSystem.prototype.getFunTipsConfig = function (fType, fid) {
        fType = fType || "";
        fid = fid || 0;
        var config = null;
        for (var _ in GameConfig.FunTipsConfig) {
            var v = GameConfig.FunTipsConfig[_];
            if (fType == v.type) {
                if (fid == v.entryId) {
                    config = v;
                    TLog.Debug("FastJumpSystem.getGameConfig.FunTipsConfig", fid);
                    break;
                }
            }
        }
        return config;
    };
    FastJumpSystem.prototype.getFunTipsInfo = function (config) {
        var imageName = "";
        var name = "ERROR";
        var des = "";
        if (config.type == "item") {
            imageName = GetItemIcon(config.entryId);
            name = ItemSystem.getInstance().getItemName(config.entryId);
            des = config.showTips || "";
        }
        else if (config.type == "jinbi") {
            imageName = GetItemIcon(SpecailItemId.FUNDS);
            name = Localize_cns("JINBI");
            des = config.showTips || "";
        }
        else if (config.type == "zuanshi") {
            imageName = GetItemIcon(SpecailItemId.GOLD);
            name = Localize_cns("GUIDE_TXT2");
            des = config.showTips || "";
        }
        else if (config.type == "shengji") {
        }
        else if (config.type == "tili") {
            imageName = GetItemIcon(SpecailItemId.POWER);
            name = Localize_cns("CAMPAIGN_TXT18");
            des = config.showTips || "";
        }
        else if (config.type == "stone") {
            imageName = GetItemIcon(SpecailItemId.STONE);
            name = Localize_cns("PET_STONE_NAME");
        }
        return [imageName, name, des];
    };
    FastJumpSystem.prototype.doFastJump = function (eventName, param, args) {
        TLog.Debug("FastJumpSystem.doFastJump", eventName);
        if (FastJumpSpace.doEventHandler[eventName]) {
            return FastJumpSpace.doEventHandler[eventName].call(this, param, args);
        }
        else {
            TLog.Error("FastJumpSystem.doFastJump eventName %s is null!!!", eventName);
        }
    };
    FastJumpSystem.prototype.checkFastJump = function (eventName, param, args) {
        //TLog.Debug("FastJumpSystem.checkFastJump",eventName)
        if (FastJumpSpace.checkEventHandler[eventName]) {
            var _a = FastJumpSpace.checkEventHandler[eventName].call(this, param, args), enable = _a[0], title = _a[1], str = _a[2];
            if (HeroIsInTeam() == true) {
                enable = false;
                str = Localize_cns("TEAM_TXT51");
            }
            return [enable, title, str || ""];
        }
        else {
            //TLog.Error("FastJumpSystem.checkFastJump eventName is null!!!")
            return [true, "ERROR", ""];
        }
    };
    return FastJumpSystem;
}(BaseSystem));
__reflect(FastJumpSystem.prototype, "FastJumpSystem");
//# sourceMappingURL=FastJumpSystem.js.map
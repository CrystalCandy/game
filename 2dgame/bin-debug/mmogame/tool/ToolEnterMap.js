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
var tool;
(function (tool) {
    var ToolEnterMap = (function (_super) {
        __extends(ToolEnterMap, _super);
        function ToolEnterMap() {
            var _this = _super.call(this) || this;
            _this.precedure = PRECEDURE_GAME;
            _this.setHeroEnterMap(50002, 70, 32);
            _this.setHeroShow(true);
            RegisterEvent(EventDefine.PRECEDURE_ACTIVE, _this.onGamePrecedure, _this);
            RegisterEvent(EventDefine.HERO_ENTER_GAME, _this.onEnterGame, _this);
            return _this;
        }
        ToolEnterMap.prototype.setHeroEnterMap = function (mapId, x, y) {
            this.heroMapId = mapId;
            this.heroX = x;
            this.heroY = y;
        };
        ToolEnterMap.prototype.setHeroShow = function (show) {
            this.heroShow = show;
        };
        ToolEnterMap.prototype.onStart = function () {
            IGlobal.setting.setRoleName("test");
            PrecedureManager.getInstance().changePrecedure(this.precedure);
        };
        ToolEnterMap.prototype.onExit = function () {
        };
        ToolEnterMap.prototype.onGamePrecedure = function (event) {
            if (event.state != PRECEDURE_GAME)
                return;
            if (this.heroShow) {
                var message = GetMessage(opCodes.G2C_MAP_ENTER);
                message.mapId = this.heroMapId;
                message.cellx = this.heroX;
                message.celly = this.heroY;
                GameNetDispatcher.getInstance().dispatchMessage(message);
                var message = GetMessage(opCodes.G2C_HERO_INFO);
                var info = {};
                info.id = 10;
                info.name = "test";
                info.followTip = 0;
                info.sex = 0;
                info.race = 0;
                info.icon = 101;
                info.body = 0;
                info.level = 10;
                info.experience = 0;
                info.funds = 0;
                info.gold = 0;
                info.power = 0;
                info.saveRecord = {};
                // message.info = info
                // GameNetDispatcher.getInstance().dispatchMessage(message)
                RpcLogic.G2C_HeroInfoInit.call(this, info);
                //GetHero().loadModel(3012)
            }
        };
        ToolEnterMap.prototype.onEnterGame = function () {
        };
        return ToolEnterMap;
    }(tool.ToolUnit));
    tool.ToolEnterMap = ToolEnterMap;
    __reflect(ToolEnterMap.prototype, "tool.ToolEnterMap");
})(tool || (tool = {}));
//# sourceMappingURL=ToolEnterMap.js.map
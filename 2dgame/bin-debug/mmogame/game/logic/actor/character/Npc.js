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
var Npc = (function (_super) {
    __extends(Npc, _super);
    function Npc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //子类复写 初始化函数
    Npc.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.setMovementNotifyEnable(true);
        this.actorType = actor_Type.ACTOR_TYPE_NPC;
        this.entryId = 0;
        RegisterEvent(EventDefine.HERO_MOVE, this.refreshVisible, this);
        RegisterEvent(EventDefine.HERO_MOVE_STOP, this.refreshVisible, this);
    };
    //子类复写 析构函数
    Npc.prototype.destory = function () {
        UnRegisterEvent(EventDefine.HERO_MOVE, this.refreshVisible, this);
        UnRegisterEvent(EventDefine.HERO_MOVE_STOP, this.refreshVisible, this);
    };
    Npc.prototype.onPropertyChange = function () {
        _super.prototype.onPropertyChange.call(this);
        this.entryId = this.propertyInfo.entryId;
    };
    Npc.prototype.getEntryId = function () {
        return this.entryId;
    };
    Npc.prototype.onEnterMap = function () {
        _super.prototype.onEnterMap.call(this);
        this.refreshVisible();
    };
    Npc.prototype.refreshVisible = function () {
        var config = GameConfig.npcConfig[this.entryId];
        if (config) {
            var scope = config.showScope || 0;
            if (scope > 0) {
                var p1 = GetHero().getCellXY();
                var p2 = this.getCellXY();
                if (MathUtil.checkNormScope(p1.x, p1.y, p2.x, p2.y, scope) == true) {
                    this.setVisible(true);
                }
                else {
                    this.setVisible(false);
                }
            }
        }
    };
    return Npc;
}(Character));
__reflect(Npc.prototype, "Npc");
//# sourceMappingURL=Npc.js.map
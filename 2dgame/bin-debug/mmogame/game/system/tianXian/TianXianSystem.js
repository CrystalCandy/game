/*
作者:
    ljq
    
创建时间：
    2018.3.16(周四)

意图：
    仙侣系统

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
var TianXianSystem = (function (_super) {
    __extends(TianXianSystem, _super);
    function TianXianSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TianXianSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
    };
    TianXianSystem.prototype.onClear = function () {
        this.tianxianlist = {};
    };
    TianXianSystem.prototype.destory = function () {
        this.onClear();
    };
    TianXianSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initTianXianSystemCsv(workQueue);
    };
    TianXianSystem.prototype.initTianXianList = function (info) {
        for (var k in info) {
            var v = info[k];
            this.tianxianlist[v.entryid] = v;
        }
    };
    //更新消息
    TianXianSystem.prototype.updateTianXianInfoField = function (id, info) {
        if (!this.tianxianlist[id]) {
            return;
        }
        for (var k in info) {
            this.tianxianlist[id][k] = info[k];
        }
        FireEvent(EventDefine.TIANXIAN_UPDATE, null);
    };
    TianXianSystem.prototype.getTianXianInfo = function (_type) {
        if (!this.tianxianlist[_type]) {
            return [];
        }
        return this.tianxianlist[_type];
    };
    //获取总属性
    TianXianSystem.prototype.getToTalConfig = function (chong, index) {
        var config = {
            maxhp: 0,
            demage: 0,
            hujia: 0,
            hitrate: 0,
            dodge: 0,
            critrate: 0,
            critratedec: 0,
            speed: 0,
        };
        for (var i = 1; i < chong; i++) {
            var typenum = GameConfig.FunTianXianJingMaiTypeConfig["TianXianJingMai"][i].itemnum;
            for (var j = 1; j <= 11; j++) {
                var tempEffects = GameConfig.FunTianXianJingMaiConfig["TianXianJingMai"][j].effects;
                var tempConfig = table_effect(tempEffects);
                tempConfig = table_effect_mul(tempConfig, typenum);
                config = table_effect_add(config, tempConfig);
            }
        }
        for (var i = 1; i <= index; i++) {
            var tempEffects = GameConfig.FunTianXianJingMaiConfig["TianXianJingMai"][i].effects;
            var tempConfig = table_effect(tempEffects);
            config = table_effect_add(config, tempConfig);
        }
        return config;
    };
    return TianXianSystem;
}(BaseSystem));
__reflect(TianXianSystem.prototype, "TianXianSystem");
//# sourceMappingURL=TianXianSystem.js.map
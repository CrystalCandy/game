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
/*
作者:
    lintianfeng
    
创建时间：
   2013.10.10(周四)

意图：
   

公共接口：
   
*/
var Buff = (function (_super) {
    __extends(Buff, _super);
    function Buff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Buff.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.entryId = args[0]; //entryId
        this.life = args[1] || 0; //持续时间
        this.count = args[2]; //数量
        this.powerInfo = args[3]; //power地址
        this.refPropertyInfo = BuffSystem.getInstance().getBuffTemplateInfo(this.entryId); //获得引用数据
        this.effectList = []; //只记录effect，冲过EffectManager对effect进行管理，buff系统内部不管理
        if (this.life > 0) {
            var _a = FightSystem.getInstance().getCurFightTime(), _ = _a[0], time = _a[1];
            if (time < this.life) {
                if (!this.lifeTimer) {
                    //	this.lifeTimer = Timer.getInstance().setTimer(this.lifeTick, this, this.life - time + 500, false)
                }
            }
        }
        this.order = BuffSystem.getInstance().getBuffOrder();
    };
    Buff.prototype.destory = function () {
        this.clearEffectList();
        if (this.lifeTimer) {
            KillTimer(this.lifeTimer);
            this.lifeTimer = null;
        }
    };
    Buff.prototype.getEntryId = function () {
        return this.entryId;
    };
    Buff.prototype.updateInfo = function (info) {
        this.property = info;
    };
    Buff.prototype.getRefProperty = function (key) {
        if (!this.refPropertyInfo) {
            return null;
        }
        return this.refPropertyInfo[key];
    };
    Buff.prototype.getBuffLife = function () {
        return this.life;
    };
    Buff.prototype.hasBuildEffect = function () {
        return this.effectList.length != 0;
    };
    Buff.prototype.addEffect = function (effect) {
        JsUtil.arrayInstert(this.effectList, effect);
    };
    Buff.prototype.getEffectList = function () {
        return this.effectList;
    };
    Buff.prototype.clearEffectList = function () {
        for (var i in this.effectList) {
            var v = this.effectList[i];
            //EffectManager.getInstance().removeBindEffect(actor, v)
            v.deleteObj();
        }
        this.effectList = [];
    };
    Buff.prototype.lifeTick = function (delay) {
        BuffSystem.getInstance().updateOutDateBuff(this);
    };
    Buff.prototype.getBuffOrder = function () {
        return this.order;
    };
    //检查buff的效果
    Buff.prototype.checkBuffEffect = function (index) {
        var ref = this.getRefProperty("paramList");
        if (!ref) {
            return [false, null];
        }
        var flag = false;
        var param = null;
        if (ref[index]) {
            flag = true;
            param = ref[index];
        }
        if (flag == false) {
            flag = table_isExsit(ref, index);
        }
        return [flag, param];
    };
    return Buff;
}(TClass));
__reflect(Buff.prototype, "Buff");
//# sourceMappingURL=Buff.js.map
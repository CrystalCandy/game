/*
作者:
    ljq
    
创建时间：
    2012.2.11(周一)

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
var XianLvSystem = (function (_super) {
    __extends(XianLvSystem, _super);
    function XianLvSystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XianLvSystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
    };
    XianLvSystem.prototype.onClear = function () {
        this.fightList = {};
        this.xianLvList = {};
        this.jiHuoList = [];
        this.qiyuanList = [];
    };
    XianLvSystem.prototype.destory = function () {
        this.onClear();
    };
    XianLvSystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initXianLvSystemCsv(workQueue);
    };
    //////////////////////初始化仙侣列表//////////
    XianLvSystem.prototype.initXianLvList = function (info) {
        var tempInfo = {};
        for (var _ in info) {
            var v = info[_];
            tempInfo[v.entryid] = v;
            if (v.combatpos != 0) {
                this.fightList[v.entryid] = v.combatpos;
            }
            JsUtil.arrayInstert(this.jiHuoList, v.entryid);
        }
        this.xianLvList = tempInfo;
    };
    ////////////////////////新增一个仙侣///////////////
    XianLvSystem.prototype.addXianLvInfo = function (info) {
        if (this.xianLvList[info.entryid]) {
            TLog.Warn("PetSystem.addPet %d alreadey exsit", info.entryid);
        }
        this.xianLvList[info.entryid] = info;
        JsUtil.arrayInstert(this.jiHuoList, info.entryid);
        FireEvent(EventDefine.ACTOR_XIANLV_UPDATE, null);
    };
    /////////////////局部更新//////////////////////////
    XianLvSystem.prototype._updateXianLvInfoField = function (id, updateProperty) {
        var Info = this.xianLvList[id];
        if (Info == null) {
            //TLog.Warn("FunSystem._updateXianLvInfoField %d is null", funOptionsName[funType])
            return;
        }
        for (var k in updateProperty) {
            Info[k] = updateProperty[k];
            if (k == "combatpos" && Info[k] != 0) {
                this.fightList[id] = Info[k];
            }
        }
        this.xianLvList[id] = Info;
        //     let updateInfo = this.jiHuoList
        //     for(let k in updateInfo){
        //       if(tonumber(k) == id){
        //          updateInfo[k] = Info
        //      }
        //    }
        //     this.updateInfoList(updateInfo)
        FireEvent(EventDefine.ACTOR_XIANLV_UPDATE, null);
    };
    XianLvSystem.prototype.getControlList = function () {
        var list = GameConfig.ActorXianLvConfig;
        var temp = this.jiHuoList;
        var tempList = [];
        for (var i = 0; i < size_t(temp); i++) {
            JsUtil.arrayInstert(tempList, list[temp[i]]);
        }
        for (var k in list) {
            if (!JsUtil.arrayExsit(tempList, list[k])) {
                JsUtil.arrayInstert(tempList, list[k]);
            }
        }
        return tempList;
    };
    XianLvSystem.prototype.getStar = function (id) {
        if (!this.isExit(tonumber(id)))
            return;
        return this.xianLvList[id].start;
    };
    XianLvSystem.prototype.getLevel = function (id) {
        if (!this.isExit(id))
            return;
        return this.xianLvList[id].stage;
    };
    XianLvSystem.prototype.getFightList = function () {
        return this.fightList;
    };
    XianLvSystem.prototype.isExit = function (id) {
        return JsUtil.arrayExsit(this.jiHuoList, id);
    };
    XianLvSystem.prototype.getExpById = function (id) {
        if (!this.isExit(id))
            return;
        return this.xianLvList[id].stageexp;
    };
    XianLvSystem.prototype.getForce = function (id) {
        if (!this.isExit(id))
            return;
        return this.xianLvList[id].force;
    };
    XianLvSystem.prototype.getJiHuoList = function () {
        return this.jiHuoList;
    };
    XianLvSystem.prototype.getRecvInfo = function (id) {
        return this.xianLvList[id] || {};
        //"entryid:uint32",
        //"stage:uint16",
        //"stageexp:uint32",
        //"combatpos:uint8",
        //"start:uint16"
        //return this.jiHuoList
    };
    ////获取颜色
    XianLvSystem.prototype.getXianLvColor = function (quality) {
        var colorConfig = ["lime", "blue", "purple", "gold", "red"];
        return colorConfig[quality - 1] || colorConfig[0];
    };
    ///---获取激活的总战力
    XianLvSystem.prototype.getTotalForce = function () {
        var list = this.getJiHuoList();
        var recvNum = 0;
        for (var k in list) {
            recvNum += this.getForce(list[k]);
        }
        return recvNum;
    };
    ///仙侣奇缘
    XianLvSystem.prototype.setQiYuanProperty = function (list) {
        this.qiyuanList = list;
    };
    XianLvSystem.prototype.getQiYuanProperty = function () {
        return this.qiyuanList || [0, 0];
    };
    return XianLvSystem;
}(BaseSystem));
__reflect(XianLvSystem.prototype, "XianLvSystem");
//# sourceMappingURL=XianLvSystem.js.map
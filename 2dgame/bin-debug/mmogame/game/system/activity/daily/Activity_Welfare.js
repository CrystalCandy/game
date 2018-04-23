/*
作者:
    yangguiming
    
创建时间：
    2014.07.31(星期四)

意图：
  每日签到活动

公共接口：
    getTimes(){//签到次数
    getisGet(){//领取礼物
    GetWarHorn(list){//-返回号角列表

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
var Activity_Welfare = (function (_super) {
    __extends(Activity_Welfare, _super);
    function Activity_Welfare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Activity_Welfare.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
    };
    Activity_Welfare.prototype.destory = function () {
        // UnRegisterEvent(EventDefine.UPDATE_WELFARE, this.onAutoShow, this)
        // UnRegisterEvent(EventDefine.TASK_COMMIT_FINISH, this.onAutoShow, this)
    };
    Activity_Welfare.prototype.onPrepareResource = function () {
        // RegisterEvent(EventDefine.UPDATE_WELFARE, this.onAutoShow, this)
        // RegisterEvent(EventDefine.TASK_COMMIT_FINISH, this.onAutoShow, this)
    };
    Activity_Welfare.prototype.onClear = function () {
        this.times = 0;
        this.isget = 0;
        this.warhorn_list = {};
        this.warhorn_list.index = 0;
        this.warhorn_list.time = 0;
        this.warhorn_list.isget = 0;
    };
    Activity_Welfare.prototype.updateQiandaoData = function (times, isget) {
        this.times = times;
        this.isget = isget;
        FireEvent(EventDefine.EVERYDAYONLINE_UPDTAE, null);
    };
    Activity_Welfare.prototype.getTimes = function () {
        return this.times;
    };
    Activity_Welfare.prototype.getisGet = function () {
        return this.isget;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //-号角列表
    Activity_Welfare.prototype.SetWarHorn = function (list) {
        this.warhorn_list = list;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    //-返回号角列表
    Activity_Welfare.prototype.GetWarHorn = function () {
        return this.warhorn_list;
    };
    return Activity_Welfare;
}(ActivityBase));
__reflect(Activity_Welfare.prototype, "Activity_Welfare");
//# sourceMappingURL=Activity_Welfare.js.map
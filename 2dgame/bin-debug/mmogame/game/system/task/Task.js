/*
作者:
    yangguiming
    
创建时间：
   2013.6.24(周一)

意图：
   

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
var Task = (function (_super) {
    __extends(Task, _super);
    function Task() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Task.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.propertyInfo = args[0];
        this.refPropertyInfo = TaskSystem.getInstance().getTaskRef(this.propertyInfo.taskId); //获得引用数据
        if (this.refPropertyInfo == null) {
            TLog.Error("Task.init this.refPropertyInfo == null taskId:%d", this.propertyInfo.taskId);
            return;
        }
    };
    Task.prototype.destory = function () {
    };
    //属性
    ////////////////////////////////////////////////////////////
    Task.prototype.getId = function () {
        return this.propertyInfo.taskId;
    };
    Task.prototype.getTime = function () {
        return this.propertyInfo.time;
    };
    Task.prototype.setPropertyInfo = function (info) {
        this.propertyInfo = info;
    };
    Task.prototype.getPropertyInfo = function () {
        return this.propertyInfo;
    };
    Task.prototype.getRefPropertyInfo = function () {
        return this.refPropertyInfo;
    };
    Task.prototype.getType = function () {
        return this.propertyInfo.Type;
    };
    //操作
    ////////////////////////////////////////////////////////////
    Task.prototype.isFailed = function () {
        var taskInfo = this.propertyInfo;
        //服务器标示失败
        if (taskInfo.data && taskInfo.data[taskField.TASK_DATA_FAIL]) {
            return true;
        }
        var fail = false;
        //如果是计时任务
        if (taskInfo.init && taskInfo.init[taskField.FIELD_INIT_TIME]) {
            //let fail = taskInfo.init[taskField.FIELD_INIT_TIME] - StateSystem.GetServerTime() <= 0  //是否过期了
            fail = !this.isInTime();
            if (fail) {
                if (taskInfo.init[taskField.FIELD_INIT_NOT_TIME_OUT]) {
                    fail = false;
                }
                if (taskInfo.data[taskField.TASK_DATA_FINISH]) {
                    fail = false;
                }
                if (taskInfo.finish[taskField.FIELD_FINISH_TIME]) {
                    fail = false;
                }
            }
        }
        return fail;
    };
    Task.prototype.isFinish = function () {
        //是否失败了
        if (this.isFailed()) {
            return false;
        }
        //是否超时也算完成
        if (this.isOverTimeFinish()) {
            return true;
        }
        return TaskChecker.getInstance().checkFinish(this.getId());
    };
    Task.prototype.isInTime = function () {
        var taskInfo = this.propertyInfo;
        var initTime = taskInfo.init[taskField.FIELD_INIT_TIME];
        if (initTime) {
            return initTime - GetServerTime() - 1 > 0;
        }
        return true;
    };
    //超时了也算完成(如灭魔)
    Task.prototype.isOverTimeFinish = function () {
        var taskInfo = this.propertyInfo;
        //FIELD_INIT_NOT_TIME_OUT:任务超时不失败
        if (taskInfo.init && taskInfo.init[taskField.FIELD_INIT_TIME] && taskInfo.init[taskField.FIELD_INIT_NOT_TIME_OUT]) {
            var pass = taskInfo.init[taskField.FIELD_INIT_TIME] - GetServerTime() <= 0; //是否过期了
            if (pass) {
                return true;
            }
        }
        return false;
    };
    return Task;
}(TClass));
__reflect(Task.prototype, "Task");
//# sourceMappingURL=Task.js.map
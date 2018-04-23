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
// TypeScript file
var Activity_Boss = (function (_super) {
    __extends(Activity_Boss, _super);
    function Activity_Boss() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Activity_Boss.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.onClear();
    };
    Activity_Boss.prototype.destory = function () {
        // UnRegisterEvent(EventDefine.UPDATE_WELFARE, this.onAutoShow, this)
        // UnRegisterEvent(EventDefine.TASK_COMMIT_FINISH, this.onAutoShow, this)
    };
    Activity_Boss.prototype.onPrepareResource = function () {
        // RegisterEvent(EventDefine.UPDATE_WELFARE, this.onAutoShow, this)
        // RegisterEvent(EventDefine.TASK_COMMIT_FINISH, this.onAutoShow, this)
        this.messageWndHandleIndex = (_a = {},
            // ["G2C_SweepBossActivity"]: [this.onRecvEnter, {}, true],
            _a["G2C_GetBossActivityInfo"] = [this.onRecvActInfo, [["BossMainFrame", "updateWnd"], ["CopyMainFrame", "updateWnd"], ["DailyFrame", "updateWnd"], ["BossBefallFrame", "onRefresh"], ["ActivityListFrame", "updateWnd"], ["ClubFrame", "updateWnd"], ["GlobalMainFrame", "updateWnd"]], true],
            _a["G2C_GetBossIndexData"] = [this.onRecvBossInfo, [["BossWildFrame", "updateWnd"]], true],
            //每日三百
            _a["G2C_MEIRISANBAI_MonsterNum"] = [this.onRecvSanBaiInfo, [["DailyFrame", "updateWnd"]], true],
            //西游历练
            _a["G2C_XiyouLilian_Info"] = [this.onRecvXiYouInfo, [["DailyFrame", "updateWnd"]], true],
            _a["G2C_XiyouLilian_RecordInfo"] = [this.onRecvFindBackInfo, [["DailyFindBackFrame", "updateWnd"]], true],
            _a);
        var _a;
    };
    Activity_Boss.prototype.onClear = function () {
        this.actInfo = {};
        this.actBossInfo = {};
        this.xiYouTaskList = [];
        this.xiYouLiLianInfo = {};
        this.sanBaiInfo = {};
    };
    Activity_Boss.prototype.onRecvEnter = function (message) {
    };
    Activity_Boss.prototype.onRecvActInfo = function (message) {
        var index = message.index;
        this.actInfo[index] = message.data;
        FireEvent(EventDefine.BOSSACTIVITY_INFO, null);
        return true;
    };
    Activity_Boss.prototype.getActInfo = function (index) {
        return this.actInfo[index];
    };
    Activity_Boss.prototype.onRecvBossInfo = function (message) {
        var actIndex = message.index;
        var bossIndex = message.bossIndex;
        this.actBossInfo[actIndex] = checkNull(this.actBossInfo[actIndex], {});
        this.actBossInfo[actIndex][bossIndex] = message.data;
        return true;
    };
    Activity_Boss.prototype.getActBossInfo = function (actIndex, bossIndex) {
        if (this.actBossInfo[actIndex] == null) {
            return null;
        }
        return this.actBossInfo[actIndex][bossIndex];
    };
    ///--------每日三百
    ///--------服务器数据
    Activity_Boss.prototype.onRecvSanBaiInfo = function (message) {
        this.sanBaiInfo = message;
        FireEvent(EventDefine.BOSSACTIVITY_INFO, null);
        return true;
    };
    Activity_Boss.prototype.getSanBaiInfo = function () {
        return this.sanBaiInfo;
    };
    ///----------本地数据
    Activity_Boss.prototype.getSanBaiConfigByLevel = function (level) {
        var tempConfig = GameConfig.EveryDaySanBaiConfig;
        var recvKey = 0;
        for (var k in tempConfig) {
            if (tonumber(k) >= level) {
                if (recvKey == 0) {
                    recvKey = tonumber(k);
                }
                return tempConfig[recvKey];
            }
            else {
                recvKey = tonumber(k);
            }
        }
        return null;
    };
    ////---------西游历练
    ///----------网络数据
    Activity_Boss.prototype.onRecvXiYouInfo = function (message) {
        this.xiYouTaskList = [];
        this.xiYouLiLianInfo = {};
        this.xiYouLiLianInfo = message;
        this.onUpdateXiYouInfo(message.taskList);
        FireEvent(EventDefine.DAILYACTIVITY_INFO, null);
        return true;
    };
    ///---------(处理网络数据与本地数据)
    Activity_Boss.prototype.onUpdateXiYouInfo = function (message) {
        var tempConfig = GameConfig.EveryDayLiLianTaskConfig;
        var unfinish = [];
        var finish = [];
        for (var k in tempConfig) {
            var temp = tempConfig[k];
            var netInfo = message[k];
            if (netInfo) {
                temp["curTwice"] = netInfo;
            }
            if (temp.curTwice >= temp.maxCount) {
                table_insert(finish, temp);
            }
            else {
                table_insert(unfinish, temp);
            }
        }
        for (var k in finish) {
            var taskData = finish[k];
            table_insert(unfinish, taskData);
        }
        this.xiYouTaskList = unfinish;
    };
    ///-------------获取服务端数据
    Activity_Boss.prototype.getXiyouInfo = function () {
        return this.xiYouLiLianInfo;
    };
    ///-------------获取task列表
    Activity_Boss.prototype.getXiYouTaskList = function () {
        return this.xiYouTaskList;
    };
    Activity_Boss.prototype.getXiYouLiLianPoint = function () {
        var taskList = this.xiYouLiLianInfo.taskList;
        var recvNum = 0;
        for (var k in taskList) {
            recvNum += taskList[k];
        }
        return recvNum;
    };
    ///---------找回
    Activity_Boss.prototype.onRecvFindBackInfo = function (message) {
        this.xiYouFindInfo = [];
        var tempConfig = GameConfig.EveryDayLiLianTaskConfig;
        // let recvConfig = []
        for (var k in tempConfig) {
            var config = tempConfig[k];
            if (config != null) {
                var total = config.maxCount;
                var backNum = total;
                var taskNum = message[k];
                if (taskNum != null) {
                    backNum = total - taskNum;
                }
                if (backNum != 0) {
                    config["backNum"] = backNum * config.exp;
                    table_insert(this.xiYouFindInfo, config);
                }
            }
        }
        /* for(let k in message){
             let config = tempConfig[k]
             if(config != null && message[k] != false){
                 config["backNum"] = message[k]
                 table_insert(this.xiYouFindInfo, config)
             }
         }*/
        return true;
    };
    Activity_Boss.prototype.getFindBackInfo = function () {
        return this.xiYouFindInfo;
    };
    return Activity_Boss;
}(ActivityBase));
__reflect(Activity_Boss.prototype, "Activity_Boss");
//# sourceMappingURL=Activity_Boss.js.map
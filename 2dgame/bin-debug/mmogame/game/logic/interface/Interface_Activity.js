var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
ImportType(PayActivityIndex);
//C for Client，客户端信息
PayActivityIndex.C_MONTHCARD = 100; //月卡
PayActivityIndex.C_Welfare = 101; //福利
PayActivityIndex.C_LUCKY = 102; //寻宝
var PayActivityHandler = (function () {
    function PayActivityHandler() {
    }
    PayActivityHandler.onHandleUI = function (wndName) {
        if (wndName == "")
            return;
        WngMrg.getInstance().showWindow(wndName);
    };
    PayActivityHandler.onTouziUI = function (param) {
        var wnd = WngMrg.getInstance().getWindow("TouZiFrame");
        wnd.showWithIndex(param);
    };
    PayActivityHandler.onWelfareUI = function (param) {
        var wnd = WngMrg.getInstance().getWindow("WelfareFrame");
        wnd.showWndWithTabName(param);
    };
    PayActivityHandler.onHandleOther = function (param) {
    };
    return PayActivityHandler;
}());
__reflect(PayActivityHandler.prototype, "PayActivityHandler");
//充值活动界面布局
var PayActivityUiGroup = (_a = {},
    _a["Main"] = [
        { index: PayActivityIndex.C_MONTHCARD, image: "zjm_Bt28", handle: PayActivityHandler.onWelfareUI, param: 2 },
        { index: PayActivityIndex.DAILY_LOGIN, image: "zjm_Bt11", handle: PayActivityHandler.onHandleUI, param: "DailyLoginFrame" },
        { index: PayActivityIndex.FIRST_PAY, image: "zjm_Bt27", handle: PayActivityHandler.onTouziUI, param: PayActivityIndex.FIRST_PAY },
        { index: PayActivityIndex.ACCUM_PAY_PRIZE, image: "zjm_Bt34", handle: PayActivityHandler.onTouziUI, param: PayActivityIndex.ACCUM_PAY_PRIZE },
    ],
    _a["MainCity"] = [
        { index: PayActivityIndex.DAY_ACCUM_PAY_PRIZE, image: "zjm_Bt01", handle: PayActivityHandler.onHandleUI, param: "DailyPayFrame" },
        { index: PayActivityIndex.DAILY_EXPENSIVE_GIFT, image: "zjm_Bt35", handle: PayActivityHandler.onHandleUI, param: "TodayGiftsFrame" },
        { index: PayActivityIndex.STAGE_UP, image: "zjm_Bt03", handle: PayActivityHandler.onHandleUI, param: "PayStageUpFrame" },
        { index: PayActivityIndex.LEVEL_FUNDS, image: "zjm_Bt04", handle: PayActivityHandler.onTouziUI, param: PayActivityIndex.LEVEL_FUNDS },
        { index: PayActivityIndex.INVEST_PLAN, image: "zjm_Bt05", handle: PayActivityHandler.onTouziUI, param: PayActivityIndex.INVEST_PLAN },
        { index: PayActivityIndex.C_Welfare, image: "zjm_Bt08", handle: PayActivityHandler.onHandleUI, param: "WelfareFrame" },
        { index: PayActivityIndex.C_LUCKY, image: "zjm_Bt02", handle: PayActivityHandler.onHandleUI, param: "LuckyFrame" },
    ],
    _a);
//返回所有活动列表索引
function GetOpenOperateActivityList() {
    var list = [];
    if (!GetHeroPropertyInfo()) {
        return list;
    }
    //首冲
    var vipLevel = VipSystem.getInstance().GetVipLevel();
    if (vipLevel == 0) {
        JsUtil.arrayInstert(list, PayActivityIndex.FIRST_PAY);
    }
    var isMonCard = PaySystem.getInstance().isMonthCardActive();
    if (isMonCard == false) {
        JsUtil.arrayInstert(list, PayActivityIndex.C_MONTHCARD);
    }
    var isWelfare = true;
    if (isWelfare) {
        JsUtil.arrayInstert(list, PayActivityIndex.C_Welfare);
    }
    var isLucky = true;
    if (isLucky) {
        JsUtil.arrayInstert(list, PayActivityIndex.C_LUCKY);
    }
    var curTime = GetServerTime();
    var allTime = 7 * 24 * 60 * 60;
    var creatTime = RoleSystem.getInstance().getRoleCreateTime();
    var outSevenDay = ((curTime - creatTime) > allTime);
    //创角每日充值
    if (outSevenDay == false) {
        JsUtil.arrayInstert(list, PayActivityIndex.CREATE_ROLE_SEVEN_DAY);
    }
    var operateActivityOpenList = ActivitySystem.getInstance().getOperateActivityOpenList();
    for (var _ in operateActivityOpenList) {
        var index = operateActivityOpenList[_];
        JsUtil.arrayInstert(list, index);
    }
    return list;
}
function GetPayActivityUiConfig(name) {
    var configList = PayActivityUiGroup[name];
    if (configList == null)
        return [];
    return configList;
}
//传入groupName,返回正在开启的活动的配置列表（顺序按PayActivityGroup定义）
function GetOpenActivityUiConfig(groupName) {
    var groupConfigList = PayActivityUiGroup[groupName];
    if (groupConfigList == null || groupConfigList.length == 0)
        return;
    var retOpenConfigList = [];
    var openList = GetOpenOperateActivityList();
    for (var _i = 0, groupConfigList_1 = groupConfigList; _i < groupConfigList_1.length; _i++) {
        var config = groupConfigList_1[_i];
        if (table_isExsit(openList, config.index)) {
            retOpenConfigList.push(config);
        }
    }
    return retOpenConfigList;
}
function ExecuteActivityIndex(index) {
    for (var k in PayActivityUiGroup) {
        var configList = PayActivityUiGroup[k];
        for (var _i = 0, configList_1 = configList; _i < configList_1.length; _i++) {
            var config = configList_1[_i];
            if (config.index == index) {
                var func = config.handle;
                if (func) {
                    func.call(PayActivityHandler, config.param);
                }
                return true;
            }
        }
    }
    return false;
}
var _a;
//# sourceMappingURL=Interface_Activity.js.map
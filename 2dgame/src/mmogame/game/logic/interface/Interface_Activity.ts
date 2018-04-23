ImportType(PayActivityIndex)



//C for Client，客户端信息
PayActivityIndex.C_MONTHCARD = 100 //月卡
PayActivityIndex.C_Welfare = 101 //福利
PayActivityIndex.C_LUCKY = 102 //寻宝


class PayActivityHandler{

    public static onHandleUI(wndName){
        if(wndName == "")
            return
        WngMrg.getInstance().showWindow(wndName);
    }

    public static onTouziUI(param){
        let wnd = WngMrg.getInstance().getWindow("TouZiFrame")
		wnd.showWithIndex(param)
    }

    public static onWelfareUI(param){
        let wnd = WngMrg.getInstance().getWindow("WelfareFrame")
		wnd.showWndWithTabName(param)
    }


    public static onHandleOther(param){
    }


}


//充值活动界面布局
let PayActivityUiGroup = {

    ["Main"]: [//主界面
        { index: PayActivityIndex.C_MONTHCARD, image: "zjm_Bt28" , handle: PayActivityHandler.onWelfareUI, param:2},//月卡
        { index: PayActivityIndex.DAILY_LOGIN, image: "zjm_Bt11" , handle: PayActivityHandler.onHandleUI, param:"DailyLoginFrame"},//每日登陆送元宝
        { index: PayActivityIndex.FIRST_PAY, image: "zjm_Bt27", handle: PayActivityHandler.onTouziUI, param:PayActivityIndex.FIRST_PAY },//首冲
        { index: PayActivityIndex.ACCUM_PAY_PRIZE, image: "zjm_Bt34", handle: PayActivityHandler.onTouziUI, param:PayActivityIndex.ACCUM_PAY_PRIZE},//累充
    ],


    ["MainCity"]: [//主城界面
        { index: PayActivityIndex.DAY_ACCUM_PAY_PRIZE, image: "zjm_Bt01", handle: PayActivityHandler.onHandleUI, param:"DailyPayFrame"},//每日充值
        //{ index: PayActivityIndex.DAILY_EXPENSIVE_GIFT, image: "zjm_Bt35" , handle: PayActivityHandler.onHandleUI, param:"TodayGiftsFrame"},
        { index: PayActivityIndex.STAGE_UP, image: "zjm_Bt03" , handle: PayActivityHandler.onHandleUI, param:"PayStageUpFrame"},//直升一阶
        { index: PayActivityIndex.LEVEL_FUNDS, image: "zjm_Bt04" , handle: PayActivityHandler.onTouziUI, param:PayActivityIndex.LEVEL_FUNDS},//成长基金
        { index: PayActivityIndex.INVEST_PLAN, image: "zjm_Bt05" , handle: PayActivityHandler.onTouziUI, param:PayActivityIndex.INVEST_PLAN},//投资计划
        { index: PayActivityIndex.C_Welfare, image: "zjm_Bt08" , handle: PayActivityHandler.onHandleUI, param:"WelfareFrame"},//福利大厅
        { index: PayActivityIndex.C_LUCKY, image: "zjm_Bt02" , handle: PayActivityHandler.onHandleUI, param:"LuckyFrame"},//寻宝
    ],
}


//返回所有活动列表索引
function GetOpenOperateActivityList() {
    let list:number[] = []

    if (!GetHeroPropertyInfo()) {
        return list
    }

    //首冲
    let vipLevel = VipSystem.getInstance().GetVipLevel()
    if (vipLevel == 0) {
        JsUtil.arrayInstert(list, PayActivityIndex.FIRST_PAY)
    }


    let isMonCard = PaySystem.getInstance().isMonthCardActive()
    if (isMonCard == false) {
        JsUtil.arrayInstert(list, PayActivityIndex.C_MONTHCARD)
    }

    let isWelfare = true
    if (isWelfare) {
        JsUtil.arrayInstert(list, PayActivityIndex.C_Welfare)
    }

    let isLucky = true
    if (isLucky) {
        JsUtil.arrayInstert(list, PayActivityIndex.C_LUCKY)
    }


    let curTime = GetServerTime()
    let allTime = 7 * 24 * 60 * 60
    let creatTime = RoleSystem.getInstance().getRoleCreateTime()
    let outSevenDay = ((curTime - creatTime) > allTime)
    //创角每日充值
    if (outSevenDay == false) {
        JsUtil.arrayInstert(list, PayActivityIndex.CREATE_ROLE_SEVEN_DAY)
    }



    let operateActivityOpenList: number[] = ActivitySystem.getInstance().getOperateActivityOpenList()
    for (let _ in operateActivityOpenList) {
        let index = operateActivityOpenList[_]

        JsUtil.arrayInstert(list, index)
    }


    return list
}





function GetPayActivityUiConfig(name: string) {
    let configList = PayActivityUiGroup[name]
    if (configList == null)
        return []
    return configList
}

//传入groupName,返回正在开启的活动的配置列表（顺序按PayActivityGroup定义）
function GetOpenActivityUiConfig(groupName:string) {
    let groupConfigList = PayActivityUiGroup[groupName]
    if(groupConfigList == null || groupConfigList.length == 0)
        return

    let retOpenConfigList = []

    let openList = GetOpenOperateActivityList()
    for(let config of groupConfigList){

        if(table_isExsit(openList, config.index)){
            retOpenConfigList.push(config)
        }
    }

    return retOpenConfigList
}


function ExecuteActivityIndex(index:number) {
    for(let k in PayActivityUiGroup){
        let configList = PayActivityUiGroup[k]

        for(let config of configList){
            if(config.index == index){
                let func:Function = config.handle
                if(func){
                     func.call(PayActivityHandler, config.param)
                }
                return true
            }
        }
    }

    return false
}
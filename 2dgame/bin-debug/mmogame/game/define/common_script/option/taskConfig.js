////////////////////////////////////////////////////////////////////////////////
//任务配置
////////////////////////////////////////////////////////////////////////////////
//record 是否记录 默认false
//acceptCount  可接数量 默认1
//hoopLimit 环段限制
//见taskType定义
var taskConfig = (_a = {},
    //taskType.Main
    _a[1] = {
        record: true,
    },
    //taskType.Branch
    _a[2] = {
        //record : true,
        acceptCount: 5,
    },
    //taskType.School
    //[3] : 
    //{
    //	internalTips : "SHIMEM_INTERNAL",
    //	dayTimesTips : "SHIMEM_DAY",
    //},
    //taskType.HuSong
    //[7] : 
    //{
    //	failTips : "HUSONG_FAILED",
    //	accpetCountTips : "YABIAO_ACCEPT_COUNT",
    //},
    //taskType.TianShi
    //[8] : 
    //{
    //},
    //taskType.Cangbaotu
    //[10] : 
    //{
    //	dayTimesTips : "CANBAOTU_DAY",
    //	weekTimesTips : "CANBAOTU_WEEK",
    //},
    //taskType.XiuWeiPuTong
    //[14] :
    //{
    //	unAutoSetLoop : true, //不自动更新环数
    //},
    //taskType.FeiXingQi
    //[28] :
    //{
    //	
    //},
    //taskType.Special
    _a[100] = {
        //record : true,
        acceptCount: 100,
    },
    //taskType.FactionJianZhu
    _a[25] = {},
    //taskType.FactionXuanWu
    _a[26] = {},
    _a[29] = {
        acceptCount: 10,
    },
    //taskType.FactionTask
    _a[30] = {
        //record : true,      //记录完成
        acceptCount: 1,
    },
    //taskType.FactionItemTask 道具类军团任务
    _a[31] = {
        //record : true,      //记录完成
        acceptCount: 1,
    },
    //taskType.FactionPubTask 道具类军团任务
    _a[32] = {
        //record : true,      //记录完成
        acceptCount: 1,
    },
    //taskType.Fengmo      //封魔任务
    _a[33] = {
        //record = true,
        maxPrizeCount: 20,
        acceptCount: 1,
    },
    _a);
var _a;
//# sourceMappingURL=taskConfig.js.map
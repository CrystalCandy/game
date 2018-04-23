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
var XunbaoWindow = (function (_super) {
    __extends(XunbaoWindow, _super);
    function XunbaoWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XunbaoWindow.prototype.initObj = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.endTimer = null;
        this.timer = null;
        this.activityIndex = PayActivityIndex.PET_LOTTERY_A;
        this.resetData();
    };
    XunbaoWindow.prototype.onLoad = function () {
        this.imageChooseList = [];
        this.mElemList = this.mParentWnd.mElemList;
        var group = this.mElemList["xunbao_list"];
        this.scroll = UIScrollList.newObj(this.mLayoutNode, "scroll", 0, 0, group.width, group.height, group, UIScrollList.DIR_VERTICAL);
        for (var i = 1; i < 13; i++) {
            var itemGroup = this.mElemList["item_group" + i];
            this.mElemList["xunbao_ItemBox_" + i] = UIItemBox.newObj(this.mLayoutNode, "xunbao_ItemBox_" + i, 4, 3, itemGroup, 0.9);
            this.mElemList["xunbao_select" + i].visible = false;
            var select = this.mElemList["xunbao_select" + i];
            table_insert(this.imageChooseList, select);
        }
    };
    XunbaoWindow.prototype.onUnLoad = function () {
    };
    XunbaoWindow.prototype.onShow = function () {
        this.resetData();
        RegisterEvent(EventDefine.XUNBAO_UPDATE, this.onUpdate, this);
        RegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this);
        RegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab1"].visible = true;
        RpcProxy.call("C2G_SendOperateAndPlayerData", this.activityIndex);
        this.onRefresh();
    };
    XunbaoWindow.prototype.onHide = function () {
        UnRegisterEvent(EventDefine.XUNBAO_UPDATE, this.onUpdate, this);
        UnRegisterEvent(EventDefine.PAY_ACTIVITY_INFO, this.onRefresh, this);
        UnRegisterEvent(EventDefine.HERO_INFO_UPDATE, this.onRefresh, this);
        this.mElemList["group_tab1"].visible = false;
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
        for (var i = 0; i < this.imageChooseList.length; i++) {
            var v = this.imageChooseList[i];
            v.visible = (this.stopNum == i);
        }
        if (this.endTimer) {
            KillTimer(this.endTimer);
            this.endTimer = null;
        }
    };
    XunbaoWindow.prototype.onRefresh = function () {
        this.mParentWnd.activityIndex = this.activityIndex;
        this.mElemList["title"].text = Localize_cns("LUCKY_TXT1");
        var xunbaoInfo = ActivitySystem.getInstance().getOperateActivityInfo(this.activityIndex);
        if (xunbaoInfo == null) {
            return;
        }
        var config = xunbaoInfo.lotteryConfig;
        this.mParentWnd.radioConfig = config; //告知上一层
        var lotteryEntry = xunbaoInfo.lotteryEntry;
        var reachList = xunbaoInfo.reachList;
        // this.nameToIndex = []
        var disposeItemList = [];
        var itemList = [];
        for (var i = 0; i < size_t(lotteryEntry); i++) {
            var info = lotteryEntry[i].prize;
            var itemInfo = AnalyPrizeFormat(info);
            table_insert(disposeItemList, itemInfo);
            table_insert(itemList, info);
        }
        this.disposeItemList = disposeItemList;
        this.itemList = itemList;
        for (var i = 0; i < 12; i++) {
            //xunbao_ItemBox_
            var item = disposeItemList[i];
            if (item) {
                this.mElemList["xunbao_ItemBox_" + (i + 1)].updateByEntry(item[0][0], item[0][1]);
            }
            else {
                this.mElemList["xunbao_ItemBox_" + (i + 1)].updateByEntry(-1);
            }
        }
        this.scroll.clearItemList();
        var list = reachList;
        //谁谁谁抽到了什么
        for (var i = 0; i < size_t(list); i++) {
            var v = list[i];
            var window_1 = this.scroll.getItemWindow(i, 260, 20, 0, 0, 2);
            this.initItemWindow(window_1);
            this.refreshItemWindow(window_1, v);
        }
        // this.scroll.refreshScroll()
        // this.scroll.restoreViewXY() 
        //更新RdInfo
        for (var i = 0; i < size_t(config); i++) {
            var rd = this.mElemList["lucky_rd" + (i + 1)];
            var info = config[i];
            var typeS = info[1];
            var num = info[2];
            var str = "";
            if (typeS == opItemUnit.BIND_CURRENCY) {
                str = "#BIND_YUANBAO";
            }
            else if (typeS == opItemUnit.CURRENCY) {
                str = "#YUANBAO";
            }
            var text = num + str;
            AddRdContent(rd, text, "ht_20_cc", "white");
        }
    };
    XunbaoWindow.prototype.initItemWindow = function (window) {
        var name = window.name;
        var width = 260, height = 20;
        var Info = [
            (_a = {}, _a["index_type"] = eui.Group, _a["name"] = name + "bg", _a["image"] = "", _a["x"] = 5, _a["y"] = 0, _a["w"] = width, _a["h"] = height, _a),
            (_b = {}, _b["index_type"] = eui.Label, _b["name"] = name + "tip", _b["parent"] = name + "bg", _b["title"] = "", _b["font"] = "ht_20_cc", _b["color"] = gui.Color.white, _b["x"] = 0, _b["y"] = 0, _b["w"] = width, _b["h"] = height, _b["messageFlag"] = true, _b),
        ];
        UiUtil.createElem(Info, this.mLayoutNode, this.mElemList, this, window);
        var _a, _b;
    };
    XunbaoWindow.prototype.refreshItemWindow = function (window, data) {
        var name = window.name;
        var roleName = data[0];
        // let index = data[1]
        // let item = this.itemList[index-1]
        var entryId = 20001;
        if (data[1] != 9) {
            var itemInfo = AnalyPrizeFormat(data[1]);
            entryId = itemInfo[0][0];
        }
        var itemName = ItemSystem.getInstance().getItemName(entryId);
        var text = String.format(Localize_cns("LUCKY_TXT5"), roleName, itemName);
        this.mElemList[name + "tip"].text = text;
    };
    //抽奖结果返回
    XunbaoWindow.prototype.onUpdate = function (args) {
        var resultInfo = ActivitySystem.getInstance().getOperateLotteryResultInfo(this.activityIndex);
        // if(size_t(resultInfo)<=1){
        // 	this.lottoType = 1
        // }
        this.ActivityLottoTable = [];
        for (var i = 0; i < size_t(resultInfo); i++) {
            var index = resultInfo[i];
            var itemInfo = this.itemList[index - 1];
            table_insert(this.ActivityLottoTable, itemInfo[0]);
        }
        // this.lottoType = args.lotteryType
        //this.ActivityLottoTable = args.prizeList	//这里要保存物品了
        var stopNumList = {};
        if (size_t(resultInfo) <= 1) {
            this.stopNum = resultInfo[0] - 1;
            // let stopEntryID = args.prizeList[1][1]
            // let itemCount = args.prizeList[1][2] || 1
            // let itemList = MountsSystem.getInstance().getMountsLuckRewardList()
            // for(let i = 1; i <=  itemList.length;i++){
            // 	if(stopEntryID == itemList[i][1] && itemCount == itemList[i][2] ){
            // 		JsUtil.arrayInstert(stopNumList,i)
            // 	}
            // }
            // let n = size_t(stopNumList)
            // this.stopNum = stopNumList[Math.random(n)]
            //this.stopNum = 0  //0-11
            this.startRotate();
        }
        else {
            // this.sendingMessage = 0
            var wnd = WngMrg.getInstance().getWindow("PrizeShowFrame");
            wnd.showAndSetData(this.ActivityLottoTable);
            // wnd.playAnimate()
            // wnd.setRepeatCallBack(this.onLottoTen, this, this.lottoType, Localize_cns("MOUNTS_TXT64"))
        }
        DelayEvecuteFunc(100, this.onRefresh, this);
    };
    ////////////////////////////-旋转//////////////////////////////-
    //开始转
    XunbaoWindow.prototype.startRotate = function () {
        var rate = Math.floor((36 + this.stopNum) / 3 + 0.5) / 36; // 时间间隔比例
        this.firstIntervalTime = this.firstIntervalTime * rate;
        this.secondIntervalTime = this.secondIntervalTime * rate;
        this.thirdIntervalTime = this.thirdIntervalTime * rate;
        this.fourthlyIntervalTime = this.fourthlyIntervalTime * rate;
        //this.setItemImage()	//这个好像是充值物品?
        for (var i = 0; i < size_t(this.imageChooseList); i++) {
            this.tipTypeList[i] = 2; //??
            if (this.imageChooseList[i].visible == true) {
                //if(this.imageChooseList[i].isVisible() ){
                this.imageChooseList[i].visible = (false);
            }
        }
        if (this.imageChooseList[0].visible == false) {
            //if(this.imageChooseList[1].isVisible() == false ){
            this.imageChooseList[0].visible = (true);
        }
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
        this.timer = SetTimer(this.checkSpeed, this, 20, true);
    };
    //控制转动速度
    XunbaoWindow.prototype.checkSpeed = function (delay) {
        if (this.turnsNum == 1) {
            if (this.totalTime < this.firstIntervalTime) {
                this.totalTime = this.totalTime + delay;
            }
            else {
                this.refreshPriceChoose();
                this.firstIntervalTime = this.firstIntervalTime - 10;
                this.totalTime = 0;
            }
        }
        else if (this.turnsNum == 2) {
            if (this.totalTime < this.secondIntervalTime) {
                this.totalTime = this.totalTime + delay;
            }
            else {
                this.refreshPriceChoose();
                this.totalTime = 0;
            }
        }
        else if (this.turnsNum == 3) {
            if (this.totalTime < this.thirdIntervalTime) {
                this.totalTime = this.totalTime + delay;
            }
            else {
                this.refreshPriceChoose();
                this.totalTime = 0;
            }
            //fourthlyIntervalTime	
        }
        else if (this.turnsNum == 4) {
            if (this.totalTime < this.fourthlyIntervalTime) {
                this.totalTime = this.totalTime + delay;
            }
            else {
                this.refreshPriceChoose();
                this.fourthlyIntervalTime = this.fourthlyIntervalTime + 10;
                this.totalTime = 0;
            }
        }
        // }else if(this.turnsNum == 3 ){
        // 	if(this.totalTime < this.thirdIntervalTime  ){
        // 		this.totalTime = this.totalTime + delay
        // 	}else{
        // 		this.refreshPriceChoose()
        // 		this.thirdIntervalTime = this.thirdIntervalTime + 10
        // 		this.totalTime = 0
        // 	}
        // }
    };
    //刷新选中框显隐
    XunbaoWindow.prototype.refreshPriceChoose = function () {
        this.currChooseNum = this.currChooseNum + 1;
        this.controlCircle = this.controlCircle + 1;
        if (this.currChooseNum > 12 * this.circleNum) {
            this.circleNum = this.circleNum + 1;
        }
        var num = Math.floor((33 + this.stopNum) / 3 + 0.5);
        if (this.controlCircle > num) {
            this.turnsNum = this.turnsNum + 1;
            this.controlCircle = 1;
        }
        this.refreshChooseVisible(); //刷新选中框显隐
    };
    //隐藏上一个奖励的高亮框，显示当前的
    XunbaoWindow.prototype.refreshChooseVisible = function () {
        for (var i = 0; i < size_t(this.imageChooseList); i++) {
            if (this.imageChooseList[i].visible == true) {
                //if(this.imageChooseList[i].isVisible() ){
                this.imageChooseList[i].visible = (false);
            }
        }
        var num = this.currChooseNum - 12 * (this.circleNum - 1) - 1;
        // if(num < 0){
        // 	num = 0
        // }
        if (this.imageChooseList[num].visible == false) {
            //if(this.imageChooseList[this.currChooseNum - 12*(this.circleNum-1)].isVisible() == false ){	//注意
            this.imageChooseList[num].visible = (true); //注意
        }
        if (this.circleNum > 2) {
            if (this.stopNum == num) {
                this.resetTimer();
            }
        }
    };
    //停止转圈计时
    XunbaoWindow.prototype.resetTimer = function () {
        if (this.timer) {
            KillTimer(this.timer);
            this.timer = null;
        }
        this.reset();
        for (var i = 0; i < this.imageChooseList.length; i++) {
            var v = this.imageChooseList[i];
            v.visible = (this.stopNum == i);
        }
        this.endTimer = SetTimer(this.openPrizeWindow, this, 350);
    };
    //打开奖励
    XunbaoWindow.prototype.openPrizeWindow = function () {
        if (this.endTimer) {
            KillTimer(this.endTimer);
            this.endTimer = null;
        }
        var wnd = WngMrg.getInstance().getWindow("PrizeShowFrame");
        wnd.showAndSetData(this.ActivityLottoTable);
        // wnd.playAnimate()
        // wnd.setRepeatCallBack(this.onLottoOnce, this, this.lottoType, Localize_cns("MOUNTS_TXT63"))
    };
    //转完一次后
    XunbaoWindow.prototype.reset = function () {
        //重置
        this.firstIntervalTime = 180; //第1圈第一个间隔时间
        this.secondIntervalTime = 10; //第2圈第一个间隔时间
        this.thirdIntervalTime = 10; //第3圈第一个间隔时间
        this.fourthlyIntervalTime = 20;
        this.turnsNum = 1;
        this.currChooseNum = 1;
        this.circleNum = 1; //当前圈数
        this.controlCircle = 1;
        this.sendingMessage = 0;
    };
    XunbaoWindow.prototype.resetData = function () {
        this.stopNum = 0; //停在哪里
        this.firstIntervalTime = 180; //第1圈第一个间隔时间
        this.secondIntervalTime = 10; //第2圈第一个间隔时间
        this.thirdIntervalTime = 10; //第3圈第一个间隔时间
        this.fourthlyIntervalTime = 20;
        this.tipTypeList = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
        //this.imageChooseList = []
        this.turnsNum = 1;
        this.totalTime = 0;
        this.currChooseNum = 1; //当前显示选中框
        this.controlCircle = 1; //用来分割速度
        this.circleNum = 1; //当前圈数
        this.sendingMessage = 0;
    };
    return XunbaoWindow;
}(BaseCtrlWnd));
__reflect(XunbaoWindow.prototype, "XunbaoWindow");
//# sourceMappingURL=XunbaoWindow.js.map
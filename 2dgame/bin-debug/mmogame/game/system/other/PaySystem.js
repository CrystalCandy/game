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
function GetYuanTitle() {
    return PaySystem.getInstance().getUnitTitle();
}
var PaySystem = (function (_super) {
    __extends(PaySystem, _super);
    function PaySystem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaySystem.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        RegisterEvent(EventDefine.PAY_FORM_GAME_SERVER, this.onPayReturnFromGameServer, this);
        RegisterEvent(EventDefine.CAMPAIGN_FINISH, this.openFirstPay, this);
        this.onClear();
        //星灵升阶是不是直接冲值
        this.animalPayCash = SdkHelper.getInstance().getBoolConfigDef("AnimalPayCash", true);
        //卖将是不是直接冲值
        this.petSellPayCash = SdkHelper.getInstance().getBoolConfigDef("PetSellPayCash", true);
    };
    PaySystem.prototype.destory = function () {
    };
    PaySystem.prototype.getAnimalByCash = function () {
        return this.animalPayCash;
    };
    PaySystem.prototype.getSellPetByCash = function () {
        return this.petSellPayCash;
    };
    PaySystem.prototype.prepareResource = function (workQueue) {
        GameConfig.initPaySystemCsv(workQueue);
        this.diamondExRate = tonumber(SdkHelper.getInstance().getStringConfigDef("CurrencyToDiamond", "10"), 10);
        //Core.IGameSdk.inst.SubscribeEvent(Core.IGameSdk.PayEvent, this.payReturnFromSdk, this)
        //IGlobal.sdkHelper.addEventListener(EventDefine.PAY_SDK_EVENT, this.payReturnFromSdk, this)
        IGlobal.gameSdk.addEventListener(core.GameSdk.PAY_SDK_EVENT, this.payReturnFromSdk, this);
    };
    PaySystem.prototype.onClear = function () {
        this.payBackInfo = null;
        this.paySellRecord = [];
    };
    PaySystem.prototype.animalByCash = function () {
        return this.animalPayCash;
    };
    PaySystem.prototype.payFromItem = function (info) {
        var itemid = info.RechargeId;
        var title = info.title;
        var saveValue = info.Gain; //买多少个
        //let saveValue = 1//info.Gain//买一个
        var rechargeAdd = info.ChargeCount; //给多少钱
        //let payString = tostring(Math.ceil(rechargeAdd * 10))//1块钱=1q币=10q点 pay的单位为q点
        var serverinfo = LoginSystem.getInstance().getRecentLoginServerInfo();
        var zoneId = tostring(Math.ceil(serverinfo.ServerID)); //1//tostring(Math.ceil(serverId))//"2"
        var roleId = GetHero().getId(); //1002//tostring(GameInfo.getInstance().GetSelfRoleId())
        //let payParams = "title="+title+"&saveValue="+saveValue+"&pay="+payString +"&zoneId="+zoneId +"&app_metadata=" +roleId +"&itemid=" +itemid
        var hero = GetHeroPropertyInfo();
        var roleLevel = hero.level;
        var roleName = hero.name;
        var accountId = GameAccount.getInstance().getAccountId();
        var isItemShop = 0; //是否直接购买物品
        if (itemid == 1000) {
            isItemShop = 1;
        }
        var thirdPayLevel = 20;
        // if (isThai()) {
        //     thirdPayLevel = 0
        // }
        var nameUrlEncode = JsUtil.UrlEncode(roleName);
        //let roleNameBase64 = GetBase64EncodeString(roleName, string.len(roleName))
        //let roleNameUrlEncode = UrlEncode(roleNameBase64)
        //TLog.Debug("roleName, roleNameBase64", roleName, roleNameBase64, roleNameUrlEncode)
        var roleMission = CampaignSystem.getInstance().getCurOpenCampaign();
        var payParams = "title=" + title + "&acctType=" + title + "&saveValue=" + saveValue + "&payMoney=" + rechargeAdd + "&zoneId=" + zoneId + "&roleId=" + roleId + "&itemId=" + itemid;
        payParams = payParams + "&roleName=" + nameUrlEncode + "&roleLevel=" + roleLevel + "&roleMission=" + roleMission;
        payParams = payParams + "&accountId=" + accountId;
        payParams = payParams + "&thirdPayLevel=" + thirdPayLevel; //google商店下，开启第三方支付的等级
        payParams = payParams + "&isItemShop=" + isItemShop; //是否月卡
        TLog.Debug("PaySystem.payFromItem", payParams);
        this.itemid = itemid;
        SDKAnalyzer(SdkEventDefine.SDK_PAY_BEGIN, "");
        IGlobal.sdkHelper.callPay(payParams);
    };
    PaySystem.prototype.checkMonthCardTooMuchAndTips = function () {
        var activity = GetActivity(ActivityDefine.Welfare);
        var warhorn_list = activity.GetWarHorn();
        var tooMach = false;
        if (warhorn_list.index > 0) {
            var time = warhorn_list.time / 86400;
            if (time > 330) {
                tooMach = true;
                MsgSystem.confirmDialog_YES(Localize_cns("SIGN_YUEKA_TEXT7"));
            }
        }
        return tooMach;
    };
    PaySystem.prototype.payFromId = function (id) {
        TLog.Debug("PaySystem.payFromId", id);
        var v = GameConfig.RechargeConfig[id];
        if (v) {
            this.payFromItem(v);
        }
    };
    //冲值星灵(神兽)
    // payFromAnimal(){
    //     let myLevel = GetHeroProperty("Animal_Level")
    //     let payidlist = this.getAnimalPayIdList(myLevel + 1)
    //     if(payidlist.length == 1 ){
    //         this.payFromId(payidlist[0])
    //     }else{
    //         let save_list = GetHeroProperty("Animal_SaveList")
    //         if(save_list == null || save_list.length == 0 ){
    //             this.payFromId(payidlist[0])
    //         }else{
    //             for(let _ in payidlist){
    //             let v = payidlist[_]
    //                 if(table_isExsit(save_list, v) == false ){
    //                     this.payFromId(v)
    //                 }
    //             }
    //         }
    //     }
    // }
    //冲值买将
    // payFromPet(){
    //     TLog.Debug("PaySystem.payFromPet")
    //     let index = this.getCurOnSellIndex()
    //     TLog.Debug("index", index)
    //     if(index != null ){
    //         let info = GameConfig.PaySellPetConfig[index]
    //         //TLog.Debug_r({"info", info})
    //         if(info != null ){
    //             this.payFromId(info.quota)
    //         }
    //     }
    // }
    PaySystem.prototype.payFromCard = function () {
        this.payFromId(1000);
    };
    PaySystem.prototype.tick = function (delay) {
        if (this.timerId != null) {
            KillTimer(this.timerId);
            this.timerId = null;
        }
        this._PayReturn(this.sdkPayRetCode, this.sdkPayRetParams);
        //FireEvent(EventDefine.PAY_RETURN, IdAndInfoEvent.newObj(this.sdkPayRetCode, this.sdkPayRetParams))
    };
    PaySystem.prototype._PayReturn = function (returnCode, retParams) {
        TLog.Debug("============_PayReturn==============");
        TLog.Debug(returnCode);
        TLog.Debug(retParams);
        if (returnCode == 0) {
            MsgSystem.addTagTips(Localize_cns("PAY_SUCCESS"));
            var message = GetMessage(opCodes.C2G_PAY);
            message.params = retParams;
            SendGameMessage(message);
            FireEvent(EventDefine.MSG_WAIT_BEGIN, null);
            //这里要上传服务器，等待服务器发晶石
        }
        else if (returnCode == 1) {
            MsgSystem.addTagTips(Localize_cns("PAY_UNKNOW"));
            var message = GetMessage(opCodes.C2G_PAY);
            message.params = retParams;
            SendGameMessage(message);
            FireEvent(EventDefine.MSG_WAIT_BEGIN, null);
            //这里要上传服务器，等待服务器发晶石  
        }
        else {
            if (SdkHelper.getInstance().getBoolConfigDef("CheatPay", false) == true) {
                if (this.itemid != null) {
                    var message = GetMessage(opCodes.C2G_PAY_CHEAT);
                    message.params = "itemid=" + tostring(this.itemid);
                    SendGameMessage(message);
                    MsgSystem.addTagTips(Localize_cns("PAY_SUCCESS"));
                    FireEvent(EventDefine.MSG_WAIT_BEGIN, null);
                }
            }
            else {
                MsgSystem.addTagTips(Localize_cns("PAY_FAIL"));
            }
            //AlertManager.getInstance().showMessageAlert(Local_cns("PAY_ERROR")+retParams)
        }
    };
    PaySystem.prototype.nextFrameFireEvent = function () {
        if (this.timerId != null) {
            KillTimer(this.timerId);
        }
        this.timerId = SetTimer(this.tick, this, 1, false);
    };
    PaySystem.prototype.payReturnFromSdk = function (args) {
        SDKAnalyzer(SdkEventDefine.SDK_PAY_FINISH, "");
        //tolua.cast(args, "Core::SdkReturnArgs")
        this.sdkPayRetCode = args.code; //0是正确
        this.sdkPayRetParams = args.params;
        TLog.Debug("PaySystem.payReturnFromSdk", this.sdkPayRetCode, this.sdkPayRetParams);
        //let sdkLoginParamsList = SplitUrlParams(sdkLoginRetParams)
        //FireEvent(EventDefine.SHARE_RETURN,IdAndInfoEvent.newObj(this.sdkLoginRetCode, this.sdkLoginRetParams))
        //直接看 sdkLoginRetCode == 0表示分享成功 sdkLoginRetCode == -1表示用户在分享到一半时取消 sdkLoginRetCode == -2表示网络原因分享出错
        this.nextFrameFireEvent();
    };
    PaySystem.prototype.onPayReturnFromGameServer = function (args) {
        FireEvent(EventDefine.MSG_WAIT_END, null);
        var chargeValue = args.msg.chargeValue; //冲了多少钱
        var gainValue = args.msg.gainValue; //得了多少晶石
        var rebateValue = args.msg.rebateValue; //送了多少晶石
        var firstRebateValue = args.msg.firstRebateValue; //首冲送了多少晶石
        IGlobal.sdkHelper.callSdk("pay_from_server", tostring(chargeValue));
    };
    //getCurrencyWithDiamond( dia, rate){
    //	rate = rate || this.diamondExRate
    //	
    //	return dia / rate
    //}
    //
    //getDiamondWithCurrency( money, rate){
    //	rate = rate || this.diamondExRate
    //	
    //	return money * rate
    //}
    //
    ////暂时以货币对晶石的汇率为区分（简体、繁体）版本 10为简体、2为繁体
    //isPlatform( index){
    //	return this.diamondExRate == index
    //}
    PaySystem.prototype.getYuekaRecharge = function (index) {
        var yueKaCost = 0;
        var v = GameConfig.RechargeConfig[1000];
        if (v) {
            yueKaCost = v.ChargeCount;
        }
        return yueKaCost;
    };
    PaySystem.prototype.setPayBackInfo = function (info) {
        this.payBackInfo = info;
    };
    PaySystem.prototype.getPayBackInfo = function () {
        return this.payBackInfo;
    };
    PaySystem.prototype.getUnitTitle = function () {
        var info = GameConfig.RechargeConfig[0];
        if (this.unitTitle == null) {
            this.unitTitle = StringUtil.stringMatch(info.Tips, /\d+[.]?\d*(.+)/)[0];
        }
        return this.unitTitle || "Error";
    };
    PaySystem.prototype.openFirstPay = function (args) {
        var config = GameConfig.CampaignConfig[args.campaignId];
        if (!config) {
            return;
        }
        //通过9关时自动弹出首充界面
        if (args.campaignId == 1009) {
            var vipLevel = VipSystem.getInstance().GetVipLevel();
            if (vipLevel == 0) {
                ExecuteMainFrameFunction("shouchong");
            }
        }
        else if (args.campaignId == 1015) {
            if (PetSystem.getInstance().getPetInfoEntry(18023) == null) {
                //WngMrg.getInstance().showWindow("PaySellPetFrame")
                ExecuteMainFrameFunction("shouchong");
            }
        }
        else if (args.campaignId == 1013) {
            ExecuteMainFrameFunction("qiandao");
        }
    };
    PaySystem.prototype.setMonthCardInfo = function (overTime, isGet) {
        this.monthCardInfo = (_a = {}, _a["overTime"] = overTime, _a["isGet"] = isGet, _a);
        var _a;
    };
    PaySystem.prototype.getMonthCardInfo = function () {
        return this.monthCardInfo;
    };
    PaySystem.prototype.setWeekCardInfo = function (overTime, isGet) {
        this.weekCardInfo = (_a = {}, _a["overTime"] = overTime, _a["isGet"] = isGet, _a);
        var _a;
    };
    PaySystem.prototype.getWeekCardInfo = function () {
        return this.weekCardInfo;
    };
    PaySystem.prototype.isWeekCardActive = function () {
        var weekCard = getSaveRecord(opSaveRecordKey.weekCard) || 0;
        return weekCard > GetServerTime();
    };
    PaySystem.prototype.isMonthCardActive = function () {
        var moncarCard = getSaveRecord(opSaveRecordKey.monthCard) || 0;
        return moncarCard > GetServerTime();
    };
    // getAnimalPayIdList( level){
    //         let payidlist = GameConfig.AnimalConfig[level].ardpayid
    //         //if(! SdkHelper.getInstance().InPlatformAndroid() ){
    //         ////if(SdkHelper.getInstance().InPlatformIOS() ){
    //         //    payidlist = GameConfig.AnimalConfig[level].iospayid
    //         //}
    //         return payidlist
    // }
    //伙伴直购
    // getCurOnSellIndex(){
    //     let paycash = this.getSellPetByCash()
    //     let index = null
    //     for(let k in GameConfig.PaySellPetConfig){
    //         let v = GameConfig.PaySellPetConfig[k]
    //         let check = (v.onsell == 1)
    //         if(check ){
    //             if(paycash ){//直接冲值得女神的
    //                 check = (v.paytype == 2)
    //             }else{
    //                 check = (v.paytype == 1)
    //             }
    //         }
    //         if(check){					//上架中
    //             if (this.paySellRecord == null){
    //                 return v
    //             }
    //             let index1 = v.index
    //             if (this.paySellRecord == null || Array.isArray(this.paySellRecord)){
    //                 index1 = tonumber(v.index) - 1
    //             }
    //             //if (table_isExsit(this.paySellRecord, v.index)  == false){
    //             if(this.paySellRecord == null || this.paySellRecord[index1] == null){
    //                 if(! index ){
    //                     index = v.index
    //                 }else if(index > v.index ){
    //                     index = v.index
    //                 }
    //             }
    //         }
    //     }
    //     return index
    // }
    PaySystem.prototype.updatePaySellRecord = function (record) {
        this.paySellRecord = record || {};
    };
    return PaySystem;
}(BaseSystem));
__reflect(PaySystem.prototype, "PaySystem");
//# sourceMappingURL=PaySystem.js.map
// TypeScript file
/*
作者:
    
    
创建时间：
   

意图：
        快速跳转执行
   

公共接口：

*/
//let doEventHandler:any = {}
//
//doFastJump(eventName,param,args){
//	TLog.Debug("FastJumpSystem.doFastJump",eventName)
//	if(doEventHandler[eventName] ){
//		return doEventHandler[eventName](this, param,args)
//	}else{
//		TLog.Error("FastJumpSystem.doFastJump eventName %s is null!!!", eventName)
//	}
//}
ImportType(FastJumpTypeList);
var FastJumpSpace;
(function (FastJumpSpace) {
    /*
作者:
    panjunhua
    
创建时间：
   2015.8.6(周四)

意图：
        快速跳转执行
   

公共接口：

*/
    FastJumpSpace.doEventHandler = {};
    //通用打开关卡界面
    function openCampaign(param) {
        ExecuteMainFrameFunction("guanka");
        return "CopyCardFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_CAMPAIGN] = openCampaign;
    //打开指定关卡
    function openLocalCampaign(param) {
        var wnd = WngMrg.getInstance().getWindow("CopyCardFrame");
        wnd.showCopyCard(null, null, param);
        return "CopyCardFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_APPOIN_CAMPAIGN] = openLocalCampaign;
    //圣地
    // function openBrokenHistory(param) {
    // 	//let curIndex = ActivitySystem.getInstance().getCurActIndex()
    // 	//if(curIndex != OrdinaryActivityIndex.NULL ){
    // 	//	if(curIndex == OrdinaryActivityIndex.SHENGDI ){
    // 	//		let txt = ""
    // 	//		if(type(param) == "table" ){
    // 	//			for(let k = 0; k < param.length; k++){
    // 	//		let v = param[k]
    // 	//
    // 	//				if(npcConfig[v] ){
    // 	//					if(k != 1 ){
    // 	//						txt = "," +txt
    // 	//					}
    // 	//					
    // 	//					txt = txt +npcConfig[v].name
    // 	//				}
    // 	//			}
    // 	//			
    // 	//			MsgSystem.AddTagTips(String.format(Localize_cns("ROBBER_TXT102"), txt))
    // 	//		}else if(type(param) == "number" ){
    // 	//			if(npcConfig[param] ){
    // 	//				MsgSystem.AddTagTips(String.format(Localize_cns("ROBBER_TXT102"), npcConfig[param].name))
    // 	//			}
    // 	//		}
    // 	//		return MsgSystem.AddTagTips(Localize_cns("TEAM_TXT77"))
    // 	//	}else{
    // 	//		return MsgSystem.AddTagTips(Localize_cns("TEAM_TXT78"))
    // 	//	}
    // 	//}
    // 	//ExecuteMainFrameFunction("shengdi")
    // 	if (TeamMemberFollowBaned()) {
    // 		return
    // 	}
    // 	if (param == null){
    // 		return
    // 	}
    // 	//TLog.Assert(param != null)
    // 	//if (param) {
    // 	let activity = GetActivity(ActivityDefine.Robber)
    // 	let entryId = null
    // 	if (type(param) == "object") {
    // 		let maxLayer = 0
    // 		let info = GetActivity(ActivityDefine.SkyTower).getSkyTowerInfo()
    // 		let hMaxLayer = info.historyMaxLayer || 0
    // 		for (let _ in param) {
    // 			let entry = param[_]
    // 			let config = activity.getFightMonsterConfig(entry)
    // 			if (config) {
    // 				if (config.skyLayer <= hMaxLayer) {
    // 					if (maxLayer < config.skyLayer) {
    // 						maxLayer = config.skyLayer
    // 						entryId = entry
    // 					}
    // 				}
    // 			}
    // 		}
    // 		if (!entryId) {
    // 			entryId = param[0]
    // 		}
    // 	} else {
    // 		entryId = param
    // 	}
    // 	let robberConfig = null 
    // 	for(let _ in GameConfig.RobberMonsterConfig){
    // 		let config = GameConfig.RobberMonsterConfig[_]
    // 		if(config.npcEntryId == entryId ){
    // 			robberConfig = config
    // 			break
    // 		}
    // 	}
    // 	if(robberConfig == null ){
    // 		TLog.Error("openBrokenHistory RobberMonsterConfig[%s] == null ", tostring(entryId))
    // 		return
    // 	}
    // 	let skyConfig = GameConfig.SkyTowerEnemyConfig[robberConfig.skyLayer]
    // 	if(skyConfig == null ){
    // 		TLog.Error("openBrokenHistory SkyTowerEnemyConfig[%s] == null ", tostring(robberConfig.skyLayer))
    // 		return
    // 	}
    // 	 let wnd = WngMrg.getInstance().getWindow("QuickGainFrame")
    // 	 wnd.setAutoClose(false)
    // 	//关卡不足
    // 	if(CampaignSystem.getInstance().isCampaignPass(skyConfig.campId) == false ){
    // 		let name = CampaignSystem.getInstance().getCampaignName(skyConfig.campId)
    // 		MsgSystem.addTagTips(String.format(Localize_cns("GUIDE_TXT1"), name))
    // 		return
    // 	}
    // 	//地宫不足
    // 	let info = GetActivity(ActivityDefine.SkyTower).getSkyTowerInfo()
    // 	let hMaxLayer = info.historyMaxLayer || 0
    // 	//let currentFloor = getSaveRecord(opSaveRecordKey.SkyTowerChallenge) || 0
    // 	if(hMaxLayer < robberConfig.skyLayer ){
    // 		MsgSystem.addTagTips(String.format(Localize_cns("ROBBER_TXT40"), robberConfig.skyLayer))
    // 		return
    // 	}
    // 	wnd.setAutoClose(true)
    // 	activity.stopFightToFindMonster(entryId)
    // 	// if (activity.isStart()) {
    // 	// 	activity.stopFightToFindMonster(entryId)
    // 	// 	return
    // 	// }
    // 	//
    // 	// function startHandler() {
    // 	// 	//GetActivity(ActivityDefine.Robber):requestStopAutoFight()
    // 	// 	//GetActivity(ActivityDefine.Robber).fightMgr.stopAutoFight(GetHero())
    // 	// 	//
    // 	// 	//let config = GetActivity(ActivityDefine.Robber):getFightMonsterConfig(entryId)
    // 	// 	//if(config ){
    // 	// 	//	let x, y = config["pos"][1], config["pos"][2]
    // 	// 	//	GetActivity(ActivityDefine.Robber):goAndFightMonster(x, y, config.index)
    // 	// 	//}
    // 	// 	activity.stopFightToFindMonster(entryId)
    // 	// }
    // 	// activity.addActStartHandler(this, startHandler)
    // 	//}
    // 	//ExecuteMainFrameFunction("shengdi")
    // 	return null
    // }
    // doEventHandler[FastJumpTypeList.FIELD_BROKENHISTORY] = openBrokenHistory
    //积分商城
    // function openJinfenShangCheng(param) {
    // 	let wnd = WngMrg.getInstance().getWindow("ShopFrame")
    // 	wnd.showWithScoreShop(param)
    // 	return "ShopFrame"
    // }
    // doEventHandler[FastJumpTypeList.FIELD_INTEGRATION] = openJinfenShangCheng
    // //晶石商城
    // function openDiaShangCheng(param) {
    // 	let wnd = WngMrg.getInstance().getWindow("ShopFrame")
    // 	wnd.showWithDealShop(param)
    // 	return "ShopFrame"
    // }
    // doEventHandler[FastJumpTypeList.FIELD_DIAMOND_SHANGCHENG] = openDiaShangCheng
    //商城（交易所）
    // function openShangCheng(param) {
    // 	//ExecuteMainFrameFunction("jiaoyisuo")
    // 	//return "ShopFrame"
    // 	let wnd = WngMrg.getInstance().getWindow("ShopBuyFrame")
    // 	wnd = wnd.quickShowShopItem(param)
    // 	return "ShopBuyFrame"
    // }
    // doEventHandler[FastJumpTypeList.FIELD_SHOP] = openShangCheng
    //世界boss
    function openWorldBoss(param) {
        ExecuteMainFrameFunction("boss");
        return;
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_WORLDBOSS] = openWorldBoss;
    //贵族答题
    function openAnswerQuestion(param) {
        ExecuteMainFrameFunction("dati");
        return "AnswerQuestionEntryFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_ANSWERQUESTION] = openAnswerQuestion;
    //溶解
    function openDecompose(param) {
        ExecuteMainFrameFunction("rongjie");
        return "ItemResolveFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_DECOMPOSE] = openDecompose;
    //抽将
    function openChouJiang(param) {
        ExecuteMainFrameFunction("choujiang");
        return "PetSummonFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_SUMMON] = openChouJiang;
    //军团副本
    function openJunTuanFuBen(param) {
        ExecuteMainFrameFunction("gonghui");
        return;
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_SEALEDGROUND] = openJunTuanFuBen;
    //购买金币
    function openMaiJinbi(param) {
        ExecuteMainFrameFunction("jinbi");
        return "GoldBuyFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_BUYJINBI] = openMaiJinbi;
    //购买钻石
    function openMaiZuanshi(param) {
        var wnd = WngMrg.getInstance().getWindow("PayFrame");
        wnd.showWindow();
        return "PayFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_CHONGZHI] = openMaiZuanshi;
    //关卡首通
    function openShouTongGuanka(param) {
        ExecuteMainFrameFunction("guanka");
        return "CopyCardFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_SHOUTONG_GUANKA] = openShouTongGuanka;
    //试练场首通
    function openShouTongShilianchang(param) {
        ExecuteMainFrameFunction("shilian");
        return "SkyTowerFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_SHOUTONG_SHILIANCHANG] = openShouTongShilianchang;
    //竞技场连胜
    function openJingjiLiansheng(param) {
        ExecuteMainFrameFunction("jingjichang");
        return "ChampionFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_LIANSHENG_JINGJI] = openJingjiLiansheng;
    //竞技场首次排名
    function openShouTongJingji(param) {
        ExecuteMainFrameFunction("jingjichang");
        return "ChampionFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_SHOUTONG_JINGJI] = openShouTongJingji;
    //公会入驻
    function openGonghui(param) {
        ExecuteMainFrameFunction("gonghui");
        return "";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_GONGHUIRUZHU] = openGonghui;
    //聊天
    function openLiaotian(param) {
        WngMrg.getInstance().showWindow("ChatInChannelFrame");
        return "ChatInChannelFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_LIAOTIAN] = openLiaotian;
    //弹出文字提示
    function openTips(param) {
        var wnd = WngMrg.getInstance().getWindow("QuickGainFrame");
        wnd.setAutoClose(false);
        //{title, msg, check}
        MsgSystem.addTagTips(param[1]);
        return "";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_MESSAGETIPS] = openTips;
    //分享
    function openFenxiang(param) {
        WngMrg.getInstance().showWindow("SettingFrame");
        return "SettingFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_FENXIANG] = openFenxiang;
    //赠送好友体力
    function openSongtili(param) {
        var wnd = WngMrg.getInstance().getWindow("FriendsFrame");
        wnd.showWithIndex("haoyou");
        return "FriendsFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_SONGTILI] = openSongtili;
    //购买体力
    // function openMaitili(param) {
    // 	ExecuteMainFrameFunction("maitili")
    // 	return "GlodAndPowerBuyFrame"
    // }
    // doEventHandler[FastJumpTypeList.FIELD_MAITILI] = openMaitili
    //养成
    function openYangcheng(param) {
        ExecuteMainFrameFunction("yangcheng");
        return "GrowFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_YANGCHENG] = openYangcheng;
    //签到
    function openQiandao(param) {
        ExecuteMainFrameFunction("qiandao");
        return "DailySignInFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_QIANDAO] = openQiandao;
    //主角等级
    function openZhujuedengji(param) {
        ExecuteMainFrameFunction("huobanhero");
        return "PetFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_ZHUJUEDENGJI] = openZhujuedengji;
    //职业
    function openZhiye(param) {
        ExecuteMainFrameFunction("zhiye");
        return "ProfessionFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_ZHIYE] = openZhiye;
    //装备
    function openZhuangbei(param) {
        //let wnd = WngMrg.getInstance().getWindow("PetFrame")
        //wnd.showTabEntryId(PetFrame.EquipTab, 0)
        return "PetFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_ZHUANGBEI] = openZhuangbei;
    //御灵
    function openYuling(param) {
        ExecuteMainFrameFunction("yuling");
        return "SacrificeFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_YULING] = openYuling;
    //试练场
    function openShilianchang(param) {
        ExecuteMainFrameFunction("shilian");
        return "SkyTowerFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_SHILIANCHANG] = openShilianchang;
    //竞技场
    function openJingji(param) {
        ExecuteMainFrameFunction("jingjichang");
        return "ChampionFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_JINGJI] = openJingji;
    //快捷使用
    function openQuickUse(param) {
        var itemList = {};
        for (var _ = 0; _ < param.length; _++) {
            var entryId = param[_];
            var t = ItemSystem.getInstance().getItemLogicInfoByEntry(entryId);
            if (t.length > 0) {
                itemList = t;
                break;
            }
        }
        if (!itemList[0]) {
            TLog.Error("doEventHandler FastJumpTypeList.FIELD_QUICKUSE");
            return;
        }
        var item = itemList[0];
        var wnd = WngMrg.getInstance().getWindow("ItemBatchUseFrame");
        wnd.showWithItemInfo(item);
        return "ItemBatchUseFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_QUICKUSE] = openQuickUse;
    //运营活动中产出
    function openYunyinghuodong(param) {
        return;
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_YUNYINGHUODONG] = openYunyinghuodong;
    //购买金币
    // function openMaiHuoLi(param) {
    // 	let canaddlive = growOptions.buyLiveNum
    // 	let maxnum = GrowSystem.getInstance().getMaxBuyLiveNum()
    // 	let curnum = GrowSystem.getInstance().getBuyLiveNum()
    // 	TLog.Debug("curnum, maxnum", curnum, maxnum)
    // 	let hasbuynum = maxnum - curnum
    // 	if (hasbuynum <= 0) {
    // 		MsgSystem.addTagTips(String.format(Localize_cns("GROW_BUY_LIVE_NUM_MAX"), maxnum))
    // 		return
    // 	}
    // 	let price = GrowSystem.getInstance().getBuyLivePrice()
    // 	hasbuynum = maxnum - curnum
    // 	let txt = String.format(Localize_cns("GROW_BUY_LIVE_SURE"), price, canaddlive, hasbuynum)
    // 	let t: IDialogCallback = {
    // 		onDialogCallback(result: boolean, userData): void {
    // 			if (result) {
    // 				let myDiamond = GetHeroProperty("gold")
    // 				if (price > myDiamond) {
    // 					let wnd = WngMrg.getInstance().getWindow("QuickGainFrame")
    // 					let itemConfig: any = [["zuanshi", 0], ["GrowFrame"]]
    // 					wnd.showQuickGainFrame(itemConfig)
    // 				} else {
    // 					let msg = GetMessage(opCodes.C2G_GROW_BUY_LIVE)
    // 					SendGameMessage(msg)
    // 				}
    // 			}
    // 		}
    // 	}
    // 	MsgSystem.confirmDialog(txt, t, ConfirmFrom.GROW_LIVE)
    // 	return null
    // }
    // doEventHandler[FastJumpTypeList.FIELD_MAIHUOLI] = openMaiHuoLi
    //公会仓库分配
    function openGonghuicangku(param) {
        return null;
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_GONGHUI_CANGKU] = openGonghuicangku;
    //航海
    function openHanghai(param) {
        ExecuteMainFrameFunction("hanghai");
        return;
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_HANGHAI] = openHanghai;
    //血盟
    function openXuemeng(param) {
        ExecuteMainFrameFunction("xuemeng");
        return;
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_XUEMENG] = openXuemeng;
    //个人主页
    function openHomepage(param) {
        ExecuteMainFrameFunction("homepage");
        return;
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_HOMEPAGE] = openHomepage;
    //天梯
    function openTianti(param) {
        ExecuteMainFrameFunction("tianti");
        return;
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_TIANTI] = openTianti;
    //众神之战
    function openZhenying(param) {
        ExecuteMainFrameFunction("zhenying");
        return;
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_ZHENYING] = openZhenying;
    //圣地boss
    function openSDBoss(param) {
        ExecuteMainFrameFunction("shengdiboss");
        return "RobberBossFrame";
    }
    FastJumpSpace.doEventHandler[FastJumpTypeList.FIELD_SDBOSS] = openSDBoss;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////-
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //检查
    FastJumpSpace.checkEventHandler = {};
    //通用打开关卡界面
    function checkCampaign(param) {
        return [true, Localize_cns("QUICKGAIN_TXT2")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_CAMPAIGN] = checkCampaign;
    //打开指定关卡
    function checkLocalCampaign(param) {
        // return CampaignSystem.getInstance().isCampaignOpen(param), CampaignSystem.getInstance().getCampaignName(param), Localize_cns("QUICKGAIN_TXT22")
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_APPOIN_CAMPAIGN] = checkLocalCampaign;
    //圣地
    function checkBrokenHistory(param) {
        var _a = CheckMainFrameFunction("shengdi"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("QUICKGAIN_TXT3"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_BROKENHISTORY] = checkBrokenHistory;
    //积分商城
    function checkJinfenShangCheng(param) {
        var shopType = "";
        if (param) {
            shopType = "(#brown" + Localize_cns("SHOP_TAB_SCORE_" + param) + "#rf)";
        }
        return [true, Localize_cns("QUICKGAIN_TXT4") + shopType];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_INTEGRATION] = checkJinfenShangCheng;
    //晶石商城
    function checkDiaShangCheng(param) {
        var shopType = "";
        if (param) {
            shopType = "(#brown" + Localize_cns("SHOP_TAB_DEAL_" + param) + "#rf)";
        }
        return [true, Localize_cns("QUICKGAIN_TXT30") + shopType];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_DIAMOND_SHANGCHENG] = checkDiaShangCheng;
    //商城（交易所）
    function checkShangCheng(param) {
        return [true, Localize_cns("QUICKGAIN_TXT5")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_SHOP] = checkShangCheng;
    //世界boss
    function checkWorldBoss(param) {
        return [true, Localize_cns("QUICKGAIN_TXT6")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_WORLDBOSS] = checkWorldBoss;
    //贵族答题
    function checkAnswerQuestion(param) {
        return [true, Localize_cns("QUICKGAIN_TXT7")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_ANSWERQUESTION] = checkAnswerQuestion;
    //溶解
    function checkDecompose(param) {
        return [true, Localize_cns("QUICKGAIN_TXT8")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_DECOMPOSE] = checkDecompose;
    //抽将
    function checkChouJiang(param) {
        return [true, Localize_cns("QUICKGAIN_TXT9")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_SUMMON] = checkChouJiang;
    //军团副本
    function checkJunTuanFuBen(param) {
        var _a = CheckMainFrameFunction("gonghui"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("QUICKGAIN_TXT10"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_SEALEDGROUND] = checkJunTuanFuBen;
    //购买金币
    function checkMaiJinbi(param) {
        return [true, Localize_cns("QUICKGAIN_TXT11")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_BUYJINBI] = checkMaiJinbi;
    //购买钻石
    function checkMaiZuanshi(param) {
        return [true, Localize_cns("QUICKGAIN_TXT12")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_CHONGZHI] = checkMaiZuanshi;
    //关卡首通
    function checkShouTongGuanka(param) {
        return [true, Localize_cns("QUICKGAIN_TXT13")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_SHOUTONG_GUANKA] = checkShouTongGuanka;
    //试练场首通
    function checkShouTongShilianchang(param) {
        var _a = CheckMainFrameFunction("shilian"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("QUICKGAIN_TXT14"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_SHOUTONG_SHILIANCHANG] = checkShouTongShilianchang;
    //竞技场连胜
    function checkJingjiLiansheng(param) {
        var _a = CheckMainFrameFunction("jingjichang"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("QUICKGAIN_TXT15"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_LIANSHENG_JINGJI] = checkJingjiLiansheng;
    //运营活动中产出
    function checkYunyinghuodong(param) {
        return [false, Localize_cns("OPERATIONAL_ACT_PRODUCE"), Localize_cns("ATTENTION_OPERA_ACT")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_YUNYINGHUODONG] = checkYunyinghuodong;
    //竞技场首次排名
    function checkShouTongJingji(param) {
        var _a = CheckMainFrameFunction("jingjichang"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("QUICKGAIN_TXT16"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_SHOUTONG_JINGJI] = checkShouTongJingji;
    //公会入驻
    function checkGonghuiRuzhu(param) {
        var _a = CheckMainFrameFunction("gonghui"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("QUICKGAIN_TXT17"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_GONGHUIRUZHU] = checkGonghuiRuzhu;
    //聊天
    function checkLiaotian(param) {
        return [true, Localize_cns("LIAO_TIAN")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_LIAOTIAN] = checkLiaotian;
    //弹出文字提示
    function checkTips(param) {
        var title = param[0];
        var msg = param[1];
        var checkKey = param[2];
        var retflag = true;
        var retstr = "";
        if (checkKey != null) {
            var _a = CheckMainFrameFunction(checkKey), flag = _a[0], str = _a[1];
            retflag = flag;
            retstr = str;
        }
        return [retflag, title, retstr];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_MESSAGETIPS] = checkTips;
    //分享
    function checkFenxiang(param) {
        return [true, Localize_cns("SETTING_TXT6")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_FENXIANG] = checkFenxiang;
    //赠送好友体力
    function checkSongtili(param) {
        return [true, Localize_cns("QUICKGAIN_TXT18")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_SONGTILI] = checkSongtili;
    //赠送好友体力
    function checkMaitili(param) {
        return [true, Localize_cns("QUICKGAIN_TXT19")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_MAITILI] = checkMaitili;
    //养成
    function checkYangcheng(param) {
        var _a = CheckMainFrameFunction("yangcheng"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("MAIN_TXT12"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_YANGCHENG] = checkYangcheng;
    //签到
    function checkQiandao(param) {
        return [true, Localize_cns("SIGN_TEXT")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_QIANDAO] = checkQiandao;
    //主角等级
    function checkZhujuedengji(param) {
        return [true, Localize_cns("QUICKGAIN_TXT20")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_ZHUJUEDENGJI] = checkZhujuedengji;
    //职业
    function checkZhiye(param) {
        var _a = CheckMainFrameFunction("zhiye"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("MAIN_TXT11"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_ZHIYE] = checkZhiye;
    //装备
    function checkZhuangbei(param) {
        //let [flag, str] = CheckMainFrameFunction("zhuangbei")
        //return flag, Localize_cns("MAIN_TXT20"), str
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_ZHUANGBEI] = checkZhuangbei;
    //御灵
    function checkYuling(param) {
        var _a = CheckMainFrameFunction("yuling"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("MAIN_TXT18"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_YULING] = checkYuling;
    //试练场
    function checkShilianchang(param) {
        var _a = CheckMainFrameFunction("shilian"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("ACTIVITY_NAME1"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_SHILIANCHANG] = checkShilianchang;
    //竞技场连胜
    function checkJingji(param) {
        var _a = CheckMainFrameFunction("jingjichang"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("ACTIVITY_NAME3"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_JINGJI] = checkJingji;
    //快捷使用
    //竞技场
    function checkQuickUse(param) {
        var flag = true, str = "";
        var name = Localize_cns("QUICKGAIN_TXT26");
        var itemList = [];
        for (var _ = 0; _ < param.length; _++) {
            var entryId = param[_];
            var t = ItemSystem.getInstance().getItemLogicInfoByEntry(entryId);
            if (t.length > 0) {
                itemList = t;
                name = String.format(Localize_cns("QUICKGAIN_TXT28"), ItemSystem.getInstance().getItemName(entryId));
                break;
            }
        }
        if (!itemList[0]) {
            //TLog.Error("checkEventHandler FastJumpTypeList.FIELD_QUICKUSE")
            var list = [];
            for (var _ = 0; _ < param.length; _++) {
                var v = param[_];
                JsUtil.arrayInstert(list, ItemSystem.getInstance().getItemName(v));
                //txt = txt +ItemSystem.getInstance().getItemName(v) +","
            }
            var txt = list.join(",");
            flag = false;
            str = String.format(Localize_cns("QUICKGAIN_TXT27"), txt);
        }
        return [flag, name, str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_QUICKUSE] = checkQuickUse;
    //购买活力
    function checkMaiHuoli(param) {
        return [true, Localize_cns("QUICKGAIN_TXT29")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_MAIHUOLI] = checkMaiHuoli;
    //公会仓库分配
    function checkGonghuicangku(param) {
        return [false, Localize_cns("QUICKGAIN_TXT31"), Localize_cns("QUICKGAIN_TXT31")];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_GONGHUI_CANGKU] = checkGonghuicangku;
    //航海
    function checkHanghai(param) {
        var _a = CheckMainFrameFunction("jingjichang"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("ACTIVITY_NAME6"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_HANGHAI] = checkHanghai;
    //血盟
    function checkXuemeng(param) {
        var _a = CheckMainFrameFunction("xuemeng"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("ACTIVITY_NAME7"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_XUEMENG] = checkXuemeng;
    //个人主页
    function checkHomepage(param) {
        var _a = CheckMainFrameFunction("homepage"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("PER_HOMEPAGE_TEXT"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_HOMEPAGE] = checkHomepage;
    //天梯
    function checkTianti(param) {
        var _a = CheckMainFrameFunction("tianti"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("ACTIVITY_TXT59"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_TIANTI] = checkTianti;
    //众神之战
    function checkZhenying(param) {
        var _a = CheckMainFrameFunction("zhenying"), flag = _a[0], str = _a[1];
        return [flag, Localize_cns("GODSWAR_TEXT"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_ZHENYING] = checkZhenying;
    //圣地boss
    function checkSDBoss(param) {
        var _a = [true, ""], flag = _a[0], str = _a[1];
        return [flag, Localize_cns("ACTIVITY_NAME5"), str];
    }
    FastJumpSpace.checkEventHandler[FastJumpTypeList.FIELD_SDBOSS] = checkSDBoss;
})(FastJumpSpace || (FastJumpSpace = {}));
//# sourceMappingURL=FastJumpEventHandler.js.map
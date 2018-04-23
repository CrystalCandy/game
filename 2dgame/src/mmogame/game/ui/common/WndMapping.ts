// TypeScript file

ImportType(IGlobal)

var LOAD_ALWAYS = 0;//-- 第一次使用时加载，流程切换不卸载
var LOAD_RECYCLE = 1;//-- 每次使用时才加载，每次关闭窗口卸载 （调用 ..._Unload()函数）
var LOAD_RECYCLE_STATE = 2;//-- 每次使用时才加载，流程切换回收资源 （调用 ..._Unload()函数）


var WndsMap = {

    ["Common"]: {
        //["TapTipsFrame"]:{mode:LOAD_ALWAYS, path:"", autoshow:false, init:false},

        ["CommonTipsFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false, common: true, uievent: false },
        ["MsgWaitingFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: true, common: true, uievent: false },
        ["IconMsgFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false, common: true },
        ["ScreenEffectTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false, common: true, uievent: false },

        ["ConfirmFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false, common: true },

        ["LoginFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false, common: true },
    },

    [PRECEDURE_LOGIN]: {

        ["LoginServerListFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["LoginRegisterFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["LoginCreateRoleFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["LoginRoleListFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
    },

    [PRECEDURE_GAME]: {

        //主界面
        ["MainFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: true, init: false },
        ["MainContentFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: true, init: false },
        ["MainCityFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        //["MainMoreFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //["ThumbnailFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["SettingFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        //["ActivityShareFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        ["ChatInChannelFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: true },
        ["ChatInsertFaceFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ChatBubbleSelectFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ChatDisplaySelectFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        //主界面-圣地
        // ["RobberDoubleFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["RobberRecordFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["RobberBossFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["RobberDropListFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["RobberRatioFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //角色绑定的窗口
        ["CharacterUpperFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false, uievent: false },
        ["CharacterFightFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false, uievent: false },
        ["CharacterAwardFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false, uievent: false },
        ["ChatBubbleFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false, uievent: false },
        
        //背包
        ["ItemBeiBaoFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["BeiBaoAddCapacityFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["BeiBaoSmelteFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        //物品
        //["ItemPickFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ItemHintFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        //["ItemResolveLottoFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        //["ItemResolveFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ItemBatchUseFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ItemRecommendFrame"]: { mode: LOAD_RECYCLE_STATE, path: "", autoshow: false, init: true },
        ["ItemChooseFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ItemOneKeyResolveFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ChangeNameFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
       

        //装备
        // ["EquipBeiBaoFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["EquipProgressFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["EquipMakeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["EquipMakeListFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // //["EquipEnhanceFrame"]:{mode:LOAD_ALWAYS, path:"", autoshow:false, init:false},
        // ["EquipFactoryFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["EquipResonanceFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["EquipOneKeyIntensifyFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },




        //["ShopFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //["ShopBuyFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //["ShopSupriseFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["ShopYuanBaoFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["ShopEquipFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["ShopZhuangBanFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["ShopJingJiFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["ShopItemBuyFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //关卡界面
        //["CopyCardFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["CampaignBossFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["CampaignRankFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //通用

        //["CommonEmbattleFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["QuickGainFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["QuickGainUpgradeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["NotifyPrizeGainFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        ["PrizeRareShowFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["PrizeShowFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        //["ActorShowFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ActivityWaitFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },


        ["MainPlayerFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["PlayerListFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["PlayerAttackFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["RuleDescribeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        //["OneKeyToEquipFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ActivityPrizeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },



        // //战斗
        ["FightFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: true },
        ["FightPrizeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["FightCapturePrizeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["FightLostFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["FightAttackFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: true },
        // ["FightRecordFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["FightLadderFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        //["FightPVPFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["FightFacWarFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        


        //宠物--
        ["PetFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //["PetUpgradeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //["PetBreakFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //["PetLinkFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["PetListFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["PetPickSoulFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["PetStoneFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["PetStoneUpgradeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //["PetWakeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //["PetSkillUpgradeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["PetPreviewFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["PetSummonFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["PetSummonAllPetFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["PetSummonAllItemFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["PetSummonReplayFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["PetCombatForceTipsFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: true },
        // ["GoddessEvolutionFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["PetMagicCircleFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: true },
        // ["PetSummonPrizeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //["PetCapabilityDetailFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        ["PetClearFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["PetAttributeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["PetAttrAddFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["PetChangeNameFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["PetNaturlFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["PetEmbattleFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //女神之吻
        // ["GoddessKissFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["GoddessKissAnimFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //职业
        // ["ProfessionFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["ProfessionLotteryFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //["ProfessionSkillUpgradeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        //御灵
        // ["SacrificeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["SacrificeLevelFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // //养成
        // ["GrowFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["GrowEventFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["GrowEventListFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["GrowFinishReportFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["GrowPrizeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["GrowPrizeAnimFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        ["TaskDialogFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },


        //剧情电影
        ["MovieDramaFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: true },
        ["FullBalckFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["FastEndMoiveFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: true },
        ["MovieBackGroundFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["FullImageFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        


        //好友
        ["DeleteFriendFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        //["FriendChatFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["FriendFindResultFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["FriendsFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["FindFriendFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //帮会
        
        ["ClubFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubListFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubCreatFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        ["ClubActiveFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubBuyFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubChangeNoticeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubDonateFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubMapFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubPeopleApplyFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubPeopleInfoFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubAppointFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubChangeNameFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubActivePrizeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubExchangeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ClubEventRecordFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        

        //神兵
        // ["ImmortalsFrame"]: {  	mode: LOAD_ALWAYS,   path: "", 		autoshow: false, init: false},	
        // ["ImmortalsCapabilityDetailFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ImmortalsListFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ImmortalsTipFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //评分
        // ["GradeFrame"]: {  	mode: LOAD_RECYCLE_STATE,   path: "", 		autoshow: false, init: false},	
        // ["AllComparisonGradeFrame"]: {  	mode: LOAD_RECYCLE_STATE,   path: "", 		autoshow: false, init: false},	
        // ["PersonageComparisonGradeFrame"]: {  	mode: LOAD_RECYCLE_STATE,   path: "", 		autoshow: false, init: false},	
    
        //邮件
        ["MailListFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["MailFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: true },



        // //试炼场
        // ["SkyTowerFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["SkyTowerPrizeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["SkyTowerReviveAndResetFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["SkyTowerEmbattleFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["SkyTowerTimerFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },


        // //守护
        // ["DefendFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["DefendCapabilityDetailFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["DefendLevelFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["DefendOpenHoldFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["DefendSkillEmbedFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["DefendSkillLockFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["DefendAngleWingFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },


        //公会
        // ["ClubWelcomeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubCreateFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubIconFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubListFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        // ["ClubAppointFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubAppointSelectFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubRepoFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // //["ClubWarPointRankFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubRepoRecordFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubRepoAllocFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubCompetitionFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubComptContributeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubCompeRidePreviewFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //公会战
        // ["ClubWarEntryFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubWarListFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubWarEliteBattleFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubWarEliteEntryFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubWarEliteReadyFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubWarEmbattleTeamFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubWarMainFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubWarPointDetailFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubWarWorshipFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        // //世界BOSS
        // ["BigBossAutoFightFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["BigBossFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["BigBossInspireFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["BigBossKillRankFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["BigBossTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        // //矿洞
        // ["NavigationChooseAreaFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["NavigationChooseResFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["NavigationDetailFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["NavigationFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["NavigationLogFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["NavigationRankFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        // //公会副本 
        // ["ClubFubenListFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubFubenEntryFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ClubFubenFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //竞技场
        ["ChampionFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["ChampionRankFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ChampionRecordFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ChampionHighPrizeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ChampionAwardFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //活动
        ["ActivityRankBaseFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: true },
        ["ActivityListFrame"]: { mode: LOAD_RECYCLE_STATE, path: "", autoshow: false, init: true },
        ["AnswerQuestionFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: true },

        //冲值活动
        //["PayActivityEntryFrame"]: { mode: LOAD_RECYCLE_STATE, path: "", autoshow: false, init: false },
        // ["PayActivityFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["PaySellPetFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //储值
        ["PayFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["GoldBuyFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: true },
        ["VIPFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        
        
        //首充
        //["ShouChongFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        
        
         //投资
        ["TouZiFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

         //寻宝
        //["XunBaoFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        //天女
        ["TianNvFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        //天仙
        ["TianXianFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //仙侣
        ["XianLvFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["XianLvAttributeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["XianLvPropertyFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["XianLvQiYuanFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["XianLvFightFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["XianLvSkillDesFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        //日常
        ["DailyFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["DailyGhostFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["DailyPrizeTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["DailyFindBackFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["DailyFindBackTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //通用
        ["CommonDrugFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["CommonSkinsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["CommonSkinPropertyFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["CommonFunPropertyFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["CommonOpenTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["FullScreenBgFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: true },
        ["ItemBoxPreviewFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        
        //角色
        ["RoleFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["RoleMountsDanFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["RoleMountsSkinsFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["RoleSkillsSettingFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["RoleFATFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["RoleFashionPeopleFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["RolePropertyFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        
        ["RoleFaBaoFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["RoleFaBaoQualityFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["FaBaoItemTipsFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        //锻造
        ["ForgeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["ForgeLevelFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
            
        //离线收益
        ["PlayerOffLineFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //西游护送
        ["OdysseyEscortFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["EscortPrizeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["EscortFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["InterceptRecordFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["InterceptTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["EscortTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["RevengeTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        //玩家详情
        ["PlayerDetailsFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["PlayerDetailsRenameFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["PlayerDetailsSettingFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //获取途径
        ["GoodsAsseceFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["MoneyChargeFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        //排行榜
        ["RankFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        



        ["AnimTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["MovableAnimTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["DramaTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["GuideMaskFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["GuideTipsFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["FuncPreviewFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ActivateButtonFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ActivateButtonGiftFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["ActivateButtonMonthFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //公告
        ["NoticeListFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: true },
        ["UpdateNoticeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["NoticeDetailFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //离线奖励
        //["RobberOfflineSettingFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //通用系统页面
        ["FunSkillFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
       
        //BOSS、副本
        ["BossMainFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["BossGlobalRemindFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["BossWildFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["BossBefallFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        
        ["CopyMainFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["CopyStarRankFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["CopyTempleRankFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["BossWildFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        // ["BossBefallFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //关卡大地图
        ["MapFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },

        //充值活动
        ["DailyLoginFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["PayStageUpFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["DailyPayFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        ["TodayGiftsFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        //福利大厅
        ["WelfareFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        
        //寻宝
        ["LuckyFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        //三生三世
        ["SanShengSanShiFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["ProposeFrame"]: { mode: LOAD_RECYCLE, path: "", autoshow: false, init: false },
        ["MarryInformFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },
        

        //跨服
        ["GlobalMainFrame"]: { mode: LOAD_ALWAYS, path: "", autoshow: false, init: false },

        
        
    },

}




let GlobalForbidMap: any = {
    ["click"]: [
        "MainMenuFrame",
    ],
    ["exclude"]: [							//排除是指对于"click"列表里的窗口进行处理排除

    ],
    ["show"]: [
        //"MapNameTipsFrame",
        "DailySignInFrame",
        "NoticeListFrame",
        "IconMsgFrame",
    ],
}

let MainAutoHideUI: any = {
    ["RoleFrame"]: true,
    ["ForgeFrame"]: true,
    ["XianLvFrame"]: true,
    ["PetFrame"]: true,
    ["MainCityFrame"]: true,

    ["ClubFrame"]: true,
    ["ChampionFrame"]: true,
    ["ActivityListFrame"]: true,
    ["CopyMainFrame"]: true,
    ["GlobalMainFrame"]: true,
    ["BossMainFrame"]: true,
}
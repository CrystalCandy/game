/*
作者:
    yangguiming
    
创建时间：
   2013.6.06(周四)

意图：
   定义事件

公共接口：
   
*/
var EventDefine = {
    //系统事件
    //////////////////////////////////////////////////////////////////////////-
    SYSTEM_MOUSE_DOWN: "SYSTEM_MOUSE_DOWN",
    SYSTEM_MOUSE_MOVE: "SYSTEM_MOUSE_MOVE",
    SYSTEM_MOUSE_UP: "SYSTEM_MOUSE_UP",
    SYSTEM_MOUSE_CLICK: "SYSTEM_MOUSE_CLICK",
    SYSTEM_MOUSE_DBCLICK: "SYSTEM_MOUSE_DBCLICK",
    SYSTEM_MOUSE_LONGDOWN: "SYSTEM_MOUSE_LONGDOWN",
    SYSTEM_IME_SHOW: "SYSTEM_IME_SHOW",
    SYSTEM_IME_HIDE: "SYSTEM_IME_HIDE",
    SYSTEM_PAUSE: "SYSTEM_PAUSE",
    SYSTEM_RESUME: "SYSTEM_RESUME",
    SYSTEM_RECORD_START: "SYSTEM_RECORD_START",
    SYSTEM_RECORD_STOP: "SYSTEM_RECORD_STOP",
    //主窗口事件
    ROOTWINDOW_MOUSE_UP: "ROOTWINDOW_MOUSE_UP",
    ROOTWINDOW_MOUSE_MOVE: "ROOTWINDOW_MOUSE_MOVE",
    ROOTWINDOW_MOUSE_CLICK: "ROOTWINDOW_MOUSE_CLICK",
    ROOTWINDOW_MOUSE_DOWN: "ROOTWINDOW_MOUSE_DOWN",
    ROOTWINDOW_END_DRIVE: "ROOTWINDOW_END_DRIVE",
    ////////////////////////////-CommonEvents////////////////////////////////////////////	
    //流程事件
    PRECEDURE_ACTIVE: "PRECEDURE_ACTIVE",
    PRECEDURE_DEACTIVE: "PRECEDURE_DEACTIVE",
    //游戏启动加载
    LOADING_LANCH_RESOURCE_FINISH: "LOADING_LANCH_RESOURCE_FINISH",
    //第一次进入游戏世界的资源加载
    LOADING_GAME_RESOURCE_PREPARE: "LOADING_GAME_RESOURCE_PREPARE",
    LOADING_GAME_RESOURCE_BEGIN: "LOADING_GAME_RESOURCE_BEGIN",
    LOADING_GAME_RESOURCE_UPDATE: "LOADING_GAME_RESOURCE_UPDATE",
    LOADING_GAME_RESOURCE_FINISH: "LOADING_GAME_RESOURCE_FINISH",
    //状态事件
    STATE_ACTIVE: "STATE_ACTIVE",
    STATE_DEACTIVE: "STATE_DEACTIVE",
    COMMAND_CLEAR: "COMMAND_CLEAR",
    GAME_RECV_RESULT: "GAME_RECV_RESULT",
    GAME_RECV_RESULT_STRING: "GAME_RECV_RESULT_STRING",
    GAME_SERVERTIME_UPDATE: "GAME_SERVERTIME_UPDATE",
    MSG_WAIT_BEGIN: "MSG_WAIT_BEGIN",
    MSG_WAIT_END: "MSG_WAIT_END",
    GAME_PAUSE: "GAME_PAUSE",
    GAME_RESUME: "GAME_RESUME",
    //GAME_SERVER_EVENT_BROADCAST					: "GAME_SERVER_EVENT_BROADCAST",	//服务器事件广播	arg:GameServerEvent
    GAME_DISCONNECT: "GAME_DISCONNECT",
    //////////////////////////////////LoginEvents////////////////////////////////////////-
    //登陆系统
    //LOGIN_SERVERLIST_TCP_CONNECT  		: "LOGIN_SERVERLIST_TCP_CONNECT",//服务器列表创建TCP连接成功 args:TcpNetEvent
    //LOGIN_SERVERLIST_TCP_CLOSE 	  		: "LOGIN_SERVERLIST_TCP_CLOSE",//服务器列表TCP连接断开 args:TcpNetEvent
    //LOGIN_SERVERLIST_CONNECT					: "LOGIN_SERVERLIST_CONNECT",//服务器列表连接事件 args:LoginConnectEvent
    //LOGIN_SERVERLIST_STATE 						: "LOGIN_SERVERLIST_STATE",//获取服务器列表状态 args:LoginConnectStateEvent
    //LOGIN_SERVERLIST_VERSION  				: "LOGIN_SERVERLIST_VERSION",//获取服务器列表版本号 args:LoginConnectVersionEvent
    //LOGIN_REQUEST_BRIDGE_AUTH					: "LOGIN_REQUEST_BRIDGE_AUTH",
    LOGIN_SERVERLIST_UPDATE: "LOGIN_SERVERLIST_UPDATE",
    LOGIN_CREATE_ROLE: "LOGIN_CREATE_ROLE",
    LOGIN_ROLELIST_UPDATE: "LOGIN_ROLELIST_UPDATE",
    LOGIN_VERIFY_UPDATE: "LOGIN_VERIFY_UPDATE",
    //LOGIN_REQUEST_ACCOUNT_AUTH        : "LOGIN_REQUEST_ACCOUNT_AUTH",//请求登录账户验证
    LOGIN_ACCOUNT_AUTH_SUCC: "LOGIN_ACCOUNT_AUTH_SUCC",
    LOGIN_ACCOUNT_AUTH_FAILED: "LOGIN_ACCOUNT_AUTH_FAILED",
    LOGIN_CONNECT_SUCC: "LOGIN_BRIDGE_AUTH_SUCC",
    //LOGIN_REQUEST_SHOW_SERVERSPEC     : "LOGIN_REQUEST_SHOW_SERVERSPEC",//请求显示服务器列表就界面
    //LOGIN_REQUEST_SHOW_RECENT		  : "LOGIN_REQUEST_SHOW_RECENT",//请求打开最近登录	
    LOGIN_REQUEST_SHOW_REGISTER: "LOGIN_REQUEST_SHOW_REGISTER",
    LOGIN_REQUEST_SHOW_AUTH: "LOGIN_REQUEST_SHOW_AUTH",
    LOGIN_REQUEST_SHOW_ROLESPEC: "LOGIN_REQUEST_SHOW_ROLESPEC",
    LOGIN_REQUEST_SHOW_SDK_AUTH: "LOGIN_REQUEST_SHOW_SDK_AUTH",
    LOGIN_REQUEST_RESTART: "LOGIN_REQUEST_RESTART",
    LOGIN_LOGO_HIDE_BEGIN: "LOGIN_LOGO_HIDE_BEGIN",
    LOGIN_LOGO_HIDE_FINISH: "LOGIN_LOGO_HIDE_FINISH",
    LOGIN_GUEST_BIND_STATE_UPDATE: "LOGIN_GUEST_BIND_STATE_UPDATE",
    //////////////////////////////////ActorEvents////////////////////////////////////////-
    ACTOR_GOTFUCOS: "ACTOR_GOTFUCOS",
    ACTOR_LOSTFUCOS: "ACTOR_LOSTFUCOS",
    ACTOR_CLICK_LIST: "ACTOR_CLICK_LIST",
    //NPC事件
    NPC_ENTER_MAP: "NPC_ENTER_MAP",
    NPC_LEAVE_MAP: "NPC_LEAVE_MAP",
    NPC_SHOW: "NPC_SHOW",
    NPC_HIDE: "NPC_HIDE",
    //玩家事件                    		
    PLAYER_ENTER_MAP: "PLAYER_ENTER_MAP",
    PLAYER_LEAVE_MAP: "PLAYER_LEAVE_MAP",
    PLAYER_INFO_UPDATE: "PLAYER_INFO_UPDATE",
    PLAYER_MOVE_BEGIN: "PLAYER_MOVE_BEGIN",
    PLAYER_MOVE: "PLAYER_MOVE",
    PLAYER_MOVE_STOP: "PLAYER_MOVE_STOP",
    OBJECT_MESSAGE_MOVE: "OBJECT_MESSAGE_MOVE",
    CHECK_PLAYER_INFO_UPDATE: "CHECK_PLAYER_INFO_UPDATE",
    //主角事件                    		                        		
    HERO_ENTER_GAME: "HERO_ENTER_GAME",
    HERO_LEAVE_GAME: "HERO_LEAVE_GAME",
    HERO_ENTER_SERVERMAP: "HERO_ENTER_SERVERMAP",
    HERO_ENTER_MAP: "HERO_ENTER_MAP",
    HERO_LEAVE_MAP: "HERO_LEAVE_MAP",
    HERO_MOVE_BEGIN: "HERO_MOVE_BEGIN",
    HERO_MOVE: "HERO_MOVE",
    HERO_MOVE_STOP: "HERO_MOVE_STOP",
    HERO_INFO_UPDATE: "HERO_INFO_UPDATE",
    HERO_RESET_POSITION: "HERO_RESET_POSITION",
    HERO_LEVELUP: "HERO_LEVELUP",
    HERO_PER_LEVELUP: "HERO_PER_LEVELUP",
    HERO_FINDWAY_CHANGE: "HERO_FINDWAY_CHANGE",
    HERO_AUTORUN_CHANGE: "HERO_AUTORUN_CHANGE",
    HERO_AUTOFINDWAY: "HERO_AUTOFINDWAY",
    HERO_STOP: "HERO_STOP",
    HERO_GET_AUTO_POTENTIAL: "HERO_GET_AUTO_POTENTIAL",
    ROLE_CHENGJIU_UPDATE: "ROLE_CHENGJIU_UPDATE",
    HERO_ENTER_CROSS_SERVER: "HERO_ENTER_CROSS_SERVER",
    IS_CHAMPION_FIRST: "IS_CHAMPION_FIRST",
    IS_WUDOU_FIRST: "IS_WUDOU_FIRST",
    //////////////////////////////////MapEvents//////////////////////////////////////-
    MAP_CLICK: "MAP_CLICK",
    MAP_VIEWPORTCHANGE: "MAP_VIEWPORTCHANGE",
    MAP_LOADING_SHOW: "MAP_LOADING_SHOW",
    MAP_SERVER_NPC_LIST: "MAP_SERVER_NPC_LIST",
    //////////////////////////////////CombatEvents//////////////////////////////////////-
    COMBAT_BEGIN: "COMBAT_BEGIN",
    COMBAT_END: "COMBAT_END",
    COMBAT_SHOW_END: "COMBAT_SHOW_END",
    COMBAT_BEGIN_BEFORE: "COMBAT_BEGIN_BEFORE",
    COMBAT_HP_MP_UPDATE: "COMBAT_HP_MP_CHANGE",
    COMBAT_ROLE_MP_UPDATE: "COMBAT_ROLE_MP_UPDATE",
    COMBAT_FIGHT_ROUND_UPDATE: "COMBAT_FIGHT_ROUND_UPDATE",
    COMBAT_FIGHT_RESULT_END: "COMBAT_FIGHT_RESULT_END",
    COMBAT_FIGHTER_ADD: "COMBAT_FIGHTER_ADD",
    COMBAT_FIGHTER_ADD_EX: "COMBAT_FIGHTER_ADD_EX",
    COMBAT_CLOCK: "COMBAT_CLOCK",
    COMBAT_FIGHT_WIN: "COMBAT_FIGHT_WIN",
    COMBAT_FIGHT_LOST: "COMBAT_FIGHT_LOST",
    COMBAT_FIGHTER_DIEING: "COMBAT_FIGHTER_DIEING",
    COMBAT_FIGHTER_DEAD: "COMBAT_FIGHTER_DEAD",
    COMBAT_FIGHTER_DIE_END: "COMBAT_FIGHTER_DIE_END",
    COMBAT_FIGHTER_REMOVE: "COMBAT_FIGHTER_REMOVE",
    COMBAT_FIGHTER_ROMOVE: "COMBAT_FIGHTER_ROMOVE",
    COMBAT_FIGHT_SHOW_SKILL: "COMBAT_FIGHT_SHOW_SKILL",
    COMBAT_GUIDE_FREEZE: "COMBAT_GUIDE_FREEZE",
    COMBAT_FIGHT_ATTACK_BIGIN: "COMBAT_FIGHT_ATTACK_BIGIN",
    COMBAT_FIGHT_ATTACK_FINISH: "COMBAT_FIGHT_ATTACK_FINISH",
    COMBAT_FIGHT_VIDEO_APPLY: "COMBAT_FIGHT_VIDEO_APPLY",
    COMBAT_FIGHT_VIDEO_BEGIN: "COMBAT_FIGHT_VIDEO_BEGIN",
    COMBAT_FIGHT_RP_FULL: "COMBAT_FIGHT_RP_FULL",
    COMBAT_FIGHTER_BUFF_UPDATE: "COMBAT_FIGHTER_BUFF_UPDATE",
    COMBAT_FIGHTER_CLICK: "COMBAT_FIGHTER_CLICK",
    COMBAT_FIGHT_CLICK_MAP: "COMBAT_FIGHT_CLICK_MAP",
    COMBAT_FIGHT_FUNNAL_POINT: "COMBAT_FIGHT_FUNNAL_POINT",
    COMBAT_FIGHT_ADD_ALIEN: "COMBAT_FIGHT_ADD_ALIEN",
    COMBAT_FIGHT_SPIRIT_CD: "COMBAT_FIGHT_SPIRIT_CD",
    COMBAT_FIGHT_ASSIST_SKILL: "COMBAT_FIGHT_ASSIST_SKILL",
    COMBAT_FIGHT_SEQUENCE_UPDATE: "COMBAT_FIGHT_SEQUENCE_UPDATE",
    //COMBAT_LOST												: "COMBAT_LOST",						//战斗失败（通关失败）	args:CombatEndEvent		**
    //COMBAT_WIN												: "COMBAT_WIN", 						//战斗胜利              args:CombatEndEvent
    //COMBAT_TURN_ON_INSTRUCT						: "COMBAT_TURN_ON_INSTRUCT", 		// 战斗指令开启，		args:CombatFightInstructEvent		**
    //COMBAT_SHOW_END										: "COMBAT_SHOW_END",				//战斗表演结束					args:null		**
    //COMBAT_BOUNT_BEGIN								:	"COMBAT_BOUNT_BEGIN",			//战斗回合开始 					args:null
    //COMBAT_BOUNT_END									:	"COMBAT_BOUNT_END",				//战斗回合结束 					args:null
    //COMBAT_FIGHT_RESULT								:	"COMBAT_FIGHT_RESULT",		//收到战斗表演结果列表	args:null
    //COMBAT_FIGHT_RESULT_BEGIN					:	"COMBAT_FIGHT_RESULT_BEGIN",	//战斗表演结果开始	args:null
    //COMBAT_REBEBIN										:	"COMBAT_REBEBIN",					//战斗重连	 						args:null
    //COMBAT_CMDTARGET_CHANGE						:	"COMBAT_CMDTARGET_CHANGE",//战斗指令作用对象改变 args:null
    //COMBAT_FIGHTER_CREATE							:	"COMBAT_FIGHTER_CREATE",	//战斗成员创建			args:CombatFighterCreateEvent
    //COMBAT_SELECT_TARGET_CHANGE				: "COMBAT_SELECT_TARGET_CHANGE",		//战斗选择对象改变
    //COMBAT_AUTO_CHANGE								: "COMBAT_AUTO_CHANGE",			// 自动战斗切换
    //COMBAT_ACTOR_LIST_UPDATE					: "COMBAT_ACTOR_LIST_UPDATE", 		// 战斗玩家修改，args:null
    //////////////////////////////////CampaignEvents//////////////////////////////////////-
    CAMPAIGN_ARRAY_UPDATE: "CAMPAIGN_ARRAY_UPDATE",
    CAMPAIGN_PASS: "CAMPAIGN_PASS",
    CAMPAIGN_FINISH: "CAMPAIGN_FINISH",
    CAMPAIGN_FIRST_PASS_UPDATE: "CAMPAIGN_FIRST_PASS_UPDATE",
    CAMPAIGN_RECORD_LIST: "CAMPAIGN_RECORD_LIST",
    EXCITE_LIMIT_CAMPAIGN: "EXCITE_LIMIT_CAMPAIGN",
    CAMPAIGN_NOTPASS_SERVER: "CAMPAIGN_NOTPASS_SERVER",
    CAMPAIGN_ALTEMATE_UPDATE: "CAMPAIGN_ALTEMATE_UPDATE",
    CAMPAIGN_DYNAMIC_ARRAY_UPDATE: "CAMPAIGN_DYNAMIC_ARRAY_UPDATE",
    CAMPAIGN_TEAM_CURCAM: "CAMPAIGN_TEAM_CURCAM",
    CAMPAIGN_MINE: "CAMPAIGN_MINE",
    ////////////////////////////////////-VOCATIONER//////////////////////////////////////////////////////
    VOCATIONER_UNLOCK: "VOCATIONER_UNLOCK",
    VOCATIONER_INFO: "VOCATIONER_INFO",
    VOCATIONER_SET: "VOCATIONER_SET",
    VOCATIONER_LIST: "VOCATIONER_LIST",
    VOCATIONER_HERO: "VOCATIONER_HERO",
    VOC_SKILL_UPGRADE: "VOC_SKILL_UPGRADE",
    VOC_SKILL_SET: "VOC_SKILL_SET",
    VOCATIONER_UPDATE: "VOCATIONER_UPDATE",
    SET_VOCATIONER_COOLDOWN: "SET_VOCATIONER_COOLDOWN",
    CLEAN_VOCATIONER_COOLDOWN: "CLEAN_VOCATIONER_COOLDOWN",
    ////////////////////////////////////GROW养成系统////////////////////////////////////
    GROW_SYS_INFO: "GROW_SYS_INFO",
    GROW_LIST_INFO: "GROW_LIST_INFO",
    GROW_INFO: "GROW_INFO",
    GROW_BUY_LIVE: "GROW_BUY_LIVE",
    GROW_AUTO_ADD_LIVE: "GROW_AUTO_ADD_LIVE",
    GROW_SELECT: "GROW_SELECT",
    GROW_SELECT_FINISH: "GROW_SELECT_FINISH",
    GROW_SOON_FINISH: "GROW_SOON_FINISH",
    GROW_NEW_EVENT: "GROW_NEW_EVENT",
    GROW_HANDLE_EVENT: "GROW_HANDLE_EVENT",
    GROW_FINISH_ACTION: "GROW_FINISH_ACTION",
    GROW_PRIZE_RECORD: "GROW_PRIZE_RECORD",
    //////////////////////////////////ItemEvents//////////////////////////////////////////-
    //ITEM_LIST													: "ITEM_LIST",							//第一次获得物品列表 args:ItemEvent
    ITEM_UPDATE: "ITEM_UPDATE",
    //ITEM_UPDATE_LIST									: "ITEM_UPDATE_LIST",				//物品更新List args:ItemUpdateEvent
    ITEM_SELL_LIST: "ITEM_SELL_LIST",
    ITEM_GAIN: "ITEM_GAIN",
    ITEM_STORE_PET: "ITEM_STORE_PET",
    WASH_SUCCESS: "WASH_SUCCESS",
    EQUIP_RESOLVE_SUCCESS: "EQUIP_RESOLVE_SUCCESS",
    GOT_POWDER_BOX: "GOT_POWDER_BOX",
    //////////////////////////////////TaskEvents////////////////////////////////////////-
    TASK_ACCPET: "TASK_ACCPET",
    TASK_UPDATELIST: "TASK_UPDATELIST",
    TASK_FINISH: "TASK_FINISH",
    TASK_FAILED: "TASK_FAILED",
    TASK_OVERTIME: "TASK_OVERTIME",
    TASK_COMMIT_FINISH: "TASK_COMMIT_FINISH",
    TASK_COMMIT_FAILED: "TASK_COMMIT_FAILED",
    TASK_COMMIT_CANCEL: "TASK_COMMIT_CANCEL",
    TASK_TIMER_UPDATE: "TASK_TIMER_UPDATE",
    TASK_OPTION_ACTIVE: "TASK_OPTION_ACTIVE",
    TASK_UPDATE: "TASK_UPDATE",
    TASK_DIALOGOP: "TASK_DIALOGOP",
    TASK_FIGHT_END: "TASK_FIGHT_END",
    TASK_GUIDE_EXECUT: "TASK_GUIDE_EXECUT",
    TASK_DIALOG_TRANSFORM: "TASK_DIALOG_TRANSFORM",
    //活动类任务相关
    LEGION_TASK_REQUEST: "LEGION_TASK_REQUEST",
    //////////////////////////////////ChatEvents////////////////////////////////////////-
    CHAT_RECV_CHANNEL_MSG: "CHAT_RECV_CHANNEL_MSG",
    CHAT_RECV_CHANNEL_MSG_EX: "CHAT_RECV_CHANNEL_MSG_EX",
    CHAT_PREVIEW_MSG_UPDATE: "CHAT_PREVIEW_MSG_UPDATE",
    CHAT_CHANNEL_MSG_BROADCAST: "CHAT_CHANNEL_MSG_BROADCAST",
    CHAT_VOICE_RECORD: "CHAT_VOICE_RECORD",
    CHAT_VOICE_RECORD_ID: "CHAT_VOICE_RECORD_ID",
    NOTICE_FRAME_SHOW: "NOTICE_FRAME_SHOW",
    NOTICE_FRAME_HIDE: "NOTICE_FRAME_HIDE",
    ONLINE_QUESTION: "ONLINE_QUESTION",
    //////////////////////////////////PetEvents////////////////////////////////////////-
    PET_LIST: "PET_LIST",
    PET_LIST_UPDATE: "PET_LIST_UPDATE",
    PET_UPDATE: "PET_UPDATE",
    PET_ADD: "PET_ADD",
    PET_SET_COLOR: "PET_SET_COLOR",
    PET_SET_POTENTIAL: "PET_SET_POTENTIAL ",
    PET_INTERACT_COUNT: "PET_INTERACT_COUNT",
    PET_INTERACT_EVENT_ID: "PET_INTERACT_EVENT_ID",
    PET_INTIMATE_EVENT_ID: "PET_INTIMATE_EVENT_ID",
    PET_INVITE_LIST: "PET_INVITE_LIST",
    PET_INVITE_RESULT: "PET_INVITE_RESULT",
    ACTIVATED_PET_UPDATE: "ACTIVATED_PET_UPDATE",
    APPRECIATE_PET_UPDATE: "APPRECIATE_PET_UPDATE",
    EVER_OWNED_PET_UPDATE: "EVER_OWNED_PET_UPDATE",
    PET_UPDATE_QUICK_RECRUIT: "PET_UPDATE_QUICK_RECRUIT",
    PET_PUSH_EVENT: "PET_PUSH_EVENT",
    SUCCESS_RATE_UPDATE: "SUCCESS_RATE_UPDATE",
    SUCCESS_RATE_UPDATE_FOR_FAILED: "SUCCESS_RATE_UPDATE_FOR_FAILED",
    PET_EVENT_DELETE_SUCCESS: "PET_EVENT_DELETE_SUCCESS",
    PET_EVENT_FINISH_SUCCESS: "PET_EVENT_FINISH_SUCCESS",
    //PET_ENTER_HOOP										:"PET_ENTER_HOOP",							  //获取环信息
    PET_FREE_RECRUIT_COUNT: "PET_FREE_RECRUIT_COUNT",
    PET_PASS_BATTLE_EVENT: "PET_PASS_BATTLE_EVENT",
    PET_PUSH_EVENT_PROGRESS_UPDATE: "PET_PUSH_EVENT_PROGRESS_UPDATE",
    PET_BREAK_OUT_EVENT: "PET_BREAK_OUT_EVENT",
    PET_AWAKE_SUCCESS: "PET_AWAKE_SUCCESS",
    PET_GOT_A_AWAKE_EQUIP: "PET_GOT_A_AWAKE_EQUIP",
    PET_BREAK_OUT_EVENT_FINISH: "PET_BREAK_OUT_EVENT_FINISH",
    PET_RECRUIT_BATE_CONSUME: "PET_RECRUIT_BATE_CONSUME",
    PET_INVITE_LIST_UPDATE: "PET_INVITE_LIST_UPDATE",
    PET_COLLECT_PRIZE_INFO: "PET_COLLECT_PRIZE_INFO",
    PET_COLLECT_PRIZE_UPDATE: "PET_COLLECT_PRIZE_UPDATE",
    ONE_KEY_TURN_RESULT: "ONE_KEY_TURN_RESULT",
    INIT_ALL_PET_COMBATFORCE: "INIT_ALL_PET_COMBATFORCE",
    SHOW_COMBATFORCE_CHANGED: "SHOW_COMBATFORCE_CHANGED",
    SHOW_INTERACTION_COST: "SHOW_INTERACTION_COST",
    PET_ACTIVE_INFO: "PET_ACTIVE_INFO",
    CALL_PET_DISCOUNT: "CALL_PET_DISCOUNT",
    BREAK_THROUGH_SUCCESS: "BREAK_THROUGH_SUCCESS",
    PET_REPLACE_SKILL: "PET_REPLACE_SKILL",
    PET_QUICK_RECRUIT_PRIZE: "PET_QUICK_RECRUIT_PRIZE",
    PET_HOOP_UPDATE: "PET_HOOP_UPDATE",
    PET_SUMMON_RECORD_LIST: "PET_SUMMON_RECORD_LIST",
    //////////////////////////////////UI Events////////////////////////////////////////
    UI_SHOW_START: "UI_SHOW_START",
    UI_SHOW: "UI_SHOW",
    UI_HIDE: "UI_HIDE",
    UI_CTRL_SHOW: "UI_CTRL_SHOW",
    UI_CTRL_HIDE: "UI_CTRL_HIDE",
    //////////////////////////////////-MovieEvent//////////////////////////////////////////////////
    MOVIE_BEGIN: "MOVIE_BEGIN",
    MOVIE_END: "MOVIE_END",
    //video
    VIDEO_BEGIN: "VIDEO_BEGIN",
    VIDEO_ENG: "VIDEO_ENG",
    ////////////////////////////////-GuideEvent//////////////////////////////////////////////////////
    GUIDE_ACTIVATE_BUTTON: "GUIDE_ACTIVATE_BUTTON",
    GUIDE_FUNC_FINISH: "GUIDE_FUNC_FINISH",
    GUIDE_FUNC_LIST_UPDATE: "GUIDE_FUNC_LIST_UPDATE",
    PET_EMBATTLE_STATE: "PET_EMBATTLE_STATE",
    GUIDE_FUNC_REFRESH: "GUIDE_FUNC_REFRESH",
    GUIDE_SERVER_NOTICE: "GUIDE_SERVER_NOTICE",
    ////////////////////////////////Friend//////////////////////////////-
    FRIEND_LIST_UPDATE: "FRIEND_LIST_UPDATE",
    SEARCH_PLAYER_RESULT: "SEARCH_PLAYER_RESULT",
    APPLY_TO_FRIEND: "APPLY_TO_FRIEND",
    RECIEVE_MESSAGE: "RECIEVE_MESSAGE",
    FRIEND_INFO_UPDATE: "FRIEND_INFO_UPDATE",
    FRIEND_ONOFF_LINE: "FRIEND_ONOFF_LINE",
    ADD_DELETE_MOVE: "ADD_DELETE_MOVE",
    SEND_MESSAGE_DONE: "SEND_MESSAGE_DONE",
    TEMP_SUCCESS_CHAT: "TEMP_SUCCESS_CHAT",
    RECOMMEND_FRIEND: "RECOMMEND_FRIEND",
    FRIEND_APPLYLIST_UPDATE: "FRIEND_APPLYLIST_UPDATE",
    MESSAGE_UPDATE: "MESSAGE_UPDATE",
    OFFLINE_CHAT_MSG: "OFFLINE_CHAT_MSG",
    FRIEND_UNREAD_UPDATE: "FRIEND_UNREAD_UPDATE",
    CHAT_GROUP_CREATE: "CHAT_GROUP_CREATE",
    CHAT_GROUP_INVITE_JOIN: "CHAT_GROUP_INVITE_JOIN",
    CHAT_GROUP_AGREE_JOIN: "CHAT_GROUP_AGREE_JOIN",
    CHAT_GROUP_LIST: "CHAT_GROUP_LIST",
    CHAT_GROUP_QUERY_MEMBERS: "CHAT_GROUP_QUERY_MEMBERS",
    CHAT_GROUP_QUIT: "G2C_CHAT_GROUP_QUIT",
    NO_TROUBLE_SETTING: "NO_TROUBLE_SETTING",
    CHAT_GROUP_CHAT: "CHAT_GROUP_CHAT",
    CHAT_GROUP_INVITE_LIST: "CHAT_GROUP_INVITE_LIST",
    CHAT_GROUP_REALSE: "CHAT_GROUP_REALSE",
    SELECT_NO_TROUBLE_SETTING: "SELECT_NO_TROUBLE_SETTING",
    CHAT_GROUP_EXPELEE: "CHAT_GROUP_EXPELEE",
    SENT_POWER_LIST: "SENT_POWER_LIST",
    ////////////-黑名单////////-
    BLACK_INFO_LIST: "BLACK_INFO_LIST",
    ////////////-黑名单 }////////-	
    SERVER_APPLY_STATUS: "SERVER_APPLY_STATUS",
    //////////////////////-情报//////////////////
    INTELLIGENCE_PET: "INTELLIGENCE_PET",
    INTELLIGENCE_SKILL: "INTELLIGENCE_SKILL",
    INTELLIGENCE_STONE: "INTELLIGENCE_STONE",
    //////////////////////-神兵//////////////////
    IMMORTALS_INFO: "IMMORTALS_INFO",
    IMMORTALS_UPDATE_FIELD: "IMMORTALS_UPDATE_FIELD",
    IMMORTALS_EXP: "IMMORTALS_EXP",
    IMMORTALS_POWER_NUM: "IMMORTALS_POWER_NUM",
    //////////////////////-重塑//////////////////
    ONEKEY_INTENSIFY_INFO: "ONEKEY_INTENSIFY_INFO",
    //////////////////////-日常活动//////////////////
    ACTIVITY_STATE_LIST: "ACTIVITY_STATE_LIST",
    ACTIVITY_DATA_DISTRIBUTE: "ACTIVITY_DATA_DISTRIBUTE",
    ACTIVITY_GLOBAL_SERVER_EVENT: "ACTIVITY_GLOBAL_SERVER_EVENT",
    //////////////////////////////////活动//////////////////////////////////////////-
    ACTIVITY_BUFF_UPDATE: "ACTIVITY_BUFF_UPDATE",
    ACTIVITY_RANK_UPDATE: "ACTIVITY_RANK_UPDATE",
    EXCITE_DATA: "EXCITE_DATA",
    EVERYDAY_INFO_UPDATE: "EVERYDAY_INFO_UPDATE",
    SEVENDAY_TASK_UPDATE: "SEVENDAY_TASK_UPDATE",
    //////////////////////////////////////模拟进入玩法////////////////////////////
    ROLE_ENTER_SPACE: "ROLE_ENTER_SPACE",
    ROLE_LEAVE_SPACE: "ROLE_LEAVE_SPACE",
    PET_AWAKE: "PET_AWAKE",
    PET_BREAK: "PET_BREAK",
    PET_SKILL_UPGRADE: "PET_SKILL_UPGRADE",
    SET_NATRUAL_STONE: "SET_NATRUAL_STONE",
    OFF_NATRUAL_STONE: "OFF_NATRUAL_STONE",
    NATRUAL_STONE_UP: "NATRUAL_STONE_UP",
    //////////////////////////////////雇佣////////////////////////////////////////////
    SOLDIER_SELF_LIST_UPDATE: "SOLDIER_SELF_LIST_UPDATE",
    SOLDIER_SELF_LIST_CHANGE: "SOLDIER_SELF_LIST_CHANGE",
    SOLDIER_SELF_RELEASE_LIST_UPDATE: "SOLDIER_SELF_RELEASE_LIST_UPDATE",
    SOLDIER_SYS_LIST_UPDATE: "SOLDIER_SYS_LIST_UPDATE",
    SOLDIER_FAC_LIST_UPDATE: "SOLDIER_FAC_LIST_UPDATE",
    SOLDIER_FAC_APPLY_LIST_UPDATE: "SOLDIER_FAC_APPLY_LIST_UPDATE",
    SOLDIER_FAC_SELF_APPLY_LIST_UPDATE: "SOLDIER_FAC_SELF_APPLY_LIST_UPDATE",
    //////////////////////////////////////////////////////////////////////////////////-
    ////////////////////////////////////FairyEvent//////////////////////////////////////////
    //FAIRY_UPDATE                      :"FAIRY_UPDATE",
    //
    //
    ////////////////////////////////////ActionEvents////////////////////////////////////////
    //ACTION_LUCK_SELECT_RET                   :  "ACTION_LUCK_SELECT_RET" ,     //每日抽奖返回结果 args : LuckCountEvent
    //ACTION_LUCK_START_RET                   :   "ACTION_LUCK_START_RET"   ,   //每日抽奖返回结果 args : LuckStartEvent
    //
    ////////////////////////////////////Skill Events////////////////////////////////////////
    //SKILL_UPDATE											: "SKILL_UPDATE",							// 技能更新，args : null
    SACRIFICE_UPDATE: "SACRIFICE_UPDATE",
    SKILL_LIST_INFO: "SKILL_LIST_INFO",
    //
    //SKILL_COMBINED_UPDATE							: "SKILL_COMBINED_UPDATE",			//援助技能列表更新，args : CombinedSkillEvent
    ////SKILL_SERIES_UPDATE								: "SKILL_SERIES_UPDATE",			// 技能系更新，args : null
    ////SKILL_LIVE_LIST_UPDATE					  : "SKILL_LIVE_LIST_UPDATE",		// 生活技能表更新， args:null
    ////SKILL_SAVE_UPDATE									: "SKILL_SAVE_UPDATE", 				// 保存快捷栏技能更新， agrs:null
    ////SKILL_USE_RESULT									: "SKILL_USE_RESULT",					// 技能使用结果，args:SkillResultEvent
    ////////////////////////////////////TeamEvents////////////////////////////////////////////
    TEAM_INFO_UPDATE: "TEAM_INFO_UPDATE",
    TEAM_CREATE: "TEAM_CREATE",
    TEAM_POS_CHANGE: "TEAM_POS_CHANGE",
    // TEAM_MEMBER_UPDATE: "TEAM_MEMBER_UPDATE",							// 队伍成员更新，args : null
    // TEAM_APPLY_UPDATE: "TEAM_APPLY_UPDATE",			// 队伍申请列表更新，args : null
    // TEAM_LINEUP_UPDATE: "TEAM_LINEUP_UPDATE",			        // 阵型更新更新，args : null
    // TEAM_RECEIVE_INVITE: "TEAM_RECEIVE_INVITE",             //收到组队邀请  args : TeamInviteInfo
    // TEAM_GOAL_UPDATE: "TEAM_GOAL_UPDATE",                //队伍目标变化
    // TEAM_AUTO_MAKE_TEAM: "TEAM_AUTO_MAKE_TEAM",             //自动组队
    // TEAM_UPDATE_MEM_POS: "TEAM_UPDATE_MEM_POS",             //队员位置更新
    // TEAM_MEMBER_ONLINE: "TEAM_MEMBER_ONLINE",             //队员上线
    // TEAM_MEMBER_OFFLINE: "TEAM_MEMBER_OFFLINE",             //队员下线
    // TEAM_MEMBER_NOTICE: "TEAM_MEMBER_NOTICE",             //队长发给队员的通知
    // TEAM_ADD: "TEAM_ADD",							//加入队伍
    // TEAM_WILL_LIST_UPDATE: "TEAM_WILL_LIST_UPDATE",		//组队意愿列表
    // TEAM_MEMBER_LEAVE: "TEAM_MEMBER_LEAVE",					//队员离队
    // TEAM_DISBAND: "TEAM_DISBAND",														//队伍解散
    // TEAM_ACTIVITY_QUERY: "TEAM_ACTIVITY_QUERY",			//队伍列表返回
    // G2C_TEAM_COMBAT_QUEUE: "G2C_TEAM_COMBAT_QUEUE",		//队伍战斗队列返回
    // TEAM_STATE_SET: "TEAM_STATE_SET",		//设置队伍类型
    //	
    ////////////////////////////////////TradeCenterEvents////////////////////////////////////////////
    //TRADECENTER_ALLPETLIST_UPDATE           : "TRADECENTER_ALLPETLIST_UPDATE",   //收到宠物列表更新
    //TRADECENTER_BUY_RET                     : "TRADECENTER_BUY_RET",             //购买宠物返回
    //TRADECENTER_SELL_RET                    : "TRADECENTER_SELL_RET",             //出售宠物返回
    ////TRADECENTER_PETLIST_UPDATE            : "TRADECENTER_PETLIST_UPDATE",      //收到同种宠物列表更新
    //TRADECENTER_ITEMLIST_UPDATE             : "TRADECENTER_itemList_UPDATE",      //发送物品列表到客户端
    //TRADECENTER_ITEM_SALE_RET               : "TRADECENTER_ITEM_SALE_RET",      //出售物品返回
    //TRADECENTER_ITEM_BUY_RET              	: "TRADECENTER_ITEM_SALE_RET",      //购买物品返回
    //TRADECENTER_ITEM_INFO_UPDATE            : "TRADECENTER_ITEM_INFO_UPDATE",      //自己的寄售信息
    //TRADECENTER_ITEM_SELL_OK								: "TRADECENTER_ITEM_SELL_OK",				// 寄售物品成功卖出
    //TRADECENTER_SELECT_PET_LIST_UPDATE			: "TRADECENTER_SELECT_PET_LIST_UPDATE",				// 选择宠物获取列表
    //TRADECENTER_SHOW_PET_INFO								: "TRADECENTER_SHOW_PET_INFO",			//显示寄售宠物信息					
    ////////////////////////////////////TeamEvents////////////////////////////////////////////
    //BUFF_UPDATE												: "BUFF_UPDATE",							// BuffUpdateEvent, args : actor, buff	
    //LIVE_BUFF_UPDATE									: "LIVE_BUFF_UPDATE",					// 生活buff更新，args:null
    //LIVE_BUFF_ALIVE_UPDATE						: "LIVE_BUFF_ALIVE_UPDATE",		// 生活BUFF生活周期更新，args:null
    ////////////////////////////////////-FlyEvent////////////////////////////////////////////////
    //FLY_UPDATE												: "FLY_UPDATE",								//null
    //
    //
    //
    //
    ////////////////////////////////-LingshiShopEvent////////////////////////////////////////////////
    SHOP_DEAL_LIST: "SHOP_DEAL_LIST",
    SHOP_DEAL_ITEM: "SHOP_DEAL_ITEM",
    SHOP_DEAL_SELL_LIST: "SHOP_DEAL_SELL_LIST",
    SHOP_DEAL_LIMIT: "SHOP_DEAL_LIMIT",
    SHOP_UPDATE: "SHOP_UPDATE",
    //
    //
    //////////////////////////////////-MakeEvent//////////////////////////////////////////////////////////\
    //ITEM_MAKE_DRAWING_UPDATE        : "ITEM_MAKE_DRAWING_UPDATE", 	//生产图纸列表更新事件
    //DRUG_MAKING_RESULT							: "DRUG_MAKING_RESULT",					//炼药结果，args:DrugMakingResultEvent
    //	////////////////////////////////-EquipEvent//////////////////////////////////////////////////////////\
    //
    //EQUIP_IDENTIFY_SUCCESS							: "EQUIP_IDENTIFY_SUCCESS",					//鉴定结果，args:EquipIdentifySuccessResultEvent
    //EQUIP_MAKE_SUCCESS							    : "EQUIP_MAKE_SUCCESS",					//鉴定结果，args:EquipMakeSuccessResultEvent
    //	
    EQUIP_ALL_CAST: "EQUIP_ALL_CAST",
    //////////////////////////////////Server Level//////////////////////////////////////////////////////////
    //SERVER_LEVEL_UPDATE						  : "SERVER_LEVEL_UPDATE",					//服务器等级更新
    //
    //
    //TRADE_TARGET_UPDATE							: "TRADE_TARGET_UPDATE",					// 交易金钱修改，args:MoneyUpdateEvent
    //////////////////////////////////Shop//////////////////////////////////////////////////////////////////////
    //SHOP_GET_DATA							: "SHOP_GET_DATA",					// 获取商城列表，args:GetShopItemListEvent
    //RECHARGE_LIST             : "RECHARGE_LIST",           // 获取充值列表, args:GetRechargeListEvent
    //UPDATE_SHOP_DATA          : "UPDATE_SHOP_DATA",         // 更新商城列表
    //
    //////////////////////////////////-Rank////////////////////////////////////
    //RANK_LIST_UPDATE								: "RANK_LIST_UPDATE",							// 排行列表更新, args:null
    //RANK_PET_INFO										: "RANK_PET_INFO",								// 排行榜查看宠物，args:null 
    //////////////////////////////////
    // 
    //ATTENDANCE_INFO  								: "ATTENDANCE_INFO",         //-每日签到
    //ATTENDANCE_DAY  								: "ATTENDANCE_DAY",          //-签到
    //ATTENDANCE_REWARD               : "ATTENDANCE_REWARD",
    ////////////////////////////////////其他////////////////////////////////////
    //TONGJI_LIST_UPDATE							: "TONGJI_LIST_UPDATE",					// 通缉犯列表更新，args:TongjiListEvent
    //ARENA_TEAM_LIST_UPDATE					: "ARENA_TEAM_LIST_UPDATE", 		// 擂台队伍列表更新
    //NEXTNEWNOTICE                   : "NEXTNEWNOTICE",              //下一条系统公告
    //LIBAO_TIME_UPDATE								: "LIBAO_TIME_UPDATE",					//在线礼包更新
    //ONLINE_TICK_TACK								: "ONLINE_TICK_TACK",						//在线时间秒数刷新
    //ZAIXIAN_QIANGDA                 : "ZAIXIAN_QIANGDA",						//在线抢答
    EVERYDAYONLINE_UPDTAE: "EVERYDAYONLINE_UPDTAE",
    UPDATE_WELFARE: "UPDATE_WELFARE",
    //ZHANGBU_CARD                 		: "ZHANGBU_CARD",								//占卜卡片
    //PET_ICON_BUTTON_VISIBLE					: "PET_ICON_BUTTON_VISIBLE", 		//部下头像提示按钮，args:PetIconButtonEvent
    //UPDATE_EXCHANGE_CODE_BTN				: "UPDATE_EXCHANGE_CODE_BTN", 		//成功激活邀请码后刷新兑换码界面
    //UPDATE_INVITE_RECHARGE_NUM			: "UPDATE_INVITE_RECHARGE_NUM", 		//被邀请者首充后刷新邀请人的界面
    //UPDATE_ACTIVITY_TIME_FRAME			: "UPDATE_ACTIVITY_TIME_FRAME", 		//刷新活动时间提示界面
    //
    //////////////////////////////////
    //  //////////////////////////////////修炼系统////////////////////////////////////
    //GET_PRACTICE_LIST               : "GET_PRACTICE_LIST" ,           // 获取修炼列表  args:GetPracticeListEvent
    //GET_PRACTICE_REWARD             : "GET_PRACTICE_REWARD",          //获取修炼奖励  args:GetPracticeRewardtEvent
    //	  //////////////////////////////////-公会系统////////////////////////////////////
    GET_CLUB_INFO: "GET_CLUB_INFO",
    GET_CLUB_LIST: "GET_CLUB_LIST",
    //GET_CLUB_SINGLE_INFO            : "GET_CLUB_SINGLE_INFO",         //获取某个公会信息 args : GetClubSingleInfoEvent
    // UPDATE_CLUB_NOTICE              : "UPDATE_CLUB_NOTICE",            //更新公告
    GET_CLUB_MENBER_LIST: "GET_CLUB_MENBER_LIST",
    UPDATE_CLUB_INTRO: "UPDATE_CLUB_INTRO",
    UPDATE_CLUB_MEINFO: "UPDATE_CLUB_MEINFO",
    GET_CLUB_MYAPPLY_LIST: "GET_CLUB_MYAPPLY_LIST",
    CLUB_CHOOSE_ITEM: "CLUB_CHOOSE_ITEM",
    REFRESH_ALLOR_RECORD: "REFRESH_ALLOR_RECORD",
    CLUB_REPO_UPDATE: "CLUB_REPO_UPDATE",
    //新加
    ALL_CLUB_LIST: "ALL_CLUB_LIST",
    GET_CLUB_APPLY_LIST: "GET_CLUB_APPLY_LIST",
    UPDATE_CLUB_NOTICE: "UPDATE_CLUB_NOTICE",
    UPDATE_APPLY_INFO: "UPDATE_APPLY_INFO",
    CLUB_EVENT_RECORD: "CLUB_EVENT_RECORD",
    CLUB_RENQI_INFO: "CLUB_RENQI_INFO",
    CLUB_PLAYER_ACTIVE_INFO: "CLUB_PLAYER_ACTIVE_INFO",
    CLUB_SKILL_INFO: "CLUB_SKILL_INFO",
    //////////////////////////////////////公会副本//////////////////////////-
    //SEALED_GROUND_ENTER										: "SEALED_GROUND_ENTER",						//进入封印之地
    //SEALED_GROUND_LEAVE										: "SEALED_GROUND_LEAVE",						//离开封印之地
    SEALED_GROUND_UPDATA: "SEALED_GROUND_UPDATA",
    SEALED_GROUND_CREATE: "SEALED_GROUND_CREATE",
    //SEALED_GROUND_RANK										: "SEALED_GROUND_RANK",							//军团副本通关排名
    //////////////////////////////////////帮会任务/////////////////////////-
    CLUB_TASK_COMP_REFRESH: "CLUB_TASK_COMP_REFRESH",
    CLUB_EXCHANGE: "CLUB_EXCHANGE",
    //
    //    //////////////////////////////////-竞技场////////////////////////////////////////////-
    //CHAMPION_TOP_RANK: "CHAMPION_TOP_RANK", 							//竞技场最高排名
    CHAMPION_REFRESH: "CHAMPION_REFRESH",
    //CHAMPION_REFRESH_EX: "CHAMPION_REFRESH_EX",								//竞技场晶石刷新
    ////GET_BATTLE_QUEUE							  : "GET_BATTLE_QUEUE",								//得到出战队列
    //FIGHT_CHAMPION_RECORD						:"FIGHT_CHAMPION_RECORD",					//竞技场对战记录 args:DailyActivityEvent
    //GET_CLUB_STUDY_SKILL_LIST       : "GET_CLUB_STUDY_SKILL_LIST",      //跟新研究技能
    //
    //
    // 
    //DAILY_ACTIVITY_START						: "DAILY_ACTIVITY_START",						 // 日常活动开始 args:DailyActivityEvent
    //DAILY_ACTIVITY_STOP							: "DAILY_ACTIVITY_STOP",						 // 日常活动结束 args:DailyActivityEvent
    //DAILY_ACTIVITY_RECORD_UPDATE		: "DAILY_ACTIVITY_RECORD_UPDATE",		 // 日常活动记录更新 args:DailyActivityEvent
    //DAILY_ACTIVITY_ENTER_FLOOR			: "DAILY_ACTIVITY_ENTER_FLOOR",		 	 // 爬塔进入楼层 		 args:DailyActivityEvent
    //
    //////////////////////////////////////排行榜////////////////////////////////////////-
    TOLLGATE_FIRSTPASS_LIST: "TOLLGATE_FIRSTPASS_LIST",
    //OTHER_PET_INFO			           : "OTHER_PET_INFO",	     //排行榜点击查看他人宠物信息args:OtherPetInfoEvent
    //
    //
    //////////////////////////////////////装备抽奖////////////////////////////////////////-
    //EQUIP_LOTTO_ONCE								: "EQUIP_LOTTO_ONCE",	        //装备抽奖一次args:EquipLottoEvent
    //EQUIP_LOTTO_UPDATE_TIME					: "EQUIP_LOTTO_UPDATE_TIME",	 //装备抽奖更新args:RankListEvent
    //
    //////////////////////////////////////活动抽奖////////////////////////////////////////-
    //ACTIVITY_LOTTO_ONCE								: "ACTIVITY_LOTTO_ONCE",	        //活动抽奖一次args:EquipLottoEvent
    //ACTIVITY_RECHARGE_LIMIT						: "ACTIVITY_RECHARGE_LIMIT",			//限时充值回馈
    //ACTIVITY_LOTTO_SEVERINFO					: "ACTIVITY_LOTTO_SEVERINFO",	    //抽奖跨服信息args:info
    //
    //////////////////////////////////////天空之塔////////////////////////////////////////-
    //SKYTOWER_TOP_RANK								: "SKYTOWER_TOP_RANK",								//天空之塔最高排名 args:SkytowerTopRankEvent
    //SKYTOWER_PRIZE									: "SKYTOWER_PRIZE",									//天空之塔领取宝箱 args:SkytowerPrizeEvent
    //DAILY_PREPARE_STATUS						:"DAILY_PREPARE_STATUS",							//天空之塔组队备战 args:DailyPrepareStatusEvent
    //TEAM_SPACE_MOVE								:"TEAM_SPACE_MOVE",										//天空之塔领取宝箱 args:TeamSpaceMoveEvent
    //ENTER_TOWER										:"ENTER_TOWER",											//进入天空之塔
    //SKYTOWER_INVITE_LIST					:"SKYTOWER_INVITE_LIST",						//天空之塔邀请列表
    //SKYTOWER_PRIZE_CHOOSE					:"SKYTOWER_PRIZE_CHOOSE",						//天空之塔奖励选择
    //
    ////////////////////////////////////////活动////////////////////////////////////////////-
    //DAILY_ENTER_NOTICE							:"DAILY_ENTER_NOTICE"	,							//广播进入活动 args:DailyEnterNoticeEvent
    //DAILY_ENTER_NOTICE_RET					:"DAILY_ENTER_NOTICE_RET"	,					//队员确认进入活动 args:DailyEnterNoticeRetEvent
    //
    //ACTIVITY_WEEK					:"ACTIVITY_WEEK"	,					//周年庆活动查询
    //
    //
    ////////////////////////////////////////邮件////////////////////////////////////////////-
    MAIL_LIST: "MAIL_LIST",
    MAIL_READ: "MAIL_READ",
    //
    //
    ////////////////////////////////////////混沌世界////////////////////////////////////////////-
    ROBBER_ENTER: "ROBBER_ENTER",
    ROBBER_LEAVE: "ROBBER_LEAVE",
    ROBBER_TIME_REFRESH: "ROBBER_TIME_REFRESH",
    ROBBER_KILLER_LIST: "ROBBER_KILLER_LIST",
    ROBBER_TEMPLE_APPEAR: "ROBBER_TEMPLE_APPEAR",
    ROBBER_PRIZE_STATIS: "ROBBER_PRIZE_STATIS",
    //ROBBER_LAYER_UPDATA							:"ROBBER_LAYER_UPDATA",							//混沌世界层更新
    //ROBBER_KILLCOUNT_UPDATE 				:"ROBBER_KILLCOUNT_UPDATE",					//混沌世界击杀数更新
    //ROBBER_KILLLIST_UPDATE 					:"ROBBER_KILLLIST_UPDATE",					//混沌世界复仇列表更新
    //ROBBER_TEST_ENTER 							:"ROBBER_TEST_ENTER",								//混沌世界是否符合进入
    //ROBBER_FRAME_UPDATE 						:"ROBBER_FRAME_UPDATE",							//混沌世界界面刷新
    //ROBBER_KILL_POS									:"ROBBER_KILL_POS",									//混沌世界仇人位置
    //ROBBER_STATUE_STATUS_REMOVE			:"ROBBER_STATUE_STATUS_REMOVE",			//混沌世界开启神社雕像移除状态
    //KILLPEOPLE_STATUS_UPDATE			  :"KILLPEOPLE_STATUS_UPDATE",			  //混沌世界杀人状态刷新
    //ROBBER_STATUE_STATUS_REFRESHLAYER			  :"ROBBER_STATUE_STATUS_REFRESHLAYER",			  //混沌世界状态刷新
    //BROKENHISTROY_UPDATE_BOSS_REFRESH_TIME			  :"BROKENHISTROY_UPDATE_BOSS_REFRESH_TIME",			  //混沌世界BOSS刷新时间返回刷新
    //BROKENHISTROY_RECV_ROOMLIST			  :"BROKENHISTROY_RECV_ROOMLIST",			  //混沌世界副本列表
    //ROBBER_RECV_LOTTERY			  			:"ROBBER_RECV_LOTTERY",			  			//混沌世界时空碎片兑换结果
    //UPDATE_DOUBLE_TIME			  			:"UPDATE_DOUBLE_TIME",			  			//双倍时间
    //AUTO_ONLINE			  			       :"AUTO_ONLINE",			  			//离线挂机
    //CAN_ONLINE			  			       :"CAN_ONLINE",			  			//能否离线挂机	
    //
    ROBBER_HANG_STATUS_UPDATE: "ROBBER_HANG_STATUS_UPDATE",
    OFFLINE_HANG_INFO: "OFFLINE_HANG_INFO",
    ROBBER_HANG_FIGHT_BEGIN: "ROBBER_HANG_FIGHT_BEGIN",
    OFFLINE_INCOME_TIPS: "OFFLINE_INCOME_TIPS",
    //
    ////////////////////////////////////////终极魔女////////////////////////////////////////////-
    BIG_BOSS_QUERY: "BIG_BOSS_QUERY",
    BIG_BOSSHP_UPDATE: "BIG_BOSSHP_UPDATE",
    BIG_BOSS_LEAVE: "BIG_BOSS_LEAVE",
    BIG_BOSS_PLAYER_DAMAGE_RANK: "BIG_BOSS_PLAYER_DAMAGE_RANK",
    BIG_BOSS_PLAYER_REVIVE: "BIG_BOSS_PLAYER_REVIVE",
    BIG_BOSS_PLAYER_ENTER: "BIG_BOSS_PLAYER_ENTER",
    BIG_BOSS_DAMAGE_RANK: "BIG_BOSS_DAMAGE_RANK",
    BIG_BOSS_REFRESH_BUFFTIME: "BIG_BOSS_REFRESH_BUFFTIME",
    BIG_BOSS_FIGHTING_RANK: "BIG_BOSS_FIGHTING_RANK",
    //
    ////////////////////////////////////////-答题////////////////////////////////
    //ACTIVITY_QUESTION_ENTER         :"ACTIVITY_QUESTION_ENTER",         //活动进入
    ACTIVITY_QUESTION: "ACTIVITY_QUESTION",
    ACTIVITY_QUESTION_INFO: "ACTIVITY_QUESTION_INFO",
    ACTIVITY_QUESTION_RESULT: "ACTIVITY_QUESTION_RESULT",
    //ACTIVITY_QUESTION_LEAVE         :"ACTIVITY_QUESTION_LEAVE",         //答题退出
    ACTIVITY_QUESTION_STATE: "ACTIVITY_QUESTION_STATE",
    //
    ////////////////////////////////////-拖动结束//////////////////////////-
    //SLIDER_EVENT_END								:"SLIDER_EVENT_END",								//拖动结束
    //
    //
    ////////////////////////////////////-晶石兑换金币列表更新//////////////////////////-	
    JINGSHI_CHANGE_LIST_UPDATA: "JINGSHI_CHANGE_LIST_UPDATA",
    //
    ////////////////////////////////////-接收消息事件 用于提醒哪些按钮有叹号//////////////////
    //
    GET_MESSAGE: "GET_MESSAGE",
    //WND_UPDATE_BTN_TIPS				:"WND_UPDATE_BTN_TIPS"	,					//收到网络消息 args:wndUpdateBtnTipsEvent
    //
    ////////////////////////////////////-冲值 可能是买晶石或买号角//////////////////////////-
    //PAY_RETURN														: 	"PAY_RETURN", //客户端 调用sdk 充值返回
    PAY_FORM_GAME_SERVER: "PAY_FORM_GAME_SERVER",
    //PLAYER_CREAT_TIME											: 	"PLAYER_CREAT_TIME",
    //PAY_BACK_SERVER												: 	"PAY_BACK_SERVER", //服务器返回充值返利
    //
    ////////////////////////////////////-分享//////////////////////////////////////
    //SHARE_RETURN													:		"SHARE_RETURN",//客户端 调用sdk 分享返回
    //SHARE_FORM_GAME_SERVER								:		"SHARE_FORM_GAME_SERVER",//分享后 服务器返回奖励
    //
    ////////////////////////////////////-刺激点//////////////////////////////
    //EXCITE_SERVER_FIRST_CAMPAIGN					:"EXCITE_SERVER_FIRST_CAMPAIGN" ,//关卡首通
    //////////////////////////////////
    //////////////////////////////////////招募动画////////////////////////////
    //GET_PET_ANIMATION											:"GET_PET_ANIMATION" ,				//招募动画
    //////////////////////////////////////jjc 动画////////////////////////////
    //WINDOW_ANIMATION_STATE								: "WINDOW_ANIMATION_STATE", 		//窗口动画	
    //
    //////////////////////////////////////魔导石////////////////////////////
    //GEM_POWER_VALUE_UPDATE								: "GEM_POWER_VALUE_UPDATE",								//魔导石能量值跟新									
    //GEM_UPDATA														: "GEM_UPDATA",														//魔导石能量值跟新									
    //GEM_ENTER_VALUE_UPDATA								: "GEM_ENTER_VALUE_UPDATA",								//魔导石注入能量									
    //MAGIC_STONE_LEVEL_UPDATE          : "MAGIC_STONE_LEVEL_UPDATE",       			//所有魔导仪等级									
    //CURRENT_MAGIC_STONE_LEVEL_UPDATE      : "CURRENT_MAGIC_STONE_LEVEL_UPDATE",			//当前魔导仪等级  									  
    //
    //////////////////////////////////////遗迹探索////////////////////////////
    RELIC_LEAVE: "RELIC_LEAVE",
    RELIC_LIST_REFRESH: "RELIC_LIST_REFRESH",
    RELIC_ONE_REFRESH: "RELIC_ONE_REFRESH",
    RELIC_MY_REFRESH: "RELIC_MY_REFRESH",
    RELIC_LOCK: "RELIC_LOCK",
    RELIC_DEFEND_LIST: "RELIC_DEFEND_LIST",
    RELIC_MAX_RANK_LIST: "RELIC_MAX_RANK_LIST",
    RELIC_TEAM_LIST: "RELIC_TEAM_LIST",
    //////////////////////////////////////武斗大会//////////////////////////-
    //WARFARE_STAGE_UPDATE									: "WARFARE_STAGE_UPDATE",						//大会阶段更新
    //WARFARE_APPLYLIST_REC									: "WARFARE_APPLYLIST_REC",					//武斗大会报名名单接收
    //
    ////////////////////////////////////////玩家名片//////////-
    //PLAYER_CARD_SET 											: "PLAYER_CARD_SET",						//玩家名片设置
    //PLAYER_CARD_GET 											: "PLAYER_CARD_GET",						//玩家名片获取
    //
    ////////////////////////////////////////开服时间////////////
    //GAME_SERVER_START_TIME                : "GAME_SERVER_START_TIME",
    //////////////////////////////////////新装备系统////////////////////////
    //EQUIP_RESET_RETURN										: "EQUIP_RESET_RETURN",			//装备重铸
    //EQUIP_RESET_CHOOSE_RETURN							: "EQUIP_RESET_CHOOSE_RETURN",			//装备重铸确认返回
    //
    //////////////////////////////////////角色其他相关////////////////////////////
    ROLE_INVITE_LIST: "ROLE_INVITE_LIST",
    //ROLE_HONOR_UPDATE                     : "ROLE_HONOR_UPDATE",      //荣誉称号列表
    //
    //////////////////////////-黑市////////////////
    //BLACK_MARKET_LIST_RETURN 							: "BLACK_MARKET_LIST_RETURN" ,   //黑市列表
    //////////////////////////-光明神殿////////////////
    //LIGHT_TEMPLE_ENTER : "LIGHT_TEMPLE_ENTER",  //进入
    //LIGHT_TEMPLE_LEVEL : "LIGHT_TEMPLE_LEVEL",	//退出
    //LIGHT_TEMPLE_PLAYER_INFO : "LIGHT_TEMPLE_PLAYER_INFO",	//玩家信息
    //LIGHT_TEMPLE_MAP_INFO : "LIGHT_TEMPLE_PLAYER_LIST",	//地图信息
    //LIGHT_TEMPLE_BUFF_INFO : "LIGHT_TEMPLE_BUFF_INFO",	//地图信息
    //
    ////////////////////////-七日任务//////////////-
    //SEVEN_DAY_PRIZE_INFO : "SEVEN_DAY_PRIZE_INFO",	//信息
    //SEVEN_DAY_GET_PRIZE : "SEVEN_DAY_GET_PRIZE",	//领取信息
    //
    //
    //PUSH_ACTIVITY_REFRESH : "PUSH_ACTIVITY_REFRESH", //刷新推送活动主界面图标
    //
    //
    //军团战
    FACTION_WAR_ENTER_MAP: "FACTION_WAR_ENTER_MAP",
    FACTION_WAR_LEAVE_MAP: "FACTION_WAR_LEAVE_MAP",
    FACTION_WAR_APPLY: "FACTION_WAR_APPLY",
    FACTION_WAR_APPLY_LIST: "FACTION_WAR_APPLY_LIST",
    FACTION_WAR_READY_INFO: "FACTION_WAR_READY_INFO",
    FACTION_WAR_SCORES_LIST: "FACTION_WAR_SCORES_LIST",
    FACTION_WAR_TREE_INFO: "FACTION_WAR_TREE_INFO",
    FACTION_WAR_SCORE_LIST: "FACTION_WAR_SCORE_LIST",
    FACTION_WAR_FLAG_INFO: "FACTION_WAR_FLAG_INFO",
    FACTION_WAR_FLAG_ADD_RETURN: "FACTION_WAR_FLAG_ADD_RETURN",
    FACTION_WAR_GET_STATUS: "FACTION_WAR_GET_STATUS",
    FACTION_WAR_SENIOR_QUEUE: "FACTION_WAR_SENIOR_QUEUE",
    FACTION_WAR_SENIOR_READY: "FACTION_WAR_SENIOR_READY",
    FACTION_WAR_QUERY_SEN_RED: "FACTION_WAR_QUERY_SEN_RED",
    FACTION_WAR_FLAG_NUM: "FACTION_WAR_FLAG_NUM",
    FACTIONWAR_SENIOR_ABORT: "FACTIONWAR_SENIOR_ABORT",
    //
    //////////////////军团联盟////////////-
    //FACTION_UNION_APPLY : "FACTION_UNION_APPLY" ,  //军团联盟
    //FACTION_UNION_ENTER : "FACTION_UNION_ENTER" ,  //加入联盟
    //FACTION_UNION_LEVEL : "FACTION_UNION_LEVEL" ,  //退出联盟
    //FACTION_UNION_UPDATE : "FACTION_UNION_UPDATE" ,  //军团信息更新
    //////////////////军团联盟 }////////////-
    //
    //////////////////迷雾森林//////////////
    //ENTER_MI_WU_SEN_LIN : "ENTER_MI_WU_SEN_LIN" ,  //进入迷雾森林
    //LEAVE_MI_WU_SEN_LIN : "LEAVE_MI_WU_SEN_LIN" ,  //离开迷雾森林
    //JUMP_TO_NEXT_LAYER  : "JUMP_TO_NEXT_LAYER",    //跳到下一层 
    //FINISH_PLAYING_JUMP_EFFECT : "FINISH_PLAYING_JUMP_EFFECT",//跳层动画结束
    //JUMP_TO_NEXT_LAYER_NOW : "JUMP_TO_NEXT_LAYER_NOW",
    //RECV_ZERO_ERROR_PASS   : "RECV_ZERO_ERROR_PASS",
    //
    ////////////////////-血盟(VIP小战队)////////////////-
    QUERY_TEAM_LIST: "QUERY_TEAM_LIST",
    QUERY_APPLY_LIST: "QUERY_APPLY_LIST",
    QUERY_MEMBER_LIST: "QUERY_MEMBER_LIST",
    VIP_TEAM_INFO_UPDATE: "VIP_TEAM_INFO_UPDATE",
    QUERY_PRIZE_STATUS: "QUERY_PRIZE_STATUS",
    //
    ////////////////////////充值活动////////////
    PAY_ACTIVITY_UPDATE: "PAY_ACTIVITY_UPDATE",
    PAY_ACTIVITY_LIST: "PAY_ACTIVITY_LIST",
    PAY_ACTIVITY_INFO: "PAY_ACTIVITY_INFO",
    PAY_ACTIVITY_AWARD: "PAY_ACTIVITY_AWARD",
    PAY_ACTIVITY_SELLPET: "PAY_ACTIVITY_SELLPET",
    PAY_ACTIVITY_MONTH_CARD: "PAY_ACTIVITY_MONTH_CARD",
    PAY_ACTIVITY_WEEK_CARD: "PAY_ACTIVITY_WEEK_CARD",
    //
    //////////////////////////-迷惑宫殿//////////
    //
    //PUZZLE_PALACE_BEST_RECORD : "PUZZLE_PALACE_BEST_RECORD",  //最高纪录
    //
    ////////////////////////守护////////////////
    DEFEND_UPDATE: "DEFEND_UPDATE",
    DEFEND_REFINE_UPDATA: "DEFEND_REFINE_UPDATA",
    //SERVER_RETURN_BOOK : "SERVER_RETURN_BOOK",    //技能书返回
    ICON_FLY_EVENT: "ICON_FLY_EVENT",
    ADD_SKILL_EFFECT_FINISH: "ADD_SKILL_EFFECT_FINISH",
    ////////////////////////异界邀请////////////
    //INVITE_RETURN : "INVITE_RETURN",
    //SUPER_CALL_SHARE_RECORD : "SUPER_CALL_SHARE_RECORD", //异界邀请攻略返回
    //SUPER_CALL_PRAISE_RECORD : "SUPER_CALL_PRAISE_RECORD", //异界邀请点赞
    ////////////////////-改名
    ROLE_CHANGE_NAME: "PLAYER_ROLE_CHANGE_NAME",
    ////////////////////-晋升成功
    //JIN_SHENG_SUCCESS : "JIN_SHENG_SUCCESS",
    //
    //
    //
    //PLAYER_RETURN_PRIZE_UPDATE : "PLAYER_RETURN_PRIZE_UPDATE", //老用户回归刷新
    //ACTIVITY_RETURN_UPDATE : "ACTIVITY_RETURN_UPDATE", //活动信息返回刷新
    //
    //CONTINUOUS_LOGIN_PRIZE_UPDATE : "CONTINUOUS_LOGIN_PRIZE_UPDATE", //连续登录奖励刷新
    //CONTINUOUS_LOGIN_ACTIVITY_UPDATE : "CONTINUOUS_LOGIN_ACTIVITY_UPDATE", //连续登录活动信息返回刷新
    //
    //SERVER_RETURN_TEN_BOOKS : "SERVER_RETURN_TEN_BOOKS", //技能书抽奖十连抽
    //FRAME_BTN_TIPS_UPDATE : "FRAME_BTN_TIPS_UPDATE", //界面红点刷新
    //
    //VIP_SING_IN_ACTIVITY_UPDATE : "VIP_SING_IN_ACTIVITY_UPDATE", //豪华签到活动信息返回刷新
    //VIP_SING_IN_PRIZE_UPDATE : "VIP_SING_IN_PRIZE_UPDATE", //豪华签到奖励返回刷新
    //HERO_COURAGE_QUALITY_UPDATE : "HERO_COURAGE_QUALITY_UPDATE", //角色魄力品质
    //
    //PET_INHERIT_SUCCESS : "PET_INHERIT_SUCCESS",   //继承成功
    //PET_POINT_RETURN : "PET_POINT_RETURN",         //服务器返回属性点
    //HERO_PET_SOUL_POINT_UPDATE : "HERO_PET_SOUL_POINT_UPDATE", //碎魂更新
    //
    //FORMATION_UNLOCK_SUCCESS : "FORMATION_UNLOCK_SUCCESS",   //战阵解锁成功
    //FORMATION_UPDATE_SUCCESS : "FORMATION_UPDATE_SUCCESS",   //战阵升级成功
    //
    //ZA_JIN_DAN_GET_PRIZE : "ZA_JIN_DAN_GET_PRIZE",           //砸蛋抽奖返回
    //
    //DAILY_AIM_INFO_LIST : "DAILY_AIM_INFO_LIST",           //开工目标列表返回
    //DAILY_AIM_GET_DATA : "DAILY_AIM_GET_DATA",           //领奖返回
    //
    //
    //////////////////////////-坐骑////////////////////////////-
    RIDE_INFO_LIST: "RIDE_INFO_LIST",
    //
    //PLAYER_MASK_UNBLOCK_LIST : "PLAYER_MASK_UNBLOCK_LIST",    //面具列表
    //
    //RIDE_EQUIP_REQUEST : "RIDE_EQUIP_REQUEST",               //坐骑装备列表
    //
    //FEED_INFO : "FEED_INFO",                                 //坐骑喂养列表
    //
    //RIDESUCCESS_INFO : "RIDESUCCESS_INFO",                   //坐骑激活成功
    //
    //////////////////////////结婚////////////////////////////////////-
    //
    //MARRIED_INFO : "MARRIED_INFO",                                  //结婚
    //SEX_INFO : "SEX_INFO",                                  //性别
    //CANREL_INFO : "CANREL_INFO",                                  //是否同步
    //FLOWER_INFO : "FLOWER_INFO",                                  //是否举行婚礼
    ////ISMARRY_INFO : "ISMARRY_INFO",                                  //是否举行婚礼
    //AUTO_FEED : "AUTO_FEED",                                 //自动喂养
    //////////////////-拍卖行//////////////-
    //AH_ITEM_UPDATE : "AH_ITEM_UPDATE", //拍卖物品刷新
    //AH_MY_BUY_LIST_UPDATE : "AH_MY_BUY_LIST_UPDATE", //我的竞拍
    //AH_MY_RECORD_UPDATE : "AH_MY_RECORD_UPDATE", ////我的竞拍记录
    //////////-军团红包////////////////////
    //LEGION_RED_PACKET_LIST : "LEGION_RED_PACKET_LIST",//军团红包
    ////////////////////////-溶解//////////////////////////-
    RESOLVE_ITEM_INIT: "RESOLVE_ITEM_INIT",
    RESOLVE_ITEM_LIB: "RESOLVE_ITEM_LIB",
    RESOLVE_ITEM_RESULT: "RESOLVE_ITEM_RESULT",
    ROLE_HOMEPAGE_INFO: "ROLE_HOMEPAGE_INFO",
    HOMEPAGE_UPLOAD_ICON: "HOMEPAGE_UPLOAD_ICON",
    MESSAGEBOARD_INFO: "MESSAGEBOARD_INFO",
    ROLE_HOMEPAGE_IS_CAN_CREAT: "ROLE_HOMEPAGE_IS_CAN_CREAT",
    RECV_GODSWAR_INFO: "RECV_GODSWAR_INFO",
    RECV_GODSWAR_DETAIL_INFO: "RECV_GODSWAR_DETAIL_INFO",
    RECV_BATTLE_RECORD: "RECV_BATTLE_RECORD",
    RECV_RANK_INFO: "RECV_RANK_INFO",
    INVITE_PRIZE_INFO: "INVITE_PRIZE_INFO",
    INVITE_FRIENDS_NUM: "INVITE_FRIENDS_NUM",
    SPECIAL_EVENT_FINISH_LIST: "SPECIAL_EVENT_FINISH_LIST",
    CHAT_UNLOCK_BUBBLE_LIST: "CHAT_UNLOCK_BUBBLE_LIST",
    FACWAR_AUTO_APPLY_STATUS: "FACWAR_AUTO_APPLY_STATUS",
    FAC_TASK_LIST_UPDATE: "FAC_TASK_LIST_UPDATE",
    FAC_TASK_ONE_UPDATE: "FAC_TASK_ONE_UPDATE",
    FAC_TASK_POINT_RANK_UPDATE: "FAC_TASK_POINT_RANK_UPDATE",
    FAC_TASK_WEEK_POINT_UPDATE: "FAC_TASK_WEEK_POINT_UPDATE",
    FAC_TASK_TREASURE_LIST_UPDATE: "FAC_TASK_TREASURE_LIST_UPDATE",
    FAC_TASK_TREA_RECORD_UPDATE: "FAC_TASK_TREA_RECORD_UPDATE",
    FAC_TASK_RANK_RESULT_LIST: "FAC_TASK_RANK_RESULT_LIST",
    //////////////////////神兽//////////////////////-
    ANIMAL_LEVEL_UPDATA: "ANIMAL_LEVEL_UPDATA",
    ANIMAL_POWER_UPDATA: "ANIMAL_POWER_UPDATA",
    ANIMAL_EXPER_OVER: "ANIMAL_EXPER_OVER",
    ///////////////////////通用更新/////////////////////
    PET_FUN_INFO_REFRESH: "PET_FUN_INFO_REFRESH",
    PET_FUN_INFO_UPDATE: "PET_FUN_INFO_UPDATE",
    ///////////////////////仙侣////////////////////////
    ACTOR_XIANLV_UPDATE: "ACTOR_XIANLV_UPDATE",
    //////////////////////角色////////////////////////
    ACTOR_ROLE_FASHION_CLICK: "ACTOR_ROLE_FASHION_CLICK",
    ACTOR_ROLE_UPDATE: "ACTOR_ROLE_UPDATE",
    ACTOR_ROLE_FABAO_UPDATE: "ACTOR_ROLE_FABAO_UPDATE",
    ROLE_EQUIP_LIST: "ROLE_EQUIP_LIST",
    ROLE_SKILL_LEVEL_LIST: "ROLE_SKILL_LEVEL_LIST",
    ROLE_EQUIP_ORDER_LIST: "ROLE_EQUIP_ORDER_LIST",
    ROLE_RIDE_INFO: "ROLE_RIDE_INFO",
    ROLE_RIDE_INFO_UPDATE: "ROLE_RIDE_INFO_UPDATE",
    ROLE_WING_INFO: "ROLE_RIDE_INFO",
    ROLE_WING_INFO_UPDATE: "ROLE_RIDE_INFO_UPDATE",
    ACTOR_ROLE_TITLE_UNLOCK: "ACTOR_ROLE_TITLE_UNLOCK",
    ACTOR_ROLE_FASHION_UNLOCK: "ACTOR_ROLE_FASHION_UNLOCK",
    PALYER_OFFINE_REFRESH: "PALYER_OFFINE_REFRESH",
    /////////////////////////锻造///////////////////
    FORGE_UPDATE: "FORGE_UPDATE",
    ////////////////////////天仙///////////////////
    TIANXIAN_UPDATE: "TIANXIAN_UPDATE",
    ///////////////////////商店/////////////////
    SHOP_FUN_UPDATE: "SHOP_FUN__UPDATE",
    ////////////////////寻宝///////////////
    XUNBAO_UPDATE: "XUNBAO_UPDATE",
    ////////////////////福利大厅///////////////
    XIYOU_WELFARE: "XIYOU_WELFARE",
    ////////////////////活动BOSS/副本事件///////////////
    BOSSACTIVITY_INFO: "BOSSACTIVITY_INFO",
    /////////////////日常/////////////
    DAILYACTIVITY_INFO: "DAILYACTIVITY_INFO",
    ////////////////////结婚响应///////////////
    MARRY_UPDATE: "MARRY_UPDATE",
    ////////////////////房子///////////////
    HOUSE_UPDATE: "HOUSE_UPDATE",
};
//# sourceMappingURL=EventDefine.js.map

//频道
let channelType:any = {
	NEARBY   : 1,  //当前
	TEAM     : 2,  //队伍
	FACTION  : 3,  //帮派
	SYSTEM   : 4,  //系统
	WORLD    : 5,  //世界
	SCHOOL   : 6,  //门派
	CHAT     : 7,  //私聊
	RUMOR    : 8,  //传闻
	HORN     : 9,  //大喇叭
	ALL      : 10, //所有
	BANNER	 : 11, //横幅
	UNION    : 12, //联盟
	SERVER	 : 13, //跨服聊天
	//MAKETEAM : 6,  // 组队
	//GROUP    : 7,  // 团队
	//CITY     : 8,  // 同城
	//HORN_VIP : 10, // VIP大喇叭
	//SWORN    : 11, // 结拜
	//AUCTION  : 12, // 拍卖
	GROUP    : 14  //群聊
}

//组Id 100-200段
let opChannelDefaultGroup:any = {
	//门派
	SCHOOL_JJ : 101, 
	SCHOOL_QY : 102,
	SCHOOL_DD : 103,
	SCHOOL_WY : 104,
	SCHOOL_TG : 105,
	SCHOOL_LS : 106,
	SCHOOL_TS : 107,
	SCHOOL_BY : 108,
	SCHOOL_MW : 109,
	SCHOOL_MY : 110,
	SCHOOL_HF : 111,
	SCHOOL_DF : 112,
	ACTIVITY_WORLDBOSS : 113,
	ACTIVITY_ROBBER    : 114,
	ACTIVITY_LOSTTEMPLE : 115,
	ACTIVITY_ZHENXING : 116,
	ACTIVITY_MONSTERSIEGE : 117,
	ACTIVTIY_SECRETLAND : 118,
	ACTIVTIY_UNIONPVP : 119,
}

let channelOption:any = {
	FACE   : 1,      // 表情
	ITEM   : 2,      // 物品
	PET    : 3,      // 宠物
	RECORD : 4,      // 历史
	HOMEPAGE : 5,    // 个人主页
	WND    : 6,      // 超链接跳转界面
	VOICE  : 7,      //语音
	HORNID : 1400000,// 大喇叭id
	PLAYER : 8,      //玩家信息
	TEAM   : 9,      //加入队伍
	CLUB   : 10,     //加入公会
	CORP   : 11,     //加入血盟
}

let channelTipsType:any = {
	SYSTEM 					: 1,//  系统频道
	TIPS				 		: 2,//  标签提示
	WINDOWS 				: 3,//  确定对话框（提示性对话框）
	HORN 						: 4,//  大喇叭
	SCREEN_TIPS 		: 5,//  屏幕提示
	UNKNOW1					: 6,//  频道不存在
	WORLD			 			: 7,//  世界频道
	SYSTEM_AND_TIPS : 8,//  标签提示+系统频道
	GUILD_AND_TIPS 	: 9,//  帮派（宗族）频道+标签提示
	GUILD 					: 10,// 帮派（宗族）频道
	UNKNOW2 				: 11,// 暂时致控
	GUILD_AND_TIPS2 : 12,// 帮派（宗族）频道+标签提示
	TEAM	 					: 13,// 队伍频道+标签提示
	UNKNOW3 				: 14,// 频道不存在
	RUMOUR 					: 15,// 传闻频道
	RUMOUR_AND_TIPS : 16,// 传闻频道+标签提示
	TEAM2						: 17,// 队伍频道
	TEAM_AND_TIPS	 	: 18,// 队伍频道+标签提示
	SCHOOL 					: 19,// 门派频道
	SCHOOL_AND_TIPS : 20,// 门派频道+标签提示
	NO_TAG					: 21,// 无顶头标签的频道
	NO_TAG_AND_TIPS	: 22,// 无顶头标签的频道+标签提示
	TIPS_AND_TIPS		: 8,// 提示频道+标签提示 TODO
}

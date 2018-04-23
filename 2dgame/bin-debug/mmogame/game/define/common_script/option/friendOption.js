//好友系统
var friendOptions = {
    maxFriendCount: 50,
    maxBlackFriend: 50,
    maxFGcount: 10,
    addFriendOK: 0,
    addFriendAgree: 1,
    addFriendRefuse: 2,
    acceptMessage: 0,
    refuseMessage: 1,
    maxFGNameLength: 21,
    canShow: 22,
    FINDFRIENDBYID: 23,
    FINDFRIENDBYNAME: 24,
};
var friendTableOption = {
    NAME: 1,
    //ICON     : 2,   // 头像
    GROUPID: 3,
    FRIENDSHIP: 4,
    SEX: 5,
    ONLINE: 6,
    LOGIN: 7,
    //COMMENT    : 8,   // 好友备注
    FACTION: 9,
    //SCHOOL   : 10,  // 门派
    ISONLINE: 11,
    LEVEL: 12,
    //SHOW     : 13,  // 是否显示		PS: 1 显示，0 不显示	// 删除的好友不发送到客户端，但存在
    VOCATION: 14,
    RELATION: 15,
    //MOVETIME : 16,  // 移组的时间 名单排序
    STATE: 17,
    FORCE: 18,
    VIPLEVEL: 19,
    ICON: 20,
};
// 好友组的属性
var friendGroupOption = {
    ID: 1,
    NAME: 2,
};
// 默认好友组
var friendGroupId = {
    FRIEND: 1,
    TEMP: 2,
    BLACK: 3,
};
//离线消息种类 
var messageOption = {
    TALKIM: 1,
    SYSTEMIM: 2,
    OPCODE: 3,
    MAXTALKCOUNT: 50,
};
// 增加好友度类型
var addFriendShipType = {
    FLOWER: 1,
    COMBAT: 2,
    TASK: 3,
};
////////////////////////////new////////////////////////////
var RelationShip = {
    Stranger: 1,
    BestFriend: 2,
    Lover: 3,
    Couple: 4,
};
var opCard = {
    show: 1,
    qq: 2,
    weixin: 3,
    phone: 4,
};
//邀请列表类型
var opInviteType = {
    faceBook: 1,
    qq: 2,
    weiXin: 3,
};
var opInviteFriendConfig = {
    interval: 10 * 24 * 3600,
};
//////////////////////-
//增加缘分值类型
var opFriendShipType = {
    Team: 1,
    Online: 2,
    Faction: 3,
    Chat: 4,
};
//缘分值增加量
var opFriendShipAddValue = {
    Team: 1,
    Online: 3,
    Faction: 10,
    Chat: 1,
};
//缘分值增加最大量
var opFriendShipAddMaxValue = (_a = {},
    _a[opFriendShipType.Team] = 20,
    _a[opFriendShipType.Online] = 144,
    _a[opFriendShipType.Faction] = 10,
    _a[opFriendShipType.Chat] = 10,
    _a);
////////////////////////////////
//////////////聊天组////////////////
var opChatGroupPost = {
    leader: 1,
    member: 2,
};
var opChatGroupConfig = {
    maxCount: 500,
    level: 20,
    createCount: 5,
    realseTime: 3 * 24 * 3600,
    friendShipTime: 1800,
    plrCount: 10,
    memberCount: 10,
};
//////////////////////////////-结婚//////////////////////////////////
//婚礼条件
var opMarryCondition = {
    level: 50,
    friendship: 500,
    normalNeedItem: [40508, 1],
    luxuryNeedItem: [40509, 1],
};
//爱慕值
var opValueOfLove = {
    dailyLimit: 25,
    totalLimit: 2500,
};
//婚礼类型
var opWeddingType = {
    normalWedding: 1,
    luxuryWedding: 2,
};
//离婚答复
var opDivorceReply = {
    agree: 1,
    reject: 2,
};
//离婚条件常量
var opDivorceLimit = {
    rmbLimit: 100,
    decFriendShip: 200,
};
//婚礼常量
var opWedding = {
    mapId: defaultValue.DEFAULT_MAP2,
    candyEntryId: 70021,
    carriagePauseCount: 8,
    candyCreateCount: 9,
    candyPickLimit: 5,
};
var opHomePageConfig = {
    MaxMessageLen: 150,
    MaxMessageCount: 20,
    LogEvent: {
        VISIT: 0x0001,
        PRAISE: 0x0002,
        FLOWERS: 0x0008,
        MESSAGE: 0x0010,
        POUND_EGG: 0x0020,
    },
    MaxPraiseCount: 20,
    FlowerEntryId: 20001,
    EggEntryId: 40026,
    //FlowerAddCharm : 1, //增加魅力值
    //broadCount     : 99, //可以发送公告
    //CreateNpcCount : 999, //可以创建鲜花npc的数量
    //NpcCount       : 20, //鲜花npc数量
    //NpcLife        : 5*60, //鲜花存在时间
    //NpcEntryId     : 22004, //npcEntryId
    AnimationTime: 5,
    IconDataStrLen: 1024,
    MaxLogFileCount: 10,
    //MaxItemCount   : 5,   //最多可以放置5种礼物
    ItemPrize: 10,
    ItemEntryId: 20002,
    EggToCharm: 1,
    AutoRecoverCharm: 5,
    CharmMinValue: -1000,
};
//鲜花对应魅力值
var opFlowerCountToCharm = (_b = {},
    _b[1] = [0, 1],
    _b[11] = [2, 11],
    _b[99] = [20, 99],
    _b[999] = [200, 999],
    _b);
//好友赠送体力
var opFriendSendGift = {
    sendCount: 15,
    receiveCount: 10,
    veryCount: 1,
    count: 5,
};
var _a, _b;
//# sourceMappingURL=friendOption.js.map
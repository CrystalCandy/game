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
var Message_G2C_FIGHT_ENTER_CAMPAIGN = (function (_super) {
    __extends(Message_G2C_FIGHT_ENTER_CAMPAIGN, _super);
    function Message_G2C_FIGHT_ENTER_CAMPAIGN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_ENTER_CAMPAIGN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.campaignId = 0;
    };
    Message_G2C_FIGHT_ENTER_CAMPAIGN.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_ENTER_CAMPAIGN.prototype.unpack = function (reader) {
        this.campaignId = reader.readUInt();
    };
    return Message_G2C_FIGHT_ENTER_CAMPAIGN;
}(MessageBase));
__reflect(Message_G2C_FIGHT_ENTER_CAMPAIGN.prototype, "Message_G2C_FIGHT_ENTER_CAMPAIGN");
var Message_C2G_FIGHT_CAMPAIGN = (function (_super) {
    __extends(Message_C2G_FIGHT_CAMPAIGN, _super);
    function Message_C2G_FIGHT_CAMPAIGN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_CAMPAIGN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_FIGHT_CAMPAIGN.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_FIGHT_CAMPAIGN.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_CAMPAIGN;
}(MessageBase));
__reflect(Message_C2G_FIGHT_CAMPAIGN.prototype, "Message_C2G_FIGHT_CAMPAIGN");
var Message_C2G_FIGHT_BATTLE_QUEUE = (function (_super) {
    __extends(Message_C2G_FIGHT_BATTLE_QUEUE, _super);
    function Message_C2G_FIGHT_BATTLE_QUEUE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_BATTLE_QUEUE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.queueType = 0;
        this.queue = {};
        this.isdump = false;
    };
    Message_C2G_FIGHT_BATTLE_QUEUE.prototype.pack = function (writer) {
        writer.writeUInt(this.queueType);
        writer.writeString(table_save(this.queue));
    };
    Message_C2G_FIGHT_BATTLE_QUEUE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_BATTLE_QUEUE;
}(MessageBase));
__reflect(Message_C2G_FIGHT_BATTLE_QUEUE.prototype, "Message_C2G_FIGHT_BATTLE_QUEUE");
var Message_C2G_FIGHT_GET_BATTLE_QUEUE = (function (_super) {
    __extends(Message_C2G_FIGHT_GET_BATTLE_QUEUE, _super);
    function Message_C2G_FIGHT_GET_BATTLE_QUEUE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_GET_BATTLE_QUEUE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.queueType = 0;
    };
    Message_C2G_FIGHT_GET_BATTLE_QUEUE.prototype.pack = function (writer) {
        writer.writeUInt(this.queueType);
    };
    Message_C2G_FIGHT_GET_BATTLE_QUEUE.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_GET_BATTLE_QUEUE;
}(MessageBase));
__reflect(Message_C2G_FIGHT_GET_BATTLE_QUEUE.prototype, "Message_C2G_FIGHT_GET_BATTLE_QUEUE");
var Message_G2C_FIGHT_GET_BATTLE_QUEUE = (function (_super) {
    __extends(Message_G2C_FIGHT_GET_BATTLE_QUEUE, _super);
    function Message_G2C_FIGHT_GET_BATTLE_QUEUE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_GET_BATTLE_QUEUE.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.queueType = 0;
        this.queue = {};
        this.isdump = false;
    };
    Message_G2C_FIGHT_GET_BATTLE_QUEUE.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_GET_BATTLE_QUEUE.prototype.unpack = function (reader) {
        this.queueType = reader.readUInt();
        this.queue = table_load(reader.readString()) || {};
    };
    return Message_G2C_FIGHT_GET_BATTLE_QUEUE;
}(MessageBase));
__reflect(Message_G2C_FIGHT_GET_BATTLE_QUEUE.prototype, "Message_G2C_FIGHT_GET_BATTLE_QUEUE");
var Message_G2C_FIGHT_WIN = (function (_super) {
    __extends(Message_G2C_FIGHT_WIN, _super);
    function Message_G2C_FIGHT_WIN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_WIN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightType = 0;
        //通用解包
        this.commonPrize = {};
    };
    Message_G2C_FIGHT_WIN.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_WIN.prototype.unpack = function (reader) {
        //清空信息
        this.commonPrize = {};
        //开始解包
        this.fightType = reader.readUInt();
        this.commonPrize = table_load(reader.readString());
    };
    return Message_G2C_FIGHT_WIN;
}(MessageBase));
__reflect(Message_G2C_FIGHT_WIN.prototype, "Message_G2C_FIGHT_WIN");
var Message_G2C_FIGHT_CAMPAIGN_RECORD = (function (_super) {
    __extends(Message_G2C_FIGHT_CAMPAIGN_RECORD, _super);
    function Message_G2C_FIGHT_CAMPAIGN_RECORD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_CAMPAIGN_RECORD.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.finishedCampaignList = {};
    };
    Message_G2C_FIGHT_CAMPAIGN_RECORD.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_CAMPAIGN_RECORD.prototype.unpack = function (reader) {
        this.finishedCampaignList = {};
        var count = reader.readUInt();
        for (var i = 1; i <= count; i++) {
            var campaignId = reader.readUInt(); //关卡ID
            var starLevel = reader.readUChar(); //星级
            var times = reader.readUInt(); //挑战次数
            this.finishedCampaignList[campaignId] = [starLevel, times];
        }
    };
    return Message_G2C_FIGHT_CAMPAIGN_RECORD;
}(MessageBase));
__reflect(Message_G2C_FIGHT_CAMPAIGN_RECORD.prototype, "Message_G2C_FIGHT_CAMPAIGN_RECORD");
var Message_G2C_FIGHT_LOST = (function (_super) {
    __extends(Message_G2C_FIGHT_LOST, _super);
    function Message_G2C_FIGHT_LOST() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_LOST.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.fightType = 0;
        this.commonList = {};
    };
    Message_G2C_FIGHT_LOST.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_LOST.prototype.unpack = function (reader) {
        this.commonList = {};
        this.fightType = reader.readUInt();
        this.commonList = table_load(reader.readString());
    };
    return Message_G2C_FIGHT_LOST;
}(MessageBase));
__reflect(Message_G2C_FIGHT_LOST.prototype, "Message_G2C_FIGHT_LOST");
var Message_C2G_FIGHT_SYNC_SHOWEND = (function (_super) {
    __extends(Message_C2G_FIGHT_SYNC_SHOWEND, _super);
    function Message_C2G_FIGHT_SYNC_SHOWEND() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_SYNC_SHOWEND.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.count = 0;
        this.fighterHPList = {};
    };
    Message_C2G_FIGHT_SYNC_SHOWEND.prototype.pack = function (writer) {
        writer.writeUChar(this.count);
        for (var _ in this.fighterHPList) {
            var v = this.fighterHPList[_];
            writer.writeUInt(v[0]); //fighterId
            writer.writeUInt(v[1]); //当前HP值
        }
    };
    Message_C2G_FIGHT_SYNC_SHOWEND.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_SYNC_SHOWEND;
}(MessageBase));
__reflect(Message_C2G_FIGHT_SYNC_SHOWEND.prototype, "Message_C2G_FIGHT_SYNC_SHOWEND");
var Message_C2G_CHAMPION_WEAP = (function (_super) {
    __extends(Message_C2G_CHAMPION_WEAP, _super);
    function Message_C2G_CHAMPION_WEAP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_CHAMPION_WEAP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.campaignId = null;
        this.weapCount = 0;
    };
    Message_C2G_CHAMPION_WEAP.prototype.pack = function (writer) {
        writer.writeUInt(this.campaignId);
        writer.writeUInt(this.weapCount);
    };
    Message_C2G_CHAMPION_WEAP.prototype.unpack = function (reader) {
    };
    return Message_C2G_CHAMPION_WEAP;
}(MessageBase));
__reflect(Message_C2G_CHAMPION_WEAP.prototype, "Message_C2G_CHAMPION_WEAP");
var Message_G2C_CHAMPION_WEAP = (function (_super) {
    __extends(Message_G2C_CHAMPION_WEAP, _super);
    function Message_G2C_CHAMPION_WEAP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_CHAMPION_WEAP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.campaignId = null;
    };
    Message_G2C_CHAMPION_WEAP.prototype.pack = function (writer) {
        //writer.writeUInt(this.campaignId)	
    };
    Message_G2C_CHAMPION_WEAP.prototype.unpack = function (reader) {
        //清空信息
        this.commonList = {};
        //开始解包
        this.fightType = reader.readUInt();
        this.commonList = table_load(reader.readString());
        var list = {};
        for (var _ in this.commonList.itemList) {
            var elem = this.commonList.itemList[_];
            var itemId = elem[0];
            var quality = elem[2];
            var e = list[itemId + "_" + quality] || [itemId, 0];
            e[1] = e[1] + elem[1];
            e[2] = quality;
            list[itemId + "_" + quality] = e;
        }
        this.commonList.itemList = [];
        for (var _ in list) {
            var v = list[_];
            JsUtil.arrayInstert(this.commonList.itemList, v);
        }
    };
    return Message_G2C_CHAMPION_WEAP;
}(MessageBase));
__reflect(Message_G2C_CHAMPION_WEAP.prototype, "Message_G2C_CHAMPION_WEAP");
var Message_C2G_EXCITE_SERVER_FIRST_CAMPAIGN = (function (_super) {
    __extends(Message_C2G_EXCITE_SERVER_FIRST_CAMPAIGN, _super);
    function Message_C2G_EXCITE_SERVER_FIRST_CAMPAIGN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EXCITE_SERVER_FIRST_CAMPAIGN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.campaignId = 0;
    };
    Message_C2G_EXCITE_SERVER_FIRST_CAMPAIGN.prototype.pack = function (writer) {
        writer.writeUInt(this.campaignId);
    };
    Message_C2G_EXCITE_SERVER_FIRST_CAMPAIGN.prototype.unpack = function (reader) {
    };
    return Message_C2G_EXCITE_SERVER_FIRST_CAMPAIGN;
}(MessageBase));
__reflect(Message_C2G_EXCITE_SERVER_FIRST_CAMPAIGN.prototype, "Message_C2G_EXCITE_SERVER_FIRST_CAMPAIGN");
var Message_G2C_EXCITE_SERVER_FIRST_CAMPAIGN = (function (_super) {
    __extends(Message_G2C_EXCITE_SERVER_FIRST_CAMPAIGN, _super);
    function Message_G2C_EXCITE_SERVER_FIRST_CAMPAIGN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EXCITE_SERVER_FIRST_CAMPAIGN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.playerId;
        this.playerName;
        this.force;
        this.vocation;
        this.sexId;
        this.icon;
        this.campaignId;
    };
    Message_G2C_EXCITE_SERVER_FIRST_CAMPAIGN.prototype.pack = function (writer) {
    };
    Message_G2C_EXCITE_SERVER_FIRST_CAMPAIGN.prototype.unpack = function (reader) {
        this.playerId = reader.readUInt();
        this.playerName = reader.readString();
        this.force = reader.readUInt();
        this.vocation = reader.readUInt();
        this.sexId = reader.readUInt();
        this.icon = reader.readString();
        this.campaignId = reader.readUInt();
    };
    return Message_G2C_EXCITE_SERVER_FIRST_CAMPAIGN;
}(MessageBase));
__reflect(Message_G2C_EXCITE_SERVER_FIRST_CAMPAIGN.prototype, "Message_G2C_EXCITE_SERVER_FIRST_CAMPAIGN");
var Message_G2C_EXCITE_TIPS = (function (_super) {
    __extends(Message_G2C_EXCITE_TIPS, _super);
    function Message_G2C_EXCITE_TIPS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EXCITE_TIPS.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.awardType = "";
    };
    Message_G2C_EXCITE_TIPS.prototype.pack = function (writer) {
    };
    Message_G2C_EXCITE_TIPS.prototype.unpack = function (reader) {
        this.awardType = reader.readString();
    };
    return Message_G2C_EXCITE_TIPS;
}(MessageBase));
__reflect(Message_G2C_EXCITE_TIPS.prototype, "Message_G2C_EXCITE_TIPS");
//返回替补阵容
var Message_G2C_FIGHT_RESERVE_LINE_UP = (function (_super) {
    __extends(Message_G2C_FIGHT_RESERVE_LINE_UP, _super);
    function Message_G2C_FIGHT_RESERVE_LINE_UP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_RESERVE_LINE_UP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.arrayType = 0;
        this.altemate = {};
    };
    Message_G2C_FIGHT_RESERVE_LINE_UP.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_RESERVE_LINE_UP.prototype.unpack = function (reader) {
        //this.altemate = { 0, 0}
        this.arrayType = reader.readUInt();
        this.altemate = table_load(reader.readString());
    };
    return Message_G2C_FIGHT_RESERVE_LINE_UP;
}(MessageBase));
__reflect(Message_G2C_FIGHT_RESERVE_LINE_UP.prototype, "Message_G2C_FIGHT_RESERVE_LINE_UP");
//设置替补阵容
var Message_C2G_FIGHT_RESERVE_LINE_UP = (function (_super) {
    __extends(Message_C2G_FIGHT_RESERVE_LINE_UP, _super);
    function Message_C2G_FIGHT_RESERVE_LINE_UP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_RESERVE_LINE_UP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.arrayType = 0;
        this.altemate = {};
    };
    Message_C2G_FIGHT_RESERVE_LINE_UP.prototype.pack = function (writer) {
        writer.writeUInt(this.arrayType);
        writer.writeString(table_save(this.altemate));
    };
    Message_C2G_FIGHT_RESERVE_LINE_UP.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_RESERVE_LINE_UP;
}(MessageBase));
__reflect(Message_C2G_FIGHT_RESERVE_LINE_UP.prototype, "Message_C2G_FIGHT_RESERVE_LINE_UP");
var Message_C2G_FIGHT_LINE_UP_INFO = (function (_super) {
    __extends(Message_C2G_FIGHT_LINE_UP_INFO, _super);
    function Message_C2G_FIGHT_LINE_UP_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_LINE_UP_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.arrayType = 0;
    };
    Message_C2G_FIGHT_LINE_UP_INFO.prototype.pack = function (writer) {
        writer.writeUInt(this.arrayType);
    };
    Message_C2G_FIGHT_LINE_UP_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_LINE_UP_INFO;
}(MessageBase));
__reflect(Message_C2G_FIGHT_LINE_UP_INFO.prototype, "Message_C2G_FIGHT_LINE_UP_INFO");
var Message_G2C_FIGHT_LINE_UP_DATA = (function (_super) {
    __extends(Message_G2C_FIGHT_LINE_UP_DATA, _super);
    function Message_G2C_FIGHT_LINE_UP_DATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_LINE_UP_DATA.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.altemateList = {};
    };
    Message_G2C_FIGHT_LINE_UP_DATA.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_LINE_UP_DATA.prototype.unpack = function (reader) {
        this.altemateList = table_load(reader.readString()) || {};
    };
    return Message_G2C_FIGHT_LINE_UP_DATA;
}(MessageBase));
__reflect(Message_G2C_FIGHT_LINE_UP_DATA.prototype, "Message_G2C_FIGHT_LINE_UP_DATA");
// class Message_C2G_WAR_FORMATION_INFO extends MessageBase {
// 	public initObj(...args: any[]): void {
// 	}
// 	pack(writer) {
// 	}
// 	unpack(reader) {
// 	}
// }
// //战阵信息
// class Message_G2C_WAR_FORMATION_INFO extends MessageBase {
// 	formationInfo
// 	formationUsed
// 	public initObj(...args: any[]): void {
// 		this.formationInfo = {}
// 		this.formationUsed = 0
// 	}
// 	pack(writer) {
// 	}
// 	unpack(reader) {
// 		if (size_t(this.formationInfo) == 0) {
// 			this.formationInfo = {}
// 			let num = reader.readUInt()
// 			if (num > 0 && num < 100) {
// 				for (let i = 1; i <= num; i++) {
// 					let key = reader.readUInt()
// 					let elem: any = {}
// 					elem.level = reader.readUInt()
// 					elem.failedCount = reader.readUInt()
// 					this.formationInfo[key] = elem
// 				}
// 			}
// 		} else {
// 			let newFormationInfo: any = {}
// 			let num = reader.readUInt()
// 			if (num > 0 && num < 100) {
// 				for (let i = 1; i <= num; i++) {
// 					let key = reader.readUInt()
// 					let elem: any = {}
// 					elem.level = reader.readUInt()
// 					elem.failedCount = reader.readUInt()
// 					newFormationInfo[key] = elem
// 				}
// 			}
// 			for (let k in newFormationInfo) {
// 				let v = newFormationInfo[k]
// 				let newLevel = v.level
// 				let oldLevel = this.formationInfo[k] && (this.formationInfo[k].level || 0) || 0
// 				if (oldLevel == 0) {
// 					if (newLevel != 0) {
// 						FireEvent(EventDefine.FORMATION_UNLOCK_SUCCESS, null)
// 						break
// 					}
// 				} else {
// 					if (newLevel != oldLevel) {
// 						FireEvent(EventDefine.FORMATION_UPDATE_SUCCESS, null)
// 						break
// 					}
// 				}
// 			}
// 			this.formationInfo = newFormationInfo
// 		}
// 		this.formationUsed = reader.readUInt()
// 	}
// }
// //升级战阵
// class Message_C2G_WAR_FORMATION_LEVEL extends MessageBase {
// 	formationType
// 	public initObj(...args: any[]): void {
// 		this.formationType = 0
// 	}
// 	pack(writer) {
// 		writer.writeUInt(this.formationType)
// 	}
// 	unpack(reader) {
// 	}
// 	//使用战阵
// }
// class Message_C2G_WAR_FORMATION_SET extends MessageBase {
// 	formationType
// 	public initObj(...args: any[]): void {
// 		this.formationType = 0
// 	}
// 	pack(writer) {
// 		writer.writeUInt(this.formationType)
// 	}
// 	unpack(reader) {
// 	}
// }
//组队关卡
//进入关卡
var Message_C2G_FIGHT_ENTER_CAMPAIGN_INFO = (function (_super) {
    __extends(Message_C2G_FIGHT_ENTER_CAMPAIGN_INFO, _super);
    function Message_C2G_FIGHT_ENTER_CAMPAIGN_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_ENTER_CAMPAIGN_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_FIGHT_ENTER_CAMPAIGN_INFO.prototype.pack = function (writer) {
    };
    Message_C2G_FIGHT_ENTER_CAMPAIGN_INFO.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_ENTER_CAMPAIGN_INFO;
}(MessageBase));
__reflect(Message_C2G_FIGHT_ENTER_CAMPAIGN_INFO.prototype, "Message_C2G_FIGHT_ENTER_CAMPAIGN_INFO");
var Message_G2C_FIGHT_ENTER_CAMPAIGN_INFO = (function (_super) {
    __extends(Message_G2C_FIGHT_ENTER_CAMPAIGN_INFO, _super);
    function Message_G2C_FIGHT_ENTER_CAMPAIGN_INFO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_FIGHT_ENTER_CAMPAIGN_INFO.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.campaignId = 0; //队伍可打关卡
        this.curCampaignId = 0; //队伍设置的当前关卡
    };
    Message_G2C_FIGHT_ENTER_CAMPAIGN_INFO.prototype.pack = function (writer) {
    };
    Message_G2C_FIGHT_ENTER_CAMPAIGN_INFO.prototype.unpack = function (reader) {
        this.campaignId = reader.readUInt();
        this.curCampaignId = reader.readUInt();
    };
    return Message_G2C_FIGHT_ENTER_CAMPAIGN_INFO;
}(MessageBase));
__reflect(Message_G2C_FIGHT_ENTER_CAMPAIGN_INFO.prototype, "Message_G2C_FIGHT_ENTER_CAMPAIGN_INFO");
//设置当前打的关卡(队长操作)
var Message_C2G_FIGHT_SET_CAMPAIGN = (function (_super) {
    __extends(Message_C2G_FIGHT_SET_CAMPAIGN, _super);
    function Message_C2G_FIGHT_SET_CAMPAIGN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_FIGHT_SET_CAMPAIGN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.campaignId = 0;
    };
    Message_C2G_FIGHT_SET_CAMPAIGN.prototype.pack = function (writer) {
        writer.writeUInt(this.campaignId);
    };
    Message_C2G_FIGHT_SET_CAMPAIGN.prototype.unpack = function (reader) {
    };
    return Message_C2G_FIGHT_SET_CAMPAIGN;
}(MessageBase));
__reflect(Message_C2G_FIGHT_SET_CAMPAIGN.prototype, "Message_C2G_FIGHT_SET_CAMPAIGN");
var Message_G2C_EXCITE_LIMIT_CAMPAIGN = (function (_super) {
    __extends(Message_G2C_EXCITE_LIMIT_CAMPAIGN, _super);
    function Message_G2C_EXCITE_LIMIT_CAMPAIGN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EXCITE_LIMIT_CAMPAIGN.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.campaignIndex = null;
        this.campaignRemainTime = null;
    };
    Message_G2C_EXCITE_LIMIT_CAMPAIGN.prototype.pack = function (writer) {
    };
    Message_G2C_EXCITE_LIMIT_CAMPAIGN.prototype.unpack = function (reader) {
        this.campaignIndex = reader.readUInt();
        this.campaignDeadLine = reader.readUInt() + GetServerTime(); //结束时间戳
    };
    return Message_G2C_EXCITE_LIMIT_CAMPAIGN;
}(MessageBase));
__reflect(Message_G2C_EXCITE_LIMIT_CAMPAIGN.prototype, "Message_G2C_EXCITE_LIMIT_CAMPAIGN");
//全服首通
var Message_C2G_EXCITE_NOT_SERVER_FIRST_CAMP = (function (_super) {
    __extends(Message_C2G_EXCITE_NOT_SERVER_FIRST_CAMP, _super);
    function Message_C2G_EXCITE_NOT_SERVER_FIRST_CAMP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_EXCITE_NOT_SERVER_FIRST_CAMP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Message_C2G_EXCITE_NOT_SERVER_FIRST_CAMP.prototype.pack = function (writer) {
    };
    Message_C2G_EXCITE_NOT_SERVER_FIRST_CAMP.prototype.unpack = function (reader) {
    };
    return Message_C2G_EXCITE_NOT_SERVER_FIRST_CAMP;
}(MessageBase));
__reflect(Message_C2G_EXCITE_NOT_SERVER_FIRST_CAMP.prototype, "Message_C2G_EXCITE_NOT_SERVER_FIRST_CAMP");
//全服首通
var Message_G2C_EXCITE_NOT_SERVER_FIRST_CAMP = (function (_super) {
    __extends(Message_G2C_EXCITE_NOT_SERVER_FIRST_CAMP, _super);
    function Message_G2C_EXCITE_NOT_SERVER_FIRST_CAMP() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_G2C_EXCITE_NOT_SERVER_FIRST_CAMP.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.campaignId = 0;
    };
    Message_G2C_EXCITE_NOT_SERVER_FIRST_CAMP.prototype.pack = function (writer) {
    };
    Message_G2C_EXCITE_NOT_SERVER_FIRST_CAMP.prototype.unpack = function (reader) {
        this.campaignId = reader.readUInt();
    };
    return Message_G2C_EXCITE_NOT_SERVER_FIRST_CAMP;
}(MessageBase));
__reflect(Message_G2C_EXCITE_NOT_SERVER_FIRST_CAMP.prototype, "Message_G2C_EXCITE_NOT_SERVER_FIRST_CAMP");
//功能礼包
var Message_C2G_ITEM_CAMPAGIN_GIFT_BUY = (function (_super) {
    __extends(Message_C2G_ITEM_CAMPAGIN_GIFT_BUY, _super);
    function Message_C2G_ITEM_CAMPAGIN_GIFT_BUY() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message_C2G_ITEM_CAMPAGIN_GIFT_BUY.prototype.initObj = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = 0;
    };
    Message_C2G_ITEM_CAMPAGIN_GIFT_BUY.prototype.pack = function (writer) {
        writer.writeUInt(this.index);
    };
    Message_C2G_ITEM_CAMPAGIN_GIFT_BUY.prototype.unpack = function (reader) {
    };
    return Message_C2G_ITEM_CAMPAGIN_GIFT_BUY;
}(MessageBase));
__reflect(Message_C2G_ITEM_CAMPAGIN_GIFT_BUY.prototype, "Message_C2G_ITEM_CAMPAGIN_GIFT_BUY");
//# sourceMappingURL=CampaignMessage.js.map
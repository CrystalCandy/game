


class MonsterInfo extends TClass {
    id
    entryid
    name

    public initObj(...args: any[]): void {
        this.id = 0
        this.entryid = 0
        this.name = "Monster"
    }

    read(reader) {
        this.id = reader.readUInt()
        this.entryid = reader.readUInt()
    }

    write(writer) {

    }

    ////////////////////////////////////////////////////////////////////////

}

class PetInfo extends MonsterInfo {

    public initObj(...args: any[]): void {

    }

    read(reader) {

        let this_: any = this;

        this_.guid = reader.readUInt()  //guid
        this_.entryid = reader.readUInt()  //entryId
        this_.stage = reader.readUShort() //等阶
        this_.stageexp = reader.readUInt() //当前等阶经验
        this_.combatPos = reader.readUChar() //0代表没有出战，1代表出战 2代表备战1 3代表备战2
        this_.name = reader.readString() || "" //名字 可以随意修改
        this_.growexp = reader.readUShort() //资质经验 一般是用几个资质卡
        this_.washskillnum = reader.readUShort() //洗了多少次技能
        
        this_.passskilllist = []
        let num = reader.readUChar() //当前被动技能个数
        for (let i = 1; i <= num; i++) {
            let skillId = reader.readUShort() //当前被动技能ID
            JsUtil.arrayInstert(this_.passskilllist, skillId)
        }

        this_.washSkillList = []
        num = reader.readUChar() //洗出来的被动技能个数
        for (let i = 1; i <= num; i++) {
            let skillId = reader.readUShort() //洗出来的被动技能ID
            JsUtil.arrayInstert(this_.washSkillList, skillId)
        }
				//"entryid:uint32",
				//"stage:uint16",
				//"stageexp:uint32",
				//"combatpos:uint8",
				//"name:string",
				//"growexp:uint16",
				//"washskillnum:uint16",
				//"passskilllist:table",
				//"washskilllist:table"
        // this_.id = reader.readUInt()
        // this_.type_id = reader.readUInt()
        // this_.level = reader.readUShort()
        // this_.exp = tonumber(reader.readString()) || 0
        // this_.status = reader.readUShort()			//绑定，非绑定，没有雇佣关系(自己的)， 雇佣进来，雇佣出去
        // this_.awakeLevel = reader.readUInt()				//觉醒等级
        // this_.breakLevel = reader.readUInt()				//突破等级
        // this_.naturalStoneList = table_load(reader.readString()) || {}				//天赋石头列表		{[1]:entryId1, [2]:entryId2, }
        // this_.skillList = table_load(reader.readString()) || {}				//技能列表
        // this_.combatForce = tonumber(reader.readString())				//战力

        ////////////////////////////////////-二级属性////////////////////////////////////////////-
        //for(let index = objectField.UNIT_LASTABILITY_BEGIN; index <=  objectField.UNIT_LASTABILITY_END;index++){
        //	let dtype = fieldType[index] || dataType.UINT
        //	let data = null
        //	
        //	if(dtype == dataType.BYTE ){
        //		data = reader.readUChar()
        //	}else if(dtype == dataType.UINT ){
        //		data = reader.readUInt()
        //	}else if(dtype == dataType.STRING ){
        //		data = reader.readString()
        //	}else if(dtype == dataType.FLOAT ){
        //		data = reader.readFloat()
        //	}
        //	
        //	if(pet_objectFiled[index] ){
        //		this_[pet_objectFiled[index*/ = data
        //	}else{
        //		this_[index] = data
        //	}
        //}
        // readFinalLastAbility(reader, this_)

        //let posName:any = {
        //									[1]	: "cap_item",
        //									[2] : "weapon_item",
        //									[3]	: "cloth_item",
        //									[4]	: "mask_item",
        //									[5]	: "shoe_item",
        //									[6]	: "neck_item",
        //							}
        //
        //let count = reader.readUChar()
        //for(let i = 1; i <=  count;i++){
        //	let info = ItemInfo.newObj()
        //	info.read(reader)
        //	
        //	if(info.store == storeOptions.PETITEM ){
        //		let item = Item.newObj(info)
        //		this_[posName[info.position*/ = item
        //		//标记hero身上的装备
        //		item.setOwnerId(GetHero().getId())
        //	}
        //}

        // this_.entry = reader.readUInt()     //entryId
        // this_.linkLevel = reader.readUChar()    //羁绊等级
        // this_.qualityLevel	= reader.readUChar()    //品阶
        // this_.quality = 1													//品质


        //this_.name = PetSystem.getInstance().getPetName(this_.entry)
        //this.name = PetSystem.getInstance().getPetQualityLevelName(this_.qualityLevel, this_.name)
    }

    write(writer) {

    }

}
// TypeScript file

//-----------------------------------------------------------------------------
//申请建立链接
class Message_C2L_CONNECT extends MessageBase{
    name:string;

    public initObj(...params:any[]):void{
        this.addWriteProtocol(MessageProtocol.STRING, "name");
    }

} 


//申请建立链接
class Message_L2C_CONNECT extends MessageBase{
    result:number;

    public initObj(...params:any[]):void{
        this.addReadProtocol(MessageProtocol.UINT16, "result");
    }

} 



//-----------------------------------------------------------------------------
//申请查询服务器状态
class Message_C2L_STATE extends MessageBase{
    public initObj(...params:any[]):void{
       
    }

} 


//服务器状态返回
class Message_L2C_STATE extends MessageBase{
    state:string;
    public initObj(...params:any[]):void{
        this.addReadProtocol(MessageProtocol.UINT8, "state");
    }

} 

//-----------------------------------------------------------------------------
//申请获取服务器版本
class Message_C2L_VERSION extends MessageBase{
    public initObj(...params:any[]):void{
       
    }
} 

//服务器版本返回
class Message_L2C_VERSION extends MessageBase{
    version:string;
    public initObj(...params:any[]):void{
       this.addReadProtocol(MessageProtocol.STRING, "version");
    }
} 

//-----------------------------------------------------------------------------
//申请获得认证码
class Message_C2L_VERVIFY_CODE extends MessageBase{
    public initObj(...params:any[]):void{
       
    }
} 

//获取验证码
class Message_L2C_VERVIRY_CODE extends MessageBase{
    public initObj(...params:any[]):void{
    }
} 

//-----------------------------------------------------------------------------
class Message_C2L_ROLE_SELECT extends MessageBase{
    playerId:number;
    public initObj(...params:any[]):void{
       this.addWriteProtocol(MessageProtocol.UINT32, "playerId");
    }
} 

class Message_L2C_ROLE_SELECT extends MessageBase{
    result:number;
    ip:string;
    port:number;
    sessionId:string;
    public initObj(...params:any[]):void{
    }

    public unpack(reader:BinaryStream){
        this.result = reader.readUnsignedShort();
        if(this.result == 0){ //0是成功
            this.ip = reader.readString();
            this.port = reader.readUnsignedShort();
            this.sessionId = reader.readString();
        }
    }
} 


//-----------------------------------------------------------------------------
class Message_C2L_ROLE_LIST extends MessageBase{
    public initObj(...params:any[]):void{
       
    }
} 

class Message_L2C_ROLE_LIST extends MessageBase{
    RoleList:any[];
    public initObj(...params:any[]):void{
    }

    public unpack(reader:BinaryStream){
       this.RoleList = [];
       var role_num = reader.readUnsignedShort();
       for(var i= 0; i < role_num; i++){
           var roleInfo = LoginRole.createObj();
           roleInfo.read(reader);
           this.RoleList.push(roleInfo);
       }
    }
} 

//-----------------------------------------------------------------------------

class Message_C2L_ROLE_CREATE extends MessageBase{
    name:string = ""
    role:number = 10001
    sex:number = 0

    public initObj(...params:any[]):void{
        this.addWriteProtocol(MessageProtocol.STRING, "name");
        this.addWriteProtocol(MessageProtocol.UINT16, "role");
        this.addWriteProtocol(MessageProtocol.UINT8, "sex");

    }



}
//-----------------------------------------------------------------------------

class Message_L2C_ROLE_CREATE extends MessageBase{
    result:number;
    roleInfo:LoginRole;
    public initObj(...params:any[]):void{
    }

    public unpack(reader:BinaryStream){
        this.result = reader.readUnsignedShort();
        if(this.result == 0){
            this.roleInfo = LoginRole.createObj();
            this.roleInfo.read(reader);
        }
    }
}

//-----------------------------------------------------------------------------
class Message_L2C_QUEUE_UPDATE extends MessageBase{
    position:number;
    public initObj(...params:any[]):void{
        this.addReadProtocol(MessageProtocol.UINT32, "position");
    }
}
declare class AlluGameSdk extends TClass implements InterfaceGameSdk {
    static APPID: string;
    static APPKEY: string;
    mGameSdk: core.GameSdk;
    minit: boolean;
    mplatform: string;
    mplatform_id: string;
    mopenid: string;
    mopenkey: string;
    mnoice: string;
    mappid: string;
    mopensign: string;
    mopenplatform: string;
    mopenplatformid: string;
    mserverid: string;
    msign: string;
    static inst: AlluGameSdk;
    initObj(...params: any[]): void;
    static _initCallback(): void;
    initCallback(): void;
    static _checkAttentionStatusCallback(status: number): void;
    checkAttentionStatusCallback(status: number): void;
    checkAttentionStatus(): void;
    static _checkInviteStatusCallback(status: boolean): void;
    checkInviteStatusCallback(status: boolean): void;
    checkInviteStatus(): void;
    static _onInviteReturnCallback(ret: boolean): void;
    onInviteReturnCallback(ret: boolean): void;
    setInviteCallback(): void;
    initSdk(): boolean;
    _payCallback(result: number): void;
    payCallback(result: number): void;
    login(params: string): boolean;
    pay(itemparams: string): boolean;
    showShare(params: string): boolean;
    showAttention(params: string): boolean;
    reportRoleCreate(serverid: string, servername: string, roleid: string, rolename: string, rolelevel: number): boolean;
    reportRoleLogin(serverid: string, servername: string, roleid: string, rolename: string, rolelevel: number): boolean;
}
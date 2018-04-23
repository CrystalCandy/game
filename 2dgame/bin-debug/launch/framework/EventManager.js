var g_EventManager = new core.EventSet();
function GetEventSet() {
    return g_EventManager;
}
//once响应监听后会自动注销
function RegisterEventOnce(type, listener, thisObject) {
    g_EventManager.once(type, listener, thisObject);
}
function RegisterEvent(type, listener, thisObject) {
    g_EventManager.addEventListener(type, listener, thisObject);
}
function UnRegisterEvent(type, listener, thisObject) {
    g_EventManager.removeEventListener(type, listener, thisObject);
}
function FireEvent(type, event, bubble) {
    var evt = event;
    //如果没传时间，则从内存池里取一个
    var tmpEvt = null;
    if (evt == null) {
        evt = egret.Event.create(core.EventArgs, type, false, false);
        tmpEvt = evt;
    }
    var result = g_EventManager.fireEvent(type, evt, bubble);
    if (tmpEvt) {
        egret.Event.release(tmpEvt);
    }
    return result;
}
//# sourceMappingURL=EventManager.js.map
class Pet extends Character{

   shouHunEffect:Effect;

	//子类复写 初始化函数
    public initObj(...params:any[]):void{
		this.setMovementNotifyEnable(true)
        this.actorType = actor_Type.ACTOR_TYPE_PET;
    }
    //子类复写 析构函数
    protected destory(): void{
        this.deleteShouHunEffect()
    }

    deleteShouHunEffect() {
        if (this.shouHunEffect) {
            this.shouHunEffect.deleteObj()
            this.shouHunEffect = null
        }
    }


    setShouHunEffect(effectId){
         effectId = effectId || 0

        this.deleteShouHunEffect()
        if(effectId <= 0){
            return
        }

        let boneParam: any = {}
        boneParam.name = ""
        boneParam.order = -1
        boneParam.transfrom = true

        this.shouHunEffect = EffectManager.getInstance().createBindEffect(effectId, this, boneParam, true)
    }

}
cc.Class({
    extends: require('sound_controller'),

    setEffectOn(isOn) {
        if (isOn)
            this.isEffectOn = true
        else
            this.isEffectOn = false

    },
    onButtonClick() {
        if (this.isEffectOn) {
            cc.audioEngine.playEffect(this.clickSound, false);
            console.log("playckick");
        }
    },
    onSliderClick(slider, data){
        let track = slider.node.getChildByName('Track')
        track.width = Math.floor(200 * slider.progress)
        this.setVolume(slider.progress)
    }
});
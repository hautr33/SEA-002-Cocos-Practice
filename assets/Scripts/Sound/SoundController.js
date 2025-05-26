cc.Class({
    extends: cc.Component,

    properties: {
        bgmSound: {
            type: cc.AudioClip,
            default: null
        },
        clickSound: {
            type: cc.AudioClip,
            default: null
        },
        sliderBackground: cc.Node,
        sliderTrack: cc.Node,
        sliderThumb: cc.Node,
    },
    onLoad() {
        this.isBgmOn = false;
        this.sliderThumb.on(cc.Node.EventType.TOUCH_MOVE, this.onChangeVolume, this)
        this.setVolume(0.7);
    },
    onButtonClick() {
        if (this.isEffectOn) {
            cc.audioEngine.playEffect(this.clickSound, false);
            console.log(this.clickSound)
            console.log("playckick");
        }
    },
    onSliderClick(slider, data){
        let track = slider.node.getChildByName('Track')
        track.width = Math.floor(200 * slider.progress)
        this.setVolume(slider.progress)
    },
    setEffectOn(isOn) {
        if (isOn)
            this.isEffectOn = true
        else
            this.isEffectOn = false

    },
    setMusiceOn(isOn) {
        if (isOn)
            cc.audioEngine.playMusic(this.bgmSound, true);
        else
            cc.audioEngine.stopMusic();
    },
    setVolume(percent, IDs = []) {
        cc.audioEngine.setMusicVolume(percent);
        cc.audioEngine.setEffectsVolume(percent);
        IDs.forEach(id => {
            cc.audioEngine.setVolume(id, percent);
        });
    }
});
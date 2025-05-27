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
    },
    onLoad() {
        this.isBgmOn = false;
        this.setVolume(0.7);
    },
    onButtonClick() {
        if (this.isEffectOn) {
            cc.audioEngine.playEffect(this.clickSound, false);
        }
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
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
        winSound: {
            type: cc.AudioClip,
            default: null
        },
    },
    onLoad() {
        this.setVolume(0.7);
    },
    setMusiceOn(isOn) {
        if (isOn)
            cc.audioEngine.playMusic(this.bgmSound, true);
        else
            cc.audioEngine.stopMusic();
    },
    playWinSound() {
        cc.audioEngine.playEffect(this.winSound, false);
    },
    onButtonClick() {
        cc.audioEngine.playEffect(this.clickSound, false);
        console.log("playckick");
    },
    setVolume(percent, IDs = []) {
        cc.audioEngine.setMusicVolume(percent);
        cc.audioEngine.setEffectsVolume(percent);
        IDs.forEach(id => {
            cc.audioEngine.setVolume(id, percent);
        });
    }
});
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
        this.setVolume(0.75);
    },
    setMusiceOn(isOn) {
        if (isOn)
            cc.audioEngine.playMusic(this.bgmSound, true);
        else
            cc.audioEngine.stopMusic();
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
    },
    onChangeVolume(event) {
        const delta = event.getDelta();
        let newX = this.sliderThumb.x + delta.x

        if (newX > this.sliderBackground.x + this.sliderBackground.width)
            newX = this.sliderBackground.x + this.sliderBackground.width
        if (newX < this.sliderBackground.x)
            newX = this.sliderBackground.x

        this.sliderThumb.x = newX;
        this.sliderTrack.width = newX - this.sliderBackground.x
        const percent = (newX - this.sliderBackground.x) / this.sliderBackground.width;

        this.setVolume(percent)
    }
});
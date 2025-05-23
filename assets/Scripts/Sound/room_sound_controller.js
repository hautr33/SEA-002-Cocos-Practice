cc.Class({
    extends: require('sound_controller'),

    properties: {
        winSound: {
            type: cc.AudioClip,
            default: null
        },
        iconBgmOn: cc.Node,
        iconBgmOff: cc.Node,
    },
    onLoad() {
        this._super();
        this.iconBgmOff.active = true;
        this.iconBgmOn.active = false;

    },
    setMusiceOn(isOn) {
        if (isOn)
            cc.audioEngine.playMusic(this.bgmSound, true);
        else
            cc.audioEngine.stopMusic();
    },
    onBgmClick(event, data) {
        console.log(data)
        if (data === 'false') {
            this.setMusiceOn(false);
            this.iconBgmOff.active = true;
            this.iconBgmOn.active = false;
            this.isBgmOn = false;
        } else if (data === 'true') {
            this.setMusiceOn(true);
            this.iconBgmOff.active = false;
            this.iconBgmOn.active = true;
            this.isBgmOn = true;
        }
    },
    playWinSound() {
        cc.audioEngine.playEffect(this.winSound, false);
    }
});
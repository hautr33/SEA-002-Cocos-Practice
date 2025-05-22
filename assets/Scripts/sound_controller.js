// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
        iconBgmOn: cc.Node,
        iconBgmOff: cc.Node,
        sliderBackground: cc.Node,
        sliderTrack: cc.Node,
        sliderThumb: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.iconBgmOff.active = true;
        this.iconBgmOn.active = false;
        this.bgmId = null;
        this.isBgmOn = false;
        this.sliderThumb.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.percent = 0.75
        cc.audioEngine.setMusicVolume(this.percent);
    },
    onBgmClick() {
        if (this.isBgmOn) {
            cc.audioEngine.stop(this.bgmId);
            this.iconBgmOff.active = true;
            this.iconBgmOn.active = false;
            this.isBgmOn = false;
        } else {
            this.bgmId = cc.audioEngine.play(this.bgmSound, true, this.percent);
            this.iconBgmOff.active = false;
            this.iconBgmOn.active = true;
            this.isBgmOn = true;
        }
    },
    onButtonClick() {
        cc.audioEngine.playMusic(this.clickSound, false);
    },
    playWinSound() {
        cc.audioEngine.playMusic(this.winSound, false);
    },
    onTouchMove(event) {
        const delta = event.getDelta();
        let newX = this.sliderThumb.x + delta.x

        if (newX > this.sliderBackground.x + this.sliderBackground.width)
            newX = this.sliderBackground.x + this.sliderBackground.width
        if (newX < this.sliderBackground.x)
            newX = this.sliderBackground.x
        this.sliderThumb.x = newX;
        this.sliderTrack.width = newX - this.sliderBackground.x
        this.percent = (newX - this.sliderBackground.x) / this.sliderBackground.width;
        console.log(this.percent)
        cc.audioEngine.setMusicVolume(this.percent);
        cc.audioEngine.setVolume(this.bgmId, this.percent);

    }
});

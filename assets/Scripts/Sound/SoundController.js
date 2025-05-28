const Emitter = require('Emitter');
const Events = require('EventKeys');

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
        this.setVolume(0.7);
        this.registerEvent();
    },
    registerEvent() {
        Emitter.registerEvent(Events.SOUND.PLAY, this.playSound, this);
        Emitter.registerEvent(Events.SOUND.SET_VOLUME, this.setVolume, this);
        Emitter.registerEvent(Events.SOUND.SET_SOUND_ON, this.setSoundOn, this);
    },
    playSound(soundName) {
        if (!this.isEffectOn) return;

        if (soundName === 'CLICK') {
            cc.audioEngine.playEffect(this.clickSound, false);
        }
    },
    setSoundOn(data) {
        if (data.name === 'BGM') {
            if (data.isChecked)
                cc.audioEngine.playMusic(this.bgmSound, true);
            else
                cc.audioEngine.stopMusic();
        } else if (data.name === 'SFX') {
            this.isEffectOn = data.isChecked;
        }
    },
    setVolume(percent, IDs = []) {
        cc.audioEngine.setMusicVolume(percent);
        cc.audioEngine.setEffectsVolume(percent);
        IDs.forEach(id => {
            cc.audioEngine.setVolume(id, percent);
        });
    },
    onDestroy() {
        Emitter.removeEventsByTarget(this);
    }
});
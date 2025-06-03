const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: require('PopupItem'),

    properties: {
        bgmToggle: cc.Toggle,
        sliderBackground: cc.Node,
        sliderTrack: cc.Node,
    },
    onSliderClick(slider, data) {
        this.sliderTrack.width = Math.floor(this.sliderBackground.width * slider.progress)
        Emitter.emit(Events.SOUND.SET_VOLUME, slider.progress);
    },
    onToggleClick(toggle, data) {
        var data = { name: data, isChecked: toggle.isChecked };
        Emitter.emit(Events.SOUND.SET_SOUND_ON, data);
        Emitter.emit(Events.SOUND.PLAY, 'CLICK');
    }
});
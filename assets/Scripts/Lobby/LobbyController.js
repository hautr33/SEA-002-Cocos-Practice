const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    onButtonClick(event, data) {
        Emitter.emit(Events.POPUP.SHOW, data);
        Emitter.emit(Events.SOUND.PLAY, 'CLICK');
    },
});
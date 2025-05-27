const Emitter = require('mEmitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    onLoad() {
        this.hide()
    },
    show() {
        this.node.active = true;
    },
    hide() {
        this.node.active = false;
        Emitter.emit(Events.SOUND.PLAY, 'CLICK');
    }
});
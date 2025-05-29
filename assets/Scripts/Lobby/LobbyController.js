const Emitter = require('Emitter');
const Events = require('EventKeys');
const SceneConfig = require('SceneConfig');

cc.Class({
    extends: cc.Component,

    onOpenPopup(event, data) {
        Emitter.emit(Events.POPUP.SHOW, data);
        Emitter.emit(Events.SOUND.PLAY, 'CLICK');
    },
    onSwitchScene(event, data){
        SceneConfig.nextScene = data
        Emitter.emit(Events.SOUND.PLAY, 'CLICK');
        cc.director.loadScene('Loading');
    }
});
const Emitter = require('Emitter');
const Events = require('EventKeys');
const SceneConfig = require('SceneConfig');

cc.Class({
    extends: cc.Component,

    onSwitchScene(event, data) {
        SceneConfig.nextScene = data
        Emitter.emit(Events.SOUND.PLAY, 'CLICK');
        cc.director.loadScene('Loading');
    }
});

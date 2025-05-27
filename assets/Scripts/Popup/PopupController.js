const Emitter = require('mEmitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    properties: {
        popupSetting: require('PopupItem'),
        popupRank: require('PopupItem'),
    },
    onLoad () {
        Emitter.registerEvent(Events.POPUP.SHOW, this.onShowPopup.bind(this));
    },
    onShowPopup(name) {
        if (name === 'SETTING') {
            this.popupSetting.show()
        } else if (name === 'RANKING') {
            this.popupRank.show()
        }
    },
});
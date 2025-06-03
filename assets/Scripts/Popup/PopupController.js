const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    properties: {
        popupSetting: require('PopupItem'),
        popupRank: require('PopupItem'),
    },
    onLoad() {
        this.registerEvent()
    },
    registerEvent() {
        Emitter.registerEvent(Events.POPUP.SHOW, this.onShowPopup, this);
    },
    onShowPopup(name) {
        if (name === 'SETTING') {
            this.popupSetting.show()
        } else if (name === 'RANKING') {
            this.popupRank.show()
        }
    },
    onDestroy() {
        Emitter.removeEventsByTarget(this);
    }
});
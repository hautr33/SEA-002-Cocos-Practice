cc.Class({
    extends: cc.Component,

    properties: {
        popupSetting: require('PopupItem'),
        popupRank: require('PopupItem'),
    },
    showSetting() {
        this.popupSetting.show()
    },
    showRank() {
        this.popupRank.show()
    },
    hideSetting() {
        this.popupSetting.hide()
    },
    hideRank() {
        this.popupRank.hide()
    },
});
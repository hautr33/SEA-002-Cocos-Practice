cc.Class({
    extends: cc.Component,

    properties: {
        popupController: require('PopupController'),
    },
    onSettingClick() {
        this.popupController.showSetting()
    },
    onRankClick() {
        this.popupController.showRank()
    }
});
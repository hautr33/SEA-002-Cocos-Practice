cc.Class({
    extends: cc.Component,

    properties: {
        popupController: require('popup_controller'),
    },
    onSettingClick(){
        this.popupController.showSetting()
    },
    onRankClick(){
        this.popupController.showRank()
    }
});

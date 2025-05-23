cc.Class({
    extends: cc.Component,

    properties: {
        popupSetting: require('popup_item'),
        popupRank: require('popup_item'),
    },
    showSetting(){
        this.popupSetting.show()
    },
    showRank(){
        this.popupRank.show()
    },
    hideSetting(){
        this.popupSetting.hide()
    },
    hideRank(){
        this.popupRank.hide()
    },
});

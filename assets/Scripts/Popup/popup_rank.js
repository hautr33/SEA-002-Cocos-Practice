cc.Class({
    extends: require('popup_item'),

    properties: {
    },
    show(){
        this._super();
        console.log("Show Ranking")
    },
    hide(){
        this._super();
        console.log("Hide Ranking")
    }
});

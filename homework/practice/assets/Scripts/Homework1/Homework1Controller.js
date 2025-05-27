cc.Class({
    extends: cc.Component,

    properties: {
        mainMenuController: require('MainMenuController'),
        labelController: cc.Node,
        gameController: cc.Node,
    },


    onLoad () {
        this.show(this.labelController);
    },
    onBackClick(){
        this.mainMenuController.show(null)
    },
    onLabelClick(){
        this.show(this.labelController)
    },
    onGameClick(){
        this.show(this.gameController)
    },
    hideAll () {
        this.mainMenuController.active = false;
        this.gameController.active = false;
        this.labelController.active = false;
    },
    show(menu) {
        this.hideAll();
        menu.active = true;
    }
});

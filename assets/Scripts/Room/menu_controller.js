cc.Class({
    extends: cc.Component,

    properties: {
        gameMenuNode: cc.Node,
        labelMenuNode: cc.Node,
    },
    start () {
        this.showLabelMenu()
    },
    onPlayGameClick(){
        this.showGameMenu()
    },
    onLabelControllerClick(){
        this.showLabelMenu()
    },
    showGameMenu(){
        this.gameMenuNode.active = true;
        this.labelMenuNode.active = false;
    },
    showLabelMenu(){
        this.gameMenuNode.active = false;
        this.labelMenuNode.active = true;
    },
});

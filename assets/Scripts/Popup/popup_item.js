cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad() {
        this.hide()
    },
    show() {
        this.node.active = true;
    },
    hide() {
        this.node.active = false;
    }
});

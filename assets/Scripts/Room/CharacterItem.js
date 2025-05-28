cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200
    },
    onSpawn() {
        this.node.opacity = 255;
        this.node.scale = 1;
        cc.log("Quái vừa spawn:", this.node.name);
    },
    onMove() {
        const targetX = -cc.winSize.width - 100;
        cc.tween(this.node)
            .to((this.node.x - targetX) / this.speed, { x: targetX })
            .call(() => {
                cc.log("Quái đã chết:", this.node.name);
                this.onDie()
            })
            .start();
    },
    onDie() {
        this.node.destroy();
    }
});

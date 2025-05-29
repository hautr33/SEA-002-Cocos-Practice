const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,
    properties: {
        labelName: cc.Label,
        speed: 200
    },
    onLoad() {
        this.player = this.node.parent.parent.getChildByName('Player')
    },
    onSpawn() {
        this.node.opacity = 255;
        this.node.scale = 0.7;
    },
    onMove() {
        const targetX = -cc.winSize.width / 2 - this.node.width;
        const totalDuration = (this.node.x - targetX) / this.speed;
        const startY = this.node.y;

        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .to(0.25, { y: startY + 10 }, { easing: 'sineOut' })
                    .to(0.25, { y: startY }, { easing: 'sineIn' })
            )
            .start();

        cc.tween(this.node)
            .to(totalDuration, { x: targetX })
            .call(() => {
                this.onDie();
            })
            .start();
    },
    onDie() {
        cc.log("OVER")
        this.node.destroy();
    },
    update() {
        if (!this.hasLogged && this.node.x < this.player.x) {
            this.hasLogged = true;
            Emitter.emit(Events.GAME.SCORE);
        }
    }
});

const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200
    },

    setController(controller) {
        this.controller = controller;
    },

    onSpawn() {
        this.node.opacity = 255;
        this.node.scale = 0.7;
    },

    moveToLeft(onComplete) {
        const targetX = -cc.winSize.width / 2 - this.node.width;
        const totalDuration = (this.node.x - targetX) / this.speed;
        cc.tween(this.node)
            .to(totalDuration, { x: targetX })
            .call(onComplete)
            .start();
    },

    bounceY() {
        const startY = this.node.y;
        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .to(0.25, { y: startY + 10 }, { easing: 'sineOut' })
                    .to(0.25, { y: startY }, { easing: 'sineIn' })
            )
            .start();
    },

    onMove() {
        this.bounceY();
        this.moveToLeft(() => this.onDie());
    },

    onDie() {
        if (this.controller) this.controller.removeMonster(this.node);
        this.node.destroy();
    },

    onCollisionEnter(other, self) {
        if (other.node.group === 'ScoreLine' && !this.hasScored) {
            this.hasScored = true;
            Emitter.emit(Events.GAME.SCORE);
        }
    },
    onDestroy(){
        cc.log('onDestroy MonsterItem')
    }
});

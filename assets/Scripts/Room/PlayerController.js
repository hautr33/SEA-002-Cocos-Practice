const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    onLoad() {
        this.isGameStart = false;
        this.isGameOver = false;
        this.node.active = false;
        this.positionsY = [-340, -130, 80];
        this.currentIndex = 1;
        this.node.y = this.positionsY[this.currentIndex];
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.registerEvent()
    },
    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.q:
                this.onClickMove(null, 'UP');
                break;
            case cc.macro.KEY.e:
                this.onClickMove(null, 'DOWN');
                break;
        }
    },
    onClickMove(event, direction) {
        if (this.isGameStart && !this.isGameOver) {
            if (direction === 'UP' && this.currentIndex < this.positionsY.length - 1) {
                this.currentIndex++;
                this.moveToY(this.positionsY[this.currentIndex]);
            } else if (direction === 'DOWN' && this.currentIndex > 0) {
                this.currentIndex--;
                this.moveToY(this.positionsY[this.currentIndex]);
            }
        }
    },
    moveToY(targetY) {
        cc.tween(this.node)
            .stop() // đảm bảo không chồng tween
            .to(0.2, { y: targetY }, { easing: 'sineInOut' })
            .start();
    },
    onCollisionEnter(other, self) {
        if (!this.hasLogged) {
            this.hasLogged = true;
            const sceneRoot = cc.director.getScene();
            this.stopAllTweensRecursively(sceneRoot);
            this.onGameOver()
            Emitter.emit(Events.GAME.OVER);
        }
    },
    stopAllTweensRecursively(node) {
        node.stopAllActions();

        node.children.forEach(child => {
            this.stopAllTweensRecursively(child);
        });
    },
    onGameStart() {
        this.isGameStart = true;
        this.node = cc.find("Canvas/Room/Game/Player");
        this.player = this.node.getComponent(sp.Skeleton)
        this.node.active = true
        this.player.setAnimation(0, 'portal')
        this.player.addAnimation(0, 'hoverboard', true);
    },
    onGameOver() {
        this.isGameOver = true;
        this.player.setAnimation(0, 'death')
    },
    registerEvent() {
        Emitter.registerEvent(Events.GAME.START, this.onGameStart, this);
    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        Emitter.removeEventsByTarget(this);
    }
});

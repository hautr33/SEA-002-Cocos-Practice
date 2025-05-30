const Emitter = require('Emitter');
const Events = require('EventKeys');

const PLAYER_Y_POSITIONS = [-340, -130, 80];

cc.Class({
    extends: cc.Component,

    onLoad() {
        this.registerEvent();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.init()
    },

    init() {
        cc.log('init')
        this.isGameStart = false;
        this.isGameOver = false;
        this.isMoving = false;
        this.node.active = false;
        this.currentIndex = 1;
        this.node.y = PLAYER_Y_POSITIONS[this.currentIndex];
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.q:
                this.moveByDirection(null, 'UP');
                break;
            case cc.macro.KEY.e:
                this.moveByDirection(null, 'DOWN');
                break;
        }
    },

    moveByDirection(event, direction) {
        cc.log(this.isMoving)
        cc.log(this.isGameStart)
        cc.log(this.isGameOver)
        if (!this.isGameStart || this.isGameOver || this.isMoving) return;

        if (direction === 'UP' && this.currentIndex < PLAYER_Y_POSITIONS.length - 1) {
            this.currentIndex++;
        } else if (direction === 'DOWN' && this.currentIndex > 0) {
            this.currentIndex--;
        }
        this.moveToY(PLAYER_Y_POSITIONS[this.currentIndex]);
    },

    moveToY(targetY) {
        this.isMoving = true;
        cc.tween(this.node)
            .to(0.2, { y: targetY }, { easing: 'sineInOut' })
            .call(() => {
                this.isMoving = false;
            })
            .start();
    },

    onCollisionEnter(other, self) {
        if (!this.hasLogged) {
            this.hasLogged = true;
            this.node.stopAllActions()
            this.onGameOver()
            Emitter.emit(Events.GAME.OVER);
        }
    },

    onGameStart() {
        cc.log('start')
        this.node.active = true;
        this.player = this.node.getComponent(sp.Skeleton);
        this.player.setAnimation(0, 'portal');
        this.player.setCompleteListener((trackEntry, loopCount) => {
            if (trackEntry.animation.name === 'portal') {
                this.isGameStart = true;
                this.player.addAnimation(0, 'hoverboard', true);
                Emitter.emit(Events.GAME.PLAYER_READY);
            }
        });
    },

    onGameOver() {
        this.isGameOver = true;
        this.player.setAnimation(0, 'death')
    },

    registerEvent() {
        Emitter.registerEvent(Events.GAME.START, this.onGameStart, this);
    },

    onDestroy() {
        cc.log('onDestroy PlayerController')
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        Emitter.removeEventsByTarget(this);
    }
});

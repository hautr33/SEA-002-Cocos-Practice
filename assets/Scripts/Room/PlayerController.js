const Emitter = require('Emitter');
const Events = require('EventKeys');

const PLAYER_Y_POSITIONS = [-340, -130, 80];

cc.Class({
    extends: cc.Component,

    properties: {
        bulletParticle: cc.Prefab,
        shootButton: cc.Node,
        cooldownTime: 5
    },
    onLoad() {
        this.registerEvent();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.init()
    },

    init() {
        this.isGameStart = false;
        this.isMoving = false;
        this.isShootCooldown = false;
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
            case cc.macro.KEY.c:
                this.shootBullet()
                break;
        }
    },

    moveByDirection(event, direction) {
        if (!this.isGameStart || this.isMoving) return;

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

    shootBullet() {
        if (!this.isGameStart || this.isMoving || this.isShootCooldown) return;

        this.player.setAnimation(1, 'shoot', false);

        const bullet = cc.instantiate(this.bulletParticle);
        const bulletStart = cc.v2(this.node.x + 100, this.node.y + 75);
        bullet.setPosition(bulletStart);
        this.node.parent.addChild(bullet);

        cc.tween(bullet)
            .to(1, { x: cc.winSize.width / 2 + 300 })
            .call(() => bullet.destroy())
            .start();

        this.startCooldown();
    },

    startCooldown() {
        this.isShootCooldown = true;

        const bar = this.shootButton.getChildByName('Cooldown')
            .getComponent(cc.ProgressBar);

        bar.progress = 1;

        cc.tween(bar)
            .to(this.cooldownTime, { progress: 0 })
            .call(() => {
                this.isShootCooldown = false;
            })
            .start();
    },

    onCollisionEnter(other, self) {
        this.node.stopAllActions()
        this.onGameOver()
        Emitter.emit(Events.GAME.OVER);
    },

    onGameStart() {
        this.node.active = true;
        this.player = this.node.getComponent(sp.Skeleton);
        this.player.setAnimation(0, 'portal');
        this.player.setCompleteListener((trackEntry, loopCount) => {
            if (trackEntry.animation.name === 'portal') {
                this.isGameStart = true;
                this.player.setAnimation(0, 'hoverboard', true);
                Emitter.emit(Events.GAME.PLAYER_READY);
            }
        });
    },

    onGameOver() {
        this.init();
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

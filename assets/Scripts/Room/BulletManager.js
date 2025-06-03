const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: cc.Prefab
    },

    onLoad() {
        this.registerEvent();
    },

    registerEvent() {
        Emitter.registerEvent(Events.PLAYER.SHOOT, this.spawnBullet, this);
    },

    spawnBullet(worldStartPos) {
        const localPos = this.node.convertToNodeSpaceAR(worldStartPos);
        const bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(localPos);
        this.node.addChild(bullet);

        cc.tween(bullet)
            .to(1, { x: cc.winSize.width / 2 + 300 })
            .call(() => bullet.destroy())
            .start();
    },

    onDestroy() {
        cc.log('onDestroy BulletManager')
        Emitter.removeEventsByTarget(this);
    }
});

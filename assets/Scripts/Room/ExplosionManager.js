const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    properties: {
        explosionPrefab: cc.Prefab
    },

    onLoad() {
        this.registerEvent();
    },

    registerEvent() {
        Emitter.registerEvent(Events.EFFECT.EXPLOSION, this.playExplosion, this);
    },

    playExplosion(worldPos) {
        const explosion = cc.instantiate(this.explosionPrefab);
        const localPos = this.node.convertToNodeSpaceAR(worldPos);
        explosion.setPosition(localPos);
        this.node.addChild(explosion);

        cc.tween(explosion)
            .delay(0.05)
            .to(0.5, { opacity: 0 })
            .call(() => {
                explosion.destroy();
            })
            .start();
    },

    onDestroy() {
        cc.log('onDestroy ExplosionManager')
        Emitter.removeEventsByTarget(this);
    }
});

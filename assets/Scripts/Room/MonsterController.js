const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    properties: {
        prefabDog: cc.Prefab,
        prefabDragon: cc.Prefab,
        spawnInterval: 3,
    },
    onLoad() {
        this.index = 1
        this.registerEvent()
    },
    spawnRandomMonster() {
        const prefabs = [this.prefabDog, this.prefabDragon]
        const random = Math.floor(Math.random() * 2);
        const monster = cc.instantiate(prefabs[random]);
        const startX = cc.winSize.width / 2 + 100;
        const positionY = [-330, -120, 90]
        const index = Math.floor(Math.random() * 3)
        const randomY = positionY[index]

        monster.setPosition(startX, randomY);
        this.node.addChild(monster);

        const mob = monster.getComponent('MonsterItem');
        let name = monster.getChildByName('Name').getComponent(cc.Label)
        name.string = `Dog ${this.index++}`
        mob.onSpawn();
        mob.onMove();
    },
    updateScore() {
        this.score++
    },
    onGameStart() {
        cc.log('start')
        this.schedule(this.spawnRandomMonster, this.spawnInterval);
    },
    onGameOver() {
        this.unschedule(this.spawnRandomMonster);
    },
    registerEvent() {
        Emitter.registerEvent(Events.GAME.OVER, this.onGameOver, this);
        Emitter.registerEvent(Events.GAME.START, this.onGameStart, this);
    },
    onDestroy() {
        this.unschedule(this.spawnRandomMonster);
        Emitter.removeEventsByTarget(this);

        cc.log('destroyed')
        this.node.children.forEach(child => {
            if (child.name.startsWith("Dog")) {
                child.destroy();
            }
        });
    }
});

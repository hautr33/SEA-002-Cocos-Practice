cc.Class({
    extends: cc.Component,

    properties: {
        prefabDog: cc.Prefab,
        spawnInterval: 3,
    },
    onLoad() {
        this.index = 1
        this.schedule(this.spawnRandomChar, this.spawnInterval);
    },
    spawnRandomChar() {
        const dog = cc.instantiate(this.prefabDog);
        const startX = cc.winSize.width + 100;
        const positionY = [-330, -130, 70]
        const index = Math.floor(Math.random() * 3)
        const randomY = positionY[index]

        dog.setPosition(startX, randomY);
        this.node.addChild(dog);

        const char = dog.getComponent('CharacterDog');
        let name = dog.getChildByName('Name').getComponent(cc.Label)
        name.string = `Dog ${this.index++}`
        char.onSpawn();
        char.onMove();
    },
    onDestroy() {
        this.unschedule(this.spawnRandomChar);

        cc.log('destroyed')
        this.node.children.forEach(child => {
            if (child.name.startsWith("Dog")) {
                child.destroy();
            }
        });
    }
});

const Emitter = require('Emitter');
const Events = require('EventKeys');

const MONSTER_Y_POSITIONS = [-330, -120, 90];
const SPAWN_DISTANCE_X = 100;

cc.Class({
    extends: cc.Component,

    properties: {
        monsterPrefabs: [cc.Prefab],
        _spawnInterval: 2,
    },

    onLoad() {
        this.index = 1;
        this.monsterList = [];
        this.registerEvent()
    },

    spawnRandomMonster() {
        const prefab = this.getRandomPrefab();
        const monster = cc.instantiate(prefab);
        const position = this.getRandomSpawnPosition();

        monster.setPosition(position);
        this.node.addChild(monster);

        this.initializeMonster(monster);
        this.monsterList.push(monster);
    },

    getRandomPrefab() {
        const randomIndex = Math.floor(Math.random() * this.monsterPrefabs.length);
        return this.monsterPrefabs[randomIndex];
    },

    getRandomSpawnPosition() {
        const randomY = MONSTER_Y_POSITIONS[Math.floor(Math.random() * MONSTER_Y_POSITIONS.length)];
        const startX = cc.winSize.width / 2 + SPAWN_DISTANCE_X;
        return cc.v2(startX, randomY);
    },

    initializeMonster(monster) {
        const nameLabel = monster.getChildByName('Name').getComponent(cc.Label);
        nameLabel.string = `Monster ${this.index++}`;

        const mob = monster.getComponent('MonsterItem');
        if (mob) {
            mob.setController(this);
            mob.onSpawn();
            mob.onMove();
        }
    },

    onGameStart() {
        this.isGameOver = false;
        this.currentInterval = this._spawnInterval;
        this.spawnNextMonster();
    },

    spawnNextMonster() {
        if (!this.isGameOver) {
            this.spawnRandomMonster();

            this.currentInterval = Math.max(this.currentInterval * 0.99, 1);
            this.scheduleOnce(() => {
                this.spawnNextMonster();
            }, this.currentInterval);
        }
    },

    onGameOver() {
        this.unschedule(this.spawnRandomMonster);
        this.isGameOver = true
        this.clearAllMonsters();
    },

    removeMonster(monsterNode) {
        this.monsterList = this.monsterList.filter(mon => mon !== monsterNode);
        if (monsterNode && monsterNode.isValid) monsterNode.destroy();
    },

    clearAllMonsters() {
        this.monsterList.forEach(monster => {
            if (monster && monster.isValid) monster.destroy();
        });
        this.monsterList = [];
    },

    registerEvent() {
        Emitter.registerEvent(Events.GAME.OVER, this.onGameOver, this);
        Emitter.registerEvent(Events.GAME.PLAYER_READY, this.onGameStart, this);
    },

    onDestroy() {
        cc.log('onDestroy MonsterController')
        this.unschedule(this.spawnRandomMonster);
        Emitter.removeEventsByTarget(this);
        this.clearAllMonsters();
    }
});

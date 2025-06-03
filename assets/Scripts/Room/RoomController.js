const Emitter = require('Emitter');
const Events = require('EventKeys');
const SceneConfig = require('SceneConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node,
        scoreTrigger: cc.Node,
        uiManager: require('UIManager'),
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.registerEvent();
        this.init();
    },

    init() {
        this.score = 0;
        this.scoreTrigger.x = this.player.x;
        this.uiManager.setupUI();
        this.uiManager.showStartBanner();
        this.uiManager.playOpeningEffects(this.startCountdown.bind(this));
    },

    registerEvent() {
        Emitter.registerEvent(Events.GAME.PLAYER_READY, this.uiManager.showGameUI, this.uiManager);
        Emitter.registerEvent(Events.GAME.OVER, this.onGameOver, this);
        Emitter.registerEvent(Events.GAME.SCORE, this.updateScore, this);
    },

    startCountdown() {
        this.uiManager.startCountdown(() => {
            this.uiManager.hideStartBanner();
            Emitter.emit(Events.GAME.START);
        });
    },

    updateScore(isTryAgain = false) {
        this.score = isTryAgain ? 0 : this.score + 1;
        this.uiManager.updateScore(this.score);
    },

    onGameOver() {
        this.node.stopAllActions();
        this.uiManager.hideGameUI();
        this.uiManager.displayGameOverBanner();
    },

    resetGame() {
        this.init();
        Emitter.emit(Events.GAME.RESET);
    },

    onSwitchScene(event, data) {
        if (data === 'Room') {
            this.resetGame();
        } else {
            SceneConfig.nextScene = data;
            Emitter.emit(Events.SOUND.PLAY, 'CLICK');
            cc.director.loadScene('Loading');
        }
    },

    onDestroy() {
        cc.log('onDestroy RoomController');
        Emitter.removeEventsByTarget(this);
    }
});

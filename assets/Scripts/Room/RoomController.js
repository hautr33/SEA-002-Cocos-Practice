const Emitter = require('Emitter');
const Events = require('EventKeys');
const SceneConfig = require('SceneConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        startBanner: cc.Node,
        gameOverBanner: cc.Node,
        userInterface: cc.Node,
        player: cc.Node,
        scoreTrigger: cc.Node,
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.registerEvent();
        this.init();
    },

    init() {
        this.score = 0;
        this.scoreTrigger.x = this.player.x;
        this.setupUI();
        this.showStartBanner()
        this.playOpeningEffects();
    },

    onSwitchScene(event, data) {
        if (data === 'Room') {
            this.resetGame()
        } else {
            SceneConfig.nextScene = data
            Emitter.emit(Events.SOUND.PLAY, 'CLICK');
            cc.director.loadScene('Loading');
        }
    },

    setupUI() {
        this.gameOverBanner.active = false;
        this.hideGameUI();
    },

    registerEvent() {
        Emitter.registerEvent(Events.GAME.PLAYER_READY, this.showGameUI, this);
        Emitter.registerEvent(Events.GAME.OVER, this.onGameOver, this);
        Emitter.registerEvent(Events.GAME.SCORE, this.updateScore, this);
    },

    playOpeningEffects() {
        this.animateWings();
        this.animateGlow();
        this.startCountdown();
    },

    animateWings() {
        const wingLeft = this.startBanner.getChildByName('WingLeft');
        const wingRight = this.startBanner.getChildByName('WingRight');
        const angle = wingLeft.angle;

        this.floatTween(wingLeft, angle, 5, 1);
        this.floatTween(wingRight, -angle, -5, 1);
    },

    floatTween(node, baseAngle, rotation, time) {
        cc.tween(node)
            .repeatForever(
                cc.tween()
                    .to(time, { angle: baseAngle + rotation }, { easing: 'sineInOut' })
                    .to(time, { angle: baseAngle - rotation }, { easing: 'sineInOut' })
            )
            .start();
    },

    animateGlow() {
        const glow = this.startBanner.getChildByName('WhiteGlow');

        cc.tween(glow)
            .repeatForever(
                cc.tween()
                    .to(1, { opacity: 255 }, { easing: 'sineOut' })
                    .to(1, { opacity: 0 }, { easing: 'sineIn' })
            )
            .start();
    },

    startCountdown() {
        const countdown = ['Battle Start', 'Battle Start', '3', '2', '1'];
        let index = 0;
        const label = this.startBanner.getChildByName('Label').getComponent(cc.Label);
        const shield = this.startBanner.getChildByName('Shield');

        cc.tween(this.node)
            .repeat(countdown.length,
                cc.tween()
                    .call(() => {
                        label.string = countdown[index];
                        label.fontSize = index < 2 ? 50 : 100;
                        shield.active = index >= 2;
                        index++;
                    })
                    .delay(1)
            )
            .call(() => {
                this.hideStartBanner();
                Emitter.emit(Events.GAME.START);
            })
            .start();
    },

    showStartBanner() {
        this.startBanner.active = true;
        this.startBanner.opacity = 255;
    },

    hideStartBanner() {
        this.startBanner.opacity = 255;
        cc.tween(this.startBanner)
            .to(0.5, { opacity: 0 })
            .call(() => {
                this.startBanner.active = false;
            })
            .start();
    },

    updateScore(isTryAgain = false) {
        if (isTryAgain) {
            this.score = 0;
        } else {
            this.score++;
        }
        const scoreNode = this.userInterface.getChildByName('Score');
        const label = scoreNode.getChildByName('Label').getComponent(cc.Label);
        label.string = this.score.toString()
    },

    onGameOver() {
        this.node.stopAllActions()
        this.hideGameUI()
        this.displayGameOverBanner();
    },

    displayGameOverBanner() {
        this.gameOverBanner.active = true;
        this.gameOverBanner.opacity = 0;
        const label = this.gameOverBanner.getChildByName('Score').getChildByName('Label').getComponent(cc.Label);
        label.string = this.score.toString();
        cc.tween(this.gameOverBanner)
            .to(1, { opacity: 255 })
            .start();
    },

    hideGameUI() {
        cc.tween(this.userInterface)
            .to(1, { opacity: 0 })
            .start();
        this.userInterface.active = false;
    },

    showGameUI() {
        this.userInterface.active = true;
        this.userInterface.opacity = 0;
        cc.tween(this.userInterface)
            .to(1, { opacity: 255 })
            .start();
    },

    resetGame() {
        this.init();
        this.updateScore(true)
    },

    onDestroy() {
        cc.log('onDestroy RoomController')
        Emitter.removeEventsByTarget(this);
    }
});

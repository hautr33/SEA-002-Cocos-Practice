const Emitter = require('Emitter');
const Events = require('EventKeys');
const SceneConfig = require('SceneConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        startBanner: cc.Node,
        gameOverBanner: cc.Node,
        scoreNode: cc.Node,
        buttonUp: cc.Node,
        buttonDown: cc.Node,
        buttonExit: cc.Node,
    },
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.registerEvent()
        this.score = 0;
        this.scoreNode.active = false;
        this.gameOverBanner.active = false;
        this.hideAllButton();
        this.startWingFloat();
        this.startGlowEffect();
        this.startCountdown();
    },
    onSwitchScene(event, data) {
        SceneConfig.nextScene = data
        Emitter.emit(Events.SOUND.PLAY, 'CLICK');
        cc.director.loadScene('Loading');
    },
    startWingFloat() {
        const rotation = 5;
        const time = 1
        let wingLeft = this.startBanner.getChildByName('WingLeft');
        const angle = wingLeft.angle
        let wingRight = this.startBanner.getChildByName('WingRight');

        cc.tween(wingLeft)
            .repeatForever(
                cc.tween()
                    .to(time, { angle: angle + rotation }, { easing: 'sineInOut' })
                    .to(time, { angle: angle - rotation }, { easing: 'sineInOut' })
            )
            .start();

        cc.tween(wingRight)
            .repeatForever(
                cc.tween()
                    .to(time, { angle: -angle - rotation }, { easing: 'sineInOut' })
                    .to(time, { angle: -angle + rotation }, { easing: 'sineInOut' })
            )
            .start();
    },
    startGlowEffect() {
        let whiteGlow = this.startBanner.getChildByName('WhiteGlow');

        cc.tween(whiteGlow)
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

        let label = this.startBanner.getChildByName('Label').getComponent(cc.Label);
        let shield = this.startBanner.getChildByName('Shield');

        cc.tween(this.node)
            .repeat(countdown.length,
                cc.tween()
                    .call(() => {
                        if (index < 2)
                            label.fontSize = 50
                        if (index === 2) {
                            label.fontSize = 100
                            shield.active = true
                        }

                        label.string = countdown[index];
                        index++;
                    })
                    .delay(1)
            )
            .call(() => {
                this.scoreNode.active = true;
                this.scoreNode.opacity = 0;
                cc.tween(this.startBanner)
                    .to(0.5, { opacity: 0 })
                    .call(() => {
                        this.startBanner.active = false;
                        this.startBanner.opacity = 255;
                        Emitter.emit(Events.GAME.START);
                    })
                    .start();
                cc.tween(this.scoreNode)
                    .to(1, { opacity: 255 })
                    .start();

                this.showAllButton()
            })
            .start();
    },
    updateScore() {
        this.score++
        let label = this.scoreNode.getChildByName('Label').getComponent(cc.Label);
        label.string = this.score.toString()
    },
    onGameOver() {
        this.node.stopAllActions()
        this.hideAllButton()
        this.scoreNode.active = false;
        this.gameOverBanner.active = true;
        this.gameOverBanner.opacity = 0;
        let label = this.gameOverBanner.getChildByName('Score').getChildByName('Label').getComponent(cc.Label)
        label.string = this.score
        cc.tween(this.gameOverBanner)
            .to(1, { opacity: 255 })
            .start();
    },
    hideAllButton() {
        this.buttonUp.opacity = 0;
        this.buttonDown.opacity = 0;
        this.buttonExit.opacity = 0;
        this.buttonUp.active = false
        this.buttonDown.active = false
        this.buttonExit.active = false
    },
    showAllButton() {
        this.buttonUp.active = true
        this.buttonDown.active = true
        this.buttonExit.active = true
        cc.tween(this.buttonUp)
            .to(1, { opacity: 255 })
            .start();
        cc.tween(this.buttonDown)
            .to(1, { opacity: 255 })
            .start();
        cc.tween(this.buttonExit)
            .to(1, { opacity: 255 })
            .start();
    },
    registerEvent() {
        Emitter.registerEvent(Events.GAME.OVER, this.onGameOver, this);
        Emitter.registerEvent(Events.GAME.SCORE, this.updateScore, this);
    },
    onDestroy() {
        cc.log('room destroy')
        Emitter.removeEventsByTarget(this);
    }
});

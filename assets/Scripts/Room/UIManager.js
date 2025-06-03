const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    properties: {
        startBanner: cc.Node,
        gameOverBanner: cc.Node,
        userInterface: cc.Node,
    },

    setupUI() {
        this.gameOverBanner.active = false;
        this.hideGameUI();
    },

    playOpeningEffects(callback) {
        this.animateWings();
        this.animateGlow();
        callback && callback();
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

    startCountdown(onFinish) {
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
            .call(onFinish)
            .start();
    },

    showStartBanner() {
        this.startBanner.active = true;
        this.startBanner.opacity = 255;
    },

    hideStartBanner() {
        cc.tween(this.startBanner)
            .to(0.5, { opacity: 0 })
            .call(() => { this.startBanner.active = false; })
            .start();
    },

    updateScore(score) {
        const scoreNode = this.userInterface.getChildByName('Score');
        const label = scoreNode.getChildByName('Label').getComponent(cc.Label);
        label.string = score.toString();
    },

    displayGameOverBanner() {
        this.gameOverBanner.active = true;
        this.gameOverBanner.opacity = 0;
        Emitter.emit(Events.GAME.SHOW_FINAL_SCORE);
        cc.tween(this.gameOverBanner).to(1, { opacity: 255 }).start();
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

    onDestroy(){
        cc.log('onDestroy UIManager');
    }
});

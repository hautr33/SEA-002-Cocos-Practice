const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
        finalScoreLabel: cc.Label
    },

    onLoad() {
        this.score = 0;
        this.registerEvent();
    },

    registerEvent() {
        Emitter.registerEvent(Events.GAME.SCORE, this.addScore, this);
        Emitter.registerEvent(Events.GAME.RESET, this.resetScore, this);
        Emitter.registerEvent(Events.GAME.SHOW_FINAL_SCORE, this.showFinalScore, this);
    },


    addScore() {
        this.score++;
        this.updateLabel();
    },

    resetScore() {
        this.score = 0;
        this.updateLabel();
    },

    showFinalScore() {
        if (this.finalScoreLabel) {
            this.finalScoreLabel.string = this.score.toString();
        }
    },

    updateLabel() {
        this.scoreLabel.string = this.score.toString();
    },

    onDestroy() {
        cc.log('onDestroy ScoreManager');
        Emitter.removeEventsByTarget(this);
    }
});

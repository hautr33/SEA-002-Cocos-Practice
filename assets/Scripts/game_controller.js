cc.Class({
    extends: cc.Component,

    properties: {
        resultPopup: cc.Node,
        resultPopupLabel: cc.Label,
        totalResultLabel: cc.Label,
        rockButton: cc.Button,
        paperButton: cc.Button,
        scissorsButton: cc.Button,
        soundController: cc.Component
    },
    onLoad() {
        this.win = 0;
        this.draw = 0;
        this.lose = 0;
    },
    onChoiceClick(event, data) {
        this.rockButton.interactable = false;
        this.paperButton.interactable = false;
        this.scissorsButton.interactable = false;

        const rockButtonBackground = this.rockButton.node.getChildByName('Background');
        const paperButtonBackground = this.paperButton.node.getChildByName('Background');
        const scissorsButtonBackground = this.scissorsButton.node.getChildByName('Background');

        rockButtonBackground.color = cc.Color.GRAY;
        paperButtonBackground.color = cc.Color.GRAY;
        scissorsButtonBackground.color = cc.Color.GRAY;

        const playerChoice = data;
        const computerChoice = ['Rock', 'Paper', 'Scissors'][Math.floor(Math.random() * 3)];
        const result = this.checkGameResult(playerChoice, computerChoice);

        if (result === 'Win')
            this.soundController.getComponent('sound_controller').playWinSound()

        this.resultPopup.active = true;
        this.resultPopupLabel.string = `You: ${playerChoice}\nComputer: ${computerChoice}\nResult: ${result}`;
        this.totalResultLabel.string = `Win: ${this.win}  |  Draw: ${this.draw}  |  Lose: ${this.lose}`

        this.scheduleOnce(() => {
            this.resultPopup.active = false;
            this.rockButton.interactable = true;
            this.paperButton.interactable = true;
            this.scissorsButton.interactable = true;
            rockButtonBackground.color = cc.Color.WHITE;
            paperButtonBackground.color = cc.Color.WHITE;
            scissorsButtonBackground.color = cc.Color.WHITE;
        }, 2);
    },
    checkGameResult(player, computer) {
        if (player === computer) {
            this.draw++
            return 'Draw'
        }
        if (player === 'Rock' && computer == 'Paper') {
            this.lose++
            return 'Lose'
        }
        if (player === 'Paper' && computer == 'Scissors') {
            this.lose++
            return 'Lose'
        }
        if (player === 'Scissors' && computer == 'Rock') {
            this.lose++
            return 'Lose'
        }
        this.win++
        return 'Win'
    },
});
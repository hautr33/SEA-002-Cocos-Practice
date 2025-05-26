cc.Class({
    extends: cc.Component,

    properties: {
        playerCellPrefab: cc.Prefab
    },

    showPlayer(players) {
        this.node.removeAllChildren();

        const startY = -50;
        const spacingY = 100;
        for (let index = 0; index < players.length; index++) {
            let cell = cc.instantiate(this.playerCellPrefab);
            cell.y = startY - index * (spacingY + cell.height)
            let labelRank = cell.getChildByName('LabelRank').getComponent(cc.Label)
            let labelName = cell.getChildByName('LabelName').getComponent(cc.Label)
            let labelScore = cell.getChildByName('LabelScore').getComponent(cc.Label)

            labelRank.string = (index + 1).toString();
            labelName.string = players[index].name;
            labelScore.string = players[index].score.toString();
            this.node.addChild(cell)
        }
        console.log(this.node)
    }
});

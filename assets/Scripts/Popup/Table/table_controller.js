cc.Class({
    extends: cc.Component,

    properties: {
        playerCellPrefab: cc.Prefab
    },

    showPlayer(players) {
        this.node.removeAllChildren();
        const startY = -30;
        const spacingY = 75;
        let height = 0
        for (let index = 0; index < players.length; index++) {
            let cell = cc.instantiate(this.playerCellPrefab);
            cell.y = startY - index * (spacingY + cell.height)
            let rank = index + 1;
            if(rank === 1){
                cell.getChildByName('Rank_1').active = true
            }else if(rank === 2){
                cell.getChildByName('Rank_2').active = true
            }else if(rank === 3){
                cell.getChildByName('Rank_3').active = true
            }else{
                cell.getChildByName('LabelRank').active = true
                let labelRank = cell.getChildByName('LabelRank').getComponent(cc.Label)
                labelRank.string = (index + 1).toString();
            }
            let labelName = cell.getChildByName('LabelName').getComponent(cc.Label)
            let labelScore = cell.getChildByName('LabelScore').getComponent(cc.Label)

            labelName.string = players[index].name;
            labelScore.string = players[index].score.toString();
            height = Math.abs(cell.y) + 50;
            this.node.addChild(cell)
        }
        this.node.height = height
        let parent = this.node.parent
        parent.height = height
    }
});

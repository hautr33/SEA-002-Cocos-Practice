cc.Class({
    extends: require('popup_item'),

    properties: {
        tableController: cc.Node,
    },
    show() {
        this._super();
        let players = [
            { name: "Player A", score: 1200 },
            { name: "Player B", score: 1150 },
            { name: "Player C", score: 1100 },
            { name: "Player D", score: 1080 },
            { name: "Player E", score: 1050 },
            { name: "Player F", score: 1030 },
            { name: "Player G", score: 1010 },
            { name: "Player H", score: 990 },
            { name: "Player I", score: 970 },
            { name: "Player J", score: 950 },
            { name: "Player K", score: 930 },
            { name: "Player L", score: 910 },
            { name: "Player M", score: 890 },
            { name: "Player N", score: 870 },
            { name: "Player O", score: 850 },
            { name: "Player P", score: 830 },
            { name: "Player Q", score: 810 },
            { name: "Player R", score: 790 },
            { name: "Player S", score: 770 },
            { name: "Player T", score: 750 }
        ];
        this.tableController.getComponent('table_controller').showPlayer(players)
        console.log("Show Ranking")
    },
    hide() {
        this._super();
        console.log("Hide Ranking")
    }
});

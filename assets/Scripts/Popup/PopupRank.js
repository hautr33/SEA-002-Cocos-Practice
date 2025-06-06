const Emitter = require('Emitter');
const Events = require('EventKeys');

cc.Class({
    extends: require('PopupItem'),
    onLoad() {
        this.scrollView = this.node.getChildByName('ScrollView').getComponent(cc.ScrollView);
        this.node.active = false
    },
    update() {
        this.restrictScrollY()
    },
    restrictScrollY() {
        const content = this.scrollView.content;
        const posY = content.y;
        const viewHeight = this.scrollView.node.height;
        const contentHeight = content.height;

        if (posY < 0) {
            content.y = 0;
            return;
        }

        const maxY = contentHeight - viewHeight;
        if (posY > maxY) {
            content.y = maxY;
        }
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
        Emitter.emit(Events.TABLE.SHOW, players);
        this.scrollView.scrollToTop(0);
    },
    hide() {
        this._super();
    }
});
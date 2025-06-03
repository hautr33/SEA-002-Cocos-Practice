cc.Class({
    extends: cc.Component,

    properties: {
        character: sp.Skeleton,      // Gán sp.Skeleton trong Editor
        layout: cc.Node,             // Node chứa các button
        buttonPrefab: cc.Prefab      // Prefab button có Label + Button component
    },

    onLoad() {
        this.animList = this.character.skeletonData.getRuntimeData().animations;
        this.loadAllAnimations();

    },

    loadAllAnimations() {
        let startY = -100;
        const spacingY = 150;
        let index = 0;


        for (let index = 0; index < this.animList.length; index++) {

            const button = cc.instantiate(this.buttonPrefab);
            const label = button.getComponentInChildren(cc.Label);
            label.string = this.animList[index].name;

            const buttonComp = button.getComponent(cc.Button);
            if (buttonComp) {
                buttonComp.clickEvents.push(this.createClickEvent(this.animList[index].name));
            }

            button.y = startY - index * spacingY;
            button.x = 0;
            this.layout.height = Math.abs(startY - index * spacingY) + 50;
            this.layout.addChild(button);
        }

    },

    createClickEvent(animationName) {
        const clickEvent = new cc.Component.EventHandler();
        clickEvent.target = this.node;                    // node gắn script này
        clickEvent.component = "Homework2Controller";     // chính xác tên script
        clickEvent.handler = "onClickAnimation";
        clickEvent.customEventData = animationName;
        return clickEvent;
    },

    onClickAnimation(event, animName) {
        cc.log("▶️ Play animation:", animName);
        this.character.setAnimation(0, animName, true); // animName phải là string tên animation thật
    }
});

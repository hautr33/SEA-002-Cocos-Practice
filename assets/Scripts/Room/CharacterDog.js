cc.Class({
    extends: require('CharacterItem'),
    properties: {
        labelName: cc.Label
    },
    onSpawn() {
        this.node.opacity = 255;
        this.node.scale = 1;
        cc.log("Quái vừa spawn:", this.labelName.string);
    },
    // onMove() {
    //     const targetX = -cc.winSize.width / 2 - 100;
    //     cc.tween(this.node)
    //         .to((this.node.x - targetX) / this.speed, { x: targetX })
    //         .call(() => {
    //             cc.log("Quái đã chết:", this.labelName.string);
    //             this.onDie()
    //         })
    //         .start();
    // },
    onMove() {
    const targetX = -cc.winSize.width / 2 - 100;
    const totalDuration = (this.node.x - targetX) / this.speed;
    const startY = this.node.y;

    // Tween nhún (y)
    cc.tween(this.node)
        .repeatForever(
            cc.tween()
                .to(0.25, { y: startY + 10 }, { easing: 'sineOut' })
                .to(0.25, { y: startY }, { easing: 'sineIn' })
        )
        .start();

    // Tween chạy từ phải sang trái (x)
    cc.tween(this.node)
        .to(totalDuration, { x: targetX })
        .call(() => {
            cc.log("Quái đã chết:", this.labelName.string);
            this.onDie();
        })
        .start();
}


});

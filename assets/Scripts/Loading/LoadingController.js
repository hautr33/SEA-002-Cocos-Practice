const SceneConfig = require('SceneConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        background_1: cc.Node,
        background_2: cc.Node,
        background_3: cc.Node,
        labelStatus: cc.Label,
        labelLoading: cc.Label,
        progressBar: cc.Node
    },

    onLoad() {
        this.background_1.active = true
        this.background_2.active = true
        this.background_3.active = true

        this.background_2.opacity = 0
        this.background_3.opacity = 0

        this.startTweenBackground();
        this.startLoadingLabel();
        this.preloadScene(SceneConfig.nextScene)
    },
    startTweenBackground() {
        this.background_2.color = new cc.Color(250, 250, 250);

        cc.tween(this.background_2)
            .to(0.5, { opacity: 255 })
            .start();

        cc.tween(this.background_3)
            .repeatForever(
                cc.tween()
                    .delay(2)
                    .to(1, { opacity: 255 })
                    .delay(0)
                    .to(1, { opacity: 0 })
            )
            .start();
    },
    startLoadingLabel() {
        const frames = ['Loading . . .', 'Loading', 'Loading .', 'Loading . .'];
        let index = 0;

        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .call(() => {
                        this.labelLoading.string = frames[index];
                        index = (index + 1) % frames.length;
                    })
                    .delay(0.5)
            )
            .start();
    },
    preloadScene(name) {
        if (name) {
            cc.director.preloadScene(name, (completedCount, totalCount, item) => {
                this.labelStatus.string = `${Math.round(completedCount * 100 / totalCount)}% (${completedCount}/${totalCount})`
                this.progressBar.width = 1400 * completedCount / totalCount
            }, () => {
                SceneConfig.nextScene = null
                cc.director.loadScene(name);
            });
        }
    },
});

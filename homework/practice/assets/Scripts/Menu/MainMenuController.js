cc.Class({
    extends: cc.Component,

    properties: {
        soundController: require('SoundController'),
        mainLabel: cc.Node,
        homework1: cc.Node,
        iconBgmOn: cc.Node,
        iconBgmOff: cc.Node,
        sliderBackground: cc.Node,
        sliderTrack: cc.Node,
        sliderThumb: cc.Node,
    },
    onLoad(){
        this.isBgmOn = false;
        this.sliderThumb.on(cc.Node.EventType.TOUCH_MOVE, this.onChangeVolume, this)
        this.iconBgmOff.active = true;
        this.iconBgmOn.active = false;
        this.show(this.mainLabel);
    },
    onHomework1Click(){
        this.show(this.homework1)
    },
    hideAll(){
        this.mainLabel.active = false;
        this.homework1.active = false;
    },
    show(menu){
        this.hideAll();
        if(menu)
           menu.active = true;
        else
           this.mainLabel.active = true;
    },
    onBgmClick(event, data) {
        console.log(data)
        if (data === 'false') {
            this.soundController.setMusiceOn(false);
            this.iconBgmOff.active = true;
            this.iconBgmOn.active = false;
            this.isBgmOn = false;
        } else if (data === 'true') {
            this.soundController.setMusiceOn(true);
            this.iconBgmOff.active = false;
            this.iconBgmOn.active = true;
            this.isBgmOn = true;
        }
    },
    onChangeVolume(event) {
        const delta = event.getDelta();
        let newX = this.sliderThumb.x + delta.x

        if (newX > this.sliderBackground.x + this.sliderBackground.width)
            newX = this.sliderBackground.x + this.sliderBackground.width
        if (newX < this.sliderBackground.x)
            newX = this.sliderBackground.x

        this.sliderThumb.x = newX;
        this.sliderTrack.width = newX - this.sliderBackground.x
        const percent = (newX - this.sliderBackground.x) / this.sliderBackground.width;

        this.soundController.setVolume(percent)
    }
});

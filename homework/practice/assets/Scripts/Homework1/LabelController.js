cc.Class({
    extends: cc.Component,

    properties: {
        blinkButtonLabel: cc.Label,
        changeColorButtonLabel: cc.Label,
        changeFontButtonLabel: cc.Label,
        changeSizeButtonLabel: cc.Label,
        changeOutlineButtonLabel: cc.Label,
        counterLabel: cc.Label,
        font_1: cc.Font,
        font_2: cc.Font
    },
    onLoad() {
        this.counter = 0;
        this.colorCounter = 0;

        this.isBlinking = false;
        this.opacityDirection = -1;
        this.counterLabel.node.opacity = 255;

        this.initLabel();
        this.updateLabel();
    },
    updateLabel() {
        this.counterLabel.string = 'Counter: ' + this.counter;
    },
    onCounterClick() {
        this.counter++;
        this.updateLabel();
    },
    onChangeColorClick() {
        const colors = [
            { name: "Black", color: cc.Color.BLACK },
            { name: "Blue", color: cc.Color.BLUE },
            { name: "Cyan", color: cc.Color.CYAN },
            { name: "Magenta", color: cc.Color.MAGENTA },
            { name: "Orange", color: cc.Color.ORANGE },
            { name: "Yellow", color: cc.Color.YELLOW },
            { name: "Red", color: cc.Color.RED }
        ];
        const index = this.colorCounter % colors.length;
        this.counterLabel.node.color = colors[index].color;
        this.changeColorButtonLabel.string = 'Color: ' + colors[index].name;
        this.colorCounter++
    },
    onBlinkClick() {
        if (this.isBlinking) {
            this.isBlinking = false;
            this.counterLabel.node.opacity = 255;
            this.blinkButtonLabel.string = "Blink: Off";
        } else {
            this.isBlinking = true;
            this.opacityDirection = -1;
            this.counterLabel.node.opacity = 255;
            this.blinkButtonLabel.string = "Blink: On";
        }
    },
    onFontClick() {
        if (this.counterLabel.font === this.font_1) {
            this.counterLabel.font = this.font_2
            this.changeFontButtonLabel.string = 'Font: JosefinSans'
        }
        else {
            this.counterLabel.font = this.font_1
            this.changeFontButtonLabel.string = 'Font: Alata'
        }
    },
    onSizeClick() {
        if (this.counterLabel.fontSize === 24) {
            this.counterLabel.fontSize = 36
            this.changeSizeButtonLabel.string = 'Size: 36'
        } else if (this.counterLabel.fontSize === 36) {
            this.counterLabel.fontSize = 48
            this.changeSizeButtonLabel.string = 'Size: 48'
        } else {
            this.counterLabel.fontSize = 24
            this.changeSizeButtonLabel.string = 'Size: 24'
        }
    },
    onOutlineClick(){
        let outline = this.counterLabel.node.getComponent(cc.LabelOutline);
        if (outline) {
            this.counterLabel.node.removeComponent(cc.LabelOutline);
            this.changeOutlineButtonLabel.string = "Outline: Off";
        } else {
            outline = this.counterLabel.addComponent(cc.LabelOutline);
            outline.color = cc.Color.BLACK;
            outline.width = 2;
            this.changeOutlineButtonLabel.string = "Outline: On";
        }
    },
    initLabel() {
        this.counterLabel.string = '';
        this.counterLabel.fontSize = 24;
        this.counterLabel.lineHeight = 36;
        this.counterLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER
        this.counterLabel.verticalAlign = cc.Label.VerticalAlign.CENTER
        this.counterLabel.node.color = cc.Color.RED
        this.counterLabel.font = this.font_1
    },
    update(dt) {
        if (!this.isBlinking)
            return

        this.counterLabel.node.opacity += dt * this.opacityDirection * 200;
        if (this.counterLabel.node.opacity <= 0) {
            this.counterLabel.node.opacity = 0;
            this.opacityDirection = 1;
        } else if (this.counterLabel.node.opacity >= 255) {
            this.counterLabel.node.opacity = 255;
            this.opacityDirection = -1;
        }
    },
});
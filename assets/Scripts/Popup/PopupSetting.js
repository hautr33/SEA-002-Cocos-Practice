cc.Class({
    extends: require('PopupItem'),

    properties: {
        soundController: require('SoundController'),
        bgmToggle: cc.Toggle,
        sliderBackground: cc.Node,
        sliderTrack: cc.Node,
    },
    onSliderClick(slider, data){
        this.sliderTrack.width = Math.floor(this.sliderBackground.width * slider.progress)
        this.soundController.setVolume(slider.progress)
    },
    onBgmToggleClick(toggle, data) {
        if (toggle.isChecked) {
            this.soundController.setMusiceOn(true)
        } else {
            this.soundController.setMusiceOn(false)
        }
    },
    onSfxToggleClick(toggle, data) {
        this.soundController.setEffectOn(toggle.isChecked)
    }
});
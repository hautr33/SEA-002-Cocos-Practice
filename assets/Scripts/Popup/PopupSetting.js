cc.Class({
    extends: require('PopupItem'),

    properties: {
        soundController: require('SoundController'),
        bgmToggle: cc.Toggle
    },
    onBgmToggleClick(toggle, data) {
        console.log(toggle.isChecked)
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
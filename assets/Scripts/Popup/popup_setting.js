cc.Class({
    extends: require('popup_item'),

    properties:{
        soundController: require('lobby_sound_controller'),
        bgmToggle: cc.Toggle
    },
    onBgmToggleClick(toggle, data){
        console.log(toggle.isChecked)
        if(toggle.isChecked){
            this.soundController.setMusiceOn(true)
        }else{
            this.soundController.setMusiceOn(false)
        }
    }
});

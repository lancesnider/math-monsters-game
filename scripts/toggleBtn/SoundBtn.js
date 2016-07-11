
private var toggleScript:ToggleBtn;

function Start(){
	
	toggleScript = gameObject.GetComponent(ToggleBtn) as ToggleBtn;
	
	if(PlayerPrefs.HasKey("soundOn")){
	
		var soundOnOff:int = PlayerPrefs.GetInt("soundOn");
		if(soundOnOff == 0){
			//PlayerPrefs.SetInt("soundOn", 0);
			toggleSound(false);
			toggleScript.setBtn(false);
		}else{
			//PlayerPrefs.SetInt("soundOn", 1);
			toggleSound(true);
			toggleScript.setBtn(true);
		}
	}else{
		toggleSound(true);
		toggleScript.setBtn(true);
	}
	
	

}

function toggleSound (onOff:boolean) {

	GVars.soundOnOff(onOff);

	if(onOff){
		PlayerPrefs.SetInt("soundOn", 1);
	}else{
		PlayerPrefs.SetInt("soundOn", 0);
	}

}
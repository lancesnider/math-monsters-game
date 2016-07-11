#pragma strict


public var isOn:boolean;
public var targetObject:GameObject;
public var functionName:String;

//private var spriteScript:tk2dSprite;

function Start()
{
	
	//spriteScript = gameObject.GetComponent(tk2dSprite) as tk2dSprite;
	
	//set initial state
	//if(!isOn)setBtnState(false);
	
}

public function toggleBtnState():void 
{

	if(isOn){
	
		setBtnState(false);
	
	}else{
	
		setBtnState(true);
	
	}

}

public function setBtnState(onOff:boolean):void{
	
	setBtn(onOff);
	
	if (targetObject){
	
		targetObject.SendMessage(functionName, onOff);
		
	}
	
}

public function setBtn(onOff:boolean):void{
	
	var spriteScript:tk2dSprite = gameObject.GetComponent(tk2dSprite) as tk2dSprite;
	
	if(onOff){
		isOn = true;
		spriteScript.color = Color.white;
	}else{
		isOn = false;
		spriteScript.color = Color(.6,.6,.6,1);
	}
	
}

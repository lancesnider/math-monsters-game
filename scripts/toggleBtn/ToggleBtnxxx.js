#pragma strict

public var btnOn:boolean;
public var btnOnGO:GameObject;
public var btnOffGO:GameObject;

//get current button state
public function btnState():boolean
{
	
	return btnOn;
	
}

//change the state of the button
public function toggleBtn():boolean
{

	if(btnOn){
	
		btnOn = false;
		
	}else{
	
		btnOn = true;
		
	}
	
	changeBtnState();
	
	return btnOn;

}

//change the visual appearance of the button based on on off
private function changeBtnState():void
{
	
	if(btnOn){
	
	}else{
	
	}
	
}
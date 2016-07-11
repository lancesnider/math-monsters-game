#pragma strict

var curtainL:GameObject;
var curtainR:GameObject;

var curtainTime:Number = 1; 

var brain:GameObject;


private var curtainLStartX:int;
private var curtainRStartX:int;

var screenW:int = 1024;
private var halfScreenW:int;


function Start(){
	
	//screenW = Screen.width;
	//screenH = Screen.height;
	
	halfScreenW = screenW/2;
	
	curtainLStartX = curtainL.transform.position.x;
	curtainRStartX = curtainR.transform.position.x;
	
	//openCloseCurtains(false);
	
}

function openCloseCurtains(openC:boolean):void{

	var toLX:int;
	var toRX:int;
	
	if(openC){
	
		toLX = curtainLStartX;
		toRX = curtainRStartX;
		iTween.MoveTo(curtainL,{"x":toLX, "time":curtainTime, "easeType":"easeInQuint", "onComplete":"curtainIsOpen", "onCompleteTarget":brain});
		iTween.MoveTo(curtainR,{"x":toRX, "time":curtainTime, "easeType":"easeInQuint"});
		
	}else{
	
		toLX = curtainLStartX + halfScreenW;
		toRX = curtainRStartX - halfScreenW;
		iTween.MoveTo(curtainL,{"x":toLX, "time":curtainTime, "easeType":"easeOutQuint", "onComplete":"curtainIsClosed", "onCompleteTarget":brain});
		iTween.MoveTo(curtainR,{"x":toRX, "time":curtainTime, "easeType":"easeOutQuint"});
		
	}
	
	
}
#pragma strict

var thisNum:int = 0;

var draggable:boolean; 

//sounds
var bounceSound:AudioClip;

private var stageY:Number;
private var groundY:Number;

var shadow:Transform;
private var shadowMaxHeight:int = 100;
private var shadowY:Number;

private var thisGO:GameObject;
private var thisTransform:Transform;
private var eyeScript:EyeMovement;

private var startPos:Vector3;


//audio
//private var AudioSource1:AudioSource;
var audioNumber:AudioClip;
var audioNumberX10:AudioClip;
var audioNumberX100:AudioClip;
var audioAnd:AudioClip;

function Awake(){
	//define vars
	thisGO = gameObject;
	thisTransform = thisGO.transform;
	eyeScript = thisGO.GetComponent(EyeMovement) as EyeMovement;
	
	shadowY = shadow.localPosition.y;
	
}

function getThisNum():int{
	
	return thisNum;
	
}

function destroyMe():void{
	Destroy(thisGO);
}

function getStartPos():Vector3{
	return startPos;
}

function setStartPos(pos:Vector3, getStageY:int, getGroundY:int):void{
	startPos = pos;
	groundY = getGroundY;
	//startPos.y = getShadowY();
	//groundY = getShadowY();
	//print(thisTransform.position.x);
	stageY = getStageY;
}

function setProperties(){

	//set ground and stage heights
	
}

function idle(){
	
}

function jump(){
	if(thisNum != 7){
		animation.Play("jump01");
	}else{
		animation.Play("jump07");
	}
}

function speak(){
	
}



function pickedUp(){
	
	eyeScript.toggleActive(true);
	
}

function putDown(){
	eyeScript.toggleActive(false);
}

function celebrate(){
	
}

function setDraggagle(isDraggable:boolean):void{
	draggable = isDraggable;
}

function clickChar():boolean{//return whether it's draggable or not
		
	makeSound(audioNumber);
	
		
	if(!draggable){
	
		jump();
		
		return false;
	
	}
	
	return true;
	
}

//Audio
private var muteAudio:int;

private function waitToPlayAnotherSound(){
	
	muteAudio = muteAudio + 1;
	yield WaitForSeconds(.5);
	muteAudio = muteAudio - 1;
	
}

function makeSound(audioToPlay:AudioClip){

	//!!enable this line to make audio work
	if(GVars.soundOn && muteAudio == 0){
		audio.PlayOneShot(audioToPlay);
		waitToPlayAnotherSound();
	}
}

function playBounceSound(){
	makeSound(bounceSound);
}

function isDragging(){
	
	sizeShadow();
	
}

function landed(){
	
	shadow.localScale = Vector3(1,1,1);
	shadow.localPosition.y = shadowY;
	
}

function sizeShadow(){
	
	//determine how high of closest ground
	var thisH:Number = thisTransform.position.y;
	var floorY:Number = returnFloorH(thisH);
	var heightOffFloor:Number = thisH - floorY;
	
	if(heightOffFloor > -1 && heightOffFloor < shadowMaxHeight){
		var shadowScale:Number = 1 - heightOffFloor/shadowMaxHeight;
		shadow.localScale = Vector3(shadowScale,shadowScale,1);
		shadow.localPosition.y = shadowY - heightOffFloor;
	}else{
		shadow.localScale = Vector3(0,0,1);
	}
	
}

function returnFloorH(thisH:Number):Number{

	if(thisH > stageY - 1){
		return stageY;
	}else if(thisH > groundY - 1){
	
		var testEx:Number = getShadowY();
		//var thisX:Number = thisTransform.position.x - 512;
		//var testEx:Number = .00005 * (thisX * thisX) + groundY;
		
		return testEx;
		//return groundY;
	}
	
	return -1000;

}

function getShadowY():Number{
	
	var thisX:Number = thisTransform.position.x - 512;
	var shadY:Number = .00007 * (thisX * thisX) + groundY;
	
	return shadY;
	
}
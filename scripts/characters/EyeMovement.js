#pragma strict

var isActive:boolean;
var iris:GameObject;
var moveDistanceMin:Number = 0;
private var moveDistanceMinCurrent:float;
var moveDistanceMax:Number = 16;
var timeDelayMin:Number = .5;
var timeDelayMax:Number = 2;
private var timeDelayMaxCurrent:Number;
private var thisGO:GameObject;

private var staring:boolean;
private var irisT:Transform;
private var eyeStartX:Number;
private var eyeStartY:Number;
private var rangeX1:float;
private var rangeX2:float;
private var rangeY1:float;
private var rangeY2:float;
private var rangeY2current:float;

private var eyeStartPos:Vector3;
private var prevMousePos:Vector2;

private var yeilds:int = 0;

function Start () {
	
	thisGO = gameObject;
	
	//get the eye's starting position
	irisT = iris.transform;
	eyeStartPos = irisT.localPosition;
	rangeX1 = eyeStartPos.x - moveDistanceMax;
	rangeX2 = eyeStartPos.x + moveDistanceMax;
	rangeY1 = eyeStartPos.y - moveDistanceMax;
	rangeY2 = eyeStartPos.y + moveDistanceMax;
	rangeY2current = rangeY2;
	
	moveDistanceMinCurrent = moveDistanceMin;
	timeDelayMaxCurrent = timeDelayMax;
	
	//toggleActive(true);//testing 
	
	moveEye();
	
}

function wait(){
	
	//get random time and wait
	var waitMin:float = timeDelayMin * 10;
	var waitMax:float = timeDelayMaxCurrent *10;
	var timeToWait:Number = Random.Range(waitMin, waitMax)/10;
	
	yeilds++;
	if(!staring && yeilds == 1)yield WaitForSeconds(timeToWait);
	
	yeilds--;
	
	if(!staring && yeilds < 1)moveEye();
	
}

function moveEye(){
	
	//get random distance/angle
	var randomDistance:Number = Random.Range(moveDistanceMinCurrent, moveDistanceMax);
	var randomNewPositionFar:Vector3 = Vector3( Random.Range(rangeX1, rangeX2) , Random.Range(rangeY1, rangeY2current) , -1);
	var randomNewPosition:Vector3 = Vector3.MoveTowards(eyeStartPos, randomNewPositionFar, randomDistance/10);
	
	iTween.MoveTo(iris, {"name":"irisTween", "position":randomNewPosition, "time":.3, "islocal":true} );
	
	if(!staring)wait();

}

function stare(mousePos:Vector2){
	
	if(!isActive){
		staring = true;
		iTween.Stop(iris);
		
		//print((transform.position * 0.7327864) + " " + mousePos);
		
		var newPositionFar:Vector3 = Vector3( -transform.position.x + mousePos.x, -transform.position.y + mousePos.y, -1);
		
		irisT.localPosition = Vector3.MoveTowards(eyeStartPos, newPositionFar, moveDistanceMax/10);
	
	}
	
}

function endStare(){
	
	staring = false;
	wait();
	
}

function toggleActive(makeActive:boolean){
	
	if(makeActive){
		isActive = true;
		rangeY2current = rangeY1;
		moveDistanceMinCurrent = moveDistanceMax;
		timeDelayMaxCurrent = timeDelayMin;
		
	}else{
		
		isActive = false;
		rangeY2current = rangeY2;
		moveDistanceMinCurrent = moveDistanceMin;
		timeDelayMaxCurrent = timeDelayMax;
		
	}
	
}
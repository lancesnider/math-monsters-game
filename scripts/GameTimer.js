#pragma strict

public var hand:GameObject;
private var handT:Transform;
public var activeR:GameObject;
public var activeL:GameObject;
public var inacHalf:GameObject;
public var bouncePerc:Number = .8;
private var callback:Main;

private var maxTime:Number;
private var timeLeft:Number;

private var thisGO:GameObject;

public function startTimer(getCallback:Main, timerSeconds:Number) 
{

	callback = getCallback;
	thisGO = gameObject;
	handT = hand.transform;
	
	maxTime = timerSeconds;
	timeLeft = timerSeconds;
	

	InvokeRepeating("moveTime", 1, 1);

}

//this function runs every second
private function moveTime()
{

	timeLeft = timeLeft - 1;
	
	/*
	if(timeLeft == 0){
		//time is up
		CancelInvoke("moveTime");
		timeLeft = 0;
		
		callback.alarmDone();
	}*/
	
	determineAngle();

}

private function determineDone()
{
	
	if(timeLeft == 0){
		//time is up
		//CancelInvoke("moveTime");
		//timeLeft = 0;
		stopTimer();
		
		iTween.Stop(thisGO, true);
		CancelInvoke("moveTime");
	
		callback.alarmDone();
	}

}


public function addSeconds(timeToAdd:int)
{

	timeLeft = timeLeft + timeToAdd;
	if(timeLeft > maxTime){
		timeLeft = maxTime;
	}
	determineAngle();

}

private function determineAngle()
{

	var percDone:Number = 1 - timeLeft/maxTime;
	var angle:Number = -percDone * 360;
	if(percDone <= 0)angle = 359;
	
	moveHands(percDone, angle);
	
}

private function moveHands(percDone:Number, angle:Number)
{

	iTween.RotateTo(hand,{"rotation":Vector3(0,0,angle),"time":.5,"delay":0, "onComplete":"determineDone", "onCompleteTarget":thisGO, "onUpdate":"moveBgs", "onUpdateTarget":thisGO});
	
	if(percDone >= bouncePerc){
		iTween.PunchScale(thisGO, {"amount": Vector3(.1,.1,0), "time":.7});
	}
	
}

private function moveBgs()
{

	// print the rotation around the y-axis
	var angle:Number = handT.eulerAngles.z;
	
	if(angle >= 180){//first half
		
		activeR.transform.localPosition.z = 4;
		inacHalf.transform.localPosition.z = 6;
		activeR.transform.rotation = Quaternion.Euler(0, 0, angle);
		
	}else{//second half
	
		activeR.transform.localPosition.z = 6;
		inacHalf.transform.localPosition.z = 3;
		inacHalf.transform.rotation = Quaternion.Euler(0, 0, angle + 180);
		
	}
	
}

public function stopTimer():void
{
	 
	iTween.Stop(thisGO, true);
	CancelInvoke("moveTime");
	

}

public function resetGraphics():void
{
	
	activeR.transform.localPosition.z = 4;
	inacHalf.transform.localPosition.z = 6;
	activeR.transform.eulerAngles.z = 0;
	activeL.transform.eulerAngles.z = 180;
	handT.eulerAngles.z = 359;
	
}

/*public function destroyMe():void{
	Destroy(thisGO);
}*/
#pragma strict


var charsArray:Array = new Array();
private var thisGO:GameObject;

//menu
var pagesGroup:GameObject;
var pagesScript:Pages;
var mainMenuGO:GameObject;
var gameMenuGO:GameObject;
var ticketsGOArray:GameObject[];
var menuChar:GameObject;
var menuChar2:GameObject;
var highScoresChar:GameObject;
var gameOverChar:GameObject;
private var menuIsUp:boolean = true;
var settingsBtns:GameObject;

//curtains
var curtains:GameObject;
var curtainsOpen:boolean = true;
private var curtainsScript:Curtains;
private var afterClosed:String;

private var allActiveArray:Array = new Array();
private var eqCharsArray:Array = new Array();
private var allOptionsArray:Array = new Array();

var currentGrade:int = 1;

//play again
var playAgainBtn:GameObject;
private var playAgainBtnScript:tk2dButton;

//timer
public var statsGO:GameObject;
public var timerSeconds:Number = 10;
private var currentStatsGO:GameObject;
private var timerScript:GameTimer;
private var timerIsUp:boolean = false;
public var timeForCorrect:int = 5;

//wrong answer
var xGO:GameObject;
var wrongWaitTime:Number = 1;

//navigation
private var mouseIsDown:boolean;
private var localHitPoint:Vector2;
private var dragging:boolean;
private var mousePos:Vector2;
public var backSign:GameObject;

//arrays
var characters:GameObject[];
var charWidths:int[];
var dropAreas:GameObject[];

//positions
var stageZ:int;
var floorZ:int;
var draggingZ:int;
var floorY:int = 78;
var stageY:int = 270;
var optionsOffScreenY:int = -250;

//sizes
var screenW:Number = 480;
var screenH:Number = 320;
var stageBuffer:int = 5;
var floorBuffer:int = 35;

private var activeChar:GameObject;
private var activeCharScript:CharActions;

//score
private var scoreScript:Score;
var scoreGO:GameObject;
var scoreAmount:int = 100;
private var wrongInARow:int = 0;
var maxWrong:int = 2;

//testing
private var onIPad:boolean = false;
private var mouseRatioX :Number;
private var mouseRatioY:Number;

private var iPhone4:boolean;
private var iPhone4xOffset:Number = 1.18333;

function Start(){
	
	
	thisGO = gameObject;
	
	if(Application.platform == RuntimePlatform.IPhonePlayer)onIPad = true;
	
	//screenW = Screen.width;//I think this screws things up on retina display
	//screenH = Screen.height;
	
	if(Screen.width == 1136){
		
		iPhone4 = true;
		//iPhone4xOffset = 1136/960;
		
	}
	
	
	mouseRatioX  = screenW/Screen.width;
	mouseRatioY = screenH/Screen.height;
	print(screenW);
	print(Screen.width);
	
	curtainsScript = (curtains.GetComponent(Curtains) as Curtains);
	scoreScript = (scoreGO.GetComponent(Score) as Score);
	pagesScript = (pagesGroup.GetComponent(Pages) as Pages);
	playAgainBtnScript = (playAgainBtn.GetComponent(tk2dButton) as tk2dButton);
	timerScript = (timerGO.GetComponent(GameTimer) as GameTimer);
	
	//addMenu(mainMenuGO);
	//addMainMenuElements(true);
	pagesScript.addMenu(0);
	charsArray = [menuChar, menuChar2];
	
}

function OnGUI(){
	
	if(Event.current.type == EventType.MouseDown && curtainsOpen){
		if(!mouseIsDown){
			mouseIsDown = true;
			determineClick(getMousePos());
		}
		
	}else if(Event.current.type == EventType.MouseUp){
		
		mouseIsDown = false;
		if(dragging)dropChar();
		endStare();
		
	}
	
}

function getMousePos():Vector2
{
	if(!onIPad){	
		mousePos = Input.mousePosition;
	}else{
		var touch = Input.GetTouch(0);
		mousePos = touch.position;//touch position
	}
	
	return mousePos;
}

function Update(){

	
	if(mouseIsDown){
		
		getMousePos();
		
		stare(mousePos);
		
		if(dragging){
			isDragging();
		}
		
	}
	
}


/*function addMenu(menuToAdd:GameObject){

	//menuToAdd.transform.position = Vector3(0, 0, 0);

}

function removeMenu(menuToRemove:GameObject){
	
	//menuToRemove.transform.position = Vector3(0, screenH, 0);
	
}*/

function closeCurtains(){
	
	clearOptions();
	dragging = false;
	curtainsOpen = false;
	curtainsScript.openCloseCurtains(false);
	
}

//when the curtains are completely shut
function curtainIsClosed(){
	
	if(afterClosed == "game"){
		clearEquation();
		addEquation();
		pagesScript.addMenu(3);
		addBackSign();
	}else if(afterClosed == "mainMenu"){
		pagesScript.addMenu(0);
		addMainMenuElements(true);
		removeBackSign();
		clearEquation();
		charsArray = [menuChar, menuChar2];
	}else if(afterClosed == "gameOver"){
		pagesScript.addMenu(2);
		scoreScript.determineIfHighScore(currentGrade);
		clearEquation();
		gameOver();
		addBackSign();
		charsArray = [gameOverChar];
	}else if(afterClosed == "highScores"){
		addBackSign();
		pagesScript.addMenu(1);
		charsArray = [highScoresChar];
	}else if(afterClosed == "drills"){
		addBackSign();
		pagesScript.addMenu(4);
	}
	
	curtainsScript.openCloseCurtains(true);
	
}

//when the curtains are completely open
private function curtainIsOpen(){
	curtainsOpen = true;
}

/////////////////button events///////////////////



public function goToMainMenu(){

	if(curtainsOpen){
		afterClosed = "mainMenu";
		removeTimer();
		closeCurtains();
	}

}

public function goToHighScores()
{
	
	if(curtainsOpen){
		afterClosed = "highScores";
		closeCurtains();
		if(menuIsUp)addMainMenuElements(false);
	}
	
}

public function goToDrills()
{
	
	if(curtainsOpen){
		afterClosed = "drills";
		closeCurtains();
		if(menuIsUp)addMainMenuElements(false);
	}
	
}

public function playGrade(getGrade:int){
	startGame(getGrade);
	playAgainBtnScript.messageParam = getGrade;
	if(menuIsUp)addMainMenuElements(false);
}


/////////////////end button events///////////////////

private function startGame(getGrade:int){
	if(curtainsOpen){
		scoreScript.resetScore();
		currentGrade = getGrade;
		addGameMenu();
		createEquation();
	}
	
}

public var gameMenu:GameObject;
public var timerGO:GameObject;

private function addGameMenu(){
	
	
	timerIsUp = true;
	iTween.MoveTo(gameMenu,{"y":0, "time":.5});
	timerScript.startTimer(this, timerSeconds);
	timerScript.resetGraphics();
	
}

private function removeTimer(){
	if(timerIsUp){
		timerIsUp = false;
		iTween.MoveTo(gameMenu,{"y":250, "time":1, "onComplete":"stopTimer", "onCompleteTarget":timerGO});
	}
}

var addBackSignY:int = 695;
var removeBackSignY:int = 814;

private function addBackSign()
{
	iTween.MoveTo(backSign,{"y":addBackSignY, "time":.5});
}

private function removeBackSign()
{
	iTween.MoveTo(backSign,{"y":removeBackSignY, "time":.5});
}

public var ticketStartingY:int;
public var ticketHeight:int;
public var menuCharY:int = 168;

private function addMainMenuElements(doAdd:boolean){
	
	var numOfTickets:int = ticketsGOArray.length;
	//menuChar
	
	if(doAdd){
		
		for(var i:Number = 0;i<numOfTickets;i++){
			
			var thisY:Number = ticketStartingY - ticketHeight * i;
			iTween.MoveTo(ticketsGOArray[i],{"y":thisY, "time":.5, "delay":i/10});
			//
			
		}
		
		
		iTween.MoveTo(settingsBtns,{"y":50, "time":.5});
		iTween.MoveTo(menuChar,{"y":menuCharY, "time":1});
		
	}else{
		
		if(menuIsUp){//if the menu is up, remove it
			
			for(var ii:Number = 0;ii<numOfTickets;ii++){
				iTween.MoveTo(ticketsGOArray[ii],{"y":-130, "time":.5, "delay":(-ii+numOfTickets -1)/10});
			}
			
			iTween.MoveTo(settingsBtns,{"y":-35, "time":.5});
			iTween.MoveTo(menuChar,{"y":-210, "time":1});
			
		}
		
	}
	
	menuIsUp = doAdd;

}

public function alarmDone(){
	
	removeTimer();
	afterClosed = "gameOver";
	closeCurtains();
	
}



private function gameOver(){
	
	pagesScript.addMenu(2);
	
}



private function createEquation(){
	
	if(curtainsOpen){
		afterClosed = "game";
		closeCurtains();
	}

}

private function addEquation(){


	var eqInfo:Array = Equations.createEquation(currentGrade);
	var newEquation:Array = eqInfo[0];
	var missingElements:Array = eqInfo[1];
	var numberOfOptions:int = eqInfo[2];
	var allOptions:Array = eqInfo[3];
	
	addCharsToStage(allOptions, true);
	addCharsToStage(newEquation, false);

}

private function clearEquation(){
	
	//remove the equation and options
	
	for(var i:Number = 0;i<allActiveArray.length;i++){
	
		
		
		var currGO:GameObject = allActiveArray[i];
		if(currGO.tag == "Character")currGO.collider.enabled = false;
		//var currY:int = currGO.transform.position.y;
		var currZ:int = currGO.transform.position.z;
		
		if(currZ >= 0){
		
			Destroy(currGO);
		
		}
		
		
	}
	
	//clear arrays
	wrongInARow = 0;
	eqCharsArray = [];
	allActiveArray = [];
	charsArray = [];	
	
}

private function clearOptions(){
	
	
	//if(timerIsUp){
	
		//remove the equation and options
		for(var i:Number = 0;i<allOptionsArray.length;i++){
			
			var currGO:GameObject = allOptionsArray[i];
			currGO.collider.enabled = false;
			//var currY:int = currGO.transform.position.y;
			var currZ:int = currGO.transform.position.z;
			
			//if(currY < stageY){
			if(currZ < 0){
				
				iTween.MoveTo(currGO,{"y":optionsOffScreenY, "speed":500, "onupdate":"isDragging", "onComplete":"destroyMe", "delay":i/20, "easeType":"easeInBack"});
			
			}
			
		}
		
		allOptionsArray = [];
	
	//}
	
}

private function isDragging(){
	
	var adjustedMousePosX:Vector2 = mousePos*mouseRatioX;
	var adjustedMousePosY:Vector2 = mousePos*mouseRatioY;
	
	
	if(iPhone4){
		
		adjustedMousePosX.x = adjustedMousePosX.x *iPhone4xOffset - 44;
		
	}
	//print(mousePos);
	//print(adjustedMousePosX);
	
	activeChar.transform.position = Vector3(adjustedMousePosX.x - localHitPoint.x, adjustedMousePosY.y - localHitPoint.y, draggingZ);
	activeCharScript.isDragging();

}

var buttonSound:AudioClip;

private function determineClick(mouseClickPos:Vector2){
	
	//raycast to determine which was hit
	var ray = Camera.main.ScreenPointToRay(getMousePos());
	var hit:RaycastHit;
	
	if (Physics.Raycast (ray, hit, 100) && curtainsOpen) {
		
		var itemHit:GameObject = hit.collider.gameObject;
		
		if(itemHit.tag == "Character"){
			
			characterClicked(hit, itemHit);
			
		}else if(itemHit.name == "button"){
		
			var btnScript:tk2dButton = (itemHit.GetComponent(tk2dButton) as tk2dButton);
			btnScript.mainRayHit();
			makeSound(buttonSound, 0);
		
		}else{
		
			activeChar = null;
			
		}
		
	}else{
	
		activeChar = null;
	
	}
	
}

function characterClicked(hit:RaycastHit, charHit:GameObject){

	var charScript:CharActions = (charHit.GetComponent(CharActions) as CharActions);
	
	if(charScript.clickChar()){//is it draggable or not
	
		charScript.pickedUp();
		activeChar = charHit;
		
		iTween.Stop(activeChar);
		
		activeCharScript = charScript;
		
		//determine local hit location
		localHitPoint = hit.point - charHit.transform.position;
		
		dragging = true;
		
		var dropOverGO:GameObject = determineOverDrop();
		if(dropOverGO != null){
			var emptyScript:Empty = (dropOverGO.GetComponent(Empty) as Empty);
			emptyScript.setOccupied(-1, null);
		}
		
	}

}

function dropChar(){
	
	dragging = false;
	
	var charScript:CharActions = (activeChar.GetComponent(CharActions) as CharActions);
	charScript.putDown();
	
	//determine if touching empty space
	var returnPos:Vector3 = determineDropPos(charScript);
	iTween.MoveTo(activeChar,{"position":returnPos, "speed":1000, "onupdate":"isDragging", "onComplete":"landed"});

}

function moveCharBack(thisChar:GameObject){
	
	var charScript:CharActions = (thisChar.GetComponent(CharActions) as CharActions);
	
	//determine if touching empty space
	var returnPos:Vector3 = charScript.getStartPos();
	iTween.MoveTo(thisChar,{"position":returnPos, "speed":1000, "onupdate":"isDragging", "onComplete":"landed"});

}

function determineDropPos(charScript:CharActions):Vector3{

	var dropOverGO:GameObject = determineOverDrop();
	
	if(dropOverGO == null)return charScript.getStartPos();
	
	
	var emptyScript:Empty = (dropOverGO.GetComponent(Empty) as Empty);
	var currentOccupied:GameObject = emptyScript.setOccupied(charScript.getThisNum(), activeChar);
	if(currentOccupied != null)moveCharBack(currentOccupied);
	
	var dropPos:Vector3 = new Vector3(dropOverGO.transform.position.x, dropOverGO.transform.position.y -3, 0);
	
	checkIfFilledCorrect();
	
	return dropPos;

}

var rightSoundBeep:AudioClip;
var rightSoundCheer:AudioClip;

function checkIfFilledCorrect(){
	
	//determine if all spaces are filled
	var filledArray:Array = VerifyEquation.CheckFilled(eqCharsArray);
	if(filledArray != null){//if they're filled, check the equation
	
		var isCorrect:boolean = VerifyEquation.verify(filledArray);
		if(isCorrect){
			//if it's correct
			wrongInARow = 0;
			//afterClosed = "game";
			scoreScript.addToScore(scoreAmount, currentGrade);
			timerScript.addSeconds(timeForCorrect);
			//closeCurtains();
			nextQuestion();
			
			
			makeSound(rightSoundBeep, 0);
			//makeSound(rightSoundCheer, 0);
			
		}else{
		
			wrongAnswer();
			
		}
		
		scoreScript.rightAnswer(isCorrect);
		
		
	}
	
}

function nextQuestion(){
	
	
	afterClosed = "game";
	closeCurtains();
	
}

function makeSound(audioToPlay:AudioClip, delay:Number){
	
	yield WaitForSeconds(delay);
	
	//!!enable this line to make audio work
	if(GVars.soundOn)audio.PlayOneShot(audioToPlay);
	
}

var wrongSound:AudioClip;

function wrongAnswer(){
	
	wrongInARow = wrongInARow + 1;
	
	for(var h:int = 0;h<wrongInARow;h++){
		
		makeSound(wrongSound, h * .25);
	
	}
	
	//add x's
	for(var j:int = 0;j<eqCharsArray.length;j++){
	
		var thisCharJ:GameObject = eqCharsArray[j];
		if(thisCharJ.tag == "Drop"){
			addX(thisCharJ);
		}
		
	}
	
	var charScript:CharActions = (activeChar.GetComponent(CharActions) as CharActions);
	
	//wrongWaitTime
	if(wrongInARow >= maxWrong){
		wrongInARow = 0;
		
		charScript.setDraggagle(false);
		yield WaitForSeconds(wrongWaitTime);
		charScript.setDraggagle(true);
		
		if(timerIsUp)nextQuestion();
	
	}else{
		
		if(timerIsUp){
		
			//put the active character back
			
			for(var i:int=0;i<allOptionsArray.length;i++){
			
				var thisChar:GameObject = allOptionsArray[i];
				
				if(thisChar.transform.position.y > floorY){
					
					var thisCharScript:CharActions = (thisChar.GetComponent(CharActions) as CharActions);
					var returnPos:Vector3 = thisCharScript.getStartPos();
					thisCharScript.setDraggagle(false);
					
					iTween.MoveTo(thisChar,{"position":returnPos, "speed":1000, "onupdate":"isDragging", "onComplete":"wrongAnswerLanded", "onCompleteParams":thisChar, "onCompleteTarget":thisGO, "delay":wrongWaitTime});
					
					
					
				}
			
			}
			
			yield WaitForSeconds(wrongWaitTime);
		
		}
	
	}
	
}

private function wrongAnswerLanded(thisChar:GameObject)
{
	
	if(thisChar){
		var charScript:CharActions = (thisChar.GetComponent(CharActions) as CharActions);
		charScript.landed();
		charScript.setDraggagle(true);
	}
	
}

function addX(thisDropGO:GameObject){
	
	//xGO
	var dropPos:Vector3 = thisDropGO.transform.position;
	var instantiatedX:GameObject = Instantiate (xGO, Vector3(dropPos.x, dropPos.y, -3), Quaternion.identity);
	
	//reset the occupied var
	var emptyScript:Empty = (thisDropGO.GetComponent(Empty) as Empty);
	emptyScript.setOccupied(-1, null);
	
	yield WaitForSeconds(wrongWaitTime);
	
	Destroy(instantiatedX);
	
}

//when a character is dropped, what is it over
function determineOverDrop():GameObject{
	
	//create a raycast from the active character
	var hit:RaycastHit;
	var forward : Vector3 = activeChar.transform.TransformDirection(Vector3.forward) * 10;
	var ray:Ray = new Ray (activeChar.transform.position, forward);

	
	//determine if hit anything
	if (Physics.Raycast (ray, hit, 500)){
		
		//the item the raycast hit
		var itemHit:GameObject = hit.collider.gameObject;
		
		//determine what was hit
		if(itemHit.tag == "Drop"){
			
			//if it's over a drop area
			return itemHit;
			
		}else if(itemHit.tag == "Character"){
		
			var itemBelow:GameObject = determineSwapPlaces(itemHit);
			
			//if it's over a character, check if it's over a drop area
			if(itemBelow != null){
				
				//return item below, put this item in place
				moveCharBack(itemHit);
				return itemBelow;
				
			}else{
			
				//the character wasn't over anything
				return null;
				
			}
			
		}
		
	}
	
	//if it didn't hit anything
	return null;
	
}

private function determineSwapPlaces(bottomChar:GameObject):GameObject{

	//create a raycast from the active character
	var hit:RaycastHit;
	var forward : Vector3 = bottomChar.transform.TransformDirection(Vector3.forward) * 10;
	var ray:Ray = new Ray (bottomChar.transform.position, forward);
	
	//determine if hit anything
	if (Physics.Raycast (ray, hit, 100)){
		
		//the item the raycast hit
		var itemHit:GameObject = hit.collider.gameObject;
		
		//determine what was hit
		if(itemHit.tag == "Drop"){
			
			return itemHit;
			
		}
		
	}
	
	//if it didn't hit anything
	return null;

}



function stare(mousePos:Vector2){
	
	var adjustedMousePosX:Vector2 = mousePos*mouseRatioX ;
	//var adjustedMousePosY:Vector2 = mousePos*mouseRatioY;
	
	for(var i:int=0;i<charsArray.length;i++){
	
		var thisChar:GameObject = charsArray[i];
		(thisChar.GetComponent(EyeMovement) as EyeMovement).stare(adjustedMousePosX);
		
	}
	
}

function endStare(){
	
	for(var i:int=0;i<charsArray.length;i++){
		
		var thisChar:GameObject = charsArray[i];
		(thisChar.GetComponent(EyeMovement) as EyeMovement).endStare();
		
	}
	
}


var stageScale:Number = 1;
var dropYOffset = 20;
//add options to bottom
function addCharsToStage(nums:Array, isFloor:boolean){
	
	var yPos:int;
	var zPos:int;
	var startYPos:int;
	var buffer:int;

	if(isFloor){
		yPos = floorY;
		zPos = floorZ;
		startYPos = optionsOffScreenY;
		buffer = floorBuffer;
	}else{
		yPos = stageY;
		zPos = stageZ;
		startYPos = stageY;
		buffer = stageBuffer;
	}

	//detmine positions
	var totalW:int = 0;
	//nums = [1,2,3,4,5];
	for(var i:int = 0;i<nums.length;i++){
		totalW = totalW + (charWidths[nums[i]] * stageScale);
		if(i != nums.length - 1)totalW = totalW + buffer;
	}
	var currX:int = (screenW - totalW)/2;
	
	
	
	for(var ii:Number = 0;ii<nums.length;ii++){
	
		
	
		//add the number
		var charNum:int = nums[ii];
		
		var yOffset:int;
		var zOffset:int;
		if(charNum == 17){
			zOffset = 10;
			yOffset = dropYOffset;
		}else{
			zOffset = 0;
			yOffset = 0;
		}
		var thisChar:GameObject = characters[charNum];
		var thisX:int = currX + (charWidths[charNum]/2 * stageScale);
		
		if(isFloor){
			var trueYPos:Number = getShadowY(thisX);
		}
		
		var instantiatedChar:GameObject = Instantiate (thisChar, Vector3(thisX, startYPos + yOffset, zPos + zOffset), Quaternion.identity);
		instantiatedChar.transform.localScale = Vector3(stageScale,stageScale,stageScale);
		
		if(isFloor){
			var charScript:CharActions = (instantiatedChar.GetComponent(CharActions) as CharActions);
			charScript.setDraggagle(true);
			var startPos:Vector3 = new Vector3(thisX, trueYPos, zPos + zOffset);
			charScript.setStartPos(startPos, stageY, floorY);
			iTween.MoveTo(instantiatedChar,{"position":startPos, "speed":500, "onupdate":"isDragging", "onComplete":"landed", "delay":ii/20, "easeType":"easeOutBack"});
			allOptionsArray.push(instantiatedChar);
		}else{
			eqCharsArray.push(instantiatedChar);
		}
		
		allActiveArray.push(instantiatedChar);
		
		if(charNum < 10)charsArray.push(instantiatedChar);
		
		
		currX = currX + (charWidths[charNum] * stageScale);
		if(ii != nums.length - 1)currX = currX + buffer;
	
	}

}

function getShadowY(getX:Number):Number{
	
	var thisX:Number = getX - screenW/2;
	var shadY:Number = .00007 * (thisX * thisX) + floorY;
	
	return shadY;
	
}

function skipYN(missingElements:Array, thisNum:int):boolean{
	
	for(var i:int = 0;i<missingElements.length;i++){
		if(missingElements[i] == thisNum){
			return true;
		}
	}
	
	return false;
	
}




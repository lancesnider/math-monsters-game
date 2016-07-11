#pragma strict

private var thisGO:GameObject;
public var score:int = 0;
public var scoreTxt:GameObject;
private var scoreTxtScript:tk2dTextMesh;
public var highScoresGO:GameObject;
private var highScoresScript:HighScore;

public var rightPopup:GameObject;
public var rightPopupNum:GameObject;
private var rightPopupNumScript:tk2dTextMesh;
public var rightPopupTxt:GameObject;
private var rightPopupTxtScript:tk2dTextMesh;

//percentage
//public var percTxt:GameObject;
//private var percTxtScript:tk2dTextMesh;
private var correct:Number = 0;
private var totalQs:Number = 0;
private var perc:Number;

public var tweenNumTime:Number = .3;


function Start()
{
	
	thisGO = gameObject;
	scoreTxtScript = (scoreTxt.GetComponent(tk2dTextMesh) as tk2dTextMesh);
	highScoresScript = (highScoresGO.GetComponent(HighScore) as HighScore);
	//percTxtScript = (percTxt.GetComponent(tk2dTextMesh) as tk2dTextMesh);
	rightPopupNumScript = (rightPopupNum.GetComponent(tk2dTextMesh) as tk2dTextMesh);
	rightPopupTxtScript = (rightPopupTxt.GetComponent(tk2dTextMesh) as tk2dTextMesh);
	
	setGameOverVars();

}

var cheer1:AudioClip;
var cheer2:AudioClip;
var cheer3:AudioClip;
var cheer4:AudioClip;
var cheer5:AudioClip;

//adds amount to score and returns total score
public function addToScore(baseCorrectScore:int, getCurrentGrade:int):int
{

	var currentGrade:int; 
	
	if(getCurrentGrade > 99){
		
		currentGrade = Mathf.Floor(getCurrentGrade/100);
		
	}else{
		currentGrade = getCurrentGrade;
	}
	
	//play audio based on correct in a row
	
	var bonusTxt:String = "";
	var lastScore:int = score;
	var rightInRowBonus:int = rightInARow * 10;
	if(rightInRowBonus > baseCorrectScore/2)rightInRowBonus = baseCorrectScore/2;
	var rightExtraBonus:int = 0;
	var rirP1:int = rightInARow + 1;
	if(rirP1 == 3 || rirP1 == 5 || rirP1%10 == 0){
		rightExtraBonus = rightInARow * 20;
		bonusTxt = rirP1 + " IN A ROW! +" + rightExtraBonus;
		makeSound(cheer2);
		//
	}else{
		makeSound(cheer1);
	}
	var gradeBonus = (currentGrade - 1) * 20;
	if(currentGrade == 1)gradeBonus = -30;
	var scoreToAdd:int = baseCorrectScore + gradeBonus + rightInRowBonus;
	
	setRightPopupTxt(scoreToAdd, bonusTxt);
	score = score + scoreToAdd + rightExtraBonus;
	
	setScoreTxt(score);
	iTween.PunchScale(thisGO, {"amount":Vector3(.4, .4, 0), "time":1});
	iTween.ValueTo(thisGO, {"from":lastScore, "to":score, "time":tweenNumTime, "onUpdate":"setScoreTxt"});
	
	return score;
	
}

function makeSound(audioToPlay:AudioClip){
	
	if(GVars.soundOn)audio.PlayOneShot(audioToPlay);
	
}

private function setRightPopupTxt(scoreAdded:int, bonusTxt:String):void
{
	
	rightPopupNumScript.text = "+" + scoreAdded;
	rightPopupNumScript.Commit();
	
	rightPopupTxtScript.text = bonusTxt;
	rightPopupTxtScript.Commit();
	
	iTween.ScaleTo(rightPopup, {"scale":Vector3(1,1,1), "time":.2, "easeType":"easeOutBack"});
	iTween.ScaleTo(rightPopup, {"scale":Vector3(0,0,0), "time":.3, "easeType":"easeInBack", "delay":.6});
	
}

private var rightInARow:int = 0;

public function rightAnswer(isRight:boolean)
{
	
	totalQs = totalQs + 1;
	
	if(isRight){
		correct = correct + 1;
		rightInARow = rightInARow + 1;
	}else{
		rightInARow = 0;
	}
	
	perc = Mathf.Round( correct/totalQs * 100 );
	
}


private function setScoreTxt(scoreAmount:int):void
{
	
	scoreTxtScript.text = "" + scoreAmount;
	scoreTxtScript.Commit();
	
}	

//sets the current score to 0
public function resetScore():void
{
	
	score = 0;
	setScoreTxt(score);
	rightInARow = 0;
	
	totalQs = 0;
	correct = 0;
	perc = 0;
	//setPercTxt();
	
}

//returns current score
public function getScore():int
{
	
	return score;
	
}

//determines if this is the top score for the grade. 
//if so, it saves the score
public function determineIfHighScore(grade:int)
{
	
	var topScore:int;
	var gradeName:String = "topScoreGrade" + grade;
	
	if(PlayerPrefs.HasKey(gradeName)){
		topScore = PlayerPrefs.GetInt(gradeName);
	}else{
		topScore = 0;
	}
	
	//set the text
	setGOHighScoreTxt(topScore);
	
	var adjustedScore:int = score;//in case you wanted to apply a bonus for something
	if(perc == 100)adjustedScore = adjustedScore + 500;
	
	if(adjustedScore > topScore){
		
		makeSound(cheer2);
		newHighScoreIcon.position.z = 0;
		highScoresScript.setScoreTxt(grade, adjustedScore);
		PlayerPrefs.SetInt(gradeName, adjustedScore);
		
	}else{
		makeSound(cheer1);
		newHighScoreIcon.position.z = 600;
	}
	
	setGameOverPg(adjustedScore);
	
}

var newHighScoreIcon:Transform;
var gOScoreTxt:GameObject;
private var gOHighScoreTxtScript:tk2dTextMesh;
var gOPercTxt:GameObject;
private var gOPercTxtScript:tk2dTextMesh;
var gOTotalTxt:GameObject;
private var gOTotalTxtScript:tk2dTextMesh;

private function setGameOverVars()
{
	
	gOHighScoreTxtScript = (gOScoreTxt.GetComponent(tk2dTextMesh) as tk2dTextMesh);
	gOPercTxtScript = (gOPercTxt.GetComponent(tk2dTextMesh) as tk2dTextMesh);
	gOTotalTxtScript = (gOTotalTxt.GetComponent(tk2dTextMesh) as tk2dTextMesh);
	
}

private function setGameOverPg(adjustedScore:int)
{
	
	//setGOHighScoreTxt(highScoresScript());
	setGOPercTxt(perc);
	setGOSTotalTxt(adjustedScore);
	
	//yield WaitForSeconds(1);
	
	//iTween.ValueTo(thisGO, {"from":correct, "to":0, "time":tweenNumTime, "onUpdate":"setGOScoreTxt"});
	//iTween.ValueTo(thisGO, {"from":0, "to":score, "time":tweenNumTime, "onUpdate":"setGOSTotalTxt"});
	
	//yield WaitForSeconds(1);
	
	//iTween.ValueTo(thisGO, {"from":perc, "to":0, "time":tweenNumTime, "onUpdate":"setGOPercTxt"});
	//iTween.ValueTo(thisGO, {"from":score, "to":adjustedScore, "time":tweenNumTime, "onUpdate":"setGOSTotalTxt"});
	
}

private function setGOHighScoreTxt(amount:int)
{
	setGameOverTxt(gOHighScoreTxtScript, amount, "");
}

private function setGOPercTxt(amount:int)
{
	var txtSuffix:String = "%";
	if(amount == 100)txtSuffix = "% +500 BONUS";
	setGameOverTxt(gOPercTxtScript, amount, txtSuffix);
}

private function setGOSTotalTxt(amount:int)
{
	setGameOverTxt(gOTotalTxtScript, amount, "");
}

private function setGameOverTxt(txtScript:tk2dTextMesh, amount:int, suffix:String)
{
	
	txtScript.text = amount + suffix;
	txtScript.Commit();
	
}
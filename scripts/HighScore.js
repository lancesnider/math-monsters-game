
var numberOfGrades:int = 4;
var textGOs:GameObject[];
private var textScripts:tk2dTextMesh[];
private var numberOfEqTypes:int = 5;


function Start() 
{
	
	//set the array of scirpts
	textScripts = new tk2dTextMesh[numberOfGrades];
	
	for(var i:int = 0;i<numberOfGrades;i++){
		var thisGO:GameObject = textGOs[i];
		textScripts[i] = (thisGO.GetComponent(tk2dTextMesh) as tk2dTextMesh);
	}
	
	setHighScores();

}

private function setHighScores()
{

	for(var i:int = 0;i<numberOfGrades;i++){
		
		var thisScore:int;
		var gradeNum:int = i + 1;
		var gradeName:String = "topScoreGrade" + gradeNum;
		
		if(PlayerPrefs.HasKey(gradeName)){
			thisScore = PlayerPrefs.GetInt(gradeName);
		}else{
			thisScore = 0;
		}
		
		setScoreTxt(gradeNum, thisScore);
		
	}
	
	/*for(var j:int = 0;j<numberOfGrades;j++){
		
		var thisDrillScore:int;
		var gradeIn100s:int = (i + 1) * 100;
		
		for(var jj:int = 0;jj<numberOfEqTypes;jj++){
			
			var gradeTypeIn100s:int = gradeIn100s + jj;
			var gradeIn100sName:String = "topScoreGrade" + gradeTypeIn100s;
			
			if(PlayerPrefs.HasKey(gradeIn100sName)){
				thisDrillScore = PlayerPrefs.GetInt(gradeIn100sName);
			}else{
				thisDrillScore = 0;
			}
				
		}
		
	}*/

}

public function getHighScore(gradeToGet:int):int
{
	
	var gradeName:String = "topScoreGrade" + gradeToGet;
	
	if(PlayerPrefs.HasKey(gradeName)){
		return PlayerPrefs.GetInt(gradeName);
	}
	
	return 0;
	
	
}

public function setScoreTxt(gradNum:int, thisScore:int)
{
	
	if(gradNum < 100){
		var currentScript:tk2dTextMesh = textScripts[gradNum - 1];
		currentScript.text = "" + thisScore;
		currentScript.Commit();
	}
	
}

public function resetScores()
{
	
	for(var i:int = 0;i<numberOfGrades;i++){
		
		var gradeNum:int = i + 1;
		
		var gradeName:String = "topScoreGrade" + gradeNum;
		PlayerPrefs.SetInt(gradeName, 0);
		
		setScoreTxt(gradeNum, 0);
		
	}
	
	for(var j:int = 0;j<numberOfGrades;j++){
		
		var gradeIn100s:int = (j + 1) * 100;
		print("gradeIn100s " + gradeIn100s);
		
		for(var jj:int = 0;jj<numberOfEqTypes;jj++){
			
			var gradeTypeIn100s:int = gradeIn100s + jj;
			var gradeIn100sName:String = "topScoreGrade" + gradeTypeIn100s;
			
			print(gradeIn100sName);
			
			PlayerPrefs.SetInt(gradeIn100sName, 0);
				
		}
		
	}
	
}


private static var grade0:Array = [0];
private static var grade1:Array = [0];
private static var grade2:Array = [1];
private static var grade3:Array = [2];

public static function create(gradeNum:int):Array{

	//get eq type
	var eqType:int = pickType(gradeNum);
	
	var allInfo:Array = [];
	
	
	var numMin:int;
	var numMax:int;
	var numOfEmpties:int;
	var answersOnly:boolean;
	if(eqType == 0){
		numMin = 1;
		numMax = 10;
		numOfEmpties = 1;
		answersOnly = false;
	}else if(eqType == 1){
		numMin = 0;
		numMax = 99;
		numOfEmpties = 2;
		answersOnly = false;
	}else if(eqType == 2){
		numMin = 10;
		numMax = 99;
		numOfEmpties = 3;
		answersOnly = false;
	}
	
	
	var num1:int = Random.Range(numMin, numMax);
	var num2:int = Random.Range(numMin, numMax);
	
	var sym:String;
	
	if(num1 < num2){
		sym = "<";
	}else if(num1 > num2){
		sym = ">";
	}else if(num1 == num2){
		sym = "=";
	}

	var newEquation:Array = [num1, sym, num2];
	
	///////////expand it
	newEquation = Equations.expandEq(newEquation);
	
	allInfo[0] = newEquation;
	
	///////////empties
	var missingElements:Array = PickEmpties.getEmpties(newEquation, answersOnly, numOfEmpties);
	allInfo[1] = missingElements;
	
	return allInfo;
	
}


private static function pickType(gradeNum:int):int{
	
	//get the associated cirriculum
	var thisGradeSet:int[];
	if(gradeNum == 0){
		thisGradeSet = grade0;
	}else if(gradeNum == 1){
		thisGradeSet = grade1;
	}else if(gradeNum == 2){
		thisGradeSet = grade2;
	}else if(gradeNum == 3){
		thisGradeSet = grade3;
	}
	
	//pick random cirriculum within grade
	var randomCirr:int = thisGradeSet[Random.Range(0, thisGradeSet.length)];
	
	return randomCirr;
	
}
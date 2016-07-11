private static var grade0:Array = [0];
private static var grade1:Array = [1, 11];
private static var grade2:Array = [2, 21];
private static var grade3:Array = [3, 31];
private static var grade4:Array = [4, 41, 42];

public static function create(gradeNum:int):Array{

	//get eq type
	var eqType:int = pickType(gradeNum);
	
	var allInfo:Array = [];
	
	var startNumMin:int;
	var startNumMax:int;
	var numOfEmpties:int;
	var answersOnly:boolean;
	if(eqType == 0){
		startNumMin = 0;
		startNumMax = 10;
		numOfEmpties = 1;
		answersOnly = true;
	}else if(eqType == 1){
		startNumMin = 0;
		startNumMax = 10;
		numOfEmpties = 1;
		answersOnly = true;
	}else if(eqType == 11){
		startNumMin = 5;
		startNumMax = 10;
		numOfEmpties = 1;
		answersOnly = true;
	}else if(eqType == 2){
		startNumMin = 10;
		startNumMax = 20;
		numOfEmpties = 2;
		answersOnly = true;
	}else if(eqType == 21){
		startNumMin = 1;
		startNumMax = 10;
		numOfEmpties = 1;
		answersOnly = false;
	}else if(eqType == 3){
		startNumMin = 10;
		startNumMax = 20;
		numOfEmpties = 2;
		answersOnly = true;
	}else if(eqType == 31){
		startNumMin = 10;
		startNumMax = 20;
		numOfEmpties = 1;
		answersOnly = false;
	}else if(eqType == 4){
		startNumMin = 10;
		startNumMax = 99;
		numOfEmpties = 2;
		answersOnly = true;
	}else if(eqType == 41){
		startNumMin = 10;
		startNumMax = 99;
		numOfEmpties = 1;
		answersOnly = false;
	}else if(eqType == 42){
		startNumMin = 30;
		startNumMax = 50;
		numOfEmpties = 2;
		answersOnly = false;
	}
	
	var startNum:int = Random.Range(startNumMin, startNumMax);
	var secondValue:int = Random.Range(0, startNum + 1);
	var answer:int = startNum - secondValue;

	var newEquation:Array = [startNum, "-", secondValue, "=", answer];
	
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
	}else if(gradeNum == 4){
		thisGradeSet = grade3;
	}
	
	//pick random cirriculum within grade
	var randomCirr:int = thisGradeSet[Random.Range(0, thisGradeSet.length)];
	
	return randomCirr;
	
}
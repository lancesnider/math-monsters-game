private static var grade0:Array = [0];
private static var grade1:Array = [1, 11];
private static var grade2:Array = [2, 21];
private static var grade3:Array = [3, 31, 32];
private static var grade4:Array = [4, 41, 42];

public static function create(gradeNum:int):Array{

	//get eq type
	var eqType:int = pickType(gradeNum);
	
	var allInfo:Array = [];
	var newEquation:Array = [];
	
	var answerMin:int;
	var answerMax:int;
	var numOfEmpties:int;
	var answersOnly:boolean;
	if(eqType == 0){
		answerMin = 0;
		answerMax = 10;
		numOfEmpties = 1;
		answersOnly = true;
	}else if(eqType == 1){
		answerMin = 0;
		answerMax = 10;
		numOfEmpties = 1;
		answersOnly = true;
	}else if(eqType == 11){
		answerMin = 5;
		answerMax = 10;
		numOfEmpties = 1;
		answersOnly = true;
	}else if(eqType == 2){
		answerMin = 10;
		answerMax = 20;
		numOfEmpties = 1;
		answersOnly = true;
	}else if(eqType == 21){
		answerMin = 1;
		answerMax = 10;
		numOfEmpties = 1;
		answersOnly = false;
	}else if(eqType == 3){
		answerMin = 10;
		answerMax = 20;
		numOfEmpties = 2;
		answersOnly = false;
	}else if(eqType == 31){
		answerMin = 10;
		answerMax = 30;
		numOfEmpties = 2;
		answersOnly = true;
	}else if(eqType == 32){
		answerMin = 10;
		answerMax = 30;
		numOfEmpties = 1;
		answersOnly = false;
	}else if(eqType == 4){
		answerMin = 20;
		answerMax = 99;
		numOfEmpties = 2;
		answersOnly = true;
	}else if(eqType == 41){
		answerMin = 10;
		answerMax = 30;
		numOfEmpties = 2;
		answersOnly = false;
	}else if(eqType == 42){
		answerMin = 20;
		answerMax = 99;
		numOfEmpties = 1;
		answersOnly = true;
	}
	
	var answer:int = Random.Range(answerMin, answerMax);
	var num1:int = Random.Range(0, answer + 1);
	var num2:int = answer - num1;
	
	newEquation = [ num1, "+", num2, "=", answer];
	
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
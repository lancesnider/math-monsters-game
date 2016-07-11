private static var grade0:Array = [0];
private static var grade1:Array = [1];
private static var grade2:Array = [2];
private static var grade3:Array = [3, 31];
private static var grade4:Array = [4, 41];

public static function create(gradeNum:int):Array{

	//get eq type
	var eqType:int = pickType(gradeNum);
	
	var allInfo:Array = [];
	
	var num1Min:int;
	var num1Max:int;
	var num2Min:int;
	var num2Max:int;
	var numOfEmpties:int;
	var answersOnly:boolean;
	if(eqType == 0){
		num1Min = 1;
		num1Max = 6;
		num2Min = 1;
		num2Max = 6;
		numOfEmpties = 1;
		answersOnly = true;
	}else if(eqType == 1){
		num1Min = 1;
		num1Max = 13;
		num2Min = 1;
		num2Max = 9;
		numOfEmpties = 1;
		answersOnly = false;
	}else if(eqType == 2){
		num1Min = 1;
		num1Max = 13;
		num2Min = 1;
		num2Max = 9;
		numOfEmpties = 2;
		answersOnly = false;
	}else if(eqType == 3){
		num1Min = 1;
		num1Max = 7;
		num2Min = 1;
		num2Max = 7;
		numOfEmpties = 2;
		answersOnly = true;
	}else if(eqType == 31){
		num1Min = 1;
		num1Max = 7;
		num2Min = 1;
		num2Max = 7;
		numOfEmpties = 1;
		answersOnly = false;
	}else if(eqType == 4){
		num1Min = 1;
		num1Max = 10;
		num2Min = 1;
		num2Max = 10;
		numOfEmpties = 2;
		answersOnly = true;
	}else if(eqType == 41){
		num1Min = 1;
		num1Max = 10;
		num2Min = 1;
		num2Max = 10;
		numOfEmpties = 1;
		answersOnly = false;
	}
	
	
	var num1:int = Random.Range(num1Min, num1Max);
	var num2:int = Random.Range(num1Min, num1Max);
	var answer:int = num1 * num2;
	
	var newEquation:Array; 
	
	if(Random.Range(0, 2) == 0){
		newEquation = [answer, "/", num2, "=", num1];
	}else{
		newEquation = [answer, "/", num1, "=", num2];
	}
	
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
		thisGradeSet = grade4;
	}
	
	//pick random cirriculum within grade
	var randomCirr:int = thisGradeSet[Random.Range(0, thisGradeSet.length)];
	
	return randomCirr;
	
}
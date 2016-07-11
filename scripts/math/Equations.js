#pragma strict

/*
comparison = 0 (ex: 48>22)
addition = 1
	0: 
	1: no negatives, answer < 10, only answer missing, 4 options 
	2:
	3:
subtraction = 2
multiplication = 3
division = 4 
*/

//equation types per grade: 1st grade = 0, 1 (comparison, addition)
private static var grade0:int[] = [0];//comparison
private static var grade1:int[] = [1, 2];//addition, subtraction
private static var grade2:int[] = [1, 2];//addition, subtraction
private static var grade3:int[] = [1, 2, 3, 4];//addition, subtraction, multiplication, division
private static var grade4:int[] = [1,2, 3, 4];//multiplication, division

private static var gradesAll:Array = [grade0, grade1, grade2, grade3, grade4];

public static function createEquation(gradeNum:int):Array{
	
	var newEquation:Array = new Array();
	var eqInfo:Array = new Array();
	var missingElements:Array = new Array();
	var eqType:int;
	
	if(gradeNum < 100){
		eqType = pickType(gradeNum);
	}else{
		
		var gradeAndType:int = gradeNum;
		//gradeNum set this to whatever
		gradeNum = Mathf.Floor(gradeAndType/100);
		//manually set eq type
		eqType = gradeAndType - (gradeNum * 100);
		
	}
	
	if(eqType == 0){
		eqInfo = CreateComp.create(gradeNum);
	}else if(eqType == 1){
		eqInfo = CreateAdd.create(gradeNum);
	}else if(eqType == 2){
		eqInfo = CreateSub.create(gradeNum);
	}else if(eqType == 3){
		eqInfo = CreateMult.create(gradeNum);
	}else if(eqType == 4){
		eqInfo = CreateDiv.create(gradeNum);
	}
	//eqInfo = CreateComp.create(gradeNum);
	newEquation = eqInfo[0];
	missingElements = eqInfo[1];
	
	//newEquation = expandEq(newEquation);
	
	//TEST//////////////////////////////////
	//var missingElements:Array = new Array();
	//missingElements = PickEmpties.getEmpties(newEquation, gradeNum);
	var numberOfOptions:int = 5;
	//End TEST//////////////////////////////
	
	
	var reqOptionsArr:Array = new Array();
	
	for(var i:int = 0;i<missingElements.length;i++){
		reqOptionsArr.Push(newEquation[missingElements[i]]);
		//reqOptionsArr.Push(0);
	}
	
	
	var allOptions:Array = GetOptions.createOptions(reqOptionsArr, numberOfOptions);
	
	newEquation = addMissing(newEquation, missingElements);
	var allInfoArray:Array = new Array(newEquation, missingElements, numberOfOptions, allOptions);
	
	//pick an equation type and level based on params
	return allInfoArray;//!!!!testing

}

private static function addMissing(eqArray:Array, missingElements:Array):Array{

	for(var i:int = 0;i<missingElements.length;i++){
		eqArray[ missingElements[i] ] = 17;//this is an empty
	}
	
	return eqArray;

}

public static function expandEq(eqArray:Array):Array{

	var newEqArray:Array = new Array();
	var eqArrLength:int = eqArray.length;
	
	for(var i:int = 0;i<eqArrLength;i++){
		
		//if(eqArray[i] > 9){
		if(eqArray[i].GetType() != int){
		
			var symNum:int;
			if(eqArray[i] == "+"){//+
				symNum = 10;
			}else if(eqArray[i] == "-"){//-
				symNum = 11;
			}else if(eqArray[i] == "*"){//*
				symNum = 12;
			}else if(eqArray[i] == "/"){///
				symNum = 13;
			}else if(eqArray[i] == ">"){//
				symNum = 14;
			}else if(eqArray[i] == "<"){//
				symNum = 15;
			}else if(eqArray[i] == "="){//=
				symNum = 16;
			}
			
			//newEqArray.Push(eqArray[i]);
			newEqArray.Push(symNum);
			
		}else{
			var splitNum:Array = intToArr(eqArray[i]);
			for(var j:int = 0;j<splitNum.length;j++){
				newEqArray.Push(splitNum[j]);
			}
			
		}
		
	}
	
	return newEqArray;
	
}

private static function intToArr(num:int):Array{

	var numString:String = num.ToString();
	var numsArray:Array = new Array();
	var stringLength = numString.Length;
	
	for(var i:int = 0;i<stringLength;i++){
	
		var numChar:char = numString[i];
		var numCharAsString:String = numChar.ToString(); 
		var charAsNum:int = parseInt(numCharAsString);
		numsArray.Push(charAsNum);
	
	}
	
	return numsArray;
	
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
	
	/*
	comparison = 0 (ex: 48>22)
	addition = 1
	subtraction = 2
	multiplication = 3
	division = 4 
	count = 5
	*/
	
	return randomCirr;
	
}

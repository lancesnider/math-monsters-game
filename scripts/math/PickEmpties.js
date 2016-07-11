#pragma strict

/*
grade 0 - 
grade 1 - answer only
grade 2 - 
grade 3 - 2 blanks
grade 4
*/


public static function getEmpties(eqArray:Array, answersOnly:boolean, numOfOptions:int):Array{
	
	var possibleOptions:Array = new Array();
	var empties:Array = new Array();
	
	var startLookin:int = 0;
	if(answersOnly)startLookin = eqArray.length - 2;
	
	for(var i:int = startLookin;i<eqArray.length;i++){
		
		var thisNum:int = eqArray[i];
		if(thisNum < 10){
			possibleOptions.Push(i);
		}
		
	}
	
	if(numOfOptions > possibleOptions.length)numOfOptions = possibleOptions.length;
	
	for(var ii:int = 0;ii<numOfOptions;ii++){
		
		var randomNum:int = Random.Range(0, possibleOptions.length);
		empties.Push(possibleOptions[randomNum]);
		possibleOptions.RemoveAt(randomNum);
		
	}
	
	return empties;
	
}
	
	
	
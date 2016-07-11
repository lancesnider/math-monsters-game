#pragma strict

//create random array of options
static function createOptions(numberOptions:Array, numberOfOptions:int):Array{
	
	var numEmptySpaces:int = numberOptions.length;
	var uniqNums:Array = createUniqeNumsArray(numEmptySpaces, numberOptions);
	for(var i:int = numberOptions.length;i<numberOfOptions;i++){
		numberOptions.push(uniqueRandom(uniqNums));
	}
	
	numberOptions = Funcs.RandomizeArray(numberOptions);//randomize it
	//numberOptions = [0, 2, 3, 4, 9];
	
	return numberOptions;

}

private static function createUniqeNumsArray(numberOfOptions:int, numberOptions:Array):Array{
	
	var possibleOptionsArray:Array = new Array();
	
	for(var i:int = 0;i<10;i++){
		for(var j:int = 0;j<numberOfOptions;j++){
			if(numberOptions[j] != i)possibleOptionsArray.push(i);
		}
	}
	
	return possibleOptionsArray;
	
}

private static function uniqueRandom(uniqNums:Array):int{

	
	var ranNum:int = Random.Range(0, uniqNums.length);
	
	var thisNum:int = uniqNums[ranNum];
	uniqNums.RemoveAt(ranNum);
	
	return thisNum;
	
}
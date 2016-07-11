#pragma strict

public static function verify(eqArray:Array):boolean{
	
	var redEqArray:Array = reduceEq(eqArray);
	
	return runEq(redEqArray);
		
}



private static function runEq(eqArray:Array):boolean{
	
	var eqArrLength:int = eqArray.length;
	var amount:int = eqArray[0];
	var currSym:float;
				
				
	
	for(var i:int = 1;i<eqArrLength;i++){
		
		//if(eqArray[i].GetType() != int){
		var eqItem:int = eqArray[i];
		if(eqItem > 9){
		
			var nextAmount:int = eqArray[i+1];
		
			if(eqItem == 10){//+
				amount = amount + nextAmount;
			}else if(eqItem == 11){//-
				amount = amount - nextAmount;
			}else if(eqItem == 12){//*
				amount = amount * nextAmount;
			}else if(eqItem == 13){///
				amount = amount / nextAmount;
			}else if(eqItem == 14){//<
				if(amount > nextAmount)return true;
			}else if(eqItem == 15){//>
				if(amount < nextAmount)return true;
			}else if(eqItem == 16){//=
				if(amount == nextAmount)return true;
			}
			
			i++;
			
		}
	
	}
	
	return false;
	
}

//reduce all numbers. ex: 1,2,+3,4,=,4,6 turns to 12,+,34,=,46
private static function reduceEq(eqArray:Array):Array{
	
	var newEqArray:Array = new Array();
	var lastSym:int = -1;
	var eqArrLength:int = eqArray.length;
	
	for(var i:int = 0;i<eqArrLength;i++){
		
		var thisNum:int = eqArray[i];
		
		//if(eqArray[i].GetType() != int){
		if(thisNum > 9){
		
			newEqArray.Push(arrToInt(eqArray, lastSym + 1, i - 1));
			lastSym = i;
			newEqArray.Push(eqArray[i]);
			
		}else if(i == eqArrLength - 1){
			
			newEqArray.Push(arrToInt(eqArray, lastSym + 1, eqArrLength - 1)); 
			
		}
		
	}
	
	return newEqArray;

}

//takes an array of numbers ([1,2,4]) and turns it into int (124). 
private static function arrToInt(nums:Array, firstEl:int, lastEl:int):int{
	
	var newString:String;
	
	
	for(var i:int = firstEl;i<=lastEl;i++){
	
		newString = newString + nums[i].ToString();
	
	}
	
	var stringAsNum:int = parseInt(newString);
	
	return stringAsNum;
	
}


public static function CheckFilled(eqGOArray:Array):Array{
	
	var newEqArray:Array = new Array();
	
	for(var i:int = 0;i<eqGOArray.length;i++){
		
		var thisGO:GameObject = eqGOArray[i];
		var thisNumScript:ThisNum = (thisGO.GetComponent(ThisNum) as ThisNum);
		var thisNum:int = thisNumScript.getThisNum();
		
		if(thisNum == 17){
		
			var thisEmptyScript:Empty = (thisGO.GetComponent(Empty) as Empty);
			var occupiedNum:int = thisEmptyScript.returnOccupied();
			
			if(occupiedNum == -1)return null;
			
			newEqArray.Push(occupiedNum);
			
		}else{
		
			newEqArray.Push(thisNum);
		
		}
		
	}
	
	return newEqArray;

}
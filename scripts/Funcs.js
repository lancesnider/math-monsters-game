
//randomize an array
public static function RandomizeArray(arr:Array):Array{
	
	var tempArr:Array = new Array();
	
    for (var i = arr.length; i > 0; i--) {
    	
    	var rnd = Random.Range(0,i);
    	tempArr.push(arr[rnd]);
    	arr.RemoveAt(rnd);
        
    }
    
    return tempArr;
    
}

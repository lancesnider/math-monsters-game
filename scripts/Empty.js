#pragma strict

var occupied:int = -1;//-1 means it's unoccupied
var occupiedGO:GameObject;//-1 means it's unoccupied
var previousOccGO:GameObject;

public function setOccupied(getOccupied:int, getOccupiedGO:GameObject):GameObject{

	previousOccGO = occupiedGO;

	occupied = getOccupied;
	occupiedGO = getOccupiedGO;
	
	//return what used to be in here (usually null)
	return previousOccGO;

}

public function returnOccupied():int{
	
	return occupied;
	
}

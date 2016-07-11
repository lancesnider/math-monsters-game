#pragma strict

/*

0: main menu
1: high scores
2. game over
3. game menu

*/

var menuArr:GameObject[];
var activeMenus:Array;
private var screenH:int;

function Start()
{
	
	screenH = 768;
	activeMenus = new Array();
	
}

function addMenu(menuNum:int)
{
	
	removeMenus();
	
	var menuToAdd:GameObject = menuArr[menuNum];
	menuToAdd.transform.position = Vector3(0, 0, 0);
	activeMenus.Push(menuToAdd);
	
}

private function removeMenus(){

	for(var i:int = activeMenus.length - 1;i>-1;i--){
		
		var menuToRemove:GameObject = activeMenus[i];
		menuToRemove.transform.position = Vector3(0, screenH, 0);
		activeMenus.Pop();
		
	}

}
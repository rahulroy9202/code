function process() {
	try{
		$("#out").val('');	// reset output
		var input = $("#in").val().split('\n');
		
		var insectCount = (input.length - 1) / 2;
		var insectArray = new Array(insectCount);
		
		var roomInit = input[0].split(' ');
		room = new Room(+roomInit[0], +roomInit[1]);
		
		for(var i = 0, j = 0; i < insectCount; i++) {
			j++;
			var insectInit = input[j];				// j is line with info about insect position.
			insectInit = insectInit.split(' ');		// split the values in the insect init line.	
			
			//console.log(insectInit);
			insectArray[i] = new Insect(room, +insectInit[0], +insectInit[1], insectInit[2]);		// initialize insect.
			insectArray[i].processInput(input[++j].toString());										// set their instructions.

			console.log(insectArray[i]);
		}
		
		for(var i in insectArray) {
			if(insectArray[i]) {					//will skip invalid insects.
				var out = insectArray[i].move();	//execute instructions for each insect one after the other.
				//$("#out").val($("#out").val() + out.x +' '+ out.y +' '+ out.h + ' ' + out.status +'\n');
				
			}
		}
		$("#out").val(room.peek());
	}
	catch(e) {
		$("#out").val("error- please check if input is valid- " + e.toString());
	}
}


/*

PROBLEM STATEMENT

A spy agency has built a squad of robotic insects, that are small enough to infiltrate enemy buildings. The enemy headquarters has several rectangular rooms which must be navigated by the insects in order to reach and photograph secret documents.

An insect's location is represented by x and y coordinates. It's heading is represented by one of four cardinal compass points. The room is divided into a grid to simplify navigation. An example position could be <0, 0, N>, which means that the insect is at the bottom-left corner and facing north.

Being a robot with limited computing capacity, the insect is only capable of understanding very simple commands:
L -- makes the insect turn left 90 degrees
R -- makes the insect turn right 90 degrees
F -- make the insect move forward 1 square
Assume the square directly north of <x, y> is <x, y+1>.


INPUT

The first line of input represents the size of the room with the base index being <0, 0>.

The rest of the input is data pertaining to the insects that have been deployed. Each insect has two lines of input. The first line gives the insect's position, and the second line is the sequence of commands that tell the insect where to navigate.

Each insect will finish it's navigation sequentially, which means that the second insect wont start moving until the first one has finished moving.


OUTPUT

The output for each insect should be its final coordinates and heading.


SAMPLE INPUT AND OUTPUT

Input:
5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF

Expected output:
1 3 N
5 1 E


*/
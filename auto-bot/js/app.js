function process() {
	try{
		$("#out").val('');	// reset output
		var input = $("#in").val().split('\n');
		
		var insectCount = (input.length - 1) / 2;
		var insectArray = new Array(insectCount);
		
		var boardInit = input[0].split(' ');
		var board = {
			x: boardInit[0],
			y: boardInit[1]
		}
		
		for(var i = 0, j = 0; i < insectCount; i++) {
			j++;
			var insectInit = input[j];				// j is line with info about insect position.
			insectInit = insectInit.split(' ');		// split the values in the insect init line.	
			
			console.log(insectInit);
			insectArray[i] = new Insect(board, insectInit[0], insectInit[1], insectInit[2]);		// initialize insect.
			insectArray[i].processInput(input[++j].toString());										//set them instructions.

			console.log(insectArray[i]);
		}
		
		for(var i in insectArray){
			if(insectArray[i]) {					//will skip invalid insects.
				var out = insectArray[i].move();	//execute instructions for each insect one after the other.
				$("#out").val($("#out").val() + out.x +' '+ out.y +' '+ out.h +'\n');
			}
		}
	}
	catch(e) {
		$("#out").val("execution error. please check if input is valid. ",e);
	}
	

}
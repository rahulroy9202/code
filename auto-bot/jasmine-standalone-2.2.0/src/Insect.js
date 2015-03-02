function Insect(_board, x, y, h) {
	
	if( (x >= 0 && x <= _board.x) && (y >= 0 && y <= _board.y) && 'NSEW'.indexOf(h)>-1) {
		this.board = _board;
		this.x = x;
		this.y = y;
		this.h = h;		//heading char
	}
	else
		return null;
}

Insect.prototype = {
	
	constructor: Insect,
	
	processInput: function( _line ) {		// expecting string as argument
		
		this.input = _line.split('');
		
	},
	
	
	move: function() {
		
		for(var i in this.input) {
			var x = 'LRF'.indexOf(this.input[i])
			switch(x) {
				case 0: this.turnLeft();
					break;
				case 1: this.turnRight();
					break;
				case 2: this.moveForward();
					break;
				default: return console.log("unknown instruction");
			}
			
			this.draw();					// to draw on board. <not implimented>
		}
		
		return this.output();						// console output as described in challenge.
	},
	
	moveForward: function() {
		var x = 'NSEW'.indexOf(this.h);
		
		switch(x) {
			case 0: 
				if(this.y < this.board.y)
					this.y++;			//move up
				break;
			case 1: 
				if(this.y > 0)
					this.y--;			//move down
				break;				
			case 2: 
				if(this.x < this.board.x)
					this.x++;			//move right
				break;
			case 3: 
				if(this.x > 0)
					this.x--;			//move left
				break;
				
			default: return console.log("unknown direction");
		}
	},
	
	turnLeft: function() {
		var x = 'NWSE'.indexOf(this.h);
		this.h = 'NWSE'[(x+1) % 4];		// ---> turn to next char
	},
	
	turnRight: function() {
		var x = 'NESW'.indexOf(this.h);
		this.h = 'NESW'[(x+1) % 4];
	},
	
	draw: function() {
		// TODO - Impliment Draw
	},
	
	output: function() {
		console.log("%s %s %s",this.x, this.y, this.h);
		return ({x:this.x, y:this.y, h:this.h});
	}
}
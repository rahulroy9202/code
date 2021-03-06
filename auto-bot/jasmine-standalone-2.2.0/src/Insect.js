function Insect(_room, x, y, h) {
	
	if( (x >= 0 && x <= _room.x) && (y >= 0 && y <= _room.y) && 'NSEW'.indexOf(h)>-1) {
		this.room = _room;
		this.x = x;
		this.y = y;
		this.h = h;		//heading char
		this.room.addInsect(this);
		this.state = 0;		//0 init, 1 moved, 2 damaged.
	}
	else
		throw "insect init error";
}

Insect.prototype = {
	
	constructor: Insect,
	
	processInput: function( _line ) {	// expecting string as argument. just programming the insects moves		
		this.input = _line.split('');		
	},
	
	move: function() {
	
		if(this.state !== 2) {
		
			for(var i = 0; i < this.input.length; i++) {
				
				var x = 'LRF'.indexOf(this.input[i]);
				
				switch(x) {
					case 0: this.turnLeft();
						break;
					case 1: this.turnRight();
						break;
					case 2: this.moveForward();
							if(this.room.checkCollision(this)) {
								this.state = 2;
								console.log('boom!! collided after- '+i,this);
								return;
							}
						break;
					default: throw("unknown instruction - "+this.input[i]);
				}	
				this.draw();				// to draw on room. <not implimented>
			}
			
			this.state = 1;
			return;			// console output as described in challenge.
		
		}
		else {
			console.log('boom!! damaged before moving ',this);
			return;
		}
	},
	
	moveForward: function() {
		var x = 'NSEW'.indexOf(this.h);
		
		switch(x) {
			case 0: 
				if(this.y < this.room.y)
					this.y++;			//move up
				break;
			case 1: 
				if(this.y > 0)
					this.y--;			//move down
				break;				
			case 2: 
				if(this.x < this.room.x)
					this.x++;			//move right
				break;
			case 3: 
				if(this.x > 0)
					this.x--;			//move left
				break;
			default: throw "unknown direction - unexpected senario";
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
	}
}
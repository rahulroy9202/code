function Room(x,y) {
	if(Number.isInteger(x) && Number.isInteger(y)) { // Number.isInteger is ecma script 6.0
		this.x = x;
		this.y = y;
		this.insects = [];
	}
	else
		throw "room init error";
}

Room.prototype = {
	
	constructor: Room,
	
	addInsect: function(insect) {
		if(insect instanceof Insect) {
			if (this.checkCollision(insect)) {
				throw "two insect in one cell";
			}
			this.insects.push(insect);
		}
		else
			throw "not insect - cannot add to room";
	},
	
	checkCollision: function(insect) {
		
		for(var i in this.insects) {
			
			if( (this.insects[i] instanceof Insect) && (this.insects[i] !== insect) && (this.insects[i].x === insect.x) && (this.insects[i].y === insect.y) ) { // appropriate type check inserted.
				
				this.insects[i].state = 2;
				return this.insects[i];
				
			}
		}
		return false;
	},
	
	peek: function() {
		
		var result = '';
		for(var i in this.insects) {
			
			if(this.insects[i] instanceof Insect) {		// appropriate type check inserted.
				
				result += this.insects[i].x.toString() + ' ' + this.insects[i].y.toString() + ' ' + this.insects[i].h;
				
				if(this.insects[i].state === 2)
					result += " damaged";
				
				result += "\n";
			}
		}
		return result;
	},

}

/*

5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF
1 2 N
LFLFLFLFF



5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF
1 4 N
LFLFLFLFF

*/
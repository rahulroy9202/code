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
			this.insects.push(insect);
			if (this.checkCollision(insect))
				throw "two insect in one cell";
		}
	},
	
	checkCollision: function(insect) {
		for(var i in this.insects){
			if( (this.insects[i] !== insect) && (this.insects[i].x === insect.x) && (this.insects[i].y === insect.y) )
				return this.insects[i];
		}
		return false;
	}

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
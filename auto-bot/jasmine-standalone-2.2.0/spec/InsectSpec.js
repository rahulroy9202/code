describe("Insect - functional test", function() {
	var room;
	var insect;
	var insect2;
	
	beforeEach(function() {
		room = new Room(5,5);
		insect = new Insect(room, 1, 2, 'N');
		insect2 = new Insect(room, 3, 3, 'E');
	});
	
	it("1 2 N -- > should be able to move LFLFLFLFF -- > 1 3 N", function() {
		insect.processInput('LFLFLFLFF');
		insect.move()
		expect(insect.x).toEqual(1);
		expect(insect.y).toEqual(3);
		expect(insect.h).toEqual('N');
		
	});
	
	it("3 3 E -- > should be able to move FFRFFRFRRF -- > 5 1 E", function() {
		insect2.processInput('FFRFFRFRRF');
		insect2.move()
		expect(insect2.x).toEqual(5);
		expect(insect2.y).toEqual(1);
		expect(insect2.h).toEqual('E');
		
	});
});

describe("Insect - unit test", function() {
	var room;
	var insect;
	var insect2;
	
	beforeEach(function() {
		room = new Room(5,5);
		insect = new Insect(room, 1, 2, 'N');
		insect2 = new Insect(room, 2, 2, 'E');
	});
	
	it("1 2 N -- > should be able to move forward F -- > 1 3 N", function() {
		insect.processInput('F');
		insect.move()
		expect(insect.x).toEqual(1);
		expect(insect.y).toEqual(3);
		expect(insect.h).toEqual('N');
		
	});
	
	it("1 2 N -- > should be able to turn left L -- > 1 2 W", function() {
		insect.processInput('L');
		insect.move()
		expect(insect.x).toEqual(1);
		expect(insect.y).toEqual(2);
		expect(insect.h).toEqual('W');
		
	});
	
	it("1 2 N -- > should be able to turn right R -- > 1 2 E", function() {
		insect.processInput('R');
		insect.move()
		expect(insect.x).toEqual(1);
		expect(insect.y).toEqual(2);
		expect(insect.h).toEqual('E');
		
	});
	
	it("1 2 N -- > should get stuck at wall on 5 FFFFFFFFFFFFFFF -- > 1 5 N", function() {
		insect.processInput('FFFFFFFFFFFFFFF');
		insect.move()
		expect(insect.x).toEqual(1);
		expect(insect.y).toEqual(5);
		expect(insect.h).toEqual('N');
		
	});
	
	it("1 2 N -- > should crash and break(both) on collision with insect RFFFFFFFF -- > 1 5 N", function() {
		insect.processInput('RFFFFFFFF');
		insect.move()
		expect(insect.x).toEqual(2);
		expect(insect.y).toEqual(2);
		expect(insect.h).toEqual('E');
		expect(insect.state).toEqual(2);
		expect(insect2.state).toEqual(2);
	});
	
	
});

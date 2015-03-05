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
		expect(insect.move()).toEqual({x: 1, y: 3, h: "N", status: ''});
		
	});
	
	it("3 3 E -- > should be able to move FFRFFRFRRF -- > 5 1 E", function() {
		insect2.processInput('FFRFFRFRRF');
		expect(insect2.move()).toEqual({x: 5, y: 1, h: "E", status: ''});
		
	});
});

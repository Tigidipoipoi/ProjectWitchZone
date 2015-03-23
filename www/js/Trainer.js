var Trainer = function(teamIds) {
	this.fighters = [];
	this.fighters[0] = new Fighter(teamIds[0]);
	this.fighters[1] = new Fighter(teamIds[1]);
	this.fighters[2] = new Fighter(teamIds[2]);

	this.currentFightersIndex = 0;
};

var Trainer = function(teamIds, isPlayer) {
	this.isPlayer = isPlayer;

	this.fighters = [];
	this.fighters[0] = new Fighter(teamIds[0], isPlayer);
	this.fighters[1] = new Fighter(teamIds[1], isPlayer);
	this.fighters[2] = new Fighter(teamIds[2], isPlayer);

	this.currentFighterIndex = 0;
};

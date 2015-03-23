var BattleScene = function(game, id) {
	var self = this;
	this.game = game;

	this.background = new Image();
	this.background.src = "img/IncantationCircle.png";

	this.id = id;

	this.isDrawing = false;

	this.player = new Trainer([0, 9, 14]);

	// Foe
	var foesTeam = [];
	foesTeam[0] = getRandomInt(0, 15);

	foesTeam[1] = getRandomInt(0, 15);
	do {
		foesTeam[1] = getRandomInt(0, 15);
	} while (foesTeam[1] == foesTeam[0]);

	foesTeam[2] = getRandomInt(0, 15);
	do {
		foesTeam[2] = getRandomInt(0, 15);
	} while (foesTeam[2] == foesTeam[1]
		|| foesTeam[2] == foesTeam[0]);

	this.foe = new Trainer(foesTeam);

	// Clamps
	this.clampPoints = [];
	for (var i = 0; i < 4; ++i) {
		this.clampPoints[i] = document.getElementById("cast-point" + i);
		this.clampPoints[i].addEventListener("click", function(e) {
			if (self.isDrawing) {
				var pointsOfCastLength = self.pointsOfCast.length;

				if (self.pointsOfCast[pointsOfCastLength - 1] != this
					&& self.pointsOfCast[pointsOfCastLength - 2] != this) {
					self.pointsOfCast[pointsOfCastLength] = this;

					if (pointsOfCastLength == 3) {
						self.isDrawing = false;

						var currentElement = self.getElementFromDraw();
						var canCast = self.canCast(currentElement);
						if (canCast) {
							self.cast(currentElement);
						}
						else {
							console.log("You can't use this element with your current weapon");
						}
					}
				}
			}
			else {
				self.pointsOfCast = [];
				self.pointsOfCast[0] = this;
				self.isDrawing = true;
			}
		}, false);
	}	

	this.pointsOfCast = [];

	sceneDebug = this;
};

BattleScene.prototype.getElementFromDraw = function() {
	var ids = [];

	for (var i = 0; i < 4; ++i) {
		ids[i] = this.pointsOfCast[i].id.substring(10, 11);
	}

	var spellsElement = "";
	// Earth
	if (parseInt(ids[0]) == parseInt(ids[3])) {
		spellsElement = "Earth";
	}
	// Fire
	else if ((parseInt(ids[0]) + 2) % 4 == parseInt(ids[1])) {
		spellsElement = "Fire";
	}
	// Wind
	else if ((parseInt(ids[1]) + 2) % 4 == parseInt(ids[2])) {
		spellsElement = "Wind";
	}
	// Water
	else if ((parseInt(ids[0]) + 2) % 4 == parseInt(ids[2])) {
		spellsElement = "Water";
	}

	return spellsElement;
};

BattleScene.prototype.canCast = function(currentElement) {
	var currentFighter = this.player.fighters[this.player.currentFightersIndex]; 
	var currentWeapon = currentFighter
		.weapons[currentFighter.selectedWeaponIndex];

	var spellIsAvailable = false;
	for (var i = 0; i < 2; ++i) {
		if (currentElement == currentWeapon.spells[i].element) {
			spellIsAvailable = true;
		}
	}
	
	return spellIsAvailable;
};

BattleScene.prototype.cast = function(currentElement) {
	console.log("Cast");

	// Compute damages
};

BattleScene.prototype.clampHandling = function(e) {
	if (self.isDrawing) {
		var pointsOfCastLength = self.pointsOfCast.length;

		if (self.pointsOfCast[pointsOfCastLength - 1] != this
			&& self.pointsOfCast[pointsOfCastLength - 2] != this) {
			self.pointsOfCast[pointsOfCastLength] = this;

			if (pointsOfCastLength == 3) {
				self.isDrawing = false;

				var canCast = self.canCast();
				if (canCast) {
					console.log("Cast");
				}
			}
		}
	}
	else {
		self.pointsOfCast = [];
		self.pointsOfCast[0] = this;
		self.isDrawing = true;
	}
};

BattleScene.prototype.update = function(timeData) {
};

BattleScene.prototype.render = function(g) {
	g.save();
		if (this.background.complete) {
			g.translate(-this.x, -this.y);
			g.drawImage(this.background, 0, 0);
		}
	g.restore();
};

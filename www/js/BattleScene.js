var BattleScene = function(game, fightersIds) {
	var self = this;

	this.game = game;
	this.game.canvas.addEventListener("click", function(e) {
		var offset = getOffset(self.game.canvas);
		self.onClick(
			(e.clientX - offset.left),
			(e.clientY - offset.top));
	});

	this.background = this.game.assetManager.getImage("incantation-circle");

	this.isDrawing = false;

	this.player = new Trainer(fightersIds, true);

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

	this.foe = new Trainer(foesTeam, false);

	// Clamps
	this.clampPoints = [new Point(100, 100, 80), new Point(100, 500, 80),
		new Point(500, 500, 80), new Point(500, 100, 80)];
	for (var i = 0; i < this.clampPoints.length; ++i) {
		this.clampPoints[i].id = i;
	}

	// weapon selection slot
	this.weaponSelectionSlots = [new Point(700, 150, 120),
		new Point(700, 450, 120)];

	this.touchedPoints = [];

	debugBattleScene = this;
};

BattleScene.prototype.getElementFromDraw = function() {
	var ids = [];

	for (var i = 0; i < 4; ++i) {
		ids[i] = this.touchedPoints[i].id;
	}

	var spellsElement = Element.NONE;
	// Earth
	if (parseInt(ids[0]) == parseInt(ids[3])) {
		spellsElement = Element.EARTH;
	}
	// Fire
	else if ((parseInt(ids[0]) + 2) % 4 == parseInt(ids[1])) {
		spellsElement = Element.FIRE;
	}
	// Wind
	else if ((parseInt(ids[1]) + 2) % 4 == parseInt(ids[2])) {
		spellsElement = Element.WIND;
	}
	// Water
	else if ((parseInt(ids[0]) + 2) % 4 == parseInt(ids[2])) {
		spellsElement = Element.WATER;
	}

	return spellsElement;
};

BattleScene.prototype.checkPossibleCast = function(currentElement) {
	var currentFighter =
		this.player.fighters[this.player.currentFighterIndex];
	var currentWeapon =
		currentFighter.weapons[currentFighter.currentWeaponIndex];

	var spellIsPossible = false;
	for (var i = 0; i < 2; ++i) {
		if (currentElement == currentWeapon.availableElements[i]) {
			spellIsPossible = true;
		}
	}

	return spellIsPossible;
};

BattleScene.prototype.stockPlayerSpell = function(currentElement) {
	var playerFighter =
		this.player.fighters[this.player.currentFighterIndex];
	var foeFighter = this.foe.fighters[this.foe.currentFighterIndex];

	this.playerSpell = new Spell(currentElement, playerFighter, foeFighter);
};

BattleScene.prototype.stockFoeSpell = function() {
	var playerFighter = this.player.fighters[this.player.currentFighterIndex];
	var foeFighter = this.foe.fighters[this.foe.currentFighterIndex];
	var foeWeapon = foeFighter.weapons[foeFighter.currentWeaponIndex];
	var rngIndex = getRandomInt(0, 2);
	var currentElement = foeWeapon.availableElements[rngIndex];

	this.foeSpell = new Spell(currentElement, foeFighter, playerFighter);
};

BattleScene.prototype.onClick = function(x, y) {
	x /= this.game.scale;
	y /= this.game.scale;

	var activeClampPoints = 0;

	if (this.player.fighters[this.player.currentFighterIndex].currentWeaponIndex
		> -1) {
		// Checking if we have clicked on incantation points
		for (var i = 0; i < this.clampPoints.length; ++i) {
			if (this.clampPoints[i].doesCollide(x, y)) {
				var tPtsLength = this.touchedPoints.length;

				// We don't add last touched and previous last touched
				if (this.touchedPoints[tPtsLength - 1] != this.clampPoints[i]
					&& this.touchedPoints[tPtsLength - 2] != this.clampPoints[i]) {
					this.clampPoints[i].active = true;
					this.touchedPoints[tPtsLength] = this.clampPoints[i];

					if (tPtsLength == 3) {
						this.tryToCast();
					}
					break;
				}
			}
		}	
	}
	
	// Checking for the weapon selection
	for (var i = 0; i < this.weaponSelectionSlots.length; ++i) {
		if (this.weaponSelectionSlots[i].doesCollide(x, y)) {
			this.player.fighters[this.player.currentFighterIndex]
				.currentWeaponIndex = i;
		}
	}
};

BattleScene.prototype.tryToCast = function() {
	var currentElement = this.getElementFromDraw();
	var canCast = this.checkPossibleCast(currentElement);

	this.resetDraw();
	if (!canCast) {
		console.log("You can't use this element with your current weapon.");
		return;
	}

	this.stockPlayerSpell(currentElement);
	this.stockFoeSpell();

	this.sortSpellsBySpeed();

	this.battlePhase();
};

BattleScene.prototype.resetDraw = function() {
	this.touchedPoints = [];
	this.isDrawing = false;

	for (var i = 0; i < this.clampPoints.length; ++i) {
		this.clampPoints[i].active = false;
	}
};

BattleScene.prototype.sortSpellsBySpeed = function() {
	this.spellsToCast = [];
	var foeFighter = this.foe.fighters[this.foe.currentFighterIndex];
	var playerFighter = this.player.fighters[this.player.currentFighterIndex];

	if (playerFighter.speed > foeFighter.speed) {
		this.spellsToCast[0] = this.playerSpell;
		this.spellsToCast[1] = this.foeSpell;
	}
	else if (playerFighter.speed < foeFighter.speed) {
		this.spellsToCast[0] = this.foeSpell;
		this.spellsToCast[1] = this.playerSpell;
	}
	// Same speed
	else {
		var rng = getRandomInt(0, 2);
		if (rng % 2 == 1) {
		this.spellsToCast[0] = this.playerSpell;
		this.spellsToCast[1] = this.foeSpell;
		}
		else {
		this.spellsToCast[0] = this.foeSpell;
		this.spellsToCast[1] = this.playerSpell;
		}
	}

	delete this.foeSpell;
	delete this.playerSpell;
};

BattleScene.prototype.battlePhase = function() {
	var spellsToCastCount = this.spellsToCast.length;
	var deadTarget = null;

	for (var i = 0; i < spellsToCastCount; ++i) {
		console.log(this.spellsToCast[i].caster.isInPlayerTeam
			? "Your turn: " : "Foe's turn: ");
		var targetIsAlive = this.spellsToCast[i].cast();

		if (!targetIsAlive) {
			deadTarget = this.spellsToCast[i].target;
			break;
		}
	}
	delete this.spellsToCast;

	if (deadTarget != null) {
		this.changeCurrentFighter(deadTarget.isInPlayerTeam
			? this.player : this.foe);
	}
	
	// Change foe's weapon
	this.foe.fighters[this.foe.currentFighterIndex]
		.currentWeaponIndex = getRandomInt(0, 2);
};

BattleScene.prototype.changeCurrentFighter = function(trainer) {
	var currentFighter = trainer.isPlayer
		? this.player.fighters[this.player.currentFighterIndex]
		: this.foe.fighters[this.foe.currentFighterIndex];
	var oldFighterName = currentFighter.name;

	++trainer.currentFighterIndex;
	if(trainer.currentFighterIndex < 3) {
		currentFighter = trainer.fighters[trainer.currentFighterIndex];
		console.log((trainer.isPlayer ? "You replaced " : "Foe replaced ")
			+ oldFighterName + " by " + currentFighter.name);
	}
	// No more fighters in team
	else {
		console.log(trainer.isPlayer
			? "You have lost..."
			: "You have won!");
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
		var currentFighter =
			this.player.fighters[this.player.currentFighterIndex];

		// Renders the clamp points
		for(var i = 0 ; i < this.clampPoints.length; ++i) {
			this.clampPoints[i].render(g);
		}

		// Renders the weapon selection
		for (var i = 0; i < this.weaponSelectionSlots.length; ++i) {
			this.weaponSelectionSlots[i].image = currentFighter.weapons[i].image;
			this.weaponSelectionSlots[i].render(g);
		}

		// Renders the draw
		var touchedPointsLength = this.touchedPoints.length;
		if (touchedPointsLength > 0) {
			var currentIndex = touchedPointsLength - 1;
			var previousIndex = currentIndex - 1;

			while (previousIndex >= 0) {
				drawLine(this.touchedPoints[previousIndex],
					this.touchedPoints[currentIndex]);

				--currentIndex;
				--previousIndex;
			}

			var scaledMousePos = {};
			scaledMousePos.x = this.game.mousePosition.x / this.game.scale;
			scaledMousePos.y = this.game.mousePosition.y / this.game.scale;
			drawLine(this.touchedPoints[touchedPointsLength - 1], scaledMousePos);
		}

		// Renders the trainers
		this.player.render(g);
		this.foe.render(g);
	g.restore();
};

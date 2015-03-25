var BattleScene = function(game, id) {
	var self = this;
	this.game = game;

	this.background = new Image();
	this.background.src = "img/IncantationCircle.png";

	this.id = id;

	this.isDrawing = false;

	this.player = new Trainer([0, 9, 14], true);

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
	
	this.currentEnemyFighter =
		this.foe.fighters[this.foe.currentFightersEnemyIndex];
	this.currentPlayerFighter =
		this.player.fighters[this.player.currentFightersPlayerIndex]; 

	// Clamps
	this.clampPoints = [new Point(100, 100), new Point(100, 500),
		new Point(500, 500), new Point(500, 100)];
	for (var i = 0; i < this.clampPoints.length; ++i) {
		this.clampPoints[i].id = i;
	}

	this.touchedPoints = [];

	sceneDebug = this;
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
		this.player.fighters[this.player.currentFightersPlayerIndex]; 
	var currentWeapon =
		currentFighter.weapons[currentFighter.selectedWeaponIndex];

	var spellIsPossible = false;
	for (var i = 0; i < 2; ++i) {
		if (currentElement == currentWeapon.availableElements[i]) {
			spellIsPossible = true;
		}
	}
	
	return spellIsPossible;
};

BattleScene.prototype.stockPlayerSpell = function(currentElement) {
	console.log("Stock player's spell");
	this.playerSpell = new Spell(currentElement,
		this.currentPlayerFighter, this.currentEnemyFighter);
};

BattleScene.prototype.stockEnemySpell = function() {
	console.log("Stock enemy's spell");
	var enemyFighter = this.currentEnemyFighter;
	var enemyWeapon = enemyFighter.weapons[enemyFighter.selectedWeaponIndex];
	var rngIndex = getRandomInt(0, 2);
	var currentElement = enemyWeapon.availableElements[rngIndex];

	this.enemySpell = new Spell(currentElement,
		this.currentEnemyFighter, this.currentPlayerFighter);
}

BattleScene.prototype.update = function(timeData) {
};

BattleScene.prototype.render = function(g) {
	g.save();
		if (this.background.complete) {
			g.translate(-this.x, -this.y);
			g.drawImage(this.background, 0, 0);
		}
		for(var i = 0 ; i < this.clampPoints.length; ++i) {
			this.clampPoints[i].render(g);
		}
	g.restore();
};

function drawLine(firstPoint, secondPoint) {
	var canvas = document.getElementById('game');
	var g = canvas.getContext('2d');
	g.beginPath();
	g.moveTo(20,100);
	g.lineTo(200,10);
	g.strokeStyle = "black";
	g.stroke(); 
	g.closePath();
}  

BattleScene.prototype.onClick = function(x, y) {
	var activeClampPoints = 0;

	for (var i = 0; i < this.clampPoints.length; ++i) {
		if (Math.pow(this.clampPoints[i].x - x, 2) 
			+ Math.pow(this.clampPoints[i].y - y, 2) < Math.pow(40, 2)) {
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
	this.stockEnemySpell();

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

	if (this.currentPlayerFighter.speed > this.currentEnemyFighter.speed) {
		this.spellsToCast[0] = this.playerSpell;
		this.spellsToCast[1] = this.enemySpell;
	}
	else if (this.currentPlayerFighter.speed < this.currentEnemyFighter.speed) {
		this.spellsToCast[0] = this.enemySpell;
		this.spellsToCast[1] = this.playerSpell;
	}
	// Same speed
	else {
		var rng = getRandomInt(0, 2);
		if (rng % 2 == 1) {
		this.spellsToCast[0] = this.playerSpell;
		this.spellsToCast[1] = this.enemySpell;
		}
		else {
		this.spellsToCast[0] = this.enemySpell;
		this.spellsToCast[1] = this.playerSpell;
		}
	}
};

BattleScene.prototype.battlePhase = function() {
	var spellsToCastCount = this.spellsToCast.length;
	var deadTarget = null;

	for (var i = 0; i < spellsToCastCount; ++i) {
		var targetIsAlive = this.spellsToCast[i].cast();

		if (!targetIsAlive) {
			deadTarget = this.spellsToCast[i].target;
			break;
		}
	}

	if (deadTarget != null) {
		console.log(deadTarget.name + " is dead, must change.");
	}
};

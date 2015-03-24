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
	
	this.currentEnemyFighter = this.foe.fighters[this.foe.currentFightersEnemyIndex];
	this.currentPlayerFighter = this.player.fighters[this.player.currentFightersPlayerIndex]; 

	// Clamps
	
		this.clampPoints = [new Point(100,100),new Point(100,500),new Point(500,500),new Point(500,100)];
		/*for (var i = 0; i < 4; ++i) {
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
								this.playerCanAttack = false;
								var enemySpell = self.currentEnemyFighter.weapons[self.currentEnemyFighter.enemySelectedWeaponIndex].spells[0].element;
								self.enemyCast(enemySpell);
								drawLine();
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
		}	*/
		

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

BattleScene.prototype.canCast = function(currentElement) {
	var currentFighter = this.player.fighters[this.player.currentFightersPlayerIndex]; 
	var currentWeapon = currentFighter.weapons[currentFighter.selectedWeaponIndex];

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
	var multiplicator = 1;
	if (currentElement == this.currentEnemyFighter.weakness)
	{
		multiplicator = 1.5;
	}
	else if (currentElement == this.currentEnemyFighter.toughness)
	{
		multiplicator = 0.5;
	}
	
	this.currentEnemyFighter.hp = Math.max(0, this.currentEnemyFighter.hp-(this.currentPlayerFighter.power * multiplicator));
	console.log(this.currentEnemyFighter.hp);
	if (this.currentEnemyFighter.hp == 0)
	{
		this.foe.currentFightersEnemyIndex++;
		if(this.foe.currentFightersEnemyIndex < 3)
		{		
			this.currentEnemyFighter = this.foe.fighters[this.foe.currentFightersEnemyIndex];
			console.log("il est mort, au suivant");
		}
		else 
			console.log("j'ai gagné");
		
	}
	
	// Compute damages
};

BattleScene.prototype.enemyCast = function(currentElement)
{
	console.log("EnemyCast");
	var multiplicator = 1;
	if (currentElement == this.currentPlayerFighter.weakness)
	{
		multiplicator = 1.5;
	}
	else if (currentElement == this.currentPlayerFighter.toughness)
	{
		multiplicator = 0.5;
	}
	
	this.currentPlayerFighter.hp = Math.max(0, this.currentPlayerFighter.hp-(this.currentEnemyFighter.power * multiplicator));
	console.log("currentPlayerHP : "+this.currentPlayerFighter.hp);
	if (this.currentPlayerFighter.hp == 0)
	{
		this.player.currentFightersPlayerIndex++;
		if(this.player.currentFightersPlayerIndex < 3)
		{		
			this.currentPlayerFighter = this.player.fighters[this.player.currentFightersPlayerIndex];
			console.log("j'ai perdu un combattant arg !");
		}
		else 
			console.log("j'ai perdu");
		
	}
	this.playerCanAttack = true;
}

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
		for(var i = 0 ; i < this.clampPoints.length; i++)
		{
			this.clampPoints[i].render(g);
		}
	g.restore();
	
	
	
};

function drawLine(firstPoint, secondPoint)
{
	var canvas = document.getElementById('game');
	var g = canvas.getContext('2d');
	g.beginPath();
	g.moveTo(20,100);
	g.lineTo(200,10);
	g.strokeStyle = "black";
	g.stroke(); 
	g.closePath();
}  

BattleScene.prototype.onClick = function(x,y)
{
	for(var i = 0; i<this.clampPoints.length;i++)
	{
		//if (this.clampPoints[i].x < x+40 && this.clampPoints[i].x > x-40 && this.clampPoints[i].y < y+40 && this.clampPoints[i].y > y-40)
		if(((this.clampPoints[i].x-x)*(this.clampPoints[i].x-x)+(this.clampPoints[i].y-y)*(this.clampPoints[i].y-y)) < 40*40)
		{
			this.clampPoints[i].active = true ;
		}
	}
};

 
 

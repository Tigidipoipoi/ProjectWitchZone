var CharacterScene = function(game, id) {
	var self = this;
	this.game = game;

	this.background = this.game.assetManager.getImage("incantation-circle");

	this.initCharacterList();
	
	this.player = new Trainer([1, 9, 14], true);
	
	debugCharacterScene = this;
};


CharacterScene.prototype.initCharacterList = function() {
	var self = this;

	// Fighters list
	
	var fighterListUl = document.getElementById("fighter-list");
	for (var i = 0; i < 15; ++i) {
		var fighter = new Fighter(i, false);

		var fighterLi = document.createElement("li");
		fighterLi.className = "fighter-selection";

		var fighterImg = document.createElement("img");
		fighterImg.src = fighter.image.src;
		fighterImg.alt = i.toString();
		
		fighterLi.appendChild(fighterImg);
		
		fighterLi.addEventListener("click", function () {
			self.fighterListSelected(this, fighterListUl);
		});
		
		fighterListUl.appendChild(fighterLi);
	}

	//	Player Team
	var fighterTeamUl = document.getElementById("player-team");
	this.selectedPlayerFighter = fighterTeamUl.children[0];

	for (var i = 0; i < 3; ++i) {
		fighterTeamUl.children[i].addEventListener("click", function () {
			self.fighterTeamSelected(this, fighterTeamUl);
		});
	}

	// Buttons
	this.addButton = document.getElementById("add-fighter");
	this.removeButton = document.getElementById("remove-fighter");
	this.battleButton = document.getElementById("confirm-team");
	this.tooltipRight = document.getElementById("tooltip-right");
	this.tooltipLeft = document.getElementById("tooltip-left");

	this.addButton.addEventListener("click", function () {
		self.addButtonAction(fighterListUl);
	});

	this.removeButton.addEventListener("click", function () {
		self.removeButtonAction(fighterListUl);
	});

	this.battleButton.addEventListener("click", function () {
		self.battleButtonAction(fighterTeamUl);
	})
};

CharacterScene.prototype.addButtonAction = function(fighterListUl) {
	for (var i = 0; i < 15; ++i) {
		// Equivalent to contains()
		if (fighterListUl.children[i].className.indexOf("selected") == -1) {
			continue;
		}

		// Activates removeButton
		if (this.removeButton.attributes.getNamedItem("disabled")) {
			this.removeButton.attributes.removeNamedItem("disabled");
		}

		var fightersImage = fighterListUl.children[i].children[0];

		if (fightersImage) {
			var previousFighter = this.selectedPlayerFighter.children[0];
			if (previousFighter) {
				fighterListUl.children[previousFighter.alt]
					.appendChild(previousFighter);
			}

			this.selectedPlayerFighter.appendChild(fightersImage);
		}

		this.tryToEnableStartBattle();

		break;
	}
};

CharacterScene.prototype.removeButtonAction = function(fighterListUl) {
	this.removeButton.attributes.setNamedItem(document.createAttribute("disabled"));

	var previousFighter = this.selectedPlayerFighter.children[0];
	fighterListUl.children[previousFighter.alt].appendChild(previousFighter);

	if (!this.battleButton.attributes.getNamedItem("disabled")) {
		this.battleButton.attributes.setNamedItem(document.createAttribute("disabled"));
	}
};

CharacterScene.prototype.battleButtonAction = function(fighterTeamUl) {
	var fightersIds = [];
	for (var i = 0; i < 3; ++i) {
		fightersIds[i] = parseInt(fighterTeamUl.children[i].children[0].alt);
	}

	this.game.enterBattleScene(fightersIds);
};

CharacterScene.prototype.fighterTeamSelected = function(clickedElement, fighterTeamUl) {
	for (var i = 0; i < 3; ++i) {
		fighterTeamUl.children[i].className = "fighter-selection";
	}

	if (clickedElement.children[0]) {
		var fighter = new Fighter(clickedElement.children[0].alt, false);
		
		// Name
		this.tooltipLeft.children[0].innerHTML = "name: " + fighter.name;
		
		// Weakness
		var weaknessImg = document.createElement("img");
		weaknessImg.src = getElementImage(fighter.weakness).src;
		if (this.tooltipLeft.children[2].children[0] != null) {
			this.tooltipLeft.children[2].children[0].src = weaknessImg.src;
		}
		else {
			this.tooltipLeft.children[2].appendChild(weaknessImg);
		}

		// Toughness
		var toughnessImg = document.createElement("img");
		toughnessImg.src = getElementImage(fighter.toughness).src;
		if (this.tooltipLeft.children[4].children[0] != null) {
			this.tooltipLeft.children[4].children[0].src = toughnessImg.src;
		}
		else {
			this.tooltipLeft.children[4].appendChild(toughnessImg);
		}
	}

	this.selectedPlayerFighter = clickedElement;
	clickedElement.className = "fighter-selection selected";
	if (clickedElement.children.length > 0) {
		if (this.removeButton.attributes.getNamedItem("disabled")) {
			this.removeButton.attributes.removeNamedItem("disabled");
		}
	}
	else {
		this.removeButton.attributes.setNamedItem(document.createAttribute("disabled"));
	}
};

CharacterScene.prototype.fighterListSelected = function(clickedElement, fighterListUl) {
	for (var i = 0; i < 15; ++i) {
		fighterListUl.children[i].className = "fighter-selection";
	}

	if (clickedElement.children[0]) {
		var fighter = new Fighter(clickedElement.children[0].alt, false);
		
		// Name
		this.tooltipRight.children[0].innerHTML = "name: " + fighter.name;
		
		// Weakness
		var weaknessImg = document.createElement("img");
		weaknessImg.src = getElementImage(fighter.weakness).src;
		if (this.tooltipRight.children[2].children[0] != null) {
			this.tooltipRight.children[2].children[0].src = weaknessImg.src;
		}
		else {
			this.tooltipRight.children[2].appendChild(weaknessImg);
		}

		// Toughness
		var toughnessImg = document.createElement("img");
		toughnessImg.src = getElementImage(fighter.toughness).src;
		if (this.tooltipRight.children[4].children[0] != null) {
			this.tooltipRight.children[4].children[0].src = toughnessImg.src;
		}
		else {
			this.tooltipRight.children[4].appendChild(toughnessImg);
		}
	}
	
	clickedElement.className = "fighter-selection selected";
	if (this.addButton.attributes.getNamedItem("disabled")) {
		this.addButton.attributes.removeNamedItem("disabled");
	}
};

CharacterScene.prototype.tryToEnableStartBattle = function() {
	var fighterTeamUl = document.getElementById("player-team");
	var selectedFighterCount = 0;

	for (var i = 0; i < 3; ++i) {
		if (fighterTeamUl.children[i].children[0] != null) {
			++selectedFighterCount;
		}
	}

	if (selectedFighterCount == 3) {
		if (this.battleButton.attributes.getNamedItem("disabled")) {
			this.battleButton.attributes.removeNamedItem("disabled");
		}
	}
};

CharacterScene.prototype.update = function(timeData) {
};

CharacterScene.prototype.render = function(g) {
};

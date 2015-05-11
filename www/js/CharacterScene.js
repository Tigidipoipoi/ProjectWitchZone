var CharacterScene = function(game, id) {
	var self = this;
	this.game = game;

	this.background = this.game.assetManager.getImage("incantation-circle");

	this.initCharacterList();
	
	this.player = new Trainer([1, 9, 14], true);
	
	debugScene = this;
};

CharacterScene.prototype.initCharacterList = function() {
	var self = this;
	
	var ulElement = document.getElementById("fighter-list");
	
	for (var i = 0; i < 15; ++i) {
		var fighter = new Fighter(i, false);

		var fighterLi = document.createElement("li");
		fighterLi.className = "fighter-selection";
		fighterLi.value = i.toString();

		var fighterImg = document.createElement("img");
		fighterImg.src = fighter.image.src;
		
		fighterLi.appendChild(fighterImg);
		
		fighterLi.addEventListener("click", function () {
			for (var i = 0; i < 15; ++i) {
				ulElement.children[i].className = "fighter-selection";
			}
			
			this.className = "fighter-selection selected";
		});
		
		ulElement.appendChild(fighterLi);
	}
};

CharacterScene.prototype.update = function(timeData) {
};

CharacterScene.prototype.render = function(g) {
};

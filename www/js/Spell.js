var Spell = function(element, caster, target) {
	this.element = element;
	this.caster = caster;
	this.target = target;

	this.damages = this.computeDamages();
};

Spell.prototype.computeDamages = function() {
	var multiplicator = 1;
	if (this.element == this.target.weakness) {
		multiplicator = 1.5;
	}
	else if (this.element == this.target.toughness) {
		multiplicator = 0.5;
	}
	
	var damages = (this.caster.power * multiplicator);

	return damages;
};

Spell.prototype.cast = function() {
	this.target.hp -= this.damages;
	var targetIsAlive = this.target.hp > 0;
	console.log(this.target.name
		+ (this.target.isInPlayerTeam ? "" : " foe")
		+ " has lost " + this.damages + "HP.");

	if (targetIsAlive) {
		console.log(this.target.name
			+ (this.target.isInPlayerTeam ? "" : " foe")
			+ " has " + this.target.hp + "HP remaining.");
	}
	else {
		console.log(this.target.name
			+ (this.target.isInPlayerTeam ? "" : " foe")
			+ " is defeated.");
	}

	return targetIsAlive;
};

var Spell = function(battleScene, element, caster, target) {
	this.battleScene = battleScene;
	this.element = element;
	this.elementImage = getElementImage(this.element);
	this.caster = caster;
	this.target = target;

	this.damages = this.computeDamages();

	if (this.target.isInPlayerTeam) {
		this.startX = Fighter.HEALTH_BAR_WIDTH * 0.1 + 200;
		this.startY = Fighter.HEALTH_BAR_HEIGHT;
		this.x = this.startX;
		this.y = this.startY;
		this.targetX = Game.WIDTH * 0.75 - Fighter.HEALTH_BAR_WIDTH
			- Fighter.HEALTH_BAR_WIDTH;
		this.targetY = Game.HEIGHT - Fighter.HEALTH_BAR_HEIGHT * 3 - 80;
	}
	else {
		this.startX = Game.WIDTH * 0.75 - Fighter.HEALTH_BAR_WIDTH
			- Fighter.HEALTH_BAR_WIDTH - 40;
		this.startY = Game.HEIGHT - Fighter.HEALTH_BAR_HEIGHT * 3 - 80;
		this.x = this.startX;
		this.y = this.startY;
		this.targetX = Fighter.HEALTH_BAR_WIDTH * 0.1 + 160;
		this.targetY = Fighter.HEALTH_BAR_HEIGHT;
	}
};
Spell.ANIMATION_DURATION = 2.5 * 1000;

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

	this.battleScene.spellDoneCasting(this, targetIsAlive);
};

Spell.prototype.update = function(timeData) {
	if (!this.castTime) {
		this.castTime = timeData.local;
	}

	if (this.castTime + Spell.ANIMATION_DURATION <= timeData.local) {
		this.cast();
	}
	else {
		var factor = (timeData.local - this.castTime) / Spell.ANIMATION_DURATION;
		factor = Math.pow(factor, 2);

		this.x = factor * (this.targetX - this.startX) + this.startX;
		this.y = factor * (this.targetY - this.startY) + this.startY;
	}
};

Spell.prototype.render = function(g) {
	g.save();
		g.drawImage(this.elementImage, this.x, this.y, 50, 50);
	g.restore();
};
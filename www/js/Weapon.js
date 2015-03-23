var Weapon = function (type) {
	this.type = type;

	this.spells = [];
	if (type == "Axe") {
		this.spells[0] = new Spell("Fire");
		this.spells[1] = new Spell("Earth");
	}
	else if (type == "Bow") {
		this.spells[0] = new Spell("Fire");
		this.spells[1] = new Spell("Wind");
	}
	else if (type == "Dagger") {
		this.spells[1] = new Spell("Earth");
		this.spells[0] = new Spell("Wind");
	}
	else if (type == "Orb") {
		this.spells[0] = new Spell("Water");
		this.spells[1] = new Spell("Wind");
	}
	else if (type == "Staff") {
		this.spells[0] = new Spell("Earth");
		this.spells[1] = new Spell("Water");
	}
	else if (type == "Sword") {
		this.spells[0] = new Spell("Fire");
		this.spells[1] = new Spell("Water");
	}
};

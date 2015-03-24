var Weapon = function (type) {
	this.type = type;

	this.spells = [];

	if (type == "Axe") {
		this.spells[0] = new Spell(Element.FIRE);
		this.spells[1] = new Spell(Element.EARTH);
	}
	else if (type == "Bow") {
		this.spells[0] = new Spell(Element.FIRE);
		this.spells[1] = new Spell(Element.WIND);
	}
	else if (type == "Dagger") {
		this.spells[1] = new Spell(Element.EARTH);
		this.spells[0] = new Spell(Element.WIND);
	}
	else if (type == "Orb") {
		this.spells[0] = new Spell(Element.WATER);
		this.spells[1] = new Spell(Element.WIND);
	}
	else if (type == "Staff") {
		this.spells[0] = new Spell(Element.EARTH);
		this.spells[1] = new Spell(Element.WATER);
	}
	else if (type == "Sword") {
		this.spells[0] = new Spell(Element.FIRE);
		this.spells[1] = new Spell(Element.WATER);
	}
};

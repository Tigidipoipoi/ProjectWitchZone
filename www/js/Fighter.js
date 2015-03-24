var Fighter = function (id) {
	this.id = id;

	this.weapons = [];
	if (id == 0) {
		this.name = "Number1";

		this.weapons[0] = new Weapon("Axe");
		this.weapons[1] = new Weapon("Bow");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.FIRE;
		this.toughness = Element.WIND;
	}
	else if (id == 1) {
		this.name = "Number1";

		this.weapons[0] = new Weapon("Axe");
		this.weapons[1] = new Weapon("Dagger");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.EARTH;
		this.toughness = Element.FIRE;
	}
	else if (id == 2) {
		this.name = "Number2";

		this.weapons[0] = new Weapon("Axe");
		this.weapons[1] = new Weapon("Orb");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.WIND;
		this.toughness = Element.WATER;
	}
	else if (id == 3) {
		this.name = "Number3";

		this.weapons[0] = new Weapon("Axe");
		this.weapons[1] = new Weapon("Staff");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.WATER;
		this.toughness = Element.EARTH;
	}
	else if (id == 4) {
		this.name = "Number4";

		this.weapons[0] = new Weapon("Axe");
		this.weapons[1] = new Weapon("Sword");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.FIRE;
		this.toughness = Element.WATER;
	}
	else if (id == 5) {
		this.name = "Number5";

		this.weapons[0] = new Weapon("Bow");
		this.weapons[1] = new Weapon("Dagger");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.EARTH;
		this.toughness = Element.FIRE;
	}
	else if (id == 6) {
		this.name = "Number6";

		this.weapons[0] = new Weapon("Bow");
		this.weapons[1] = new Weapon("Orb");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.WIND;
		this.toughness = Element.EARTH;
	}
	else if (id == 7) {
		this.name = "Number7";

		this.weapons[0] = new Weapon("Bow");
		this.weapons[1] = new Weapon("Staff");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.WATER;
		this.toughness = Element.WIND;
	}
	else if (id == 8) {
		this.name = "Number8";

		this.weapons[0] = new Weapon("Bow");
		this.weapons[1] = new Weapon("Sword");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.FIRE;
		this.toughness = Element.EARTH;
	}
	else if (id == 9) {
		this.name = "Number9";

		this.weapons[0] = new Weapon("Dagger");
		this.weapons[1] = new Weapon("Orb");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.EARTH;
		this.toughness = Element.FIRE;
	}
	else if (id == 10) {
		this.name = "Number10";

		this.weapons[0] = new Weapon("Dagger");
		this.weapons[1] = new Weapon("Staff");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.WIND;
		this.toughness = Element.WATER;
	}
	else if (id == 11) {
		this.name = "Number11";

		this.weapons[0] = new Weapon("Dagger");
		this.weapons[1] = new Weapon("Sword");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.WATER;
		this.toughness = Element.WIND;
	}
	else if (id == 12) {
		this.name = "Number12";

		this.weapons[0] = new Weapon("Orb");
		this.weapons[1] = new Weapon("Staff");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.FIRE;
		this.toughness = Element.WIND;
	}
	else if (id == 13) {
		this.name = "Number13";

		this.weapons[0] = new Weapon("Orb");
		this.weapons[1] = new Weapon("Sword");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.EARTH;
		this.toughness = Element.WIND;
	}
	else if (id == 14) {
		this.name = "Number14";

		this.weapons[0] = new Weapon("Staff");
		this.weapons[1] = new Weapon("Sword");

		this.hp = 15;
		this.speed = 15;
		this.power = 5;

		this.weakness = Element.WIND;
		this.toughness = Element.WATER;
	}

	this.selectedWeaponIndex = 0;
	this.enemySelectedWeaponIndex = 0;
};

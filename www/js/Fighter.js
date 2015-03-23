var Fighter = function (id) {
	this.id = id;

	this.weapons = [];
	if (id == 0) {
		this.name = "";

		this.weapons[0] = new Weapon("Axe");
		this.weapons[1] = new Weapon("Bow");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 1) {
		this.name = "";

		this.weapons[0] = new Weapon("Axe");
		this.weapons[1] = new Weapon("Dagger");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 2) {
		this.name = "";

		this.weapons[0] = new Weapon("Axe");
		this.weapons[1] = new Weapon("Orb");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 3) {
		this.name = "";

		this.weapons[0] = new Weapon("Axe");
		this.weapons[1] = new Weapon("Staff");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 4) {
		this.name = "";

		this.weapons[0] = new Weapon("Axe");
		this.weapons[1] = new Weapon("Sword");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 5) {
		this.name = "";

		this.weapons[0] = new Weapon("Bow");
		this.weapons[1] = new Weapon("Dagger");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 6) {
		this.name = "";

		this.weapons[0] = new Weapon("Bow");
		this.weapons[1] = new Weapon("Orb");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 7) {
		this.name = "";

		this.weapons[0] = new Weapon("Bow");
		this.weapons[1] = new Weapon("Staff");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 8) {
		this.name = "";

		this.weapons[0] = new Weapon("Bow");
		this.weapons[1] = new Weapon("Sword");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 9) {
		this.name = "";

		this.weapons[0] = new Weapon("Dagger");
		this.weapons[1] = new Weapon("Orb");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 10) {
		this.name = "";

		this.weapons[0] = new Weapon("Dagger");
		this.weapons[1] = new Weapon("Staff");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 11) {
		this.name = "";

		this.weapons[0] = new Weapon("Dagger");
		this.weapons[1] = new Weapon("Sword");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 12) {
		this.name = "";

		this.weapons[0] = new Weapon("Orb");
		this.weapons[1] = new Weapon("Staff");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 13) {
		this.name = "";

		this.weapons[0] = new Weapon("Orb");
		this.weapons[1] = new Weapon("Sword");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}
	else if (id == 14) {
		this.name = "";

		this.weapons[0] = new Weapon("Staff");
		this.weapons[1] = new Weapon("Sword");

		this.hp = 15;
		this.speed = 15;
		this.power = 15;

		this.weakness = "";
		this.toughness = "";
	}

	this.selectedWeaponIndex = 0;
};

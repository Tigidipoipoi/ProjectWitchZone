WeaponType = {
	NONE: -1,
	AXE: 1,
	BOW: 2,
	DAGGER: 3,
	ORB: 4,
	STAFF: 5,
	SWORD: 6
};

var Weapon = function (type) {
	this.type = type;

	this.availableElements = [];

	if (type == WeaponType.AXE) {
		this.availableElements[0] = Element.FIRE;
		this.availableElements[1] = Element.EARTH;
		this.image = game.assetManager.getImage("Weapons.axe");
	}
	else if (type == WeaponType.BOW) {
		this.availableElements[0] = Element.FIRE;
		this.availableElements[1] = Element.WIND;
		this.image = game.assetManager.getImage("Weapons.bow");
	}
	else if (type == WeaponType.DAGGER) {
		this.availableElements[1] = Element.EARTH;
		this.availableElements[0] = Element.WIND;
		this.image = game.assetManager.getImage("Weapons.dagger");
	}
	else if (type == WeaponType.ORB) {
		this.availableElements[0] = Element.WATER;
		this.availableElements[1] = Element.WIND;
		this.image = game.assetManager.getImage("Weapons.orb");
	}
	else if (type == WeaponType.STAFF) {
		this.availableElements[0] = Element.EARTH;
		this.availableElements[1] = Element.WATER;
		this.image = game.assetManager.getImage("Weapons.staff");
	}
	else if (type == WeaponType.SWORD) {
		this.availableElements[0] = Element.FIRE;
		this.availableElements[1] = Element.WATER;
		this.image = game.assetManager.getImage("Weapons.sword");
	}
};

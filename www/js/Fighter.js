var Fighter = function (id, isInPlayerTeam) {
	id = parseInt(id);
	
	this.id = id;
	this.isInPlayerTeam = isInPlayerTeam;

	this.weapons = [];
	switch (id) {
		case 0:
			this.name = "Number0";

			this.weapons[0] = new Weapon(WeaponType.AXE);
			this.weapons[1] = new Weapon(WeaponType.BOW);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.FIRE;
			this.toughness = Element.WIND;
			
			this.image = game.assetManager.getImage("Wizards.wizard0");
			break;
		case 1:
			this.name = "Number1";

			this.weapons[0] = new Weapon(WeaponType.AXE);
			this.weapons[1] = new Weapon(WeaponType.DAGGER);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.EARTH;
			this.toughness = Element.FIRE;
			
			this.image = game.assetManager.getImage("Wizards.wizard1");
			break;
		case 2:
			this.name = "Number2";

			this.weapons[0] = new Weapon(WeaponType.AXE);
			this.weapons[1] = new Weapon(WeaponType.ORB);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.WIND;
			this.toughness = Element.WATER;
			
			this.image = game.assetManager.getImage("Wizards.wizard2");
			break;
		case 3:
			this.name = "Number3";

			this.weapons[0] = new Weapon(WeaponType.AXE);
			this.weapons[1] = new Weapon(WeaponType.STAFF);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.WATER;
			this.toughness = Element.EARTH;
			
			this.image = game.assetManager.getImage("Wizards.wizard3");
			break;
		case 4:
			this.name = "Number4";

			this.weapons[0] = new Weapon(WeaponType.AXE);
			this.weapons[1] = new Weapon(WeaponType.SWORD);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.FIRE;
			this.toughness = Element.WATER;
			
			this.image = game.assetManager.getImage("Wizards.wizard4");
			break;
		case 5:
			this.name = "Number5";

			this.weapons[0] = new Weapon(WeaponType.BOW);
			this.weapons[1] = new Weapon(WeaponType.DAGGER);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.EARTH;
			this.toughness = Element.FIRE;
			
			this.image = game.assetManager.getImage("Wizards.wizard5");
			break;
		case 6:
			this.name = "Number6";

			this.weapons[0] = new Weapon(WeaponType.BOW);
			this.weapons[1] = new Weapon(WeaponType.ORB);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.WIND;
			this.toughness = Element.EARTH;
			
			this.image = game.assetManager.getImage("Wizards.wizard6");
			break;
		case 7:
			this.name = "Number7";

			this.weapons[0] = new Weapon(WeaponType.BOW);
			this.weapons[1] = new Weapon(WeaponType.STAFF);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.WATER;
			this.toughness = Element.WIND;
			
			this.image = game.assetManager.getImage("Wizards.wizard7");
			break;
		case 8:
			this.name = "Number8";

			this.weapons[0] = new Weapon(WeaponType.BOW);
			this.weapons[1] = new Weapon(WeaponType.SWORD);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.FIRE;
			this.toughness = Element.EARTH;
			
			this.image = game.assetManager.getImage("Wizards.wizard8");
			break;
		case 9:
			this.name = "Number9";

			this.weapons[0] = new Weapon(WeaponType.DAGGER);
			this.weapons[1] = new Weapon(WeaponType.ORB);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.EARTH;
			this.toughness = Element.FIRE;
			
			this.image = game.assetManager.getImage("Wizards.wizard9");
			break;
		case 10:
			this.name = "Number10";

			this.weapons[0] = new Weapon(WeaponType.DAGGER);
			this.weapons[1] = new Weapon(WeaponType.STAFF);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.WIND;
			this.toughness = Element.WATER;
			
			this.image = game.assetManager.getImage("Wizards.wizard10");
			break;
		case 11:
			this.name = "Number11";

			this.weapons[0] = new Weapon(WeaponType.DAGGER);
			this.weapons[1] = new Weapon(WeaponType.SWORD);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.WATER;
			this.toughness = Element.WIND;
			
			this.image = game.assetManager.getImage("Wizards.wizard11");
			break;
		case 12:
			this.name = "Number12";

			this.weapons[0] = new Weapon(WeaponType.ORB);
			this.weapons[1] = new Weapon(WeaponType.STAFF);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.FIRE;
			this.toughness = Element.WIND;
			
			this.image = game.assetManager.getImage("Wizards.wizard12");
			break;
		case 13:
			this.name = "Number13";

			this.weapons[0] = new Weapon(WeaponType.ORB);
			this.weapons[1] = new Weapon(WeaponType.SWORD);

			this.hp = 15;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.EARTH;
			this.toughness = Element.WIND;
			
			this.image = game.assetManager.getImage("Wizards.wizard13");
			break;
		case 14:
			this.name = "Number14";

			this.weapons[0] = new Weapon(WeaponType.STAFF);
			this.weapons[1] = new Weapon(WeaponType.SWORD);

			this.hp = Fighter.MAX_HP;
			this.speed = 15;
			this.power = 5;

			this.weakness = Element.WIND;
			this.toughness = Element.WATER;
			
			this.image = game.assetManager.getImage("Wizards.wizard14");
			break;
	}

	// -1 if no weapon selected yet
	this.currentWeaponIndex = 0;
};
Fighter.MAX_HP = 15;
Fighter.HEALTH_BAR_WIDTH = 100;
Fighter.HEALTH_BAR_HEIGHT = 10;

Fighter.prototype.render = function(g) {
	g.save();
		if (this.isInPlayerTeam) {
			g.translate(Game.WIDTH * 0.75 - Fighter.HEALTH_BAR_WIDTH,
				Game.HEIGHT - Fighter.HEALTH_BAR_HEIGHT * 3);
		}
		else {
			g.translate(Fighter.HEALTH_BAR_WIDTH * 0.1, Fighter.HEALTH_BAR_HEIGHT);
		}

		// LifeBar
		g.strokeStyle = "black";
		g.strokeRect(0, 0, Fighter.HEALTH_BAR_WIDTH, Fighter.HEALTH_BAR_HEIGHT);
		g.fillStyle = "green";
		g.fillRect(0, 0, Fighter.HEALTH_BAR_WIDTH * (this.hp / Fighter.MAX_HP),
			Fighter.HEALTH_BAR_HEIGHT);

		// SelectedWeapon
		if (this.currentWeaponIndex > -1) {
			if (this.isInPlayerTeam) {
				g.drawImage(this.weapons[this.currentWeaponIndex].image, 40, -60,
					60, 60);
			}
			else {
				g.drawImage(this.weapons[this.currentWeaponIndex].image, 0, 10,
					60, 60);
			}
		}

		// Sprite
		if (this.isInPlayerTeam) {
			g.drawImage(this.image, -Fighter.HEALTH_BAR_WIDTH, -80, 80, 80);
		}
		else {
			g.scale(-1, 1);
			g.drawImage(this.image, -200, 0, 80, 80);
		}

	g.restore();
};

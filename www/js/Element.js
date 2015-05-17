Element = {
	NONE: 0,
	EARTH: 1,
	WIND: 2,
	FIRE: 3,
	WATER: 4
};

getElementImage = function (element) {
	if (!game) {
		return null;
	}

	switch (element) {
		case Element.EARTH:
			return game.assetManager.getImage("Elements.earth");
		case Element.WIND:
			return game.assetManager.getImage("Elements.wind");
		case Element.FIRE:
			return game.assetManager.getImage("Elements.fire");
		case Element.WATER:
			return game.assetManager.getImage("Elements.water");
		default:
			console.log("Wrong element: " + element.toString());
			return null;
	}
};

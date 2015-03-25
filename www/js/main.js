var t = Date.now();

window.addEventListener("load", function () {
	t2 = Date.now();
	console.log("Page chargée en " + (t2 - t).toString() + " ms.");

	game = new Game();
});

play = function () {
	console.log("Play!");
	game.scene = new Scene(game, 1);
};
help = function () {
	console.log("Help");
	game.scene = new Scene(game, 2);
};
options = function () {
	console.log("Options");
	game.scene = new Scene(game, 3);
};

if ('ontouchstart' in document.documentElement) {
	console.log("Touch inputs are detected!");
}

// Max excluded
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getOffset(elm) {
	var offset = {
		left:0,
		top:0
	};

	do{
		offset.left += elm.offsetLeft;
		offset.top += elm.offsetTop;
	} while(elm = elm.offsetParent);

	return offset;
}

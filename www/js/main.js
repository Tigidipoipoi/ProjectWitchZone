var t = Date.now();

window.addEventListener("load", function () {
	t2 = Date.now();
	console.log("Page chargée en " + (t2 - t).toString() + " ms.");

	document.getElementById("play-button").addEventListener("click", function() {
		game = new Game();
		document.getElementById("title-screen").className = "disabled";
		document.getElementById("fighter-selection-screen").className = "fighter-selection";
	});
});

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

function drawLine(firstPoint, secondPoint) {
	var canvas = document.getElementById('game');
	var g = canvas.getContext('2d');
	g.beginPath();
	g.moveTo(firstPoint.x, firstPoint.y);
	g.lineTo(secondPoint.x, secondPoint.y);
	g.strokeStyle = "black";
	g.stroke();
	g.closePath();
}

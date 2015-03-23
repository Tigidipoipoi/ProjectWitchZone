var Game = function() {
	var self = this;

	this.canvas = document.getElementById("game");
	this.canvas.width = Game.WIDTH;
	this.canvas.height = Game.HEIGHT;

	this.timeData = {
		global: Date.now(),
		local: 0,
		globalDelta: 0,
		localDelta: 0
	};

	this.graphics = this.canvas.getContext("2d");
	this.graphics.width = this.canvas.width;
	this.graphics.height = this.canvas.height;
	this.graphics.timeData = this.timeData;

	this.scene = new BattleScene(this, 0);

	requestAnimationFrame(function loop() {
		self.mainLoop();
		requestAnimationFrame(loop);
	});
};
Game.WIDTH = 800;
Game.HEIGHT = 600;
Game.EPSILON = 0.001;

Game.prototype.mainLoop = function() {
	var now = Date.now();
	this.timeData.globalDelta = now - this.timeData.global;
	this.timeData.global = now;
	this.timeData.localDelta = Math.min(50, this.timeData.globalDelta);
	this.timeData.local += this.timeData.localDelta;

	this.update(this.timeData);
	this.render(this.graphics);
};

Game.prototype.update = function(timeData) {
	this.scene.update(timeData);
};

Game.prototype.render = function(g) {
	g.clearRect(0, 0, g.width, g.height);
	g.setTransform(1, 0, 0, 1, 0, 0);

	g.fillStyle = "salmon";
	g.fillRect(0, 0, g.width, g.height);

	this.scene.render(g);
};
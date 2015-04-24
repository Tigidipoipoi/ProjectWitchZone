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

	this.assetManager = new AssetManager();
	this.assetManager.addLoadingListener(function() {
		self.onGameLoaded();
	});
	this.assetManager.startLoading(imageList, soundList);

	// this.scene = new BattleScene(this, 0);

	requestAnimationFrame(function loop() {
		self.mainLoop();
		requestAnimationFrame(loop);
	});

	this.canvas.addEventListener("click", function(e) {
		var offset = getOffset(self.canvas);
		self.onClick(
			(e.clientX - offset.left),
			(e.clientY - offset.top));
	});
	this.mousePosition = {};
	this.canvas.addEventListener("mousemove", function(e) {
		var offset = getOffset(self.canvas);
		self.mousePosition.x = e.clientX - offset.left;
		self.mousePosition.y = e.clientY - offset.top;
	});
};
Game.WIDTH = 800;
Game.HEIGHT = 600;
Game.EPSILON = 0.001;

Game.prototype.onGameLoaded = function() {
	self = this;

	console.log("Game loaded!");
	this.scene = new BattleScene(this, 0);
};

Game.prototype.onClick = function(x, y) {
	this.scene.onClick(x, y);
};

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
	if (this.scene) {
		this.scene.update(timeData);
	}
};

Game.prototype.render = function(g) {
	g.clearRect(0, 0, g.width, g.height);
	g.setTransform(1, 0, 0, 1, 0, 0);

	g.fillStyle = "salmon";
	g.fillRect(0, 0, g.width, g.height);

	if (this.scene) {
		this.scene.render(g);
	}
	// else {
	// 	g.save();
	// 		// Loading text
	// 		g.font = "bold 30px sans-serif";
	// 		g.fillStyle = "black";
	// 		g.textAlign = "center";
	// 		g.translate(g.width / this.scale / 2,
	// 			g.height / this.scale / 2);
	// 		g.fillText("Chargement...", 0, -20);

	// 		// Loading bar
	// 		var progress = this.getLoadingProgress();
	// 		g.translate(-Game.MAX_LOAD_WIDTH / 2, 0);
	// 		g.strokeStyle = "black";
	// 		g.strokeRect(0, 0, Game.MAX_LOAD_WIDTH, Game.LOAD_HEIGHT);
	// 		g.fillStyle = "green";
	// 		g.fillRect(0, 0, Game.MAX_LOAD_WIDTH * progress,
	// 			Game.LOAD_HEIGHT);
	// 	g.restore();
	// }
};

Game.prototype.getLoadingProgress = function() {
	var progress =
		this.assetManager.assetLoadedCount / this.assetManager.assetCount;

	return progress;
};

Game.MAX_LOAD_WIDTH = 300;
Game.LOAD_HEIGHT = 10;

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

	addEventListener("resize", function() {
		self.onResize();
	});
	this.onResize();

	requestAnimationFrame(function loop() {
		self.mainLoop();
		requestAnimationFrame(loop);
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
	this.scene = new CharacterScene(this);
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

	g.save();
		g.scale(this.scale, this.scale);

		if (this.scene) {
			this.scene.render(g);
		}
	g.restore();
};

Game.prototype.getLoadingProgress = function() {
	var progress =
		this.assetManager.assetLoadedCount / this.assetManager.assetCount;

	return progress;
};

Game.prototype.enterBattleScene = function(fightersIds) {
	document.getElementById("fighter-selection-screen").className = 
		"fighter-selection disabled";

	this.scene = new BattleScene(this, fightersIds);
};

Game.prototype.onResize = function() {
	this.canvas.width = document.body.clientWidth;
	this.canvas.height = document.body.clientHeight;
	this.graphics.width = this.canvas.width;
	this.graphics.height = this.canvas.height;

	this.scale = this.canvas.height / Game.HEIGHT;
};

Game.prototype.restart = function() {
	this.scene = null;
	document.getElementById("title-screen").className = "";
	document.getElementById("fighter-selection-screen").className = 
		"fighter-selection disabled";
};

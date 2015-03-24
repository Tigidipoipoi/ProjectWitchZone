var Scene = function(game, id) {
	var self = this;
	this.game = game;

	this.background = new Image();
	this.background.src = "img/IncantationCircle.png";

	this.id = id;
	
	sceneDebug = this;
};

Scene.prototype.update = function(timeData) {
};

Scene.prototype.render = function(g) {
	g.save();
		if (this.background.complete) {
			g.translate(-this.x, -this.y);
			g.drawImage(this.background, 0, 0);
		}
	g.restore();
};

Scene.prototype.onClick = function(x,y)
{
	
};

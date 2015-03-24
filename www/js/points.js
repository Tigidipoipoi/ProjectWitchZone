var Point= function(x, y) {
	var self = this;
	this.x = x;
	this.y = y;

	this.active = false;
};

Point.prototype.update = function(timeData) {
};

Point.prototype.render = function(g) {
	g.save();	
		g.translate(this.x, this.y);
		g.fillStyle = this.active?"green":"black";
		g.fillRect(-40, -40 ,80,80);
	g.restore();
	
};

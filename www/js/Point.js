var Point= function(x, y, dimension) {
	var self = this;
	this.id = -1;

	this.x = x;
	this.y = y;
	this.dimension = dimension;

	this.active = false;
};

Point.prototype.update = function(timeData) {
};

Point.prototype.render = function(g) {
	g.save();
		g.translate(this.x, this.y);
		if (!this.image) {
			g.fillStyle = this.active
				? "green" : "black";
			g.fillRect(-this.dimension * 0.5, -this.dimension * 0.5,
				this.dimension, this.dimension);
		}
		else {
			g.drawImage(this.image, -this.dimension * 0.5, -this.dimension * 0.5);
		}
	g.restore();

};

Point.prototype.doesCollide = function(x, y) {
	return Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)
		< Math.pow(this.dimension, 2);
};

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
		if (!this.weapon) {
			g.fillStyle = this.active
				? "green" : "black";
			g.fillRect(-this.dimension * 0.5, -this.dimension * 0.5,
				this.dimension, this.dimension);
		}
		else {
			g.drawImage(this.weapon.image, -this.dimension * 0.5,
				-this.dimension * 0.5);

			var firstElementImage = getElementImage(this.weapon.availableElements[0]);
			var secondElementImage = getElementImage(this.weapon.availableElements[1]);
			g.drawImage(firstElementImage,
				this.dimension * 0.25, -this.dimension * 0.25,
				this.dimension * 0.5, this.dimension * 0.5);
			g.drawImage(secondElementImage,
				this.dimension * 0.25, this.dimension * 0.25,
				this.dimension * 0.5, this.dimension * 0.5);
		}
	g.restore();

};

Point.prototype.doesCollide = function(x, y) {
	return Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)
		< Math.pow(this.dimension, 2);
};

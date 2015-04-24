var AssetManager = function() {
	this.images = {};
	this.sounds = {};

	this.imagesError = {};
	this.imagesToLoad = {};
	
	this.soundsError = {};
	this.soundsToLoad = {};

	this.loadingStarted = false;
	this.loadingEndTime = false;
	this.assetCount = 0;
	this.assetLoadedCount = 0;

	this.launchGameListener = [];
};
AssetManager.LOADING_DELAY = 0;

AssetManager.prototype.addImage = function(id, path) {
	this.imagesToLoad[id] = path;
	// this.imagesToLoad[id] = "getImage.php?sleep=" + AssetManager.LOADING_DELAY
	// 	+ "&url=" + encodeURIComponent(path);
		// rng ajouté pour éviter le double chargement des images sur FF
		// + "&r=" + Math.random() + Math.random();
}

AssetManager.prototype.addSound = function(id, path) {
	this.soundsToLoad[id] = path;
}

AssetManager.prototype.loadImage = function(id, path) {
	var self = this;
	var loadingImage = new Image();
	loadingImage.addEventListener("load", function () {
		delete self.imagesToLoad[id];
		self.assetLoaded();
	});
	loadingImage.addEventListener("error", function () {
		self.imagesError[id] = loadingImage;
		delete self.imagesToLoad[id];

		console.log("Failed to load image: \"" + id + "\".");
		self.assetLoaded();
	});
	loadingImage.src = path;
	// In case of bad handling navigators
	// setTimeout(function() {
	// 	if (loadingImage.complete
	// 		&& self.imagesToLoad[id]) {
	// 		delete self.imagesToLoad[id];
	// 		self.assetLoaded();
	// 	}
	// }, 500);
	this.images[id] = loadingImage;
}

AssetManager.prototype.loadSound = function(id, path) {
	var self = this;
	var loadingSound = new Audio();
	loadingSound.src = path;
	this.sounds[id] = loadingSound;
	delete this.soundsToLoad[id];

	this.assetLoaded();
}

AssetManager.prototype.assetLoaded = function() {
	++this.assetLoadedCount;
	console.log("Loading " + this.assetLoadedCount + "/" + this.assetCount);

	if (this.assetLoadedCount == this.assetCount) {
		if (this.launchGameListener.length > 0) {
			this.launchGameListener[0]();
		}
	}
}

AssetManager.prototype.startLoading = function(imageLoadingList,
	soundLoadingList) {
	// Ajout des images
	if (imageLoadingList) {
		for (var i in imageLoadingList) {
			this.addImage(i, imageLoadingList[i]);
		}
	}
	// Ajout des sons
	if (soundLoadingList) {
		for (var i in soundLoadingList) {
			this.addSound(i, soundLoadingList[i]);
		}
	}

	// Inventaire des assets à charger
	this.assetCount = 0;
	for (var i in this.imagesToLoad) {
		++this.assetCount;
	}
	for (var i in this.soundsToLoad) {
		++this.assetCount;
	}
	console.log("Start loading " + this.assetCount + " elements");

	// Chargement
	for (var i in this.imagesToLoad) {
		this.loadImage(i, this.imagesToLoad[i]);
	}
	for (var i in this.soundsToLoad) {
		this.loadSound(i, this.soundsToLoad[i]);
	}
};

AssetManager.prototype.addLoadingListener = function(listener) {
	this.launchGameListener.push(listener);
};

AssetManager.prototype.getImage = function(id) {
	return this.images[id];
};
var PhotosAppProto = {
	w: 640,
	h: 420,
	minH: 64,
	title: "Photos",
	
	draw: function(ctx) {
		this.setIconColor(Style.iconColor);
		
		if (this.photo) {
			this.drawPhoto(ctx);
		}
		else {
			this.drawMain(ctx);
		}
		this.validated = true;
	},
	
	drawPhoto: function(ctx) {
		var photo = this.photo;
		var h = this.h - 32;
		
		// Zoombar
		ctx.fillStyle = this.photoHover.zoom ? Style.buttonColor : Style.buttonFaintColor;
		fillRoundedRect(ctx, 6, 6, 100, 20, 4);
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, 24, 14, 64, 4, 2);
		ctx.fillStyle = Style.buttonHoverColor;
		fillRoundedRect(ctx, 24, 14, 52 * this.zoomNorm, 4, 2);
		
		ctx.fillStyle = Style.textColor;
		ctx.beginPath();
		ctx.arc(30 + 52 * this.zoomNorm, 16, 6, 0, 2 * Math.PI);
		ctx.fill();
		
		ctx.fillStyle = Style.buttonColor;
		if (this.photoHover.zoomOut) fillRoundedRect(ctx, 8, 9, 14, 14, 3);
		if (this.photoHover.zoomIn) fillRoundedRect(ctx, 90, 9, 14, 14, 3);
		
		this.drawIcon(ctx, this.icLess, 11, 12);
		this.drawIcon(ctx, this.icMore, 93, 12);
		
		ctx.fillStyle = this.photoHover.rotate ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 112, 6, 26, 20, 4); // Rotate
		
		ctx.fillStyle = this.photoHover.search ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w - 96, 6, 26, 20, 4); // Search
		
		ctx.fillStyle = this.photoHover.share ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w - 64, 6, 26, 20, 4); // Share
		
		ctx.fillStyle = this.photoHover.options ? Style.buttonHoverColor : Style.buttonColor;		
		fillRoundedRect(ctx, this.w - 32, 6, 26, 20, 4); // More options
		
		this.drawIcon(ctx, this.icRotate, 119, 10);
		this.drawIcon(ctx, this.icSearch, this.w - 89, 10);
		this.drawIcon(ctx, this.icShare, this.w - 57, 10);
		this.drawIcon(ctx, this.icOptions, this.w - 25, 10);
		
		setTextStyle(ctx, Style.textColor, "bold 12px sans-serif", "center", "middle");
		ctx.fillText(this.photoName, this.w / 2, 16);
		
		ctx.fillStyle = "#FFFFFF02";
		ctx.fillRect(0, 32, this.w, h);
		
		var fRatio = this.w / h;
		var pRatio = photo.width / photo.height;
		
		ctx.save();
		ctx.beginPath();
		ctx.rect(0, 32, this.w, h);
		ctx.clip();
		
		var x, y, w, h;
		
		if (fRatio <= pRatio) { // Photo is wider than the frame; Top and bottom blank spaces by default.
			var ratio = this.w / photo.width;
			var rare = ratio * photo.height * this.zoom;
			
			x = this.w / 2 - this.w / 2 * this.zoom - this.photoX;
			y = 32 + (h - rare) / 2 - this.photoY;
			w = this.w * this.zoom;
			h = rare;
		}
		else { // Frame is wider than the photo; Left and right blank spaces by default.
			var ratio = h / photo.height;
			var rare = ratio * photo.width * this.zoom;
			
			x = (this.w - rare) / 2 - this.photoX;
			y = 32 + h / 2 - h / 2 * this.zoom - this.photoY;
			w = rare;
			h = h * this.zoom;
		}
		
		ctx.drawImage(photo, x, y, w, h);
		
		ctx.restore();
	},
	
	drawMain: function(ctx) {
		setTextStyle(ctx, Style.textColor, "16px sans-serif", "center", "middle");
		ctx.fillText("Photos", this.w / 2, 48);
		
		setTextStyle(ctx, Style.softTextColor, "10px sans-serif", "center", "middle");
		ctx.fillText("There is no content here for now...", this.w / 2, this.h / 2);
	},
	
	setZoom: function(value) {
		this.zoom = Math.max(1, Math.min(value, this.zoomMax));
		this.zoomNorm = Math.log(this.zoom) / Math.log(this.zoomMax);
		
		var fRatio = this.w / (this.h - 32);
		var pRatio = this.photo.width / this.photo.height;
		
		var w, h;
		if (fRatio <= pRatio) { // Photo is wider than the frame; Top and bottom blank spaces by default.
			var ratio = this.w / this.photo.width;
			var rare = ratio * this.photo.height * this.zoom;
			
			w = this.w * this.zoom;
			h = rare;
		}
		else { // Frame is wider than the photo; Left and right blank spaces by default.
			var ratio = (this.h - 32) / this.photo.height;
			var rare = ratio * this.photo.width * this.zoom;
			
			w = rare;
			h = (this.h - 32) * this.zoom;
		}
			
		this.photoMinX = -Math.max(0, w - this.w) / 2;
		this.photoMinY = -Math.max(0, h - (this.h - 32)) / 2;
		this.photoMaxX = Math.max(0, w - this.w) / 2;
		this.photoMaxY = Math.max(0, h - (this.h - 32)) / 2;
		
		this.limitPhotoPos();
	},
	
	limitPhotoPos: function() {
		this.photoX = Math.max(this.photoMinX, Math.min(this.photoMaxX, this.photoX));
		this.photoY = Math.max(this.photoMinY, Math.min(this.photoMaxY, this.photoY));
		
		this.invalidate();
	},
	
	checkHoverPhoto: function() {
		var inval = false;
		var preHover = Object.assign({}, this.photoHover);
		
		this.photoHover.zoomIn = this.detectMouse(90, 9, 14, 14);
		this.photoHover.zoomOut = this.detectMouse(8, 9, 14, 14);
		this.photoHover.zoom = this.detectMouse(6, 6, 100, 20);
		this.photoHover.rotate = this.detectMouse(112, 6, 26, 20);
		this.photoHover.search = this.detectMouse(this.w - 96, 6, 26, 20);
		this.photoHover.share = this.detectMouse(this.w - 64, 6, 26, 20);
		this.photoHover.options = this.detectMouse(this.w - 32, 6, 26, 20);
		
		for (h in this.photoHover) {
			inval = inval || preHover[h] != this.photoHover[h];
		}
		
		return inval;
	},
	
	checkHoverMain: function() {
		return false;
	},
	
	mouseMove: function() {
		let inval = false;
		
		inval = inval || this.checkHoverMain();
		inval = inval || this.checkHoverPhoto();
		
		if (inval) this.invalidate();
	},
	
	mouseClick: function() {
		if (this.photoHover.zoom) {
			if (this.photoHover.zoomIn) {
				this.setZoom(this.zoom * 1.2);
			}
			else if (this.photoHover.zoomOut) {
				this.setZoom(this.zoom / 1.2);
			}
		}
	},
	
	mouseDrag: function() {
		
		// Drag zoom slider
		if (this.dragSlider) {
			let newNorm = Math.min(1, Math.max(0, (mouse.x - this.x - 30) / 52));
			let newZoom = Math.pow(this.zoomMax, newNorm);
			
			this.setZoom(newZoom);
			return;
		}
		
		// Drag image
		this.photoX += mouse.px - mouse.x;
		this.photoY += mouse.py - mouse.y;
		
		this.limitPhotoPos();
	},
	
	mouseWheel: function() {
		if (this.detectMouse(0, 32, this.w, this.h - 32)) {
			this.setZoom(this.zoom / Math.pow(10, mouse.wheelDelta / 800));
			this.invalidate();
		}
	},
	
	mouseDown: function() {
		if (this.photoHover.zoom) {
			let distX = Math.abs(mouse.x - (this.x + 30 + 52 * this.zoomNorm)); 
			let distY = Math.abs(mouse.y - (this.y + 16)); 
			let dist = distX * distX + distY * distY;
			
			if (dist <= 6 * 6) {
				this.dragSlider = true;
			}
		}
	},
	
	mouseUp: function() {
		this.dragSlider = false;
	}
};

function PhotosApp(photo, name) {
	this.icMore = loadIcon("Photos", "More", 8, 8);
	this.icLess = loadIcon("Photos", "Less", 8, 8);
	this.icRotate = loadIcon("Photos", "Rotate", 12, 12);
	this.icSearch = loadIcon("Photos", "Search", 12, 12);
	this.icShare = loadIcon("Photos", "Share", 12, 12);
	this.icOptions = loadIcon("Photos", "MoreOptions", 12, 12);
	
	this.photoHover = {
		zoomIn: false,
		zoomOut: false,
		zoom: false,
		rotate: false,
		search: false,
		share: false,
		options: false
	};
	
	this.photo = null;
	this.photoX = 0;
	this.photoY = 0;
	this.photoMinX = 0;
	this.photoMinY = 0;
	this.photoMaxX = 0;
	this.photoMaxY = 0;
	this.photoName = "";
	this.dragSlider = false;
	this.zoom = 1;
	this.zoomMax = 1;
	this.zoomNorm = 0;
	
	this.photo = photo ? photo : null;
	this.photoName = photo ? name : "";
	
	this.zoomMax = 10;
}

PhotosAppProto.__proto__ = App;
setPrototype(PhotosApp, PhotosAppProto);
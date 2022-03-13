function Background() {
	this.x = 0;
	this.y = 0;
	this.w = width;
	this.h = height;
	
	this.img = loadImage("backgrounds", "AvdanOSWallpaper");
	this.frame = false;
	this.type = "Background";
	
	this.initCanvas(this);
	
	this.draw = (ctx) => {
		var img = this.img;
		
		var cvRatio = width / height;
		var bgRatio = img.width / img.height;
		
		if (cvRatio > bgRatio) {
			var ratio = width / img.width;
			ctx.drawImage(img, 0, (height - img.height * ratio) / 2, width, img.height * ratio);
		}
		else {
			var ratio = height / img.height;
			ctx.drawImage(img, (width - img.width * ratio) / 2, 0, img.width * ratio, height);
		}
		
	};
}

setDrawablePrototype(Background);
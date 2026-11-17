var BackgroundProto = {
	cornerRadius: 0,
	
	draw: function(ctx) {
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
		
	},
	
	updateBackground: function(img) {
		this.img = img;
		this.invalidate();
	}
};

function Background() {
	this.w = width;
	this.h = height;
	
	if (Style.background) {
		this.img = Style.background;
	}
	else {
		this.img = loadImage("backgrounds", "AvdanOSWallpaper");
	}
	
	this.initCanvas();
}

BackgroundProto.__proto__ = Drawable;
setPrototype(Background, BackgroundProto);
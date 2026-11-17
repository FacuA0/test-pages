var ColorAppProto = {
	x: 0,
	y: 0,
	w: 280,
	h: 220,
	
	frame: true,
	
	draw: function(ctx) {
		ctx.fillStyle = this.color;
		fillRoundedRect(ctx, 0, 0, this.w, this.h, 6);
		
		setTextStyle(ctx, "#FFFFFF", "32px sans-serif", "center", "middle");
		ctx.fillText(this.name, this.w / 2, this.h / 2);
		
		this.validated = true;
	}
};

function ColorApp(name, color, x, y) {
	this.x = x;
	this.y = y;
	
	this.color = color;
	this.name = name;
	this.title = name;
}

ColorAppProto.__proto__ = App;
setPrototype(ColorApp, ColorAppProto);
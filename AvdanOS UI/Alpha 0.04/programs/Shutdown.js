var ShutdownScreenProto = {
	shuttedDown: false,
	
	draw: function(ctx) {
		if (!this.shuttedDown) {
			this.drawNormal(ctx);
		}
		else {
			this.drawFinish(ctx);
		}
		
		this.invalidate();
	},
	
	drawNormal: function() {
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, this.w, this.h);
		
		setTextStyle(ctx, "#FFF", "18px sans-serif", "center", "middle");
		ctx.fillText("Shutting down...", this.w / 2, this.h / 2);
	},
	
	drawFinish: function() {
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, this.w, this.h);
		
		setTextStyle(ctx, "#AAA", "18px sans-serif", "center", "bottom");
		ctx.fillText("System is turned off", this.w / 2, this.h / 2 - 4);
		
		setTextStyle(ctx, "#888", "12px sans-serif", "center", "top");
		ctx.fillText("(press space to refresh the page)", this.w / 2, this.h / 2 + 4);
		
	},
	
	keyType: function() {
		if (keyboard.key == " ") window.history.go(0);
	}
};

function ShutdownScreen() {
	this.w = width;
	this.h = height;
	
	this.counter = setTimeout(function(sd) {
		sd.shuttedDown = true;
	}, 3000, this);

	this.initCanvas();
}

ShutdownScreenProto.__proto__ = Drawable;
setPrototype(ShutdownScreen, ShutdownScreenProto);
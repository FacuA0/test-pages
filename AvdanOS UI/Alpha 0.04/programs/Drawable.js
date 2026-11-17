var Drawable = {
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	minW: 0,
	minH: 0,
	visible: true,
	validated: false,
	cornerRadius: 6,
	iconColor: "#FFFFFF",
	transform: {
		translateX: 0,
		translateY: 0,
		scaleX: 1,
		scaleY: 1,
		rotate: 0, // Unused
		opacity: 1
	},
	
	drawCanvas: null,
	
	draw: (ctx) => {},
	preDraw: function(dctx) {
		if (newRendering) {
			var drawCtx = this.drawCanvas.getContext("2d");
			
			if (!this.validated) {
				this.validated = true;

				var prevW = this.drawCanvas.width;
				var prevH = this.drawCanvas.height;

				if (prevW != this.w || prevH != this.h) {
					this.drawCanvas.width = this.w;
					this.drawCanvas.height = this.h;
				}
				else {
					drawCtx.clearRect(0, 0, this.w, this.h);
				}
				
				this.draw(drawCtx);
			}
			
			// PRE-CHANGE ALGORITHM (OLD):
			// - If blurring, draw onto main canvas the current blur of blurCanvas
			// - If invalidated, redraw the drawable onto drawCanvas
			//   - If blurred, redraw onto blur canvas the blurred version of the drawable.
			// - Draw onto main canvas the drawable
			// - Draw onto screen the main canvas
			// - Draw onto blurCanvas the contents of the blur canvas
			
		}
		else {
			dctx.save();
			dctx.translate(this.x + this.transform.translateX + this.w / 2, this.y + this.transform.translateY + this.h / 2);
			dctx.scale(this.transform.scaleX, this.transform.scaleY);
			dctx.rotate(this.transform.rotate);
			dctx.translate(-this.w / 2, -this.h / 2);
			dctx.globalAlpha = this.transform.opacity;

			setRoundedPath(dctx, 0, 0, this.w, this.h, 
				this.cornerRadius, this.cornerRadius, this.cornerRadius, this.cornerRadius);
			dctx.clip();
			dctx.beginPath();
			
			this.draw(dctx);

			dctx.restore();
		}
	},
	
	initCanvas: function() {
		this.drawCanvas = document.createElement("canvas");
	},

	initTransform: function() {
		this.transform = {
			translateX: 0,
			translateY: 0,
			scaleX: 1,
			scaleY: 1,
			rotate: 0, // Unused
			opacity: 1
		};
	},

	// Override this if your drawable contains other drawables, 
	// forward this event to them and call super.toggleCanvas().
	toggleCanvas: function(activate) {
		if (activate) this.initCanvas();
		else this.drawCanvas = null;
	},
	
	invalidate: function() {
		this.validated = false;
		validated = false;
	},
	
	setIconColor: function(color) {
		this.iconColor = color;
	},
	
	drawIcon: function(ctx, icon, x, y, w, h) {
		let ictx = icon.getContext("2d");
		ictx.save();
		ictx.fillStyle = this.iconColor;
		ictx.fillRect(0, 0, icon.width, icon.height);
		
		if (w && h) {
			ctx.drawImage(icon, x, y, w, h);
		}
		else {
			ctx.drawImage(icon, x, y);
		}
		
		ictx.restore();
	},

	getShapePath: function() {
		return createRoundedPath(0, 0, this.w, this.h, this.cornerRadius);
	},
	
	detectMouse: function(x, y, w, h) {
		return detectMouse(this.x + x, this.y + y, w, h);
	},
	
	detectMouseRounded: function(x, y, w, h, r) {
		return detectMouseRounded(this.x + x, this.y + y, w, h, r);
	},
	
	mouseMove: function(event) {},
	mouseDown: function(event) {},
	mouseDrag: function(event) {},
	mouseUp: function(event) {},
	mouseClick: function(event) {},
	mouseWheel: function(event) {},
	mouseEnter: function(event) {},
	mouseExit: function(event) {},
	keyDown: function(event) {},
	keyType: function(event) {},
	keyUp: function(event) {}
};
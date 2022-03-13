var Drawable = {
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	minW: 0,
	minH: 0,
	visible: true,
	movable: false,
	resizable: false,
	validated: false,
	type: "Drawable",
	
	drawCanvas: null,
	
	initCanvas: (d) => {
		d.drawCanvas = document.createElement("canvas");
	},
	
	preDraw: (d, dctx) => {
		if (newRendering) {
			if (d.validated) {
				dctx.drawImage(d.drawCanvas, d.x, d.y);
			}
			else {
				d.drawCanvas.width = d.w;
				d.drawCanvas.height = d.h;
				
				var drawCtx = d.drawCanvas.getContext("2d");
			
				d.draw(drawCtx);
				dctx.drawImage(d.drawCanvas, d.x, d.y);
				
				d.validated = true;
			}
		}
		else {
			ctx.setTransform(1, 0, 0, 1, d.x, d.y);
			d.draw(dctx);
			dctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	},
	draw: (ctx) => {},
	
	mouseMove: (event) => {},
	mouseDown: (event) => {},
	mouseDrag: (event) => {},
	mouseClick: (event) => {},
	mouseUp: (event) => {},
};
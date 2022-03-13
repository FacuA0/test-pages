// AvdanOS UI Alpha 0.01 s31

var htmlCanvas, canvas, htmlCtx, ctx, width, height, frameCount, programs, bg, dock, start, images, icons, validated, loaded, newRendering;
var drawingCanvas, dctx, t0 = 0, t1 = 0

var margin = {
	top: 0,
	left: 0
};

var mouse = {
	x: 0,
	y: 0,
	px: 0,
	py: 0,
	rx: 0,
	ry: 0,
	down: false,
	drag: false,
	overDrawable: null,
	frameAction: "",
	overFrameArea: ""
};

window.onload = init;

function init() {
	var html = document.getElementsByTagName("html")[0];
	htmlCanvas = document.getElementById("canvas");
	htmlCtx = htmlCanvas.getContext("2d");
	
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	
	frameCount = 0;
	drawables = [[], [], []];
	validated = false;
	loaded = false;
	newRendering = true;
	
	html.addEventListener("mousedown", mouseDown);
	html.addEventListener("mousemove", mouseMove);
	html.addEventListener("mouseup", mouseUp);
	
	setTimeout(loadImages, 0);
	
	//drawingCanvas = document.createElement("canvas");
	//dctx = drawingCanvas.getContext("2d");
	
	setCanvasSize(innerWidth, innerHeight);
	
	setTimeout(() => {
		/* Create applications */
		
		bg = new Background();
		dock = new Dock();
		start = new StartMenu();
		
		drawables[0].push(bg);
		drawables[2].push(dock);
		drawables[2].push(start);
		
		drawables[1].push(new Frame(new ColorApp("Red", "#FF0000", 64, 64)));
		drawables[1].push(new Frame(new ColorApp("Blue", "#0000FF", 140, 96)));
		drawables[1].push(new Frame(new ColorApp("Yellow", "#FFFF00", 120, 220)));
		drawables[1].push(new Frame(new FilesApp()));
		
		drawables[1][0].add(new ColorApp("Pink", "#FF8888"));
		
		// Flag as loaded
		validated = false;
		loaded = true;
	}, 2000);
	
	requestAnimationFrame(update);
}

function update() {
	
	//console.log("Out: " + (new Date().getTime() - t1));
	t0 = t1;
	
	setCanvasMargin();
	
	if (!validated || true) {
		ctx.clearRect(0, 0, width, height);
		
		if (loaded) {
			
			ctx.fillStyle = "red";
			ctx.fillRect(60, 60, width - 120, height - 120);
			
			ctx.fillStyle = "white";
			ctx.font = "24px sans-serif";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Avdan OS", width / 2, height / 2);
			
			showDrawables();
		}
		else {
			ctx.fillStyle = "white";
			ctx.font = "28px sans-serif";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Loading AvdanOS", width / 2, height / 2);
		}
		
		validated = true;
	}
	
	htmlCtx.clearRect(0, 0, width, height);
	htmlCtx.drawImage(canvas, 0, 0);
	drawFrameCounter();
	
	setTimeout(update, 14);
	//requestAnimationFrame(update);
	
	frameCount++;
	
	t1 = new Date().getTime();
	console.log("In: " + (t1 - t0));
	
	function drawFrameCounter() {
		htmlCtx.fillStyle = "white";
		htmlCtx.font = "12px sans-serif";
		htmlCtx.textAlign = "left";
		htmlCtx.textBaseline = "top";
		htmlCtx.fillText("Frames: " + frameCount, 12, 12);
	}
	
}

function showDrawables() {
	
	for (sub of drawables) {
		for (d of sub) {
			
			if (d.visible !== false) {
				
				var t0 = performance.now();
				//console.log("draw start " + Math.round(t0 * 10) / 10);
				
				if (d.validated && false) {
					ctx.drawImage(d.snapshot, 0, 0, d.w, d.h, d.x, d.y, d.w, d.h);
				}
				else {
					draw(d);
				}
				
				var t1 = performance.now();
				console.log("draw end " + Math.round((t1 - t0) * 10) / 10);
			}
		}
	}
	
	function draw(d) {
		//dctx.clearRect(0, 0, width, height);
		//dctx.setTransform(1, 0, 0, 1, d.x, d.y);
		
		d.preDraw(d, ctx);
		
		//dctx.setTransform(1, 0, 0, 1, 0, 0);
		
		//ctx.drawImage(drawingCanvas, 0, 0, d.w, d.h, d.x, d.y, d.w, d.h);
	}
}

function mouseDown(event) {
	mouse.down = true;
	mouse.x = event.pageX - margin.left;
	mouse.y = event.pageY - margin.top;
	
	validated = false;
	
	if (mouse.overDrawable != null) {
		var f = mouse.overDrawable;
		
		for (var i = 0; i < drawables.length; i++) {
			if (drawables[i].indexOf(f) != -1) {
				drawables[i].splice(drawables[i].indexOf(f), 1);
				drawables[i].push(f);
			}
		}
		
		f.validated = false;
		
		if (mouse.overFrameArea == "PANEL" || mouse.overFrameArea == "APP") {
			if (mouse.overFrameArea == "PANEL") {
				if (f.movable !== false) {
					mouse.frameAction = "MOVE";
				}
			}
			f.mouseDown(event);
		}
		else {
			if (f.resizable !== false) {
				mouse.rx = mouse.x;
				mouse.ry = mouse.y;
				
				mouse.frameAction = "RESIZE_" + mouse.overFrameArea;
				f.startResize();
			}
		}
	}
}

function mouseMove(event) {
	mouse.px = mouse.x;
	mouse.py = mouse.y;
	
	mouse.x = event.pageX - margin.left;
	mouse.y = event.pageY - margin.top;
	
	if (mouse.down === true) {
		mouse.drag = true;
		mouseDrag(event);
		return;
	}
	
	if (!mouse.drag)
		setTimeout(setFrameArea, 0);
}

function setFrameArea() {
	var br = true;
	for (var h = drawables.length - 1; h >= 0 && br; h--) {
		
		for (var i = drawables[h].length - 1, p; i >= 0 && br; i--) {
			p = drawables[h][i];
			
			var din = detectMouse(p.x, p.y, p.w, p.h) && p.visible;
			var dout = detectMouse(p.x - 6, p.y - 6, p.w + 12, p.h + 12) && p.visible;
			var dfr = p.type === "Frame";
			
			setCursor("url(icons/Cursor/Default.png),default");
			
			if (!dfr) {
				if (din) {
					mouse.overDrawable = p;
					mouse.overFrameArea = "DRAWABLE";
					p.mouseMove(event);
					p.validated = false;
					br = false;
					continue;
				}
			}
			else {
				if (dout) {
					mouse.overDrawable = p;
					validated = false;
					p.validated = false;
					br = false;
				}
				else {
					if (i == 0) {
						mouse.overDrawable = null;
					}
					continue;
				}
				
				if (din) {
					
					if (detectMouse(p.x, p.y, p.w, 32)) {
						mouse.overFrameArea = "PANEL";
					}
					else {
						mouse.overFrameArea = "APP";
					}
					p.mouseMove(event);
				}
				
				else if (dout && !din) {
					
					if (detectMouse(p.x - 6, p.y - 6, 6, 6)) {
						mouse.overFrameArea = "TOP_LEFT";
						setCursor("nw-resize");
					}
					
					if (detectMouse(p.x, p.y - 6, p.w, 6)) {
						mouse.overFrameArea = "TOP";
						setCursor("n-resize");
					}
					
					if (detectMouse(p.x + p.w, p.y - 6, 6, 6)) {
						mouse.overFrameArea = "TOP_RIGHT";
						setCursor("ne-resize");
					}
					
					if (detectMouse(p.x + p.w, p.y, 6, p.h)) {
						mouse.overFrameArea = "RIGHT";
						setCursor("e-resize");
					}
					
					if (detectMouse(p.x + p.w, p.y + p.h, 6, 6)) {
						mouse.overFrameArea = "BOTTOM_RIGHT";
						setCursor("se-resize");
					}
					
					if (detectMouse(p.x, p.y + p.h, p.w, 6)) {
						mouse.overFrameArea = "BOTTOM";
						setCursor("s-resize");
					}
					
					if (detectMouse(p.x - 6, p.y + p.h, 6, 6)) {
						mouse.overFrameArea = "BOTTOM_LEFT";
						setCursor("sw-resize");
					}
					
					if (detectMouse(p.x - 6, p.y, 6, p.h)) {
						mouse.overFrameArea = "LEFT";
						setCursor("w-resize");
					}
				}
			}
		}
	}
	
	function setCursor(cursor) {
		htmlCanvas.style.cursor = cursor;
	}
}

function mouseUp(event) {
	mouse.down = false;
	
	validated = false;
	
	if (!mouse.drag) {
		mouseClick();
	}
	
	mouse.drag = false;
	
	if (mouse.overDrawable != null) {
		if (mouse.frameAction !== "") {
			mouse.overDrawable.endResize();
		}
		mouse.overDrawable.mouseUp(event);
		mouse.overDrawable.validated = false;
	}
	mouse.frameAction = "";
}

function mouseDrag(event) {
	//var t0 = performance.now();
	//console.log("mouseDrag start " + Math.round(t0 * 10) / 10);
	
	if (mouse.frameAction !== "") {
		var f = mouse.overDrawable;
		f.validated = false;
		
		var mx = mouse.x - mouse.px;
		var my = mouse.y - mouse.py;
		
		var dx = mouse.x - mouse.rx;
		var dy = mouse.y - mouse.ry;
		
		switch (mouse.frameAction) {
			
			case "MOVE":
				f.move(mx, my);
				break;
			
			case "RESIZE_TOP":
				f.resize(dy, 0, 0, 0);
				break;
			
			case "RESIZE_LEFT":
				f.resize(0, 0, dx, 0);
				break;
			
			case "RESIZE_BOTTOM":
				f.resize(0, dy, 0, 0);
				break;
			
			case "RESIZE_RIGHT":
				f.resize(0, 0, 0, dx);
				break;
			
			case "RESIZE_TOP_LEFT":
				f.resize(dy, 0, dx, 0);
				break;
			
			case "RESIZE_TOP_RIGHT":
				f.resize(dy, 0, 0, dx);
				break;
			
			case "RESIZE_BOTTOM_LEFT":
				f.resize(0, dy, dx, 0);
				break;
			
			case "RESIZE_BOTTOM_RIGHT":
				f.resize(0, dy, 0, dx);
				break;
		}
	}
	else if (mouse.overDrawable != null) {
		mouse.overDrawable.mouseDrag(event);
		mouse.overDrawable.validated = false;
	}
	
	validated = false;
	//var t1 = performance.now();
	//console.log("mouseDrag end " + Math.round(t1 * 10) / 10);
}

function mouseClick(event) {
	if (mouse.overDrawable != null) {
		mouse.overDrawable.mouseClick(event);
		mouse.overDrawable.validated = false;
	}
}

function fillRoundedRect2(ctx, x, y, w, h, r1, r2, r3, r4) {
	ctx.beginPath();
	ctx.moveTo(x + r1, y);
	ctx.lineTo(x + w - r2, y);
	ctx.arc(x + w - r2, y + r2, r2, -0.5 * Math.PI, 0 * Math.PI);
	
	ctx.lineTo(x + w, y + h - r3);
	ctx.arc(x + w - r3, y + h - r3, r3, 0, 0.5 * Math.PI);
	
	ctx.lineTo(x + r4, y + h);
	ctx.arc(x + r4, y + h - r4, r4, 0.5 * Math.PI, Math.PI);
	
	ctx.lineTo(x, y + r1);
	ctx.arc(x + r1, y + r1, r1, Math.PI, 1.5 * Math.PI);
	
	ctx.fill();
}

function fillRoundedRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + w - r, y);
	ctx.arc(x + w - r, y + r, r, -0.5 * Math.PI, 0 * Math.PI);
	
	ctx.lineTo(x + w, y + h - r);
	ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);
	
	ctx.lineTo(x + r, y + h);
	ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI);
	
	ctx.lineTo(x, y + r);
	ctx.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI);
	
	ctx.fill();
}

function setTextStyle(ctx, style, font, align, baseline) {
	ctx.fillStyle = style;
	ctx.font = font;
	ctx.textAlign = align;
	ctx.textBaseline = baseline;
}

function detectMouse(bx, by, bw, bh) {
	return detectPoint(mouse.x, mouse.y, bx, by, bw, bh);
}

function detectPoint(mx, my, bx, by, bw, bh) {
	var bool1 = mx >= bx && mx < bx + bw;
	var bool2 = my >= by && my < by + bh;
	return bool1 && bool2;
}

function loadImages() {
	var t0 = performance.now();
	var database = {
		icons: {
			Apps: [
				"Files",
				"Mail",
				"Lale",
				"Gallery",
				"Calendar",
				"Notes",
				"Settings",
				"Music",
				"Messages",
				"Movies",
				"Calculator",
				"Presentations",
				"AfterEffects",
				"Photoshop",
				"Illustrator",
				"PDFReader"
			],
			Frame: [
				"Close",
				"Minimize",
				"Maximize",
				"SplitLeft",
				"Multitask",
				"SplitRight",
				"AddTab",
			],
			Files: [
				"Documents",
				"Downloads",
				"Aplications",
				"Desktop",
				"Recents",
				"PHFolder",
				"ShowGrid",
				"ShowColumn",
				"ShowList",
				"Tag",
				"Tags",
				"Expand",
				"Shrink",
				"TxtFile"
			],
			Dock: [
				"HideApps",
				"AvdanMenu",
				"RecentApps",
				"Sun",
				"WiFi",
				"Bluetooth",
				"Sound",
				"Battery",
				"QuickSettings"
			],
			Start: [
				"DevicePhone",
				"DeviceWatch",
				"DeviceCar",
				"DefaultProfilePicture",
				"Power",
				"AllApps",
				"Settings",
				"Cloud"
			],
			global: [
				"Back",
				"Forward",
				"MoreOptions",
				"Search",
				"Share",
				"Play",
				"Star"
			]
		},
		images: {
			backgrounds: [
				"AvdanOS",
				"AvdanOSWallpaper"
			]
		}
	};
	
	images = {};
	icons = {};
	
	for (key in database.images) {
		images[key] = {};
		
		for (i of database.images[key]) {
			var imgObj = {};
			
			var img = createImgElement("images/" + key.toString() + "/" + i + ".jpg");
			
			imgObj.original = img;
			images[key][i] = imgObj;
		}
	}
	
	for (key in database.icons) {
		icons[key] = {};
		for (i of database.icons[key]) {
			var icObj = {};
			
			var ic;
			if (key.includes("global")) {
				ic = createImgElement("icons/" + i + ".png");
			}
			else {
				ic = createImgElement("icons/" + key + "/" + i + ".png");
			}
			
			icObj.original = ic;
			icons[key][i] = icObj;
		}
	}
	
	validated = false;
	
	function createImgElement(src) {
		var img = document.createElement("img");
		img.crossOrigin = "anonymous";
		img.src = src;
		return img;
	}
	var t1 = performance.now();
	console.log("Load Images: " + Math.round((t1 - t0) * 10) / 10);
}

function loadIcon(appName, name, w, h) {
	
	var icObj = {};
	if (icons[appName][name]) {
		icObj = icons[appName][name];
	}
	else if (icons.global[name]) {
		icObj = icons.global[name];
	}
	else return null;
	
	if (arguments.length == 2) {
		return icObj.original;
	}
	else if (arguments.length == 4) {
		
		var prop = "s_" + w + "x" + h;
		if (Object.hasOwn(icObj, prop)) {
			return icObj[prop];
		}
		else {
			var cnv = document.createElement("canvas");
			cnv.width = w;
			cnv.height = h;
			cnv.getContext("2d").drawImage(icObj.original, 0, 0, w, h);
			
			icObj[prop] = cnv;
			return cnv;
		}
	}
}

function loadImage(folder, name, w, h) {
	var imgObj = images[folder][name];
	
	if (arguments.length == 2) {
		return imgObj.original;
	}
	else {
		
		var prop = "s_" + w + "x" + h;
		if (imgObj.hasOwn(prop)) {
			return imgObj[prop];
		}
		else {
			var cnv = document.createElement("canvas");
			cnv.width = w;
			cnv.height = h;
			cnv.getContext("2d").drawImage(imgObj.original, 0, 0, w, h);
			
			imgObj[prop] = cnv;
			return cnv;
		}
	}
}

function setCanvasSize(w, h) {
	htmlCanvas.width = canvas.width = width = w;
	htmlCanvas.height = canvas.height = height = h;
	
	validated = false;
	
	//drawingCanvas.width = w;
	//drawingCanvas.height = h;
}

function setCanvasMargin() {
	margin.top = (innerHeight - height) / 2;
	margin.left = (innerWidth - width) / 2;
	
	htmlCanvas.style.marginTop = margin.top + "px";
	htmlCanvas.style.marginLeft = margin.left + "px";
}

function setDrawablePrototype(f) {
	f.prototype = Drawable;
	f.prototype.constructor = f;
}

function setAppDrawablePrototype(f) {
	f.prototype = Drawable;
	f.prototype.constructor = Frame;
}
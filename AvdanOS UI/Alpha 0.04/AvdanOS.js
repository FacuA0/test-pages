// AvdanOS UI Alpha 0.04

var htmlCanvas, canvas, htmlCtx, ctx, width, height, frameCount, drawables, images, icons, validated, loaded, fileSystem, debug;
var bg, dock, start, boot, login, shutdown;
var drawingCanvas, dctx, blurCanvas, bctx, frameRates, t0, t1;
var newRendering, blurring;

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
	overFrameArea: "",
	pointer: "",
	prePointer: "",
	
	wheelDelta: 0
};

var keyboard = {
	down: false,
	key: "",
	keys: [],
	focus: null
};

window.onload = init;

function init() {
	try {
		var html = document.getElementsByTagName("html")[0];
		htmlCanvas = document.getElementById("canvas");
		htmlCtx = htmlCanvas.getContext("2d");
		
		canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");
		
		//blurCanvas = document.createElement("canvas");
		//bctx = blurCanvas.getContext("2d");
		
		drawingCanvas = document.createElement("canvas");
		dctx = drawingCanvas.getContext("2d");
		
		debug = false;
		frameCount = 0;
		frameRates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		drawables = [[], [], []];
		validated = false;
		loaded = false;
		t0 = 0;
		t1 = 0;

		if (StorageSystem.exists("System", "DebugMode")) {
			debug = StorageSystem.get("System", "DebugMode") == "true";
		}
		
		newRendering = true;
		blurring = true;
		
		if (StorageSystem.exists("System", "Blurring")) {
			blurring = StorageSystem.get("System", "Blurring") == "true";
		}
		
		html.addEventListener("mousedown", mouseDown);
		html.addEventListener("mousemove", mouseMove);
		html.addEventListener("mouseup", mouseUp);
		html.addEventListener("wheel", mouseWheel);
		html.addEventListener("keydown", keyDown);
		html.addEventListener("keyup", keyUp);

		Promise.all([
			loadFileSystem(),
			loadImages(),
			loadThemes()
		]).then(() => boot.end());
		
		setCanvasSize(innerWidth, innerHeight);
		
		boot = new BootScreen();
		drawables[0].push(boot);
		
		requestAnimationFrame(update);
	}
	catch (error) {
		showDialog(error, "error");
	}
}

function loadDrawables() {
	
	/* Create applications */
	bg = new Background();
	dock = new Dock();
	start = new StartMenu();
	
	drawables[0] = [];
	
	drawables[0].push(bg);
	drawables[2].push(dock);
	drawables[2].push(start);
	
	//drawables[1].push(new Frame(new ColorApp("Red", "#FF0000", 64, 64)));
	//drawables[1].push(new Frame(new ColorApp("Blue", "#0000FF", 140, 96)));
	//drawables[1].push(new Frame(new ColorApp("Yellow", "#FFFF00", 120, 220)));
	//drawables[1].push(new Frame(new FilesApp()));
	//drawables[1].push(new Frame(new PhotosApp(loadImage("backgrounds", "AvdanOS"), "AvdanOSWallpaper.jpg")));
	
	//drawables[1][0].add(new ColorApp("Pink", "#FF8888"));
	
	// Flag as loaded
	validated = false;
}

function update() {
	setCanvasMargin();
	//console.log(drawables[0]);
	Animator.animate();
	
	if (!validated) {
		ctx.clearRect(0, 0, width, height);
		
		ctx.fillStyle = "red";
		ctx.fillRect(60, 60, width - 120, height - 120);
		
		ctx.fillStyle = "white";
		ctx.font = "24px sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("Avdan OS", width / 2, height / 2);
		
		validated = true;
		
		showDrawables();
	}
	
	htmlCtx.clearRect(0, 0, width, height);
	htmlCtx.drawImage(canvas, 0, 0);
	//htmlCtx.drawImage(testCanvas, 0, 0);
	
	if (debug) {
		htmlCtx.fillStyle = "#BB0A";
		htmlCtx.beginPath();
		htmlCtx.arc(mouse.x, mouse.y, 4, 0, 2 * Math.PI);
		htmlCtx.fill();
	}
	
	t0 = t1;
	t1 = performance.now();
	
	if (debug) drawDebug();
	
	//setTimeout(update, 12);
	requestAnimationFrame(update);
	
	frameCount++;
	
	function drawDebug() {
		htmlCtx.fillStyle = "white";
		htmlCtx.font = "12px sans-serif";
		htmlCtx.textAlign = "left";
		htmlCtx.textBaseline = "top";
		htmlCtx.fillText("Frames: " + frameCount, 12, 12);
		
		frameRates.push((1000 / (t1 - t0)));
		frameRates.shift();

		let frameRateAvg = frameRates.reduce((prev, e) => prev + e);
		frameRateAvg = Math.round(frameRateAvg / frameRates.length);
		
		let min = Math.round(frameRates.reduce((prev, e) => Math.min(prev, e)));
		let max = Math.round(frameRates.reduce((prev, e) => Math.max(prev, e)));
		
		htmlCtx.fillText("FPS: " + frameRateAvg + ", Min: " + min + ", Max: " + max, 12, 32);
		
		htmlCtx.fillText("Current animations:", 12, 52);
		for (var i = 0; i < Animator.anims.length; i++) {
			let anim = Animator.anims[i], value;
			let x = (new Date().getTime() / 1000 - anim.start) / anim.duration;

			if (typeof anim.interpolation == "object") value = anim.interpolation.func(anim.a, anim.b, x, ...anim.interpolation.args);
			else value = anim.interpolation(anim.a, anim.b, x);

			let percentage = (x * 100).toFixed(0);
			htmlCtx.fillText(`${i + 1}: ${anim.property} (${value}) = ${percentage}%`, 12, 72 + i * 20);
		}
		
		/*
		for (var i = 0; i <= 50; i++) {
			let bez = Animator.bezier(height, 0, mouse.x / width, 1 - mouse.y / height, 1 / 50 * i);
			
			htmlCtx.fillStyle = "#00BA";
			htmlCtx.beginPath();
			htmlCtx.arc(width / 50 * i, bez, 3, 0, 2 * Math.PI);
			htmlCtx.fill();
		}
		*/
	}
}

function showDrawables() {
	//bctx.clearRect(0, 0, width, height);
	
	//ctx.imageSmoothingEnabled = !newRendering;
	ctx.imageSmoothingEnabled = false;

	firstDrawable = true;
	
	for (sub of drawables) {
		for (d of sub) {
			if (!d.visible) continue;
			
			if (newRendering) {
				try {
					d.preDraw();
				}
				catch (error) {
					showDialog(error, "error", d);
				}
				
				let tr = d.transform;

				ctx.save();
				ctx.translate(d.x + tr.translateX + d.w / 2, d.y + tr.translateY + d.h / 2);
				ctx.scale(tr.scaleX, tr.scaleY);
				//ctx.rotate(d.transform.rotate);
				
				ctx.translate(-d.w / 2, -d.h / 2);

				let clip = d.getShapePath();
				ctx.clip(clip);
				
				if (blurring && !firstDrawable) {
					let blur = 8 * tr.opacity;
					let sx = d.x + tr.translateX + d.w * (1 - tr.scaleX) / 2 - blur;
					let sy = d.y + tr.translateY + d.h * (1 - tr.scaleY) / 2 - blur;
					let sw = d.w * tr.scaleX + blur * 2;
					let sh = d.h * tr.scaleY + blur * 2;
					let dx = -blur / tr.scaleX;
					let dy = -blur / tr.scaleY;
					let dw = d.w + blur * 2 / tr.scaleX;
					let dh = d.h + blur * 2 / tr.scaleY;

					function blurDrawImage() {
						ctx.drawImage(canvas, sx, sy, sw, sh, dx, dy, dw, dh);
					}
	
					ctx.filter = "blur(" + blur + "px)";
					blurDrawImage();
					ctx.filter = "none";
				}

				ctx.globalAlpha = tr.opacity;
				ctx.drawImage(d.drawCanvas, 0, 0);
				ctx.globalAlpha = 1;

				ctx.restore();
			}
			else {
				d.preDraw(ctx);
			}

			firstDrawable = false;
		}
	}
}

/*
 * Events
 */
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
	
	if (dock && dock.autohide) {
		if (!dock.hidden && !detectMouse(dock.x - 4, dock.y - 4, dock.w + 8, height - dock.y + 4)) {
			dock.hide();
		}
		else if (detectMouse(dock.x, height - 1, dock.w, 1)) {
			dock.show();
		}
	}
	
	setTimeout(setFrameArea, 0, event);
}

function mouseDown(event) {
	mouse.down = true;
	mouse.x = event.pageX - margin.left;
	mouse.y = event.pageY - margin.top;
	
	validated = false;

	if (start && start.opened && mouse.overDrawable != start) {
		if (!dock || !dock.isStartHovered()) {
			start.close();
		}
	}
	
	if (mouse.overDrawable != null) {
		var f = mouse.overDrawable;
		
		for (var i = 0; i < drawables.length; i++) {
			if (drawables[i].indexOf(f) != -1 && drawables[i].indexOf(f) != drawables[i].length - 1) {
				drawables[i].splice(drawables[i].indexOf(f), 1);
				drawables[i].push(f);
				
				if (i == 1) {
					dock.setAutohide();
				}
			}
		}
		
		keyboard.focus = f;
		
		try {	
			f.mouseDown(event);
			f.invalidate();
		}
		catch (error) {
			showDialog(error, "error");
		}
		
		if (f.constructor != Frame) return;
		
		if (mouse.overFrameArea == "PANEL" || mouse.overFrameArea == "APP") {
			if (mouse.overFrameArea == "PANEL") {
				if (f.movable !== false) {
					mouse.frameAction = "MOVE";
				}
			}
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

function mouseDrag(event) {
	var d = mouse.overDrawable;
	
	if (mouse.frameAction !== "") {
		
		var mx = mouse.x - mouse.px;
		var my = mouse.y - mouse.py;
		
		var dx = mouse.x - mouse.rx;
		var dy = mouse.y - mouse.ry;
		
		switch (mouse.frameAction) {
			
			case "MOVE":
				if (d.maximized) {
					d.restoreDragged();
				}
				
				d.move(mx, my);
				break;
			
			case "RESIZE_TOP":
				d.resize(dy, 0, 0, 0);
				break;
			
			case "RESIZE_LEFT":
				d.resize(0, 0, dx, 0);
				break;
			
			case "RESIZE_BOTTOM":
				d.resize(0, dy, 0, 0);
				break;
			
			case "RESIZE_RIGHT":
				d.resize(0, 0, 0, dx);
				break;
			
			case "RESIZE_TOP_LEFT":
				d.resize(dy, 0, dx, 0);
				break;
			
			case "RESIZE_TOP_RIGHT":
				d.resize(dy, 0, 0, dx);
				break;
			
			case "RESIZE_BOTTOM_LEFT":
				d.resize(0, dy, dx, 0);
				break;
			
			case "RESIZE_BOTTOM_RIGHT":
				d.resize(0, dy, 0, dx);
				break;
		}
	
		validated = false;
	}
	else if (d != null) {
		try {	
			d.mouseDrag(event);
		}
		catch (error) {
			showDialog(error, "error");
		}
	}
}

function mouseUp(event) {
	mouse.down = false;
	
	validated = false;
	
	if (!mouse.drag) {
		mouseClick();
	}
	
	mouse.drag = false;
	
	var d = mouse.overDrawable;
	
	if (d != null) {
		try {	
			if (mouse.frameAction.startsWith("RESIZE")) {
				d.endResize();
			}
			d.mouseUp(event);
			d.invalidate();
		}
		catch (error) {
			showDialog(error, "error");
		}
	}
	mouse.frameAction = "";
}

function mouseClick(event) {
	var d = mouse.overDrawable;
	
	if (d != null) {
		try {
			d.mouseClick(event);
			d.invalidate();
		}
		catch (error) {
			showDialog(error, "error", null);
		}
	}
}

function mouseWheel(event) {
	mouse.wheelDelta = event.deltaY;
	
	if (debug) {
		console.log("Wheel scrolled: " + mouse.wheelDelta);
	}
	
	let d = mouse.overDrawable;
	
	if (d) {
		d.mouseWheel(d);
	}
}

function keyDown(event) {
	if (event.key != "F12" && event.key != "F5")
		event.preventDefault();
	
	keyboard.down = true;
	keyboard.key = event.key;
	
	let keys = keyboard.keys;
	let original = !keys.includes(event.key);
	if (keyboard.focus && original) {
		try {
			keyboard.focus.keyDown(event);
			keyboard.focus.invalidate();
		}
		catch (error) {
			showDialog(error, "error");
		}
	}
	
	callKeyType();
	
	if (original) {
		keys.push(event.key);
	}
	
	function callKeyType() {
		if (event.key == "Alt") return;
		if (event.key == "Control") return;
		if (event.key == "Meta") return;
		if (event.key == "Shift") return;
		if (event.key == "Escape") return;
		if (event.key == "ScrollLock") return;
		if (event.key == "NumLock") return;
		if (event.key == "CapsLock") return;
		if (event.key == "Enter") return;
		if (event.key == "Home") return;
		if (event.key == "End") return;	
		if (event.key == "Dead") return;	
		if (event.key.startsWith("Arrow")) return;
		if (event.key.startsWith("F") && event.key.length >= 2) return;
		
		try {
			keyType(event);
		}
		catch (error) {
			showDialog(error, "error");
		}
	}
}

function keyType(event) {
	let key = event.key;
	
	if (debug) {
		console.log("Key typed: " + keyboard.key);
	}
	
	if (keyboard.focus) {
		try {
			keyboard.focus.keyType(event);
			keyboard.focus.invalidate();
		}
		catch (error) {
			showDialog(error, "error");
		}
	}
}

function keyUp(event) {
	keyboard.down = false;
	event.preventDefault();
	keyboard.key = event.key;
	//console.log("Key up: " + keyboard.key);
	
	let keys = keyboard.keys;
	if (keys.includes(event.key)) {
		keys.splice(keys.indexOf(event.key), 1);
	}
	
	if (keyboard.focus) {
		try {
			keyboard.focus.keyUp(event);
			keyboard.focus.invalidate();
		}
		catch (error) {
			showDialog(error, "error")
		}
	}
}


function setFrameArea(event) {
	var newCursor = "default";
	mouse.prePointer = "default";
	
	var br = false;
	for (var h = drawables.length - 1; h >= 0; h--) {
		for (var i = drawables[h].length - 1, p; i >= 0; i--) {
			p = drawables[h][i];
			
			if (!p.visible) continue;
			
			var dout = detectMouseRounded(p.x - 6, p.y - 6, p.w + 12, p.h + 12, 8);
			if (!dout) continue;
			
			var isFrame = p.constructor == Frame;
			var din = detectMouseRounded(p.x, p.y, p.w, p.h, p.cornerRadius);
			
			if (isFrame) {
				if (din || p.maximized) {
					if (detectMouse(p.x, p.y, p.w, 32)) {
						mouse.overFrameArea = "PANEL";
					}
					else {
						mouse.overFrameArea = "APP";
					}
				}
				else {
					if (detectMouse(p.x - 6, p.y - 6, 12, 12)) { // Top-left corner
						mouse.overFrameArea = "TOP_LEFT";
						if (p.resizable) newCursor = "nw-resize";
					}
					else if (detectMouse(p.x + 6, p.y - 6, p.w - 12, 6)) { // Top edge
						mouse.overFrameArea = "TOP";
						if (p.resizable) newCursor = "n-resize";
					}
					else if (detectMouse(p.x + p.w - 6, p.y - 6, 12, 12)) { // Top-right corner
						mouse.overFrameArea = "TOP_RIGHT";
						if (p.resizable) newCursor = "ne-resize";
					}
					else if (detectMouse(p.x + p.w, p.y + 6, 6, p.h - 12)) { // Right edge
						mouse.overFrameArea = "RIGHT";
						if (p.resizable) newCursor = "e-resize";
					}
					else if (detectMouse(p.x + p.w - 6, p.y + p.h - 6, 12, 12)) { // Bottom-right corner
						mouse.overFrameArea = "BOTTOM_RIGHT";
						if (p.resizable) newCursor = "se-resize";
					}
					else if (detectMouse(p.x + 6, p.y + p.h, p.w - 12, 6)) { // Bottom edge
						mouse.overFrameArea = "BOTTOM";
						if (p.resizable) newCursor = "s-resize";
					}
					else if (detectMouse(p.x - 6, p.y + p.h - 6, 12, 12)) { // Bottom-left corner
						mouse.overFrameArea = "BOTTOM_LEFT";
						if (p.resizable) newCursor = "sw-resize";
					}
					else if (detectMouse(p.x - 6, p.y + 6, 6, p.h - 12)) { // Left edge
						mouse.overFrameArea = "LEFT";
						if (p.resizable) newCursor = "w-resize";
					}
				}
			}
			else {
				if (!din) continue;
				mouse.overFrameArea = "DRAWABLE";
			}
			
			if (mouse.overDrawable != null && mouse.overDrawable != p) {
				try {
					mouse.overDrawable.mouseExit(event);
					p.mouseEnter(event);
				}
				catch (error) {
					showDialog(error, "error");
				}
			}
			
			mouse.overDrawable = p;

			try {
				p.mouseMove(event);
			}
			catch (error) {
				showDialog(error, "error", p);
			}

			br = true;
			break;
		}
		
		if (br) break;
	}

	if (newCursor != "default" || newCursor == mouse.prePointer) {
		setMouseCursor(newCursor);
	}
}

function setMouseCursor(cursor) {
	mouse.prePointer = cursor;
	if (mouse.pointer == cursor) return;

	if (cursor == "default") {
		htmlCanvas.style.cursor = "url(icons/Cursor/Default.png) 2 0, default";
	}
	else {
		htmlCanvas.style.cursor = cursor;
	}
	mouse.pointer = cursor;
}

function loadThemes() {
	let names = Style.themesURLs;
	var promises = [];
	Style.themes = new Array(names.length);
	
	for (let i = 0; i < names.length; i++) {
		promises.push(fetch(Style.getThemeURL(names[i]))
		.then((response) => {
			return response.json();
		})
		.then((theme) => {
			Style.themes[i] = theme;
			let images = [];
			
			for (let ap of theme.appearances) {
				if (!ap.backgroundURL || ap.backgroundURL == "") continue;
				
				let img = document.createElement("img");
				img.crossOrigin = "anonymous";
				img.src = Style.getThemeResource(theme.name, ap.backgroundURL);
				images.push(img.decode());
				
				ap.style.background = img;
			}

			return Promise.all(images);
		}));
	}
	
	return Promise.all(promises).then(() => {
		Style.setTheme(Style.themes[0]);
	})
	.catch((error) => {
		showDialog(error, "error");
	});
}

function loadImages() {
	images = {};
	icons = {};
	
	return fetch("imageIndex.json")
	.then((response) => {
		return response.json();
	})
	.then((database) => {
		var promises = [];
		
		for (let key in database.images) {
			images[key] = {};
			
			for (let i of database.images[key]) {
				let imgObj = {};
				
				let img = createImgElement("images/" + key.toString() + "/" + i);
				
				imgObj.original = img;
				imgObj.loaded = false;
				images[key][i.substring(0, i.indexOf("."))] = imgObj;
			}
		}
		
		for (let key in database.icons) {
			icons[key] = {};

			for (let i of database.icons[key]) {
				let  icObj = {};
				
				let ic;
				if (key.includes("global")) {
					ic = createImgElement("icons/" + i + ".png");
				}
				else {
					ic = createImgElement("icons/" + key + "/" + i + ".png");
				}
				
				icObj.original = ic;
				icObj.loaded = false;
				icons[key][i] = icObj;
			}
		}
		
		validated = false;

		return Promise.all(promises); 
		
		function createImgElement(src) {
			var img = document.createElement("img");
			img.crossOrigin = "anonymous";
			img.src = src;
			
			promises.push(img.decode());
			
			return img;
		}
	})
	.catch((error) => {
		showDialog(error, "error");
	});
}

function loadIcon(appName, name, w, h, color) {
	let icObj = {};

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
	else if (arguments.length >= 4) {
		let variant = "s_" + w + "x" + h;

		if (arguments.length == 5) 
			variant += "_" + color.slice(1);
		
		if (variant in icObj) {
			return icObj[variant];
		}
		else {
			let cnv = document.createElement("canvas");
			cnv.width = w;
			cnv.height = h;
			
			let ctx = cnv.getContext("2d");
			ctx.clearRect(0, 0, w, h);
			ctx.drawImage(icObj.original, 0, 0, w, h);
			ctx.globalCompositeOperation = "source-atop";
			
			if (arguments.length == 5) {
				ctx.fillStyle = color;
				ctx.fillRect(0, 0, w, h);
			}
			
			icObj[variant] = cnv;
			return cnv;
		}
	}
}

function loadImage(folder, name, w, h) {
	let imgObj = images[folder][name];
	
	if (arguments.length == 2) {
		return imgObj.original;
	}
	else {
		let variant = "s_" + w + "x" + h;

		if (variant in imgObj) {
			return imgObj[variant];
		}
		else {
			let cnv = document.createElement("canvas");
			cnv.width = w;
			cnv.height = h;
			cnv.getContext("2d").drawImage(imgObj.original, 0, 0, w, h);
			
			imgObj[variant] = cnv;
			return cnv;
		}
	}
}

function loadVideo(path) {
	let htmlVideo = document.createElement("video"); 
	
	let videoSource = document.createElement("source");
	videoSource.src = "videos/" + path;
	videoSource.type = "video/" + path.substring(path.indexOf(".") + 1, path.length);
	
	htmlVideo.appendChild(videoSource);
	
	return htmlVideo;
}

function loadFileSystem() {
	fileSystem = {};
	
	return fetch("fileSystem.json")
	.then((response) => {
		//console.log(response.text().then((text) => console.log(text)));
		return response.json();
	})
	.then((files) => {
		fileSystem = files;
		fileSystem.cache = new Map();
		
		var root = fileSystem.root;
		
		var passThrough = (file, path) => {
			fileSystem.cache.set(path, file);
			if (file.type != "File") {
				for (child of file.contents) {
					var newPath = path + child.name + (child.type == "Folder" ? "/" : "") 
					passThrough(child, newPath);
				}
			}
		};
		
		passThrough(root, "/");
		
		fileSystem.drives.forEach((drive, i) => {
			var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			passThrough(drive, abc.charAt(i) + ":/");
		});
		
		fileSystem.get = (path) => {
			var cache = fileSystem.cache;
			if (cache.has(path)) {
				return cache.get(path);
			}
			else if (path != "" && !path.endsWith("/")) {
				return fileSystem.get(path + "/");
			}
			else {
				return null;
			}
		};
		
		fileSystem.list = (path) => {
			var folder = fileSystem.get(path);
			if (!folder) return null;
			
			if (folder.type != "Folder") return null;
			
			return folder.contents;
		};
		
		console.log(fileSystem);

		return Promise.resolve();
	})
	.catch((error) => {
		console.error("There is an error related to the file system.");
		showDialog(error, "error");
	});
}

function loadLogin() {
	login = new LoginScreen();
	drawables[0].push(login);
	
	keyboard.focus = login;
	mouse.overDrawable = login;

	setTimeout(() => {
		drawables[0].shift();
	}, 700);
}

function openApp(app, ...args) {
	let newApp = new app(...args);
	let newFrame = new Frame(newApp);
	newApp.frame = newFrame;
	drawables[1].push(newFrame);
	
	keyboard.focus = newFrame;
	
	if (dock) {
		dock.checkOpenedApps();
		dock.setAutohide();
		dock.invalidate();
	}
}

function closeAppFrame(frame) {
	Animator.addAnimation({
		target: frame.transform,
		property: "scaleX",
		drawable: frame,
		interpolation: Animator.createCubicBezier(0.9, 1),
		a: 1,
		b: 0.95,
		duration: 0.24
	});
	Animator.addAnimation({
		target: frame.transform,
		property: "scaleY",
		drawable: frame,
		interpolation: Animator.createCubicBezier(0.9, 1),
		a: 1,
		b: 0.95,
		duration: 0.24
	});
	Animator.addAnimation({
		target: frame.transform,
		property: "opacity",
		drawable: frame,
		interpolation: Animator.createCubicBezier(0.9, 1),
		a: 1,
		b: 0,
		duration: 0.24,
		onFinish: function() {
			frame.close();
		
			drawables[1].splice(drawables[1].indexOf(frame), 1);
			
			mouse.overDrawable = null;
			mouse.frameAction = "";
			keyboard.focus = null;
			
			if (dock) {
				dock.checkOpenedApps();
				dock.setAutohide();
				dock.invalidate();
			}
			
			setTimeout(setFrameArea, 0);
		}
	});
}

function minimizeAppFrame(frame) {
	Animator.addAnimation({
		target: frame.transform,
		property: "scaleX",
		drawable: frame,
		interpolation: Animator.createCubicBezier(0, 0.1),
		a: 1,
		b: 0.4,
		duration: 0.24
	});
	Animator.addAnimation({
		target: frame.transform,
		property: "scaleY",
		drawable: frame,
		interpolation: Animator.createCubicBezier(0, 0.1),
		a: 1,
		b: 0.4,
		duration: 0.24
	});
	Animator.addAnimation({
		target: frame.transform,
		property: "translateY",
		drawable: frame,
		interpolation: Animator.createCubicBezier(0, 0.1),
		a: 0,
		b: height - frame.y,
		duration: 0.24
	});
	Animator.addAnimation({
		target: frame.transform,
		property: "opacity",
		drawable: frame,
		interpolation: Animator.createCubicBezier(0, 0.1),
		a: 1,
		b: 0.5,
		duration: 0.24,
		onFinish: function() {
			frame.visible = false;
			frame.hover.minimize = false; // Workaround
			if (frame.app.minimize) {
				frame.app.minimize();
			}

			mouse.overDrawable = null;
			mouse.frameAction = "";
			keyboard.focus = null;
			
			if (dock) {
				dock.setAutohide();
				dock.invalidate();
			}
			
			setTimeout(setFrameArea, 0);
		}
	});
}

function restoreAppFrame(frame) {
	if (!frame.visible) {
		Animator.addAnimation({
			target: frame.transform,
			property: "scaleX",
			drawable: frame,
			interpolation: Animator.createCubicBezier(0.9, 1),
			a: 0.4,
			b: 1,
			duration: 0.24
		});
		Animator.addAnimation({
			target: frame.transform,
			property: "scaleY",
			drawable: frame,
			interpolation: Animator.createCubicBezier(0.9, 1),
			a: 0.4,
			b: 1,
			duration: 0.24
		});
		Animator.addAnimation({
			target: frame.transform,
			property: "translateY",
			drawable: frame,
			interpolation: Animator.createCubicBezier(0.9, 1),
			a: height - frame.y,
			b: 0,
			duration: 0.24
		});
		Animator.addAnimation({
			target: frame.transform,
			property: "opacity",
			drawable: frame,
			interpolation: Animator.createCubicBezier(0.9, 1),
			a: 0.5,
			b: 1,
			duration: 0.24
		});
	}

	frame.visible = true;
	if (frame.app.restore) {
		frame.app.restore();
	}
	
	drawables[1].splice(drawables[1].indexOf(frame), 1);
	drawables[1].push(frame);

	keyboard.focus = frame;
	
	if (dock) {
		dock.setAutohide();
		dock.invalidate();
	}
	
	setTimeout(setFrameArea, 0);
}

function showDialog(message, type, invoker) {
	for (var i = 0; i < drawables[1].length; i++) {
		var f = drawables[1][i];
		if (f.app.constructor != DialogApp) continue;
		
		if (f.app.invoker && f.app.invoker === invoker) return;
	}
	
	if (type == "error") {
		console.error(message);
	}
	
	try {
		openApp(DialogApp, message, type, invoker);
	}
	catch (error) {
		document.removeChild(htmlCanvas);
		document.body.style.backgroundColor = "#FF0";
	}
}

function fillRoundedRect2(ctx, x, y, w, h, r1, r2, r3, r4) {
	setRoundedPath(ctx, x, y, w, h, r1, r2, r3, r4);
	ctx.fill();
}

function fillRoundedRect(ctx, x, y, w, h, r) {
	setRoundedPath(ctx, x, y, w, h, r, r, r, r);
	ctx.fill();
}

function setRoundedPath(ctx, x, y, w, h, r1, r2, r3, r4) {
	if (r2 == undefined || r3 == undefined || r4 == undefined) {
		r2 = r1;
		r3 = r1;
		r4 = r1;
	}

	ctx.beginPath();

	if (ctx.roundRect) {
		ctx.roundRect(x, y, w, h, [r1, r2, r3, r4]);
		return;
	}

	ctx.moveTo(x + r1, y);
	ctx.lineTo(x + w - r2, y);
	ctx.arc(x + w - r2, y + r2, r2, -0.5 * Math.PI, 0 * Math.PI);
	
	ctx.lineTo(x + w, y + h - r3);
	ctx.arc(x + w - r3, y + h - r3, r3, 0, 0.5 * Math.PI);
	
	ctx.lineTo(x + r4, y + h);
	ctx.arc(x + r4, y + h - r4, r4, 0.5 * Math.PI, Math.PI);
	
	ctx.lineTo(x, y + r1);
	ctx.arc(x + r1, y + r1, r1, Math.PI, 1.5 * Math.PI);
}

function createRoundedPath(x, y, w, h, r1, r2, r3, r4) {
	if (r2 == undefined || r3 == undefined || r4 == undefined) {
		r2 = r1;
		r3 = r1;
		r4 = r1;
	}

	let path = new Path2D();
	addNewRoundedPath(path, x, y, w, h, r1, r2, r3, r4);
	return path;
}

function addNewRoundedPath(path, x, y, w, h, r1, r2, r3, r4) {
	if (r2 == undefined || r3 == undefined || r4 == undefined) {
		r2 = r1;
		r3 = r1;
		r4 = r1;
	}

	if (path.roundRect) {
		path.roundRect(x, y, w, h, [r1, r2, r3, r4]);
		return;
	}

	path.moveTo(x + r1, y);
	path.lineTo(x + w - r2, y);
	path.arc(x + w - r2, y + r2, r2, -0.5 * Math.PI, 0 * Math.PI);
	
	path.lineTo(x + w, y + h - r3);
	path.arc(x + w - r3, y + h - r3, r3, 0, 0.5 * Math.PI);
	
	path.lineTo(x + r4, y + h);
	path.arc(x + r4, y + h - r4, r4, 0.5 * Math.PI, Math.PI);
	
	path.lineTo(x, y + r1);
	path.arc(x + r1, y + r1, r1, Math.PI, 1.5 * Math.PI);
}

function detectMouse(bx, by, bw, bh) {
	return detectPoint(mouse.x, mouse.y, bx, by, bw, bh);
}

function detectMouseRounded(bx, by, bw, bh, br) {
	return detectPointRounded(mouse.x, mouse.y, bx, by, bw, bh, br);
}

function detectPoint(mx, my, bx, by, bw, bh) {
	var bool1 = mx >= bx && mx < bx + bw;
	var bool2 = my >= by && my < by + bh;
	return bool1 && bool2;
}

function detectPointRounded(mx, my, bx, by, bw, bh, br) {
	if (!detectPoint(mx, my, bx, by, bw, bh)) 
		return false;

	function checkCorner(cx, cy) {
		let distSquared = Math.pow(mx - cx, 2) + Math.pow(my - cy, 2);
		return distSquared <= Math.pow(br, 2);
	}

	// Top-left corner
	if (detectPoint(mx, my, bx, by, br, br)) {
		let cx = bx + br;
		let cy = by + br;
		return checkCorner(cx, cy);
	}

	// Top-right corner
	if (detectPoint(mx, my, bx + bw - br, by, br, br)) {
		let cx = bx + bw - br;
		let cy = by + br;
		return checkCorner(cx, cy);
	}

	// Bottom-left corner
	if (detectPoint(mx, my, bx, by + bh - br, br, br)) {
		let cx = bx + br;
		let cy = by + bh - br;
		return checkCorner(cx, cy);
	}

	// Bottom-right corner
	if (detectPoint(mx, my, bx + bw - br, by + bh - br, br, br)) {
		let cx = bx + bw - br;
		let cy = by + bh - br;
		return checkCorner(cx, cy);
	}

	return true;
}

function setTextStyle(ctx, style, font, align, baseline) {
	ctx.fillStyle = style;
	ctx.font = font;
	ctx.textAlign = align;
	ctx.textBaseline = baseline;
}

function setCanvasSize(w, h) {
	canvas.width = width = w;
	canvas.height = height = h;
	
	htmlCanvas.width = w;
	htmlCanvas.height = h;
	
	//blurCanvas.width = w;
	//blurCanvas.height = h;
	
	drawingCanvas.width = w;
	drawingCanvas.height = h;
	
	validated = false;
}

function setCanvasMargin() {
	let top = innerHeight > height ? (innerHeight - height) / 2 : -(height - innerHeight);
	let left = (innerWidth - width) / 2;

	if (margin.top != top || margin.left != left) {
		margin.top = top;
		margin.left = left;
		
		htmlCanvas.style.top = margin.top + "px";
		htmlCanvas.style.left = margin.left + "px";
	}
}

function setPrototype(f, p) {
	f.prototype = p;
	p.constructor = f;
}
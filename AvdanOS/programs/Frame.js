function Frame(app) {
	this.app = app;
	
	this.minW = 340;
	this.minH = 32;
	
	if (app.minW) this.minW = Math.max(this.minW, app.minW);
	if (app.minH) this.minH = Math.max(this.minH, app.minH + 32);
	
	this.x = app.x;
	this.y = app.y - 32;
	this.w = Math.max(app.w, this.minW);
	this.h = Math.max(app.h + 32, this.minH);
	
	app.x = 0;
	app.y = 32;
	app.w = this.w;
	app.h = this.h - 32;
	
	app.w = this.w;
	app.h = this.h - 32;
	
	this.movable = true;
	this.resizable = true;
	this.type = "Frame";
	
	this.rx = 0;
	this.ry = 0;
	this.rw = 0;
	this.rh = 0;
	this.resizing = false;
	
	this.apps = [app];
	this.indexApp = 0;
	
	this.icClose = loadIcon("Frame", "Close");
	this.icMinimize = loadIcon("Frame", "Minimize");
	this.icMaximize = loadIcon("Frame", "Maximize");
	this.icSplitLeft = loadIcon("Frame", "SplitLeft");
	this.icMultitask = loadIcon("Frame", "Multitask");
	this.icSplitRight = loadIcon("Frame", "SplitRight");
	this.icAddTab = loadIcon("Frame", "AddTab");
	
	this.initCanvas(this);
	
	this.draw = (ctx) => {
		//ctx.translate(this.x, this.y);
		
		ctx.fillStyle = "#000000AA";
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		//ctx.shadowBlur = 1;
		ctx.shadowColor = "#222222";
		
		fillRoundedRect(ctx, 0, 0, this.w, this.h, 6);
		
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 0;
		
		ctx.fillStyle = "#FFFFFF22";
		fillRoundedRect(ctx, this.w - 78, 6, 72, 20, 4);
		
		if (this.detectMouseClose()) fillRoundedRect2(ctx, this.w - 24 - 6, 6, 24, 20, 0, 4, 4, 0);
		if (this.detectMouseMinimize()) ctx.fillRect(this.w - 48 - 6, 6, 24, 20);
		if (this.detectMouseMaximize()) fillRoundedRect2(ctx, this.w - 72 - 6, 6, 24, 20, 4, 0, 0, 4);
		
		ctx.drawImage(this.icClose, this.w - 10 - 13, 11, 10, 10);
		ctx.drawImage(this.icMinimize, this.w - 20 - 27, 11, 10, 10);
		ctx.drawImage(this.icMaximize, this.w - 30 - 41, 11, 10, 10);
		
		fillRoundedRect(ctx, this.w - 156, 6, 72, 20, 4);
		
		if (this.detectMouseSplitLeft()) fillRoundedRect2(ctx, this.w - 96 - 12, 6, 24, 20, 0, 4, 4, 0);
		if (this.detectMouseMultitask()) ctx.fillRect(this.w - 120 - 12, 6, 24, 20);
		if (this.detectMouseSplitRight()) fillRoundedRect2(ctx, this.w - 144 - 12, 6, 24, 20, 4, 0, 0, 4);
		
		ctx.drawImage(this.icSplitLeft, this.w - 40 - 61, 11, 10, 10);
		ctx.drawImage(this.icMultitask, this.w - 50 - 75, 11, 10, 10);
		ctx.drawImage(this.icSplitRight, this.w - 60 - 89, 11, 10, 10);
		
		this.app = this.apps[this.indexApp];
		
		for (var i = 0, app; i < this.apps.length; i++) {
			app = this.apps[i];
			
			ctx.fillStyle = this.apps.length > 1 ? (i === this.indexApp ? "#FFFFFF44" : "#CCCCCC22") : "#FFFFFF22";
			fillRoundedRect(ctx, 6 + i * 120 + i * 6, 6, 120, 20, 4);
			
			setTextStyle(ctx, "#FFFFFF", "12px sans-serif", "center", "middle");
			ctx.fillText(app.title, 6 + i * 120 + i * 6 + 60, 17);
		}
		
		ctx.drawImage(this.icAddTab, 6 * (this.apps.length + 1) + this.apps.length * 120, 10);
		
		var app = this.apps[this.indexApp];
		
		ctx.translate(0, 32);
		
		app.draw(ctx);
		
		ctx.translate(0, -32);
	};
	
	this.add = (app) => {
		this.apps.push(app);
		
		this.minW = Math.max(this.minW, app.minW);
		this.minH = Math.max(this.minH, app.minH + 32);
		
		this.setSize(200 + 130 * this.apps.length, this.h);
		
		app.x = 0;
		app.y = 32;
		app.w = this.w;
		app.h = this.h - 32;
	};
	
	this.remove = (app) => {
		this.apps.splice(this.apps.indexOf(app), 1);
	};
	
	this.move = (dx, dy) => {
		this.x += dx;
		this.y += dy;
		
		for (app of this.apps) {
			app.x += dx;
			app.y += dy;
		}
	};
	
	this.startResize = () => {
		this.resizing = true;
		this.rx = this.x;
		this.ry = this.y;
		this.rw = this.w;
		this.rh = this.h;
	};
	
	this.resize = (dt, db, dl, dr) => {
		if (this.resizing) {
			dt = Math.min(dt, this.rh - this.minH);
			dl = Math.min(dl, this.rw - this.minW);
			
			this.x = this.rx + dl;
			this.y = this.ry + dt;
			this.w = Math.max(this.rw + dr - dl, this.minW);
			this.h = Math.max(this.rh + db - dt, this.minH);
			
			for (a of this.apps) { 
				a.x = this.x;
				a.y = this.y + 32;
				a.w = this.w;
				a.h = this.h - 32;
			}
		}
	};
	
	this.setSize = (w, h) => {
		this.w = Math.max(w, this.minW);
		this.h = Math.max(h, this.minH);
	
		for (a of this.apps) { 
			a.w = this.w;
			a.h = this.h - 32;
		}
	};
	
	this.endResize = () => {
		this.resizing = false;
	};
	
	this.detectMouseClose = () => {
		return detectMouse(this.x + this.w - 30, this.y + 6, 24, 20);
	}
	
	this.detectMouseMinimize = () => {
		return detectMouse(this.x + this.w - 54, this.y + 6, 24, 20);
	}
	
	this.detectMouseMaximize = () => {
		return detectMouse(this.x + this.w - 78, this.y + 6, 24, 20);
	}
	
	this.detectMouseSplitLeft = () => {
		return detectMouse(this.x + this.w - 108, this.y + 6, 24, 20);
	}
	
	this.detectMouseMultitask = () => {
		return detectMouse(this.x + this.w - 132, this.y + 6, 24, 20);
	}
	
	this.detectMouseSplitRight = () => {
		return detectMouse(this.x + this.w - 156, this.y + 6, 24, 20);
	}
	
	this.detectMouseAddTab = () => {
		return detectMouse(this.x + 6 * (this.apps.length + 1) + this.apps.length * 120 - 2, this.y + 8, 16, 16);
	}
	
	this.mouseDown = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseDown) {
			this.app.mouseDown(event);
		}
		//console.log("Frame " + this.app.title + ": Mouse down.");
	}
	
	this.mouseMove = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseMove) {
			this.app.mouseMove(event);
		}
		//console.log("Frame " + this.app.title + ": Mouse moved.");
	}
	
	this.mouseDrag = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseDrag) {
			this.app.mouseDrag(event);
		}
		//console.log("Frame " + this.app.title + ": Mouse dragged.");
	}
	
	this.mouseUp = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseUp) {
			this.app.mouseUp(event);
		}
		//console.log("Frame " + this.app.title + ": Mouse up.");
	}
	
	this.mouseClick = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			if (this.detectMouseClose()) {
				drawables[1].splice(drawables.indexOf(this), 1);
				setTimeout(setFrameArea, 0);
				console.log("Closing " + this.app.title);
			}
			//console.log("Detecting " + this.app.title);
		}
		else if (this.app.mouseClick) {
			this.app.mouseClick(event);
		}
		//console.log("Frame " + this.app.title + ": Mouse clicked.");
	}
}

setDrawablePrototype(Frame);
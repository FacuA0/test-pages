var FrameProto = {
	minW: 340,
	minH: 32,
	
	winX: 0,
	winY: 0,
	winW: 0,
	winH: 0,
	maximized: false,

	rx: 0,
	ry: 0,
	rw: 0,
	rh: 0,
	resizing: false,
	
	draw: function(ctx) {
		//ctx.translate(this.x, this.y);
		
		ctx.fillStyle = Style.windowColor;
		ctx.globalAlpha = Style.windowTransparency;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		//ctx.shadowBlur = 1;
		ctx.shadowColor = "#222";
		
		//fillRoundedRect(ctx, 0, 0, this.w, this.h, 0);
		ctx.fillRect(0, 0, this.w, this.h);
		
		ctx.globalAlpha = 1;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 0;
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, this.w - 78, 6, 72, 20, 4);
		
		if (this.hover.close) fillRoundedRect2(ctx, this.w - 24 - 6, 6, 24, 20, 0, 4, 4, 0);
		if (this.hover.minimize) ctx.fillRect(this.w - 48 - 6, 6, 24, 20);
		if (this.hover.maximize) fillRoundedRect2(ctx, this.w - 72 - 6, 6, 24, 20, 4, 0, 0, 4);
		
		this.setIconColor(Style.iconColor);
		this.drawIcon(ctx, this.icClose, this.w - 10 - 13, 11, 10, 10);

		ctx.globalAlpha = this.resizable ? 1 : 0.5;
		this.drawIcon(ctx, this.icMinimize, this.w - 20 - 27, 11, 10, 10);
		this.drawIcon(ctx, this.icMaximize, this.w - 30 - 41, 11, 10, 10);
		ctx.globalAlpha = 1;
		
		if (this.multitask) {
			fillRoundedRect(ctx, this.w - 156, 6, 72, 20, 4);
			
			if (this.hover.splitLeft) fillRoundedRect2(ctx, this.w - 96 - 12, 6, 24, 20, 0, 4, 4, 0);
			if (this.hover.multitask) ctx.fillRect(this.w - 120 - 12, 6, 24, 20);
			if (this.hover.splitRight) fillRoundedRect2(ctx, this.w - 144 - 12, 6, 24, 20, 4, 0, 0, 4);
			
			this.drawIcon(ctx, this.icSplitLeft, this.w - 40 - 61, 11, 10, 10);
			this.drawIcon(ctx, this.icMultitask, this.w - 50 - 75, 11, 10, 10);
			this.drawIcon(ctx, this.icSplitRight, this.w - 60 - 89, 11, 10, 10);
		}
		
		this.app = this.apps[this.indexApp];
		
		for (var i = 0, app; i < this.apps.length; i++) {
			app = this.apps[i];
			
			ctx.fillStyle = this.apps.length > 1 ? (i === this.indexApp ? "#FFF4" : "#CCC2") : Style.buttonColor;
			fillRoundedRect(ctx, 6 + i * 134 + i * 6, 6, 134, 20, 4);
			
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "middle");
			ctx.fillText(app.title, 6 + i * 134 + i * 6 + 67, 17);
			
			let ic = loadIcon("Apps", this.app.constructor.name.slice(0, -3), 14, 14);
			if (!ic) ic = this.icTab;
			ctx.drawImage(ic, 9 + i * 140, 9);
		}
		
		if (this.multitask) {
			let x = 6 * (this.apps.length + 1) + this.apps.length * 134;
			let b = this.detectMouse(x, 8, 16, 16);
			ctx.fillStyle = "#FFF1";
			if (this.hover.addTab) fillRoundedRect(ctx, x, 6, 20, 20, 4);
			
			this.drawIcon(ctx, this.icAddTab, x + 4, 10);
		}
		
		var app = this.apps[this.indexApp];
		
		ctx.translate(0, 32);
		
		try {
			app.draw(ctx);
		}
		catch (error) {
			ctx.translate(0, -32);
			throw error;
		}
		
		ctx.translate(0, -32);
	},
	
	add: function(app) {
		this.apps.push(app);
		
		this.minW = Math.max(this.minW, app.minW);
		this.minH = Math.max(this.minH, app.minH + 32);
		
		this.setSize(200 + 130 * this.apps.length, this.h);
		
		app.x = 0;
		app.y = 32;
		app.w = this.w;
		app.h = this.h - 32;
	},
	
	remove: function(app) {
		let i = this.apps.indexOf(app);
		this.apps[i].frame = null;
		this.apps.splice(i, 1);
	},
	
	move: function(dx, dy) {
		this.x += dx;
		this.y += dy;
		
		for (app of this.apps) {
			app.x += dx;
			app.y += dy;
			
			app.windowMove();
		}
	},
	
	startResize: function() {
		if (this.resizable) {
			this.resizing = true;
			
			this.rx = this.x;
			this.ry = this.y;
			this.rw = this.w;
			this.rh = this.h;
			
			for (a of this.apps) { 
				a.windowStartResize();
			}
		}
	},
	
	resize: function(dt, db, dl, dr) {
		if (this.resizing) {
			dt = Math.min(dt, this.rh - this.minH);
			dl = Math.min(dl, this.rw - this.minW);
			
			this.x = this.rx + dl;
			this.y = this.ry + dt;
			this.w = Math.max(this.minW, this.rw + dr - dl);
			this.h = Math.max(this.minH, this.rh + db - dt);
			
			for (a of this.apps) { 
				a.x = this.x;
				a.y = this.y + 32;
				a.w = this.w;
				a.h = this.h - 32;
				
				a.windowResize();
			}
			
			this.invalidate();
		}
	},
	
	setSize: function(w, h) {
		this.w = Math.max(w, this.minW);
		this.h = Math.max(h, this.minH);
	
		for (a of this.apps) { 
			a.w = this.w;
			a.h = this.h - 32;
		}
	},
	
	endResize: function() {
		this.resizing = false;

		for (a of this.apps) { 
			a.windowEndResize();
		}
	},
	
	maximize: function() {
		if (!this.resizable) return;
		
		this.maximized = true;
		
		this.winX = this.x;
		this.winY = this.y;
		this.winW = this.w;
		this.winH = this.h;

		Animator.addAnimation({
			target: this,
			property: "x",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 1),
			b: 0,
			duration: 0.3
		});
		Animator.addAnimation({
			target: this,
			property: "y",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 1),
			b: 0,
			duration: 0.3
		});
		Animator.addAnimation({
			target: this,
			property: "w",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 1),
			b: width,
			duration: 0.3
		});
		Animator.addAnimation({
			target: this,
			property: "h",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 1),
			b: height,
			duration: 0.3,
			onFinish: function(anim) {
				for (a of anim.target.apps) {
					a.x = anim.target.x;
					a.y = anim.target.y + 32;
					a.w = anim.target.w;
					a.h = anim.target.h - 32;
				}

				setTimeout(setFrameArea, 0);
		
				anim.target.cornerRadius = 0;
			}
		});
		
		dock.setAutohide();
		this.invalidate();
	},
	
	restore: function() {
		this.maximized = false;
		Animator.addAnimation({
			target: this,
			property: "x",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 1),
			b: this.winX,
			duration: 0.3
		});
		Animator.addAnimation({
			target: this,
			property: "y",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 1),
			b: this.winY,
			duration: 0.3
		});
		Animator.addAnimation({
			target: this,
			property: "w",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 1),
			b: this.winW,
			duration: 0.3
		});
		Animator.addAnimation({
			target: this,
			property: "h",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 1),
			b: this.winH,
			duration: 0.3,	
			onFinish: function(anim) {
				for (a of anim.target.apps) {
					a.x = anim.target.x;
					a.y = anim.target.y + 32;
					a.w = anim.target.w;
					a.h = anim.target.h - 32;
				}
				
				setTimeout(setFrameArea, 0);
			}
		});
		
		this.cornerRadius = 6;
		
		dock.setAutohide();
		this.invalidate();
	},
	
	restoreDragged: function() {
		this.maximized = false;
		Animator.addAnimation({
			target: this,
			property: "x",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 1),
			get b() {
				let t = this.target; 
				return Math.min(Math.max(mouse.x - t.winW / 2, 0), width - t.winW);
			},
			duration: 0.3
		});
		Animator.addAnimation({
			target: this,
			property: "w",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 0),
			b: this.winW,
			duration: 0.3
		});
		Animator.addAnimation({
			target: this,
			property: "h",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 1),
			b: this.winH,
			duration: 0.3,	
			onFinish: function(anim) {
				for (a of anim.target.apps) {
					a.x = anim.target.x;
					a.y = anim.target.y + 32;
					a.w = anim.target.w;
					a.h = anim.target.h - 32;
				}
			}
		});
		
		this.cornerRadius = 6;
		
		dock.setAutohide();
		
		setTimeout(this.setFrameArea, 0);
		this.invalidate();
	},
	
	close: function() {
		for (app of this.apps) {
			app.close();
			app.frame = null;
		}
	},
	
	detectMouseClose: function() {
		let b = this.detectMouse(this.w - 30, 6, 24, 20);
		this.hover.close = b;
		return b;
	},
	
	detectMouseMinimize: function() {
		let b = this.detectMouse(this.w - 54, 6, 24, 20) && this.resizable;
		this.hover.minimize = b;
		return b;
	},
	
	detectMouseMaximize: function() {
		let b = this.detectMouse(this.w - 78, 6, 24, 20) && this.resizable;
		this.hover.maximize = b;
		return b;
	},
	
	detectMouseSplitLeft: function() {
		let b = this.detectMouse(this.w - 108, 6, 24, 20) && this.multitask;
		this.hover.splitLeft = b;
		return b;
	},
	
	detectMouseMultitask: function() {
		let b = this.detectMouse(this.w - 132, 6, 24, 20) && this.multitask;
		this.hover.multitask = b;
		return b;
	},
	
	detectMouseSplitRight: function() {
		let b = this.detectMouse(this.w - 156, 6, 24, 20) && this.multitask;
		this.hover.splitRight = b;
		return b;
	},
	
	detectMouseAddTab: function() {
		let x = 6 * (this.apps.length + 1) + this.apps.length * 134;
		let b = this.detectMouse(x, 6, 20, 20) && this.multitask;
		this.hover.addTab = b;
		return b;
	},
	
	mouseDown: function(event) {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseDown) {
			this.app.mouseDown(event);
		}
	},
	
	mouseMove: function(event) {
		let inval = false;

		if (this.detectMouse(0, 0, this.w, 32)) {
			if (this.mouseInApp) {
				this.app.mouseExit(event);
				this.mouseInApp = false;
				newVal = true;
			}

			let hover = this.hover;
		
			inval = hover.close != this.detectMouseClose() || inval;
			inval = hover.minimize != this.detectMouseMinimize() || inval;
			inval = hover.maximize != this.detectMouseMaximize() || inval;
			inval = hover.splitLeft != this.detectMouseSplitLeft() || inval;
			inval = hover.multitask != this.detectMouseMultitask() || inval;
			inval = hover.splitRight != this.detectMouseSplitRight() || inval;
			inval = hover.addTab != this.detectMouseAddTab() || inval;
		}
		else {
			if (!this.mouseInApp) {
				for (e in this.hover) {
					inval = inval || this.hover[e];
					this.hover[e] = false;
				}

				this.app.mouseEnter(event);
				this.mouseInApp = true;
				if (!this.app.validated) inval = true;
			}

			if (this.app.mouseMove) {
				this.app.mouseMove(event);
				if (!this.app.validated) inval = true;
			}
		}

		if (inval) this.invalidate();
	},
	
	mouseDrag: function(event) {
		if (this.app.mouseDrag) {
			this.app.mouseDrag(event);
		}
	},
	
	mouseUp: function(event) {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseUp) {
			this.app.mouseUp(event);
		}
	},
	
	mouseWheel: function(event) {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseWheel) {
			this.app.mouseWheel(event);
		}
	},
	
	mouseClick: function(event) {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			if (this.hover.close) {
				closeAppFrame(this);
			}
			
			if (this.hover.minimize) {
				minimizeAppFrame(this);
			}
			
			if (this.hover.maximize) {
				if (!this.maximized) {
					this.maximize();
				}
				else {
					this.restore();
				}
				
				setTimeout(setFrameArea, 0);
			}
		}
		else if (this.app.mouseClick) {
			this.app.mouseClick(event);
		}
	},

	mouseEnter: function(event) {
		this.mouseInApp = false;
		if (this.detectMouse(0, 32, this.w, this.h - 32)) {
			this.mouseInApp = true;
			this.app.mouseEnter(event);
			this.invalidate();
		}
	},
	
	mouseExit: function(event) {
		if (this.mouseInApp) {
			this.app.mouseExit(event);
		}
		else {
			for (e in this.hover) this.hover[e] = false;
		}
		
		this.invalidate();
	},
	
	keyDown: function(event) {
		this.app.keyDown(event);
		if (!this.app.validated) this.invalidate();
	},
	
	keyType: function(event) {
		this.app.keyType(event);
		if (!this.app.validated) this.invalidate();
	},
	
	keyUp: function(event) {
		this.app.keyUp(event);
		if (!this.app.validated) this.invalidate();
	}
};

function Frame(app) {
	this.app = app;
	
	if (app.minW) this.minW = Math.max(this.minW, app.minW);
	if (app.minH) this.minH = Math.max(this.minH, app.minH + 32);
	
	this.w = Math.max(this.minW, app.w);
	this.h = Math.max(this.minH, app.h + 32);
	
	if ((app.hasOwnProperty("x") && app.x != undefined) || (app.hasOwnProperty("y") && app.y != undefined)) {
		this.x = app.x;
		this.y = app.y - 32;
	}
	else {
		this.x = parseInt(Math.max(0, (width - this.w) / 2));
		this.y = parseInt(Math.max(0, (height - this.h) / 2));
		app.x = this.x;
		app.y = this.y + 32;
	}
	
	app.w = this.w;
	app.h = this.h - 32;
	
	this.apps = [app];
	this.indexApp = 0;
	this.title = app.title;
	
	this.movable = true;
	this.resizable = app.resizable !== false;
	this.multitask = app.multitask !== false;

	this.mouseInApp = false;
	
	this.icClose = loadIcon("Frame", "Close", 10, 10);
	this.icMinimize = loadIcon("Frame", "Minimize", 10, 10);
	this.icMaximize = loadIcon("Frame", "Maximize", 10, 10);
	this.icSplitLeft = loadIcon("Frame", "SplitLeft", 10, 10);
	this.icMultitask = loadIcon("Frame", "Multitask", 10, 10);
	this.icSplitRight = loadIcon("Frame", "SplitRight", 10, 10);
	this.icTab = loadIcon("global", "Default", 12, 12);
	this.icAddTab = loadIcon("Frame", "AddTab", 12, 12);

	this.hover = {
		close: false,
		minimize: false,
		maximize: false,
		splitLeft: false,
		multitask: false,
		splitRight: false,
		addTab: false
	};
	
	this.initTransform();

	Animator.addAnimation({
		target: this.transform,
		property: "scaleX",
		drawable: this,
		interpolation: Animator.createCubicBezier(0.9, 1),
		a: 0.95,
		b: 1,
		duration: 0.24
	});
	Animator.addAnimation({
		target: this.transform,
		property: "scaleY",
		drawable: this,
		interpolation: Animator.createCubicBezier(0.9, 1),
		a: 0.95,
		b: 1,
		duration: 0.24
	});
	Animator.addAnimation({
		target: this.transform,
		property: "opacity",
		drawable: this,
		interpolation: Animator.createCubicBezier(0.9, 1),
		a: 0,
		b: 1,
		duration: 0.24
	});
	
	this.initCanvas();
}

FrameProto.__proto__ = Drawable;
setPrototype(Frame, FrameProto);
var DockProto = {
	w: 978,
	h: 42,
	
	cornerRadius: 8,

	widthApps: 408,
	widthMain: 138,
	widthTime: 198,
	widthStatus: 198,
	
	draw: function(ctx) {
		//ctx.translate(this.x, this.y);
		
		ctx.fillStyle = "#0002";
		//fillRoundedRect(0, 0, this.w, this.h, 8);
		
		ctx.globalAlpha = Style.windowTransparency;
		ctx.fillStyle = Style.windowColor;
		let panelX = 0;

		// Apps panel background
		fillRoundedRect(ctx, panelX, 0, this.widthApps, this.h, 8);
		panelX += this.widthApps + 12;
		
		// Main panel background
		fillRoundedRect(ctx, panelX, 0, this.widthMain, this.h, 8);
		panelX += this.widthMain + 12;
		
		// Time panel background
		fillRoundedRect(ctx, panelX, 0, this.widthTime, this.h, 8);
		panelX += this.widthTime + 12;
		
		// Status panel background
		fillRoundedRect(ctx, panelX, 0, this.widthStatus, this.h, 8);
		ctx.globalAlpha = 1;

		// Apps panel
		
		let posX = 10;
		ctx.fillStyle = Style.buttonColor;
		
		this.pinnedApps.forEach((ic, i) => {
			if (ic.hover) fillRoundedRect(ctx, posX + i * 42, 4, 34, 34, 6);
			
			ctx.drawImage(ic.icon, posX + 2 + i * 42, 6);
			
			let app = this.findAppFrame(ic);
			if (app) {
				ctx.strokeStyle = app.visible ? Style.accentColor : Style.textColor;
				ctx.lineWidth = 2;
			
				ctx.beginPath();
					ctx.moveTo(posX + 8 + i * 42, 38);
					ctx.lineTo(posX + 26 + i * 42, 38);
				ctx.stroke();
			}
		});

		posX += this.pinnedApps.length * 42;

		this.openedApps.forEach((ic, i) => {
			if (ic.hover) fillRoundedRect(ctx, posX + i * 42, 4, 34, 34, 6);
			
			ctx.drawImage(ic.icon, posX + 2 + i * 42, 6);
			
			let app = this.findAppFrame(ic);
			if (app) {
				ctx.strokeStyle = app.visible ? Style.accentColor : Style.textColor;
				ctx.lineWidth = 2;
			
				ctx.beginPath();
					ctx.moveTo(posX + 8 + i * 42, 38);
					ctx.lineTo(posX + 26 + i * 42, 38);
				ctx.stroke();
			}
		});

		posX += this.openedApps.length * 42;
		
		ctx.globalAlpha = 0.3;
		ctx.strokeStyle = Style.textColor;
		ctx.lineWidth = 2;
		
		ctx.beginPath();
			ctx.moveTo(posX - 1, 6);
			ctx.lineTo(posX - 1, 36);
		ctx.stroke();
		ctx.globalAlpha = 1;

		posX += 6;
		
		this.pinnedApps2.forEach((ic, i) => {
			if (ic.hover) fillRoundedRect(ctx, posX + 42 * i, 4, 34, 34, 6);
			
			ctx.drawImage(ic.icon, posX + 2 + 42 * i, 6);
			
			let app = this.findAppFrame(ic);
			if (app) {
				ctx.strokeStyle = app.visible ? Style.accentColor : Style.textColor;
				ctx.lineWidth = 2;
			
				ctx.beginPath();
					ctx.moveTo(posX + 8 + i * 42, 38);
					ctx.lineTo(posX + 26 + i * 42, 38);
				ctx.stroke();
			}
		});
		
		posX += 42 * this.pinnedApps2.length;

		this.setIconColor(Style.iconColor);
		this.drawIcon(ctx, this.icHide, posX - 5, 14);

		posX += 14 + 12;

		// Main panel

		if (this.hoverMain.search)
			fillRoundedRect(ctx, posX + 10, 4, 34, 34, 6);
		if (this.hoverMain.start)
			fillRoundedRect(ctx, posX + 52, 4, 34, 34, 6);
		if (this.hoverMain.recents)
			fillRoundedRect(ctx, posX + 94, 4, 34, 34, 6);

		this.setIconColor(Style.iconColor);
		this.drawIcon(ctx, this.icSearch, posX + 19, 13);
		this.drawIcon(ctx, this.icAvdan, posX + 59, 11);
		this.drawIcon(ctx, this.icRecents, posX + 103, 13);
		
		//ctx.fillRect(0, 0, 32, 32);
		
		posX += this.widthMain + 12;

		// Time panel

		let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		let months = ["January", "February", "March", "April", "May", "June", "July", 
					  "August", "September", "October", "November", "December"];
		
		let date = new Date();
		
		let hours = date.getHours();
		let minutes = date.getMinutes();
		
		hours = String(hours).length < 2 ? "0" + hours : hours;
		minutes = String(minutes).length < 2 ? "0" + minutes : minutes;
		
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "top");
		ctx.fillText(hours + ":" + minutes, posX + 10, 8);
		
		ctx.font = "10px sans-serif";
		ctx.textBaseline = "bottom";
		ctx.fillText(daysOfWeek[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate(), posX + 10, 34);
		
		ctx.drawImage(this.icWeatherSun, posX + 116, 12, 18, 18);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "right", "middle");
		ctx.fillText("24\u00B0", posX + 158, 22);
		
		ctx.fillStyle = Style.buttonColor;
		ctx.beginPath();
		ctx.arc(posX + 178, 21, 9, 0 * Math.PI, 2 * Math.PI);
		ctx.fill();
		
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "middle");
		ctx.fillText("3", posX + 178, 22);

		posX += this.widthTime + 12;

		// Status panel
		
		ctx.fillStyle = Style.buttonColor;
		
		// Base: 780
		if (this.hoverStatusBar.wifi)
			fillRoundedRect(ctx, posX + 10, 4, 34, 34, 6);
		if (this.hoverStatusBar.bluetooth)
			fillRoundedRect(ctx, posX + 46, 4, 34, 34, 6);
		if (this.hoverStatusBar.sound)
			fillRoundedRect(ctx, posX + 82, 4, 34, 34, 6);
		if (this.hoverStatusBar.battery)
			fillRoundedRect(ctx, posX + 118, 4, 34, 34, 6);
		if (this.hoverStatusBar.more)
			fillRoundedRect(ctx, posX + 154, 4, 34, 34, 6);
		

		this.setIconColor(Style.iconColor);
		this.drawIcon(ctx, this.icWifi, posX + 15, 9);
		this.drawIcon(ctx, this.icBluetooth, posX + 53, 11);
		this.drawIcon(ctx, this.icSound, posX + 89, 11);
		this.drawIcon(ctx, this.icBattery, posX + 122, 8);
		this.drawIcon(ctx, this.icQuick, posX + 161, 11);
		
		//ctx.translate(-this.x, -this.y);
	},
	
	show: function() {
		if (!this.hidden || this.showing) return;
		
		Animator.addAnimation({
			target: this,
			property: "y",
			drawable: this,
			interpolation: Animator.createCubicBezier(0.9, 1),
			b: this.sy,
			duration: 0.4,
			onFinish: function(anim) {
				anim.target.showing = false;
			}
		});
		
		this.showing = true;
		this.visible = true;
		this.hidden = false;
		this.invalidate();
	},
	
	hide: function() {
		if (this.hidden || this.hiding) return;
		
		Animator.addAnimation({
			target: this,
			property: "y",
			drawable: this,
			interpolation: Animator.createCubicBezier(0, 0.1),
			b: this.hy,
			duration: 0.4,
			onFinish: function(anim) {
				let target = anim.target;
				target.hiding = false;
				target.visible = false;
				target.hidden = true;
			}
		});
		
		this.hiding = true;
		
		this.invalidate();
	},
	
	setAutohide: function() {
		let auto = false;
		for (let i = 0; i < drawables[1].length; i++) {
			let f = drawables[1][i];
			if (!f.visible) continue;

			auto = f.maximized;
		}
		
		if (start.opened) auto = false;
		
		this.autohide = auto;
		if (!auto) {
			this.show();
		}
		else if (!this.detectMouse(0, 0, this.w, this.h)) {
			this.hide();
		}
	},

	reloadWidth: function() {
		// Recalculating apps bar width.
		let newWidthApps = 10;
		newWidthApps += this.pinnedApps.length * 42;
		newWidthApps += this.openedApps.length * 42 + 6;
		newWidthApps += this.pinnedApps2.length * 42 + 14;
		this.widthApps = newWidthApps;

		// The other bars have constant width for the moment.

		// Recalculating dock width and position.
		this.w = this.widthApps + this.widthMain + this.widthTime + this.widthStatus + 12 * 3;
		this.x = width / 2 - this.w / 2;
	},

	checkOpenedApps: function() {
		let openedApps = [];

		drawables[1].forEach(frame => {
			let type = frame.app.constructor;

			if (this.pinnedApps.find(app => app.app == type)) return;
			if (this.pinnedApps2.find(app => app.app == type)) return;

			if (openedApps.find(app => app.app == type) == undefined) {
				let icon = loadIcon("Apps", type.name.slice(0, -3), 30, 30);
				if (icon == null) icon = loadIcon("global", "Default", 30, 30);

				openedApps.push({
					app: type,
					name: type.name,
					icon: icon,
					hover: false
				});
			}
		});

		this.openedApps = openedApps;
		this.reloadWidth();
	},

	getShapePath: function() {
		let path = new Path2D();
		let panelX = 0;

		// Apps panel shape
		addNewRoundedPath(path, panelX, 0, this.widthApps, this.h, 8);
		panelX += this.widthApps + 12;
		
		// Main panel shape
		addNewRoundedPath(path, panelX, 0, this.widthMain, this.h, 8);
		panelX += this.widthMain + 12;
		
		// Time panel shape
		addNewRoundedPath(path, panelX, 0, this.widthTime, this.h, 8);
		panelX += this.widthTime + 12;
		
		// Status panel shape
		addNewRoundedPath(path, panelX, 0, this.widthStatus, this.h, 8);

		return path;
	},

	isStartHovered: function() {
		return this.hoverMain.start;
	},
	
	findAppFrame: function(dockApp) {
		return drawables[1].find(frame => frame.app.constructor == dockApp.app);
	},
	
	mouseClick: function(event) {
		let posX = 10;

		if (this.detectMouse(posX, 4, 42 * this.pinnedApps.length, 34)) {
			for (let i = 0; i < this.pinnedApps.length; i++) {
				
				if (!this.pinnedApps[i].hover) continue;
				
				let currentApp = this.pinnedApps[i];
				let s = this.findAppFrame(currentApp);
				if (s == undefined) {
					if (!currentApp.app) return;
					
					openApp(currentApp.app);
				}
				else {
					if (s.visible && drawables[1].indexOf(s) == drawables[1].length - 1) {
						minimizeAppFrame(s);
					}
					else {
						restoreAppFrame(s);
					}
				}
				return;
			}
		}

		posX += this.pinnedApps.length * 42;

		if (this.detectMouse(posX, 4, 42 * this.openedApps.length, 34)) {
			for (let i = 0; i < this.openedApps.length; i++) {
				
				if (!this.openedApps[i].hover) continue;
				
				let currentApp = this.openedApps[i];
				let s = this.findAppFrame(currentApp);
				if (s == undefined) {
					if (!currentApp.app) return;
					
					openApp(currentApp.app);
				}
				else {
					if (s.visible && drawables[1].indexOf(s) == drawables[1].length - 1) {
						minimizeAppFrame(s);
					}
					else {
						restoreAppFrame(s);
					}
				}
				return;
			}
		}

		posX += this.openedApps.length * 42 + 6;
		
		if (this.detectMouse(posX, 4, 40 * this.pinnedApps2.length, 34)) {
			for (let i = 0; i < this.pinnedApps2.length; i++) {
				
				if (!this.pinnedApps2[i].hover) continue;
				
				let currentApp = this.pinnedApps2[i];
				let s = this.findAppFrame(currentApp);
				if (s == undefined) {
					if (!currentApp.app) return;
					
					openApp(currentApp.app);
				}
				else {
					if (s.visible && drawables[1].indexOf(s) == drawables[1].length - 1) {
						minimizeAppFrame(s);
					}
					else {
						restoreAppFrame(s);
					}
				}
				return;
			}
		}
		if (this.hoverMain.start) {
			if (start.opened) {
				start.close();
			}
			else {
				start.open();
				keyboard.focus = start;
			}
		}
	},
	
	mouseMove: function() {
		var inval = false;
		let posX = 0;
		
		if (this.detectMouse(10, 4, this.widthApps - 32, 34)) {
			posX += 10;

			for (var i = 0; i < this.pinnedApps.length; i++) {
				let preValue = this.pinnedApps[i].hover;
				let newValue = this.detectMouseRounded(posX + i * 42, 4, 34, 34, 6);
				
				inval = inval || newValue != preValue;
				
				this.pinnedApps[i].hover = newValue;
			}

			posX += this.pinnedApps.length * 42;

			for (var i = 0; i < this.openedApps.length; i++) {
				let preValue = this.openedApps[i].hover;
				let newValue = this.detectMouseRounded(posX + i * 42, 4, 34, 34, 6);
				
				inval = inval || newValue != preValue;
				
				this.openedApps[i].hover = newValue;
			}
			
			posX += this.openedApps.length * 42 + 6;
			
			for (var i = 0; i < this.pinnedApps2.length; i++) {
				let preValue = this.pinnedApps2[i].hover;
				let newValue = this.detectMouseRounded(posX + 42 * i, 4, 34, 34, 6);
				
				inval = inval || newValue != preValue;
				
				this.pinnedApps2[i].hover = newValue;
			}

			posX += this.pinnedApps2.length * 42 + 14;
			this.checkHover.pinnedApps = true;
		}
		else {
			posX += this.widthApps;

			for (e of this.pinnedApps) e.hover = false;
			for (e of this.openedApps) e.hover = false;
			for (e of this.pinnedApps2) e.hover = false;
			
			if (this.checkHover.pinnedApps) {
				inval = true;
				this.checkHover.pinnedApps = false;
			}
		}

		posX += 12;
		
		if (this.detectMouse(posX + 10, 4, 118, 34)) {
			let preHover = Object.assign({}, this.hoverMain);
			
			this.hoverMain.search = this.detectMouseRounded(posX + 10, 4, 34, 34, 6);
			this.hoverMain.start = this.detectMouseRounded(posX + 52, 4, 34, 34, 6);
			this.hoverMain.recents = this.detectMouseRounded(posX + 94, 4, 34, 34, 6);
			this.checkHover.main = true;
			
			for (h in this.hoverMain) {
				inval = inval || (this.hoverMain[h] != preHover[h]);
			}
		}
		else {
			this.hoverMain.search = false;
			this.hoverMain.start = false;
			this.hoverMain.recents = false;
			
			if (this.checkHover.main) {
				inval = true;
				this.checkHover.main = false;
			}
		}

		posX += this.widthMain + this.widthTime + 12 * 2;
		
		if (this.detectMouse(posX + 10, 4, 178, 34)) {
			let preHover = Object.assign({}, this.hoverStatusBar);
			
			this.hoverStatusBar.wifi = this.detectMouseRounded(posX + 10, 4, 34, 34, 6);
			this.hoverStatusBar.bluetooth = this.detectMouseRounded(posX + 46, 4, 34, 34, 6);
			this.hoverStatusBar.sound = this.detectMouseRounded(posX + 82, 4, 34, 34, 6);
			this.hoverStatusBar.battery = this.detectMouseRounded(posX + 118, 4, 34, 34, 6);
			this.hoverStatusBar.more = this.detectMouseRounded(posX + 154, 4, 34, 34, 6);
			this.checkHover.statusBar = true;
			
			for (h in this.hoverStatusBar) {
				inval = inval || (this.hoverStatusBar[h] != preHover[h]);
			}
		}
		else {
			this.hoverStatusBar.wifi = false;
			this.hoverStatusBar.bluetooth = false;
			this.hoverStatusBar.sound = false;
			this.hoverStatusBar.battery = false;
			this.hoverStatusBar.more = false;
			
			if (this.checkHover.statusBar) {
				inval = true;
				this.checkHover.statusBar = false;
			}
		}
		
		if (inval) this.invalidate();
	},
	
	mouseExit: function(event) {
		for (e of this.pinnedApps) e.hover = false;
		for (e of this.openedApps) e.hover = false;
		for (e of this.pinnedApps2) e.hover = false;
		for (e in this.hoverMain) this.hoverMain[e] = false;
		for (e in this.hoverStatusBar) this.hoverStatusBar[e] = false;
		
		this.invalidate();
	}
};

function Dock() {
	this.sy = height - 12 - this.h;
	this.hy = height + 1;
	
	this.x = width / 2 - this.w / 2;
	this.y = this.hy;
	
	this.hidden = false;
	this.autohide = false;
	
	this.showing = false;
	this.hiding = false;
	
	this.icFiles = loadIcon("Apps", "Files", 30, 30);
	this.icMail = loadIcon("Apps", "Mail", 30, 30);
	this.icLale = loadIcon("Apps", "Lale", 30, 30);
	this.icPhotos = loadIcon("Apps", "Photos", 30, 30);
	this.icCalendar = loadIcon("Apps", "Calendar", 30, 30);
	this.icNotes = loadIcon("Apps", "Notes", 30, 30);
	this.icSettings = loadIcon("Apps", "Settings", 30, 30);
	this.icMusic = loadIcon("Apps", "Music", 30, 30);
	this.icMessages = loadIcon("Apps", "Messages", 30, 30);
	this.icHide = loadIcon("Dock", "HideApps", 14, 14);
	
	this.icSearch = loadIcon("Dock", "Search", 16, 16);
	this.icAvdan = loadIcon("Dock", "AvdanMenu", 20, 20);
	this.icRecents = loadIcon("Dock", "RecentApps", 16, 16);
	
	this.icWeatherSun = loadIcon("Dock", "Sun");
	
	this.icWifi = loadIcon("Dock", "WiFi", 24, 24);
	this.icBluetooth = loadIcon("Dock", "Bluetooth", 20, 20);
	this.icSound = loadIcon("Dock", "Sound", 20, 20);
	this.icBattery = loadIcon("Dock", "Battery", 26, 26);
	this.icQuick = loadIcon("Dock", "QuickSettings", 20, 20);
	
	this.pinnedApps = [
		{
			app: FilesApp,
			name: "FilesApp",
			icon: this.icFiles,
			hover: false
		},{
			app: null,
			name: "null",
			icon: this.icMail,
			hover: false
		},{
			app: LaleApp,
			name: "LaleApp",
			icon: this.icLale,
			hover: false
		},{
			app: PhotosApp,
			name: "PhotosApp",
			icon: this.icPhotos,
			hover: false
		},{
			app: null,
			name: "null",
			icon: this.icCalendar,
			hover: false
		},{
			app: NotesApp,
			name: "NotesApp",
			icon: this.icNotes,
			hover: false
		}
	];
	
	this.openedApps = [];
	
	this.pinnedApps2 = [
		{
			app: SettingsApp,
			name: "SettingsApp",
			icon: this.icSettings,
			hover: false
		},{
			app: null,
			name: "null",
			icon: this.icMusic,
			hover: false
		},{
			app: MessagesApp,
			name: "MessagesApp",
			icon: this.icMessages,
			hover: false
		}
	];

	this.checkHover = {
		pinnedApps: false,
		main: false,
		statusBar: false
	};
	
	this.hoverMain = {
		search: false,
		start: false,
		recents: false
	};
	
	this.hoverStatusBar = {
		wifi: false,
		bluetooth: false,
		sound: false,
		battery: false,
		more: false
	};

	this.initTransform();

	let refresh = () => dock ? dock.invalidate() : null;
	let time = (59 - new Date().getSeconds()) * 1000 + (1000 - new Date().getMilliseconds());
	setTimeout(() => {
		refresh();
		setInterval(refresh, 60 * 1000); // 1 minute
	}, time);	

	
	Animator.addAnimation({
		target: this,
		property: "y",
		drawable: this,
		interpolation: Animator.createCubicBezier(0.9, 1),
		b: this.sy,
		duration: 0.6
	});
	
	this.initCanvas();
}

DockProto.__proto__ = Drawable;
setPrototype(Dock, DockProto);
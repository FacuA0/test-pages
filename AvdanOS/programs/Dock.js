function Dock() {
	this.w = 1008;
	this.h = 48;
	
	this.x = width / 2 - this.w / 2;
	this.y = height - 16 - this.h;
	
	this.movable = false;
	this.resizable = false;
	this.type = "Dock";
	
	this.icFiles = loadIcon("Apps", "Files", 32, 32);
	this.icMail = loadIcon("Apps", "Mail", 32, 32);
	this.icLale = loadIcon("Apps", "Lale", 32, 32);
	this.icGallery = loadIcon("Apps", "Gallery", 32, 32);
	this.icCalendar = loadIcon("Apps", "Calendar", 32, 32);
	this.icNotes = loadIcon("Apps", "Notes", 32, 32);
	this.icSettings = loadIcon("Apps", "Settings", 32, 32);
	this.icMusic = loadIcon("Apps", "Music", 32, 32);
	this.icMessages = loadIcon("Apps", "Messages", 32, 32);
	this.icHide = loadIcon("Dock", "HideApps");
	
	this.icSearch = loadIcon("Dock", "Search", 16, 16);
	this.icAvdan = loadIcon("Dock", "AvdanMenu", 20, 20);
	this.icRecents = loadIcon("Dock", "RecentApps", 16, 16);
	
	this.icWeatherSun = loadIcon("Dock", "Sun");
	
	this.icWifi = loadIcon("Dock", "WiFi", 32, 32);
	this.icBluetooth = loadIcon("Dock", "Bluetooth", 24, 24);
	this.icSound = loadIcon("Dock", "Sound", 24, 24);
	this.icBattery = loadIcon("Dock", "Battery", 24, 24);
	this.icQuick = loadIcon("Dock", "QuickSettings", 24, 24);
	
	this.pinnedApps = [this.icFiles, this.icMail, this.icLale, this.icGallery, this.icCalendar, this.icNotes];
	this.pinnedApps2 = [this.icSettings, this.icMusic, this.icMessages];
	
	this.hoverApps = [false, false, false, false, false, false];
	this.hoverApps2 = [false, false, false];
	
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
	
	this.initCanvas(this);
	
	this.draw = (ctx) => {
		//ctx.translate(this.x, this.y);
		
		ctx.fillStyle = "#00000022";
		//fillRoundedRect(0, 0, this.w, this.h, 8);
		
		ctx.fillStyle = "#00000088";
		fillRoundedRect(ctx, 0, 0, 400, this.h, 8);
		
		ctx.fillStyle = "#00000088";
		fillRoundedRect(ctx, 416, 0, 128, this.h, 8);
		
		ctx.fillStyle = "#00000088";
		fillRoundedRect(ctx, 560, 0, 224, this.h, 8);
		
		ctx.fillStyle = "#00000088";
		fillRoundedRect(ctx, 800, 0, 208, this.h, 8);
		
		ctx.translate(8, 8);
		
		ctx.fillStyle = "#FFFFFF11";
		
		this.pinnedApps.forEach((ic, i) => {
			if (this.hoverApps[i])
				fillRoundedRect(ctx, -4, -4, 40, 40, 4);
			
			ctx.drawImage(ic, 0, 0);
			ctx.translate(32 + 8, 0);
		});
		
		ctx.strokeStyle = "#FFFFFF44";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, 32);
		ctx.stroke();
		
		ctx.translate(8, 0);
		
		this.pinnedApps2.forEach((ic, i) => {
			if (this.hoverApps2[i])
				fillRoundedRect(ctx, -4, -4, 40, 40, 4);
			
			ctx.drawImage(ic, 0, 0);
			ctx.translate(32 + 8, 0);
		});
		
		ctx.drawImage(this.icHide, 0, 8);
		
		ctx.translate(48, 0);
		
		if (this.hoverMain.search)
			fillRoundedRect(ctx, -4, -4, 40, 40, 4);
		if (this.hoverMain.start)
			fillRoundedRect(ctx, 36, -4, 40, 40, 4);
		if (this.hoverMain.recents)
			fillRoundedRect(ctx, 76, -4, 40, 40, 4);
		
		ctx.drawImage(this.icSearch, 8, 8);
		ctx.drawImage(this.icAvdan, 46, 6);
		ctx.drawImage(this.icRecents, 88, 8);
		
		ctx.translate(144, 0);
		
		//ctx.fillRect(0, 0, 32, 32);
		
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "left", "top");
		ctx.fillText("10:48", 0, 0);
		
		ctx.font = "12px sans-serif";
		ctx.textBaseline = "bottom";
		ctx.fillText("Sunday, March 28", 0, 32);
		
		ctx.drawImage(this.icWeatherSun, 164, 8, 16, 16);
		
		setTextStyle(ctx, "#EEEEEE", "16px sans-serif", "right", "middle");
		ctx.fillText("24\u00B0", 208, 17);
		
		ctx.translate(240, 0);
		
		ctx.fillStyle = "#FFFFFF22";
		
		if (this.hoverStatusBar.wifi)
			fillRoundedRect(ctx, -4, -4, 40, 40, 4);
		if (this.hoverStatusBar.bluetooth)
			fillRoundedRect(ctx, 36, -4, 40, 40, 4);
		if (this.hoverStatusBar.sound)
			fillRoundedRect(ctx, 76, -4, 40, 40, 4);
		if (this.hoverStatusBar.battery)
			fillRoundedRect(ctx, 116, -4, 40, 40, 4);
		if (this.hoverStatusBar.more)
			fillRoundedRect(ctx, 156, -4, 40, 40, 4);
		
		ctx.drawImage(this.icWifi, 0, 0);
		ctx.drawImage(this.icBluetooth, 44, 4);
		ctx.drawImage(this.icSound, 84, 4);
		ctx.drawImage(this.icBattery, 124, 4);
		ctx.drawImage(this.icQuick, 164, 4);
		
		ctx.translate(-808, -8);
		
		//ctx.translate(-this.x, -this.y);
	};
	
	this.mouseClick = (event) => {
		if (detectMouse(this.x + 4, this.y + 4, 40, 40)) {
			drawables[1].push(new Frame(new FilesApp()));
		}
		
		if (detectMouse(this.x + 460, this.y + 4, 40, 40)) {
			start.visible = !start.visible;
		}
	};
	
	this.mouseMove = () => {
		if (detectMouse(this.x + 4, this.y + 4, 9 * 40 + 8, 40)) {
			for (var i = 0; i < 6; i++) {
				this.hoverApps[i] = detectMouse(this.x + 4 + i * 40, this.y + 4, 40, 40);
			}
			
			for (var i = 0; i < 3; i++) {
				this.hoverApps2[i] = detectMouse(this.x + 252 + i * 40, this.y + 4, 40, 40);
			}
		}
		else {
			for (var i = 0; i < 6; i++) {
				this.hoverApps[i] = false;
			}
			for (var i = 0; i < 3; i++) {
				this.hoverApps2[i] = false;
			}
			
			this.hoverMain.search = detectMouse(this.x + 420, this.y + 4, 40, 40);
			this.hoverMain.start = detectMouse(this.x + 460, this.y + 4, 40, 40);
			this.hoverMain.recents = detectMouse(this.x + 500, this.y + 4, 40, 40);
			
			this.hoverStatusBar.wifi = detectMouse(this.x + 804, this.y + 4, 40, 40);
			this.hoverStatusBar.bluetooth = detectMouse(this.x + 844, this.y + 4, 40, 40);
			this.hoverStatusBar.sound = detectMouse(this.x + 884, this.y + 4, 40, 40);
			this.hoverStatusBar.battery = detectMouse(this.x + 924, this.y + 4, 40, 40);
			this.hoverStatusBar.more = detectMouse(this.x + 964, this.y + 4, 40, 40);
		}
	};
	
	this.mouseDrag = () => {};
	this.mouseUp = () => {};
	this.mouseDown = () => {};
}

setDrawablePrototype(Dock);
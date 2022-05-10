function SettingsApp() {
	this.w = 910;
	this.h = 578;
	this.minW = 560;
	this.minH = 120;
	this.title = "Settings";
	this.type = "SettingsApp";
	
	this.icSearch = loadIcon("global", "Search", 12, 12);
	this.icMainProfile = loadIcon("Start", "DefaultProfilePicture", 36, 36);
	this.icMainCloud = loadIcon("Start", "Cloud");
	this.icHome = loadIcon("global", "Home", 12, 12);
	this.icOptions = loadIcon("global", "MoreOptions", 12, 12);
	
	this.icWallpaper = loadIcon("Settings", "Wallpaper", 24, 24);
	this.icNotifications = loadIcon("Settings", "Notifications", 24, 24);
	this.icNetAccounts = loadIcon("Settings", "NetAccounts", 24, 24);
	this.icBluetooth = loadIcon("Settings", "Bluetooth", 24, 24);
	this.icUpdate = loadIcon("Settings", "Update", 24, 24);
	this.icUpToDate = loadIcon("Settings", "UpToDate", 24, 24);
	this.icBattery = loadIcon("Settings", "Battery", 24, 24);
	this.icDock = loadIcon("Settings", "Dock", 24, 24);
	
	this.icSetGeneral = loadIcon("Settings", "General", 24, 24);
	this.icSetPersonalize = loadIcon("Settings", "Personalization", 24, 24);
	this.icSetNetwork = loadIcon("Settings", "Network", 24, 24);
	this.icSetLanguage = loadIcon("Settings", "Language", 24, 24);
	this.icSetTime = loadIcon("Settings", "Time", 24, 24);
	this.icSetSearch = loadIcon("Settings", "Search", 24, 24);
	this.icSetDisplays = loadIcon("Settings", "Displays", 24, 24);
	this.icSetApps = loadIcon("Settings", "Apps", 24, 24);
	this.inSetAccessibility = loadIcon("Settings", "Accessibility", 24, 24);
	this.icSetSound = loadIcon("Settings", "Sound", 24, 24);
	this.inSetPrivacy = loadIcon("Settings", "Privacy", 24, 24);
	this.icSetSecurity = loadIcon("Settings", "Security", 24, 24);
	this.icSetUsers = loadIcon("Settings", "Users", 24, 24);
	this.icSetDevices = loadIcon("Settings", "Devices", 24, 24);
	this.icSetExtensions = loadIcon("Settings", "Extensions", 24, 24);
	this.icMainSetting = loadIcon("global", "Default", 24, 24);
	
	this.icBack = loadIcon("global", "Back", 12, 12);
	this.icForward = loadIcon("global", "Forward", 12, 12);
	this.icMainGo = loadIcon("global", "Forward", 12, 13);
	
	this.settingsScreen = false;
	this.settingsName = "";
	
	this.hover = {
		back: false,
		forward: false,
		home: false,
		options: false
	};
	
	this.settings = [
		{
			name: "General",
			icon: this.icSetGeneral
		}, {
			name: "Personalization",
			icon: this.icSetPersonalize
		}, {
			name: "Network and Internet",
			icon: this.icSetNetwork
		}, {
			name: "Language and Region",
			icon: this.icSetLanguage
		}, {
			name: "Time and Date",
			icon: this.icSetTime
		}, {
			name: "Search",
			icon: this.icSetSearch
		}, {
			name: "Displays",
			icon: this.icSetDisplays
		}, {
			name: "Apps",
			icon: this.icSetApps
		}, {
			name: "Accessibility",
			icon: this.inSetAccessibility
		}, {
			name: "Sound",
			icon: this.icSetSound
		}, {
			name: "Privacy",
			icon: this.inSetPrivacy
		}, {
			name: "Security",
			icon: this.icSetSecurity
		}, {
			name: "Users",
			icon: this.icSetUsers
		}, {
			name: "Devices",
			icon: this.icSetDevices
		}, {
			name: "Extensions",
			icon: this.icSetExtensions
		}
	];
	
	for (let s in this.settings) {
		this.settings[s].hover = false;
	}
	
	this.draw = (ctx) => {
		if (!this.settingsScreen) {
			this.drawMain(ctx);
		}
		else {
			this.drawSettings(ctx);
		}
		
		this.validated = true;
	};
	
	this.drawMain = (ctx) => {
		setTextStyle(ctx, "#EEE", "20px sans-serif", "center", "top");
		ctx.fillText("Settings", this.w / 2, 15);
		
		// Profile
		ctx.drawImage(this.icMainProfile, 18, 21);
		
		setTextStyle(ctx, "#FFFE", "12px sans-serif", "left", "top");
		ctx.fillText("User", 68, 27);
		
		setTextStyle(ctx, "#FFFB", "10px sans-serif", "left", "top");
		ctx.fillText("user@gmail.com", 68, 44);
		
		// Search bar
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, this.w / 2 - 128, 45, 256, 24, 4);
		
		setTextStyle(ctx, "#CCC", "11px sans-serif", "left", "middle");
		ctx.fillText("Find a setting", this.w / 2 - 118, 58);
		
		ctx.drawImage(this.icSearch, this.w / 2 + 108, 51);
		
		// Cloud Managing
		ctx.drawImage(this.icMainCloud, this.w - 53, 24);
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "right", "top");
		ctx.fillText("Cloud", this.w - 70, 27);
		
		setTextStyle(ctx, "#BBB", "10px sans-serif", "right", "top");
		ctx.fillText("Manage", this.w - 70, 44);
		
		
		// Pinned
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Pinned", 20, 78);
		
		ctx.fillStyle = "#FFF1";
		//fillRoundedRect(ctx, 20, 104, this.w - 40, 127, 4);
		
		let wPinned = this.w - 40;
		let wPinS = wPinned * 0.220859;
		let wPinL = wPinned * 0.265337;
		
		// Wallpaper
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 20, 104, wPinS, 37, 4);
		ctx.drawImage(this.icWallpaper, 30, 112, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Wallpaper", 60, 124);
		ctx.drawImage(this.icMainGo, wPinS, 116);
		
		// Notifications
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 20, 149, wPinS, 37, 4);
		ctx.drawImage(this.icNotifications, 30, 157, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Notifications", 60, 169);
		ctx.drawImage(this.icMainGo, wPinS, 161);
		
		// Internet accounts
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 20, 194, wPinS, 37, 4);
		ctx.drawImage(this.icNetAccounts, 30, 202, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Internet Accounts", 60, 214);
		ctx.drawImage(this.icMainGo, wPinS, 206);
		
		
		// Bluetooth
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 28 + wPinS, 104, wPinL, 127, 4);
		ctx.drawImage(this.icBluetooth, 38 + wPinS, 112, 20, 20);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "middle");
		ctx.fillText("Bluetooth", 68 + wPinS, 124);
		
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Alya's Earbuds", 68 + wPinS, 154);
		ctx.fillText("Kaan's Headphones", 68 + wPinS, 184);
		ctx.fillText("BT Mouse", 68 + wPinS, 214);
		
		setTextStyle(ctx, "#BBB", "11px sans-serif", "right", "middle");
		ctx.fillText("Not Connected", 16 + wPinS + wPinL, 154);
		ctx.fillText("Connected", 16 + wPinS + wPinL, 184);
		ctx.fillText("Connected", 16 + wPinS + wPinL, 214);
		
		
		// Updates
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 36 + wPinS + wPinL, 104, wPinS, 82, 4);
		
		ctx.drawImage(this.icUpdate, 46 + wPinS + wPinL, 112, 20, 20);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "middle");
		ctx.fillText("Updates", 76 + wPinS + wPinL, 124);
		
		ctx.drawImage(this.icUpToDate, 48 + wPinS + wPinL, 148, 15, 15);
		ctx.fillText("AvdanOS is up to date.", 76 + wPinS + wPinL, 152);
		setTextStyle(ctx, "#BBB", "11px sans-serif", "left", "middle");
		ctx.fillText("Check for updates", 76 + wPinS + wPinL, 169);
		ctx.drawImage(this.icMainGo, 16 + wPinS * 2 + wPinL, 138);
		
		// Battery
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 36 + wPinS + wPinL, 194, wPinS, 37, 4);
		ctx.drawImage(this.icBattery, 46 + wPinS + wPinL, 202, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Battery", 76 + wPinS + wPinL, 214);
		ctx.drawImage(this.icMainGo, 16 + wPinS * 2 + wPinL, 206);
		
		
		// Wi-Fi
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 44 + wPinS * 2 + wPinL, 104, wPinL, 127, 4);
		ctx.drawImage(this.icSetNetwork, 54 + wPinS * 2 + wPinL, 112, 20, 20);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "middle");
		ctx.fillText("Wi-Fi", 84 + wPinS * 2 + wPinL, 124);
		
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Home", 84 + wPinS * 2 + wPinL, 154);
		ctx.fillText("Work", 84 + wPinS * 2 + wPinL, 184);
		ctx.fillText("Avdan VDSL", 84 + wPinS * 2 + wPinL, 214);
		
		setTextStyle(ctx, "#BBB", "11px sans-serif", "right", "middle");
		ctx.fillText("Connected", 32 + wPinS * 2 + wPinL * 2, 154);
		
		
		// Settings
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Other settings", 20, 256);
		
		for (var i = 0, s; i < this.settings.length; i++) {
			s = this.settings[i];
			
			var cols = Math.floor((this.w - 40) / 160);
			var x = parseInt(28 + (this.w - 40) / cols * (i % cols));
			var y = parseInt(301 + Math.floor(i / cols) * 50);
			var icon = s.icon;
			
			if (s.hover) {
				ctx.fillStyle = "#FFF2";
				fillRoundedRect(ctx, x - 8, y - 20, (this.w - 40) / cols - 12, 40, 4);
			}
			
			ctx.drawImage(icon, x, y - 12);
			
			setTextStyle(ctx, "#DDD", "11px sans-serif", "left", "middle");
			ctx.fillText(s.name, x + 32, y);
		}
		
		// Recommended
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Recommended", 20, 453);
		
		let wRec = (this.w - 64) / 4;
		
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 20, 480, wRec, 38, 4);
		ctx.drawImage(this.icSetDisplays, 29, 489, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Connect to a wireless display", 59, 499);
		
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 28 + wRec, 480, wRec, 38, 4);
		ctx.drawImage(this.icWallpaper, 37 + wRec, 489, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Change your wallpaper", 28 + wRec + 39, 499);
		
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 36 + wRec * 2, 480, wRec, 38, 4);
		ctx.drawImage(this.icDock, 45 + wRec * 2, 489, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Customize the Dock", 36 + wRec * 2 + 39, 499);
		
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 44 + wRec * 3, 480, wRec, 38, 4);
		ctx.drawImage(this.icSetGeneral, 53 + wRec * 3, 489, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Open Pro Mode Preferences", 44 + wRec * 3 + 39, 499);
	};
	
	this.drawSettings = (ctx) => {
		var miniBar = this.w < 480;
		var searchBarWidth = 128;
		var searchBarX = this.w - (!miniBar ? 134 : 32);
		var searchIconX = this.w - (!miniBar ? 24 : 25);
		var optionsX = this.w - (!miniBar ? 160 : 64);
		var tagX = this.w - (!miniBar ? 192 : 96);
		var barWidth = Math.min(342, this.w - 287);
		var barX = Math.max(this.w / 2 - barWidth / 2, 147);
		
		ctx.fillStyle = (this.hover.back ? "#FFF4" : "#FFF2"); // Back button
		fillRoundedRect(ctx, 6, 6, 34, 20, 4);
		ctx.fillStyle = (this.hover.forward ? "#FFF4" : "#FFF2"); // Forward button
		fillRoundedRect(ctx, 43, 6, 34, 20, 4);
		
		ctx.fillStyle = (this.hover.home ? "#FFF4" : "#FFF2");
		fillRoundedRect(ctx, 83, 6, 26, 20, 4); // Home button
		
		ctx.fillStyle = (this.hover.options ? "#FFF4" : "#FFF2");
		fillRoundedRect(ctx, 115, 6, 26, 20, 4); // More Options button
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, barX, 6, barWidth, 20, 4); // Path bar
		fillRoundedRect(ctx, searchBarX, 6, searchBarWidth, 20, 4); // Search bar
		
		ctx.drawImage(this.icBack, 17, 10);
		ctx.drawImage(this.icForward, 54, 10);
		ctx.drawImage(this.icHome, 90, 10);
		ctx.drawImage(this.icOptions, 122, 10);
		ctx.drawImage(this.icSearch, searchIconX, 10);
		
		setTextStyle(ctx, "#FFF", "10px sans-serif", "center", "middle");
		ctx.fillText(this.settingsName, barX + barWidth / 2, 17);
		
		if (!miniBar) {
			let s = this.textSearch !== "";
			setTextStyle(ctx, s ? "#EEE" : "#CCC", "10px sans-serif", "left", "middle");
			ctx.fillText("Find a setting", searchBarX + 6, 17);
		}
	};
	
	this.checkHoverMainSettings = () => {
		if (this.settingsScreen) return false;
		
		let inval = false;
		
		for (var i = 0, s; i < this.settings.length; i++) {
			s = this.settings[i];
			
			let cols = Math.floor((this.w - 40) / 160);
			let x = parseInt(28 + (this.w - 40) / cols * (i % cols));
			let y = parseInt(301 + Math.floor(i / cols) * 50);
			
			let preHover = s.hover;
			s.hover = this.detectMouse(x - 8, y - 20, (this.w - 40) / cols - 12, 40);
			inval = inval || preHover != s.hover;
		}
		
		return inval;
	};
	
	this.checkHoverSecondSettings = () => {
		if (!this.settingsScreen) return false;
		
		let inval = false;
		let preHover = Object.assign({}, this.hover);
		
		this.hover.back = this.detectMouse(6, 6, 34, 20);
		this.hover.forward = this.detectMouse(43, 6, 34, 20);
		this.hover.home = this.detectMouse(83, 6, 26, 20);
		this.hover.options = this.detectMouse(115, 6, 26, 20);
		
		for (let k in this.hover) {
			inval = inval || this.hover[k] != preHover[k];
		}
		
		return inval;
	};
	
	this.mouseMove = () => {
		let inval = false;
		
		inval = inval || this.checkHoverMainSettings();
		inval = inval || this.checkHoverSecondSettings();
		
		if (inval) this.invalidate();
	};
	
	this.mouseClick = () => {
		if (this.settingsScreen) {
			if (this.hover.back) {
				this.settingsScreen = false;
			}
			return;
		}
		
		for (let s of this.settings) {
			if (s.hover) {
				this.settingsScreen = true;
				this.settingsName = s.name;
				break;
			}
		}
	};
}

setDrawablePrototype(SettingsApp);
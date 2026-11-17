var SettingsAppProto = {
	w: 910,
	h: 578,
	minW: 560,
	minH: 120,
	title: "Settings",
	
	// Rethink if these variables should be here or in the Style object
	windowColors: [
		"#FFF",
		"#000",
		"#F1C3E8",
		"#A986AD",
		"#F8AC91",
		"#9E6DE4",
		"#F66B7C",
		"#1E1F67",
		"#EC1851",
		"#013B2A",
		"#4A8B52",
		"#DED5C6",
		"#FF4848",
		"new"
	],
	
	accentColors: [
		"any",
		"#D01B64",
		"#56DCFF",
		"#F88084",
		"#FF54A1",
		"#9D6FE6",
		"#B97CCE",
		"#645275",
		"#FFAF3E",
		"#95DBCA",
		"#2AB97C",
		"#8FB0FE",
		"#1E1F69",
		"new"
	],
	
	draw: function(ctx) {
		this.setIconColor(Style.iconColor);
		
		if (!this.settingsScreen) {
			this.drawMain(ctx);
		}
		else {
			this.drawSettings(ctx);
		}
		
		this.validated = true;
	},
	
	drawMain: function(ctx) {
		setTextStyle(ctx, Style.textColor, "20px sans-serif", "center", "top");
		ctx.fillText("Settings", this.w / 2, 15);
		
		// Profile
		if (this.mainHover.user) {
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, 10, 13, 140, 52, 4);
		}
		
		ctx.drawImage(this.icMainProfile, 18, 21);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("User", 68, 27);
		
		setTextStyle(ctx, Style.softTextColor, "10px sans-serif", "left", "top");
		ctx.fillText("user@gmail.com", 68, 44);
		
		// Search bar
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, this.w / 2 - 128, 45, 256, 24, 4);
		
		setTextStyle(ctx, Style.softTextColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Find a setting", this.w / 2 - 118, 58);
		
		this.drawIcon(ctx, this.icSearch, this.w / 2 + 108, 51);
		
		// Cloud Managing
		if (this.mainHover.cloud) {
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, this.w - 150, 13, 140, 52, 4);
		}
		
		ctx.drawImage(this.icMainCloud, this.w - 53, 24);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "right", "top");
		ctx.fillText("Cloud", this.w - 70, 27);
		
		setTextStyle(ctx, Style.softTextColor, "10px sans-serif", "right", "top");
		ctx.fillText("Manage", this.w - 70, 44);
		
		
		// Pinned
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Pinned", 20, 78);
		
		ctx.fillStyle = "#FFF1";
		//fillRoundedRect(ctx, 20, 104, this.w - 40, 127, 4);
		
		let wPinned = this.w - 40;
		let wPinS = wPinned * 0.220859;
		let wPinL = wPinned * 0.265337;
		
		// Wallpaper
		ctx.fillStyle = this.mainHover.pinned == 0 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 20, 104, wPinS, 37, 4);
		ctx.drawImage(this.icWallpaper, 30, 112, 20, 20);
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Wallpaper", 60, 124);
		this.drawIcon(ctx, this.icMainGo, wPinS, 116);
		
		// Notifications
		ctx.fillStyle = this.mainHover.pinned == 1 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 20, 149, wPinS, 37, 4);
		ctx.drawImage(this.icNotifications, 30, 157, 20, 20);
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Notifications", 60, 169);
		this.drawIcon(ctx, this.icMainGo, wPinS, 161);
		
		// Internet accounts
		ctx.fillStyle = this.mainHover.pinned == 2 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 20, 194, wPinS, 37, 4);
		ctx.drawImage(this.icNetAccounts, 30, 202, 20, 20);
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Internet Accounts", 60, 214);
		this.drawIcon(ctx, this.icMainGo, wPinS, 206);
		
		
		// Bluetooth
		ctx.fillStyle = this.mainHover.pinned == 3 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 28 + wPinS, 104, wPinL, 127, 4);
		ctx.drawImage(this.icBluetooth, 38 + wPinS, 112, 20, 20);
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "middle");
		ctx.fillText("Bluetooth", 68 + wPinS, 124);
		
		ctx.fillStyle = "#41BFC1";
		fillRoundedRect(ctx, 16 + wPinS + wPinL - 26, 116, 26, 12, 6);
		ctx.fillStyle = "#0003";
		fillRoundedRect(ctx, 16 + wPinS + wPinL - 14, 116, 14, 14, 6);
		ctx.fillStyle = "#FFF";
		fillRoundedRect(ctx, 16 + wPinS + wPinL - 13, 115, 14, 14, 6);
		
		this.drawIcon(ctx, this.icMainEarbuds, 40 + wPinS, 145);
		this.drawIcon(ctx, this.icMainHeadphones, 40 + wPinS, 175);
		this.drawIcon(ctx, this.icMainWirelessMouse, 40 + wPinS, 205);
		
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Alya's Earbuds", 68 + wPinS, 154);
		ctx.fillText("Kaan's Headphones", 68 + wPinS, 184);
		ctx.fillText("BT Mouse", 68 + wPinS, 214);
		
		setTextStyle(ctx, Style.softTextColor, "11px sans-serif", "right", "middle");
		ctx.fillText("Not Connected", 16 + wPinS + wPinL, 154);
		ctx.fillText("Connected", 16 + wPinS + wPinL, 184);
		ctx.fillText("Connected", 16 + wPinS + wPinL, 214);
		
		
		// Updates
		ctx.fillStyle = this.mainHover.pinned == 4 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 36 + wPinS + wPinL, 104, wPinS, 82, 4);
		
		ctx.drawImage(this.icUpdate, 46 + wPinS + wPinL, 112, 20, 20);
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "middle");
		ctx.fillText("Updates", 76 + wPinS + wPinL, 124);
		
		ctx.drawImage(this.icUpToDate, 48 + wPinS + wPinL, 148, 15, 15);
		ctx.fillText("AvdanOS is up to date.", 76 + wPinS + wPinL, 152);
		setTextStyle(ctx, Style.softTextColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Check for updates", 76 + wPinS + wPinL, 169);
		this.drawIcon(ctx, this.icMainGo, 16 + wPinS * 2 + wPinL, 138);
		
		// Battery
		ctx.fillStyle = this.mainHover.pinned == 5 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 36 + wPinS + wPinL, 194, wPinS, 37, 4);
		ctx.drawImage(this.icBattery, 46 + wPinS + wPinL, 202, 20, 20);
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Battery", 76 + wPinS + wPinL, 214);
		this.drawIcon(ctx, this.icMainGo, 16 + wPinS * 2 + wPinL, 206);
		
		
		// Wi-Fi
		ctx.fillStyle = this.mainHover.pinned == 6 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 44 + wPinS * 2 + wPinL, 104, wPinL, 127, 4);
		ctx.drawImage(this.icSetNetwork, 54 + wPinS * 2 + wPinL, 112, 20, 20);
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "middle");
		ctx.fillText("Wi-Fi", 84 + wPinS * 2 + wPinL, 124);
		
		ctx.fillStyle = "#41BFC1";
		fillRoundedRect(ctx, 32 + wPinS * 2 + wPinL * 2 - 26, 116, 26, 12, 6);
		ctx.fillStyle = "#0003";
		fillRoundedRect(ctx, 32 + wPinS * 2 + wPinL * 2 - 14, 116, 14, 14, 6);
		ctx.fillStyle = "#FFF";
		fillRoundedRect(ctx, 32 + wPinS * 2 + wPinL * 2 - 13, 115, 14, 14, 6);
		
		this.drawIcon(ctx, this.icMainWifiLevels[4], 56 + wPinS * 2 + wPinL, 145);
		this.drawIcon(ctx, this.icMainWifiLevels[3], 56 + wPinS * 2 + wPinL, 175);
		this.drawIcon(ctx, this.icMainWifiLevels[2], 56 + wPinS * 2 + wPinL, 205);
		
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Home", 84 + wPinS * 2 + wPinL, 154);
		ctx.fillText("Work", 84 + wPinS * 2 + wPinL, 184);
		ctx.fillText("Avdan VDSL", 84 + wPinS * 2 + wPinL, 214);
		
		this.drawIcon(ctx, this.icMainLock, 32 + wPinS * 2 + wPinL * 2 - 94, 147);
		this.drawIcon(ctx, this.icMainLock, 32 + wPinS * 2 + wPinL * 2 - 33, 177);
		this.drawIcon(ctx, this.icMainLock, 32 + wPinS * 2 + wPinL * 2 - 33, 207);

		this.drawIcon(ctx, this.icMainInfo, 32 + wPinS * 2 + wPinL * 2 - 75, 146);
		this.drawIcon(ctx, this.icMainInfo, 32 + wPinS * 2 + wPinL * 2 - 14, 176);
		this.drawIcon(ctx, this.icMainInfo, 32 + wPinS * 2 + wPinL * 2 - 14, 206);
		
		setTextStyle(ctx, Style.softTextColor, "11px sans-serif", "right", "middle");
		ctx.fillText("Connected", 32 + wPinS * 2 + wPinL * 2, 154);
		
		
		// Settings
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Other Settings", 20, 256);
		
		for (var i = 0, s; i < this.settings.length; i++) {
			s = this.settings[i];
			
			var cols = Math.floor((this.w - 40) / 160);
			var x = parseInt(28 + (this.w - 40) / cols * (i % cols));
			var y = parseInt(301 + Math.floor(i / cols) * 50);
			var icon = s.icon;
			
			if (this.mainHover.settings == i) {
				ctx.fillStyle = Style.buttonColor;
				fillRoundedRect(ctx, x - 8, y - 20, (this.w - 40) / cols - 12, 40, 4);
			}
			
			ctx.drawImage(icon, x, y - 12);
			
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
			ctx.fillText(s.name, x + 32, y);
		}
		
		// Recommended
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Recommended", 20, 453);
		
		let wRec = (this.w - 64) / 4;
		let hoverRecommended = this.mainHover.recommended;
		
		ctx.fillStyle = hoverRecommended == 0 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 20, 480, wRec, 38, 4);
		ctx.drawImage(this.icSetDisplays, 29, 489, 20, 20);
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Connect to a wireless display", 59, 499);
		
		ctx.fillStyle = hoverRecommended == 1 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 28 + wRec, 480, wRec, 38, 4);
		ctx.drawImage(this.icWallpaper, 37 + wRec, 489, 20, 20);
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Change your wallpaper", 28 + wRec + 39, 499);
		
		ctx.fillStyle = hoverRecommended == 2 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 36 + wRec * 2, 480, wRec, 38, 4);
		ctx.drawImage(this.icDock, 45 + wRec * 2, 489, 20, 20);
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Customize the Dock", 36 + wRec * 2 + 39, 499);
		
		ctx.fillStyle = hoverRecommended == 3 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 44 + wRec * 3, 480, wRec, 38, 4);
		ctx.drawImage(this.icSetGeneral, 53 + wRec * 3, 489, 20, 20);
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Open Pro Mode Preferences", 44 + wRec * 3 + 39, 499);
	},
	
	drawSettings: function(ctx) {
		var miniBar = this.w < 480;
		var searchBarWidth = 128;
		var searchBarX = this.w - (!miniBar ? 134 : 32);
		var searchIconX = this.w - (!miniBar ? 24 : 25);
		var optionsX = this.w - (!miniBar ? 160 : 64);
		var tagX = this.w - (!miniBar ? 192 : 96);
		var barWidth = Math.min(342, this.w - 287);
		var barX = Math.max(this.w / 2 - barWidth / 2, 147);
		
		ctx.fillStyle = (this.hover.back ? Style.buttonHoverColor : Style.buttonColor); // Back button
		fillRoundedRect(ctx, 6, 6, 34, 20, 4);
		ctx.fillStyle = (this.hover.forward ? Style.buttonHoverColor : Style.buttonColor); // Forward button
		fillRoundedRect(ctx, 43, 6, 34, 20, 4);
		
		ctx.fillStyle = (this.hover.home ? Style.buttonHoverColor : Style.buttonColor);
		fillRoundedRect(ctx, 83, 6, 26, 20, 4); // Home button
		
		ctx.fillStyle = (this.hover.options ? Style.buttonHoverColor : Style.buttonColor);
		fillRoundedRect(ctx, 115, 6, 26, 20, 4); // More Options button
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, barX, 6, barWidth, 20, 4); // Path bar
		fillRoundedRect(ctx, searchBarX, 6, searchBarWidth, 20, 4); // Search bar
		
		this.drawIcon(ctx, this.icBack, 17, 10);
		this.drawIcon(ctx, this.icForward, 54, 10);
		this.drawIcon(ctx, this.icHome, 90, 10);
		this.drawIcon(ctx, this.icOptions, 122, 10);
		this.drawIcon(ctx, this.icSearch, searchIconX, 10);
		
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "left", "middle");
		let totalTitleWidth = ctx.measureText("Home   >   " + this.settingsCat.name).width;
		let homeTitleWidth = ctx.measureText("Home   >   ").width;
		let barTitleX = barX + barWidth / 2 - totalTitleWidth / 2;
		let barTitleX2 = barTitleX + homeTitleWidth;

		ctx.fillStyle = Style.softTextColor;
		ctx.fillText("Home", barTitleX, 17);

		this.setIconColor(Style.softTextColor);
		this.drawIcon(ctx, this.icForward, barTitleX2 - 15, 12, 9, 9);
		this.setIconColor(Style.iconColor);

		ctx.fillStyle = Style.textColor;
		ctx.fillText(this.settingsCat.name, barTitleX2, 17);
		
		if (!miniBar) {
			let s = this.textSearch !== "";
			setTextStyle(ctx, s ? Style.textColor : Style.softTextColor, "10px sans-serif", "left", "middle");
			ctx.fillText("Find a setting", searchBarX + 6, 17);
		}
		
		// If the current category has no sections, end this.
		if (this.settingsCat.sections.length == 0) {			
			setTextStyle(ctx, Style.softTextColor, "12px sans-serif", "center", "middle");
			ctx.fillText("There's nothing in this category for now.", this.w / 2, this.h / 2);
			
			return;
		}
	
		var sections = this.settingsCat.sections;
		
		// Draw section tabs.
		for (var i = 0; i < sections.length; i++) {
			let w = (this.w - 12 - 6 * (sections.length - 1)) / sections.length;
			let x = 6 + w * i + 6 * i;
			
			if (this.settingsSection == sections[i]) {
				ctx.strokeStyle = Style.accentColor;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(x + 4, 74.5);
				ctx.lineTo(x + w - 4, 74.5);
				ctx.stroke();
			}
			
			ctx.fillStyle = this.hover.sections == i ? Style.buttonHoverColor : Style.buttonColor;
			fillRoundedRect(ctx, x, 48, w, 26, 4);
			
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "middle");
			ctx.fillText(sections[i].name, x + w / 2, 62);
		}
		
		let drawSection = "draw" + this.settingsCat.func + this.settingsSection.func;
		
		if (!this[drawSection]) {
			setTextStyle(ctx, Style.softTextColor, "12px sans-serif", "center", "middle");
			ctx.fillText("There's nothing in this section for now.", this.w / 2, this.h / 2);
			
			return;
		}
		
		this[drawSection](ctx);
	},
	
	drawGeneralAbout: function(ctx) {
		setTextStyle(ctx, Style.textColor, "20px sans-serif", "center", "middle");
		ctx.fillText("AvdanOS UI Alpha 0.04", this.w / 2, this.h / 2);

		setTextStyle(ctx, Style.textColor, "14px sans-serif", "center", "middle");
		ctx.fillText("AvdanOS concept by Avdan", this.w / 2, this.h / 2 + 48);
		ctx.fillText("Author: u/FacuA0", this.w / 2, this.h / 2 + 70);

		setTextStyle(ctx, Style.softTextColor, "14px sans-serif", "center", "top");
		ctx.fillText("Other credits:", this.w / 2, this.h / 2 + 118);
		
		ctx.font = "12px sans-serif";
		ctx.fillText("Some icons (and wallpaper): u/Mood_Aware", this.w / 2, this.h / 2 + 140);
		ctx.fillText("Wallpapers: u/Ekmand", this.w / 2, this.h / 2 + 160);
		
		// Avdan underlines
		ctx.font = "14px sans-serif";
		let totalConceptWidth = ctx.measureText("AvdanOS concept by Avdan").width;
		let conceptWidth = ctx.measureText("AvdanOS concept").width;
		let avdanWidth = ctx.measureText("Avdan").width;
		let conceptX = this.w / 2 - totalConceptWidth / 2;
		let avdanX = this.w / 2 + totalConceptWidth / 2 - avdanWidth;
		let conceptY = this.h / 2 + 48 + 6;

		ctx.fillStyle = Style.textColor;
		ctx.fillRect(conceptX, conceptY, conceptWidth, 1);
		ctx.fillRect(avdanX, conceptY, avdanWidth, 1);
		
		// FacuA0 underline
		let totalCreditWidth = ctx.measureText("Author: u/FacuA0").width;
		let creditWidth = ctx.measureText("u/FacuA0").width;
		let creditX = this.w / 2 + totalCreditWidth / 2 - creditWidth;

		ctx.fillStyle = Style.textColor;
		ctx.fillRect(creditX, this.h / 2 + 70 + 6, creditWidth, 1);
		
		// Mood_Aware underline
		ctx.font = "12px sans-serif";
		totalCreditWidth = ctx.measureText("Some icons (and wallpaper): u/Mood_Aware").width;
		creditWidth = ctx.measureText("u/Mood_Aware").width;
		creditX = this.w / 2 + totalCreditWidth / 2 - creditWidth;

		ctx.fillStyle = Style.softTextColor;
		ctx.fillRect(creditX, this.h / 2 + 140 + 11, creditWidth, 1);
		
		// Ekmand underline
		totalCreditWidth = ctx.measureText("Wallpapers: u/Ekmand").width;
		creditWidth = ctx.measureText("u/Ekmand").width;
		creditX = this.w / 2 + totalCreditWidth / 2 - creditWidth;

		ctx.fillRect(creditX, this.h / 2 + 160 + 11, creditWidth, 1);
		
		// Debug switch
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "middle");
		let totalSwitchWidth = ctx.measureText("Debug").width + 38;

		ctx.fillText("Debug", this.w / 2 - totalSwitchWidth / 2, this.h / 2 + 200);
		
		let x = this.w / 2 + totalSwitchWidth / 2 - 28, y = this.h / 2 + 192;
		ctx.fillStyle = debug ? "#41BFC1" : Style.buttonColor;
		fillRoundedRect(ctx, x + 2, y + 1, 26, 12, 6);
		ctx.fillStyle = "#0003";
		fillRoundedRect(ctx, debug ? x + 14 : x, y + 1, 14, 14, 6);
		ctx.fillStyle = "#FFF";
		fillRoundedRect(ctx, debug ? x + 15 : x + 1, y, 14, 14, 6);
	},
	
	drawPersonalWallpaper: function(ctx) {
		setTextStyle(ctx, Style.softTextColor, "16px sans-serif", "center", "middle");
		ctx.fillText("Wallpaper", this.w / 2, this.h / 2);
	},
	
	drawPersonalThemes: function(ctx) {
		var hover = this.hover.personal.themes;
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Themes", 32, 110);
		
		ctx.fillStyle = hover.edit ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w - 178, 101, 40, 20, 4);
		ctx.fillStyle = hover.getThemes ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w - 132, 101, 100, 20, 4);
		
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "center", "middle");
		ctx.fillText("Edit", this.w - 158, 112);
		ctx.fillText("Get more themes", this.w - 82, 112);
		
		for (var i = 0, t; i < Style.themes.length; i++) {
			t = Style.themes[i];
			
			var cols = Math.floor((this.w - 64) / 204);
			var x = parseInt(32 + (this.w - 64) / cols * ((i + 0.5) % cols));
			var y = parseInt(140 + Math.floor(i / cols) * 185);
			
			ctx.save();
			setRoundedPath(ctx, x - 90, y, 180, 118, 8, 8, 8, 8);
			ctx.clip();
			
			ctx.drawImage(t.appearances[0].style.background, x - 90, y, 180, 118);
			
			let style = t.appearances[0].style;
			ctx.fillStyle = style.windowColor;
			ctx.globalAlpha = style.windowTransparency;
			fillRoundedRect(ctx, x - 73, y + 11, 103, 76, 4);
			
			fillRoundedRect(ctx, x - 82, y + 97, 67, 16, 4);
			fillRoundedRect(ctx, x - 13, y + 97, 27, 16, 4);
			fillRoundedRect(ctx, x + 16, y + 97, 32, 16, 4);
			fillRoundedRect(ctx, x + 51, y + 97, 32, 16, 4);
			ctx.globalAlpha = 1;
			
			ctx.fillStyle = style.buttonColor;
			fillRoundedRect(ctx, x - 70, y + 14, 22, 8, 2);
			fillRoundedRect(ctx, x - 13, y + 14, 16, 8, 2);
			fillRoundedRect(ctx, x + 5, y + 14, 22, 8, 2);
			fillRoundedRect(ctx, x - 70, y + 28, 47, 26, 2);
			fillRoundedRect(ctx, x - 70, y + 57, 47, 26, 2);
			
			ctx.restore();
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "top");
			ctx.fillText(t.name, x, y + 128);
			
			if (i == Style.currentTheme) {
				ctx.fillStyle = Style.accentColor;
				fillRoundedRect(ctx, x - 12, y + 142, 24, 4, 2);
			}
		}
	},
	
	drawPersonalAppearance: function(ctx) {
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Appearances", 32, 98);
		
		var hover = this.hover.personal.appearance;
		var appearances = Style.themes[Style.currentTheme].appearances;
		
		for (var i = 0, t; i < appearances.length; i++) {
			t = appearances[i];
			
			var x = parseInt(32 + (this.w - 64) / 5 * (i + 0.5));
			var y = 118;
			
			ctx.save();
			setRoundedPath(ctx, x - 65, y, 130, 85, 8, 8, 8, 8);
			ctx.clip();
			
			ctx.drawImage(t.style.background, x - 65, y, 130, 85);
			
			let style = t.style;
			ctx.fillStyle = style.windowColor;
			ctx.globalAlpha = style.windowTransparency;
			fillRoundedRect(ctx, x - 36, y + 8, 75, 55, 4);
			
			fillRoundedRect(ctx, x - 61, y + 70, 49, 12, 4);
			fillRoundedRect(ctx, x - 10, y + 70, 19, 12, 4);
			fillRoundedRect(ctx, x + 11, y + 70, 24, 12, 4);
			fillRoundedRect(ctx, x + 37, y + 70, 24, 12, 4);
			ctx.globalAlpha = 1;
			
			ctx.fillStyle = style.buttonColor;
			fillRoundedRect(ctx, x - 34, y + 10, 16, 6, 2);
			fillRoundedRect(ctx, x + 7, y + 10, 12, 6, 2);
			fillRoundedRect(ctx, x + 20, y + 10, 16, 6, 2);
			fillRoundedRect(ctx, x - 34, y + 20, 34, 18, 2);
			fillRoundedRect(ctx, x - 34, y + 41, 34, 18, 2);
			
			ctx.restore();
			
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "top");
			ctx.fillText(t.name, x, y + 94);
			
			if (i == Style.currentAppearance) {
				ctx.fillStyle = Style.accentColor;
				fillRoundedRect(ctx, x - 11, y + 107, 22, 4, 2);
			}
		}
		
		this.setIconColor(Style.secondaryColor);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Window Color", 32, 246);
		
		for (var i = 0, c; i < this.windowColors.length; i++) {
			c = this.windowColors[i];
			
			var cols = 7;
			var x = parseInt(32 + 230 / cols * ((i + 0.5) % cols));
			var y = parseInt(278 + Math.floor(i / cols) * 32);
			
			if (c != "any" && c != "new") {
				ctx.fillStyle = c;
				ctx.beginPath();
				ctx.arc(x, y, 10, 0, 2 * Math.PI);
				ctx.fill();
			}
			else if (c == "new") {
				this.drawIcon(ctx, this.icMore, x - 5, y - 5);
			}

			if (c == Style.windowColor) {
				ctx.fillStyle = c != "#FFF" ? "#FFF" : "#000";
				ctx.beginPath();
				ctx.arc(x, y, 4, 0, 2 * Math.PI);
				ctx.fill();
			}
			
			ctx.strokeStyle = c == "new" ? Style.secondaryColor : "#FFF";
			ctx.lineWidth = 1.4;
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, 2 * Math.PI);
			ctx.stroke();
		}
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Accent Color", 32, 336);
		
		for (var i = 0, t; i < this.accentColors.length; i++) {
			c = this.accentColors[i];
			
			var cols = 7;
			var x = parseInt(32 + 230 / cols * ((i + 0.5) % cols));
			var y = parseInt(368 + Math.floor(i / cols) * 32);
			
			if (c != "any" && c != "new") {
				ctx.fillStyle = c;
				ctx.beginPath();
				ctx.arc(x, y, 10, 0, 2 * Math.PI);
				ctx.fill();
			}
			else if (c == "new") {
				this.drawIcon(ctx, this.icMore, x - 5, y - 5);
			}
			else if (c == "any") {
				ctx.drawImage(this.icAccentColorAny, x - 10, y - 10);
			}

			if (c == Style.accentColor) {
				ctx.fillStyle = c != "#FFF" ? "#FFF" : "#000";
				ctx.beginPath();
				ctx.arc(x, y, 4, 0, 2 * Math.PI);
				ctx.fill();
			}
			
			ctx.strokeStyle = c == "new" ? Style.secondaryColor : "#FFF";
			ctx.lineWidth = 1.4;
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, 2 * Math.PI);
			ctx.stroke();
		}
		
		ctx.fillStyle = Style.buttonHoverColor;
		ctx.fillRect(32, 424, 230, 1);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Wallpaper Appearance", 32, 440);
		
		ctx.fillStyle = hover.wallpaper ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 160, 435, 102, 20, 4);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Dark Version", 168, 440);

		this.setIconColor(Style.secondaryFaintColor);
		this.drawIcon(ctx, this.icDropdown, 247, 441);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Transparency Effect", 32, 468);
		
		ctx.fillStyle = blurring ? "#41BFC1" : Style.buttonColor;
		fillRoundedRect(ctx, 157, 467, 26, 12, 6);
		ctx.fillStyle = "#0003";
		fillRoundedRect(ctx, blurring ? 169 : 155, 467, 14, 14, 6);
		ctx.fillStyle = "#FFF";
		fillRoundedRect(ctx, blurring ? 170 : 156, 466, 14, 14, 6);

		
		let mx = this.w / 2 - 116;
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Appearance Schedule", mx, 246);
		setTextStyle(ctx, Style.softTextColor, "10px sans-serif", "left", "top");
		ctx.fillText("Schedule times to change appearance automatically.", mx, 265);
		
		ctx.fillStyle = "#41BFC1";
		fillRoundedRect(ctx, this.w / 2 + 116 - 31, 245, 26, 12, 6);
		ctx.fillStyle = "#0003";
		fillRoundedRect(ctx, this.w / 2 + 116 - 19, 245, 14, 14, 6);
		ctx.fillStyle = "#FFF";
		fillRoundedRect(ctx, this.w / 2 + 116 - 18, 244, 14, 14, 6);
		
		ctx.fillStyle = hover.sunsetSunrise ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, mx, 285, 112, 20, 4);
		ctx.fillStyle = hover.customSchedule ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w / 2 + 4, 285, 112, 20, 4);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "center", "top");
		ctx.fillText("Sunset to Sunrise", this.w / 2 - 60, 290);
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "center", "top");
		ctx.fillText("Custom Schedule", this.w / 2 + 60, 290);
		
		ctx.strokeStyle = Style.accentColor;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo((Style.scheduleAuto ? mx : this.w / 2 + 4) + 4, 305.5);
		ctx.lineTo((Style.scheduleAuto ? mx : this.w / 2 + 4) + 108, 305.5);
		ctx.stroke();

		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Day", mx, 324);
		
		ctx.fillStyle = hover.scheduleDay ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, mx + 44, 319, 102, 20, 4);
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Pastel", mx + 52, 324);
		this.drawIcon(ctx, this.icDropdown, mx + 131, 325);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Night", mx, 353);
		
		ctx.fillStyle = hover.scheduleNight ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, mx + 44, 348, 102, 20, 4);
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Dark", mx + 52, 353);
		this.drawIcon(ctx, this.icDropdown, mx + 131, 354);

		
		ctx.fillStyle = Style.buttonHoverColor;
		ctx.fillRect(mx, 381, 232, 1);
		
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Text Size", mx, 398);

		setTextStyle(ctx, Style.softTextColor, "8px sans-serif", "left", "alphabetic");
		ctx.fillText("A", mx + 64, 406);

		ctx.fillStyle = Style.secondaryFaintColor;
		fillRoundedRect(ctx, mx + 77, 401, 132, 4, 2);
		ctx.fillStyle = Style.secondaryColor;
		fillRoundedRect(ctx, mx + 138, 398, 10, 10, 5);
		
		setTextStyle(ctx, Style.softTextColor, "14px sans-serif", "left", "alphabetic");
		ctx.fillText("A", mx + 217, 406);

		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Icon Size", mx, 427);
		
		ctx.fillStyle = hover.iconSize ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, mx + 60, 422, 102, 20, 4);
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Medium", mx + 68, 427);
		this.drawIcon(ctx, this.icDropdown, mx + 147, 428);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Buttons and Tabs", mx, 456);
		
		ctx.fillStyle = hover.buttonsTabs ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, mx + 103, 451, 102, 20, 4);
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Transparent", mx + 111, 456);
		this.drawIcon(ctx, this.icDropdown, mx + 190, 457);
		
		this.setIconColor(Style.iconColor);

		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Button Style", this.w - 264, 246);
		
		ctx.drawImage(this.imgPersonalStyleRoundedBG, this.w - 264, 266);
		ctx.drawImage(this.imgPersonalStyleRoundedNoBG, this.w - 158, 266);
		
		ctx.fillStyle = Style.accentColor;
		fillRoundedRect(ctx, this.w - (Style.buttonStyleBg ? 230 : 124), 355, 24, 4, 2);
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Corner Radius", this.w - 264, 381);
		
		ctx.drawImage(this.imgPersonalStyleRoundedBG, this.w - 264, 401);
		ctx.drawImage(this.imgPersonalStyleStraightBG, this.w - 158, 401);
		
		ctx.fillStyle = Style.accentColor;
		fillRoundedRect(ctx, this.w - (Style.buttonCornerRounded ? 230 : 124), 490, 24, 4, 2);
	},

	checkHoverGeneralAbout: function() {
		let inval = false;
		let hover = this.hover.general.about;
		let preHover = Object.assign({}, hover);

		// Avdan hover
		let totalConceptWidth = 174;
		let conceptWidth = 113;
		let avdanWidth = 39;
		let conceptX = this.w / 2 - totalConceptWidth / 2;
		let avdanX = this.w / 2 + totalConceptWidth / 2 - avdanWidth;
		let conceptY = this.h / 2 + 48 - 5;

		hover.concept = this.detectMouse(conceptX, conceptY, conceptWidth, 13);
		hover.avdan = this.detectMouse(avdanX, conceptY, avdanWidth, 13);
		
		// FacuA0 hover
		let totalCreditWidth = 109;
		let creditWidth = 60;
		let creditX = this.w / 2 + totalCreditWidth / 2 - creditWidth;
		hover.facu = this.detectMouse(creditX, this.h / 2 + 70 - 5, creditWidth, 13);
		
		// Mood_Aware hover
		totalCreditWidth = 236;
		creditWidth = 80;
		creditX = this.w / 2 + totalCreditWidth / 2 - creditWidth;
		hover.mood = this.detectMouse(creditX, this.h / 2 + 140, creditWidth, 12);
		
		// Ekmand hover
		totalCreditWidth = 120;
		creditWidth = 54;
		creditX = this.w / 2 + totalCreditWidth / 2 - creditWidth;
		hover.ekmand = this.detectMouse(creditX, this.h / 2 + 160, creditWidth, 12);

		let totalSwitchWidth = 72;
		hover.debug = this.detectMouseRounded(this.w / 2 + totalSwitchWidth / 2 - 28, this.h / 2 + 193, 28, 14, 7);

		if (hover.concept || hover.avdan || hover.facu || hover.mood || hover.ekmand) {
			setMouseCursor("pointer");
		}
		
		for (let h in hover) {
			inval = inval || hover[h] != preHover[h];
		}
		
		return inval;
	},
	
	checkHoverPersonalThemes: function() {
		var inval = false;
		var hover = this.hover.personal.themes;
		let preHover = Object.assign({}, hover);
		
		hover.edit = this.detectMouseRounded(this.w - 178, 102, 40, 20, 4);
		hover.getThemes = this.detectMouseRounded(this.w - 132, 102, 100, 20, 4);
		
		for (var i = 0, t; i < Style.themes.length; i++) {
			t = Style.themes[i];
			
			var cols = Math.floor((this.w - 64) / 204);
			var x = parseInt(32 + (this.w - 64) / cols * ((i + 0.5) % cols));
			var y = parseInt(140 + Math.floor(i / cols) * 185);
			
			if (this.detectMouseRounded(x - 90, y, 180, 118, 8)) {
				hover.themes = i;
				break;
			}
			
			if (i == Style.themes.length - 1) {
				hover.themes = -1;
			}
		}
		
		for (let h in hover) {
			inval = inval || hover[h] != preHover[h];
		}
		
		return inval;
	},
	
	checkHoverPersonalAppearance: function() {
		var inval = false;
		var hover = this.hover.personal.appearance;
		var appearances = Style.themes[Style.currentTheme].appearances;
		let preHover = Object.assign({}, hover);
		
		
		for (var i = 0, t; i < appearances.length; i++) {
			t = appearances[i];
			
			var x = parseInt(32 + (this.w - 64) / 5 * (i + 0.5));
			var y = 118;
			
			if (this.detectMouseRounded(x - 64, y, 128, 88, 6)) {
				hover.style = i;
				break;
			}
			
			if (i == appearances.length - 1) hover.style = -1;
		}
		
		for (var i = 0, c; i < this.windowColors.length; i++) {
			c = this.windowColors[i];
			
			var cols = 7;
			var x = parseInt(32 + 230 / cols * ((i + 0.5) % cols));
			var y = parseInt(278 + Math.floor(i / cols) * 32);
			
			if (this.detectMouseRounded(x - 10, y - 10, 20, 20, 10)) {
				hover.windowColor = i;
				break;
			}
			
			if (i == this.windowColors.length - 1) hover.windowColor = -1;
		}
		
		for (var i = 0, t; i < this.accentColors.length; i++) {
			c = this.accentColors[i];
			
			var cols = 7;
			var x = parseInt(32 + 230 / cols * ((i + 0.5) % cols));
			var y = parseInt(368 + Math.floor(i / cols) * 32);
			
			if (this.detectMouseRounded(x - 10, y - 10, 20, 20, 10)) {
				hover.accentColor = i;
				break;
			}
			
			if (i == this.accentColors.length - 1) hover.accentColor = -1;
		}
		
		hover.wallpaper = this.detectMouseRounded(160, 435, 100, 20, 4);
		hover.blurEffect = this.detectMouseRounded(156, 466, 28, 14, 7);
		
		let mx = this.w / 2 - 116;
		hover.sunsetSunrise = this.detectMouseRounded(mx, 285, 112, 20, 4);
		hover.customSchedule = this.detectMouseRounded(this.w / 2 + 4, 285, 112, 20, 4);
		hover.scheduleDay = this.detectMouseRounded(this.w / 2 - 74, 319, 98, 20, 4);
		hover.scheduleNight = this.detectMouseRounded(this.w / 2 - 74, 348, 98, 20, 4);
		
		hover.iconSize = this.detectMouseRounded(mx + 60, 422, 98, 20, 4);
		hover.buttonsTabs = this.detectMouseRounded(mx + 103, 451, 98, 20, 4);
		
		if (this.detectMouseRounded(this.w - 264, 266, 92, 84, 4)) hover.buttonStyle = 0;
		else if (this.detectMouseRounded(this.w - 158, 266, 92, 84, 4)) hover.buttonStyle = 1;
		else hover.buttonStyle = -1;
		
		if (this.detectMouseRounded(this.w - 264, 401, 92, 84, 4)) hover.cornerRadius = 0;
		else if (this.detectMouseRounded(this.w - 158, 401, 92, 84, 4)) hover.cornerRadius = 1;
		else hover.cornerRadius = -1;
		
		for (let h in hover) {
			inval = inval || hover[h] != preHover[h];
		}
		
		return inval;
	},
	
	checkHoverMainSettings: function() {
		if (this.settingsScreen) return false;
		
		var inval = false;
		var preHover = Object.assign({}, this.mainHover);
		
		// User
		this.mainHover.user = this.detectMouse(10, 13, 140, 52);
		
		// Cloud
		this.mainHover.cloud = this.detectMouse(this.w - 150, 13, 140, 52);
		
		// Pinned
		let wPinned = this.w - 40;
		let wPinS = wPinned * 0.220859;
		let wPinL = wPinned * 0.265337;
		
		this.mainHover.pinned = -1;
		
		if (this.detectMouse(20, 104, wPinS, 37, 4)) this.mainHover.pinned = 0; // Wallpaper
		if (this.detectMouse(20, 149, wPinS, 37, 4)) this.mainHover.pinned = 1; // Notifications
		if (this.detectMouse(20, 194, wPinS, 37, 4)) this.mainHover.pinned = 2; // Internet accounts
		if (this.detectMouse(28 + wPinS, 104, wPinL, 127, 4)) this.mainHover.pinned = 3; // Bluetooth
		if (this.detectMouse(36 + wPinS + wPinL, 104, wPinS, 82, 4)) this.mainHover.pinned = 4; // Updates
		if (this.detectMouse(36 + wPinS + wPinL, 194, wPinS, 37, 4)) this.mainHover.pinned = 5; // Battery
		if (this.detectMouse(44 + wPinS * 2 + wPinL, 104, wPinL, 127, 4)) this.mainHover.pinned = 6; // Wi-Fi
		
		this.mainHover.settings = -1;
		for (var i = 0; i < this.settings.length; i++) {
			let cols = Math.floor((this.w - 40) / 160);
			let x = parseInt(28 + (this.w - 40) / cols * (i % cols));
			let y = parseInt(301 + Math.floor(i / cols) * 50);
			
			if (this.detectMouse(x - 8, y - 20, (this.w - 40) / cols - 12, 40)) {
				this.mainHover.settings = i;
			}
		}
		
		
		// Recommended
		let wRec = (this.w - 64) / 4;
		this.mainHover.recommended = -1;
		
		if (this.detectMouse(20, 480, wRec, 38)) this.mainHover.recommended = 0;
		if (this.detectMouse(28 + wRec, 480, wRec, 38)) this.mainHover.recommended = 1;
		if (this.detectMouse(36 + wRec * 2, 480, wRec, 38)) this.mainHover.recommended = 2;
		if (this.detectMouse(44 + wRec * 3, 480, wRec, 38)) this.mainHover.recommended = 3;
		
		for (let h in this.mainHover) {
			inval = inval || preHover[h] != this.mainHover[h];
		}
		
		return inval;
	},
	
	checkHoverSecondSettings: function() {
		if (!this.settingsScreen) return false;
		
		let inval = false;
		let preHover = Object.assign({}, this.hover);
		
		this.hover.back = this.detectMouse(6, 6, 34, 20);
		this.hover.forward = this.detectMouse(43, 6, 34, 20);
		this.hover.home = this.detectMouse(83, 6, 26, 20);
		this.hover.options = this.detectMouse(115, 6, 26, 20);
		
		let sections = this.settingsCat.sections;
		for (let i = 0; i < sections.length; i++) {
			
			let w = (this.w - 12 - 6 * (sections.length - 1)) / sections.length;
			let x = 6 + w * i + 6 * i;
			
			
			if (this.detectMouse(x, 48, w, 26)) {
				this.hover.sections = i;
				break;
			}
			
			if (i == this.settingsCat.sections.length - 1) {
				this.hover.sections = -1;
			}
		}
		
		for (let k in this.hover) {
			inval = inval || this.hover[k] != preHover[k];
		}
		
		if (this.settingsSection) {
			let checkSection = "checkHover" + this.settingsCat.func + this.settingsSection.func;
			if (this[checkSection]) {
				inval = inval || this[checkSection]();
			}
		}
		
		return inval;
	},

	clearHoverMain: function() {
		let main = this.mainHover;
		main.user = false;
		main.cloud = false;
		main.pinned = -1;
		main.settings = -1;
		main.recommended = -1;
	},

	clearHoverCategory: function() {
		let h = this.hover;
		h.back = false;
		h.forward = false;
		h.home = false;
		h.options = false;
		h.sections = -1;

		if (this.settingsSection) {
			this.clearHoverSection(this.settingsCat, this.settingsSection);
		}
	},

	clearHoverSection: function(settings, section) {
		settings = settings.func.toLowerCase();
		section = section.func.toLowerCase();

		// If the section doesn't have a hover object, obj is undefined and ignored
		let obj = this.hover[settings][section];

		for (let hover in obj) {
			if (typeof hover == "boolean") obj[hover] = false;
			else if (typeof hover == "number") obj[hover] = -1;
		}
	},
	
	mouseMove: function() {
		let inval = false;
		
		inval = inval || this.checkHoverMainSettings();
		inval = inval || this.checkHoverSecondSettings();
		
		if (inval) this.invalidate();
	},
	
	mouseClick: function() {
		if (this.settingsScreen) {
			if (this.hover.back || this.hover.home) {
				this.clearHoverCategory();
				this.settingsScreen = false;
				this.settingsCat = null;
				this.settingsSection = null;
			}
			else if (this.hover.sections != -1) {
				this.clearHoverSection(this.settingsCat, this.settingsSection);
				this.settingsSection = this.settingsCat.sections[this.hover.sections];
			}
			else {
				if (this.settingsCat.func == "General" && this.settingsSection.func == "About") {
					let hover = this.hover.general.about;
					if (hover.concept) {
						open("https://www.youtube.com/watch?v=tXFEiw1aJTw", "_blank");
					}
					else if (hover.avdan) {
						open("https://www.youtube.com/@Avdan", "_blank");
					}
					else if (hover.facu) {
						open("https://reddit.com/u/FacuA0", "_blank");
					}
					else if (hover.mood) {
						open("https://reddit.com/u/Mood_Aware/", "_blank");
					}
					else if (hover.ekmand) {
						open("https://reddit.com/u/Ekmand/", "_blank");
					}
					else if (hover.debug) {
						debug = !debug;
						StorageSystem.set("System", "DebugMode", debug);
					}
				}
				if (this.settingsCat.func == "Personal" && this.settingsSection.func == "Themes") {
					let hover = this.hover.personal.themes;
					if (hover.themes != -1) {
						Style.setTheme(Style.themes[hover.themes]);
					}
				}
				else if (this.settingsCat.func == "Personal" && this.settingsSection.func == "Appearance") {
					var hover = this.hover.personal.appearance;
					if (hover.style != -1) {
						Style.currentAppearance = hover.style;
						Style.setTheme(Style.themes[Style.currentTheme], hover.style);
					}
					
					if (hover.windowColor != -1) {
						Style.windowColor = this.windowColors[hover.windowColor];
						Style.updateTheme();
					}
					
					if (hover.accentColor != -1) {
						Style.accentColor = this.accentColors[hover.accentColor];
						Style.updateTheme();
					}

					if (hover.blurEffect) {
						blurring = !blurring;
						StorageSystem.set("System", "Blurring", blurring);
					}
					
					if (hover.buttonStyle != -1) {
						Style.buttonStyleBg = hover.buttonStyle == 0;
						Style.updateTheme();
					}
					
					if (hover.cornerRadius != -1) {
						Style.buttonCornerRounded = hover.cornerRadius == 0;
						Style.updateTheme();
					}
				}
			}
			return;
		}
		
		if (this.mainHover.settings != -1) {
			let s = this.settings[this.mainHover.settings];
			
			this.clearHoverMain();
			this.settingsScreen = true;
			this.settingsCat = s;
			if (s.sections.length > 0) {
				this.settingsSection = s.sections[0];
			}
		}
	},

	mouseExit: function() {
		if (!this.settingsScreen) {
			this.clearHoverMain();
		}
		else {
			this.clearHoverCategory();
		}

		this.invalidate();
	}
};

function SettingsApp() {
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
	this.icDropdown = loadIcon("global", "Dropdown", 8, 8);
	this.icMore = loadIcon("Photos", "More", 10, 10);
	
	this.icMainEarbuds = loadIcon("Settings", "Earbuds", 16, 16);
	this.icMainHeadphones = loadIcon("Settings", "Headphones", 16, 16);
	this.icMainWirelessMouse = loadIcon("Settings", "WirelessMouse", 16, 16);
	this.icMainInfo = loadIcon("Messages", "Info", 14, 14);
	this.icMainLock = loadIcon("global", "Lock", 12, 12);
	this.icMainGo = loadIcon("global", "Forward", 12, 13);

	this.icAccentColorAny = loadIcon("Settings", "AccentColorAny", 20, 20);

	this.icMainWifiLevels = [
		loadIcon("Settings", "WiFiLevel0", 16, 16),
		loadIcon("Settings", "WiFiLevel1", 16, 16),
		loadIcon("Settings", "WiFiLevel2", 16, 16),
		loadIcon("Settings", "WiFiLevel3", 16, 16),
		loadIcon("Settings", "WiFiLevel4", 16, 16)
	];
	
	this.imgPersonalStyleRoundedBG = loadImage("Settings", "AppearanceStyleRoundedBG");
	this.imgPersonalStyleRoundedNoBG = loadImage("Settings", "AppearanceStyleRoundedNoBG");
	this.imgPersonalStyleStraightBG = loadImage("Settings", "AppearanceStyleStraightBG");
	this.imgPersonalStyleStraightNoBG = loadImage("Settings", "AppearanceStyleStraightNoBG");

	this.mainHover = {
		user: false,
		cloud: false,
		pinned: -1,
		settings: -1,
		recommended: -1
	};
	
	this.hover = {
		back: false,
		forward: false,
		home: false,
		options: false,
		sections: -1,
		
		general: {
			about: {
				concept: false,
				avdan: false,
				facu: false,
				mood: false,
				ekmand: false,
				debug: false
			}
		},
		personal: {
			themes: {
				themes: -1,
				edit: false,
				getThemes: false
			},
			appearance: {
				style: -1,
				windowColor: -1,
				accentColor: -1,
				wallpaper: false,
				blurEffect: false,
				sunsetSunrise: false,
				customSchedule: false,
				scheduleDay: false,
				scheduleNight: false,
				iconSize: false,
				buttonsTabs: false,
				buttonStyle: -1,
				cornerRadius: -1
			}
		},
		network: {},
		language: {},
		time: {},
		search: {},
		displays: {},
		apps: {},
		accessibility: {},
		sound: {},
		privacy: {},
		security: {},
		users: {},
		devices: {},
		extensions: {}
	};
	
	this.settings = [
		{
			name: "General",
			icon: this.icSetGeneral,
			sections: [
				{name: "Battery"},
				{name: "Updates"},
				{name: "About"}
			]
		}, {
			name: "Personalization",
			func: "Personal",
			icon: this.icSetPersonalize,
			sections: [
				{name: "Wallpaper"},
				{name: "Themes"},
				{name: "Appearance"},
				{name: "Dock"},
				{name: "Menus"},
				{name: "Screen Saver", func: "Screensaver"}
			]
		}, {
			name: "Network and Internet",
			func: "Network",
			icon: this.icSetNetwork,
			sections: [
				{name: "Wi-Fi", func: "Wifi"},
				{name: "Bluetooth"},
				{name: "Ethernet"},
				{name: "VPN"}
			]
		}, {
			name: "Language and Region",
			func: "Language",
			icon: this.icSetLanguage,
			sections: [
				{name: "Language"},
				{name: "Keyboard Layout", func: "Keyboard"},
				{name: "Format"}
			]
		}, {
			name: "Time and Date",
			func: "Time",
			icon: this.icSetTime,
			sections: [
				{name: "Time"},
				{name: "Date"},
				{name: "Timezone"}
			]
		}, {
			name: "Search",
			icon: this.icSetSearch,
			sections: [
				{name: "Search"}
			]
		}, {
			name: "Displays",
			icon: this.icSetDisplays,
			sections: []
		}, {
			name: "Apps",
			icon: this.icSetApps,
			sections: [
				{name: "Apps"},
				{name: "Defaults"}
			]
		}, {
			name: "Accessibility",
			func: "Access",
			icon: this.inSetAccessibility,
			sections: [
				{name: "Visual"},
				{name: "Audio"}
			]
		}, {
			name: "Sound",
			icon: this.icSetSound,
			sections: [
				{name: "Input"},
				{name: "Output"},
				{name: "System Sounds", func: "System"}
			]
		}, {
			name: "Privacy",
			icon: this.inSetPrivacy,
			sections: []
		}, {
			name: "Security",
			icon: this.icSetSecurity,
			sections: []
		}, {
			name: "Users",
			icon: this.icSetUsers,
			sections: [
				{name: "Accounts"},
				{name: "Internet Accounts", func: "Internet"}
			]
		}, {
			name: "Devices",
			icon: this.icSetDevices,
			sections: [
				{name: "Devices"},
				{name: "Mouse"},
				{name: "Keyboard"}
			]
		}, {
			name: "Extensions",
			icon: this.icSetExtensions,
			sections: []
		}
	];
	
	for (let s in this.settings) {
		if (!this.settings[s].func) {
			this.settings[s].func = this.settings[s].name;
		}
		
		for (let sec of this.settings[s].sections) {
			sec.hover = false;
			if (!sec.func) sec.func = sec.name;
		}
	};
	
	this.settingsScreen = false;
	this.settingsCat = null;
	this.settingsSection = null;

	this.textSearch = "";
}

SettingsAppProto.__proto__ = App;
setPrototype(SettingsApp, SettingsAppProto);
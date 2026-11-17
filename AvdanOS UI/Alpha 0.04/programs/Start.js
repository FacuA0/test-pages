var StartMenuProto = {
	w: 684,
	h: 498,
	
	isCentered: true,
	cornerRadius: 8,
	
	visible: false,
	opened: false,
	
	allAppsScreen: false,
	scrollAllApps: 0,
	maxScrollAllApps: 0,
	
	search: "",
	
	draw: function(ctx) {
		// Background
		ctx.globalAlpha = this.animAlpha * Style.windowTransparency;
		ctx.fillStyle = Style.windowColor;
		fillRoundedRect(ctx, 0, 0, this.w, this.h, 8);
		
		ctx.globalAlpha = this.animAlpha;
		
		// Icon color
		this.setIconColor(Style.iconColor);
		
		this.drawBottomBar(ctx);
		
		if (!this.allAppsScreen) {
			this.drawMainScreen(ctx);
		}
		else {
			this.drawAllAppsScreen(ctx);
		}
		
		ctx.globalAlpha = 1;
	},
	
	drawMainScreen: function(ctx) {
		
		// Widgets
		var widgetWidth = (this.w - (18 * 2 + 4 * 2)) / 3;
		
		ctx.fillStyle = this.hoverMain.widgets == 0 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 18, 24, widgetWidth, 110, 6);
		
		ctx.fillStyle = this.hoverMain.widgets == 1 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 18 + widgetWidth + 4, 24, widgetWidth, 110, 6);
		
		ctx.fillStyle = this.hoverMain.widgets == 2 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 18 + widgetWidth * 2 + 8, 24, widgetWidth, 110, 6);
		
		// Weather widget
		ctx.translate(18, 24);
		
		// City
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "top");
		ctx.fillText("Example City", 12, 12);
		
		// Temperature
		ctx.font = "15px sans-serif";
		ctx.fillText("24\u00B0", 12, 28);
		
		// Sun
		ctx.drawImage(this.icSun, widgetWidth - 30, 14, 22, 22);
		
		// Status, Max/min temperature
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "right", "bottom");
		ctx.fillText("Sunny", widgetWidth - 40, 26);
		setTextStyle(ctx, Style.textColor, "9px sans-serif", "right", "top");
		ctx.fillText("H: 28\u00B0, L: 6\u00B0", widgetWidth - 40, 28);
		
		// Weather in the week
		for (var i = 0; i < 7; i++) {
			var x = 18 + (widgetWidth - 36) / 6 * i;
			
			setTextStyle(ctx, Style.softTextColor, "8px sans-serif", "center", "top");
			ctx.fillText(new Date().getDate() + i - 1, x, 62);
			setTextStyle(ctx, Style.textColor, "10px sans-serif", "center", "top");
			ctx.fillText("24\u00B0", x, 90);
			
			ctx.drawImage(this.icSun, x - 6, 74, 12, 12);
		}
		
		// Reminder widget
		ctx.translate(widgetWidth + 4, 0);
		
		// Title
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "center", "top");
		ctx.fillText("Today", widgetWidth / 2, 12);
		
		// Times
		setTextStyle(ctx, Style.textColor, "8px sans-serif", "left", "top");
		ctx.fillText("12:00 - 13:00", 20, 34);
		ctx.fillText("17:00 - 18:00", 20, 70);
		
		// Reminders
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "left", "top");
		ctx.fillText("Reminder 1", 20, 48);
		ctx.fillText("Reminder 2", 20, 84);
		
		// Dots
		ctx.fillStyle = Style.accentColor;
		ctx.beginPath();
		ctx.arc(12, 37, 4, 0, 2 * Math.PI);
		ctx.arc(12, 73, 4, 0, 2 * Math.PI);
		ctx.fill();
		
		// Devices widget
		ctx.translate(widgetWidth + 4, 0);
		
		var devIcons = [this.icDevPhone, this.icDevWatch, this.icDevCar];
		var devNames = ["My Phone", "Kaan's Watch", "Togg SUV"];
		var devBatteries = [25, 85, 55];
		for (var i = 0; i < 3; i++) {
			var x = widgetWidth / 6 * (i * 2 + 1);
			
			// Circles
			ctx.fillStyle = "#00000066";
			ctx.beginPath();
			ctx.arc(x, 33, 17, 0, 2 * Math.PI);
			ctx.fill();
			
			ctx.strokeStyle = "#FFFFFF44";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(x, 33, 17, 0, 2 * Math.PI);
			ctx.stroke();
			
			// Device icon
			ctx.drawImage(devIcons[i], x - 8, 25);
			
			// Name
			setTextStyle(ctx, Style.textColor, "8px sans-serif", "center", "top");
			ctx.fillText(devNames[i], x, 60);
			
			// Battery
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "top");
			ctx.fillText(devBatteries[i] + "%", x, 75);
			
			// Battery bar
			ctx.fillStyle = "#FFFFFF66";
			fillRoundedRect(ctx, x - 21, 91, 42, 6, 3);
			ctx.fillStyle = "#22DD88";
			fillRoundedRect2(ctx, x - 21, 91, 42 * (devBatteries[i] / 100), 6, 3, 0, 0, 3);
		}
		
		ctx.translate(-widgetWidth * 2 - 8 - 18, -24);
		
		// Pinned Apps
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Pinned Apps", 22, 156);
		
		var appsWidth = 410;
		
		for (var i = 0; i < this.pinnedApps.length; i++) {
			var x = 44 + 348 / 6 * (i % 7);
			var y = 200 + 70 * Math.floor(i / 7);
			
			let pApp = this.pinnedApps[i];
			let app = this.apps[pApp.app];
			
			if (i == this.hoverMain.pinnedApps) {
				ctx.fillStyle = Style.buttonColor;
				fillRoundedRect(ctx, x - 26, y - 22, 52, 60, 4);
			}
			
			ctx.drawImage(app.icon, x - 15, y - 15);
			
			setTextStyle(ctx, Style.textColor, "10px sans-serif", "center", "top");
			ctx.fillText(app.name, x, y + 20, 52);
		}
		
		// App setups
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("App Setups", 18, 324);
		
		ctx.fillStyle = this.hoverMain.appSetups == 0 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 18, 353, 93, 71, 4);
		
		ctx.fillStyle = ctx.buttonColor;
		fillRoundedRect(ctx, 21, 356, 42, 65, 4);
		fillRoundedRect(ctx, 66, 356, 42, 65, 4);
		
		ctx.drawImage(this.icPhotoshop, 28, 374, 28, 28);
		ctx.drawImage(this.icIllustrator, 73, 374, 28, 28);
		
		
		ctx.fillStyle = this.hoverMain.appSetups == 1 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 118, 353, 93, 71, 4);

		ctx.fillStyle = ctx.buttonColor;
		fillRoundedRect(ctx, 121, 356, 87, 65, 4);
		
		ctx.fillStyle = Style.buttonHoverColor;
		fillRoundedRect(ctx, 174, 379, 30, 38, 4);
		
		ctx.drawImage(this.icNotes, 135, 374, 28, 28);
		ctx.drawImage(this.icCalculator, 177, 386, 24, 24);
		
		
		ctx.fillStyle = this.hoverMain.appSetups == 2 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 218, 353, 93, 71, 4);
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, 221, 356, 42, 31, 4);
		fillRoundedRect(ctx, 221, 390, 42, 31, 4);
		fillRoundedRect(ctx, 266, 356, 42, 65, 4);
		
		ctx.drawImage(this.icNotes, 230, 361, 20, 20);
		ctx.drawImage(this.icMessages, 232, 395, 20, 20);
		ctx.drawImage(this.icLale, 273, 374, 28, 28);
		
		
		ctx.fillStyle = this.hoverMain.appSetups == 3 ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 318, 353, 93, 71, 4);
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, 321, 356, 42, 65, 4);
		fillRoundedRect(ctx, 366, 356, 42, 31, 4);
		fillRoundedRect(ctx, 366, 390, 42, 31, 4);
		
		ctx.drawImage(this.icMail, 328, 374, 28, 28);
		ctx.drawImage(this.icCalendar, 378, 359, 20, 20);
		ctx.drawImage(this.icLale, 377, 395, 20, 20);
		
		// Divider line between Apps and Recents
		ctx.strokeStyle = Style.buttonColor;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(18 + appsWidth, 154);
		ctx.lineTo(18 + appsWidth, this.h - 75);
		ctx.stroke();
		
		
		// Pick up where you left off
		
		//var rightWidth = this.w - appsWidth - 56 - 24;
		var rightWidth = 218;
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
		ctx.fillText("Pick up where you left off", 450, 156);
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, 447, 184, rightWidth, 76, 4);
		fillRoundedRect(ctx, 447, 266, rightWidth, 76, 4);
		fillRoundedRect(ctx, 447, 348, rightWidth, 76, 4);
		
		// Continue listening
		ctx.translate(447, 184); // 423 423
		
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "left", "top");
		ctx.fillText("Continue listening", 12, 10);
		
		ctx.globalAlpha = 0.4;
		ctx.drawImage(this.icMusic, 12, 30, 34, 34);
		ctx.globalAlpha = 1;
		ctx.drawImage(this.icMusic, 32, 50, 16, 16);
		
		setTextStyle(ctx, Style.textColor, "9px sans-serif", "left", "top");
		ctx.fillText("Singing", 56, 34);
		setTextStyle(ctx, Style.softTextColor, "8px sans-serif", "left", "top");
		ctx.fillText("Singer", 56, 50);
		
		
		if (this.hoverMain.musicPlay) {
			ctx.fillStyle = Style.buttonFaintColor;
			fillRoundedRect(ctx, rightWidth - 56, 33, 24, 24, 4);
		}
		if (this.hoverMain.musicStar) {
			ctx.fillStyle = Style.buttonFaintColor;
			fillRoundedRect(ctx, rightWidth - 31, 33, 24, 24, 4);
		}
		
		this.drawIcon(ctx, this.icPlay, rightWidth - 52, 37, 16, 16);
		this.drawIcon(ctx, this.icStar, rightWidth - 28, 36, 18, 18);
		
		// Continue editing
		ctx.translate(0, 82);
		
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "left", "top");
		ctx.fillText("Continue editing", 12, 10);
		
		ctx.globalAlpha = 0.4;
		ctx.drawImage(this.icPhotos, 12, 30, 34, 34);
		ctx.globalAlpha = 1;
		ctx.drawImage(this.icIllustrator, 32, 50, 16, 16);
		
		setTextStyle(ctx, Style.textColor, "9px sans-serif", "left", "top");
		ctx.fillText("Abstract Wallpaper", 56, 34);
		setTextStyle(ctx, Style.softTextColor, "8px sans-serif", "left", "top");
		ctx.fillText("Adobe Illustrator Document", 56, 50);
		
		ctx.fillStyle = this.hoverMain.editOpen ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, rightWidth - 54, 36, 44, 18, 4);
		setTextStyle(ctx, Style.softTextColor, "10px sans-serif", "center", "middle");
		ctx.fillText("Open", rightWidth - 32, 45);
		
		// Continue reading
		ctx.translate(0, 82);
		
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "left", "top");
		ctx.fillText("Continue reading", 12, 10);
		
		ctx.globalAlpha = 0.4;
		ctx.drawImage(this.icPhotos, 12, 30, 34, 34);
		ctx.globalAlpha = 1;
		ctx.drawImage(this.icPdf, 32, 50, 16, 16);
		
		setTextStyle(ctx, Style.textColor, "9px sans-serif", "left", "top");
		ctx.fillText("Some Book", 56, 34);
		setTextStyle(ctx, Style.softTextColor, "8px sans-serif", "left", "top");
		ctx.fillText("PDF Reader", 56, 50);
		
		ctx.fillStyle = this.hoverMain.readOpen ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, rightWidth - 54, 36, 44, 18, 4);
		setTextStyle(ctx, Style.softTextColor, "10px sans-serif", "center", "middle");
		ctx.fillText("Open", rightWidth - 32, 45);
		
		ctx.translate(-447, -348);
	},
	
	drawAllAppsScreen: function(ctx) {
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, 18, 24, this.w - 36, 28, 4);
		
		setTextStyle(ctx, Style.softTextColor, "11px sans-serif", "left", "middle");
		ctx.fillText(this.search == "" ? "Search apps" : this.search, 26, 39);
		
		var allAppsHeight = this.h - 122;

		ctx.save();
		ctx.beginPath();
		ctx.rect(18, 70, this.w - 36, allAppsHeight);
		ctx.clip();
		
		var searchEnabled = this.search != "";
		var appsLength = searchEnabled ? this.searchedApps.length : this.apps.length;
		for (var i = 0; i < appsLength; i++) {
			var x = 18 + (this.w - 36) / 10 * (i % 10 + 0.5);
			var y = 96 + 76 * Math.floor(i / 10) - this.scrollAllApps;
			
			var app = this.apps[searchEnabled ? this.searchedApps[i] : i];
			
			if (app.hover) {
				ctx.fillStyle = Style.buttonColor;
				fillRoundedRect(ctx, x - 30, y - 26, 60, 64, 4);
			}
			
			let tx = i % 10;
			let ty = parseInt(i / 10);
			var keyPointer = this.allAppsKeyboardPointer;
			
			if (keyPointer.active && keyPointer.x == tx && keyPointer.y == ty) {
				ctx.strokeStyle = Style.buttonHoverColor;
				ctx.lineWidth = 2;
				setRoundedPath(ctx, x - 29, y - 25, 58, 62, 4, 4, 4, 4);
				ctx.stroke();
			}
			
			ctx.drawImage(app.icon, x - 18, y - 18, 36, 36);
			
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "top");
			ctx.fillText(app.name, x, y + 24, 56);
		}

		ctx.restore();
		
		let viewportHeight = allAppsHeight;
		let barHeight = allAppsHeight - 12;
		let contentHeight = 6 + Math.ceil(appsLength / 10) * 76;
		this.maxScrollAllApps = Math.max(0, contentHeight - allAppsHeight);
		let sliderHeight = barHeight * (viewportHeight / contentHeight);
		
		if (viewportHeight < contentHeight) {
			let contentY = 76 + (barHeight - sliderHeight) * (this.scrollAllApps / this.maxScrollAllApps);

			// Scrollbar
			ctx.fillStyle = Style.windowCoverColor;
			fillRoundedRect(ctx, this.w - 10, 76, 4, barHeight, 2);
			
			// Scrollbar slider
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, this.w - 10, contentY, 4, sliderHeight, 2);
		}
		
		/* Old layout (list)
		var ty = 0;
		
		var pl = "", cl = "";
		for (let i = 0, ty = 0; i < this.apps.length; i++) {
			let app = this.apps[i];
			
			cl = app.name[0];
			
			let changedLetter = pl != cl;
			if (changedLetter) {
				pl = cl;
				ty++;
			}
			
			var x = 18;
			var y = 64 + ty * 40 - this.scrollAllApps;
			
			ctx.save();
			ctx.beginPath();
			ctx.rect(0, 0, this.w, allAppsHeight);
			ctx.clip();
			
			if (changedLetter) {
				setTextStyle(ctx, Style.softTextColor, "14px sans-serif", "center", "top");
				ctx.fillText(cl, x + 12, y - 40);
			}
			
			if (app.hover) {
				ctx.fillStyle = Style.buttonColor;
				fillRoundedRect(ctx, x, y - 18, this.w - 36, 36, 4);
			}
			
			ctx.drawImage(app.icon ? app.icon : this.icAppDefault, x + 6, y - 12, 24, 24);
			
			setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "middle");
			ctx.fillText(app.name, x + 36, y);
			
			ctx.restore();
			
			contentHeight = ty;
			ty++;
		}
		*/
		
	},
	
	drawBottomBar: function(ctx) {
		
		// Bottom bar
		ctx.translate(0, this.h - 52);
		
		ctx.fillStyle = Style.windowCoverColor;
		fillRoundedRect2(ctx, 0, 0, this.w, 52, 0, 0, 8, 8);
		
		// User account
		if (this.hoverBottomBar.user) {
			ctx.fillStyle = Style.buttonFaintColor;
			fillRoundedRect(ctx, 12, 4, 100, 44, 4);
		}
		
		ctx.drawImage(this.icProfile, 18, 10, 32, 32);
		
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText("User", 60, 27);
		
		// Action buttons
		var half = this.w / 2;
		ctx.fillStyle = this.hoverBottomBar.settings ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, half - 84, 16, 52, 20, 4);
		
		ctx.fillStyle = this.hoverBottomBar.allApps ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, half - 26, 16, 52, 20, 4);
		
		ctx.fillStyle = this.hoverBottomBar.shutdown ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, half + 32, 16, 52, 20, 4);
		
		this.drawIcon(ctx, this.icBtnSettings, half - 64, 20);
		this.drawIcon(ctx, this.icAllApps, half - 6, 20);
		this.drawIcon(ctx, this.icPower, half + 52, 20);
		
		// Cloud storage
		if (this.hoverBottomBar.cloud) {
			ctx.fillStyle = Style.buttonFaintColor;
			fillRoundedRect(ctx, this.w - 152, 4, 140, 44, 4);
		}
		
		ctx.drawImage(this.icCloud, this.w - 41, 9);
		
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "right", "top");
		ctx.fillText("Cloud Storage", this.w - 50, 11);
		setTextStyle(ctx, Style.softTextColor, "8px sans-serif", "right", "top");
		ctx.fillText("252 GB used of 1 TB", this.w - 50, 24);
	
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, this.w - 138, 38, 120, 4, 2);
		ctx.fillStyle = "#8AACFF";
		fillRoundedRect(ctx, this.w - 138, 38, 120 * 0.252, 4, 2);
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	},
	
	filterSearchApps: function() {
		this.searchedApps = [];
		
		for (let i = 0; i < this.apps.length; i++) {
			let app = this.apps[i];
			if (app.name.toLowerCase().includes(this.search.toLowerCase())) {
				this.searchedApps.push(i);
			}
		}
	},
	
	open: function() {
		if (this.opened) return;
		
		this.visible = true;
		this.opened = true;
		
		dock.setAutohide();
		
		if (this.animTranslate != 0) Animator.cancelAnimation(this.animTranslate);
		if (this.animOpacity != 0) Animator.cancelAnimation(this.animOpacity);
		
		Animator.addAnimation({
			target: this.transform,
			property: "translateY",
			drawable: this,
			interpolation: Animator.createBezier(0.05, 0.75),
			a: 30,
			b: 0,
			duration: 0.3
		});
		Animator.addAnimation({
			target: this.transform,
			property: "opacity",
			drawable: this,
			interpolation: Animator.createBezier(0.05, 0.75),
			a: 0,
			b: 1,
			duration: 0.3
		});
	},
	
	close: function() {
		if (!this.opened) return;

		this.opened = false;

		dock.setAutohide();

		this.animTranslate = Animator.addAnimation({
			target: this.transform,
			property: "translateY",
			drawable: this,
			interpolation: Animator.createBezier(0.95, 0.25),
			a: 0,
			b: 30,
			duration: 0.3,
			onFinish: anim => anim.target.translateY = anim.a
		});
		this.animOpacity = Animator.addAnimation({
			target: this.transform,
			property: "opacity",
			drawable: this,
			interpolation: Animator.createBezier(0.95, 0.25),
			a: 1,
			b: 0,
			duration: 0.3,
			onFinish: anim => {
				anim.target.opacity = anim.a;
				
				let dr = anim.drawable;
				dr.animTranslate = 0;
				dr.animOpacity = 0;
				dr.visible = false;
				dr.allAppsScreen = false;
				dr.search = "";
				dr.allAppsKeyboardPointer.active = false;
				dr.allAppsKeyboardPointer.x = 0;
				dr.allAppsKeyboardPointer.y = 0;
			}
		});
	},
	
	mouseMove: function() {
		let inval = false;
		
		inval = inval || this.checkHoverBottomBar();
		inval = inval || this.checkHoverPinnedApps();
		inval = inval || this.checkHoverAllApps();
		
		if (inval) this.invalidate();
	},
	
	checkHoverBottomBar: function() {
		let inval = false;
		let hover = this.hoverBottomBar;
		let preHover = Object.assign({}, hover);
		
		hover.user = this.detectMouse(12, this.h - 48, 100, 44);
		
		hover.settings = this.detectMouse(this.w / 2 - 84, this.h - 36, 52, 20);
		hover.allApps = this.detectMouse(this.w / 2 - 26, this.h - 36, 52, 20);
		hover.shutdown = this.detectMouse(this.w / 2 + 32, this.h - 36, 52, 20);
		
		hover.cloud = this.detectMouse(this.w - 152, this.h - 48, 140, 44);
		
		inval = inval || preHover.user != hover.user;
		inval = inval || preHover.settings != hover.settings;
		inval = inval || preHover.allApps != hover.allApps;
		inval = inval || preHover.shutdown != hover.shutdown;
		inval = inval || preHover.cloud != hover.cloud;
		
		return inval;
	},
	
	checkHoverPinnedApps: function() {
		if (this.allAppsScreen) return false;
		
		var inval = false;
		var preHover = Object.assign({}, this.hoverMain);
		var appsWidth = 410;
		
		
		// Widgets
		var widgetWidth = (this.w - (18 * 2 + 4 * 2)) / 3;
		
		this.hoverMain.widgets = -1;
		for (var i = 0; i < 3; i++) {
			if (this.detectMouse(18 + (widgetWidth + 4) * i, 24, widgetWidth, 110)) {
				this.hoverMain.widgets = i;
			}
		}
		
		// Pinned apps
		this.hoverMain.pinnedApps = -1;
		for (var i = 0; i < this.pinnedApps.length; i++) {
			var x = 44 + 348 / 6 * (i % 7);
			var y = 200 + 70 * Math.floor(i / 7);
			
			if (this.detectMouse(x - 26, y - 22, 52, 60)) {
				this.hoverMain.pinnedApps = i;
			}
		}
		
		// App setups
		this.hoverMain.appSetups = -1;
		for (var i = 0; i < 4; i++) {
			if (this.detectMouse(18 + i * 100, 353, 93, 71)) this.hoverMain.appSetups = i;
		}
		
		
		// Pick up where you left off
		var rightWidth = 447 + 218;
		
		this.hoverMain.musicPlay = this.detectMouse(rightWidth - 56, 217, 24, 24);
		this.hoverMain.musicStar = this.detectMouse(rightWidth - 31, 217, 24, 24);
		
		this.hoverMain.editOpen = this.detectMouse(rightWidth - 54, 302, 44, 18);
		this.hoverMain.readOpen = this.detectMouse(rightWidth - 54, 384, 44, 18);
		
		
		for (h in this.hoverMain) {
			inval = inval || preHover[h] != this.hoverMain[h];
		}
		
		return inval;
	},
	
	checkHoverAllApps: function() {
		if (!this.allAppsScreen) return false;
		
		var inval = false;
		
		var searchEnabled = this.search != "";
		var appsLength = searchEnabled ? this.searchedApps.length : this.apps.length;
		for (var i = 0; i < appsLength; i++) {
			var x = 18 + (this.w - 36) / 10 * (i % 10 + 0.5);
			var y = 96 + 76 * Math.floor(i / 10) - this.scrollAllApps;
			
			var appIndex = searchEnabled ? this.searchedApps[i] : i;
			
			let temp = this.apps[appIndex].hover;
			this.apps[appIndex].hover = this.detectMouse(x - 30, y - 26, 60, 64);
			inval = inval || temp != this.apps[appIndex].hover;
		}
		
		return inval;
	},

	clearAllHover: function() {
		this.hoverMain.widgets = -1;
		this.hoverMain.pinnedApps = -1;
		this.hoverMain.appSetups = -1;
		this.hoverMain.musicPlay = false;
		this.hoverMain.musicStar = false;
		this.hoverMain.editOpen = false;
		this.hoverMain.readOpen = false;
		
		for (let key in this.hoverBottomBar) {
			this.hoverBottomBar[key] = false;
		}
		
		for (let app of this.apps) {
			app.hover = false;
		}
	},
	
	mouseClick: function() {
		if (this.hoverBottomBar.settings || this.hoverBottomBar.user || this.hoverBottomBar.cloud) {
			openApp(SettingsApp);
			this.close();
			return;
		}
		
		if (this.hoverBottomBar.allApps) {
			this.allAppsScreen = !this.allAppsScreen;
			this.invalidate();
			return;
		}
		
		if (this.hoverBottomBar.shutdown) {
			drawables = [[], [], []];
			var shutdown = new ShutdownScreen();
			keyboard.focus = shutdown;
			drawables[0].push(shutdown);
			
			validated = false;
			return;
		}
		
		if (this.allAppsScreen) {
			for (let i = 0; i < this.apps.length; i++) {
				let app = this.apps[i];
				if (app.hover && app.app) {
					openApp(app.app);
					this.close();
					
					return;
				}
			}
		}
		else {
			for (let i = 0; i < this.pinnedApps.length; i++) {
				let pApp = this.pinnedApps[i];
				let app = this.apps[pApp.app];
				if (i == this.hoverMain.pinnedApps && app.app) {
					openApp(app.app);
					this.close();
					return;
				}
			}
		}
	},
	
	mouseWheel: function() {
		if (this.allAppsScreen && this.detectMouse(0, 0, this.w, this.h - 64)) {
			let prevScroll = this.scrollAllApps;
			this.scrollAllApps += mouse.wheelDelta;
			this.scrollAllApps = Math.min(Math.max(this.scrollAllApps, 0), this.maxScrollAllApps);
			
			if (prevScroll != this.scrollAllApps) {
				this.checkHoverAllApps();
				this.invalidate();
			}
		}
	},

	mouseExit: function() {
		this.clearAllHover();
		this.invalidate();
	},
	
	keyDown: function() {
		if (this.allAppsScreen) {
			let appsLength = this.search != "" ? this.searchedApps.length : this.apps.length;
			let viewportHeight = this.h - 122;
			let keyboardPointer = this.allAppsKeyboardPointer;
			let key = keyboard.key;

			if (key == "ArrowUp" || key == "ArrowDown" || key == "ArrowLeft" || key == "ArrowRight") {
				if (!keyboardPointer.active) {
					keyboardPointer.active = true;
					keyboardPointer.x = 0;
					keyboardPointer.y = 0;
					return;
				}

				let appIndex = keyboardPointer.y * 10 + keyboardPointer.x;
				
				if (key == "ArrowUp") {
					keyboardPointer.y = Math.max(0, keyboardPointer.y - 1);
					this.scrollAllApps = Math.min(this.scrollAllApps, keyboardPointer.y * 76);
					this.checkHoverAllApps();
				}
				if (key == "ArrowDown" && appIndex + 10 < appsLength) {
					keyboardPointer.y = Math.min(Math.ceil(appsLength / 10) - 1, keyboardPointer.y + 1);
					this.scrollAllApps += Math.max(0, keyboardPointer.y * 76 + 76 - viewportHeight - this.scrollAllApps);
					this.checkHoverAllApps();
				}
				if (key == "ArrowLeft") {
					keyboardPointer.x = Math.max(0, keyboardPointer.x - 1);
				}
				if (key == "ArrowRight" && appIndex + 1 < appsLength) {
					keyboardPointer.x = Math.min(Math.min(9, appsLength), keyboardPointer.x + 1);
				}
			}

			if (key == "Enter" && keyboardPointer.active) {
				let px = keyboardPointer.x;
				let py = keyboardPointer.y;
				let app = this.apps[this.search != "" ? this.searchedApps[py * 10 + px] : py * 10 + px];
				
				if (app.app) {
					openApp(app.app);
					this.close();
					return;
				}
			}
		}
	},
	
	keyType: function() {
		if (keyboard.key == "Enter") return;
		
		if (keyboard.key == "Backspace") {
			if (this.search.length < 1) return;
			
			this.search = this.search.substring(0, this.search.length - 1);
		}
		else {
			this.search += keyboard.key;
		}
		
		this.allAppsScreen = true;
		this.allAppsKeyboardPointer.active = this.search != "";
		this.allAppsKeyboardPointer.x = 0;
		this.allAppsKeyboardPointer.y = 0;
		this.filterSearchApps();
	}
};

function StartMenu() {
	this.x = this.isCentered ? width / 2 - this.w / 2 : 8;
	this.y = height - dock.h - 18 - this.h;
	
	this.icSun = loadIcon("Dock", "Sun");
	this.icPlay = loadIcon("Start", "Play", 24, 24);
	this.icStar = loadIcon("Start", "Star", 24, 24);
	this.icDevPhone = loadIcon("Start", "DevicePhone");
	this.icDevWatch = loadIcon("Start", "DeviceWatch");
	this.icDevCar = loadIcon("Start", "DeviceCar");
	this.icProfile = loadIcon("Start", "DefaultProfilePicture");
	this.icCloud = loadIcon("Start", "Cloud", 22, 22);
	
	this.icBtnSettings = loadIcon("Start", "Settings", 12, 12);
	this.icAllApps = loadIcon("Start", "AllApps", 12, 12);
	this.icPower = loadIcon("Start", "Power", 12, 12);
	
	this.icFiles = loadIcon("Apps", "Files", 30, 30);
	this.icMail = loadIcon("Apps", "Mail", 30, 30);
	this.icLale = loadIcon("Apps", "Lale", 30, 30);
	this.icPhotos = loadIcon("Apps", "Photos", 30, 30);
	this.icCalendar = loadIcon("Apps", "Calendar", 30, 30);
	this.icNotes = loadIcon("Apps", "Notes", 30, 30);
	this.icSettings = loadIcon("Apps", "Settings", 30, 30);
	this.icMusic = loadIcon("Apps", "Music", 30, 30);
	this.icMessages = loadIcon("Apps", "Messages", 30, 30);
	this.icMovies = loadIcon("Apps", "Movies", 30, 30);
	this.icCalculator = loadIcon("Apps", "Calculator", 30, 30);
	this.icPresents = loadIcon("Apps", "Presentations", 30, 30);
	this.icAfterEffects = loadIcon("Apps", "AfterEffects", 30, 30);
	this.icPhotoshop = loadIcon("Apps", "Photoshop", 30, 30);
	this.icIllustrator = loadIcon("Apps", "Illustrator", 30, 30);
	this.icAppDefault = loadIcon("global", "Default", 30, 30);
	this.icPdf = loadIcon("Apps", "PDFReader", 30, 30);
	this.icTerminal = loadIcon("Apps", "Terminal", 30, 30);
	this.icTextEditor = loadIcon("Apps", "TextEditor", 30, 30);
	
	this.animAlpha = 1;
	this.animTranslate = 0;
	this.animOpacity = 0;

	this.allAppsKeyboardPointer = {
		active: false,
		x: 0,
		y: 0
	},
	
	this.hoverMain = {
		widgets: -1,
		pinnedApps: -1,
		appSetups: -1,
		musicPlay: false,
		musicStar: false,
		editOpen: false,
		readOpen: false
	};
	
	this.hoverBottomBar = {
		user: false,
		settings: false,
		allApps: false,
		shutdown: false,
		cloud: false
	};
	
	this.apps = [{
			name: "After Effects",
			icon: this.icAfterEffects,
			app: null
		},{
			name: "Calculator",
			icon: this.icCalculator,
			app: CalculatorApp
		},{
			name: "Calendar",
			icon: this.icCalendar,
			app: null
		},{
			name: "Files",
			icon: this.icFiles,
			app: FilesApp
		},{
			name: "Illustrator",
			icon: this.icIllustrator,
			app: null
		},{
			name: "Lale",
			icon: this.icLale,
			app: LaleApp
		},{
			name: "Mail",
			icon: this.icMail,
			app: null
		},{
			name: "Messages",
			icon: this.icMessages,
			app: MessagesApp
		},{
			name: "Movies",
			icon: this.icMovies,
			app: null
		},{
			name: "Music",
			icon: this.icMusic,
			app: null
		},{
			name: "Notes",
			icon: this.icNotes,
			app: NotesApp
		},{
			name: "Photos",
			icon: this.icPhotos,
			app: PhotosApp
		},{
			name: "Photoshop",
			icon: this.icPhotoshop,
			app: null
		},{
			name: "Presentations",
			icon: this.icPresents,
			app: null
		},{
			name: "Terminal",
			icon: this.icTerminal,
			app: TerminalApp
		},{
			name: "Text Editor",
			icon: this.icTextEditor,
			app: TextEditorApp
		}
	];

	this.searchedApps = [];
	
	this.pinnedApps = [
		{app: 6},
		{app: 11},
		{app: 5},
		{app: 2},
		{app: 10},
		{app: 7},
		{app: 9},
		{app: 8},
		{app: 1},
		{app: 13},
		{app: 3},
		{app: 0},
		{app: 12},
		{app: 4}
	];

	for (let a of this.apps) {
		a.hover = false;
	}

	this.initTransform();
	this.initCanvas();
}

StartMenuProto.__proto__ = Drawable;
setPrototype(StartMenu, StartMenuProto);
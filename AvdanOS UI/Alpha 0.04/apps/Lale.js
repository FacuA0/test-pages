var LaleAppProto = {
	w: 920,
	h: 500,
	title: "Home",
	
	//history: [""],
	
	draw: function(ctx) {
		this.setIconColor(Style.iconColor);
		
		if (!this.pageMode) {
			this.drawMain(ctx);
		}
		else {
			this.drawPage(ctx);
		}
		
		this.validated = true;
	},
	
	drawMain: function(ctx) {
		ctx.fillStyle = Style.windowCoverColor;
		fillRoundedRect(ctx, 0, 0, this.w, this.h, 6);
		
		ctx.drawImage(this.icLogo, this.w / 2 - 40, 44);
		
		setTextStyle(ctx, Style.textColor, "bold 18px sans-serif", "center", "middle");
		ctx.fillText("Lale", this.w / 2, 140);
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, this.w / 2 - 163, 168, 326, 26, 4);
		
		let search = this.url == "" ? "Search or enter a website" : this.url;
		let textColor = this.url == "" ? Style.softTextColor : Style.textColor;
		
		setTextStyle(ctx, textColor, "11px sans-serif", "center", "middle");
		ctx.fillText(search, this.w / 2, 182);

		if (this.cursorBlink) {
			let cursorX = this.w / 2 - ctx.measureText(search).width / 2;
			cursorX += ctx.measureText(this.url.slice(0, this.urlCursor)).width;
			
			ctx.fillStyle = Style.textColor;
			ctx.fillRect(Math.floor(cursorX), 172, 1, 18);
		}
		
		this.drawIcon(ctx, this.icSearch, this.w / 2 - 154, 175);

		if (this.fieldLineAnim > 0) {
			ctx.strokeStyle = Style.accentColor;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(this.w / 2 - this.fieldLineAnim, 195);
			ctx.lineTo(this.w / 2 + this.fieldLineAnim, 195);
			ctx.stroke();
		}

		let blockW = 576;
		let blockX = this.w / 2 - blockW / 2;

		// Favorite bar
		setTextStyle(ctx, Style.textColor, "13px sans-serif", "left", "top");
		ctx.fillText("Favorites", blockX, 224);

		setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "top");

		for (let i = 0; i < this.favorites.length; i++) {
			if (this.hover.favorites == i) {
				ctx.fillStyle = Style.buttonColor;
				fillRoundedRect(ctx, blockX - 10 + i * 88, 244, 72, 84, 6);
			}

			ctx.drawImage(this.favorites[i].icon, blockX + 2 + i * 88, 252);

			ctx.fillStyle = Style.textColor;
			ctx.fillText(this.favorites[i].name, blockX + 26 + i * 88, 312);
		}
		
		ctx.fillStyle = this.hover.sidebar ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w - 32, 6, 26, 20, 4);
		
		ctx.fillStyle = this.hover.addTab ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w - 64, 6, 26, 20, 4);
		
		ctx.fillStyle = this.hover.tabs ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w - 96, 6, 26, 20, 4);
		
		ctx.fillStyle = this.hover.options ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w - 128, 6, 26, 20, 4);
		
		this.drawIcon(ctx, this.icSidebar, this.w - 25, 10);
		this.drawIcon(ctx, this.icTabs, this.w - 57, 10);
		this.drawIcon(ctx, this.icAddTab, this.w - 89, 10);
		this.drawIcon(ctx, this.icOptions, this.w - 121, 10);
	},
	
	drawPage: function(ctx) {
		var miniBar = this.w < 480;
		var searchBarWidth = 128;
		var searchBarX = this.w - (!miniBar ? 134 : 32);
		var searchIconX = this.w - (!miniBar ? 24 : 25);
		var optionsX = this.w - (!miniBar ? 160 : 64);
		var tagX = this.w - (!miniBar ? 192 : 96);
		var barWidth = this.w - 249;
		
		ctx.fillStyle = (this.hoverPage.back ? Style.buttonHoverColor : Style.buttonColor);
		fillRoundedRect(ctx, 6, 6, 34, 20, 4); // Back button
		ctx.fillStyle = (this.hoverPage.forward ? Style.buttonHoverColor : Style.buttonColor);
		fillRoundedRect(ctx, 43, 6, 34, 20, 4); // Forward button
		
		ctx.fillStyle = (this.hoverPage.home ? Style.buttonHoverColor : Style.buttonColor);
		fillRoundedRect(ctx, 83, 6, 26, 20, 4); // Home button
		ctx.fillStyle = (this.hoverPage.refresh ? Style.buttonHoverColor : Style.buttonColor);
		fillRoundedRect(ctx, 115, 6, 26, 20, 4); // Refresh button
		
		ctx.fillStyle = (this.hoverPage.options ? Style.buttonHoverColor : Style.buttonColor);
		fillRoundedRect(ctx, this.w - 96, 6, 26, 20, 4); // More Options button
		ctx.fillStyle = (this.hoverPage.tabs ? Style.buttonHoverColor : Style.buttonColor);
		fillRoundedRect(ctx, this.w - 64, 6, 26, 20, 4); // Tabs button
		ctx.fillStyle = (this.hoverPage.sidebar ? Style.buttonHoverColor : Style.buttonColor);
		fillRoundedRect(ctx, this.w - 32, 6, 26, 20, 4); // Sidebar button
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, 147, 6, barWidth, 20, 4); // Path bar
		
		this.drawIcon(ctx, this.icBack, 17, 10);
		this.drawIcon(ctx, this.icForward, 54, 10);
		this.drawIcon(ctx, this.icHome, 90, 10);
		this.drawIcon(ctx, this.icRefresh, 122, 10);
		this.drawIcon(ctx, this.icOptions, this.w - 89, 10);
		this.drawIcon(ctx, this.icTabs, this.w - 57, 10);
		this.drawIcon(ctx, this.icSidebar, this.w - 25, 10);
		
		this.url = this.pageIFrame.src;
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "center", "middle");
		ctx.fillText(this.url, 147 + barWidth / 2, 17);
		
		this.pageIFrame.style.borderRadius = !this.frame.maximized ? "0px 0px 6px 6px" : "0px";
		this.pageIFrame.style.left = (margin.left + this.x) + "px";
		this.pageIFrame.style.top = (margin.top + this.y + 32) + "px";
		this.pageIFrame.width = this.w;
		this.pageIFrame.height = this.h - 32;
	},
	
	checkHoverMain: function() {
		let inval = false;
		let oldHover = Object.assign({}, this.hover);
		
		this.hover.sidebar = this.detectMouse(this.w - 32, 6, 26, 20);
		this.hover.addTab = this.detectMouse(this.w - 64, 6, 26, 20);
		this.hover.tabs = this.detectMouse(this.w - 96, 6, 26, 20);
		this.hover.options = this.detectMouse(this.w - 128, 6, 26, 20);
		this.hover.favorites = -1;

		for (let i = 0; i < this.favorites.length; i++) {
			let x = this.w / 2 - 576 / 2 + i * 88;
			if (this.detectMouseRounded(x - 10, 244, 72, 84, 6)) {
				this.hover.favorites = i;
			}
		}
		
		for (h in this.hover) {
			inval = inval || this.hover[h] != oldHover[h];
		}
		
		return inval;
	},
	
	checkHoverPage: function() {
		let inval = false;
		let oldHover = Object.assign({}, this.hoverPage);
		
		this.hoverPage.back = this.detectMouse(6, 6, 34, 20);
		this.hoverPage.forward = this.detectMouse(43, 6, 34, 20);
		this.hoverPage.home = this.detectMouse(83, 6, 26, 20);
		this.hoverPage.refresh = this.detectMouse(115, 6, 26, 20);
		this.hoverPage.bar = this.detectMouse(147, 6, this.w - 249, 20);
		this.hoverPage.options = this.detectMouse(this.w - 96, 6, 26, 20);
		this.hoverPage.tabs = this.detectMouse(this.w - 64, 6, 26, 20);
		this.hoverPage.sidebar = this.detectMouse(this.w - 32, 6, 26, 20);
		
		for (h in this.hoverPage) {
			inval = inval || this.hoverPage[h] != oldHover[h];
		}
		
		return inval;
	},
	
	mouseMove: function() {
		let inval = false;
		
		inval = inval || this.checkHoverMain();
		inval = inval || this.checkHoverPage();
		
		if (inval) this.invalidate();
	},
	
	mouseClick: function() {
		if (this.pageMode) {
			if (this.hoverPage.back) {
				//this.pageIFrame.contentWindow.history.back();
			}
			else if (this.hoverPage.forward) {
				//this.pageIFrame.contentWindow.history.forward();
			}
			else if (this.hoverPage.home) {
				this.pageIFrame.style.display = "none";

				this.pageMode = false;
				this.cursorBlinkHandle = setInterval(() => this.blinkFunction(), 500);
				this.cursorBlink = 1;
				this.url = "";
				this.urlCursor = 0;
			}
			else if (this.hoverPage.refresh) {
				this.pageIFrame.src = this.pageIFrame.src;
			}
			else if (this.hoverPage.options) {
				
			}
			else if (this.hoverPage.tabs) {
				
			}
			else if (this.hoverPage.sidebar) {
				
			}
		}
		else {
			if (this.hover.favorites != -1) {
				this.url = this.favorites[this.hover.favorites].url;
				this.navigate();
			}
		}
	},
	
	close: function() {
		document.body.removeChild(this.pageIFrame);
		this.pageIFrame = null;
		
		clearInterval(this.cursorBlinkHandle);
	},
	
	minimize: function() {
		this.pageIFrame.style.display = "none";
	},
	
	restore: function() {
		this.pageIFrame.style.display = this.pageMode ? "block" : "none";
	},
	
	windowMove: function() {
		this.pageIFrame.style.left = (margin.left + this.x) + "px";
		this.pageIFrame.style.top = (margin.top + this.y + 32) + "px";
	},

	windowStartResize: function() {
		this.pageIFrame.inert = true;
	},

	windowEndResize: function() {
		this.pageIFrame.inert = false;
	},

	keyDown: function() {
		this.cursorBlink = 1;
		if (keyboard.key == "Enter") {
			if (this.url == "") return;

			let startsWithScheme = this.url.startsWith("http://") || this.url.startsWith("https://");
			if (!startsWithScheme && (this.url.includes(" ") || !this.url.includes("."))) {
				this.url = "https://bing.com/search?q=" + this.url;
			}
			else if (!startsWithScheme && this.url.includes(".")) {
				this.url = "http://" + this.url;
			}

			this.navigate();
		}
		else if (keyboard.key == "ArrowLeft") {
			this.urlCursor = Math.max(0, this.urlCursor - 1);
		}
		else if (keyboard.key == "ArrowRight") {
			this.urlCursor = Math.min(this.url.length, this.urlCursor + 1);
		}
		else if (keyboard.key == "Home") {
			this.urlCursor = 0;
		}
		else if (keyboard.key == "End") {
			this.urlCursor = this.url.length;
		}
	},
	
	keyType: function() {
		if (keyboard.key == "Backspace") {
			let first = this.url.slice(0, Math.max(0, this.urlCursor - 1));
			let second = this.url.slice(this.urlCursor);

			this.url = first + second;
			this.urlCursor = Math.max(0, this.urlCursor - 1);
		}
		else if (keyboard.key == "Delete") {
			let first = this.url.slice(0, this.urlCursor);
			let second = this.url.slice(this.urlCursor + 1);

			this.url = first + second;
		}
		else {
			let first = this.url.slice(0, this.urlCursor);
			let second = this.url.slice(this.urlCursor);

			this.url = first + keyboard.key + second;
			this.urlCursor += keyboard.key.length;
		}
		
		this.invalidate();
	},

	navigate: function() {
		this.pageIFrame.src = this.url;
		this.pageIFrame.style.display = "block";

		clearInterval(this.cursorBlinkHandle);
		this.cursorBlink = 0;
		this.pageMode = true;
		this.invalidate();
	},

	blinkFunction: function() {
		this.cursorBlink = 1 - this.cursorBlink;
		this.invalidate();
	}
};

function LaleApp() {
	this.icLogo = loadIcon("Apps", "Lale", 80, 80);
	this.icSearch = loadIcon("global", "Search", 12, 12);
	this.icOptions = loadIcon("global", "MoreOptions", 12, 12);
	this.icAddTab = loadIcon("Photos", "More", 12, 12);
	this.icTabs = loadIcon("Files", "ShowGrid", 12, 12);
	this.icSidebar = loadIcon("Lale", "Sidebar", 12, 12);
	
	this.icBack = loadIcon("global", "Back", 12, 12);
	this.icForward = loadIcon("global", "Forward", 12, 12);
	this.icHome = loadIcon("global", "Home", 12, 12);
	this.icRefresh = loadIcon("Lale", "Refresh", 12, 12);
	
	this.icTwitter = loadIcon("Lale", "Twitter", 48, 48);
	this.icYouTube = loadIcon("Lale", "YouTube", 48, 48);
	this.icNetflix = loadIcon("Lale", "Netflix", 48, 48);
	this.icAvdan = loadIcon("Lale", "Avdan", 48, 48);
	this.icGoogle = loadIcon("Lale", "Google", 48, 48);
	this.icGetir = loadIcon("Lale", "Getir", 48, 48);
	this.icHepsiburada = loadIcon("Lale", "Hepsiburada", 48, 48);
	
	this.hover = {
		options: false,
		addTab: false,
		tabs: false,
		sidebar: false,
		favorites: -1,
	};
	
	this.hoverPage = {
		back: false,
		forward: false,
		home: false,
		refresh: false,
		bar: false,
		options: false,
		tabs: false,
		sidebar: false
	};
	
	this.pageMode = false;
	this.url = "";
	this.urlCursor = 0;
	this.cursorBlink = 1;
	this.cursorBlinkHandle = 0;
	this.fieldLineAnim = 0;
	
	this.cursorBlinkHandle = setInterval(() => this.blinkFunction(), 500);
	this.fieldLineAnim = 0; // Global objects bug (just in case)

	Animator.addAnimation({
		target: this,
		property: "fieldLineAnim",
		drawable: this,
		interpolation: Animator.createBezier(0.1, 1),
		b: 156,
		duration: 0.5,
		start: 0.5
	});

	this.favorites = [
		{
			name: "Twitter",
			icon: this.icTwitter,
			url: "https://twitter.com/"
		}, {
			name: "YouTube",
			icon: this.icYouTube,
			url: "https://youtube.com/"
		}, {
			name: "Netflix",
			icon: this.icNetflix,
			url: "https://netflix.com/"
		}, {
			name: "Avdan",
			icon: this.icAvdan,
			url: "https://youtube.com/@Avdan"
		}, {
			name: "Google",
			icon: this.icGoogle,
			url: "https://google.com/webhp?igu=1"
		}, {
			name: "Getir",
			icon: this.icGetir,
			url: "https://getir.com/"
		}, {
			name: "Hepsiburada",
			icon: this.icHepsiburada,
			url: "https://hepsiburada.com/"
		}
	];
	
	this.pageIFrame = document.createElement("iframe");
	this.pageIFrame.width = 0;
	this.pageIFrame.height = 0;
	
	this.pageIFrame.style.position = "fixed";
	this.pageIFrame.style.border = "0px";
	
	document.body.append(this.pageIFrame);
}

LaleAppProto.__proto__ = App;
setPrototype(LaleApp, LaleAppProto);
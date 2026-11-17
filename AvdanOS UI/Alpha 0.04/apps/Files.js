var FilesAppProto = {
	w: 712,
	h: 470,
	minW: 386,
	title: "Files",
	
	draw: function(ctx) {
		if (this.path === "") {
			this.drawMain(ctx);
		}
		else {
			this.drawPathScreen(ctx);
		}
		this.validated = true;
	},
	
	drawMain: function(ctx) {
		// Title
		setTextStyle(ctx, Style.textColor, "18px sans-serif", "center", "top");
		ctx.fillText("Files", this.w / 2, 8);
		
		// Search bar
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, this.w / 2 - 103, 38, 206, 20, 4);
		
		let s = this.textSearch !== "";
		setTextStyle(ctx, s ? Style.textColor : Style.softTextColor, "11px sans-serif", "left", "hanging");
		ctx.fillText(s ? this.textSearch : "Find a file", this.w / 2 - 94, 44);
		
		this.setIconColor(Style.iconColor);
		this.drawIcon(ctx, this.icSearch, this.w / 2 + 84, 42);
		
		var favWidth = Math.floor(this.w * (this.mainLeftPanel ? 0.447 : 0.78));
		var favLeft = Math.floor(this.w * 0.11);
		var rMargin = Math.floor(this.w * 0.66);
		
		// Favorites
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "hanging");
		ctx.fillText("Favorites", favLeft - 28, 87);
		
		for (var i = 0; i < this.mainFavorites.length; i++) {
			var x = parseInt(favLeft + i * (favWidth / 4));
			
			if (this.mainFavoritesHover[i]) {
				ctx.fillStyle = Style.buttonColor;
				fillRoundedRect(ctx, x - 38, 109, 76, 76, 6);
			}
			
			ctx.drawImage(this.mainFavorites[i], x - 16, 116);
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "hanging");
			ctx.fillText(this.mainFavoritesL[i], x, 157);
		}
		
		// Pinned
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "hanging");
		ctx.fillText("Pinned", favLeft - 28, 202);
		
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "hanging");
		
		for (var i = 0; i < this.mainPinnedL.length; i++) {
			var x = parseInt(favLeft + i * (favWidth / 4));
			
			if (this.mainPinnedHover[i]) {
				ctx.fillStyle = Style.buttonColor;
				fillRoundedRect(ctx, x - 38, 224, 76, 76, 6);
			}

			var tagInd = this.tags.indexOf(this.mainPinnedTags[i]);
			
			ctx.drawImage(this.folderTags[tagInd], x - 16, 232, 32, 32);
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "hanging");
			ctx.fillText(this.mainPinnedL[i], x, 272);
		}
		
		// Tags
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "hanging");
		ctx.fillText("Tags", favLeft - 28, 309);
		
		setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "hanging");
		
		for (var i = 0; i < this.tags.length; i++) {
			var x = parseInt(favLeft + i * (favWidth / 5));
			
			if (this.mainTagsHover[i]) {
				ctx.fillStyle = Style.buttonColor;
				fillRoundedRect(ctx, x - 30, 331, 60, 64, 6);
			}
			
			ctx.fillStyle = this.colorTags[i];
			ctx.beginPath();
			ctx.arc(x, 353, 10, 0, 2 * Math.PI);
			ctx.fill();
			
			ctx.strokeStyle = "#FFF";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(x, 353, 10, 0, 2 * Math.PI);
			ctx.stroke();
			
			
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "hanging");
			ctx.fillText(this.tags[i], x, 373);
		}
		
		/*
		for (var i = 0; i <= 360; i++) {
			ctx.fillStyle = "#F00";
			
			ctx.filter = "hue-rotate(" + i + "deg) contrast(200%) brightness(280%)";
			ctx.fillRect(9 + i * 2, 460, 2, 30);
			ctx.filter = "none";
			
			if (i % 2 == 0) {
				ctx.fillRect(9 + i * 2, 458, 2, 1);
			}
		}
		*/
		
		// Recently opened
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "hanging");
		ctx.fillText("Recently Opened", rMargin, 87);
		
		this.recentsArrowX = rMargin + ctx.measureText("Recently Opened").width + 6;
		this.drawIcon(ctx, this.icForward, this.recentsArrowX, 85);
		
		if (this.hoverRecents) {
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, this.recentsArrowX - 4, 81, 20, 20, 2);
		}

		for (var i = 0; i < this.recents.length; i++) {
			let recent = this.recents[i];
			
			let btnX = rMargin;
			let btnY = 113 + i * 42;
			let btnW = Math.floor(this.w * 0.31);
			let btnH = 36;
			
			ctx.fillStyle = recent.hover ? Style.buttonHoverColor : Style.buttonColor;
			fillRoundedRect(ctx, btnX, btnY, btnW, btnH, 5);
			
			ctx.drawImage(recent.icon, btnX + 5, btnY + 5, btnH - 10, btnH - 10);
			
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
			ctx.fillText(recent.name, btnX + 42, btnY + btnH / 2 + 1);
			
			setTextStyle(ctx, Style.softTextColor, "9px sans-serif", "right", "middle");
			ctx.fillText(recent.lastModified, btnX + btnW - 7, btnY + btnH / 2 + 2);
		};
		
		// Recommended
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "hanging");
		ctx.fillText("Recommended", rMargin, 253);
		
		this.recommendedArrowX = rMargin + ctx.measureText("Recommended").width + 6;
		this.drawIcon(ctx, this.icForward, this.recommendedArrowX, 251);

		if (this.hoverRecommended) {
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, this.recommendedArrowX - 4, 247, 20, 20, 2);
		}
		
		for (var i = 0; i < this.recommended.length; i++) {
			var rec = this.recommended[i];
			
			let btnX = rMargin;
			let btnY = 279 + i * 42;
			let btnW = Math.floor(this.w * 0.31);
			let btnH = 36;
			
			ctx.fillStyle = rec.hover ? Style.buttonHoverColor : Style.buttonColor;
			fillRoundedRect(ctx, btnX, btnY, btnW, btnH, 5);
			
			ctx.drawImage(rec.icon, btnX + 5, btnY + 5, btnH - 10, btnH - 10);
			
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
			ctx.fillText(rec.name, btnX + btnH, btnY + btnH / 2 + 1);
		};
	},
	
	drawPathScreen: function(ctx) {
		var miniBar = this.w < 480;
		var searchBarWidth = !miniBar ? 122 : 26;
		var searchBarX = this.w - (!miniBar ? 128 : 32);
		var searchIconX = this.w - (!miniBar ? 24 : 25);
		var optionsX = this.w - (!miniBar ? 160 : 64);
		var tagX = this.w - (!miniBar ? 192 : 96);
		var barX = !miniBar ? 203 : 203;
		var barWidth = this.w - (!miniBar ? 401 : 305);
		
		ctx.fillStyle = this.canGoBack ? (this.filesHover.back ? Style.buttonHoverColor : Style.buttonColor) : Style.buttonFaintColor;
		fillRoundedRect(ctx, 6, 6, 34, 20, 4); // Back button
		ctx.fillStyle = this.canGoForward ? (this.filesHover.forward ? Style.buttonHoverColor : Style.buttonColor) : Style.buttonFaintColor;
		fillRoundedRect(ctx, 43, 6, 34, 20, 4); // Forward button
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, 83, 6, 82, 20, 4); // View as
		
		ctx.fillStyle = this.filesHover.share ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 171, 6, 26, 20, 4); // Share button
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, barX, 6, barWidth, 20, 4); // Path bar
		
		ctx.fillStyle = this.filesHover.tags ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, tagX, 6, 26, 20, 4); // Tag button
		
		ctx.fillStyle = this.filesHover.options ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, optionsX, 6, 26, 20, 4); // Options button
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, searchBarX, 6, searchBarWidth, 20, 4); // Search bar
		
		if (this.filesHover.show >= 0) {
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, 83 + 27 * this.filesHover.show, 6, 28, 20, 4);
		}
		
		ctx.fillStyle = Style.buttonHoverColor;
		fillRoundedRect(ctx, 83 + 27 * this.filesView, 6, 28, 20, 4);
		
		this.setIconColor(Style.iconColor);
		this.drawIcon(ctx, this.icBack, 17, 10);
		this.drawIcon(ctx, this.icForward, 54, 10);
		this.drawIcon(ctx, this.icShowGrid, 90, 9);
		this.drawIcon(ctx, this.icShowColumn, 117, 9);
		this.drawIcon(ctx, this.icShowList, 144, 9);
		this.drawIcon(ctx, this.icShare, 178, 10);
		this.drawIcon(ctx, this.icTag, tagX + 7, 10);
		this.drawIcon(ctx, this.icOptions, optionsX + 7, 10);
		this.drawIcon(ctx, this.icSearch, searchIconX, 10);
		
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "center", "middle");
		ctx.fillText(this.currentFolder.name, barX + barWidth / 2, 17);
		
		if (!miniBar) {
			let s = this.textSearch !== "";
			setTextStyle(ctx, s ? Style.textColor : Style.softTextColor, "10px sans-serif", "left", "middle");
			ctx.fillText(s ? this.textSearch : "Find a file", searchBarX + 6, 17);
		}
		
		// Ordering spinner
		ctx.fillStyle = this.filesHover.categorize ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w - 116, 38, 110, 20, 4);
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "left", "middle");
		ctx.fillText("Kind", this.w - 110, 49);
		this.drawIcon(ctx, this.icExpand, this.w - 23, 43, 10, 10);
		
		// Sidebar
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect2(ctx, 0, 80, 32, 264, 0, 6, 6, 0);
		
		ctx.fillStyle = Style.buttonHoverColor;
		
		let highlightOption = 80;
		
		switch (this.path) {
			case this.favorites.documents.path: highlightOption = 124; break;
			case this.favorites.downloads.path: highlightOption = 168; break;
			case this.favorites.apps.path: highlightOption = 212; break;
			case this.favorites.desktop.path: highlightOption = 256; break;
			case this.favorites.recents.path: highlightOption = 300; break;
			default: highlightOption = -1;
		}
		
		if (highlightOption > 0) {
			fillRoundedRect2(ctx, 0, highlightOption, 32, 44, 0, 0, 0, 0);
		}
		
		ctx.fillStyle = Style.buttonColor;
		if (this.hoverSidebar.home)
			fillRoundedRect2(ctx, 0, 80, 32, 44, 0, 0, 0, 0);
		if (this.hoverSidebar.documents)
			fillRoundedRect2(ctx, 0, 124, 32, 44, 0, 0, 0, 0);
		if (this.hoverSidebar.downloads)
			fillRoundedRect2(ctx, 0, 168, 32, 44, 0, 0, 0, 0);
		if (this.hoverSidebar.apps)
			fillRoundedRect2(ctx, 0, 212, 32, 44, 0, 0, 0, 0);
		if (this.hoverSidebar.desktop)
			fillRoundedRect2(ctx, 0, 256, 32, 44, 0, 0, 0, 0);
		if (this.hoverSidebar.recents)
			fillRoundedRect2(ctx, 0, 300, 32, 44, 0, 0, 0, 0);
		
		ctx.drawImage(this.icHome, 4, 90, 24, 24);
		ctx.drawImage(this.icDocuments, 4, 134, 24, 24);
		ctx.drawImage(this.icDownloads, 4, 178, 24, 24);
		ctx.drawImage(this.icApps, 4, 222, 24, 24);
		ctx.drawImage(this.icDesktop, 4, 266, 24, 24);
		ctx.drawImage(this.icRecents, 4, 310, 24, 24);
		
		// Files

		if (this.pathFiles.length == 0) {
			setTextStyle(ctx, Style.softTextColor, "14px sans-serif", "center", "middle");
			ctx.fillText("There is no files here...", this.w / 2, this.h / 2);
			return;
		}
		
		ctx.save();
		ctx.beginPath();
		ctx.rect(46, 68, this.w - 54, this.h - 68);
		ctx.clip();
		
		let contentHeight = 0;
		
		// Grid view
		if (this.filesView == 0) {
			for (var i = 0, f; i < this.pathFiles.length; i++) {
				f = this.pathFiles[i];
				
				var cols = Math.floor((this.w - 54) / 100);
				var x = parseInt(46 + (this.w - 54) / cols * (i % cols + 0.5));
				var y = parseInt(84 + Math.floor(i / cols) * 126) - this.scrollFiles;
				var icon = f.type == "Folder" ? this.icFolder : this.icFile;
				
				if (f.type == "Folder" && f.tag) {
					let tagInd = this.tags.indexOf(f.tag);
					
					if (tagInd != -1) {
						icon = this.folderTags[tagInd];
					}
				}
				
				if (this.hoverFiles[i]) {
					ctx.fillStyle = Style.buttonColor;
					fillRoundedRect(ctx, x - 48, y - 16, 96, 96, 6);
				}
				
				ctx.drawImage(icon, x - 29, y - 9);
				setTextStyle(ctx, Style.textColor, "11px sans-serif", "center", "top");
				ctx.fillText(f.name, x, y + 56);
			}
			
			contentHeight = Math.ceil(this.pathFiles.length / cols) * 126;
		}
		
		// Details view
		else if (this.filesView == 1) {

			// Details upper pane
			ctx.fillStyle = "#FFF4";
			fillRoundedRect(ctx, 46, 68, this.w - 62, 28, 6);
			
			setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
			ctx.fillText("Name", 84, 82);

			ctx.beginPath();
			ctx.rect(46, 96, this.w - 54, this.h - 96);
			ctx.clip();
			
			// Files
			for (var i = 0, f; i < this.pathFiles.length; i++) {
				f = this.pathFiles[i];
				
				var x = 52;
				var y = 112 + i * 32 - this.scrollFiles;
				var icon = f.type == "Folder" ? this.icFolder : this.icFile;
				
				if (f.type == "Folder" && f.tag) {
					let tagInd = this.tags.indexOf(f.tag);
					
					if (tagInd != -1) {
						icon = this.folderTags[tagInd];
					}
				}
				
				if (this.hoverFiles[i]) {
					ctx.fillStyle = Style.buttonColor;
					fillRoundedRect(ctx, x - 6, y - 16, this.w - 62, 32, 6);
				}
				
				ctx.drawImage(icon, x, y - 10, 20, 20);
				setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
				ctx.fillText(f.name, x + 32, y + 1);
			}

			contentHeight = this.pathFiles.length * 32 + 28;
		}
		
		// List view
		else if (this.filesView == 2) {
			for (var i = 0, f; i < this.pathFiles.length; i++) {
				f = this.pathFiles[i];
				
				var x = 52;
				var y = 84 + i * 32 - this.scrollFiles;
				var icon = f.type == "Folder" ? this.icFolder : this.icFile;
				
				if (f.type == "Folder" && f.tag) {
					let tagInd = this.tags.indexOf(f.tag);
					
					if (tagInd != -1) {
						icon = this.folderTags[tagInd];
					}
				}
				
				if (this.hoverFiles[i]) {
					ctx.fillStyle = Style.buttonColor;
					fillRoundedRect(ctx, x - 6, y - 16, this.w - 62, 32, 6);
				}
				
				ctx.drawImage(icon, x, y - 10, 20, 20);
				setTextStyle(ctx, Style.textColor, "11px sans-serif", "left", "middle");
				ctx.fillText(f.name, x + 32, y + 1);
			}

			contentHeight = this.pathFiles.length * 32;
		}


		ctx.restore();

		// Scrollbar
		let viewportHeight = this.h - 74;
		let barHeight = viewportHeight;
		
		this.maxScrollFiles = Math.max(0, contentHeight - viewportHeight);
		this.scrollFiles = Math.max(Math.min(this.scrollFiles, this.maxScrollFiles), 0);
		
		let sliderHeight = barHeight * (viewportHeight / contentHeight);
		let sliderY = 68 + (barHeight - sliderHeight) * (this.scrollFiles / this.maxScrollFiles);

		this.scrollbarFiles.troughH = barHeight;
		this.scrollbarFiles.sliderY = sliderY;
		this.scrollbarFiles.sliderH = sliderHeight;
		
		if (sliderHeight < barHeight) {
			// Scrollbar
			ctx.fillStyle = Style.windowCoverColor;
			fillRoundedRect(ctx, this.w - 10, 68, 4, barHeight, 2);
		
			// Scrollbar slider
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, this.w - 10, sliderY, 4, sliderHeight, 2);
		}
	},
	
	goToPath: function(newPath) {
		var files;
		if (newPath == "Recents") {
			if (!this.currentFolder || this.currentFolder.name != "Recents")
				this.goToRecents(true);
			files = this.currentFolder;
		}
		else if (newPath == "Recommended") {
			if (!this.currentFolder || this.currentFolder.name != "Recommended")
				this.goToRecommended(true);
			files = this.currentFolder;
		}
		else {
			files = fileSystem.get(newPath);

			if (files == null) return;
			if (files.type == "File") {
				this.openFile(files);
				return;
			}
		}
		
		
		this.textSearch = "";
		
		if (!newPath.endsWith("/")) newPath += "/";
		this.path = newPath;
		this.currentFolder = files;
		
		if (this.canGoForward) {
			this.pathHistory = this.pathHistory.slice(0, this.pathHistoryIndex + 1);
		}
		
		this.pathHistory.push(newPath);
		this.pathHistoryIndex++;
		
		this.refreshFiles();
	},
	
	refreshFiles: function() {
		var files = fileSystem.get(this.path);
		
		if (files == null) {
			if (this.currentFolder == null) return;
			files = this.currentFolder;
		}
		if (files.type == "File") return;
		
		this.currentFolder = files;
		this.pathFiles = files.contents;
		
		this.canGoBack = this.pathHistoryIndex > 0;
		this.canGoForward = this.pathHistoryIndex < this.pathHistory.length - 1;
		
		this.hoverFiles = new Array(this.pathFiles.length);
		this.mouseMove(null);
	},

	openFile: function(file) {
		if (file.type != "File") return;

		if (file.address) {
			if (file.name.endsWith(".jpg") || file.name.endsWith(".png")) {
				let img = document.createElement("img");
				img.crossOrigin = "anonymous";
				img.src = file.address;
				
				openApp(PhotosApp, img, file.name);
				//drawables[1].push(new Frame(new PhotosApp(img, files.name)));
			}
		}
	},
	
	goBack: function() {
		this.pathHistoryIndex--;
		this.path = this.pathHistory[this.pathHistoryIndex];
		this.refreshFiles();
	},
	
	goForward: function() {
		this.pathHistoryIndex++;
		this.path = this.pathHistory[this.pathHistoryIndex];
		this.refreshFiles();
	},
	
	goHome: function() {
		this.path = "";
		this.pathHistory = [this.path];
		this.pathHistoryIndex = 0;
		this.currentFolder = null;
		this.refreshFiles();
	},

	goToRecents: function(fill) {
		this.currentFolder = {
			name: "Recents",
			type: "Folder",
			contents: this.recents
		};
		if (!fill) this.goToPath("Recents");
	},

	goToRecommended: function(fill) {
		this.currentFolder = {
			name: "Recommended",
			type: "Folder",
			contents: this.recommended
		};
		if (!fill) this.goToPath("Recommended");
	},
	
	detectClickMain: function() {
		var favWidth = Math.floor(this.w * (this.mainLeftPanel ? 0.447 : 0.78));
		var favLeft = Math.floor(this.w * 0.11);
		var rMargin = Math.floor(this.w * 0.66);
		var newVal = false;
		
		this.mainFavoritesHover.forEach((hover, i, list) => {
			var x = parseInt(favLeft + i * (favWidth / 4));
			
			let preH = list[i];
			list[i] = this.detectMouse(x - 38, 109, 76, 76);
			newVal = newVal || preH != list[i];
		});
		
		this.mainPinnedHover.forEach((hover, i, list) => {
			var x = parseInt(favLeft + i * (favWidth / 4));
			
			let preH = list[i];
			list[i] = this.detectMouse(x - 38, 224, 76, 76);
			newVal = newVal || preH != list[i];
		});
		
		this.mainTagsHover.forEach((hover, i, list) => {
			var x = parseInt(favLeft + i * (favWidth / 5));
			
			let preH = list[i];
			list[i] = this.detectMouse(x - 30, 331, 60, 64);
			newVal = newVal || preH != list[i];
		});
		
		this.recents.forEach((recent, i, list) => {
			let btnY = 113 + i * 42;
			
			let preH = list[i].hover;
			list[i].hover = this.detectMouse(rMargin, btnY, Math.floor(this.w * 0.31), 36);
			newVal = newVal || preH != list[i].hover;
		});
		
		this.recommended.forEach((recent, i, list) => {
			let btnY = 279 + i * 42;
			
			let preH = list[i].hover;
			list[i].hover = this.detectMouse(rMargin, btnY, Math.floor(this.w * 0.31), 36);
			newVal = newVal || preH != list[i].hover;
		});

		let preHoverRecents = this.hoverRecents, preHoverRecommended = this.hoverRecommended;
		this.hoverRecents = this.detectMouse(this.recentsArrowX - 4, 81, 20, 20);;
		this.hoverRecommended = this.detectMouse(this.recommendedArrowX - 4, 247, 20, 20);;
		newVal = newVal || preHoverRecents != this.hoverRecents || preHoverRecommended != this.hoverRecommended;
		
		//this.drawIcon(ctx, this.icForward, rMargin + ctx.measureText("Recently Opened").width + 6, 85);
		//this.drawIcon(ctx, this.icForward, rMargin + ctx.measureText("Recommended").width + 6, 251);

		if (newVal) this.invalidate();
	},
	
	detectClickFile: function() {
		var newVal = false;

		let filesY = this.filesView != 1 ? 68 : 112;
		if (!this.detectMouse(46, filesY, this.w - 54, this.h - filesY)) {
			for (var i = 0, f; i < this.pathFiles.length; i++) {
				let preH = this.hoverFiles[i];
				this.hoverFiles[i] = false;
				newVal = newVal || preH != this.hoverFiles[i];
			}

			if (newVal) this.invalidate();

			return;
		}

		if (this.filesView == 0) { // Grid view
			for (var i = 0, f; i < this.pathFiles.length; i++) {
				f = this.pathFiles[i];
				
				var cols = Math.floor((this.w - 54) / 100);
				var x = parseInt(46 + (this.w - 54) / cols * (i % cols + 0.5));
				var y = parseInt(84 + Math.floor(i / cols) * 126) - this.scrollFiles;
				
				let preH = this.hoverFiles[i];
				this.hoverFiles[i] = this.detectMouse(x - 48, y - 16, 96, 96);
				newVal = newVal || preH != this.hoverFiles[i];
			}
		}
		else if (this.filesView == 1) { // Details view
			for (var i = 0, f; i < this.pathFiles.length; i++) {
				f = this.pathFiles[i];
				
				var x = 52;
				var y = 112 + i * 32 - this.scrollFiles;
				
				let preH = this.hoverFiles[i];
				this.hoverFiles[i] = this.detectMouse(x - 6, y - 16, this.w - 62, 32);
				newVal = newVal || preH != this.hoverFiles[i];
			}
		}
		else if (this.filesView == 2) { // List view
			for (var i = 0, f; i < this.pathFiles.length; i++) {
				f = this.pathFiles[i];
				
				var x = 52;
				var y = 84 + i * 32 - this.scrollFiles;
				
				let preH = this.hoverFiles[i];
				this.hoverFiles[i] = this.detectMouse(x - 6, y - 16, this.w - 62, 32);
				newVal = newVal || preH != this.hoverFiles[i];
			}
		}
		if (newVal) this.invalidate();
	},
	
	detectSidebar: function() {
		var hover = this.hoverSidebar;
		var preHover = Object.assign({}, hover);
		
		hover.home = this.detectMouse(0, 80, 32, 44);
		hover.documents = this.detectMouse(0, 124, 32, 44);
		hover.downloads = this.detectMouse(0, 168, 32, 44);
		hover.apps = this.detectMouse(0, 212, 32, 44);
		hover.desktop = this.detectMouse(0, 256, 32, 44);
		hover.recents = this.detectMouse(0, 300, 32, 44);
		hover.any = false;
		
		for (h in hover) {
			hover.any = hover.any || hover[h];
		}
		
		for (h in hover) {
			if (hover[h] != preHover[h]) this.invalidate();
		}
	},
	
	detectBack: function() {
		return this.detectMouse(6, 6, 32, 20);
	},
	detectForward: function() {
		return this.detectMouse(46, 6, 34, 20);
	},
	detectShowing: function() {
		if (!this.detectMouse(83, 6, 82, 20)) return -1; //165
		
		if (this.detectMouse(83, 6, 28, 20)) return 0;
		if (this.detectMouse(110, 6, 28, 20)) return 1;
		if (this.detectMouse(137, 6, 28, 20)) return 2;
	},
	detectShare: function() {
		return this.detectMouse(169, 6, 26, 20);
	},
	detectTags: function() {
		return this.detectMouse(this.w - (this.w >= 480 ? 192 : 96), 6, 26, 20);
	},
	detectMoreOptions: function() {
		return this.detectMouse(this.w - (this.w >= 480 ? 160 : 64), 6, 26, 20);
	},
	detectCategorize: function() {
		return this.detectMouse(this.w - 116, 38, 110, 20, 4);
	},
	detectScrollbar: function(slider) {
		// "Slider" changes between detecting the entire scrollbar or just the slider.
		if (slider) return this.detectMouse(this.w - 10, this.scrollbarFiles.sliderY, 4, this.scrollbarFiles.sliderH);
		else return this.detectMouse(this.w - 10, 68, 4, this.scrollbarFiles.troughH);
	},
	
	mouseMove: function(event) {
		if (this.path === "") {
			this.detectClickMain();
		}
		else {
			this.detectClickFile();
			
			this.detectSidebar();
			
			var preFilesHover = Object.assign({}, this.filesHover);
			var inval = false;
			
			this.filesHover.back = this.detectBack();
			this.filesHover.forward = this.detectForward();
			this.filesHover.show = this.detectShowing();
			this.filesHover.share = this.detectShare();
			this.filesHover.tags = this.detectTags();
			this.filesHover.options = this.detectMoreOptions();
			this.filesHover.categorize = this.detectCategorize();
			this.filesHover.scrollbar = this.detectScrollbar(false);
			
			for (h in this.filesHover) {
				inval = inval || preFilesHover[h] != this.filesHover[h];
			}
			
			if (inval) this.invalidate();
		}
	},

	mouseDown: function() {
		if (this.path == "") return;

		if (this.detectScrollbar(true)) {
			this.scrollbarFiles.drag = true;
		}
	},

	mouseDrag: function() {
		if (this.path == "") return;

		if (this.scrollbarFiles.drag) {
			let deltaY = mouse.y - mouse.py;

			let scrollbar = this.scrollbarFiles;

			deltaY = deltaY / (scrollbar.troughH - scrollbar.sliderH);
			this.scrollFiles += deltaY * this.maxScrollFiles;
			this.scrollFiles = Math.max(Math.min(this.scrollFiles, this.maxScrollFiles), 0);

			this.invalidate();
		}
	},

	mouseUp: function() {
		if (this.path == "") return;

		if (this.scrollbarFiles.drag) {
			this.scrollbarFiles.drag = false;
		}
	},
	
	mouseClick: function(event) {
		if (this.path == "") {
			this.mainFavoritesHover.forEach((hover, i) => {
				if (hover) {
					var favPaths = ["", "", "/Apps/", "", "Recents"];
					var newPath = favPaths[i] == "" ? ("/Users/User/" + this.mainFavoritesL[i] + "/") : favPaths[i];
					this.goToPath(newPath);
				}
			});

			if (this.hoverRecents) {
				this.goToRecents();
			}
			else if (this.hoverRecommended) {
				this.goToRecommended();
			}
		}
		else {
			this.hoverFiles.forEach((hover, i) => {
				if (hover) {
					this.goToPath(this.path + this.pathFiles[i].name);
				}
			});
			
			if (this.detectBack() && this.canGoBack) {
				this.goBack();
			}
				
			if (this.detectForward() && this.canGoForward) {
				this.goForward();
			}

			if (this.detectShowing() != -1) {
				this.filesView = this.filesHover.show;
			}
			
			if (this.hoverSidebar.any) {
				let hover = this.hoverSidebar;
				let userPath = "/Users/User/";
				
				if (hover.home) {
					this.goHome();
				}
				if (hover.documents) {
					this.goToPath(userPath + "Documents/");
				}
				if (hover.downloads) {
					this.goToPath(userPath + "Downloads/");
				}
				if (hover.apps) {
					this.goToPath("/Apps/");
				}
				if (hover.desktop) {
					this.goToPath(userPath + "Desktop/");
				}
				if (hover.recents) {
					this.goToPath("Recents");
				}
			}
		}
	},

	mouseWheel: function() {
		if (this.path != "" && this.detectMouse(40, 80, this.w - 54, this.h - 80)) {
			this.scrollFiles += mouse.wheelDelta;
			this.scrollFiles = Math.max(Math.min(this.scrollFiles, this.maxScrollFiles), 0);

			this.invalidate();
		}
	},
	
	mouseExit: function(event) {
		for (e in this.hoverSidebar) this.hoverSidebar[e] = false;
		for (e in this.filesHover) {
			if (e == "show") this.filesHover[e] = -1;
			else this.filesHover[e] = false;
		}

		this.hoverRecents = false;
		this.hoverRecommended = false;

		this.mainFavoritesHover.fill(false);
		this.mainPinnedHover.fill(false);
		this.mainTagsHover.fill(false);
		this.hoverFiles.fill(false);

		for (e of this.recents) e.hover = false;
		for (e of this.recommended) e.hover = false;

		this.invalidate();
	},
	
	keyDown: function(event) {
		if (keyboard.key != "Enter") return;
		if (this.textSearch == "") return;
		
		this.goToPath(this.textSearch);
		this.textSearch = "";
	},
	
	keyType: function(event) {
		if (keyboard.key == "Enter") return;
		
		if (keyboard.key == "Backspace") {
			if (this.textSearch == "") return;
			
			this.textSearch = this.textSearch.substr(0, this.textSearch.length - 1);
		}
		else {
			this.textSearch += keyboard.key;
		}
	}
};

function FilesApp() {
	// Icons
	this.icSearch = loadIcon("Files", "Search", 12, 12);
	this.icHome = loadIcon("Files", "Home", 40, 40);
	this.icDocuments = loadIcon("Files", "Documents", 32, 32);
	this.icDownloads = loadIcon("Files", "Downloads", 32, 32);
	this.icApps = loadIcon("Files", "Aplications", 32, 32);
	this.icDesktop = loadIcon("Files", "Desktop", 32, 32);
	this.icRecents = loadIcon("Files", "Recents", 32, 32);
	this.icTags = loadIcon("Files", "Tags", 32, 32);

	this.icFolder = loadIcon("Files", "FolderBlank", 58, 58);
	
	/*
	this.icFolderPnk = loadIcon("Files", "FolderBlank", 48, 48);
	this.icFolderFch = loadIcon("Files", "FolderBlank", 48, 48);
	this.icFolderVlt = loadIcon("Files", "FolderBlank", 48, 48);
	this.icFolderCyn = loadIcon("Files", "FolderBlank", 48, 48);
	this.icFolderTqs = loadIcon("Files", "FolderBlank", 48, 48);
	this.icFolderYlw = loadIcon("Files", "FolderBlank", 48, 48);
	
	let colorize = function(canvas, color) {
		let ctx = canvas.getContext("2d");
		ctx.globalCompositeOperation = "multiply";
		ctx.fillStyle = color + "77";
		ctx.fillRect(0, 0, 48, 48);
	}
	
	colorize(this.icFolderPnk, "#FD7676");
	*/
	
	this.icFolderPnk = loadIcon("Files", "FolderPink", 58, 58);
	this.icFolderFch = loadIcon("Files", "FolderFuchsia", 58, 58);
	this.icFolderVlt = loadIcon("Files", "FolderViolet", 58, 58);
	this.icFolderCyn = loadIcon("Files", "FolderCyan", 58, 58);
	this.icFolderTqs = loadIcon("Files", "FolderTurquoise", 58, 58);
	this.icFolderYlw = loadIcon("Files", "FolderYellow", 58, 58);
	
	this.icBack = loadIcon("Files", "Back", 12, 12);
	this.icForward = loadIcon("Files", "Forward", 12, 12);
	this.icShowColumn = loadIcon("Files", "ShowColumn", 14, 14);
	this.icShowGrid = loadIcon("Files", "ShowGrid", 14, 14);
	this.icShowList = loadIcon("Files", "ShowList", 14, 14);
	this.icShrink = loadIcon("Files", "Shrink", 12, 12);
	this.icExpand = loadIcon("Files", "Expand", 12, 12);
	this.icTag = loadIcon("Files", "Tag", 12, 12);
	this.icShare = loadIcon("Files", "Share", 12, 12);
	this.icOptions = loadIcon("Files", "MoreOptions", 12, 12);
	
	this.icFile = loadIcon("Files", "Documents", 58, 58);
	
	this.mainLeftPanel = true;
	
	this.hoverRecents = false;
	this.hoverRecommended = false;
	this.recentsArrowX = 0;
	this.recommendedArrowX = 0;
	
	this.textSearch = "";
	
	this.currentFolder = null;
	this.pathFiles = [];
	this.hoverFiles = [];

	// View modes: 0 - Grid, 1 - Details, 2 - List.
	this.filesView = 0;

	// Scrolling variables
	this.scrollFiles = 0;
	this.maxScrollFiles = 0;

	this.filesHover = {
		back: false,
		forward: false,
		show: -1,
		share: false,
		tags: false,
		options: false,
		categorize: false,
		scrollbar: false
	};
	
	this.hoverSidebar = {
		home: false,
		documents: false,
		downloads: false,
		apps: false,
		desktop: false,
		recents: false
	};
	
	this.favorites = {
		documents: {
			name: "Documents",
			icon: this.icDocuments,
			path: "/Users/User/Documents/",
			hover: false
		},
		downloads: {
			name: "Downloads",
			icon: this.icDownloads,
			path: "/Users/User/Downloads/",
			hover: false
		},
		apps: {
			name: "Applications",
			icon: this.icApps,
			path: "/Apps/",
			hover: false
		},
		desktop: {
			name: "Desktop",
			icon: this.icDesktop,
			path: "/Users/User/Desktop/",
			hover: false
		},
		recents: {
			name: "Recents",
			icon: this.icRecents,
			path: "Recents",
			hover: false
		}
	};
	
	this.mainFavorites = [this.icDocuments, this.icDownloads, this.icApps, this.icDesktop, this.icRecents];
	this.mainFavoritesL = ["Documents", "Downloads", "Applications", "Desktop", "Recents"];
	this.mainFavoritesPaths = ["/Users/User/Documents/", "/Users/User/Downloads/", "/Apps/", "/Users/User/Desktop/", "/"];
	this.mainFavoritesHover = [false, false, false, false, false];
	
	this.mainPinnedL = ["Notes", "Voice Memos", "Work", "Wallpapers", "Project M"];
	this.mainPinnedTags = ["Important", "Sound", "Work", "Design", "Projects"];
	this.mainPinnedHover = [false, false, false, false, false];
	
	this.tags = ["Projects", "Important", "Sound", "Work", "Travel", "Design"];
	this.colorTags = ["#5AC4F6", "#FF757A", "#FF4A9C", "#9B65EB", "#FFB036", "#48BBC0"];
	this.folderTags = [this.icFolderTqs, this.icFolderPnk, this.icFolderFch, this.icFolderVlt, this.icFolderYlw, this.icFolderCyn];
	this.mainTagsHover = [false, false, false, false, false, false];
	
	this.path = "";
	this.pathHistory = [this.path];
	this.pathHistoryIndex = 0;
	this.canGoBack = false;
	this.canGoForward = false;
	
	this.scrollbarFiles = {
		troughH: 0,
		sliderY: 0,
		sliderH: 0,
		drag: false
	};
	
	this.recents = [
		{
			name: "2022 Monthly Expenses",
			type: "File",
			lastModified: "5m ago",
			icon: this.icDocuments,
			address: "/Users/User/Documents/",
			hover: false
		},{
			name: "Instructions",
			type: "File",
			lastModified: "1h ago",
			icon: this.icDownloads,
			address: "/Users/User/Documents/",
			hover: false
		},{
			name: "Rental Agreement",
			type: "File",
			lastModified: "2h ago",
			icon: this.icDesktop,
			address: "/Users/User/Documents/",
			hover: false
		}
	];
	
	this.recommended = [
		{
			name: "Introduction Video.aep",
			type: "File",
			icon: this.icDocuments,
			address: "/Users/User/Documents/",
			hover: false
		},{
			name: "Brand Guidelines.psd",
			type: "File",
			icon: this.icDocuments,
			address: "/Users/User/Documents/",
			hover: false
		},{
			name: "Project X",
			type: "Folder",
			icon: this.icFolderTqs,
			address: "/Users/User/Documents/",
			hover: false
		}
	];
	
	if (this.path != "") {
		this.currentFolder = fileSystem.get(this.path);
		this.pathFiles = this.currentFolder.contents;
		this.hoverFiles = new Array(this.pathFiles.length);
		this.hoverFiles.fill(false);
	}
}

FilesAppProto.__proto__ = App;
setPrototype(FilesApp, FilesAppProto);
function FilesApp() {
	this.x = 52;
	this.y = 98;
	this.w = 700;
	this.h = 500;
	this.title = "Files";
	this.type = "FilesApp";
	
	this.icSearch = loadIcon("Files", "Search", 12, 12);
	this.icFolder = loadIcon("Files", "PHFolder", 40, 40);
	this.icDocuments = loadIcon("Files", "Documents", 40, 40);
	this.icDownloads = loadIcon("Files", "Downloads", 40, 40);
	this.icApps = loadIcon("Files", "Aplications", 40, 40);
	this.icDesktop = loadIcon("Files", "Desktop", 40, 40);
	this.icRecents = loadIcon("Files", "Recents", 40, 40);
	this.icTags = loadIcon("Files", "Tags", 32, 32);
	
	this.mainLeftPanel = false;
	
	this.mainFavorites = [this.icDocuments, this.icDownloads, this.icApps, this.icDesktop, this.icRecents];
	this.mainFavoritesL = ["Documents", "Downloads", "Aplications", "Desktop", "Recents"];
	
	this.mainPinnedL = ["Notes", "Voice memos", "Work", "Wallpaper", "Project M"];
	
	this.tags = ["Projects", "Important", "Sound", "Work", "Travel", "Design"];
	
	this.draw = (ctx) => {
		setTextStyle(ctx, "#FFFFFF", "20px sans-serif", "center", "middle");
		ctx.fillText("Files", this.w / 2, 14);
		
		// Search bar
		ctx.fillStyle = "#FFFFFF22";
		fillRoundedRect(ctx, this.w / 2 - 120, 48, 240, 24, 4);
		
		setTextStyle(ctx, "#CCCCCC", "12px sans-serif", "left", "middle");
		ctx.fillText("Find a file", this.w / 2 - 108, 62);
		
		ctx.drawImage(this.icSearch, this.w / 2 + 96, 54);
		
		// Favorites
		var favWidth = Math.floor(this.w * (this.mainLeftPanel ? 0.45 : 0.7));
		var favLeft = Math.floor(this.w * 0.15);
		
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "left", "middle");
		ctx.fillText("Favorites", favLeft - 28, 120);
		
		setTextStyle(ctx, "#EEEEEE", "12px sans-serif", "center", "top");
		
		for (var i = 0; i < this.mainFavorites.length; i++) {
			ctx.drawImage(this.mainFavorites[i], favLeft + i * (favWidth / 4) - 20, 138);
			ctx.fillText(this.mainFavoritesL[i], favLeft + i * (favWidth / 4), 194);
		}
		
		// Pinned
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "left", "middle");
		ctx.fillText("Pinned", favLeft - 28, 240);
		
		setTextStyle(ctx, "#EEEEEE", "12px sans-serif", "center", "top");
		
		for (var i = 0; i < this.mainFavorites.length; i++) {
			ctx.drawImage(this.icFolder, favLeft + (favWidth / 4) * i - 20, 258);
			ctx.fillText(this.mainPinnedL[i], favLeft + (favWidth / 4) * i, 314);
		}
		
		// Tags
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "left", "middle");
		ctx.fillText("Tags", favLeft - 28, 360);
		
		setTextStyle(ctx, "#EEEEEE", "12px sans-serif", "center", "top");
		
		for (var i = 0; i < this.mainFavorites.length; i++) {
			ctx.drawImage(this.icTags, favLeft + (favWidth / 4) * i - 16, 384);
			ctx.fillText(this.tags[i], favLeft + (favWidth / 4) * i, 434);
		}
	};
}

setDrawablePrototype(FilesApp);
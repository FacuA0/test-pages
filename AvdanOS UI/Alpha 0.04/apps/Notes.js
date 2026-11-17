var NotesAppProto = {
	w: 670,
	h: 400,
	minW: 552,
	title: "Notes",
	
	draw: function(ctx) {
		this.setIconColor(Style.iconColor);
		
		if (!this.editor) {
			this.drawMain(ctx);
		}
		else {
			this.drawEditor(ctx);
		}
		
		this.validated = true;
	},
	
	drawMain: function(ctx) {
		setTextStyle(ctx, Style.textColor, "18px sans-serif", "center", "middle");
		ctx.fillText("Notes", this.w / 2, 32);
		
		// New note
		ctx.fillStyle = this.hover.addNote ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, this.w - 32, 6, 26, 20, 4);
		this.drawIcon(ctx, this.icAddNote, this.w - 25, 10);
		
		if (this.notesList.length == 0) {
			setTextStyle(ctx, Style.softTextColor, "14px sans-serif", "center", "middle");
			ctx.fillText("No notes here...", this.w / 2, this.h / 2);
			return;
		}
		
		// Notes
		ctx.save();
		ctx.beginPath();
		ctx.rect(32, 64, this.w - 64, this.h - 64);
		ctx.clip();

		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "middle");

		for (var i = 0; i < this.notesList.length; i++) {
			ctx.fillStyle = this.hover.list == i ? Style.buttonHoverColor : Style.buttonColor;
			fillRoundedRect(ctx, 32, 64 + i * 40 - this.notesScroll, this.w - 64, 32, 4);
			
			var text = this.notesList[i].split("\n")[0];
			var tw = ctx.measureText(text).width;
			var l = tw > this.w - 88, l2 = l;
			
			while (l) {
				text = text.substring(0, text.length - 1);
				tw = ctx.measureText(text).width;
				l = tw > this.w - 88;
			}
			
			ctx.fillStyle = Style.textColor;
			ctx.fillText(text + (l2 ? "..." : ""), 40, 83 + i * 40 - this.notesScroll);
		}

		ctx.restore();

		// Scrollbar
		let barHeight = this.h - 70;
		let viewportHeight = this.h - 64 - 24;
		let contentHeight = this.notesList.length * 40 - 8;

		this.notesScrollMax = contentHeight - viewportHeight;
		this.notesScroll = Math.max(0, Math.min(this.notesScrollMax, this.notesScroll));

		let sliderHeight = barHeight * (viewportHeight / contentHeight);
		let sliderY = 64 + (barHeight - sliderHeight) * (this.notesScroll / this.notesScrollMax);

		console.log(contentHeight, viewportHeight);

		if (contentHeight > viewportHeight) {
			ctx.fillStyle = Style.windowCoverColor;
			fillRoundedRect(ctx, this.w - 10, 64, 4, barHeight, 2);
			
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, this.w - 10, sliderY, 4, sliderHeight, 2);
		}
	},
	
	drawEditor: function(ctx) {
		ctx.fillStyle = "#FFFFFF04";
		ctx.fillRect(0, 32, this.w, this.h - 32);
		
		// Back button
		ctx.fillStyle = this.hoverNew.back ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 6, 6, 34, 20, 4);
		this.drawIcon(ctx, this.icBack, 17, 10);
		
		// New note button
		ctx.fillStyle = this.hoverNew.newNote ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 46, 6, 34, 20, 4);
		this.drawIcon(ctx, this.icNewNote, 57, 10);
		
		// Font selector
		ctx.fillStyle = this.hoverNew.font ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 86, 6, 74, 20, 4);
		this.drawIcon(ctx, this.icDropdown, 146, 12);
		
		setTextStyle(ctx, Style.textColor, "9px sans-serif", "left", "middle");
		ctx.fillText("Arial", 92, 18);
		
		// Size selector
		ctx.fillStyle = this.hoverNew.size ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 166, 6, 36, 20, 4);
		this.drawIcon(ctx, this.icDropdown, 188, 12);
		
		setTextStyle(ctx, Style.textColor, "10px sans-serif", "left", "middle");
		ctx.fillText("16", 172, 17);
		
		// Formatting
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, 208, 6, 72, 20, 4);
		
		// Hover
		ctx.fillStyle = Style.buttonHoverColor;
		if (this.hoverNew.bold)
			fillRoundedRect(ctx, 208, 6, 24, 20, 4);
		if (this.hoverNew.italic)
			fillRoundedRect(ctx, 232, 6, 24, 20, 4);
		if (this.hoverNew.underlined)
			fillRoundedRect(ctx, 256, 6, 24, 20, 4);
		
		this.drawIcon(ctx, this.icBold, 214, 10);
		this.drawIcon(ctx, this.icItalic, 238, 10);
		this.drawIcon(ctx, this.icUnderlined, 262, 10);
		
		// Checklist button
		ctx.fillStyle = this.hoverNew.checklist ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 286, 6, 26, 20, 4);
		
		// Table button
		ctx.fillStyle = this.hoverNew.table ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 318, 6, 26, 20, 4);
		
		// Image button
		ctx.fillStyle = this.hoverNew.image ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 350, 6, 36, 20, 4);
		
		// Add profile button
		ctx.fillStyle = this.hoverNew.profile ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 392, 6, 26, 20, 4);
		
		// Share button
		ctx.fillStyle = this.hoverNew.share ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 424, 6, 26, 20, 4);
		
		// More options button
		ctx.fillStyle = this.hoverNew.options ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 456, 6, 26, 20, 4);
		
		// Delete button
		ctx.fillStyle = this.hoverNew.remove ? Style.buttonHoverColor : Style.buttonColor;
		fillRoundedRect(ctx, 488, 6, 26, 20, 4);
		
		this.drawIcon(ctx, this.icChecklist, 293, 10);
		this.drawIcon(ctx, this.icTable, 325, 10);
		this.drawIcon(ctx, this.icImage, 356, 10);
		this.drawIcon(ctx, this.icDropdown, 372, 12);
		this.drawIcon(ctx, this.icAddProfile, 399, 10);
		this.drawIcon(ctx, this.icShare, 431, 10);
		this.drawIcon(ctx, this.icMoreOptions, 463, 10);
		this.drawIcon(ctx, this.icDelete, 495, 10);
		
		// Search bar
		let searchW = Math.min(144, this.w - 526);

		ctx.fillStyle = this.hoverNew.search ? Style.buttonHoverColor : Style.buttonColor;

		if (searchW >= 64) {
			fillRoundedRect(ctx, this.w - 6 - searchW, 6, searchW, 20, 4);
			this.drawIcon(ctx, this.icSearch, this.w - 24, 10);

			setTextStyle(ctx, Style.softTextColor, "10px sans-serif", "left", "middle");
			ctx.fillText("Search", this.w - searchW, 17);
		}
		else {
			fillRoundedRect(ctx, 520, 6, 26, 20, 4);
			this.drawIcon(ctx, this.icSearch, 527, 10);
		}

		// Text
		let lines = this.textLines;
		let empty = lines.length == 1 && lines[0] == "";
		
		if (empty) {
			setTextStyle(ctx, Style.softTextColor, "12px sans-serif", "left", "top");
			ctx.fillText("Start typing...", 12, 44);
		}
		else {
			setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
			for (var i = 0; i < lines.length; i++) {
				ctx.fillText(lines[i], 12, 44 + i * 18);
			}
		}
		
		// Cursor
		let cursorTime = new Date().getTime();
		if ((cursorTime - this.textCursorTime) % 1000 < 500) {
			let lineWidth = Math.floor(ctx.measureText(lines[this.textCursorLine].substring(0, this.textCursorChar)).width);
			
			ctx.fillStyle = Style.textColor;
			ctx.fillRect(12 + lineWidth, 40 + this.textCursorLine * 18, 1, 16);
		}
	},

	close: function() {
		clearInterval(this.textCursorTimer);
	},

	resetCursorTimer: function() {
		clearInterval(this.textCursorTimer);
		
		this.textCursorTime = new Date().getTime();
		this.textCursorTimer = setInterval(function(notes) {
			notes.invalidate();
		}, 500, this);
	},
	
	checkHoverMain: function() {
		if (this.editor) return false;
		let preHover = Object.assign({}, this.hover);
		let inval = false;
		
		this.hover.addNote = this.detectMouse(this.w - 32, 6, 26, 20);
		inval = preHover.addNote != this.hover.addNote;
		
		this.hover.list = -1;

		if (this.detectMouse(32, 64, this.w - 64, this.h - 64)) {
			for (let i = 0; i < this.notesList.length; i++) {
				if (this.detectMouse(32, 64 + i * 40 - this.notesScroll, this.w - 64, 32)) {
					this.hover.list = i;
					break;
				}
			}
		}
		
		inval = inval || preHover.list != this.hover.list;
		
		return inval;
	},
	
	checkHoverNewNote: function() {
		if (!this.editor) return false;
		
		let inval = false;
		let preHover = Object.assign({}, this.hoverNew);
		
		this.hoverNew.back = this.detectMouse(6, 6, 34, 20);
		this.hoverNew.newNote = this.detectMouse(46, 6, 34, 20);
		this.hoverNew.font = this.detectMouse(86, 6, 74, 20);
		this.hoverNew.size = this.detectMouse(166, 6, 36, 20);
		this.hoverNew.bold = this.detectMouse(208, 6, 24, 20);
		this.hoverNew.italic = this.detectMouse(232, 6, 24, 20);
		this.hoverNew.underlined = this.detectMouse(256, 6, 24, 20);
		this.hoverNew.checklist = this.detectMouse(286, 6, 26, 20);
		this.hoverNew.table = this.detectMouse(318, 6, 26, 20);
		this.hoverNew.image = this.detectMouse(350, 6, 36, 20);
		this.hoverNew.profile = this.detectMouse(392, 6, 26, 20);
		this.hoverNew.share = this.detectMouse(424, 6, 26, 20);
		this.hoverNew.options = this.detectMouse(456, 6, 26, 20);
		this.hoverNew.remove = this.detectMouse(488, 6, 26, 20);
		
		let searchW = Math.min(140, this.w - 526);
		this.hoverNew.search = searchW >= 64 ? this.detectMouse(this.w - 6 - searchW, 6, searchW, 20) : this.detectMouse(520, 6, 26, 20);
		
		for (h in this.hoverNew) {
			inval = inval || preHover[h] != this.hoverNew[h];
		}
		
		return inval;
	},
	
	mouseMove: function() {
		let inval = false;
		
		inval = inval || this.checkHoverMain();
		inval = inval || this.checkHoverNewNote();
		
		if (inval) this.invalidate();
	},
	
	mouseClick: function(event) {
		if (!this.editor) {
			if (this.hover.addNote) {
				this.editor = true;
				this.resetCursorTimer();
				this.title = "New note";
			}
			else if (this.hover.list >= 0) {
				this.editor = true;
				this.resetCursorTimer();
				this.title = "Edit note";

				this.noteOpen = this.hover.list;
				this.textField = this.notesList[this.noteOpen];
				this.textLines = this.textField.split("\n");
				this.textCursorLine = this.textLines.length - 1;
				this.textCursorChar = this.textLines[this.textCursorLine].length;
			}
			return;
		}

		if (this.hoverNew.back) {
			this.editor = false;
			this.title = "Notes";
			
			if (this.textField == "") return;
			
			if (this.noteOpen == -1) {
				this.notesList.push(this.textField);
			}
			else {
				this.notesList.splice(this.noteOpen, 1, this.textField);
				this.noteOpen = -1;
			}
			StorageSystem.set("Notes", "List", JSON.stringify(this.notesList));
			
			this.textField = "";
			this.textLines = [""];
			this.textCursorChar = 0;
			this.textCursorLine = 0;
		}

		if (this.hoverNew.newNote) {
			this.title = "New note";

			if (this.textField == "") return;
			
			if (this.noteOpen == -1) {
				this.notesList.push(this.textField);
			}
			else {
				this.notesList.splice(this.noteOpen, 1, this.textField);
				this.noteOpen = -1;
			}
			StorageSystem.set("Notes", "List", JSON.stringify(this.notesList));
			
			this.textField = "";
			this.textLines = [""];
			this.textCursorChar = 0;
			this.textCursorLine = 0;
			this.resetCursorTimer();
		}

		if (this.detectMouse(0, 32, this.w, this.h - 32)) {
			let mx = mouse.x - this.x - 12;
			let my = mouse.y - this.y - 44;

			let lines = this.textLines;
			let newLine = Math.min(Math.max(Math.floor(my / 18), 0), lines.length - 1);

			ctx.font = "12px sans-serif";
			
			let difX = -12;
			let newChar = 0;
			while (newChar < lines[newLine].length) {
				let x = ctx.measureText(lines[newLine].substring(0, newChar)).width;
				if (x > mx) {
					if (Math.abs(difX) < x - mx) newChar--;
					break;
				}

				newChar++;
				difX = x - mx;
			}

			this.textCursorChar = newChar;
			this.textCursorLine = newLine;
			this.resetCursorTimer();
		}
	},

	mouseExit: function() {
		this.hover.addNote = false;
		this.hover.list = -1;

		for (let k in this.hoverNew) {
			this.hoverNew[k] = false;
		}

		this.invalidate();
	},

	mouseWheel: function(event) {
		if (!this.editor && this.detectMouse(0, 64, this.w, this.h - 64)) {
			this.notesScroll += mouse.wheelDelta;
			this.notesScroll = Math.max(Math.min(this.notesScroll, this.notesScrollMax), 0);

			this.checkHoverMain();
			this.invalidate();
		}
	},
	
	keyType: function() {
		if (!this.editor) return;
		
		let cursorChar = this.textCursorChar;
		let cursorLine = this.textCursorLine;
		let lines = this.textLines;

		let letter = keyboard.key;
		
		if (letter == "Backspace") {
			if (cursorChar > 0) {
				let part1 = lines[cursorLine].slice(0, cursorChar - 1);
				let part2 = lines[cursorLine].slice(cursorChar);
				
				lines[cursorLine] = part1 + part2;
				cursorChar--;
			}
			else if (cursorLine > 0) {
				let line = lines[cursorLine];
				lines.splice(cursorLine, 1);
				
				cursorChar = lines[--cursorLine].length;
				lines[cursorLine] += line;
			}
		}
		else if (letter == "Delete") {
			if (cursorChar < lines[cursorLine].length) {
				let part1 = lines[cursorLine].slice(0, cursorChar);
				let part2 = lines[cursorLine].slice(cursorChar + 1);
				
				lines[cursorLine] = part1 + part2;
			}
			else if (cursorLine < lines.length - 1) {
				let line = lines[cursorLine + 1];
				lines.splice(cursorLine + 1, 1);
				
				lines[cursorLine] += line;
			}
		}
		else {
			let part1 = lines[cursorLine].slice(0, cursorChar);
			let part2 = lines[cursorLine].slice(cursorChar);
			
			lines[cursorLine] = part1 + letter + part2;
			cursorChar++;
		}

		this.resetCursorTimer();

		this.textLines = lines;
		this.textField = lines.join("\n");
		this.textCursorChar = cursorChar;
		this.textCursorLine = cursorLine;
	},
	
	keyDown: function() {
		if (!this.editor) return;

		let cursorChar = this.textCursorChar;
		let cursorLine = this.textCursorLine;
		let lines = this.textLines;

		if (keyboard.key == "Enter") {
			let part1 = lines[cursorLine].slice(0, cursorChar);
			let part2 = lines[cursorLine].slice(cursorChar);

			lines.splice(cursorLine, 1, part1, part2);
			cursorLine++;
			cursorChar = 0;
		}

		if (keyboard.key == "ArrowLeft") {
			cursorChar--;

			if (cursorChar == -1) {
				if (cursorLine > 0) {
					cursorLine--;
					cursorChar = lines[cursorLine].length;
				}
				else cursorChar = 0;
			}
		}
		else if (keyboard.key == "ArrowRight") {
			cursorChar++;

			if (cursorChar > lines[cursorLine].length) {
				if (cursorLine < lines.length - 1) {
					cursorLine++;
					cursorChar = 0;
				}
				else cursorChar = lines[cursorLine].length;
			}
		}
		else if (keyboard.key == "ArrowUp") {
			let prevCursorLine = cursorLine;
			cursorLine = Math.max(0, cursorLine - 1);

			adjustCursorXPos(prevCursorLine);

			cursorChar = Math.min(cursorChar, lines[cursorLine].length);
		}
		else if (keyboard.key == "ArrowDown") {
			let prevCursorLine = cursorLine;
			cursorLine = Math.min(lines.length - 1, cursorLine + 1);

			adjustCursorXPos(prevCursorLine);

			cursorChar = Math.min(cursorChar, lines[cursorLine].length);
		}
		
		this.resetCursorTimer();

		this.textLines = lines;
		this.textCursorChar = cursorChar;
		this.textCursorLine = cursorLine;

		function adjustCursorXPos(prevCursorLine) {
			if (cursorLine != prevCursorLine) {
				ctx.font = "12px sans-serif";
				let prevX = ctx.measureText(lines[prevCursorLine].substring(0, cursorChar)).width;
				let difX = 0;

				cursorChar = 0;
				while (cursorChar < lines[cursorLine].length) {
					let x = ctx.measureText(lines[cursorLine].substring(0, cursorChar)).width;
					if (x > prevX) {
						if (Math.abs(difX) < x - prevX) cursorChar--;
						break;
					}
	
					cursorChar++;
					difX = x - prevX;
				}
			}
		}
	}
};

function NotesApp() {
	this.icAddNote = loadIcon("Photos", "More", 12, 12);
	this.icBack = loadIcon("global", "Back", 12, 12);
	this.icNewNote = loadIcon("Notes", "NewNote", 12, 12);
	this.icBold = loadIcon("Notes", "Bold", 12, 12);
	this.icItalic = loadIcon("Notes", "Italic", 12, 12);
	this.icUnderlined = loadIcon("Notes", "Underlined", 12, 12);
	this.icChecklist = loadIcon("Notes", "Checklist", 12, 12);
	this.icTable = loadIcon("Notes", "Table", 12, 12);
	this.icImage = loadIcon("Notes", "Image", 12, 12);
	this.icAddProfile = loadIcon("Notes", "AddProfile", 12, 12);
	this.icShare = loadIcon("global", "Share", 12, 12);
	this.icMoreOptions = loadIcon("global", "MoreOptions", 12, 12);
	this.icDelete = loadIcon("global", "Delete", 12, 12);
	this.icSearch = loadIcon("global", "Search", 12, 12);
	this.icDefault = loadIcon("global", "Default", 12, 12);
	this.icDropdown = loadIcon("global", "Dropdown", 8, 8);
	
	this.hover = {
		list: -1,
		addNote: false
	};
	
	this.hoverNew = {
		back: false,
		newNote: false,
		font: false,
		size: false,
		bold: false,
		italic: false,
		underlined: false,
		checklist: false,
		table: false,
		image: false,
		profile: false,
		share: false,
		options: false,
		remove: false
	};

	
	this.textField = "";
	this.textLines = [""];
	this.textCursorLine = 0;
	this.textCursorChar = 0;
	this.textCursorTime = 0;
	this.textCursorTimer = null;
	
	this.editor = false;
	this.noteOpen = -1;
	this.notesScroll = 0;
	this.notesScrollMax = 0;
	
	if (StorageSystem.exists("Notes", "List")) {
		this.notesList = JSON.parse(StorageSystem.get("Notes", "List"));
	}
	else {
		this.notesList = [];
	}
}

NotesAppProto.__proto__ = App;
setPrototype(NotesApp, NotesAppProto);
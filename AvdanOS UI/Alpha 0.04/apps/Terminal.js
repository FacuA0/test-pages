var TerminalAppProto = {
	w: 620,
	h: 480,
	title: "Terminal",
	
	versionName: "AvdanOS UI Alpha 0.04",
	
	draw: function(ctx) {
		setTextStyle(ctx, Style.textColor, "12px monospace", "left", "top");
		var getInput = true;
		
		var lines = this.displayBuffer.split("\n");
		
		var input = this.promptAnswer + (this.promptEnabled && this.cursorVisible ? "_" : "");
		lines[lines.length - 1] += input;
		
		for (let i = lines.length - 1; i < lines.length; i++) {
			var text = lines[i];
			
			if (text.length > this.textWidth) {
				lines.push(text.substring(this.textWidth, text.length));
				lines[i] = text.substring(0, this.textWidth);
			}
		}
		
		// Set the first scrollbar variables
		let viewportHeight = this.h;
		let contentHeight = lines.length * 14 + 12;
		let barHeight = viewportHeight - 8;
		
		this.maxScroll = Math.max(0, contentHeight - viewportHeight);
		
		if (this.scrollDown) {
			this.scroll = this.maxScroll;
			this.scrollDown = false;
		}
		
		
		ctx.save();
		ctx.beginPath();
		ctx.rect(0, 0, this.w, this.h);
		ctx.clip();
		
		// Print the text
		for (let i = 0; i < lines.length; i++) {
			var text = lines[i];
			ctx.fillText(text, 6, 6 + i * 14 - this.scroll);
		}
		
		ctx.restore();
		
		// Set scrollbar variables
		let sliderHeight = barHeight * (viewportHeight / contentHeight);
		let sliderY = 4 + (barHeight - sliderHeight) * (this.scroll / this.maxScroll);
		
		if (sliderHeight < barHeight) {
			// Scrollbar
			ctx.fillStyle = Style.windowCoverColor;
			fillRoundedRect(ctx, this.w - 8, 4, 4, barHeight, 2);
		
			// Scrollbar slider
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, this.w - 8, sliderY, 4, sliderHeight, 2);
		}
		
		this.validated = true;
	},
	
	limitScroll: function() {
		this.scroll = Math.min(this.maxScroll, this.scroll);
		this.scroll = Math.max(0, this.scroll);
		
		this.invalidate();
	},
	
	keyType: function() {
		if (!this.promptEnabled) return;
		
		let letter = keyboard.key;
		if (letter == "Tab") {
			this.autocomplete();
		}
		else if (letter == "Backspace") {
			this.promptAnswer = this.promptAnswer.slice(0, -1);
			this.tabIndex = 0;
			this.tabText = [];
		}
		else {
			this.promptAnswer += keyboard.key;
			this.tabIndex = 0;
			this.tabText = [];
		}
		
		this.scrollDown = true;
	},
	
	keyDown: function() {
		if (keyboard.key == "Enter") {
			this.buffer += this.promptAnswer + "\n";
			this.adaptBuffer();
			this.promptEnabled = false;
			
			this.evaluate(this.promptAnswer);
			
			this.buffer += this.path + ">";
			this.adaptBuffer();
			this.promptAnswer = "";
			this.promptEnabled = true;
			this.tabIndex = 0;
			this.tabText = [];
			this.scrollDown = true;
		}
		else if (keyboard.key == "ArrowUp") {
			if (this.cmdHistory.length == 0) return;

			if (this.cmdHistoryIndex == -1) { // Jumping from current mode to history mode
				this.cmdHistoryPrompt = this.promptAnswer;
				this.cmdHistoryIndex = this.cmdHistory.length - 1;
			}
			else { // Just keep navigating...
				this.cmdHistoryIndex = Math.max(0, this.cmdHistoryIndex - 1);
			}

			this.promptAnswer = this.cmdHistory[this.cmdHistoryIndex];
			this.tabIndex = 0;
			this.tabText = [];
		}
		else if (keyboard.key == "ArrowDown") {
			if (this.cmdHistoryIndex == -1) return;
			
			if (this.cmdHistoryIndex == this.cmdHistory.length - 1) { // Switching to current mode
				this.promptAnswer = this.cmdHistoryPrompt;
				this.cmdHistoryIndex = -1;
				this.cmdHistoryPrompt = "";
			}
			else { // Just keep navigating...
				this.cmdHistoryIndex++;
				this.promptAnswer = this.cmdHistory[this.cmdHistoryIndex];
			}
			
			this.tabIndex = 0;
			this.tabText = [];
		}
	},
	
	mouseWheel: function() {
		this.scroll += mouse.wheelDelta;
		this.limitScroll();
	},
	
	windowResize: function() {
		this.textWidth = parseInt(this.w / 6.7);
		this.adaptBuffer();
		this.limitScroll();
	},

	close: function() {
		clearInterval(this.intervalCursor);
	},

	autocomplete: function() {
		let base, name;
		if (this.tabText.length == 0) {
			let nameIndex = this.promptAnswer.lastIndexOf(" ");
			base = this.promptAnswer.slice(0, nameIndex + 1);
			name = this.promptAnswer.slice(nameIndex + 1);
			this.tabText = [base, name];
		}
		else {
			base = this.tabText[0];
			name = this.tabText[1];
		}

		let folder = fileSystem.get(this.path);
		let children = folder.contents.map(f => f.name).filter(n => n.startsWith(name));

		if (children.length > 0) {
			this.promptAnswer = base + children[this.tabIndex++];
			this.tabIndex %= children.length;
		}
	},
	
	evaluate: function(input) {
		if (input.trim() == "") return;
		
		if (this.cmdHistory[this.cmdHistory.length - 1] != this.promptAnswer)
			this.cmdHistory.push(this.promptAnswer);
		this.cmdHistoryIndex = -1;
		this.cmdHistoryPrompt = "";
		
		var parts = input.split(" ");
		var op = parts[0];
		
		switch (op) {
			case "help": 
				this.buffer += "Command list:\n" + 
							" - help: Shows this command list.\n" + 
							" - version: Shows the version of this project.\n" + 
							" - cls/clear: Clears the display.\n" + 
							" - dir/ls: Shows a list of files and subdirectories in this directory.\n" + 
							" - cd: Changes the current directory to a relative one.\n\n";
				break;
			
			case "version":
				this.buffer += this.versionName + "\n\n";
				break;
			
			case "clear":
			case "cls":
				this.buffer = "";
				break;
			
			case "ls":
			case "dir":
				var folder = fileSystem.get(this.path);
				var list = folder.contents;
				
				if (list.length == 0) {
					this.buffer += "The folder '" + folder.name + "' is empty.\n\n";
					break;
				}
				
				this.buffer += "Contents of '" + folder.name + "':\n";
				
				for (var i = 0; i < list.length; i++) {
					let child = list[i];
					this.buffer += " - " + child.name + " (" + child.type + ")\n";
				}
				
				this.buffer += "\n";
				break;
				
			case "cd":
				let dest = parts.slice(1).join(" ");
				if (dest == "") break;
				
				if (dest == ".." && this.path.length > 1) {
					this.path = this.path.substring(0, Math.max(1, this.path.lastIndexOf("/")));
					break;
				} 
				else {
					let newPath = this.path + (this.path == "/" ? "" : "/") + dest;
					let folder = fileSystem.get(newPath);
					if (!folder || folder.type == "File") break;
					
					this.path = newPath;
				}
				break;
			
			default: 
				this.buffer += "This command does not exist.\nType 'help' for a list of avalaible commands.\n\n";
		}
	},
	
	adaptBuffer: function() {
		var lines = this.buffer.slice().split("\n");
		
		for (let i = 0; i < lines.length; i++) {
			var line = lines[i];
			if (line.length > this.textWidth) {
				lines.splice(i + 1, 0, line.substring(this.textWidth, line.length));
				lines[i] = line.substring(0, this.textWidth);
			}
		}
		
		this.displayBuffer = lines.join("\n");
	},
};

function TerminalApp() {
	this.displayBuffer = "";
	this.promptEnabled = true;
	this.cursorVisible = true;
	this.promptAnswer = "";
	this.textWidth = 92;
	this.scroll = 0;
	this.scrollDown = false;
	this.maxScroll = 0;
	this.tabIndex = 0;
	this.tabText = [];
	this.cmdHistory = [];
	this.cmdHistoryIndex = -1;
	this.cmdHistoryPrompt = "";

	this.buffer = this.versionName + " - Terminal\nType 'help' to show the commands available.\n\n";
	this.path = "/Users/User";

	this.buffer += this.path + ">";
	
	this.adaptBuffer();
	
	this.intervalCursor = setInterval((app) => {
		app.cursorVisible = !app.cursorVisible;
		
		app.invalidate();
	}, 1000, this);
}

TerminalAppProto.__proto__ = App;
setPrototype(TerminalApp, TerminalAppProto);
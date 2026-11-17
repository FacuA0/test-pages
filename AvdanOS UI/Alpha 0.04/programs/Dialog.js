var DialogAppProto = {
	w: 480,
	h: 120,
	resizable: false,
	multitask: false,
	
	invoker: null,
	type: "info",
	title: "Info",
	message: "Default message.",
	
	draw: function(ctx) {
		let color = "#FFF";
		if (this.type == "warning") color = "#FA2";
		if (this.type == "error") color = "#F32";
		
		setTextStyle(ctx, color, "12px sans-serif", "left", "top");

		var lines = [];
		
		for (var i = 0, psp = 0, sp = 0; i <= this.message.length; i++) {
			if (this.message[i] == " " || this.message[i] == "\n") 
				sp = i;
			
			var safeChunk = this.message.substring(psp, sp);
			var currentChunk = this.message.substring(psp, i);
			
			if (ctx.measureText(currentChunk).width > this.w - 12 || this.message[i] == "\n") {
				psp = sp + 1;
				lines.push(safeChunk);
			}
			if (i == this.message.length) {
				lines.push(currentChunk);
			}
		}

		// Unsafe: It should be replaced in the future...
		this.frame.setSize(this.frame.w, Math.min(680, 12 + lines.length * 16) + 32);
		
		for (var i = 0; i < lines.length; i++) {
			ctx.fillText(lines[i], 6, 6 + i * 16);
		}
	}
}

function DialogApp(message, type, invoker) {
	this.type = type;
	this.title = type;
	this.message = message;
	if (invoker) this.invoker = invoker;
	
	if (message instanceof Error) {
		this.title = message.name;
		this.message = message.message;
		
		if (message.stack) {
			this.message += "\n\n" + message.stack;
		}
	}
}

DialogAppProto.__proto__ = App;
setPrototype(DialogApp, DialogAppProto);
var TextEditorAppProto = {
	draw: function(ctx) {
		setTextStyle(ctx, Style.textColor, "16px sans-serif", "center", "middle");
		ctx.fillText("Text Editor", this.w / 2, 48);
		
		setTextStyle(ctx, Style.softTextColor, "10px sans-serif", "center", "middle");
		ctx.fillText("There is no content here for now...", this.w / 2, this.h / 2);
	}
};

function TextEditorApp() {
	this.w = 600;
	this.h = 400;
	this.title = "Text editor";
}

TextEditorAppProto.__proto__ = App;
setPrototype(TextEditorApp, TextEditorAppProto);
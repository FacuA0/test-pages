var TemplateAppProto = { // change this
	w: 600,
	h: 400,
	title: "Template", // Change this
	
	draw: function(ctx) {
		setTextStyle(ctx, Style.textColor, "16px sans-serif", "center", "middle");
		ctx.fillText("Template App", this.w / 2, 48); // Change this
		
		setTextStyle(ctx, Style.softTextColor, "10px sans-serif", "center", "middle");
		ctx.fillText("There is no content here for now...", this.w / 2, this.h / 2);
	}
};

function TemplateApp() {
	// Put things here
}

TemplateAppProto.__proto__ = App; // Change this
setPrototype(TemplateApp, TemplateAppProto); // Change this
var WindowProto = {};

function Window() {
	// Something goes here
}

WindowProto.__proto__ = Drawable;
setPrototype(Window, WindowProto);
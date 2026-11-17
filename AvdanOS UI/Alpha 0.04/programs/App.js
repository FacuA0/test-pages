var App = {
	title: "App",
	frame: null,
	
	invalidate: function() {
		this.validated = false;
		this.frame.invalidate();
	},
	
	close: () => {},
	minimize: () => {},
	restore: () => {},
	windowMove: () => {},
	windowStartResize: () => {},
	windowResize: () => {},
	windowEndResize: () => {}
};

App.__proto__ = Drawable;
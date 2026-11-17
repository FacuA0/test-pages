var Style = {
	windowColor: "#000",
	windowTransparency: 0.65,
	windowBlur: true,
	windowBlurAmount: 8,
	windowCoverColor: "#0004",
	textColor: "#EEE",
	softTextColor: "#CCC",
	accentColor: "#F0F",
	secondaryColor: "#FFF",
	secondaryFaintColor: "#FFF4",
	iconColor: "#FFF",
	buttonColor: "#FFF2",
	buttonFaintColor: "#FFF1",
	buttonHoverColor: "#FFF4",
	buttonStyleBg: true,
	buttonCornerRounded: true,
	background: null,
	
	appearanceShedule: true,
	scheduleAuto: true,
	scheduleDayTime: 60 * 60 * 6,
	scheduleNightTime: 60 * 60 * 18,
	scheduleDay: "Light",
	scheduleNight: "Dark",
	textSize: 12,
	
	themesURLs: [
		"Default",
		"Classic",
		"Pastel",
		//"themes/Neon.json",
		//"themes/Organic.json",
		//"themes/Pro.json",
		//"themes/Dynamic.json",
		"Basic"
	],
	getThemeURL: (name) => {
		return "themes/" + name + "/" + name + ".json";
	},
	getThemeResource: (name, res) => {
		return "themes/" + name + "/" + res;
	},
	currentTheme: 0,
	currentAppearance: 0,
	themes: [],
	setTheme: function(theme, indStyle) {
		this.currentTheme = this.themes.indexOf(theme);
		this.currentAppearance = indStyle ? indStyle : 0;
		let style = theme.appearances[this.currentAppearance].style;
		
		this.setAppearance(style);
	},
	setAppearance: function(style) {
		for (prop in style) {
			this[prop] = style[prop];
		}
		
		if (bg) bg.updateBackground(this.background);
		
		this.updateTheme();
	},
	updateTheme: function() {
		for (l of drawables) {
			for (d of l) {
				d.invalidate();
			}
		}
	}
};
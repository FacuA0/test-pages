var LoginScreenProto = {
	cornerRadius: 0,
	months: ["January", "February", "March", "April", "May", "June", 
			 "July", "August", "September", "October", "November", "December"],
	
	draw: function(ctx) {
		if (!this.loginMode) {
			this.drawStart(ctx);
		}
		else {
			this.drawLogin(ctx);
		}
		
		this.invalidate();
	},
	
	drawStart: function(ctx) {
		ctx.fillStyle = "#A27";
		ctx.fillRect(0, 0, this.w, this.h);
		
		var cvRatio = width / height;
		var bgRatio = this.imgBG.width / this.imgBG.height;
		
		if (cvRatio > bgRatio) {
			var ratio = width / this.imgBG.width;
			ctx.drawImage(this.imgBG, 0, (height - this.imgBG.height * ratio) / 2, width, this.imgBG.height * ratio);
		}
		else {
			var ratio = height / this.imgBG.height;
			ctx.drawImage(this.imgBG, (width - this.imgBG.width * ratio) / 2, 0, this.imgBG.width * ratio, height);
		}
		
		let date = new Date();
		
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let days = date.getDate();
		let months = date.getMonth();
		let year = date.getFullYear();
		
		hours = String(hours).length < 2 ? "0" + hours : hours;
		minutes = String(minutes).length < 2 ? "0" + minutes : minutes;
		
		ctx.globalAlpha = this.animLockAlpha;
		
		setTextStyle(ctx, "#FFF", "72px sans-serif", "center", "middle");
		ctx.fillText(hours + ":" + minutes, this.w / 2, this.h / 5 + this.animLockY);
		setTextStyle(ctx, "#FFF", "20px sans-serif", "center", "top");
		ctx.fillText(this.months[months] + " " + days + ", " + year, this.w / 2, this.h / 5 + 42 + this.animLockY);
		
		setTextStyle(ctx, "#FFFA", "12px sans-serif", "center", "middle");
		ctx.fillText("Press space or click to show login", this.w / 2, this.h - 30 - this.animLockY / 2);
		
		ctx.globalAlpha = 1;
	},
	
	drawLogin: function(ctx) {
		ctx.fillStyle = "#A27";
		ctx.fillRect(0, 0, this.w, this.h);
		
		var cvRatio = width / height;
		var bgRatio = this.imgBG.width / this.imgBG.height;
		
		if (cvRatio > bgRatio) {
			var ratio = width / this.imgBG.width;
			ctx.drawImage(this.imgBG, 0, (height - this.imgBG.height * ratio) / 2, width, this.imgBG.height * ratio);
		}
		else {
			var ratio = height / this.imgBG.height;
			ctx.drawImage(this.imgBG, (width - this.imgBG.width * ratio) / 2, 0, this.imgBG.width * ratio, height);
		}
		
		ctx.globalAlpha = this.animLoginBG;
		ctx.fillStyle = "#0003";
		ctx.fillRect(0, 0, this.w, this.h);
		ctx.globalAlpha = 1;
		
		ctx.globalAlpha = this.animLoginAlpha;
		ctx.drawImage(this.icProfile, this.w / 2 - 64, this.h / 2 - 184);
		
		setTextStyle(ctx, "#FFF", "24px sans-serif", "center", "middle");
		ctx.fillText("User", this.w / 2, this.h / 2 - 24);
		
		if (!this.checkingPassword) {
			let fieldX = this.w / 2 - 128;
			let fieldY = this.h / 2 + 12;

			let passwordEmpty = this.passwordField == "";

			ctx.fillStyle = "#FFF2";
			fillRoundedRect(ctx, fieldX, fieldY, 256, 24, 4);
			
			ctx.save();
			ctx.beginPath();
			ctx.rect(fieldX + 6, fieldY + 4, 198, 16);
			ctx.clip();

			setTextStyle(ctx, passwordEmpty ? "#BBB" : "#FFF", "12px sans-serif", "left", "top");

			this.adjustPasswordScroll(ctx);

			let textPassword = passwordEmpty ? "Password" : this.passwordVisible ? this.passwordField : "";
			ctx.fillText(textPassword, fieldX + 8 - this.passwordScroll, fieldY + 7);
			
			let cursorX = fieldX + 8 - this.passwordScroll;
			if (!passwordEmpty && !this.passwordVisible) {
				for (let i = 0; i < this.passwordField.length; i++) {
					ctx.fillStyle = "#EEE";
					
					ctx.beginPath();
					ctx.arc(fieldX + 12 + i * 9 - this.passwordScroll, fieldY + 12, 3, 0, 2 * Math.PI);
					ctx.fill();
				}
				
				cursorX += this.passwordCursorPos * 9 - 1;
			}
			else {
				cursorX += ctx.measureText(this.passwordField.slice(0, this.passwordCursorPos)).width;
			}

			ctx.restore();
			
			let cursorOpacity = ((frameCount - this.frameCursorBlink) % 60 < 25 ? "F" : "0");
			ctx.fillStyle = "#FFF" + cursorOpacity;
			ctx.fillRect(cursorX, fieldY + 4, 1, 16);
			
			if (this.hover.showPassword) {
				ctx.fillStyle = "#FFF2";
				fillRoundedRect(ctx, fieldX + 128 + 80, fieldY + 2, 20, 20, 3);
			}
			
			if (this.hover.enter) {
				ctx.fillStyle = "#FFF2";
				fillRoundedRect(ctx, fieldX + 128 + 104, fieldY + 2, 20, 20, 3);
			}
			
			let seeIcon = !this.passwordVisible ? this.icSeePassword : this.icHidePassword;

			if (!passwordEmpty) this.drawIcon(ctx, seeIcon, fieldX + 128 + 84, fieldY + 6);
			this.drawIcon(ctx, this.icEnter, fieldX + 128 + 108, fieldY + 6);
		}
		else {
			setTextStyle(ctx, "#FFF", "14px sans-serif", "center", "top");
			ctx.fillText("Checking the password...", this.w / 2 + 30, this.h / 2 + 18);
			
			ctx.strokeStyle = "#FFF";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(this.w / 2 - 70, this.h / 2 + 24, 10, 0.5 * Math.PI + frameCount / 10, 1.5 * Math.PI + frameCount / 10);
			ctx.stroke();
		}
		
		if (this.passwordWrong) {
			setTextStyle(ctx, "#F86", "14px sans-serif", "center", "top");
			ctx.fillText("The password is incorrect.", this.w / 2, this.h / 2 + 48);
			
			setTextStyle(ctx, "#FA8", "12px sans-serif", "center", "top");
			ctx.fillText("Try again, or see the hint below.", this.w / 2, this.h / 2 + 66);
		}
		
		setTextStyle(ctx, "#FFFA", "10px sans-serif", "center", "middle");
		ctx.fillText("Hint: 1234", this.w / 2, this.h - 18);
		
		ctx.globalAlpha = 1;
	},

	adjustPasswordScroll: function(ctx) {
		let passwordWindow = 198;
		let fieldX = this.w / 2 - 122;
		let password = this.passwordField;

		let cursorX = fieldX + 2 - this.passwordScroll;
		if (!this.passwordVisible) {
			cursorX += this.passwordCursorPos * 9 - 1;
		}
		else {
			cursorX += ctx.measureText(password.slice(0, this.passwordCursorPos)).width;
		}

		if (cursorX < fieldX) {
			this.passwordScroll += cursorX - fieldX;
		}

		if (cursorX > fieldX + passwordWindow) {
			this.passwordScroll += cursorX - (fieldX + passwordWindow);
		}

		let textWidth = ctx.measureText(password).width;
		let maxScroll = (this.passwordVisible ? textWidth : this.passwordCursorPos * 9) - passwordWindow + 2;
		this.passwordScroll = Math.max(0, Math.min(this.passwordScroll, maxScroll));
	},
	
	checkPassword: function() {
		if (this.checkingPassword) return;
		this.checkingPassword = true;
		
		setTimeout((password) => {
			if (password == "1234") {
				var animAlpha = {
					target: this,
					property: "animLoginAlpha",
					drawable: this,
					a: 1,
					b: 0,
					duration: 0.2
				};
				
				var animBG = {
					target: this,
					property: "animLoginBG",
					drawable: this,
					a: 1,
					b: 0,
					duration: 0.3,
					onFinish: function() {
						loadDrawables();
					}
				};
				
				Animator.addAnimation(animAlpha);
				Animator.addAnimation(animBG);
			}
			else {
				this.passwordWrong = true;
				this.checkingPassword = false;
				this.passwordCursorPos = 0;
				this.passwordField = "";
				this.frameCursorBlink = frameCount;
			}
		}, 1000, this.passwordField);
	},
	
	goToLogin: function() {
		if (!this.canEnterLogin) return;
		
		var animLogAlpha = {
			target: this,
			property: "animLoginAlpha",
			drawable: this,
			a: 0,
			b: 1,
			duration: 0.3,
			onFinish: function(anim) {
				anim.target.animLoginAlpha = 1;
			}
		};
		
		var animLogBG = {
			target: this,
			property: "animLoginBG",
			drawable: this,
			a: 0,
			b: 1,
			duration: 0.3,
			onFinish: function(anim) {
				anim.target.animLoginBG = 1;
				anim.target.canExitLogin = true;
			}
		};
		
		var animAlpha = {
			target: this,
			property: "animLockAlpha",
			drawable: this,
			a: 1,
			b: 0,
			duration: 0.2
		};
		
		var animY = {
			target: this,
			property: "animLockY",
			drawable: this,
			a: 0,
			b: -300,
			duration: 0.3,
			onFinish: function(anim) {
				let target = anim.target;
				target.loginMode = true;
				target.animLockAlpha = 1;
				target.animLockY = 0;
				
				Animator.addAnimation(animLogAlpha);
				Animator.addAnimation(animLogBG);
				
				this.frameCursorBlink = frameCount;
			}
		};
		
		Animator.addAnimation(animAlpha);
		Animator.addAnimation(animY);
		
		this.canEnterLogin = false;
	},
	
	goToLock: function() {
		if (!this.canExitLogin) return;
		
		var animAlpha = {
			target: this,
			property: "animLockAlpha",
			drawable: this,
			a: 0,
			b: 1,
			duration: 0.3,
			onFinish: function(anim) {
				anim.target.canEnterLogin = true;
			}
		};
		
		var animLogAlpha = {
			target: this,
			property: "animLoginAlpha",
			drawable: this,
			a: 1,
			b: 0,
			duration: 0.2
		};
		
		var animLogBG = {
			target: this,
			property: "animLoginBG",
			drawable: this,
			a: 1,
			b: 0,
			duration: 0.3,
			onFinish: function(anim) {
				let target = anim.target;
				target.loginMode = false;
				target.animLockY = 0;
				
				target.passwordField = "";
				target.passwordCursorPos = 0;
				target.passwordWrong = false;
				
				Animator.addAnimation(animAlpha);
			}
		};
		
		Animator.addAnimation(animLogAlpha);
		Animator.addAnimation(animLogBG);
		
		this.canExitLogin = false;
	},
	
	mouseMove: function() {
		this.hover.enter = this.detectMouse(this.w / 2 + 104, this.h / 2 + 14, 20, 20);
		this.hover.showPassword = this.detectMouse(this.w / 2 + 80, this.h / 2 + 14, 20, 20) && this.passwordField != "";
	},
	
	mouseClick: function() {
		if (!this.loginMode) {
			// Lock screen clicks
			this.goToLogin();
		}
		else {
			// Login screen clicks
			if (this.hover.enter) {
				this.checkPassword();
			}
			if (this.hover.showPassword) {
				this.passwordVisible = !this.passwordVisible;
				this.frameCursorBlink = frameCount;
			}
		}
	},
	
	keyDown: function() {
		if (keyboard.key == "Enter") {
			if (!this.loginMode) {
				this.goToLogin();
			}
			else {
				if (this.passwordField == "") return;
				
				this.checkPassword();
			}
		}
		
		if (keyboard.key == "Escape") {
			if (this.loginMode) {
				this.goToLock();
			}
		}
		
		if (keyboard.key == "ArrowLeft") {
			if (this.loginMode) {
				this.passwordCursorPos = Math.max(this.passwordCursorPos - 1, 0);
				this.frameCursorBlink = frameCount;
			}
		}
		if (keyboard.key == "ArrowRight") {
			if (this.loginMode) {
				this.passwordCursorPos = Math.min(this.passwordCursorPos + 1, this.passwordField.length);
				this.frameCursorBlink = frameCount;
			}
		}
	},
	
	keyType: function() {
		if (this.loginMode) {
			let password = this.passwordField;
			let cursorPos = this.passwordCursorPos;

			if (keyboard.key == "Backspace") {
				this.passwordField = password.slice(0, Math.max(cursorPos - 1, 0)) +
									 password.slice(cursorPos, password.length);
				
				this.passwordCursorPos = Math.max(this.passwordCursorPos - 1, 0);
				this.frameCursorBlink = frameCount;
			}
			else if (keyboard.key == "Delete") {
				this.passwordField = password.slice(0, cursorPos) +
									 password.slice(Math.min(cursorPos + 1, password.length), password.length);
				
				this.frameCursorBlink = frameCount;
			}
			else {
				this.passwordField = password.slice(0, cursorPos) + keyboard.key + 
									 password.slice(cursorPos, password.length);
				
				this.passwordCursorPos++;
				this.frameCursorBlink = frameCount;
				this.passwordWrong = false;
			}
		}
		else {
			this.goToLogin();
		}
	}
};

function LoginScreen() {
	this.w = width;
	this.h = height;
	
	this.loginMode = false;
	this.passwordField = "";
	this.passwordWrong = false;
	this.passwordVisible = false;
	this.checkingPassword = false;
	this.passwordCursorPos = 0;
	this.passwordScroll = 0;
	
	this.canEnterLogin = true;
	this.canExitLogin = false;

	this.frameCursorBlink = 0;
	
	if (Style.background) {
		this.imgBG = Style.background;
	}
	else {
		this.imgBG = loadImage("backgrounds", "AvdanOSWallpaper");
	}
	
	this.icProfile = loadIcon("Start", "DefaultProfilePicture", 128, 128);
	this.icEnter = loadIcon("global", "Forward", 12, 12);
	this.icSeePassword = loadIcon("Login", "SeePassword", 12, 12);
	this.icHidePassword = loadIcon("Login", "HidePassword", 12, 12);
	
	this.animLockAlpha = 1,
	this.animLockY = 0;
	this.animLoginAlpha = 0;
	this.animLoginBG = 0;

	this.hover = {
		enter: false
	};

	Animator.addAnimation({
		target: this.transform,
		property: "opacity",
		drawable: this,
		interpolation: Animator.createCubicBezier(0.9, 1),
		a: 0,
		b: 1,
		duration: 0.7
	});
	
	this.initCanvas();
}

LoginScreenProto.__proto__ = Drawable;
setPrototype(LoginScreen, LoginScreenProto);
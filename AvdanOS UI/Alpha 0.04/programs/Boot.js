var BootScreenProto = {
	draw: function(ctx) {
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, this.w, this.h);

		ctx.globalAlpha = this.videoOpacity;

		ctx.drawImage(this.video, this.w / 2 - 512 / 2, this.h / 2 - 512 / 2);
		
		ctx.fillStyle = "#888";
		ctx.font = "18px sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("Loading AvdanOS UI", this.w / 2, this.h / 2 + 240);

		ctx.globalAlpha = 1;
		
		this.invalidate();
	},
	
	drawOld: function(ctx) {
		ctx.fillStyle = "#000";
		//ctx.fillRect(0, 0, this.w, this.h);
		
		let cx = this.w / 2;
		let cy = this.h / 2;
		let l = cx - 128;
		let r = cx + 128;
		let t = cy - 128;
		let b = cy + 128;
		let time = frameCount * 0.02;
		
		let circ = (rad) => {
			return {
				x: this.w / 2 + Math.sin(rad) * 128,
				y: this.h / 2 - Math.cos(rad) * 128,
			}
		};
		
		let circ1 = circ(time);
		let circ2 = circ(time + Math.PI);
		
		let gr1_x1 = time < Math.PI ? cx : circ2.x;
		let gr1_y1 = time < Math.PI ? t : circ2.y;
		let gr1_x2 = circ1.x;
		let gr1_y2 = circ1.y;
		let gr2_x1 = time < Math.PI ? cx : circ1.x;
		let gr2_y1 = time < Math.PI ? b : circ1.y;
		let gr2_x2 = circ2.x;
		let gr2_y2 = circ2.y;
		
		var gr = ctx.createLinearGradient(gr1_x1, gr1_y1, gr1_x2, gr1_y2);
		gr.addColorStop(0, "#D44273");
		gr.addColorStop(1, "#0000");
		ctx.strokeStyle = gr;
		
		ctx.filter = "none";
		
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(cx, cy, 128, -0.5 * Math.PI + time, 0.5 * Math.PI + time);
		ctx.stroke();
		
		gr = ctx.createLinearGradient(gr2_x1, gr2_y1, gr2_x2, gr2_y2);
		gr.addColorStop(0, "#D44273");
		gr.addColorStop(1, "#0000");
		ctx.strokeStyle = gr;
		
		ctx.beginPath();
		ctx.arc(cx, cy, 128, 0.5 * Math.PI + time, 1.5 * Math.PI + time);
		ctx.stroke();
		
		ctx.filter = "none";
		
		this.invalidate();
	},

	end: function() {
		if (this.startFade >= 0) {
			Animator.cancelAnimation(this.startFade);
		}

		Animator.addAnimation({
			target: this,
			property: "videoOpacity",
			drawable: this,
			b: 0,
			duration: 0.5,
			onFinish: function() {
				document.body.removeChild(boot.bootRing);
				document.body.removeChild(boot.bootRing2);
				loadLogin();
			}
		});
	}
};

function BootScreen() {
	this.w = width;
	this.h = height;
	
	this.videoOpacity = 0;

	let ring1 = loadVideo("Boot.mp4");
	ring1.width = 512;
	ring1.height = 512;
	ring1.muted = true;
	ring1.autoplay = true;
	ring1.loop = false;
	ring1.style.opacity = "0.0";
	ring1.addEventListener("ended", () => {
		this.video = this.bootRing2;
		this.video.play();
	});
	
	let ring2 = loadVideo("Boot2.mp4");
	ring2.width = 512;
	ring2.height = 512;
	ring2.muted = true;
	ring2.loop = true;
	ring2.preload = "auto";
	ring2.style.opacity = "0.0";
	
	document.body.appendChild(ring1);
	document.body.appendChild(ring2);
	
	this.bootRing = ring1;
	this.bootRing2 = ring2;
	
	this.video = ring1;

	this.startFade = Animator.addAnimation({
		target: this,
		property: "videoOpacity",
		drawable: this,
		b: 1,
		duration: 0.5,
		onFinish: a => a.target.startFade = -1
	});

	this.initTransform();
	this.initCanvas();
}

BootScreenProto.__proto__ = Drawable;
setPrototype(BootScreen, BootScreenProto);
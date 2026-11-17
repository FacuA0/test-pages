var Animator = {
	anims: [],
	index: 1,
	animate: function() {
		for (var i = 0; i < this.anims.length; i++) {
			var anim = this.anims[i];
			
			let time = new Date().getTime() / 1000;
			let x = Math.max(0, Math.min(1, (time - anim.start) / anim.duration));

			let lerp = anim.interpolation;
			if (typeof lerp == "object") {
				anim.target[anim.property] = lerp.func(anim.a, anim.b, x, ...lerp.args);
			}
			else {
				anim.target[anim.property] = lerp(anim.a, anim.b, x);
			}
			
			if (anim.onAnimate) anim.onAnimate(anim.target, x);
			
			if (time > anim.start + anim.duration) {
				this.anims.splice(i, 1);
				if (anim.onFinish) anim.onFinish(anim);
				i--;
			}
			
			if (anim.drawable) {
				anim.drawable.invalidate();
			}
		}
	},
	
	addAnimation: function(anim) {
		if (!(anim.target && anim.property && anim.target[anim.property] != undefined)) {
			console.warn("An animation was not added because there's no 'target' or 'property' field.");
			return 0;
		}
		if (!(anim.b != undefined && anim.duration != undefined)) {
			console.warn("An animation was not added because there's no 'b' or 'duration' field.");
			return 0;
		}
		
		let start = new Date().getTime() / 1000;
		anim.start = start + (anim.start ?? 0);

		anim.index = this.index++;
		if (this.index > 1000000) this.index = 1;
		
		if (anim.interpolation == undefined) anim.interpolation = this.linear;
		if (anim.a == undefined) anim.a = anim.target[anim.property];
		this.anims.push(anim);

		return anim.index;
	},

	cancelAnimation: function(index) {
		let anim = this.anims.findIndex(a => a.index == index);
		if (anim != -1) {
			this.anims.splice(anim, 1);
		}
		else {
			console.warn("A non-existent animation was cancelled: index " + index);
		}
	},

	createBezierOld(p1, p2) {
		var bezierObject = {
			args: [p1, p2],
			func: this.bezierOld
		};

		return bezierObject;
	},

	createBezier(px, py) {
		var bezierObject = {
			args: [px, py],
			func: this.quadraticBezier
		};

		return bezierObject;
	},

	createCubicBezier(p1, p2) {
		var bezierObject = {
			args: [p1, p2],
			func: this.cubicBezier
		};

		return bezierObject;
	},
	
	bezierOld: function(a, b, x, p1, p2) {
		// Line 1: 0, 0, p1, p2
		let l1_x1 = 0;
		let l1_y1 = 0;
		let l1_x2 = p1;
		let l1_y2 = p2;
		
		// Line 2: p1, p2, 1, 1
		let l2_x1 = p1;
		let l2_y1 = p2;
		let l2_x2 = 1;
		let l2_y2 = 1;

		if (x <= 0) return a;
		else if (x >= 1) return b;

		let t = x;
		let nx = -1;
		let i = 0.5;
		console.log("start", x);
		console.log(t, i, nx);

		// The loop explores the nearest X point of the curve in relation to the x input.
		while (Math.abs(nx - x) > 0.0001) {
			// Calculate X points of 3rd line
			let l3_x1 = Animator.linear(l1_x1, l1_x2, t);
			let l3_x2 = Animator.linear(l2_x1, l2_x2, t);
			
			nx = Animator.linear(l3_x1, l3_x2, t);

			console.log(nx.toFixed(6) + " - " + x.toFixed(6) + " = " + (nx - x));

			if (nx - x > 0) t -= i;
			else t += i;

			i /= 2;

			console.log(t, i, nx);
			if (i < 1e-16) break;
		}
		
		// Y points of 3rd line (now with an accurate X-coordinate)
		let l3_y1 = Animator.linear(l1_y1, l1_y2, t);
		let l3_y2 = Animator.linear(l2_y1, l2_y2, t);
		
		// Final unit value: lin(l3_y1, l3_y2, x)
		let ny = Animator.linear(l3_y1, l3_y2, t);
		
		return Animator.linear(a, b, ny);
	},

	// Renewed to REAL quadratic bezier curve
	quadraticBezier(a, b, x, px, py) {
		let li1_y1 = 0;
		let li1_y2 = py;
		
		let li2_y1 = py;
		let li2_y2 = 1;
		
		let t = x;

		// If px == 0.5, the equation's no longer quadratic and becomes x = t
		if (px != 0.5) {
			let fa = (-2 * px + 1);
			let fb = 2 * px;

			// Quadratic formula
			let t1 = (-fb + Math.sqrt(fb * fb + 4 * fa * x)) / (2 * fa);
			let t2 = (-fb - Math.sqrt(fb * fb + 4 * fa * x)) / (2 * fa);
			
			if (t1 >= 0 && t1 <= 1) t = t1;
			else t = t2;
		}
		
		let li3_y1 = Animator.linear(li1_y1, li1_y2, t);
		let li3_y2 = Animator.linear(li2_y1, li2_y2, t);
		let ny = Animator.linear(li3_y1, li3_y2, t);
		
		return Animator.linear(a, b, ny);
	},

	// Needs to be reworked
	cubicBezier: function(a, b, x, p1, p2) {
		let v1 = Animator.linear(0, p1, x); 
		let v2 = Animator.linear(p1, p2, x);
		let v3 = Animator.linear(p2, 1, x);

		let x1 = Animator.linear(v1, v2, x); 
		let x2 = Animator.linear(v2, v3, x);
		
		let t = Animator.linear(x1, x2, x);
		return Animator.linear(a, b, t);
	},
	
	cosine: function(a, b, x) {
		var cos = (1 - Math.cos(x * Math.PI)) / 2;
		return Animator.linear(a, b, cos);;
	},
	
	linear: function(a, b, x) {
		return a + (b - a) * x;
	}
};

/*
Animation {
	target: object,
	property: number,
	drawable: object (optional),
	interpolation: function, (optional, auto)
	a: number, (optional, auto)
	b: number,
	start: seconds, (auto)
	duration: seconds,
	index: number, (auto)
	onAnimate: function (optional)
	onFinish: function(Animation) (optional)
}
*/
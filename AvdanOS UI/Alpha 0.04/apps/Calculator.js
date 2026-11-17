var CalculatorAppProto = {
	w: 340,
	h: 520,
	minW: 300,
	minH: 300,
	title: "Calculator",
	
	buttons: [
		".", "0", "=", "+",
		"1", "2", "3", "-",
		"4", "5", "6", "*",
		"7", "8", "9", "/",
		"C", "<", "(", ")"
	],
	
	draw: function(ctx) {
		let q = (this.w - 4) / 4;
		let bw = q - 4;
		let bh = (this.h - 124) / 5 - 4;
		
		let displayColor = this.error ? "#F00" : Style.textColor;
		setTextStyle(ctx, displayColor, "24px sans-serif", "right", "middle");
		ctx.fillText(this.calcText, this.w - 20, 62);
		
		ctx.fillStyle = "#FFF1";
		for (let i = 1; i <= 5; i++) {
			for (let j = 0; j < 4; j++) {
				let index = -4 + i * 4 + j;
				
				ctx.fillStyle = this.hoverButtons[index] ? Style.buttonColor : Style.buttonFaintColor;
				fillRoundedRect(ctx, 4 + bw * j + 4 * j, this.h - bh * i - 4 * i, bw, bh, 4);
				
				let tx = 4 + q * (j + 0.5);
				let ty = this.h - bh * (i - 0.5) - 4 * i;
				
				setTextStyle(ctx, Style.textColor, "18px sans-serif", "center", "middle");
				ctx.fillText(this.buttons[index], tx, ty);
			}
		}
		
		this.validated = true;
	},
	
	mouseExit: function() {
		let inval = false;
		
		for (var i = 0; i < this.hoverButtons.length; i++) {
			inval = inval || this.hoverButtons[i];
			this.hoverButtons[i] = false;
		}
		
		if (inval) this.invalidate();
	},
	
	mouseMove: function() {
		let inval = false;
		
		let q = (this.w - 4) / 4;
		let bw = q - 4;
		let bh = (this.h - 124) / 5 - 4;
		
		for (let i = 1; i <= 5; i++) {
			for (let j = 0; j < 4; j++) {
				let index = -4 + i * 4 + j;
				
				let temp = this.hoverButtons[index];
				this.hoverButtons[index] = this.detectMouse(4 + bw * j + 4 * j, this.h - bh * i - 4 * i, bw, bh);
				inval = inval || this.hoverButtons[index] != temp;
			}
		}
		
		if (inval) this.invalidate();
	},
	
	mouseClick: function() {
		for (var i = 0; i < this.hoverButtons.length; i++) {
			if (this.hoverButtons[i]) {
				let button = this.buttons[i];

				if (this.error) {
					this.error = false;
					this.calcText = "";
				}
				
				if (button == "<") {
					this.eraseCharacter();
				}
				else if (button == "C") {
					this.calcText = "";
				}
				else if (button == "=") {
					this.calculate();
				}
				else {
					this.calcText += button;
				}
				
				this.invalidate();
				break;
			}
		}
	},

	keyDown: function() {
		let key = keyboard.key;
		
		if (key == "Enter" || key == "=") {
			this.calculate();
		}
		else if (key == "Escape") {
			this.error = false;
			this.calcText = "";
		}

		this.invalidate();
	},
	
	keyType: function() {
		let key = keyboard.key;

		if (this.error) {
			this.error = false;
			this.calcText = "";
		}
		
		if (key == "Backspace" && this.calcText != "") {
			this.eraseCharacter();
		}
		else if (this.buttons.includes(key) && key != "C" && key != "=") {
			this.calcText += key;
		}
		
		this.invalidate();
	},
	
	calculate: function() {
		var input = this.calcText;
		
		/*
		var nums = [];
		var op = [];
		
		var nextNum = "";
		for (var i = 0; i < input.length; i++) {
			let d = input.charAt(i);
			
			if (d == "+" || d == "-" || d == "*" || d == "/" || d == "(" || d == ")") {
				if (nextNum != "") {
					nums.push(parseInt(nextNum));
					nextNum = "";
				}
				op.push(d);
			}
			else {
				nextNum += d;
			}
		}
		
		if (nextNum != "") {
			nums.push(parseInt(nextNum));
		}
		
		var res = 0;
		for (let i = 0, n = 0, a = 0; i < nums.length; i++) {
			n = nums[i];
			
			a = n;
			if (i == 0) {
				res = a;
				continue;
			}
			
			switch (op[i - 1]) {
				case "+":
					res += a;
					break;
				
				case "-":
					res -= a;
					break;
				
				case "*":
					res *= a;
					break;
				
				case "/":
					res /= a;
					break;
				
				default: break;
			}
		}
		*/
		try {
			var res = calcPart(input, 0);
			this.calcText = res.toString();
		}
		catch (err) {
			this.error = true;
			this.calcText = "There was an error";
		}
		
		function calcPart(str, iop) {
			var ops = ["+-", "*/"];
			var det = ops[iop].split("");
			
			for (var i = 0, ch = ""; i < str.length; i++) {
				ch = str.charAt(i);
				var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
				
				if (!digits.includes(ch) && ch != "." && (ch != "-" || i != 0)) {
					break;
				}
				
				if (i == str.length - 1) {
					return Number.parseFloat(str);
				}
			}
			
			var parenthesesCount = 0;
			var nums = [], sNums = [];
			var ops = [];
			var cNum = "";
			var isNum = true;
			for (var i = 0, c = "", pc = ""; i < str.length; i++) {
				pc = c;
				c = str.charAt(i);
				
				if (c == "(") {
					parenthesesCount++;
				}
				else if (c == ")") {
					parenthesesCount--;

					if (parenthesesCount < 0) {
						throw new Error("Invalid syntax, parentheses not open");
					}
				}
				
				if (det.includes(c) && !det.includes(pc) && pc != "" && parenthesesCount == 0) {
					ops.push(c);
					sNums.push(cNum);
					cNum = "";
					isNum = false;
				}
				else {
					cNum += c;
				}
				
				if (i == str.length - 1) {
					sNums.push(cNum);
					cNum = "";

					if (parenthesesCount > 0) {
						throw new Error("Invalid syntax, parentheses not closed");
					}
				}
			}
			
			for (p of sNums) {
				if (p.length == 0) {
					throw new Error("Invalid syntax");
				}

				if (iop == 1 && p.startsWith("(") && p.endsWith(")")) {
					p = p.slice(1, -1);
				}

				nums.push(calcPart(p, 1 - iop));
			}
			
			var res = nums[0];
			for (var i = 0; i < ops.length; i++) {
				res = Function("return arguments[0] " + ops[i] + "arguments[1];")(res, nums[i + 1]);
			}
			
			return res;
		}
	},
	
	eraseCharacter: function() {
		this.calcText = this.calcText.slice(0, -1);
	}
};

function CalculatorApp() {
	this.hoverButtons = [
		false, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false
	];
	
	this.calcText = "";
	this.error = false;
}

CalculatorAppProto.__proto__ = App;
setPrototype(CalculatorApp, CalculatorAppProto);
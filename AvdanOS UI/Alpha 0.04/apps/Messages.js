var MessagesAppProto = {
	w: 600,
	h: 400,
	title: "Messages",
	
	// TODO: Declare in constructor and use storage system for persisence
	chats: [
		{
			name: "Name 1",
			lastMessage: "I don't know...",
			time: "12:00",
			chat: [
				{
					time: "11:56",
					message: "Hi.",
					owner: false
				},{
					time: "11:58",
					message: "Hi!",
					owner: true
				},{
					time: "11:59",
					message: "I have a question...",
					owner: false
				},{
					time: "11:59",
					message: "Okay, what is it?",
					owner: true
				},{
					time: "12:00",
					message: "Why are all conversations exactly the same?",
					owner: false
				},{
					time: "12:00",
					message: "I don't know...",
					owner: true
				}
			]
		},{
			name: "Name 2",
			lastMessage: "I don't know...",
			time: "11:00",
			chat: [
				{
					time: "10:56",
					message: "Hi.",
					owner: false
				},{
					time: "10:58",
					message: "Hi!",
					owner: true
				},{
					time: "10:59",
					message: "I have a question...",
					owner: false
				},{
					time: "10:59",
					message: "Okay, what is it?",
					owner: true
				},{
					time: "11:00",
					message: "Why are all conversations exactly the same?",
					owner: false
				},{
					time: "11:00",
					message: "I don't know...",
					owner: true
				}
			]
		},{
			name: "Name 3",
			lastMessage: "I don't know...",
			time: "10:00",
			chat: [
				{
					time: "9:56",
					message: "Hi.",
					owner: false
				},{
					time: "9:58",
					message: "Hi!",
					owner: true
				},{
					time: "9:59",
					message: "I have a question...",
					owner: false
				},{
					time: "9:59",
					message: "Okay, what is it?",
					owner: true
				},{
					time: "10:00",
					message: "Why are all conversations exactly the same?",
					owner: false
				},{
					time: "10:00",
					message: "I don't know...",
					owner: true
				}
			]
		},{
			name: "Name 4",
			lastMessage: "I don't know...",
			time: "9:00",
			chat: [
				{
					time: "8:56",
					message: "Hi.",
					owner: false
				},{
					time: "8:58",
					message: "Hi!",
					owner: true
				},{
					time: "8:59",
					message: "I have a question...",
					owner: false
				},{
					time: "8:59",
					message: "Okay, what is it?",
					owner: true
				},{
					time: "9:00",
					message: "Why are all conversations exactly the same?",
					owner: false
				},{
					time: "9:00",
					message: "I don't know...",
					owner: true
				}
			]
		},{
			name: "Name 5",
			lastMessage: "I don't know...",
			time: "8:00",
			chat: [
				{
					time: "7:56",
					message: "Hi.",
					owner: false
				},{
					time: "7:58",
					message: "Hi!",
					owner: true
				},{
					time: "7:59",
					message: "I have a question...",
					owner: false
				},{
					time: "7:59",
					message: "Okay, what is it?",
					owner: true
				},{
					time: "8:00",
					message: "Why are all conversations exactly the same?",
					owner: false
				},{
					time: "8:00",
					message: "I don't know...",
					owner: true
				}
			]
		},{
			name: "Name 6",
			lastMessage: "Oh, you're right!",
			time: "7:01",
			chat: [
				{
					time: "6:56",
					message: "Hi.",
					owner: true
				},{
					time: "6:58",
					message: "Hi!",
					owner: false
				},{
					time: "6:59",
					message: "I have a question...",
					owner: true
				},{
					time: "6:59",
					message: "Okay, what is it?",
					owner: false
				},{
					time: "7:00",
					message: "Why are all conversations exactly the same?",
					owner: true
				},{
					time: "7:00",
					message: "They are not the same. This one is different...",
					owner: false
				},{
					time: "7:01",
					message: "Oh, you're right!",
					owner: true
				}
			]
		}
	],
	
	draw: function(ctx) {
		this.splitPanels = this.w >= 512;
		this.wPanel = this.splitPanels ? 220 : 0;
		
		this.setIconColor(Style.iconColor);
		
		if (!this.messagesScreen || this.splitPanels) {
			this.drawChats(ctx);
		}
		
		if (this.messagesScreen || this.splitPanels) {
			this.drawMessages(ctx);
		}
		
		this.validated = true;
	},
	
	drawChats: function(ctx) {
		var chatsWidth = this.chatsWidth = this.splitPanels ? this.wPanel : this.w;
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, 6, 6, chatsWidth - 12, 20, 4);
		
		this.drawIcon(ctx, this.icSearch, chatsWidth - 24, 10);
		
		setTextStyle(ctx, Style.softTextColor, "11px sans-serif", "left", "middle");
		ctx.fillText("Search", 14, 17);
		
		ctx.save();
		ctx.beginPath();
		ctx.rect(6, 34, chatsWidth - 12, this.h - 34);
		ctx.clip();
		
		this.chats.forEach((chat, i) => {
			var baseY = 34 - this.scrollChats;
			
			if (i == this.currentChatIndex) {
				ctx.fillStyle = Style.buttonColor;
				fillRoundedRect(ctx, 6, baseY + i * 64, chatsWidth - 12, 64, 4);
			}
			
			if (i == this.hoverChat) {
				ctx.fillStyle = "#FFF1";
				fillRoundedRect(ctx, 6, baseY + i * 64, chatsWidth - 12, 64, 4);
			}
			
			setTextStyle(ctx, Style.textColor, "bold 12px sans-serif", "left", "top");
			ctx.fillText(chat.name, 62, baseY + 10 + i * 64);
			
			setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "top");
			ctx.fillText(chat.lastMessage, 62, baseY + 26 + i * 64);
			
			setTextStyle(ctx, Style.softTextColor, "10px sans-serif", "right", "top");
			ctx.fillText(chat.time, chatsWidth - 12, baseY + 12 + i * 64);
			
			ctx.drawImage(this.icPictures, 10, baseY + 10 + i * 64);
		});
		
		ctx.restore();
		
		let viewportHeight = this.h - 34;
		let contentHeight = this.chats.length * 64;
		let barHeight = viewportHeight - 2;
		
		this.maxScrollChats = Math.max(0, contentHeight - viewportHeight);
		
		let sliderHeight = barHeight * (viewportHeight / contentHeight);
		let sliderY = 34 + (barHeight - sliderHeight) * (this.scrollChats / this.maxScrollChats);
		
		if (sliderHeight < barHeight && this.scrollChatsVisible) {
			// Scrollbar
			ctx.fillStyle = Style.windowCoverColor;
			fillRoundedRect(ctx, chatsWidth - 3, 34, 3, barHeight, 2);
		
			// Scrollbar slider
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, chatsWidth - 3, sliderY, 3, sliderHeight, 2);
		}
	},
	
	drawMessages: function(ctx) {
		var chat = this.currentChat;
		var chatX = this.msjX = this.splitPanels ? this.wPanel : 0;
		var chatWidth = this.msjWidth = this.splitPanels ? this.w - this.wPanel : this.w;
		
		if (!chat) {
			setTextStyle(ctx, Style.softTextColor, "11px sans-serif", "center", "middle");
			ctx.fillText("There's no chat selected.", chatX + chatWidth / 2, this.h / 2);
			
			return;
		}
		
		// Chat Background
		ctx.fillStyle = Style.windowCoverColor;
		fillRoundedRect(ctx, chatX + 6, 6, chatWidth - 12, this.h - 12, 6);
		
		if (!this.splitPanels) {
			// Back button
			ctx.fillStyle = this.hoverBack ? Style.buttonHoverColor : Style.buttonColor;
			fillRoundedRect(ctx, chatX + 14, 14, 22, 32, 6);
			
			this.drawIcon(ctx, this.icChatBack, chatX + 17, 22);
		}
		
		// Top bar
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, chatX + (this.splitPanels ? 14 : 42), 14, chatWidth - (this.splitPanels ? 28 : 56), 32, 6);
		
		// Profile picture
		ctx.drawImage(this.icChatPicture, chatX + (this.splitPanels ? 20 : 48), 18);
		
		// Contact name
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "middle");
		ctx.fillText(chat.name, chatX + (this.splitPanels ? 52 : 80), 31);
		
		// Info button
		this.drawIcon(ctx, this.icChatInfo, this.w - 38, 22);
		
		ctx.save();
		ctx.beginPath();
		ctx.rect(chatX + 12, 50, chatWidth, this.h - 96);
		ctx.clip();
		
		setTextStyle(ctx, Style.textColor, "12px sans-serif", "left", "hanging");
		chat.chat.forEach((message, i, chatList) => {
			let x = message.owner ? this.w - 24 : chatX + 28;
			let y = 65 + i * 40 - (this.maxScrollMessages - this.scrollMessages);
			let w = ctx.measureText(message.message).width;
			let align = message.owner ? "right" : "left";
			
			ctx.fillStyle = message.owner ? Style.buttonColor : Style.accentColor;
			fillRoundedRect(ctx, message.owner ? x - w - 8 : x - 8, y - 9, w + 16, 28, 6);
			setTextStyle(ctx, Style.textColor, "12px sans-serif", align, "top");
			ctx.fillText(message.message, x, y);
		});
		
		ctx.restore();
		
		ctx.fillStyle = Style.buttonColor;
		fillRoundedRect(ctx, chatX + 16, this.h - 42, chatWidth - 32, 24, 6);
		
		setTextStyle(ctx, this.textBar == "" ? Style.softTextColor : Style.textColor, "11px sans-serif", "left", "middle");
		ctx.fillText(this.textBar == "" ? "Type a new message" : this.textBar, chatX + 24, this.h - 29);
		
		this.drawIcon(ctx, this.icChatEmoji, this.w - 40, this.h - 38);
		
		
		let viewportHeight = this.h - 96;
		let contentHeight = chat.chat.length * 40 + 14;
		let barHeight = viewportHeight;
		
		this.maxScrollMessages = Math.max(0, contentHeight - viewportHeight);
		
		let sliderHeight = barHeight * (viewportHeight / contentHeight);
		let sliderY = 50 + (barHeight - sliderHeight) * (1 - this.scrollMessages / this.maxScrollMessages);
		
		if (sliderHeight < barHeight && this.scrollMessagesVisible) {
			// Scrollbar
			ctx.fillStyle = Style.windowCoverColor;
			fillRoundedRect(ctx, this.w - 12, 50, 2, barHeight, 1);
		
			// Scrollbar slider
			ctx.fillStyle = Style.buttonColor;
			fillRoundedRect(ctx, this.w - 12, sliderY, 2, sliderHeight, 1);
		}
	},
	
	limitChatScroll: function() {
		this.maxScrollChats = Math.max(0, this.chats.length * 64 - (this.h - 34));
		this.scrollChats = Math.min(this.maxScrollChats, this.scrollChats);
		this.scrollChats = Math.max(0, this.scrollChats);
		
		this.invalidate();
	},
	
	limitMessageScroll: function() {
		this.maxScrollMessages = Math.max(0, this.currentChat.chat.length * 40 + 14 - (this.h - 96));
		this.scrollMessages = Math.min(this.maxScrollMessages, this.scrollMessages);
		this.scrollMessages = Math.max(0, this.scrollMessages);
		
		this.invalidate();
	},
	
	checkHoverMessages: function() {
		if (!this.messagesScreen && !this.splitPanels) return false;
		
		var inval = false;
		var preHoverBack = this.hoverBack;
		let preScrollMessagesVisible = this.scrollMessagesVisible;
		
		this.hoverBack = this.detectMouse(this.msjX + 14, 14, 22, 32, 6);
		this.scrollMessagesVisible = this.detectMouse(this.msjX + 6, 6, this.msjWidth - 12, this.h - 12);
		
		inval = inval || this.hoverBack != preHoverBack;
		inval = inval || this.scrollMessagesVisible != preScrollMessagesVisible;
		
		return inval;
	},
	
	checkHoverChats: function() {
		if (this.messagesScreen && !this.splitPanels) return false;
		
		let inval = false;
		let preHoverChat = this.hoverChat;
		let preScrollChatsVisible = this.scrollChatsVisible;
		
		this.hoverChat = -1;
		for (let i = 0; i < this.chats.length; i++) {
			if (!this.detectMouse(0, 34, this.chatsWidth, this.h - 34)) break;
			
			if (this.detectMouse(6, 34 - this.scrollChats + i * 64, this.chatsWidth - 12, 64)) {
				this.hoverChat = i;
			}
		}
		
		this.scrollChatsVisible = this.detectMouse(0, 34, this.chatsWidth, this.h - 34);
		
		inval = inval || preHoverChat != this.hoverChat;
		inval = inval || this.scrollChatsVisible != preScrollChatsVisible;
		
		return inval;
	},
	
	mouseMove: function() {
		var inval = false;
		
		inval = inval || this.checkHoverChats();
		inval = inval || this.checkHoverMessages();
		
		if (inval) {
			this.invalidate();
		}
	},
	
	mouseClick: function() {
		
		// When a list item is selected
		if (!this.messagesScreen || this.splitPanels) {
			if (this.hoverChat != -1) {
				this.currentChatIndex = this.hoverChat;
				this.currentChat = this.chats[this.currentChatIndex];
				this.messagesScreen = true;
				this.limitMessageScroll();
				
				this.invalidate();
			}
		}
		
		// When back button is pressed
		else if (this.messagesScreen || this.splitPanels) {
			if (this.hoverBack) {
				this.messagesScreen = false;
				this.hoverBack = false;
				this.currentChatIndex = -1;
				this.currentChat = null;
				this.limitChatScroll();
				
				this.invalidate();
			}
		}
	},
	
	mouseExit: function() {
		this.scrollChatsVisible = false;
		this.scrollMessagesVisible = false;
		this.hoverChat = -1;
		
		this.invalidate();
	},
	
	mouseWheel: function() {
		if (!this.messagesScreen || this.splitPanels) {
			if (this.detectMouse(0, 34, this.chatsWidth, this.h - 34)) {
				this.scrollChats += mouse.wheelDelta;
				
				this.limitChatScroll();
				this.mouseMove();
			};
		}
		
		if (this.messagesScreen || this.splitPanels) {
			if (this.detectMouse(this.msjX + 12, 54, this.msjWidth, this.h - 96)) {
				this.scrollMessages -= mouse.wheelDelta;
				
				this.limitMessageScroll();
				this.mouseMove();
			}
		}
	},
	
	keyType: function() {
		let letter = keyboard.key;
		
		if (letter == "Backspace") {
			this.textBar = this.textBar.substr(0, this.textBar.length - 1)
		}
		else {
			this.textBar += letter;
		}
	},
	
	keyDown: function() {
		if (keyboard.key != "Enter") return;
		if (this.textBar == "") return;
		
		var time = new Date().getHours() + ":" + new Date().getMinutes();
		
		this.currentChat.chat.push({
			time: time,
			message: this.textBar,
			owner: true
		});
		
		this.currentChat.lastMessage = this.textBar;
		this.currentChat.time = time;
		
		this.textBar = "";
	},
	
	windowResize: function() {
		this.limitChatScroll();
		this.limitMessageScroll();
	}
};

function MessagesApp() {
	this.icSearch = loadIcon("global", "Search", 12, 12);
	this.icPictures = loadIcon("Start", "DefaultProfilePicture", 44, 44);
	this.icChatBack = loadIcon("global", "Back", 16, 16);
	this.icChatPicture = loadIcon("Start", "DefaultProfilePicture", 24, 24);
	this.icChatInfo = loadIcon("Messages", "Info", 16, 16);
	this.icChatEmoji = loadIcon("Messages", "Emoji", 16, 16);
	
	this.splitPanels = true;
	this.messagesScreen = true;
	
	this.textBar = "";
	
	this.hoverChat = -1;
	this.hoverBack = false;
	this.scrollChatsVisible = false;
	this.scrollMessagesVisible = false;
	this.scrollChats = 0;
	this.scrollMessages = 0;
	this.maxScrollChats = 0;
	this.maxScrollMessages = 0;
	
	this.chatsWidth = 0;
	this.msjX = 0;
	this.msjWidth = 0;
	this.wPanel = 0;
	
	this.currentChatIndex = 0;
	this.currentChat = null;
	
	this.currentChatIndex = 0;
	this.currentChat = this.chats[this.currentChatIndex];
}

MessagesAppProto.__proto__ = App;
setPrototype(MessagesApp, MessagesAppProto);
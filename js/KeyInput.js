class KeyInput {
	constructor(objects) {
		this.objects = objects;
		this.keysPressed = [];
		this.touchEvent = null;
		this.registerKeyPress();
		this.registerTouch();
		this.listening = false;
		this.mobileSetting = false;
	}

	start() {
		this.listening = true;
	}

	stop() {
		this.listening = false;
		this.keysPressed = [];
	}

	registerKeyPress() {
		let self = this;
		document.addEventListener('keydown', function(e) {
			if(self.listening) {
				self.keysPressed[e.key] = true;
			}
		});
		document.addEventListener('keyup', function(e) {
			if(self.listening) {
				self.keysPressed[e.key] = false;
			}
		});
	}

	registerTouch() {
		document.addEventListener('touchstart', (e) => {
			this.touchEvent = e.touches[0];
			this.mobileSetting = true;
		});
		document.addEventListener('touchend', (e) => {
			this.touchEvent = null;
		});
		document.addEventListener('touchcancel', (e) => {
			this.touchEvent = null;
		});
		document.addEventListener('touchmove', (e) => {
			this.touchEvent = e.changedTouches[0];
		});
	}

	updateObjects() {
		if(this.mobileSetting) {
			this.objects.forEach(o => o.touchDown(this.touchEvent));
		} else {
			this.objects.forEach(o => o.keyDown(this.keysPressed));
		}
	}
}
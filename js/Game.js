class Game {

	SPEED = 0.2;

	constructor(id) {
		this.canvas = new Canvas(id);
		this.running = false;
		let saveDate = new SaveDate("date", {x: this.canvas.getWidth()*0.8, y: this.canvas.getHeight()*0.2, dx: 0, dy: 0}, this);
		this.objects = [saveDate, new Boat("boat", {x: 50, y: 50, dx: 0, dy: 0}, this, saveDate)];
		this.gameState = new GameState(this);
		this.currentState = this.gameState;
	}

	toggle() {
		if(this.running) {
			this.stop();
		} else {
			this.start();
		}
	}

	changeState(state) {
		this.currentState.stop();
		this.currentState = state;
		this.currentState.start();
	}

	resume() {
		this.running = true;
		this.lastRender = performance.now();
		window.requestAnimationFrame((t) => {this.loop(t)});
	}

	start() {
		this.running = true;
		this.lastRender = performance.now();
		this.currentState.start();
		window.requestAnimationFrame((t) => {this.loop(t)});
	}

	stop() {
		this.running = false;
	}

	update(progress) {
		this.currentState.update(progress);
	}

	draw() {
		this.currentState.draw();
	}

	loop(timestamp) {
		let progress = timestamp - this.lastRender;
		this.lastRender = timestamp;
		if(this.running) {
			this.update(progress);
			this.draw();
			window.requestAnimationFrame((t) => {this.loop(t)});
		}
	}

}
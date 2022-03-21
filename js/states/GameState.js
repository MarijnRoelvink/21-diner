class GameState extends State{
	constructor(game) {
		super(game);
		this.objects = game.objects;
		this.keyInput = new KeyInput(this.objects);
		this.redraw = true;
		this.initialized = false;
	}

	start() {
		this.objects.forEach(o => {
			o.reset();
		});
		this.keyInput.start();
		this.canvas.clear();
	}

	stop() {
		this.keyInput.stop();
	}

	update(progress) {
		this.keyInput.updateObjects();
		this.redraw = false;
		let loaded = true;
		this.objects.forEach(o => {
			o.update(progress);
			if(o.changed) {
				this.redraw = true;
			}
			loaded = loaded && o.imageLoaded;
		});
		if(!this.initialized && loaded && this.canvas.imageLoaded) {
			this.redraw = true;
			this.initialized = true;
		}
	}

	draw() {
		if(this.redraw) {
			this.canvas.clear();
			this.canvas.drawBackground();
			this.objects.forEach((o) => {
				o.draw();
			});
		}
	}
}
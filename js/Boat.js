class Boat extends GameObject {

	static colors = ["#FFCE2E", "#7AB1E8", "#F87089", "#308167", "#E15F55"];
	static arrowIndexes = [
		{left: "ArrowLeft", right: "ArrowRight",
			up: "ArrowUp", down: "ArrowDown", leftIcon: "<", rightIcon: ">"},
		{left: "a", right: "d"},
		{left: "g", right: "j"},
		{left: ";", right: "Dead", rightIcon: "'"}];
	static width = 2;

	constructor(id, startCoor, game, saveDate) {
		super(id, startCoor, game);
		this.saveDate = saveDate;
		this.arrows = Boat.arrowIndexes[0]
		this.image = new Image();
		this.image.src = 'img/boat.png';
		this.imageLoaded = false;
		this.image.onload = () => {
			this.imageLoaded = true;
			this.changed = true;
		}
	}

	update(progress) {
		this.pos.update(progress, this.mov);
		this.checkCollide();
	}

	checkCollide() {
		let dx = this.saveDate.pos.x - this.pos.x;
		let xInRange = dx > 168 && dx < 235;
		let dy = this.saveDate.pos.y - this.pos.y;
		let yInRange = dy > 28 && dy < 85;
		if(xInRange && yInRange) {
			this.saveDate.save();
			this.image.src = 'img/boat_saved.png';
			$(".saved").css("display", "block");
		}
	}

	draw() {
		if(this.imageLoaded) {
			this.canvas.drawImg(this.pos.x, this.pos.y, this.image);
		}
	}

	keyDown(keys) {
		this.changed = false;

		if(keys[this.arrows.left]) {
			this.mov.x = -this.game.SPEED;
			this.changed = true;
		}
		else if(keys[this.arrows.right]) {
			this.mov.x = this.game.SPEED;
			this.changed = true;
		} else {
			this.mov.x = 0;
		}

		if(keys[this.arrows.up]) {
			this.mov.y = -this.game.SPEED;
			this.changed = true;
		}
		else if(keys[this.arrows.down]) {
			this.mov.y = this.game.SPEED;
			this.changed = true;
		} else {
			this.mov.y = 0;
		}
	}
}
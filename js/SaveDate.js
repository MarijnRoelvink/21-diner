class SaveDate extends GameObject {

	constructor(id, startCoor, game) {
		super(id, startCoor, game);
		this.image = new Image();
		this.image.src = 'img/date_panic.png';
		this.imageLoaded = false;
		this.isSaved = false;
		this.image.onload = () => {
			this.imageLoaded = true;
		}
	}

	update(progress) {
		this.pos.update(progress, this.mov);

	}

	save() {
		this.isSaved = true;
	}

	draw() {
		if(!this.isSaved && this.imageLoaded) {
			this.canvas.drawImg(this.pos.x, this.pos.y, this.image);
		}
	}
}
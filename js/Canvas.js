class Canvas {
	constructor(id) {
		this.id = id;
		this.canvas = document.getElementById(id);
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
		this.ctx = this.canvas.getContext("2d");
		this.imageLoaded = false;
		this.loadBackground();

	}

	getWidth() {
		return this.canvas.width;
	}

	getHeight() {
		return this.canvas.height;
	}

	loadBackground() {
		this.background = new Image();
		this.background.src = 'img/sea.png';
		this.background.onload = () =>{
			this.imageLoaded = true;
		}
	}

	drawBackground() {
		if(this.imageLoaded) {
			this.ctx.drawImage(this.background, 0, 0, this.getWidth(), this.getHeight())
		}
	}

	drawImg(x, y, img) {
		this.ctx.drawImage(img, x, y);
	}

	drawCircle(x, y, color, width) {
		let ctx = this.canvas.getContext("2d");
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(x, y, width, 0, 2 * Math.PI);
		ctx.fill();
	}

	drawTitle(text, x = -1, y = this.getHeight()/2, color="#fff") {
		if(x === -1) {
			x = this.getWidth()/2;
		}
		let ctx = this.canvas.getContext("2d");
		ctx.textAlign = 'center';
		ctx.font = '48px sans-serif';
		ctx.fillStyle = color;
		ctx.fillText(text, x, y);
	}

	drawSubTitle(text, x = -1, y = this.getHeight()/2 + 30, color="#fff") {
		if(x === -1) {
			x = this.getWidth()/2;
		}
		let ctx = this.canvas.getContext("2d");
		ctx.textAlign = 'center';
		ctx.font = '25px sans-serif';
		ctx.fillStyle = color;
		ctx.fillText(text, x, y);
	}

	clear() {
		let ctx = this.canvas.getContext("2d");
		ctx.fillStyle = $("body").css("background-color");
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	isOccupied(x, y) {
		let ctx = this.canvas.getContext("2d");
		let pixel = ctx.getImageData(x, y, 1, 1).data;
		return pixel[0] + pixel[1] + pixel[2] !== 0;
	}
}
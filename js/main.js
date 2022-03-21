
let game = {};

function init() {
	game = new Game("sea");
	game.start();
}
setTimeout(init, 500);
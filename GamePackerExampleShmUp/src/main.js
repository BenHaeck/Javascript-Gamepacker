let enemyHitable = null;
let player = null;

let enemies = null;

let bullets = null;
let pause = true;
let escWasPressed = false;

const EnemySpawner = {
	recov: 0,
	enemyAmount: 1,
	shouldSpawnEnemies: false,
	update () {
		if (this.shouldSpawnEnemies) {
			this.recov -= gameTime.dt;
			if (this.recov <= 0) {
				this.recov = 0.25;
				if (Math.random() > 0.3)
					enemies.push(new Enemy (Math.random() * screenWidth, 200));
				else
					enemies.push(new SmartEnemy (Math.random() * screenWidth, 200));

			}
			if (enemies.length >= this.enemyAmount)
				this.shouldSpawnEnemies = false;
		}
		else if (enemies.length <= 0) {
			this.enemyAmount++;
			this.shouldSpawnEnemies = true;
		}
	}
}

function start () {
	player = new Player (400, 400);
	enemyHitable = [player];
	EnemySpawner.enemyAmount = 1;
	enemies = []
	bullets = [];
}

start();

let shouldRestart = false;

function update () {
	if (keyInput.getKey("Escape") && !escWasPressed)
		pause = !pause;
	escWasPressed = keyInput.getKey("Escape");
	if (pause) return;
	EnemySpawner.update();
	for (let i = bullets.length - 1; i >= 0; i--){
		bullets[i].update (bullets, i);
	}

	for (let i = enemies.length - 1; i >= 0; i--){
		enemies[i].update (enemies, i);
		if (enemies[i].kill) {
			enemies.splice(i,1);
		}
	}

	player.update ();

	if (shouldRestart) {
		start();
		shouldRestart = false;
	}
}

function draw () {
	ctx.fillStyle = "black"
	ctx.fillRect (0,0,screenWidth,screenHeight);

	ctx.fillStyle = "#ee2";

	//ctx.fillRect (mouseInput.posX, mouseInput.posY,10,10);

	for (let i = bullets.length - 1; i >= 0; i--){
		bullets[i].draw ();
	}
	player.draw();
	for (let i = enemies.length - 1; i >= 0; i--){
		enemies[i].draw ();
	}
}
ctx.imageSmoothingEnabled = false;

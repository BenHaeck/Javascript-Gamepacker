
class SmartEnemy {
	constructor (posX, posY) {
		this.posX = posX;
		this.posY = posY;
		this.velX = 0;
		this.velY = 0;
		this.recov = 0;
		this.hitRecov = 0;
		this.actIn = 0;
		//this.shouldShoot = false;
		this.radius = 16;
		this.health = 5;
		this.kill = false;
	}

	update () {
		//if (this.shouldShoot)
		this.recov -= gameTime.dt;
		this.actIn -= gameTime.dt;
		if (this.hitRecov > 0) this.hitRecov -= gameTime.dt * 5; else this.hitRecov = 0;

		const plDistX = player.posX - this.posX;

		if (this.actIn < 0) {
			this.actIn = 1;
			this.velX = (Math.random() - 0.5) * 2 * 90;
			this.velY = (Math.random() - 0.5) * 2 * 45;
		}

		const dir = hf.getDir (plDistX);

		this.posX += this.velX * gameTime.dt;
		this.posY += this.velY * gameTime.dt;

		if (this.recov < 0) {
			this.recov = 1.25;
			const mult = Math.sqrt(hf.distSqr(player.posX - this.posX, player.posY - this.posY))
			const shDirX = (player.posX - this.posX) / mult;
			const shDirY = (player.posY - this.posY) / mult;
			bullets.push (new Bullet (this.posX, this.posY, shDirX * 180, shDirY * 180, enemyHitable));
		}
		hf.keepInbound(this);
	}

	hit () {
		this.health--;
		this.hitRecov = 1;
		if (this.health <= 0)
			this.kill = true;
	}

	draw () {
		graphics.drawRotatedImageFrom (assets.placeHold, 0, 8, 8, 8,
			this.posX, this.posY, 32 * hf.calcEnSize(this.hitRecov), 32 * hf.calcEnSize(this.hitRecov), Math.PI * 0.25);
	}
}

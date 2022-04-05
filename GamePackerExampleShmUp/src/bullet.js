

class Bullet {
	constructor (posX, posY, velX, velY, tgs) {
		this.posX = posX;
		this.posY = posY;
		this.velX = velX;
		this.velY = velY;
		this.lifeTime = 10;
		this.tgs = tgs;
		this.radius = 4;
	}

	update (arr,i) {
		let kill = false;
		this.posX += this.velX * gameTime.dt;
		this.posY += this.velY * gameTime.dt;
		this.lifeTime -= gameTime.dt;
		for (let i = 0; i < this.tgs.length; i++) {
			const tg = this.tgs[i];
			if (hf.circleCollision(this.posX, this.posY, tg.posX, tg.posY, tg.radius + this.radius)) {
				tg.hit ();
				kill = true;
			}

		}
		if (this.lifeTime < 0 || kill) {
			arr.splice(i,1);
		}
	}

	draw () {
		graphics.drawRotatedImageFrom(assets.placeHold, 8, 0, 4, 4, this.posX, this.posY, 16, 16, Math.PI * 0.25);
	}
}

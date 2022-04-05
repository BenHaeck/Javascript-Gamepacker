



class Player {
	constructor (posX, posY) {
		this.posX = posX;
		this.posY = posY;
		this.recov = 0;
		this.radius = 8;
	}
	update () {
		const moveSpeed = 170;
		if (keyInput.getKey("KeyD")) {
			this.posX += moveSpeed * gameTime.dt;
		}
		if (keyInput.getKey("KeyA")) {
			this.posX -= moveSpeed * gameTime.dt;
		}

		if (keyInput.getKey("KeyS")) {
			this.posY += moveSpeed * gameTime.dt;
		}
		if (keyInput.getKey("KeyW")) {
			this.posY -= moveSpeed * gameTime.dt;
		}

		if (this.recov > 0)
			this.recov -= gameTime.dt;

		if (keyInput.getKey("KeyK") && this.recov <= 0) {
			this.recov = 0.25;
			bullets.push (new Bullet (this.posX, this.posY, 0, -380, enemies));
			bullets.push (new Bullet (this.posX, this.posY, 50, -340, enemies));
			bullets.push (new Bullet (this.posX, this.posY, -50, -340, enemies));
		}
		hf.keepInbound(this);
	}

	hit () {
		shouldRestart = true;
	}

	draw () {
		graphics.drawRotatedImageFrom(assets.placeHold, 0, 0, 8, 8, this.posX, this.posY, 32, 32, Math.PI * 0.25);
	}
}

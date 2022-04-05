
const hf = {
	distSqr (x,y) {
		return (x*x) + (y*y);
	},
	circleCollision (posX1, posY1, posX2, posY2, cradius) {
		return hf.distSqr(posX1 - posX2, posY1 - posY2) < cradius * cradius;
	},
	getDir (x) {
		if (x > 0) return 1;
		if (x < 0) return -1;
		return 0;
	},
	keepInbound (ent) {
		if (ent.posX < 0) ent.posX = 0;
		else if (ent.posX > screenWidth) ent.posX = screenWidth;
		if (ent.posY < 0) ent.posY = 0;
		else if (ent.posY > screenHeight) ent.posY = screenHeight;
	},
	calcEnSize (hitRecov) {
		return 1 - (hitRecov * 0.25)
	}
}

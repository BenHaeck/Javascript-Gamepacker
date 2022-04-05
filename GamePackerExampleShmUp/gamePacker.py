import os;

ROOT_PATH = os.path.dirname(os.path.abspath(__file__))

inDir = "";
outDir = ""

def writeToFile (path, val):
	f = open(f"{ROOT_PATH}\\{outDir}{path}", "w");
	f.write(val);
	f.close();

def readFromFile (path):
	f = open(f"{ROOT_PATH}\\{inDir}{path}", "r");
	rv = f.read();
	f.close();
	return rv;

jsFiles = [];

assets = ""

style = """body {
		background-color: #222;
		color: #fff;
		font-family: Arial, Times New Roman;
		font-size: 110%;
		padding: 2%;
		padding-top:0.0%;
		margin: 6%;
		margin-top:0%;
		background-clip: #000;
	}

		canvas {
		margin-left: -0%
	}""";

preSetup = """// Rendering
const canvas = document.getElementById ("mainCanvas")
const ctx = canvas.getContext("2d");
const screenWidth = canvas.width;
const screenHeight = canvas.height;
const graphics = {
	drawRotatedImage (image, dx,dy,dw,dh, rot) {
		ctx.save ();
		ctx.translate(dx,dy);
		ctx.scale (dw,dh);
		ctx.rotate(rot)
		ctx.drawImage(image, -0.5, -0.5, 1, 1);
		ctx.restore()
	},
	drawRotatedImageFrom (image, sx, sy, sw, sh, dx,dy,dw,dh, rot) {
		ctx.save ();
		ctx.translate(dx,dy);
		ctx.scale (dw,dh);
		ctx.rotate(rot)
		ctx.drawImage(image, sx, sy, sw, sh, -0.5, -0.5, 1, 1);
		ctx.restore()
	}
}

// Time -+-+-+-+-
const gameTime = {
	lastFrameTime: -1,
	dt: 0,
}

// Input -+-+-+-+-
const keyInput = {
	getKey (key) {
		if (keyInput[key] != null) {
			return keyInput[key];
		}
		return false;
	}
}
window.addEventListener("keydown", (e) => {
	keyInput[e.code] = true;
	e.preventDefault();
})
window.addEventListener("keyup", (e) => {
	keyInput[e.code] = false;
})

const mouseInput = {
	posX: 0,
	posY: 0,
	click: false,
}
canvas.addEventListener("mousemove", (e)=>{
	mouseInput.posX = e.clientX - canvas.offsetLeft + scrollX;
	mouseInput.posY = e.clientY - canvas.offsetTop + scrollY;
})
canvas.addEventListener("mousedown", (e) => {
	mouseInput.click = true;
})
canvas.addEventListener("mouseup", (e) => {
	mouseInput.click = false;
})""";

postSetup = """function gameLoop (dt) {
	gameTime.dt = (dt - gameTime.lastFrameTime)/ 1000;
	gameTime.lastFrameTime = dt;
	if (gameTime.dt > 1/16) {
		gameTime.dt = 1/16;
	}
	update ();
	draw();
	window.requestAnimationFrame (gameLoop);
}

gameLoop(0)""";

description = "*description*";

def convertToHTML (inString):
	return inString.replace ("\n","<br>");

def reduceLength (inString):
	return inString.replace("\n ", "\n").replace("\n\n","\n").replace("  ", " ").replace("\n\n","\n").replace("  ", " ").replace("\n\n","\n").replace("  ", " ").replace(", ", ",").replace(". ", ".").replace("+ ", "+").replace("/ ", "/").replace("* ", "*").replace("- ", "-");

def pack(width, height, name):
	jsCode = "";
	for i in jsFiles:
		jsCode += f"\n// {i}\n{readFromFile(i + '.js')}\n";

	val = f"""<!DOCTYPE html>
<html>
<head>
	<title> {convertToHTML(name)} </title>
	<style>{style}</style>
</head>
<body>
	<h1> {convertToHTML(name)} </h1>
	<canvas id = mainCanvas width = \"{width}\" height = \"{height}\"> {assets} </canvas>
	<h2>Description: {convertToHTML( description)}</h2>
	<script>
	'use strict';
// Code Begins
{preSetup}
// User written Code Begins
{reduceLength(jsCode)}
// User written Code Ends
{postSetup}
// Code Ends
	</script>
</body>
</html>""";
	print (val);
	writeToFile("index.html", val);
	return val;

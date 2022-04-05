import gamePacker;


#gamePacker.basePath = "output\\"
gamePacker.assets = """<img src = './PlaceHolder.png' id = 'placeHold'>""";

gamePacker.inDir = "src\\";
gamePacker.outDir = "dest\\";

gamePacker.description = """
ShmUp Contained in a single HTML File + png file
Controls:
WASD = Move
K = Shoot
Escape = Pause/Unpause""";
gamePacker.jsFiles = ["helperFuncs", "assets", "SmartEnemy", "enemy", "bullet", "player", "main"];
gamePacker.pack (800, 600, "HTML ShmUp");

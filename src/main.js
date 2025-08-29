import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1650,
  height: 900,
  backgroundColor: "#000000",
  pixelArt: true, // <- wichtig
  roundPixels: true, // <- rundet Koordinaten auf ganze Pixel
  scene: [GameScene]
};

const game = new Phaser.Game(config);

// Szene-Positionen setzen
game.scene.start("GameScene", {
  x: 0,
  y: 0,
  width: 1400,
  height: 900
});


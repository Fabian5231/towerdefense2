import GridManager from "../utils/GridManager.js";
import TownHall from "../buildings/TownHall.js";
import House from "../buildings/House.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.mapWidth = 1400;
    this.mapHeight = 900;
    this.gridSize = 15;
    this.placeMode = null; // aktueller Platzierungsmodus

  const canvasWidth = this.sys.game.config.width;
  const canvasHeight = this.sys.game.config.height;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Spielfeld links
  this.fieldContainer = this.add.container(
    centerX - this.mapWidth / 2 - 100, // nach links verschieben
    centerY - this.mapHeight / 2
  );

  const bg = this.add.rectangle(
    this.mapWidth / 2,
    this.mapHeight / 2,
    this.mapWidth,
    this.mapHeight,
    0x2a2a2a
  );
  bg.setStrokeStyle(4, 0xffffff);
  this.fieldContainer.add(bg);

  // Klicks auf dem Spielfeld erlauben (für Gebäudeplatzierung)
  bg.setInteractive();
  bg.on('pointerdown', (pointer, localX, localY) => {
    if (!this.placeMode) return;

    const gridX = Math.floor(localX / this.gridSize);
    const gridY = Math.floor(localY / this.gridSize);

    if (this.placeMode.type === 'house') {
      const w = 2, h = 2;
      if (this.gridManager.isAreaFree(gridX, gridY, w, h)) {
        new House(this, gridX, gridY);
        this.gridManager.occupyArea(gridX, gridY, w, h);
      } else {
        // Optional: Feedback bei ungültiger Platzierung
        // this.cameras.main.shake(50, 0.002);
        // console.log('Platz belegt oder außerhalb des Feldes');
      }
    }
  });

  this.gridManager = new GridManager(
    this,
    this.mapWidth,
    this.mapHeight,
    this.gridSize
  );
  this.fieldContainer.add(this.gridManager.graphics);

  this.placeRandomTownHall();

  // ✅ Menü rechts daneben
  this.createMenu();
}

  createMenu() {
  const menuX = this.mapWidth + 50; // rechts vom Spielfeld
  const menuY = 50;

  const menuBg = this.add.rectangle(
    menuX + 100,
    this.mapHeight / 2,
    200,
    this.mapHeight,
    0x1a1a1a
  );
  menuBg.setStrokeStyle(4, 0xffffff);

  this.add.text(menuX + 20, menuY, "Kaufmenü", {
    fontSize: "20px",
    fill: "#ffffff"
  });

  const houseBtn = this.add.rectangle(menuX + 100, menuY + 80, 160, 60, 0x4a90e2);
  houseBtn.setStrokeStyle(2, 0xffffff);
  houseBtn.setInteractive();

  this.add.text(menuX + 100, menuY + 80, "Wohnhaus", {
    fontSize: "16px",
    fill: "#ffffff"
  }).setOrigin(0.5);

  // Klick auf "Wohnhaus" aktiviert Platzierungsmodus
  houseBtn.on('pointerdown', () => {
    this.placeMode = { type: 'house' };
  });
  }

  placeRandomTownHall() {
    const minDistance = 5;
    const buildingSize = 3;

    const maxX = this.gridManager.gridWidth - buildingSize - minDistance;
    const maxY = this.gridManager.gridHeight - buildingSize - minDistance;

    const randomX = Phaser.Math.Between(minDistance, maxX);
    const randomY = Phaser.Math.Between(minDistance, maxY);

    this.townHall = new TownHall(this, randomX, randomY);
    // Bereich als belegt markieren
    this.gridManager.occupyArea(randomX, randomY, buildingSize, buildingSize);
  }
}

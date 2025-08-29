export default class GridManager {
  constructor(scene, mapWidth, mapHeight, gridSize) {
    this.scene = scene;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.gridSize = gridSize;

    this.gridWidth = Math.floor(mapWidth / gridSize);
    this.gridHeight = Math.floor(mapHeight / gridSize);

    this.graphics = scene.add.graphics();
    this.graphics.setDepth(1);

    // Belegungsraster initialisieren (false = frei)
    this.occupied = [];
    for (let y = 0; y < this.gridHeight; y++) {
      this.occupied.push(new Array(this.gridWidth).fill(false));
    }

    this.drawGrid();
  }

  drawGrid() {
    this.graphics.clear();
    this.graphics.lineStyle(1, 0x444444, 0.6);

    const half = 0.5;

    // Vertikale Linien auf halben Pixeln für scharfe 1px Linien
    for (let x = 0; x <= this.gridWidth; x++) {
      const px = x * this.gridSize + half;
      this.graphics.moveTo(px, half);
      this.graphics.lineTo(px, this.mapHeight + half);
    }

    // Horizontale Linien auf halben Pixeln für scharfe 1px Linien
    for (let y = 0; y <= this.gridHeight; y++) {
      const py = y * this.gridSize + half;
      this.graphics.moveTo(half, py);
      this.graphics.lineTo(this.mapWidth + half, py);
    }

    this.graphics.strokePath();
  }

  worldToGrid(x, y) {
    return {
      x: Math.floor(x / this.gridSize),
      y: Math.floor(y / this.gridSize)
    };
  }

  gridToWorld(gridX, gridY) {
    return {
      x: gridX * this.gridSize + this.gridSize / 2,
      y: gridY * this.gridSize + this.gridSize / 2
    };
  }

  gridToWorldForBuilding(gridX, gridY, width, height) {
    return {
      x: (gridX + width / 2) * this.gridSize,
      y: (gridY + height / 2) * this.gridSize
    };
  }

  // Prüfen, ob ein Bereich frei ist (in Grid-Zellen)
  isAreaFree(gridX, gridY, width, height) {
    if (
      gridX < 0 ||
      gridY < 0 ||
      gridX + width > this.gridWidth ||
      gridY + height > this.gridHeight
    ) {
      return false;
    }
    for (let y = gridY; y < gridY + height; y++) {
      for (let x = gridX; x < gridX + width; x++) {
        if (this.occupied[y][x]) return false;
      }
    }
    return true;
  }

  // Bereich als belegt markieren
  occupyArea(gridX, gridY, width, height) {
    for (let y = gridY; y < gridY + height; y++) {
      for (let x = gridX; x < gridX + width; x++) {
        this.occupied[y][x] = true;
      }
    }
  }

  // Bereich wieder freigeben (optional)
  freeArea(gridX, gridY, width, height) {
    for (let y = gridY; y < gridY + height; y++) {
      for (let x = gridX; x < gridX + width; x++) {
        this.occupied[y][x] = false;
      }
    }
  }
}

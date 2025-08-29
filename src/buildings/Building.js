export default class Building {
  constructor(scene, gridX, gridY, width, height, color = 0x888888) {
    this.scene = scene;
    this.gridX = gridX;
    this.gridY = gridY;
    this.width = width;   // in Grid-Zellen
    this.height = height; // in Grid-Zellen
    this.color = color;

    // Weltkoordinaten: oben-links an die Grid-Koordinaten andocken
    const worldX = gridX * scene.gridSize;
    const worldY = gridY * scene.gridSize;

    // Grafik erstellen (Origin oben-links = 0)
    this.graphic = scene.add.rectangle(
      worldX,
      worldY,
      width * scene.gridSize,
      height * scene.gridSize,
      color
    ).setOrigin(0);

    // In das Spielfeld-Container einfügen, damit es mit Grid/Background ausgerichtet ist
    if (scene.fieldContainer) {
      scene.fieldContainer.add(this.graphic);
    }

    // Position speichern (oben-links)
    this.x = worldX;
    this.y = worldY;
  }

  destroy() {
    this.graphic.destroy();
  }
}

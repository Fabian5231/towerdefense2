export default class Building {
  constructor(scene, gridX, gridY, width, height, color = 0x888888) {
    this.scene = scene;
    this.gridX = gridX;
    this.gridY = gridY;
    this.width = width;   // in Grid-Zellen
    this.height = height; // in Grid-Zellen
    this.color = color;

    // Weltkoordinaten berechnen (Mitte des Gebäudes)
    const worldPos = scene.gridManager.gridToWorldForBuilding(
      gridX,
      gridY,
      width,
      height
    );

    // Grafik erstellen
    this.graphic = scene.add.rectangle(
      worldPos.x,
      worldPos.y,
      width * scene.gridSize,
      height * scene.gridSize,
      color
    );

    // In das Spielfeld-Container einfügen, damit es mit Grid/Background ausgerichtet ist
    if (scene.fieldContainer) {
      scene.fieldContainer.add(this.graphic);
    }

    // Position speichern
    this.x = worldPos.x;
    this.y = worldPos.y;
  }

  destroy() {
    this.graphic.destroy();
  }
}

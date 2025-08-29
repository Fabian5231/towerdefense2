import Building from "./Building.js";

export default class House extends Building {
  constructor(scene, gridX, gridY) {
    // 2x2 Felder groß, graublau
    super(scene, gridX, gridY, 2, 2, 0x4a90e2);
  }
}
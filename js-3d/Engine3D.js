class Engine3D {
  constructor(body, canvasWidth, canvasHeight) {
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.currentCanvas = 0;
    this.scaleFactor = Math.min(canvasWidth, canvasHeight) / 800;
    this.cameraDistance = 400;
    this.initCanvases(body);
    this.transformMatrix = new TransformMatrix();
  }

  initCanvases(body) {
    this.canvases = [
      this.createCanvas("canvas1"),
      this.createCanvas("canvas2"),
    ];
    this.ctxs = this.canvases.map((canvas) => canvas.getContext("2d"));
    this.canvases.forEach((canvas, index) => {
      canvas.style.display = "none";
      body.appendChild(canvas);
    });
    this.swap();
  }

  createCanvas(className) {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.className = className;
    return canvas;
  }

  swap() {
    this.canvases[this.currentCanvas].style.display = "none";
    this.currentCanvas = 1 - this.currentCanvas;
    this.canvases[this.currentCanvas].style.display = "block";
    this.canvas = this.canvases[this.currentCanvas];
    this.ctx = this.ctxs[this.currentCanvas];
  }

  project3dTo2d(point) {
    // Apply world transformation
    let [x, y, z] = this.transformMatrix.transformPoint(point);
    // Simple perspective projection
    const scale =
      (this.cameraDistance / (this.cameraDistance + z)) * this.scaleFactor;
    return {
      x: this.centerX + x * scale,
      y: this.centerY + y * scale,
    };
  }

  line2d(p1, p2) {
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  }

  draw3dLine(v1, v2) {
    const p1 = this.project3dTo2d([v1.x, v1.y, v1.z]);
    const p2 = this.project3dTo2d([v2.x, v2.y, v2.z]);
    this.line2d(p1, p2);
  }

  setColorRGB(r, g, b) {
    this.ctx.strokeStyle = `rgb(${r},${g},${b})`;
  }

  setColorName(name) {
    this.ctx.strokeStyle = name;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  // Transformation methods
  translate(tx, ty, tz) {
    this.transformMatrix = this.transformMatrix.multiply(
      TransformMatrix.translation(tx, ty, tz)
    );
  }

  scale(sx, sy, sz) {
    this.transformMatrix = this.transformMatrix.multiply(
      TransformMatrix.scaling(sx, sy, sz)
    );
  }

  rotateX(angle) {
    this.transformMatrix = this.transformMatrix.rotateX(angle);
  }

  rotateY(angle) {
    this.transformMatrix = this.transformMatrix.rotateY(angle);
  }

  rotateZ(angle) {
    this.transformMatrix = this.transformMatrix.rotateZ(angle);
  }

  resetTransform() {
    this.transformMatrix = new TransformMatrix();
  }
}

class TransformMatrix {
  constructor() {
    // Initialize as identity matrix
    this.matrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
  }

  // Multiply this matrix with another matrix
  multiply(other) {
    const result = new TransformMatrix();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result.matrix[i][j] = 0;
        for (let k = 0; k < 4; k++) {
          result.matrix[i][j] += this.matrix[i][k] * other.matrix[k][j];
        }
      }
    }
    return result;
  }

  // Rotate around X-axis
  rotateX(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const rotationMatrix = new TransformMatrix();
    rotationMatrix.matrix = [
      [1, 0, 0, 0],
      [0, cos, -sin, 0],
      [0, sin, cos, 0],
      [0, 0, 0, 1],
    ];
    return this.multiply(rotationMatrix);
  }

  // Rotate around Y-axis
  rotateY(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const rotationMatrix = new TransformMatrix();
    rotationMatrix.matrix = [
      [cos, 0, sin, 0],
      [0, 1, 0, 0],
      [-sin, 0, cos, 0],
      [0, 0, 0, 1],
    ];
    return this.multiply(rotationMatrix);
  }

  // Rotate around Z-axis
  rotateZ(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const rotationMatrix = new TransformMatrix();
    rotationMatrix.matrix = [
      [cos, -sin, 0, 0],
      [sin, cos, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    return this.multiply(rotationMatrix);
  }

  // Apply the transformation to a 3D point
  transformPoint(point) {
    const [x, y, z] = point;
    const w = 1; // Homogeneous coordinate
    const result = [0, 0, 0, 0];

    for (let i = 0; i < 4; i++) {
      result[i] =
        this.matrix[i][0] * x +
        this.matrix[i][1] * y +
        this.matrix[i][2] * z +
        this.matrix[i][3] * w;
    }

    // Convert back to 3D coordinates
    if (result[3] !== 0 && result[3] !== 1) {
      return [
        result[0] / result[3],
        result[1] / result[3],
        result[2] / result[3],
      ];
    }
    return [result[0], result[1], result[2]];
  }

  // Static method to create a translation matrix
  static translation(tx, ty, tz) {
    const matrix = new TransformMatrix();
    matrix.matrix[0][3] = tx;
    matrix.matrix[1][3] = ty;
    matrix.matrix[2][3] = tz;
    return matrix;
  }

  // Static method to create a scaling matrix
  static scaling(sx, sy, sz) {
    const matrix = new TransformMatrix();
    matrix.matrix[0][0] = sx;
    matrix.matrix[1][1] = sy;
    matrix.matrix[2][2] = sz;
    return matrix;
  }
}
